const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'tasks-data.json');

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Load data from file
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return { tasks: [], users: [] };
}

// Save data to file
function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Get all tasks and users
app.get('/api/sync', (req, res) => {
  const data = loadData();
  res.json(data);
});

// Save tasks and users
app.post('/api/sync', (req, res) => {
  const { tasks, users } = req.body;
  saveData({ tasks, users });
  console.log(`✅ Saved: ${tasks.length} tasks, ${users.length} users`);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'running', timestamp: Date.now() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║       StaffTask Server Running         ║
╠════════════════════════════════════════╣
║                                        ║
║  📍 Server: http://localhost:${PORT}      ║
║                                        ║
║  🔗 Other PCs: Find your IP below:     ║
║                                        ║
║  Steps:                                ║
║  1. Admin opens: http://YOUR-IP:${PORT}  ║
║  2. Staff opens: http://YOUR-IP:${PORT}  ║
║  3. Use same WiFi network              ║
║  4. Data auto-syncs in real-time!      ║
║                                        ║
╚════════════════════════════════════════╝
  `);

  // Show IP addresses
  const os = require('os');
  const interfaces = os.networkInterfaces();
  let found = false;
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`   💻 Connect from other PC: http://${iface.address}:${PORT}`);
        found = true;
      }
    }
  }
  if (!found) console.log('   (Run on same WiFi for other devices to connect)');
});
