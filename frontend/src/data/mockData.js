export const AYURVEDIC_HERBS = [
  "Ashwagandha (Withania somnifera)",
  "Brahmi (Bacopa monnieri)",
  "Triphala",
  "Neem (Azadirachta indica)",
  "Tulsi (Ocimum sanctum)",
  "Shatavari (Asparagus racemosus)",
  "Guduchi/Giloy (Tinospora cordifolia)",
  "Haritaki (Terminalia chebula)",
  "Amalaki (Phyllanthus emblica)",
  "Bibhitaki (Terminalia bellirica)",
  "Punarnava (Boerhavia diffusa)",
  "Bala (Sida cordifolia)",
  "Vidanga (Embelia ribes)",
  "Vacha (Acorus calamus)",
  "Shankhpushpi (Convolvulus pluricaulis)",
  "Jatamansi (Nardostachys jatamansi)",
  "Bhringraj (Eclipta alba)",
  "Manjistha (Rubia cordifolia)",
  "Kutki (Picrorhiza kurroa)",
  "Pippali (Piper longum)",
  "Chitraka (Plumbago zeylanica)",
  "Devadaru (Cedrus deodara)",
  "Guggul (Commiphora mukul)",
  "Shilajit (Asphaltum punjabianum)",
  "Arjuna (Terminalia arjuna)",
  "Dashmool",
  "Sariva (Hemidesmus indicus)",
  "Lodhra (Symplocos racemosa)",
  "Nagkesar (Mesua ferrea)",
  "Yashtimadhu / Mulethi (Glycyrrhiza glabra)",
  "Karela (Momordica charantia)",
  "Methi (Trigonella foenum-graecum)",
  "Kalmegh (Andrographis paniculata)",
  "Moringa (Moringa oleifera)",
  "Vijaysar (Pterocarpus marsupium)",
  "Tagar (Valeriana wallichii)",
  "Musta (Cyperus rotundus)",
  "Nimba (Azadirachta indica)",
  "Haridra / Turmeric (Curcuma longa)",
  "Adrak / Ginger (Zingiber officinale)"
];

export const DEMO_BATCHES = {
  "BATCH-2024-001": {
    batchId: "BATCH-2024-001",
    herb: "Ashwagandha (Withania somnifera)",
    scientificName: "Withania somnifera",
    ayushReg: "AYUSH-IND-2024-88492",
    weight: "150 kg",
    collectionMethod: "Wild Harvested",
    qualityScore: 98.4,
    status: "Verified & Formulated",
    isSuspicious: false,
    stages: [
      {
        stage: "Collection",
        icon: "Leaf",
        actor: "Ramesh Kumar (Collector)",
        wallet: "0x71C...39A2",
        location: "Nagpur, Maharashtra",
        gps: [21.1458, 79.0882],
        timestamp: "2024-11-01 06:30",
        txHash: "0xabc1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc",
        ipfs: "QmX7yZa9PqRstUVwXyz1234567890abcdefGHIJKLMN",
        details: "Harvested in dense forest zone 4B under forest permit #FP-992. Weather: 24°C, dry."
      },
      {
        stage: "Primary Processing",
        icon: "Factory",
        actor: "AyurProcess Pvt Ltd",
        wallet: "0x3A2...9B11",
        location: "Nagpur MIDC",
        gps: [21.1200, 79.0500],
        timestamp: "2024-11-03 10:00",
        txHash: "0xbcd234567890abcdef1234567890abcdef1234567890abcdef1234567890bcd",
        ipfs: "QmY8zAb9PqRstUVwXyz1234567890abcdefGHIJKLMNO",
        details: "Cleaned, air-dried at 38°C to retain active withanolides. Moisture reduced to 7.2%."
      },
      {
        stage: "Quality Testing",
        icon: "FlaskConical",
        actor: "NABL Certified Lab Mumbai",
        wallet: "0x89F...4C22",
        location: "Mumbai",
        gps: [19.0760, 72.8777],
        timestamp: "2024-11-07 14:00",
        txHash: "0xcde34567890abcdef1234567890abcdef1234567890abcdef1234567890cde",
        ipfs: "QmZ9aBc9PqRstUVwXyz1234567890abcdefGHIJKLMNO",
        details: "Heavy metals: Passed (<0.1 ppm). Pesticides: Undetected. HPLC Alkaloid content: 4.8% Withanolides."
      },
      {
        stage: "Manufacturing",
        icon: "Boxes",
        actor: "Himalaya Wellness Co.",
        wallet: "0x12D...7E99",
        location: "Bengaluru",
        gps: [12.9716, 77.5946],
        timestamp: "2024-11-12 09:00",
        txHash: "0xdef4567890abcdef1234567890abcdef1234567890abcdef1234567890def",
        ipfs: "QmA0bCd9PqRstUVwXyz1234567890abcdefGHIJKLMNO",
        details: "Formulated into AyurStress Relief Capsules. Batch Size: 5,000 units."
      },
      {
        stage: "Packaging",
        icon: "PackageCheck",
        actor: "Himalaya Wellness Co.",
        wallet: "0x12D...7E99",
        location: "Bengaluru",
        gps: [12.9716, 77.5946],
        timestamp: "2024-11-13 11:00",
        txHash: "0xefg567890abcdef1234567890abcdef1234567890abcdef1234567890efg",
        ipfs: "QmB1cDe9PqRstUVwXyz1234567890abcdefGHIJKLMNO",
        details: "Tamper-evident glass jars with anti-counterfeit QR seal applied."
      },
      {
        stage: "Final Label",
        icon: "CheckCircle2",
        actor: "AYUSH Ministry Verification Node",
        wallet: "0x001...AYUSH",
        location: "New Delhi",
        gps: [28.6139, 77.2090],
        timestamp: "2024-11-15 00:00",
        txHash: "0xfgh67890abcdef1234567890abcdef1234567890abcdef1234567890fgh",
        ipfs: "QmC2dEf9PqRstUVwXyz1234567890abcdefGHIJKLMNO",
        details: "Issued 100% Organic & Authentic Ayurvedic Stamp. Immutable batch seal locked."
      }
    ]
  },
  "BATCH-2024-002": {
    batchId: "BATCH-2024-002",
    herb: "Brahmi (Bacopa monnieri)",
    scientificName: "Bacopa monnieri",
    ayushReg: "AYUSH-IND-2024-44109",
    weight: "80 kg",
    collectionMethod: "Cultivated",
    qualityScore: 94.1,
    status: "In Lab Testing",
    isSuspicious: false,
    stages: [
      {
        stage: "Collection",
        icon: "Leaf",
        actor: "Sita Devi Organic Farm",
        wallet: "0x44B...1199",
        location: "Wayanad, Kerala",
        gps: [11.6854, 76.1320],
        timestamp: "2024-11-10 07:15",
        txHash: "0x111234567890abcdef1234567890abcdef1234567890abcdef1234567890111",
        ipfs: "QmBrahmiCollWayanad001",
        details: "Harvested organic wetland Brahmi. Bio-fertilizer used."
      },
      {
        stage: "Primary Processing",
        icon: "Factory",
        actor: "Kerala Herbal Extracts",
        wallet: "0x55C...22AA",
        location: "Kochi, Kerala",
        gps: [9.9312, 76.2673],
        timestamp: "2024-11-12 14:30",
        txHash: "0x222234567890abcdef1234567890abcdef1234567890abcdef1234567890222",
        ipfs: "QmBrahmiProcKochi002",
        details: "Shade dried and pulverized to 80 mesh size fine powder."
      },
      {
        stage: "Quality Testing",
        icon: "FlaskConical",
        actor: "AyurLab Analytics Kochi",
        wallet: "0x66D...33BB",
        location: "Kochi",
        gps: [9.9312, 76.2673],
        timestamp: "2024-11-14 11:00",
        txHash: "0x333234567890abcdef1234567890abcdef1234567890abcdef1234567890333",
        ipfs: "QmBrahmiLabKochi003",
        details: "Assay Bacoside A content: 22.4%. Pass."
      }
    ]
  },
  "BATCH-2024-FLAGGED": {
    batchId: "BATCH-2024-FLAGGED",
    herb: "Guggul (Commiphora mukul)",
    scientificName: "Commiphora mukul",
    ayushReg: "AYUSH-IND-2024-99001",
    weight: "200 kg",
    collectionMethod: "Wild Harvested",
    qualityScore: 61.2,
    status: "Suspicious Route Alert",
    isSuspicious: true,
    suspiciousReason: "Physically impossible GPS jump: 1,400 km traveled in 25 minutes between collection & processing.",
    stages: [
      {
        stage: "Collection",
        icon: "Leaf",
        actor: "Unknown Collector #8",
        wallet: "0x999...0000",
        location: "Jaisalmer, Rajasthan",
        gps: [26.9157, 70.9083],
        timestamp: "2024-11-18 09:00",
        txHash: "0xbad1234567890abcdef1234567890abcdef1234567890abcdef1234567890bad",
        ipfs: "QmFlaggedCollection1",
        details: "Harvested in endangered arid forest zone."
      },
      {
        stage: "Primary Processing",
        icon: "AlertTriangle",
        actor: "QuickProc Hub",
        wallet: "0x888...1111",
        location: "Kolkata, West Bengal",
        gps: [22.5726, 88.3639],
        timestamp: "2024-11-18 09:25",
        txHash: "0xbad2234567890abcdef1234567890abcdef1234567890abcdef1234567890bad",
        ipfs: "QmFlaggedProcessing2",
        details: "Logged processing entry 1,400km away within 25 minutes."
      }
    ]
  }
};

export const INITIAL_REGISTERED_FARMERS = [
  { id: "FARM-101", name: "Ramesh Kumar", state: "Maharashtra", district: "Nagpur", herb: "Ashwagandha", status: "Approved", wallet: "0x71C...39A2" },
  { id: "FARM-102", name: "Sita Devi", state: "Kerala", district: "Wayanad", herb: "Brahmi", status: "Approved", wallet: "0x44B...1199" },
  { id: "FARM-103", name: "Vikram Singh", state: "Rajasthan", district: "Jodhpur", herb: "Guggul", status: "Pending Review", wallet: "0x88F...9922" },
  { id: "FARM-104", name: "Ananya Roy", state: "Assam", district: "Kamrup", herb: "Tulsi", status: "Approved", wallet: "0x22A...33DD" },
];
