import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// AyurChain Demo Health Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'AyurChain Botanical Traceability Node',
    blockchain: 'Ethereum Sepolia Testnet',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`AyurChain Backend Node running on port ${PORT}`);
});
