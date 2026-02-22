# 🚀 AI-Powered Personal Finance Tracker - Frontend Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Authentication System](#authentication-system)
6. [User Flow](#user-flow)
7. [Admin Panel Flow](#admin-panel-flow)
8. [API Integration](#api-integration)
9. [Component Documentation](#component-documentation)
10. [New Features](#new-features)
11. [Security Features](#security-features)
12. [Troubleshooting](#troubleshooting)

---

## 📊 Overview

A comprehensive personal finance management application with **Google Gemini AI-powered insights**, built with React and Vite. Features include expense tracking, budget management with real-time alerts, AI chat recommendations, and a complete admin panel for system monitoring.

**Key Features:**
- ✅ User Authentication (Local + Google OAuth 2.0)
- ✅ Expense & Income Tracking with Categories
- ✅ **Real-time Budget Alerts** (WARNING, CRITICAL, EXCEEDED)
- ✅ **AI-Powered Financial Advisor** (Google Gemini)
- ✅ **Custom AI Chat** - Ask any finance question
- ✅ **Markdown-rendered AI responses** for better readability
- ✅ Interactive Dashboard with Recharts
- ✅ Admin Panel for System Management
- ✅ **Navbar Badge Notifications** for budget alerts
- ✅ Responsive Design (Mobile + Desktop)
- ✅ Dark Theme with Tailwind CSS
- ✅ Real-time Data Visualization

---

## 🛠️ Tech Stack

### Core Technologies
- **React** 18.x - UI Framework
- **Vite** 4.x - Build tool (faster than CRA)
- **React Router** 6.x - Client-side routing
- **Axios** 1.x - HTTP client for API calls
- **Tailwind CSS** 3.x - Utility-first styling

### UI & UX Libraries
- **Recharts** 2.x - Data visualization & interactive charts
- **Framer Motion** 10.x - Smooth animations
- **Lucide React** 0.x - Modern icon library
- **React Hot Toast** 2.x - Toast notifications
- **React Markdown** 8.x - Markdown rendering for AI responses ⭐ NEW

### State Management
- **React Hooks** (useState, useEffect, useContext, useCallback)
- **Context API** (AuthContext, ThemeContext)
- **LocalStorage** - Token & user data persistence

### Build & Development Tools
- **Vite** - Lightning-fast HMR
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📁 Project Structure

```
frontend/
│
├── public/
│   ├── index.html
│   └── vite.svg
│
├── src/
│   ├── api/
│   │   ├── axios.js              # Axios instance with interceptors
│   │   ├── auth.api.js           # Login, register APIs
│   │   ├── expense.api.js        # Expense CRUD
│   │   ├── income.api.js         # Income CRUD
│   │   ├── budget.api.js         # Budget + Alerts APIs ⭐ UPDATED
│   │   ├── ai.api.js             # AI advice + chat APIs ⭐ UPDATED
│   │   ├── category.api.js       # Category APIs
│   │   └── admin.api.js          # Admin operations
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Card.jsx          # Reusable card wrapper
│   │   │   ├── Button.jsx        # Styled button component
│   │   │   ├── Input.jsx         # Form input component
│   │   │   ├── Avatar.jsx        # User avatar
│   │   │   └── Loader.jsx        # Loading spinner
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.jsx         # Login form with OAuth
│   │   │   ├── Register.jsx      # Registration form
│   │   │   └── OAuthSuccess.jsx  # OAuth callback handler
│   │   │
│   │   └── layout/
│   │       ├── Navbar.jsx        # Navigation with alerts badge ⭐ UPDATED
│   │       ├── Sidebar.jsx       # Sidebar navigation
│   │       └── Footer.jsx        # Footer component
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx         # Main dashboard with charts
│   │   ├── Expenses.jsx          # Expense management
│   │   ├── Income.jsx            # Income management
│   │   ├── Budget.jsx            # Budget page with alerts ⭐ UPDATED
│   │   ├── AIInsights.jsx        # AI advisor with chat ⭐ UPDATED
│   │   ├── Analytics.jsx         # Reports and analytics
│   │   ├── Profile.jsx           # User profile settings
│   │   │
│   │   └── admin/
│   │       ├── AdminLayout.jsx   # Admin wrapper
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminUsers.jsx
│   │       ├── AdminAnalytics.jsx
│   │       ├── AdminInsights.jsx
│   │       ├── AdminRevenue.jsx
│   │       └── AdminSettings.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx       # Authentication state ⭐ UPDATED
│   │   └── ThemeContext.jsx      # Dark/light theme
│   │
│   ├── hooks/
│   │   ├── useAuth.js            # Auth hook
│   │   ├── useDebounce.js        # Debounce input
│   │   └── useLocalStorage.js    # LocalStorage hook
│   │
│   ├── utils/
│   │   ├── helpers.js            # formatCurrency, formatDate
│   │   ├── constants.js          # App constants ⭐ UPDATED
│   │   └── validators.js         # Form validation
│   │
│   ├── routes/
│   │   ├── ProtectedRoute.jsx    # User route guard
│   │   └── AdminRoute.jsx        # Admin route guard
│   │
│   ├── App.jsx                   # Main app with routing ⭐ UPDATED
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles + Tailwind
│
├── .env                          # Environment variables
├── .env.example                  # Example env file
├── .gitignore
├── package.json
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js
└── README.md
```

---

## 🔧 Installation & Setup

### Prerequisites
```bash
Node.js >= 16.x (Recommended: 18.x)
npm >= 8.x (or yarn/pnpm)
Git
```

### Step 1: Clone Repository
```bash
git clone https://github.com/your-repo/finance-tracker.git
cd finance-tracker/frontend
```

### Step 2: Install Dependencies
```bash
npm install

# Or with yarn
yarn install

# Or with pnpm
pnpm install
```

### Step 3: Install New Dependencies (if not already)
```bash
# React Markdown for AI response formatting
npm install react-markdown

# All other dependencies should be in package.json
```

### Step 4: Environment Configuration

Create `.env` file in frontend root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8086

# Google OAuth (optional - for OAuth login)
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
VITE_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# App Configuration
VITE_APP_NAME=Finance Tracker
VITE_APP_VERSION=1.0.0
```

**Important:** 
- All Vite env variables must start with `VITE_`
- Don't commit `.env` to git (use `.env.example` as template)

### Step 5: Start Development Server
```bash
npm run dev
```

Application runs on: **http://localhost:3000**

### Step 6: Build for Production
```bash
npm run build      # Creates optimized build in dist/
npm run preview    # Preview production build locally
```

---

## 🔐 Authentication System

### 1. Local Authentication

#### Registration Flow
```
User fills Register form
    ↓
Frontend: POST /api/auth/register
    { name, email, password, city, state, country }
    ↓
Backend validates & creates user
    ↓
Success message
    ↓
Redirect to Login page
```

**Code Example:**
```javascript
// Register.jsx
const handleRegister = async (formData) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/auth/register`,
            formData
        );
        toast.success('Registration successful! Please login.');
        navigate('/login');
    } catch (error) {
        toast.error(error.response?.data?.message || 'Registration failed');
    }
};
```

#### Login Flow
```
User fills Login form
    ↓
Frontend: POST /api/auth/login
    { email, password }
    ↓
Backend validates credentials
    ↓
Generate JWT token
    ↓
Return { token, user }
    ↓
Frontend stores in localStorage
    ↓
Update AuthContext
    ↓
Redirect to /dashboard
```

**Code Example:**
```javascript
// Login.jsx
const handleLogin = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/auth/login`,
            { email, password }
        );
        
        // Store token and user
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Update context
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        toast.success('Login successful!');
        navigate('/dashboard');
    } catch (error) {
        toast.error('Invalid credentials');
    }
};
```

### 2. Google OAuth 2.0 Login

#### OAuth Flow
```
1. User clicks "Login with Google"
    ↓
2. Frontend redirects to backend OAuth URL:
   window.location.href = 'http://localhost:8086/oauth2/authorization/google'
    ↓
3. Backend redirects to Google login page
    ↓
4. User logs in with Google
    ↓
5. Google redirects to backend callback:
   http://localhost:8086/login/oauth2/code/google?code=AUTH_CODE
    ↓
6. Backend:
   - Exchanges code for user info
   - Creates/updates user in database
   - Generates JWT token
   - Redirects to frontend:
     http://localhost:3000/auth/callback?token=JWT&user=USER_DATA
    ↓
7. Frontend (OAuthSuccess component):
   - Extracts token and user from URL params
   - Stores in localStorage
   - Updates AuthContext
   - Redirects to /dashboard
```

**Frontend Code:**
```javascript
// Login.jsx - OAuth button
const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
};

<button onClick={handleGoogleLogin}>
    <GoogleIcon /> Login with Google
</button>

// OAuthSuccess.jsx - Callback handler
useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userData = params.get('user');
    
    if (token && userData) {
        // Store credentials
        localStorage.setItem('token', token);
        localStorage.setItem('user', userData);
        
        // Parse user data
        const user = JSON.parse(decodeURIComponent(userData));
        setUser(user);
        setIsAuthenticated(true);
        
        toast.success(`Welcome back, ${user.name}!`);
        navigate('/dashboard');
    } else {
        toast.error('OAuth login failed');
        navigate('/login');
    }
}, []);
```

### 3. Token Management

#### Axios Interceptor
```javascript
// api/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - Add token to every request
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - Handle 401 errors
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;
```

#### Auth Context
```javascript
// context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Check for existing session on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);
    
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };
    
    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            loading,
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
```

### 4. Protected Routes
```javascript
// routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Usage in App.jsx
<Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/expenses" element={<Expenses />} />
    <Route path="/budget" element={<Budget />} />
    <Route path="/ai-insights" element={<AIInsights />} />
    <Route path="/profile" element={<Profile />} />
</Route>
```

---

## 🆕 New Features

### 1. Real-time Budget Alerts ⭐

**Location:** `pages/Budget.jsx` + `components/layout/Navbar.jsx`

**How it works:**
1. User sets monthly budget limits per category
2. System monitors spending in real-time
3. Calculates percentage: `(spent / limit) * 100`
4. Generates alerts based on thresholds:
   - **0-79%**: ✅ SAFE (green)
   - **80-89%**: ⚠️ WARNING (yellow)
   - **90-99%**: 🔴 CRITICAL (orange)
   - **100%+**: 🚨 EXCEEDED (red, pulsing)

**Features:**
- Visual progress bars with animations
- Color-coded status indicators
- Navbar badge showing alert count
- Toast notifications for EXCEEDED status
- Detailed breakdown on Budget page

**API Endpoint:**
```javascript
// Fetch budget alerts
GET /api/budgets/alerts

// Response
[
    {
        categoryId: 1,
        categoryName: "Food & Dining",
        limit: 10000,
        spent: 8500,
        percentage: 85.0,
        status: "WARNING",
        message: "You've used 85.0% of your Food budget"
    }
]
```

**Frontend Implementation:**
```javascript
// Budget.jsx
const loadAlerts = async () => {
    try {
        const res = await api.get('/api/budgets/alerts');
        const data = Array.isArray(res.data) ? res.data : [];
        setAlerts(data);
        
        const exceeded = data.filter(a => a.status === 'EXCEEDED');
        if (exceeded.length > 0) {
            toast.error(
                `🚨 ${exceeded.length} budget(s) exceeded!`,
                { id: 'budget-exceeded' }  // Prevent duplicates
            );
        }
    } catch (error) {
        console.error('Failed to load alerts:', error);
    }
};

// Navbar.jsx - Badge notification
const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {
    fetchAlerts();
}, []);

const fetchAlerts = async () => {
    const res = await api.get('/api/budgets/alerts');
    const data = res.data;
    const activeCount = data.filter(a => a.status !== 'SAFE').length;
    setUnreadCount(activeCount);
};

<div className="relative">
    <Bell className="w-5 h-5" />
    {unreadCount > 0 && (
        <span className="badge">
            {unreadCount > 9 ? '9+' : unreadCount}
        </span>
    )}
</div>
```

---

### 2. AI Financial Advisor with Gemini ⭐

**Location:** `pages/AIInsights.jsx`

**Major Updates:**
- ✅ Switched from OpenAI to **Google Gemini**
- ✅ Added **custom chat interface** for user questions
- ✅ **Markdown rendering** for formatted responses
- ✅ Removed automatic AI calls on page load (performance)
- ✅ Manual "Generate New Advice" button
- ✅ History sidebar with all past insights
- ✅ Better error handling with graceful fallbacks

**Features:**

**A) Auto-Generated Financial Advice**
```javascript
// User clicks "Generate New Advice"
const generateNewAdvice = async () => {
    setGenerating(true);
    try {
        const response = await getAIAdvice();  // GET /api/ai/advice
        const aiText = response.advice;
        
        // Display with typing animation
        animateText(aiText);
        
        // Reload history
        await loadAllInsights();
        
        toast.success('✨ New AI advice generated!');
    } catch (error) {
        toast.error('AI temporarily unavailable');
    } finally {
        setGenerating(false);
    }
};
```

**B) Custom AI Chat** ⭐ NEW
```javascript
// User types custom question
const handleChatSubmit = async (e) => {
    e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    setChatLoading(true);
    try {
        const response = await api.post(
            '/api/ai/chat',
            chatInput,
            { headers: { 'Content-Type': 'text/plain' } }
        );
        
        // Display AI response
        animateText(response.data);
        
        toast.success('✨ Response generated!');
        setChatInput('');
        
        // Reload history
        await loadAllInsights();
    } catch (error) {
        toast.error('Failed to get response');
    } finally {
        setChatLoading(false);
    }
};

// UI
<div className="chat-input">
    <input
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="Ask anything... e.g., 'How can I save ₹5000?'"
    />
    <button onClick={handleChatSubmit}>
        <Send className="w-4 h-4" />
        Ask
    </button>
</div>
```

**C) Markdown Rendering** ⭐ NEW
```javascript
import ReactMarkdown from 'react-markdown';

// Instead of plain text
<p>{typedText}</p>

// Use Markdown component
<div className="prose prose-invert">
    <ReactMarkdown>{typedText}</ReactMarkdown>
</div>

// Supports:
// - **Bold text**
// - # Headers
// - Bullet lists
// - Numbered lists
// - Code blocks
// - Links
```

**Example AI Response:**
```markdown
# 📊 Smart Savings Plan for DPL Residents

## 1. **Budget Optimization**
Given your monthly expenses of ₹37,000, aim to keep needs below 50% of income.

## 2. **Cost-Cutting Tips**
- **Groceries**: Buy in bulk at wholesale markets (save 20-30%)
- **Energy**: Switch to LED bulbs (reduce electricity by ₹500/month)
- **Transport**: Use public transit 3 days/week (save ₹2,000/month)

## 3. **Savings Strategy**
- Set up automatic transfer of 20% salary to savings account
- Target: ₹10,000/month emergency fund
- After 6 months, start SIP of ₹5,000/month

**Tip**: Track daily expenses using this app to identify spending leaks!
```

---

### 3. Enhanced Dashboard

**Updates:**
- Real-time budget alert banner
- Category-wise spending pie charts
- Monthly trend line charts
- Budget vs actual comparison cards
- Recent transactions list
- AI insights preview

**New Metrics:**
```javascript
{
    totalIncome: 150000,
    totalExpense: 98000,
    savings: 52000,
    savingsRate: 34.67,  // percentage
    activeBudgets: 8,
    exceededBudgets: 2,
    topCategory: "Food & Dining",
    aiInsightsCount: 12
}
```

---

### 4. Improved Navbar

**New Features:**
- Budget alert badge with count
- Notification dropdown with alert details
- Real-time date/time widget
- Theme toggle (dark mode)
- User profile dropdown
- Quick access to budget alerts

**Code:**
```javascript
// Navbar.jsx
const Navbar = () => {
    const [alerts, setAlerts] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    
    useEffect(() => {
        fetchAlerts();
    }, []);
    
    const fetchAlerts = async () => {
        const res = await api.get('/api/budgets/alerts');
        setAlerts(res.data);
        setUnreadCount(res.data.filter(a => a.status !== 'SAFE').length);
    };
    
    return (
        <nav>
            {/* Date/Time Widget */}
            <LiveClock />
            
            {/* Notifications Bell */}
            <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)}>
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="badge">{unreadCount}</span>
                    )}
                </button>
                
                {/* Dropdown */}
                {showNotifications && (
                    <div className="notification-dropdown">
                        <h3>Budget Alerts ({unreadCount})</h3>
                        {alerts.map(alert => (
                            <div key={alert.categoryId} className={`alert-${alert.status}`}>
                                <p>{alert.categoryName}</p>
                                <p>{alert.message}</p>
                                <div className="progress-bar">
                                    <div style={{ width: `${alert.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                        <button onClick={() => navigate('/budgets')}>
                            Manage Budgets →
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};
```

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "recharts": "^2.10.3",
    "framer-motion": "^10.16.16",
    "lucide-react": "^0.294.0",
    "react-hot-toast": "^2.4.1",
    "react-markdown": "^8.0.7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0"
  }
}
```

### Install Commands
```bash
# Core
npm install react react-dom react-router-dom

# HTTP & API
npm install axios

# UI Components
npm install recharts framer-motion lucide-react react-hot-toast

# NEW: Markdown rendering
npm install react-markdown

# Dev Tools
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer eslint
```

---

## 🔒 Security Best Practices

### 1. Token Security
```javascript
// ✅ DO: Store in localStorage (acceptable for SPAs)
localStorage.setItem('token', token);

// ❌ DON'T: Store in cookies without HttpOnly flag (XSS risk)
document.cookie = `token=${token}`;

// ✅ DO: Include in Authorization header
config.headers.Authorization = `Bearer ${token}`;

// ✅ DO: Clear on logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

### 2. XSS Protection
```javascript
// ✅ DO: Sanitize user input
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);

// ❌ DON'T: Use dangerouslySetInnerHTML with user input
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ DO: Use React's built-in escaping
<div>{userInput}</div>
```

### 3. API Key Protection
```javascript
// ✅ DO: Use environment variables
const API_KEY = import.meta.env.VITE_API_KEY;

// ❌ DON'T: Hardcode sensitive data
const API_KEY = 'sk-abc123...';

// ✅ DO: Add .env to .gitignore
# .gitignore
.env
.env.local
```

### 4. HTTPS in Production
```javascript
// vite.config.js - Force HTTPS in production
export default defineConfig({
  server: {
    https: process.env.NODE_ENV === 'production'
  }
});
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```
Output: `dist/` folder

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**vercel.json:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Environment Variables in Production

**Netlify:**
- Go to Site settings → Environment variables
- Add `VITE_API_BASE_URL`, etc.

**Vercel:**
- Go to Project settings → Environment Variables
- Add all `VITE_*` variables

---

## 🐛 Troubleshooting

### Common Issues

**1. CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Backend must enable CORS for frontend origin:
```java
@CrossOrigin(origins = "http://localhost:3000")
```

**2. OAuth Redirect Not Working**
```
Google OAuth login fails after redirect
```
**Solutions:**
- Check Google Cloud Console → Authorized redirect URIs
- Verify backend OAuth handler exists
- Check frontend `OAuthSuccess` component

**3. Budget Alerts Not Showing**
```
Navbar badge shows 0 even with exceeded budgets
```
**Solutions:**
- Check console for API errors
- Verify endpoint: `GET /api/budgets/alerts`
- Check backend alert generation logic
- Clear browser cache

**4. AI Responses Not Formatted**
```
AI text shows raw markdown (**, #, etc.)
```
**Solution:** Install react-markdown:
```bash
npm install react-markdown
```

**5. Token Expired**
```
Request fails with 401 Unauthorized
```
**Solutions:**
- Token expired (24hr default) - re-login
- Token invalid - clear localStorage and re-login
- Backend JWT secret changed - all tokens invalidated

**6. Build Fails**
```
npm run build fails with errors
```
**Solutions:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Update dependencies
npm update

# Check for syntax errors
npm run lint
```

---

## 📚 Resources

### Official Documentation
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Framer Motion](https://www.framer.com/motion)
- [React Markdown](https://github.com/remarkjs/react-markdown)

### Tutorials
- [Vite + React Setup](https://vitejs.dev/guide)
- [JWT Authentication](https://jwt.io/introduction)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Recharts Examples](https://recharts.org/en-US/examples)

---

## 👥 Team & Support

**Developer:** Devendra Solanki  
**Role:** Java Full Stack Developer  
**Email:** devendrasolanki1485@gmail.com  
**Phone:** +91 7828199107  
**Location:** Indore, Madhya Pradesh, India  
**Version:** 2.0.0  
**Last Updated:** February 19, 2026

**Connect:**
- 🔗 LinkedIn: [linkedin.com/in/devendrasolanki03](https://linkedin.com/in/devendrasolanki03)
- 💻 GitHub: [github.com/Devendrasolanki03](https://github.com/Devendrasolanki03)
- 📧 Email: devendrasolanki1485@gmail.com

**Support:**
- Email: devendrasolanki1485@gmail.com
- Issues: [GitHub Issues](https://github.com/Devendrasolanki03/finance-tracker/issues)
- Docs: [Project Wiki](https://github.com/Devendrasolanki03/finance-tracker/wiki)

---

## 📄 License

MIT License - See LICENSE file for details

---

**🎉 Happy Coding!**

**Made with ❤️ by Devendra Solanki**  
Java Full Stack Developer | Indore, India  
Using React + Vite + Google Gemini AI + Spring Boot

📧 devendrasolanki1485@gmail.com | 🔗 [LinkedIn](https://linkedin.com/in/devendrasolanki03) | 💻 [GitHub](https://github.com/Devendrasolanki03)