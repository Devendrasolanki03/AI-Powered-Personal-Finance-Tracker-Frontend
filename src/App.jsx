// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import { ThemeProvider } from './context/ThemeContext';
// import ProtectedRoute from './routes/ProtectedRoute';
// import AdminProtectedRoute from './routes/AdminProtectedRoute';

// // Public Pages
// import OAuthSuccess from './pages/auth/OAuthSuccess';
// import LandingPage from './pages/LandingPage';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';

// // User Pages
// import Dashboard from './pages/dashboard/Dashboard';
// import Analytics from './pages/dashboard/Analytics';
// import AIInsights from './pages/dashboard/AIInsights';
// import Income from './pages/finance/Income';
// import Expense from './pages/finance/Expense';
// import Budget from './pages/finance/Budget';
// import Profile from './pages/profile/Profile';

// // Admin Pages
// import AdminLogin from './pages/admin/AdminLogin';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminUsers from './pages/admin/AdminUsers';
// import AdminAnalytics from './pages/admin/AdminAnalytics';
// import AdminInsights from './pages/admin/AdminInsights';
// import AdminRevenue from './pages/admin/AdminRevenue';
// import AdminSettings from './pages/admin/AdminSettings';
// import AdminLayout from './components/admin/AdminLayout';

// // User Layout
// import Layout from './components/layout/Layout';

// function App() {
//   return (
//     <Router>
//       <ThemeProvider>
//         <AuthProvider>
//           <Toaster
//             position="top-right"
//             toastOptions={{
//               duration: 4000,
//               style: {
//                 background: '#1e293b',
//                 color: '#f1f5f9',
//                 border: '1px solid #334155',
//                 borderRadius: '8px',
//               },
//               success: { iconTheme: { primary: '#22c55e', secondary: '#f1f5f9' } },
//               error: { iconTheme: { primary: '#ef4444', secondary: '#f1f5f9' } },
//             }}
//           />

//           <Routes>
//             {/* ========== PUBLIC ROUTES ========== */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/oauth-success" element={<OAuthSuccess />} />

//             {/* ========== ADMIN ROUTES ========== */}
//             {/* Admin Login (Public) */}
//             <Route path="/admin/login" element={<AdminLogin />} />

//             {/* Protected Admin Routes */}
//             <Route element={<AdminProtectedRoute />}>
//               <Route element={<AdminLayout />}>
//                 <Route path="/admin/dashboard" element={<AdminDashboard />} />
//                 <Route path="/admin/users" element={<AdminUsers />} />
//                 <Route path="/admin/analytics" element={<AdminAnalytics />} />
//                 <Route path="/admin/insights" element={<AdminInsights />} />
//                 <Route path="/admin/revenue" element={<AdminRevenue />} />
//                 <Route path="/admin/settings" element={<AdminSettings />} />
//               </Route>
//             </Route>

//             {/* ========== USER PROTECTED ROUTES ========== */}
//             <Route element={<ProtectedRoute />}>
//               <Route element={<Layout />}>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/analytics" element={<Analytics />} />
//                 <Route path="/ai-insights" element={<AIInsights />} />
//                 <Route path="/income" element={<Income />} />
//                 <Route path="/expense" element={<Expense />} />
//                 <Route path="/budget" element={<Budget />} />
//                 <Route path="/profile" element={<Profile />} />
//               </Route>
//             </Route>

//             {/* ========== FALLBACK ========== */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </AuthProvider>
//       </ThemeProvider>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminProtectedRoute from './routes/AdminProtectedRoute';

// Public Pages
import OAuthSuccess from './pages/auth/OAuthSuccess';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User Pages
import Dashboard from './pages/dashboard/Dashboard';
import Analytics from './pages/dashboard/Analytics';
import AIInsights from './pages/dashboard/AIInsights';
import Income from './pages/finance/Income';
import Expense from './pages/finance/Expense';
import Budget from './pages/finance/Budget';
import Profile from './pages/profile/Profile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminInsights from './pages/admin/AdminInsights';
import AdminRevenue from './pages/admin/AdminRevenue';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLayout from './components/admin/AdminLayout';

// User Layout
// import Layout from './components/layout/Layout';
 import Layout from './components/Layout/Layout';

// ✅ Theme Selector Component
import ThemeSelector from './components/ThemeSelector';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
                borderRadius: '8px',
              },
              success: { iconTheme: { primary: '#22c55e', secondary: '#f1f5f9' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#f1f5f9' } },
            }}
          />

          <Routes>
            {/* ========== PUBLIC ROUTES ========== */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />

            {/* ========== ADMIN ROUTES ========== */}
            {/* Admin Login (Public) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/insights" element={<AdminInsights />} />
                <Route path="/admin/revenue" element={<AdminRevenue />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>
            </Route>

            {/* ========== USER PROTECTED ROUTES ========== */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/ai-insights" element={<AIInsights />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>

            {/* ========== FALLBACK ========== */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* ✅ FLOATING THEME SELECTOR BUTTON */}
          <ThemeSelector />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
