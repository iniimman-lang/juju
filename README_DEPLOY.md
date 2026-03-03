# Digital Course Arena - Deployment Files

## 📁 Files Created for Deployment

### Frontend (Vercel):
- ✅ `vercel.json` - Vercel configuration
- ✅ `.env.example` - Environment variables template
- ✅ `src/config/api.js` - API URL configuration

### Backend (Render/Railway):
- ✅ `server/package.json` - Dependencies
- ✅ `server/server.js` - Main server file
- ✅ `server/.env` - Environment variables

## 🚀 Quick Deploy Steps

### 1. Push to GitHub
```bash
cd /Users/inioduudosoh/Desktop/juju
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy Backend (Render)
1. Visit: https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `server`
5. Build: `npm install`
6. Start: `node server.js`
7. Add env variables:
   - `PORT=5001`
   - `JWT_SECRET=change-this-to-random-string`
8. Deploy!

### 3. Deploy Frontend (Vercel)
1. Visit: https://vercel.com
2. Add Project → Import GitHub repo
3. Framework: Vite
4. Add env variable:
   - `VITE_API_URL=https://your-app.onrender.com`
5. Deploy!

## 📝 Or Use This Summary

**Backend URL**: Will be like `https://your-app.onrender.com`
**Frontend URL**: Will be like `https://your-app.vercel.app`

**Total Time**: ~20 minutes
**Cost**: FREE

---

For detailed instructions, see `DEPLOYMENT.md`
