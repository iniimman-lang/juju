# 🚀 Deployment Guide - Digital Course Arena

## Quick Deploy (Recommended - 15 minutes)

### Option 1: Vercel + Render (Easiest)

#### **Step 1: Deploy Backend to Render** (10 min)

1. Go to https://render.com and sign up (GitHub login recommended)

2. Click **"New +"** → **"Web Service"**

3. Connect your GitHub repo OR upload files:
   - Connect your GitHub account
   - Select the `juju` repository
   - Root Directory: `server`

4. Configure:
   - **Name**: `digital-course-arena-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

5. Add Environment Variables:
   ```
   PORT=5001
   JWT_SECRET=your-super-secret-key-change-this-12345
   NODE_ENV=production
   ```

6. Click **"Create Web Service"**

7. Wait for deployment (~5 minutes)
   - Copy your backend URL (e.g., `https://digital-course-arena-api.onrender.com`)

#### **Step 2: Deploy Frontend to Vercel** (5 min)

1. Go to https://vercel.com and sign up (GitHub login)

2. Click **"Add New Project"**

3. Import your GitHub repo

4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (Replace with your Render backend URL)

6. Click **"Deploy"**

7. Done! Your site is live at `https://your-project.vercel.app`

---

### Option 2: Railway (Alternative - Often More Reliable)

#### **Backend + Database on Railway**

1. Go to https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repo
4. Railway auto-detects Node.js
5. Add variables: `PORT=5001`, `JWT_SECRET=xxx`
6. Deploy!

#### **Frontend on Vercel** (same as above)

---

## Manual File Upload (No GitHub)

### Render (Backend):
1. Zip your `server` folder
2. Use Render's CLI or connect GitHub

### Vercel (Frontend):
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow prompts

---

## Post-Deployment Checklist

### 1. Update API URLs
In your admin panel files, the API calls should use the environment variable.

### 2. Test Everything:
- ✅ Homepage loads
- ✅ Course pages work
- ✅ Admin login works
- ✅ Can add/edit courses
- ✅ Can upload testimonial images
- ✅ Enrollment form submits
- ✅ Can approve/reject enrollments

### 3. Database Migration:
The SQLite database file won't transfer. You'll need to:
- Run the seed script on the new server, OR
- Use a cloud database (MongoDB Atlas free tier)

---

## Database Options

### Current: SQLite (Simple, but limited)
- Works on Render/Railway
- Data stored in file
- **Limitation**: Resets on redeploy

### Better: MongoDB Atlas (Free, Persistent)
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update backend to use MongoDB instead of SQLite

---

## Troubleshooting

### Frontend can't connect to backend:
- Check CORS settings in `server.js`
- Verify API URL in Vercel environment variables
- Check browser console for errors

### Backend not starting:
- Check build logs on Render
- Verify `package.json` has correct start command
- Ensure all dependencies are installed

### Images not uploading:
- Render ephemeral filesystem - images will be deleted on redeploy
- Use Cloudinary or AWS S3 for persistent storage

---

## Need Help?

1. **Render Support**: https://render.com/docs
2. **Vercel Support**: https://vercel.com/docs
3. **Check Logs**: Both platforms have real-time logs

---

## Quick Commands

```bash
# Local testing
cd server && npm start
cd juju && npm run dev

# Build for production
npm run build

# Deploy with Vercel CLI
vercel --prod
```

---

**Estimated Time**: 15-30 minutes
**Cost**: $0 (Free tiers)
**Limits**: 
- Render: 750 hours/month free
- Vercel: Unlimited personal projects
- Railway: $5 credit/month free

Good luck! 🎉
