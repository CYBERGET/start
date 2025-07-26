# 🚀 EduBloom Studio - Full Stack Deployment Guide

## 📋 Overview
EduBloom Studio is a full-stack React + Node.js application with:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js server with ElevenLabs API integration
- **Features**: Authentication, Course Management, Tutor Platform, AI Voice Chat

---

## 🎯 Quick Deploy Options

### Option 1: Render (Recommended - Free)
1. **Push to GitHub**: Upload your code to a GitHub repository
2. **Connect to Render**: Go to [render.com](https://render.com) and sign up
3. **New Web Service**: Click "New Web Service" → "Connect GitHub repository"
4. **Configure**:
   - **Name**: `edubloom-studio`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Port**: `10000`
5. **Deploy**: Click "Create Web Service"
6. **Your URL**: `https://your-app-name.onrender.com`

### Option 2: Railway (Alternative - Free Tier)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy automatically (Railway detects Node.js)

### Option 3: Vercel (Frontend Only)
- Deploy only the frontend (without backend API)
- Use `npm run build` and upload `dist` folder

---

## 🔧 Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Development mode (frontend only)
npm run dev

# Full-stack development
npm run dev:full

# Production build and run
npm run start
```

### Environment Variables
Create `.env` file (optional for local development):
```env
PORT=3001
NODE_ENV=development
```

---

## 📦 Production Build

### Build Process
```bash
# Build the React app
npm run build

# Start production server
npm run start:prod
```

### What Gets Built
- **Frontend**: Optimized React app in `dist/` folder
- **Backend**: Express server serving both API and frontend
- **Static Assets**: CSS, JS, images optimized for production

---

## 🌐 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │  ElevenLabs     │
│   (React App)   │◄──►│   (Express.js)  │◄──►│   (AI Voice)    │
│                 │    │                 │    │                 │
│ - User Interface│    │ - Authentication│    │ - Text-to-Speech│
│ - Course Pages  │    │ - Course Data   │    │ - Voice Chat    │
│ - Tutor Platform│    │ - User Management│   │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🔒 Security Features

### Backend Security
- ✅ API key stored securely on server
- ✅ CORS configured for production
- ✅ Input validation on all endpoints
- ✅ Error handling without exposing internals

### Frontend Security
- ✅ No sensitive data in client code
- ✅ Protected routes for admin access
- ✅ Secure authentication flow

---

## 📊 Performance Optimization

### Frontend
- ✅ Vite build optimization
- ✅ Code splitting (can be improved)
- ✅ Optimized images and assets
- ✅ Lazy loading for components

### Backend
- ✅ Static file serving
- ✅ API response caching
- ✅ Efficient database queries (mock)

---

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill process on port 3001
npx kill-port 3001
# Or change PORT in .env
```

**2. Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**3. API Connection Issues**
```bash
# Test API health
curl http://localhost:3001/api/health
```

**4. ElevenLabs API Issues**
- Check API key validity
- Verify network connectivity
- Check API rate limits

---

## 📈 Monitoring & Analytics

### Health Checks
- **API Health**: `GET /api/health`
- **Frontend**: Serves React app on all routes
- **ElevenLabs**: Voice synthesis endpoint

### Logs
- Server logs in console
- Error tracking in browser console
- API request/response logging

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Render
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.1
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

---

## 🎉 Success Checklist

After deployment, verify:
- ✅ Website loads at your URL
- ✅ All pages are accessible
- ✅ Authentication works
- ✅ Course pages display correctly
- ✅ Tutor platform functions
- ✅ ElevenLabs voice chat works
- ✅ Admin panel accessible
- ✅ Mobile responsive design

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review server logs
3. Test locally first
4. Check deployment platform status

---

**🎯 Your EduBloom Studio is now ready for the world!** 