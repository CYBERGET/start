# EduBloom Studio

EduBloom Studio is a modern, full-featured online and offline tutoring platform designed to connect students and tutors, manage courses, and provide seamless support through AI-powered voice chat. The platform is built for scalability, accessibility, and a delightful user experience for both learners and educators.

## 🚀 Project Idea

**EduBloom Studio** aims to revolutionize the way students and tutors connect, learn, and manage educational experiences. The platform offers:
- A marketplace for real courses and tutors
- Location-based matching (students see nearby tutors, tutors see nearby students)
- Role-based authentication (admin, tutor, student)
- A powerful admin dashboard for platform management
- AI-powered voice support via ElevenLabs
- Beautiful, animated, and accessible UI/UX

## 🛠️ Technologies Used

- **React** (with TypeScript) — UI development
- **Vite** — Lightning-fast development/build tool
- **Tailwind CSS** — Utility-first CSS framework
- **shadcn/ui** — Modern, accessible UI components
- **React Router DOM** — Routing and navigation
- **React Context API** — Global state management (auth, etc.)
- **Mock Backend (in-memory)** — Simulated database and API
- **ElevenLabs Convai Widget** — AI-powered voice chat on every page
- **Lucide Icons** — Modern icon set
- **Custom Animations** — Animated backgrounds and form transitions

## ✨ Features

- **Role-based Authentication** (Admin, Tutor, Student)
- **Animated Sign-in/Sign-up Pages** (with animated backgrounds)
- **Location-Based Matching** (find nearby tutors/students)
- **Admin Dashboard** (user, course, analytics, settings, support management)
- **Course Management** (CRUD for courses, categories, tutors)
- **AI Voice Chat** (ElevenLabs widget on every page except admin)
- **Responsive & Accessible UI** (mobile-friendly, keyboard accessible)
- **Modern Navigation** (clean header, no unnecessary links)

## 🖥️ Setup & Running Locally

### Development Mode
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:8080](http://localhost:8080)

### Full-Stack Development
```bash
# Start both frontend and backend
npm run dev:full
```

### Production Mode
```bash
# Build and start production server
npm run start
```

> **Note:** The ElevenLabs AI voice chat is available on all pages except the admin dashboard.

## 🚀 Deployment

### Quick Deploy (Recommended)
1. **Push to GitHub** - Upload your code to a GitHub repository
2. **Deploy to Render** - Go to [render.com](https://render.com) and connect your repo
3. **Configure**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
   - Port: `10000`
4. **Deploy** - Your app will be live at `https://your-app-name.onrender.com`

### Alternative Platforms
- **Railway**: [railway.app](https://railway.app) - Automatic Node.js detection
- **Vercel**: Frontend-only deployment (without backend API)

📖 **Detailed deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🧑‍💻 Admin Access
- **Email:** `admin@wetute.com`
- **Password:** `admin123`

## 📚 Sample Data
- The platform comes preloaded with sample tutors, students, and courses for demo purposes.

## 📞 AI Voice Chat
- Powered by [ElevenLabs Convai Widget](https://elevenlabs.io/)
- Accessible as a floating widget on every page (except admin)

---

**EduBloom Studio** — Empowering education with technology, accessibility, and AI.
