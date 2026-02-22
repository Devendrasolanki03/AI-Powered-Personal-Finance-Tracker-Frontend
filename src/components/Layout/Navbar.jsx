import { useState, useRef, useEffect } from 'react';
import {
    Menu, Bell, Sun, Moon, User, LogOut, ChevronRight,
    AlertTriangle, CheckCircle, X, Calendar, Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Common/Avatar';
import { getGreeting } from '../../utils/helpers';
import api from '../../api/axios';

// ─── Live Clock ──────────────────────────────────────────────────────────────
const LiveClock = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const date = now.toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short'
    });
    const time = now.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });

    return (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg
                        bg-dark-800/60 dark:bg-dark-800/60
                        light:bg-slate-100 border border-dark-700/50
                        dark:border-dark-700/50 light:border-slate-200">
            <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-ai-400" />
                <span className="text-xs font-medium text-dark-300 dark:text-dark-300 light:text-slate-600">
                    {date}
                </span>
            </div>
            <div className="w-px h-3 bg-dark-700 dark:bg-dark-700 light:bg-slate-300" />
            <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent-400" />
                <span className="text-xs font-mono font-semibold text-dark-200 dark:text-dark-200 light:text-slate-700 tabular-nums">
                    {time}
                </span>
            </div>
        </div>
    );
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [alertsLoading, setAlertsLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const profileRef = useRef(null);
    const notificationRef = useRef(null);

    const isDark = theme === 'dark';

    // ── Close on outside click ────────────────────────────────────────
    useEffect(() => {
        const handler = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target))
                setShowProfile(false);
            if (notificationRef.current && !notificationRef.current.contains(e.target))
                setShowNotifications(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // ── Fetch budget alerts ───────────────────────────────────────────
    const fetchAlerts = async () => {
        setAlertsLoading(true);
        try {
            const res = await api.get('/api/budgets/alerts');
            console.log('🔔 Navbar alerts response:', res.data);
            const data = Array.isArray(res.data) ? res.data : [];
            console.log('🔔 Parsed alerts:', data);
            setAlerts(data);
            const activeCount = data.filter(a => a.status !== 'SAFE').length;
            console.log('🔔 Active alerts count:', activeCount);
            setUnreadCount(activeCount);
        } catch (err) {
            console.error('❌ Could not load alerts:', err);
            console.error('❌ Error details:', {
                status: err.response?.status,
                message: err.response?.data?.message || err.message,
                url: err.config?.url
            });
            // Set empty state so UI doesn't break
            setAlerts([]);
            setUnreadCount(0);
        } finally {
            setAlertsLoading(false);
        }
    };

    // Fetch count on mount (for badge)
    useEffect(() => {
        console.log('🔔 Navbar mounted, fetching alerts...');
        fetchAlerts();
    }, []);

    const handleBellClick = () => {
        setShowNotifications(p => !p);
        setShowProfile(false);
    };

    const handleProfileClick = () => {
        setShowProfile(p => !p);
        setShowNotifications(false);
    };

    const handleProfilePage = () => { navigate('/profile'); setShowProfile(false); };
    const handleLogout = () => { logout(); setShowProfile(false); };

    // ── Status helpers ────────────────────────────────────────────────
    const statusColor = (s) => ({
        EXCEEDED: 'text-red-400',
        CRITICAL: 'text-orange-400',
        WARNING: 'text-yellow-400',
    }[s] ?? 'text-accent-400');

    const statusBg = (s) => ({
        EXCEEDED: 'bg-red-500/10 border-red-500/20',
        CRITICAL: 'bg-orange-500/10 border-orange-500/20',
        WARNING: 'bg-yellow-500/10 border-yellow-500/20',
    }[s] ?? 'bg-accent-500/10 border-accent-500/20');

    const StatusIcon = ({ status }) => (
        ['EXCEEDED', 'CRITICAL', 'WARNING'].includes(status)
            ? <AlertTriangle className={`w-4 h-4 ${statusColor(status)}`} />
            : <CheckCircle className="w-4 h-4 text-accent-400" />
    );

    // ── Theme-aware class helpers ─────────────────────────────────────
    // Navbar bg
    const navBg = isDark
        ? 'bg-dark-900/80 border-dark-800'
        : 'bg-white/90 border-slate-200 shadow-sm';

    // Greeting text
    const greetText = isDark ? 'text-dark-100' : 'text-slate-800';
    const subText = isDark ? 'text-dark-400' : 'text-slate-500';

    // Icon buttons
    const iconBtn = isDark
        ? 'hover:bg-dark-800 text-dark-400 hover:text-dark-100'
        : 'hover:bg-slate-100 text-slate-500 hover:text-slate-800';

    // Mobile menu button
    const menuBtn = isDark
        ? 'hover:bg-dark-800 text-dark-400'
        : 'hover:bg-slate-100 text-slate-500';

    // Dropdown bg
    const dropBg = isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-slate-200';
    const dropHeader = isDark ? 'border-dark-800' : 'border-slate-100';
    const dropItem = isDark
        ? 'text-dark-300 hover:text-dark-100 hover:bg-dark-800'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50';
    const dropFooter = isDark ? 'border-dark-800 text-ai-400 hover:bg-dark-800/50'
        : 'border-slate-100 text-ai-500 hover:bg-slate-50';
    const userInfoBg = isDark
        ? 'border-dark-800 bg-gradient-to-br from-ai-500/5 to-accent-500/5'
        : 'border-slate-100 bg-gradient-to-br from-ai-500/8 to-accent-500/8';
    const userNameTx = isDark ? 'text-dark-100' : 'text-slate-800';
    const userEmailTx = isDark ? 'text-dark-400' : 'text-slate-500';
    const iconInner = isDark ? 'bg-dark-800' : 'bg-slate-100';
    const alertItemBg = isDark ? 'border-dark-800/60 hover:bg-dark-800/40' : 'border-slate-100 hover:bg-slate-50';
    const alertBarBg = isDark ? 'bg-dark-700' : 'bg-slate-200';
    const alertNameTx = isDark ? 'text-dark-100' : 'text-slate-800';
    const alertMsgTx = isDark ? 'text-dark-400' : 'text-slate-500';
    const clockBg = isDark
        ? 'bg-dark-800/60 border-dark-700/50'
        : 'bg-slate-100 border-slate-200';
    const clockDate = isDark ? 'text-dark-300' : 'text-slate-600';
    const clockTime = isDark ? 'text-dark-200' : 'text-slate-700';
    const clockDiv = isDark ? 'bg-dark-700' : 'bg-slate-300';

    return (
        <nav className={`sticky top-0 z-20 backdrop-blur-xl border-b transition-colors duration-200 ${navBg}`}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* ── Left ── */}
                    <div className="flex items-center gap-4">
                        <button onClick={onMenuClick}
                            className={`lg:hidden p-2 rounded-lg transition-colors ${menuBtn}`}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h2 className={`text-lg font-semibold ${greetText}`}>
                                {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
                            </h2>
                            <p className={`text-sm ${subText}`}>
                                Welcome back to your finance dashboard
                            </p>
                        </div>
                    </div>

                    {/* ── Right ── */}
                    <div className="flex items-center gap-2">

                        {/* Date & Time */}
                        <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border ${clockBg}`}>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-ai-400" />
                                <span className={`text-xs font-medium ${clockDate}`}>
                                    <LiveDate />
                                </span>
                            </div>
                            <div className={`w-px h-3 ${clockDiv}`} />
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-accent-400" />
                                <span className={`text-xs font-mono font-semibold tabular-nums ${clockTime}`}>
                                    <LiveTime />
                                </span>
                            </div>
                        </div>

                        {/* Theme Toggle */}
                        <button onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-colors ${iconBtn}`}
                            title="Toggle theme">
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* ── Bell / Notifications ── */}
                        <div className="relative" ref={notificationRef}>
                            <button onClick={handleBellClick}
                                className={`relative p-2 rounded-lg transition-colors ${iconBtn}`}
                                title="Budget alerts">
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 flex items-center justify-center
                                                     w-4 h-4 text-[10px] font-bold bg-red-500 text-white rounded-full">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl
                                                 overflow-hidden z-50 border ${dropBg}`}>
                                    {/* Header */}
                                    <div className={`flex items-center justify-between px-4 py-3 border-b ${dropHeader}`}>
                                        <div className="flex items-center gap-2">
                                            <Bell className="w-4 h-4 text-ai-400" />
                                            <span className={`text-sm font-semibold ${userNameTx}`}>
                                                Budget Alerts
                                            </span>
                                            {unreadCount > 0 && (
                                                <span className="px-1.5 py-0.5 text-[10px] font-bold
                                                                 bg-red-500/20 text-red-400 rounded-full">
                                                    {unreadCount} active
                                                </span>
                                            )}
                                        </div>
                                        <button onClick={() => setShowNotifications(false)}
                                            className={`p-1 rounded transition-colors ${iconBtn}`}>
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* List */}
                                    <div className="max-h-72 overflow-y-auto">
                                        {alertsLoading ? (
                                            <div className="flex items-center justify-center py-8">
                                                <div className="w-6 h-6 border-2 border-ai-500
                                                                border-t-transparent rounded-full animate-spin" />
                                            </div>
                                        ) : alerts.length === 0 ? (
                                            <div className={`flex flex-col items-center justify-center py-8 ${subText}`}>
                                                <CheckCircle className="w-8 h-8 mb-2 text-accent-500/50" />
                                                <p className="text-sm">All budgets are on track!</p>
                                            </div>
                                        ) : (
                                            alerts.map((alert) => (
                                                <div key={alert.budgetId}
                                                    className={`flex items-start gap-3 px-4 py-3 border-b
                                                                transition-colors ${alertItemBg}
                                                                ${alert.status === 'SAFE' ? 'opacity-60' : ''}`}>
                                                    <div className={`mt-0.5 p-1.5 rounded-lg border ${statusBg(alert.status)}`}>
                                                        <StatusIcon status={alert.status} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className={`text-sm font-medium truncate ${alertNameTx}`}>
                                                                {alert.categoryName}
                                                            </p>
                                                            <span className={`text-xs font-semibold ${statusColor(alert.status)}`}>
                                                                {alert.status}
                                                            </span>
                                                        </div>
                                                        <p className={`text-xs mt-0.5 ${alertMsgTx}`}>{alert.message}</p>
                                                        <div className={`mt-1.5 h-1 rounded-full overflow-hidden ${alertBarBg}`}>
                                                            <div className={`h-full rounded-full transition-all ${alert.status === 'EXCEEDED' ? 'bg-red-500' :
                                                                alert.status === 'CRITICAL' ? 'bg-orange-500' :
                                                                    alert.status === 'WARNING' ? 'bg-yellow-500' :
                                                                        'bg-accent-500'
                                                                }`} style={{ width: `${Math.min(alert.percentage, 100)}%` }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <button
                                        onClick={() => { navigate('/budgets'); setShowNotifications(false); }}
                                        className={`w-full flex items-center justify-center gap-2 py-3
                                                    text-sm transition-colors border-t ${dropFooter}`}>
                                        <span>Manage Budgets</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ── Profile ── */}
                        <div className="relative" ref={profileRef}>
                            <button onClick={handleProfileClick}
                                className={`flex items-center gap-1.5 rounded-lg p-1.5 transition-colors ${isDark ? 'hover:bg-dark-800' : 'hover:bg-slate-100'
                                    }`}
                                title="Profile">
                                <Avatar name={user?.name} size="md" />
                                <ChevronRight className={`w-3.5 h-3.5 hidden sm:block transition-transform
                                                          duration-200 ${showProfile ? 'rotate-90' : ''}
                                                          ${isDark ? 'text-dark-500' : 'text-slate-400'}`} />
                            </button>

                            {showProfile && (
                                <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-2xl
                                                 overflow-hidden z-50 border ${dropBg}`}>
                                    {/* User info */}
                                    <div className={`px-4 py-4 border-b ${userInfoBg}`}>
                                        <div className="flex items-center gap-3">
                                            <Avatar name={user?.name} size="lg" />
                                            <div className="min-w-0">
                                                <p className={`text-sm font-semibold truncate ${userNameTx}`}>
                                                    {user?.name}
                                                </p>
                                                <p className={`text-xs truncate ${userEmailTx}`}>{user?.email}</p>
                                                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold
                                                                 rounded-full bg-ai-500/20 text-ai-400 uppercase tracking-wide">
                                                    {user?.role || 'USER'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* My Profile */}
                                    <div className="py-1">
                                        <button onClick={handleProfilePage}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5
                                                        text-sm transition-colors group ${dropItem}`}>
                                            <div className={`p-1.5 rounded-lg transition-colors
                                                             group-hover:bg-ai-500/20 ${iconInner}`}>
                                                <User className="w-3.5 h-3.5 text-dark-400 group-hover:text-ai-400" />
                                            </div>
                                            <span>My Profile</span>
                                            <ChevronRight className={`w-3.5 h-3.5 ml-auto
                                                                       ${isDark ? 'text-dark-600' : 'text-slate-300'}
                                                                       group-hover:text-dark-400`} />
                                        </button>
                                    </div>

                                    {/* Logout */}
                                    <div className={`border-t py-1 ${dropHeader}`}>
                                        <button onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
                                                       text-red-400 hover:text-red-300 hover:bg-red-500/10
                                                       transition-colors group">
                                            <div className={`p-1.5 rounded-lg group-hover:bg-red-500/20
                                                             transition-colors ${iconInner}`}>
                                                <LogOut className="w-3.5 h-3.5 text-red-500" />
                                            </div>
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// ─── Separate tiny components for live clock ─────────────────────────────────
const LiveDate = () => {
    const [d, setD] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setD(new Date()), 60000);
        return () => clearInterval(t);
    }, []);
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};

const LiveTime = () => {
    const [d, setD] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setD(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
};

export default Navbar;