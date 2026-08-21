import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// CORS — allow production Vercel frontend and localhost dev
// ---------------------------------------------------------------------------
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'https://ayur-chain-three.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
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
  console.warn('⚠️  MONGODB_URI not set — running without database');
}

// ---------------------------------------------------------------------------
// Mongoose Schemas & Models
// ---------------------------------------------------------------------------
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

const Batch  = mongoose.model('Batch', batchSchema);
const Farmer = mongoose.model('Farmer', farmerSchema);

// ---------------------------------------------------------------------------
// API Routes — Root & Health
// ---------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AyurChain Backend API is live!',
    endpoints: {
      health: '/api/health',
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
