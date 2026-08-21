import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'ayurchain_jwt_secure_key_2024_sih_ayush';

// ---------------------------------------------------------------------------
// CORS — allow production Vercel frontend and localhost dev
// ---------------------------------------------------------------------------
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'https://ayur-chain-three.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

// ---------------------------------------------------------------------------
// MongoDB Connection
// ---------------------------------------------------------------------------
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ MongoDB connection error:', err.message));
} else {
  console.warn('⚠️  MONGODB_URI not set — running without persistent database');
}

// ---------------------------------------------------------------------------
// Mongoose Schemas & Models
// ---------------------------------------------------------------------------

// User Schema with Password Hashing & Role Control
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Farmer', 'Lab', 'Manufacturer', 'Consumer', 'Regulator'], 
    default: 'Farmer' 
  },
  walletAddress: { type: String, default: '' },
  organization: { type: String, default: '' },
  licenseNumber: { type: String, default: '' },
  phone: { type: String, default: '' },
  state: { type: String, default: '' },
  district: { type: String, default: '' },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const batchSchema = new mongoose.Schema({
  batchId:          { type: String, required: true, unique: true },
  herb:             { type: String, required: true },
  scientificName:   String,
  ayushReg:         String,
  weight:           String,
  collectionMethod: String,
  qualityScore:     Number,
  status:           String,
  isSuspicious:     { type: Boolean, default: false },
  suspiciousReason: String,
  stages:           [mongoose.Schema.Types.Mixed],
}, { timestamps: true });

const farmerSchema = new mongoose.Schema({
  farmerId: { type: String, required: true, unique: true },
  name:     { type: String, required: true },
  state:    String,
  district: String,
  herb:     String,
  status:   { type: String, default: 'Pending Review' },
  wallet:   String,
}, { timestamps: true });

const User   = mongoose.model('User', userSchema);
const Batch  = mongoose.model('Batch', batchSchema);
const Farmer = mongoose.model('Farmer', farmerSchema);

// ---------------------------------------------------------------------------
// Authentication Middleware
// ---------------------------------------------------------------------------
export const verifyAuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};

// ---------------------------------------------------------------------------
// API Routes — Root & Health
// ---------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AyurChain Botanical Traceability & Auth Backend API is live!',
    endpoints: {
      health: '/api/health',
      authRegister: 'POST /api/auth/register',
      authLogin: 'POST /api/auth/login',
      authMe: 'GET /api/auth/me',
      batches: '/api/batches',
      farmers: '/api/farmers'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'AyurChain Botanical Traceability Node',
    blockchain: 'Ethereum Mainnet',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// API Routes — Authentication (Register, Login, Me)
// ---------------------------------------------------------------------------

// POST Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, walletAddress, organization, licenseNumber, phone, state, district } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'Farmer',
      walletAddress: walletAddress || '',
      organization: organization || '',
      licenseNumber: licenseNumber || '',
      phone: phone || '',
      state: state || '',
      district: district || '',
      isVerified: role === 'Consumer'
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      walletAddress: newUser.walletAddress,
      organization: newUser.organization,
      licenseNumber: newUser.licenseNumber,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: userResponse
      }
    });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ success: false, error: err.message || 'Registration failed' });
  }
});

// POST Login (Email/Password or Web3 Wallet)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, walletAddress, role } = req.body;

    // 1. Web3 Wallet direct login flow
    if (walletAddress && !email && !password) {
      let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
      if (!user) {
        // Auto-provision wallet user
        user = await User.create({
          name: `Web3 Member (${walletAddress.substring(0, 6)})`,
          email: `${walletAddress.toLowerCase()}@ayurchain.eth`,
          password: await bcrypt.hash(walletAddress, 10),
          role: role || 'Consumer',
          walletAddress: walletAddress.toLowerCase(),
          isVerified: true
        });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role, name: user.name, walletAddress: user.walletAddress },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'Web3 Wallet authentication successful',
        data: {
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            walletAddress: user.walletAddress,
            organization: user.organization,
            isVerified: user.isVerified
          }
        }
      });
    }

    // 2. Standard Email/Password flow
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role, name: user.name, walletAddress: user.walletAddress },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          walletAddress: user.walletAddress,
          organization: user.organization,
          isVerified: user.isVerified,
          licenseNumber: user.licenseNumber
        }
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, error: err.message || 'Login failed' });
  }
});

// GET Authenticated User Profile
app.get('/api/auth/me', verifyAuthToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------------------------------
// API Routes — Batches
// ---------------------------------------------------------------------------
// GET all batches
app.get('/api/batches', async (req, res) => {
  try {
    const batches = await Batch.find().sort({ createdAt: -1 });
    res.json({ success: true, data: batches });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single batch by batchId
app.get('/api/batches/:batchId', async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId });
    if (!batch) return res.status(404).json({ success: false, error: 'Batch not found' });
    res.json({ success: true, data: batch });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new batch
app.post('/api/batches', async (req, res) => {
  try {
    const batch = await Batch.create(req.body);
    res.status(201).json({ success: true, data: batch });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, error: 'Batch ID already exists' });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update batch (add stages, change status)
app.put('/api/batches/:batchId', async (req, res) => {
  try {
    const batch = await Batch.findOneAndUpdate(
      { batchId: req.params.batchId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!batch) return res.status(404).json({ success: false, error: 'Batch not found' });
    res.json({ success: true, data: batch });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------------------------------
// API Routes — Farmers
// ---------------------------------------------------------------------------
app.get('/api/farmers', async (req, res) => {
  try {
    const farmers = await Farmer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: farmers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/farmers', async (req, res) => {
  try {
    const farmer = await Farmer.create(req.body);
    res.status(201).json({ success: true, data: farmer });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/farmers/:farmerId', async (req, res) => {
  try {
    const farmer = await Farmer.findOneAndUpdate(
      { farmerId: req.params.farmerId },
      req.body,
      { new: true }
    );
    if (!farmer) return res.status(404).json({ success: false, error: 'Farmer not found' });
    res.json({ success: true, data: farmer });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------------------------------
// 404 catch-all
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

// ---------------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🌿 AyurChain Backend running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
