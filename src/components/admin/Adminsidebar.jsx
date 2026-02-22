import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    TrendingUp,
    Sparkles,
    DollarSign,
    Settings,
    Shield
} from 'lucide-react';

const AdminSidebar = () => {
    const navItems = [
        {
            path: '/admin/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
        },
        {
            path: '/admin/users',
            icon: Users,
            label: 'Users',
        },
        {
            path: '/admin/analytics',
            icon: TrendingUp,
            label: 'Analytics',
        },
        {
            path: '/admin/insights',
            icon: Sparkles,
            label: 'AI Insights',
        },
        {
            path: '/admin/revenue',
            icon: DollarSign,
            label: 'Revenue',
        },
        {
            path: '/admin/settings',
            icon: Settings,
            label: 'Settings',
        },
    ];

    return (
        <div className="w-64 bg-[#0f1729] border-r border-gray-800/50 flex flex-col fixed h-screen">
            {/* Logo */}
            <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">₹</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Finance AI</h1>
                        <p className="text-xs text-gray-400">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                        : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800/50">
                <div className="px-4 py-3 rounded-lg bg-gray-800/30">
                    <p className="text-xs text-gray-400">Version 1.0.0</p>
                    <p className="text-xs text-gray-500 mt-1">© 2026 Finance AI</p>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;