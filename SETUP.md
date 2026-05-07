# StaffTask Auto-Sync Server Setup

## Quick Start (5 minutes)

### Step 1: Install Node.js
- Download from [nodejs.org](https://nodejs.org)
- Install (choose LTS version)
- Verify: Open Command Prompt and type `node --version`

### Step 2: Install Dependencies
```bash
cd C:\Test_Web_App
npm install
```

### Step 3: Start Server
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║       StaffTask Server Running         ║
╠════════════════════════════════════════╣
║  📍 Server: http://localhost:3000      ║
║  🔗 Other PCs: http://YOUR-IP:3000     ║
╚════════════════════════════════════════╝
```

### Step 4: Open App

**Admin (PC1):**
- Open: `http://localhost:3000`
- Log in as admin
- Create tasks and assign to staff

**Staff (PC2 - same WiFi):**
- Open: `http://YOUR-IP:3000` (from Step 3 output)
- Log in as staff
- ✅ Tasks appear automatically!

---

## How It Works

1. **Server stores all tasks** in `tasks-data.json`
2. **Both browsers sync** every 2 seconds automatically
3. **No Download/Upload needed** - everything is instant!
4. **Server status indicator** shows 🟢 Green when connected

---

## Default Users

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Admin |
| john | john123 | Staff |
| jane | jane123 | Staff |

---

## Find Your PC IP Address

When you run `npm start`, it shows your IP. Example:
```
💻 Connect from other PC: http://192.168.1.100:3000
```

Use this URL on PC2 (staff's PC)

---

## Troubleshooting

**"Port 3000 is already in use"**
- Restart your computer OR
- Change port in server.js (line 5)

**"Cannot find module 'express'"**
- Run: `npm install`
- Make sure you're in `C:\Test_Web_App` folder

**"Staff doesn't see tasks"**
- Check both PCs are on same WiFi
- Check server is running (see green status)
- Refresh browser (F5)

---

## Stop Server
- Press `Ctrl + C` in Command Prompt
