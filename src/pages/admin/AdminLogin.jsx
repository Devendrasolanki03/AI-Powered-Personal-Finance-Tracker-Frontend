// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Shield, Mail, Lock, ArrowLeft } from 'lucide-react';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const AdminLogin = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await axios.post('http://localhost:8086/api/admin/auth/login', formData);

//             localStorage.setItem('admin_token', response.data.token);
//             localStorage.setItem('admin_user', JSON.stringify(response.data.user));

//             toast.success('Welcome, Admin!');
//             navigate('/admin/dashboard');
//         } catch (error) {
//             // Fallback to demo credentials
//             if (formData.email === 'admin@financeai.com' && formData.password === 'admin123') {
//                 localStorage.setItem('admin_token', 'demo_token');
//                 localStorage.setItem('admin_user', JSON.stringify({
//                     email: formData.email,
//                     name: 'Admin User',
//                     role: 'ADMIN'
//                 }));
//                 toast.success('Welcome, Admin!');
//                 navigate('/admin/dashboard');
//             } else {
//                 toast.error('Invalid credentials');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="w-full max-w-md"
//             >
//                 <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 mb-6">
//                     <ArrowLeft className="w-4 h-4" />
//                     <span className="text-sm">Back to home</span>
//                 </Link>

//                 <div className="bg-[#151d2f] rounded-2xl p-8 border border-gray-800/50">
//                     <div className="text-center mb-8">
//                         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-4">
//                             <span className="text-white font-bold text-xl">₹</span>
//                         </div>
//                         <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
//                         <p className="text-gray-400">Secure access for administrators</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
//                             <div className="relative">
//                                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     placeholder="admin email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full pl-10 pr-4 py-3 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
//                             <div className="relative">
//                                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     placeholder="Enter password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full pl-10 pr-4 py-3 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
//                                 />
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
//                         >
//                             {loading ? 'Authenticating...' : 'Login as Admin'}
//                         </button>
//                     </form>

//                     <div className="mt-6 p-4 bg-[#0a0f1e] rounded-lg border border-gray-800">
//                         <p className="text-sm text-gray-300 font-medium mb-2">Demo Credentials:</p>
//                         <p className="text-xs text-gray-400">Email: admin@financeai.com</p>
//                         <p className="text-xs text-gray-400">Password: admin123</p>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default AdminLogin;


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8086/api/admin/auth/login', formData);
            const data = response.data;

            // ✅ AuthResponseDTO: { token, message, name, email, role, provider }
            localStorage.setItem('admin_token', data.token);
            localStorage.setItem('admin_user', JSON.stringify({
                email: data.email,
                name: data.name,
                role: data.role
            }));

            toast.success(`Welcome, ${data.name}!`);
            navigate('/admin/dashboard');

        } catch (error) {
            const status = error?.response?.status;
            if (status === 401) {
                toast.error('Invalid email or password');
            } else if (status === 403) {
                toast.error('Access denied. Admin only.');
            } else {
                toast.error('Server error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back to home</span>
                </Link>

                <div className="bg-[#151d2f] rounded-2xl p-8 border border-gray-800/50">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">₹</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
                        <p className="text-gray-400">Secure access for administrators</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="admin@financeai.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Login as Admin'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;