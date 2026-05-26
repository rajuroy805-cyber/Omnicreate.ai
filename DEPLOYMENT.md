# 🚀 Omnicreate.ai - Deployment Guide

## Local Development Setup

### 1. Prerequisites
- Node.js 18+ installed
- npm or yarn
- Git

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/rajuroy805-cyber/Omnicreate.ai.git
cd Omnicreate.ai

# Install dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your API keys
nano .env.local
```

**Required API Keys:**
- Supabase URL & Anon Key
- Cloudinary credentials
- RunwayML API Key
- ElevenLabs API Key
- Replicate API Token
- SyncLabs API Key

### 4. Run Locally

**Terminal 1 - Frontend:**
```bash
npm run dev
# Opens at http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
node server.js
# Runs at http://localhost:3000
```

---

## Vercel Deployment (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Select "Import Git Repository"
4. Choose `rajuroy805-cyber/Omnicreate.ai`

### Step 3: Configure Project

**Build Settings:**
- Framework: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Step 4: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
VITE_SUPABASE_URL = your_supabase_url
VITE_SUPABASE_ANON_KEY = your_key
VITE_API_URL = your_vercel_url
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
RUNWAY_API_KEY = your_runway_key
ELEVENLABS_API_KEY = your_elevenlabs_key
REPLICATE_API_TOKEN = your_replicate_token
SYNCLABS_API_KEY = your_synclabs_key
```

### Step 5: Deploy
- Click "Deploy" button
- Wait for build to complete
- Your app will be live! 🎉

---

## Getting API Keys

### 🔵 Supabase
1. Visit https://supabase.com
2. Create new project
3. Go to Settings → API
4. Copy `Project URL` and `Anon Key`

### 🟦 Cloudinary
1. Visit https://cloudinary.com
2. Sign up → Dashboard
3. Settings → API Keys
4. Copy Cloud Name, API Key, API Secret

### 🟪 RunwayML
1. Visit https://runwayml.com
2. Account Settings → API
3. Generate new API key

### 🟨 ElevenLabs
1. Visit https://elevenlabs.io
2. Account → Profile → API Key
3. Copy your API key

### 🔴 Replicate
1. Visit https://replicate.com
2. Account → API Token
3. Copy your token

### 🟩 SyncLabs
1. Visit https://synclabs.so
2. Dashboard → API Keys
3. Generate and copy key

---

## Build & Production

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

---

## Troubleshooting

### Build Fails
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)
- Check for TypeScript errors: `npm run lint`

### API Not Working
- Verify all environment variables are set
- Check CORS settings in `server.js`
- Ensure backend is running on correct port
- Check browser console for errors

### Videos Not Uploading
- Verify Cloudinary credentials
- Check file size limits
- Ensure uploads directory exists

---

## Project Structure

```
Omnicreate.ai/
├── src/
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── pages/            # Page components
├── server.js             # Backend server
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── vercel.json           # Vercel config
├── tsconfig.json         # TypeScript config
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
└── README.md             # Project overview
```

---

## Monitoring & Maintenance

### Check Vercel Deployments
1. Go to vercel.com/dashboard
2. Select your project
3. View deployment history and logs

### Monitor Errors
- Check Vercel Analytics
- Monitor Supabase logs
- Check backend error logs

### Update Dependencies
```bash
npm update
npm audit fix
```

---

## Support

For issues or questions:
- Check GitHub Issues
- Review API documentation
- Contact service support

**Happy Deploying! 🚀**
