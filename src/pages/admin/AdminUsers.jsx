// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Search, Eye, Ban, CheckCircle, MapPin, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
// import adminAPI from '../../api/adminAPI';
// import toast from 'react-hot-toast';

// const AdminUsers = () => {
//     const [loading, setLoading] = useState(true);
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState('');
//     const [statusFilter, setStatusFilter] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalUsers, setTotalUsers] = useState(0);

//     useEffect(() => {
//         fetchUsers();
//     }, [currentPage, search, statusFilter]);

//     const fetchUsers = async () => {
//         try {
//             setLoading(true);
//             const response = await adminAPI.getAllUsers(currentPage - 1, 20, search, statusFilter);

//             setUsers(response.data.content || []);
//             setTotalPages(response.data.totalPages || 1);
//             setTotalUsers(response.data.totalElements || 0);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             toast.error('Failed to load users');

//             // Fallback demo data
//             setUsers([
//                 {
//                     userId: 1,
//                     name: 'Rajesh Kumar',
//                     email: 'rajesh@email.com',
//                     city: 'Indore',
//                     state: 'Madhya Pradesh',
//                     totalExpenses: 46500,
//                     status: 'ACTIVE',
//                 },
//                 {
//                     userId: 2,
//                     name: 'Priya Sharma',
//                     email: 'priya@email.com',
//                     city: 'Mumbai',
//                     state: 'Maharashtra',
//                     totalExpenses: 82300,
//                     status: 'ACTIVE',
//                 },
//             ]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleBlockUser = async (userId) => {
//         try {
//             await adminAPI.blockUser(userId);
//             toast.success('User blocked successfully');
//             fetchUsers();
//         } catch (error) {
//             console.error('Error blocking user:', error);
//             toast.error('Failed to block user');
//         }
//     };

//     const handleUnblockUser = async (userId) => {
//         try {
//             await adminAPI.unblockUser(userId);
//             toast.success('User unblocked successfully');
//             fetchUsers();
//         } catch (error) {
//             console.error('Error unblocking user:', error);
//             toast.error('Failed to unblock user');
//         }
//     };

//     const handleSearch = (e) => {
//         setSearch(e.target.value);
//         setCurrentPage(1);
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                     <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-gray-400">Loading users...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div>
//                 <h1 className="text-3xl font-bold text-white mb-2">Users Management</h1>
//                 <p className="text-gray-400">Manage and monitor all registered users</p>
//             </div>

//             {/* Search and Filters */}
//             <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
//                 <div className="flex flex-col lg:flex-row gap-4">
//                     {/* Search Bar */}
//                     <div className="flex-1 relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                         <input
//                             type="text"
//                             placeholder="Search by name or email..."
//                             value={search}
//                             onChange={handleSearch}
//                             className="w-full pl-10 pr-4 py-3 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
//                         />
//                     </div>

//                     {/* Filter Buttons */}
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => setStatusFilter('')}
//                             className={`px-4 py-3 rounded-lg border transition-colors ${statusFilter === ''
//                                     ? 'bg-purple-500 border-purple-500 text-white'
//                                     : 'bg-[#0a0f1e] border-gray-700 text-gray-400 hover:border-gray-600'
//                                 }`}
//                         >
//                             All
//                         </button>
//                         <button
//                             onClick={() => setStatusFilter('ACTIVE')}
//                             className={`px-4 py-3 rounded-lg border transition-colors ${statusFilter === 'ACTIVE'
//                                     ? 'bg-emerald-500 border-emerald-500 text-white'
//                                     : 'bg-[#0a0f1e] border-gray-700 text-gray-400 hover:border-gray-600'
//                                 }`}
//                         >
//                             Active
//                         </button>
//                         <button
//                             onClick={() => setStatusFilter('BLOCKED')}
//                             className={`px-4 py-3 rounded-lg border transition-colors ${statusFilter === 'BLOCKED'
//                                     ? 'bg-red-500 border-red-500 text-white'
//                                     : 'bg-[#0a0f1e] border-gray-700 text-gray-400 hover:border-gray-600'
//                                 }`}
//                         >
//                             Blocked
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Users Table */}
//             <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl overflow-hidden">
//                 <div className="p-6 border-b border-gray-800/50">
//                     <h3 className="text-lg font-bold text-white">
//                         All Users ({totalUsers.toLocaleString()})
//                     </h3>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="border-b border-gray-800/50">
//                                 <th className="text-left p-4 text-sm font-medium text-gray-400">User ID</th>
//                                 <th className="text-left p-4 text-sm font-medium text-gray-400">Name</th>
//                                 <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
//                                 <th className="text-left p-4 text-sm font-medium text-gray-400">Location</th>
//                                 <th className="text-right p-4 text-sm font-medium text-gray-400">Total Expenses</th>
//                                 <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
//                                 <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user) => (
//                                 <motion.tr
//                                     key={user.userId}
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors"
//                                 >
//                                     <td className="p-4 text-white font-medium">USR-{user.userId}</td>
//                                     <td className="p-4 text-white">{user.name}</td>
//                                     <td className="p-4 text-gray-400">{user.email}</td>
//                                     <td className="p-4">
//                                         <div className="flex items-center gap-2">
//                                             <MapPin className="w-4 h-4 text-gray-500" />
//                                             <span className="text-sm text-gray-300">
//                                                 {user.city}, {user.state}
//                                             </span>
//                                         </div>
//                                     </td>
//                                     <td className="p-4 text-right text-white font-medium">
//                                         ₹{user.totalExpenses?.toLocaleString('en-IN') || 0}
//                                     </td>
//                                     <td className="p-4">
//                                         {user.status === 'ACTIVE' ? (
//                                             <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
//                                                 <CheckCircle className="w-4 h-4" />
//                                                 Active
//                                             </span>
//                                         ) : (
//                                             <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm">
//                                                 <Ban className="w-4 h-4" />
//                                                 Blocked
//                                             </span>
//                                         )}
//                                     </td>
//                                     <td className="p-4">
//                                         <div className="flex justify-end gap-2">
//                                             <button className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors">
//                                                 <Eye className="w-4 h-4" />
//                                             </button>
//                                             {user.status === 'ACTIVE' ? (
//                                                 <button
//                                                     onClick={() => handleBlockUser(user.userId)}
//                                                     className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
//                                                 >
//                                                     <Ban className="w-4 h-4" />
//                                                 </button>
//                                             ) : (
//                                                 <button
//                                                     onClick={() => handleUnblockUser(user.userId)}
//                                                     className="p-2 rounded-lg hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 transition-colors"
//                                                 >
//                                                     <CheckCircle className="w-4 h-4" />
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </td>
//                                 </motion.tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="p-6 border-t border-gray-800/50 flex items-center justify-between">
//                     <p className="text-sm text-gray-400">
//                         Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, totalUsers)} of {totalUsers} users
//                     </p>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                             disabled={currentPage === 1}
//                             className="p-2 rounded-lg bg-[#0a0f1e] border border-gray-700 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                         >
//                             <ChevronLeft className="w-5 h-5" />
//                         </button>
//                         <span className="px-4 py-2 text-white">
//                             Page {currentPage} of {totalPages}
//                         </span>
//                         <button
//                             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                             disabled={currentPage === totalPages}
//                             className="p-2 rounded-lg bg-[#0a0f1e] border border-gray-700 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                         >
//                             <ChevronRight className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminUsers;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Ban, CheckCircle, MapPin, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import adminAPI from '../../api/adminAPI';
import toast from 'react-hot-toast';

const AdminUsers = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, search, statusFilter]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getAllUsers(currentPage - 1, 20, search, statusFilter);

            setUsers(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
            setTotalUsers(response.data.totalElements || 0);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');

            // Fallback demo data
            setUsers([
                {
                    userId: 1,
                    name: 'Rajesh Kumar',
                    email: 'rajesh@email.com',
                    city: 'Indore',
                    state: 'Madhya Pradesh',
                    totalExpenses: 46500,
                    status: 'ACTIVE',
                },
                {
                    userId: 2,
                    name: 'Priya Sharma',
                    email: 'priya@email.com',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    totalExpenses: 82300,
                    status: 'ACTIVE',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleBlockUser = async (userId) => {
        if (!window.confirm('Are you sure you want to block this user?')) return;

        try {
            await adminAPI.blockUser(userId);
            toast.success('User blocked successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error blocking user:', error);
            toast.error('Failed to block user');
        }
    };

    const handleUnblockUser = async (userId) => {
        if (!window.confirm('Are you sure you want to unblock this user?')) return;

        try {
            await adminAPI.unblockUser(userId);
            toast.success('User unblocked successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error unblocking user:', error);
            toast.error('Failed to unblock user');
        }
    };

    // ✅ NEW: Delete user with double confirmation
    const handleDeleteUser = async (userId, userName) => {
        // First confirmation
        const firstConfirm = window.confirm(
            `⚠️ WARNING: Delete "${userName}"?\n\n` +
            `This will permanently delete:\n` +
            `• All expenses\n` +
            `• All incomes\n` +
            `• All budgets\n` +
            `• All AI insights\n\n` +
            `This CANNOT be undone!\n\n` +
            `Click OK to continue.`
        );

        if (!firstConfirm) return;

        // Second confirmation - type user's name
        const userInput = window.prompt(
            `To confirm, type the user's name exactly:\n\n"${userName}"`
        );

        if (userInput !== userName) {
            toast.error('Name does not match. Deletion cancelled.');
            return;
        }

        try {
            await adminAPI.deleteUser(userId);
            toast.success(`User "${userName}" deleted successfully`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(error.response?.data?.message || 'Failed to delete user');
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Users Management</h1>
                <p className="text-gray-400">Manage and monitor all registered users</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-3 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStatusFilter('')}
                            className={`px-4 py-3 rounded-lg border transition-colors ${statusFilter === ''
                                ? 'bg-purple-500 border-purple-500 text-white'
                                : 'bg-[#0a0f1e] border-gray-700 text-gray-400 hover:border-gray-600'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setStatusFilter('ACTIVE')}
                            className={`px-4 py-3 rounded-lg border transition-colors ${statusFilter === 'ACTIVE'
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'bg-[#0a0f1e] border-gray-700 text-gray-400 hover:border-gray-600'
                                }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setStatusFilter('BLOCKED')}
                            className={`px-4 py-3 rounded-lg border transition-colors ${statusFilter === 'BLOCKED'
                                ? 'bg-red-500 border-red-500 text-white'
                                : 'bg-[#0a0f1e] border-gray-700 text-gray-400 hover:border-gray-600'
                                }`}
                        >
                            Blocked
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-gray-800/50">
                    <h3 className="text-lg font-bold text-white">
                        All Users ({totalUsers.toLocaleString()})
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800/50">
                                <th className="text-left p-4 text-sm font-medium text-gray-400">User ID</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Name</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Location</th>
                                <th className="text-right p-4 text-sm font-medium text-gray-400">Total Expenses</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                                <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <motion.tr
                                    key={user.userId}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors"
                                >
                                    <td className="p-4 text-white font-medium">USR-{user.userId}</td>
                                    <td className="p-4 text-white">{user.name}</td>
                                    <td className="p-4 text-gray-400">{user.email}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-300">
                                                {user.city}, {user.state}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right text-white font-medium">
                                        ₹{user.totalExpenses?.toLocaleString('en-IN') || 0}
                                    </td>
                                    <td className="p-4">
                                        {user.status === 'ACTIVE' ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
                                                <CheckCircle className="w-4 h-4" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm">
                                                <Ban className="w-4 h-4" />
                                                Blocked
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            {/* ❌ REMOVED: Eye button */}

                                            {/* Block/Unblock Button */}
                                            {user.status === 'ACTIVE' ? (
                                                <button
                                                    onClick={() => handleBlockUser(user.userId)}
                                                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                                                    title="Block User"
                                                >
                                                    <Ban className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleUnblockUser(user.userId)}
                                                    className="p-2 rounded-lg hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 transition-colors"
                                                    title="Unblock User"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}

                                            {/* ✅ NEW: Delete Button */}
                                            <button
                                                onClick={() => handleDeleteUser(user.userId, user.name)}
                                                className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                                                title="Delete User Permanently"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-gray-800/50 flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                        Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, totalUsers)} of {totalUsers} users
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-[#0a0f1e] border border-gray-700 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="px-4 py-2 text-white">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg bg-[#0a0f1e] border border-gray-700 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;