import { Outlet, useNavigate } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';
// import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminSidebar from './AdminSidebar.jsx';
import toast from 'react-hot-toast';

const AdminLayout = () => {
    const navigate = useNavigate();
    const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{"name": "Admin User"}');

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-[#0a0f1e] overflow-hidden">
            <AdminSidebar />

            <div className="flex-1 flex flex-col overflow-hidden ml-64">
                <nav className="bg-[#0f1729] border-b border-gray-800/50 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                            <p className="text-sm text-gray-400 mt-1">Welcome back, {adminUser.name}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <button className="relative p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Online Status */}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-sm text-emerald-400 font-medium">Online</span>
                            </div>

                            {/* Admin Badge */}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                <span className="text-sm font-medium text-red-400">Admin</span>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="flex-1 overflow-y-auto p-8 bg-[#0a0f1e]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
