import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    TrendingUp,
    Wallet,
    CreditCard,
    PiggyBank,
    Bot,
    User,
    LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../Common/ThemeToggle';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { logout } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Analytics', icon: TrendingUp, path: '/analytics' },
        { name: 'Income', icon: Wallet, path: '/income' },
        { name: 'Expenses', icon: CreditCard, path: '/expense' },
        { name: 'Budget', icon: PiggyBank, path: '/budget' },
        { name: 'AI Insights', icon: Bot, path: '/ai-insights' },
        { name: 'Profile', icon: User, path: '/profile' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                />
            )}

            {/* Sidebar - FIXED */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 z-40
                    w-64 h-screen
                    bg-dark-900 border-r border-dark-800
                    flex flex-col
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                {/* Logo */}
                <div className="p-6 border-b border-dark-800">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ai-500 to-ai-700 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">₹</span>
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-lg gradient-text">
                                FinanceAI
                            </h1>
                            <p className="text-xs text-dark-400">Smart Money Tracker</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg
                                    transition-all duration-200
                                    ${isActive
                                        ? 'bg-ai-500/20 text-ai-400'
                                        : 'text-dark-400 hover:bg-dark-800 hover:text-dark-100'
                                    }
                                `}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="ml-auto w-1 h-6 bg-ai-500 rounded-full"
                                    />
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer - Theme Toggle & Logout */}
                <div className="p-4 border-t border-dark-800 space-y-3">
                    {/* Theme Toggle */}
                    {/* <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-sm text-dark-400">Theme</span>
                        <ThemeToggle />
                    </div> */}
                    {/* Logout Button */}
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg
                            text-danger-400 hover:bg-danger-500/10 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
