//working in local, not pushing to repo yet
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Mail, Lock, ArrowLeft, RefreshCw, CheckCircle, Smartphone } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Card from '../../components/Common/Card';
// import Input from '../../components/Common/Input';
// import Button from '../../components/Common/Button';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// // ── OTP Box Component ─────────────────────────────────────────────────────────
// const OtpInput = ({ value, onChange, length = 6 }) => {
//     const inputs = [];
//     const handleChange = (index, e) => {
//         const val = e.target.value.replace(/\D/g, '');
//         if (!val) return;
//         const newOtp = value.split('');
//         newOtp[index] = val[val.length - 1];
//         onChange(newOtp.join(''));
//         if (index < length - 1) inputs[index + 1]?.focus();
//     };
//     const handleKeyDown = (index, e) => {
//         if (e.key === 'Backspace') {
//             const newOtp = value.split('');
//             newOtp[index] = '';
//             onChange(newOtp.join(''));
//             if (index > 0) inputs[index - 1]?.focus();
//         }
//     };
//     const handlePaste = (e) => {
//         e.preventDefault();
//         const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
//         onChange(pasted.padEnd(length, ''));
//         inputs[Math.min(pasted.length, length - 1)]?.focus();
//     };
//     return (
//         <div className="flex gap-2 justify-center">
//             {Array.from({ length }).map((_, index) => (
//                 <input
//                     key={index}
//                     ref={el => inputs[index] = el}
//                     type="text"
//                     inputMode="numeric"
//                     maxLength={1}
//                     value={value[index] || ''}
//                     onChange={e => handleChange(index, e)}
//                     onKeyDown={e => handleKeyDown(index, e)}
//                     onPaste={handlePaste}
//                     className="w-11 h-13 text-center text-xl font-bold
//                                bg-dark-800 border-2 border-dark-700 rounded-xl
//                                text-dark-100 focus:outline-none focus:border-ai-500
//                                focus:ring-2 focus:ring-ai-500/30 transition-all"
//                 />
//             ))}
//         </div>
//     );
// };

// // ── Main Login Component ──────────────────────────────────────────────────────
// const Login = () => {
//     const [mode, setMode] = useState('password'); // 'password' | 'otp'
//     const [otpStep, setOtpStep] = useState(1);    // 1=email, 2=otp
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [otp, setOtp] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [resendTimer, setResendTimer] = useState(0);

//     const { login, isAuthenticated } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (isAuthenticated) navigate('/dashboard');
//     }, [isAuthenticated, navigate]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // ── Password Login ────────────────────────────────────────────────
//     const handlePasswordLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await login(formData);
//         } catch (error) {
//             console.error('Login error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ── OTP: Send ─────────────────────────────────────────────────────
//     const startTimer = () => {
//         setResendTimer(30);
//         const interval = setInterval(() => {
//             setResendTimer(prev => {
//                 if (prev <= 1) { clearInterval(interval); return 0; }
//                 return prev - 1;
//             });
//         }, 1000);
//     };

//     const handleSendOtp = async (e) => {
//         e.preventDefault();
//         if (!formData.email) return toast.error('Please enter your email');
//         setLoading(true);
//         try {
//             await axios.post('http://localhost:8086/api/auth/otp/send', {
//                 email: formData.email, purpose: 'LOGIN'
//             });
//             toast.success(`OTP sent to ${formData.email}`);
//             setOtpStep(2);
//             startTimer();
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Failed to send OTP');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ── OTP: Verify ───────────────────────────────────────────────────
//     const handleVerifyOtp = async () => {
//         if (otp.length !== 6) return toast.error('Enter 6-digit OTP');
//         setLoading(true);
//         try {
//             const res = await axios.post('http://localhost:8086/api/auth/otp/verify-login', {
//                 email: formData.email, otp
//             });
//             login(res.data.token, {
//                 name: res.data.name,
//                 email: res.data.email,
//                 role: res.data.role
//             });
//             toast.success(`Welcome back, ${res.data.name}!`);
//             navigate('/dashboard');
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Invalid OTP');
//             setOtp('');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleResend = async () => {
//         if (resendTimer > 0) return;
//         setLoading(true);
//         try {
//             await axios.post('http://localhost:8086/api/auth/otp/send', {
//                 email: formData.email, purpose: 'LOGIN'
//             });
//             toast.success('New OTP sent!');
//             setOtp('');
//             startTimer();
//         } catch (err) {
//             toast.error('Failed to resend OTP');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleGoogleLogin = () => {
//         window.location.href = 'http://localhost:8086/oauth2/authorization/google';
//     };

//     // ── Switch mode ───────────────────────────────────────────────────
//     const switchMode = (newMode) => {
//         setMode(newMode);
//         setOtpStep(1);
//         setOtp('');
//         setResendTimer(0);
//     };

//     return (
//         <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
//             {/* Animated Background */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute -top-40 -right-40 w-80 h-80 bg-ai-500/10 rounded-full blur-3xl animate-pulse"></div>
//                 <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//             </div>

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-full max-w-md relative z-10"
//             >
//                 <Link to="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-dark-100 transition-colors mb-6">
//                     <ArrowLeft className="w-4 h-4" />
//                     <span className="text-sm">Back to home</span>
//                 </Link>

//                 <Card className="shadow-2xl">
//                     {/* Logo */}
//                     <div className="text-center mb-6">
//                         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ai-500 to-ai-700 flex items-center justify-center mx-auto mb-4">
//                             <span className="text-white font-bold text-xl">₹</span>
//                         </div>
//                         <h1 className="text-2xl font-display font-bold text-dark-100 mb-1">Welcome Back</h1>
//                         <p className="text-dark-400 text-sm">Sign in to your FinanceAI account</p>
//                     </div>

//                     {/* ── Mode Toggle ── */}
//                     <div className="flex bg-dark-800 rounded-xl p-1 mb-6">
//                         <button
//                             onClick={() => switchMode('password')}
//                             className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'password'
//                                 ? 'bg-ai-600 text-white shadow'
//                                 : 'text-dark-400 hover:text-dark-200'
//                                 }`}
//                         >
//                             <Lock className="w-4 h-4" />
//                             Password
//                         </button>
//                         <button
//                             onClick={() => switchMode('otp')}
//                             className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'otp'
//                                 ? 'bg-ai-600 text-white shadow'
//                                 : 'text-dark-400 hover:text-dark-200'
//                                 }`}
//                         >
//                             <Smartphone className="w-4 h-4" />
//                             Email OTP
//                         </button>
//                     </div>

//                     <AnimatePresence mode="wait">

//                         {/* ── PASSWORD MODE ── */}
//                         {mode === 'password' && (
//                             <motion.form
//                                 key="password"
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: 20 }}
//                                 onSubmit={handlePasswordLogin}
//                                 className="space-y-4"
//                             >
//                                 <Input
//                                     type="email" name="email"
//                                     placeholder="Email address" label="Email"
//                                     icon={Mail} value={formData.email}
//                                     onChange={handleChange} required
//                                 />
//                                 <Input
//                                     type="password" name="password"
//                                     placeholder="Enter your password" label="Password"
//                                     icon={Lock} value={formData.password}
//                                     onChange={handleChange} required
//                                 />
//                                 <Button type="submit" variant="primary" className="w-full" loading={loading}>
//                                     {loading ? 'Signing in...' : 'Sign In'}
//                                 </Button>
//                             </motion.form>
//                         )}

//                         {/* ── OTP MODE - Step 1: Email ── */}
//                         {mode === 'otp' && otpStep === 1 && (
//                             <motion.form
//                                 key="otp-email"
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                                 onSubmit={handleSendOtp}
//                                 className="space-y-4"
//                             >
//                                 <Input
//                                     type="email" name="email"
//                                     placeholder="your@email.com" label="Email Address"
//                                     icon={Mail} value={formData.email}
//                                     onChange={handleChange} required
//                                 />
//                                 <p className="text-xs text-dark-500">
//                                     We'll send a 6-digit OTP to your registered email
//                                 </p>
//                                 <Button type="submit" variant="primary" className="w-full" loading={loading}>
//                                     {loading ? 'Sending OTP...' : 'Send OTP →'}
//                                 </Button>
//                             </motion.form>
//                         )}

//                         {/* ── OTP MODE - Step 2: Verify ── */}
//                         {mode === 'otp' && otpStep === 2 && (
//                             <motion.div
//                                 key="otp-verify"
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                                 className="space-y-5"
//                             >
//                                 <p className="text-center text-sm text-dark-400">
//                                     OTP sent to <span className="text-ai-400 font-medium">{formData.email}</span>
//                                 </p>

//                                 <OtpInput value={otp} onChange={setOtp} length={6} />

//                                 <Button
//                                     variant="primary" className="w-full"
//                                     onClick={handleVerifyOtp}
//                                     disabled={loading || otp.length !== 6}
//                                     loading={loading}
//                                 >
//                                     <CheckCircle className="w-4 h-4 mr-2" />
//                                     Verify & Login
//                                 </Button>

//                                 <div className="flex items-center justify-between text-sm">
//                                     <button
//                                         onClick={() => { setOtpStep(1); setOtp(''); }}
//                                         className="text-dark-400 hover:text-dark-200 transition-colors"
//                                     >
//                                         ← Change email
//                                     </button>
//                                     <button
//                                         onClick={handleResend}
//                                         disabled={resendTimer > 0 || loading}
//                                         className="inline-flex items-center gap-1 text-ai-400 hover:text-ai-300 disabled:opacity-50 transition-colors"
//                                     >
//                                         <RefreshCw className="w-3.5 h-3.5" />
//                                         {resendTimer > 0 ? `${resendTimer}s` : 'Resend'}
//                                     </button>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* Divider */}
//                     <div className="flex items-center gap-4 my-6">
//                         <div className="flex-1 h-px bg-dark-800"></div>
//                         <span className="text-sm text-dark-500">or continue with</span>
//                         <div className="flex-1 h-px bg-dark-800"></div>
//                     </div>

//                     {/* Google Login */}
//                     <Button variant="secondary" className="w-full" onClick={handleGoogleLogin}>
//                         <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                             <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                             <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                             <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                             <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                         </svg>
//                         Sign in with Google
//                     </Button>

//                     <p className="mt-6 text-center text-sm text-dark-400">
//                         Don't have an account?{' '}
//                         <Link to="/register" className="text-ai-400 hover:text-ai-300 font-medium transition-colors">
//                             Create account
//                         </Link>
//                     </p>
//                 </Card>

//                 <p className="text-center text-xs text-dark-500 mt-6">
//                     By signing in, you agree to our Terms of Service and Privacy Policy
//                 </p>
//             </motion.div>
//         </div>
//     );
// };

// export default Login;


// not working in local, not pushing to repo yet
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Mail, Lock, ArrowLeft, RefreshCw, CheckCircle, Smartphone } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Card from '../../components/Common/Card';
// import Input from '../../components/Common/Input';
// import Button from '../../components/Common/Button';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const API_URL = import.meta.env.VITE_API_URL;

// const OtpInput = ({ value, onChange, length = 6 }) => {
//     const inputs = [];
//     const handleChange = (index, e) => {
//         const val = e.target.value.replace(/\D/g, '');
//         if (!val) return;
//         const newOtp = value.split('');
//         newOtp[index] = val[val.length - 1];
//         onChange(newOtp.join(''));
//         if (index < length - 1) inputs[index + 1]?.focus();
//     };
//     const handleKeyDown = (index, e) => {
//         if (e.key === 'Backspace') {
//             const newOtp = value.split('');
//             newOtp[index] = '';
//             onChange(newOtp.join(''));
//             if (index > 0) inputs[index - 1]?.focus();
//         }
//     };
//     const handlePaste = (e) => {
//         e.preventDefault();
//         const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
//         onChange(pasted.padEnd(length, ''));
//         inputs[Math.min(pasted.length, length - 1)]?.focus();
//     };
//     return (
//         <div className="flex gap-2 justify-center">
//             {Array.from({ length }).map((_, index) => (
//                 <input key={index} ref={el => inputs[index] = el}
//                     type="text" inputMode="numeric" maxLength={1}
//                     value={value[index] || ''}
//                     onChange={e => handleChange(index, e)}
//                     onKeyDown={e => handleKeyDown(index, e)}
//                     onPaste={handlePaste}
//                     className="w-11 h-13 text-center text-xl font-bold bg-dark-800 border-2 border-dark-700 rounded-xl text-dark-100 focus:outline-none focus:border-ai-500 focus:ring-2 focus:ring-ai-500/30 transition-all"
//                 />
//             ))}
//         </div>
//     );
// };

// const Login = () => {
//     const [mode, setMode] = useState('password');
//     const [otpStep, setOtpStep] = useState(1);
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [otp, setOtp] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [resendTimer, setResendTimer] = useState(0);

//     const { login, isAuthenticated } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (isAuthenticated) navigate('/dashboard');
//     }, [isAuthenticated, navigate]);

//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handlePasswordLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try { await login(formData); }
//         catch (error) { console.error('Login error:', error); }
//         finally { setLoading(false); }
//     };

//     const startTimer = () => {
//         setResendTimer(30);
//         const interval = setInterval(() => {
//             setResendTimer(prev => { if (prev <= 1) { clearInterval(interval); return 0; } return prev - 1; });
//         }, 1000);
//     };

//     const handleSendOtp = async (e) => {
//         e.preventDefault();
//         if (!formData.email) return toast.error('Please enter your email');
//         setLoading(true);
//         try {
//             await axios.post(`${API_URL}/api/auth/otp/send`, { email: formData.email, purpose: 'LOGIN' });
//             toast.success(`OTP sent to ${formData.email}`);
//             setOtpStep(2);
//             startTimer();
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Failed to send OTP');
//         } finally { setLoading(false); }
//     };

//     const handleVerifyOtp = async () => {
//         if (otp.length !== 6) return toast.error('Enter 6-digit OTP');
//         setLoading(true);
//         try {
//             const res = await axios.post(`${API_URL}/api/auth/otp/verify-login`, { email: formData.email, otp });
//             login(res.data.token, { name: res.data.name, email: res.data.email, role: res.data.role });
//             toast.success(`Welcome back, ${res.data.name}!`);
//             navigate('/dashboard');
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Invalid OTP');
//             setOtp('');
//         } finally { setLoading(false); }
//     };

//     const handleResend = async () => {
//         if (resendTimer > 0) return;
//         setLoading(true);
//         try {
//             await axios.post(`${API_URL}/api/auth/otp/send`, { email: formData.email, purpose: 'LOGIN' });
//             toast.success('New OTP sent!');
//             setOtp('');
//             startTimer();
//         } catch (err) { toast.error('Failed to resend OTP'); }
//         finally { setLoading(false); }
//     };

//     const handleGoogleLogin = () => { window.location.href = `${API_URL}/oauth2/authorization/google`; };
//     const switchMode = (newMode) => { setMode(newMode); setOtpStep(1); setOtp(''); setResendTimer(0); };

//     return (
//         <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute -top-40 -right-40 w-80 h-80 bg-ai-500/10 rounded-full blur-3xl animate-pulse"></div>
//                 <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//             </div>
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10">
//                 <Link to="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-dark-100 transition-colors mb-6">
//                     <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back to home</span>
//                 </Link>
//                 <Card className="shadow-2xl">
//                     <div className="text-center mb-6">
//                         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ai-500 to-ai-700 flex items-center justify-center mx-auto mb-4">
//                             <span className="text-white font-bold text-xl">₹</span>
//                         </div>
//                         <h1 className="text-2xl font-display font-bold text-dark-100 mb-1">Welcome Back</h1>
//                         <p className="text-dark-400 text-sm">Sign in to your FinanceAI account</p>
//                     </div>
//                     <div className="flex bg-dark-800 rounded-xl p-1 mb-6">
//                         <button onClick={() => switchMode('password')} className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'password' ? 'bg-ai-600 text-white shadow' : 'text-dark-400 hover:text-dark-200'}`}>
//                             <Lock className="w-4 h-4" />Password
//                         </button>
//                         <button onClick={() => switchMode('otp')} className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'otp' ? 'bg-ai-600 text-white shadow' : 'text-dark-400 hover:text-dark-200'}`}>
//                             <Smartphone className="w-4 h-4" />Email OTP
//                         </button>
//                     </div>
//                     <AnimatePresence mode="wait">
//                         {mode === 'password' && (
//                             <motion.form key="password" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handlePasswordLogin} className="space-y-4">
//                                 <Input type="email" name="email" placeholder="Email address" label="Email" icon={Mail} value={formData.email} onChange={handleChange} required />
//                                 <Input type="password" name="password" placeholder="Enter your password" label="Password" icon={Lock} value={formData.password} onChange={handleChange} required />
//                                 <Button type="submit" variant="primary" className="w-full" loading={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
//                             </motion.form>
//                         )}
//                         {mode === 'otp' && otpStep === 1 && (
//                             <motion.form key="otp-email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSendOtp} className="space-y-4">
//                                 <Input type="email" name="email" placeholder="your@email.com" label="Email Address" icon={Mail} value={formData.email} onChange={handleChange} required />
//                                 <p className="text-xs text-dark-500">We'll send a 6-digit OTP to your registered email</p>
//                                 <Button type="submit" variant="primary" className="w-full" loading={loading}>{loading ? 'Sending OTP...' : 'Send OTP →'}</Button>
//                             </motion.form>
//                         )}
//                         {mode === 'otp' && otpStep === 2 && (
//                             <motion.div key="otp-verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
//                                 <p className="text-center text-sm text-dark-400">OTP sent to <span className="text-ai-400 font-medium">{formData.email}</span></p>
//                                 <OtpInput value={otp} onChange={setOtp} length={6} />
//                                 <Button variant="primary" className="w-full" onClick={handleVerifyOtp} disabled={loading || otp.length !== 6} loading={loading}>
//                                     <CheckCircle className="w-4 h-4 mr-2" />Verify & Login
//                                 </Button>
//                                 <div className="flex items-center justify-between text-sm">
//                                     <button onClick={() => { setOtpStep(1); setOtp(''); }} className="text-dark-400 hover:text-dark-200 transition-colors">← Change email</button>
//                                     <button onClick={handleResend} disabled={resendTimer > 0 || loading} className="inline-flex items-center gap-1 text-ai-400 hover:text-ai-300 disabled:opacity-50 transition-colors">
//                                         <RefreshCw className="w-3.5 h-3.5" />{resendTimer > 0 ? `${resendTimer}s` : 'Resend'}
//                                     </button>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                     <div className="flex items-center gap-4 my-6">
//                         <div className="flex-1 h-px bg-dark-800"></div>
//                         <span className="text-sm text-dark-500">or continue with</span>
//                         <div className="flex-1 h-px bg-dark-800"></div>
//                     </div>
//                     <Button variant="secondary" className="w-full" onClick={handleGoogleLogin}>
//                         <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                             <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                             <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                             <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                             <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                         </svg>
//                         Sign in with Google
//                     </Button>
//                     <p className="mt-6 text-center text-sm text-dark-400">
//                         Don't have an account?{' '}
//                         <Link to="/register" className="text-ai-400 hover:text-ai-300 font-medium transition-colors">Create account</Link>
//                     </p>
//                 </Card>
//                 <p className="text-center text-xs text-dark-500 mt-6">By signing in, you agree to our Terms of Service and Privacy Policy</p>
//             </motion.div>
//         </div>
//     );
// };

// export default Login;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowLeft, RefreshCw, CheckCircle, Smartphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Common/Card';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

const OtpInput = ({ value, onChange, length = 6 }) => {
    const inputs = [];
    const handleChange = (index, e) => {
        const val = e.target.value.replace(/\D/g, '');
        if (!val) return;
        const newOtp = value.split('');
        newOtp[index] = val[val.length - 1];
        onChange(newOtp.join(''));
        if (index < length - 1) inputs[index + 1]?.focus();
    };
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            const newOtp = value.split('');
            newOtp[index] = '';
            onChange(newOtp.join(''));
            if (index > 0) inputs[index - 1]?.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        onChange(pasted.padEnd(length, ''));
        inputs[Math.min(pasted.length, length - 1)]?.focus();
    };
    return (
        <div className="flex gap-2 justify-center">
            {Array.from({ length }).map((_, index) => (
                <input key={index} ref={el => inputs[index] = el}
                    type="text" inputMode="numeric" maxLength={1}
                    value={value[index] || ''}
                    onChange={e => handleChange(index, e)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-11 h-13 text-center text-xl font-bold bg-dark-800 border-2 border-dark-700 rounded-xl text-dark-100 focus:outline-none focus:border-ai-500 focus:ring-2 focus:ring-ai-500/30 transition-all"
                />
            ))}
        </div>
    );
};

const Login = () => {
    const [mode, setMode] = useState('password');
    const [otpStep, setOtpStep] = useState(1);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try { await login(formData); }
        catch (error) { console.error('Login error:', error); }
        finally { setLoading(false); }
    };

    const startTimer = () => {
        setResendTimer(30);
        const interval = setInterval(() => {
            setResendTimer(prev => { if (prev <= 1) { clearInterval(interval); return 0; } return prev - 1; });
        }, 1000);
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!formData.email) return toast.error('Please enter your email');
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/auth/otp/send`, { email: formData.email, purpose: 'LOGIN' });
            toast.success(`OTP sent to ${formData.email}`);
            setOtpStep(2);
            startTimer();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send OTP');
        } finally { setLoading(false); }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) return toast.error('Enter 6-digit OTP');
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/api/auth/otp/verify-login`, { email: formData.email, otp });
            login(res.data.token, { name: res.data.name, email: res.data.email, role: res.data.role });
            toast.success(`Welcome back, ${res.data.name}!`);
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid OTP');
            setOtp('');
        } finally { setLoading(false); }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/auth/otp/send`, { email: formData.email, purpose: 'LOGIN' });
            toast.success('New OTP sent!');
            setOtp('');
            startTimer();
        } catch (err) { toast.error('Failed to resend OTP'); }
        finally { setLoading(false); }
    };

    const handleGoogleLogin = () => { window.location.href = `${API_URL}/oauth2/authorization/google`; };
    const switchMode = (newMode) => { setMode(newMode); setOtpStep(1); setOtp(''); setResendTimer(0); };

    return (
        <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-ai-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10">
                <Link to="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-dark-100 transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back to home</span>
                </Link>
                <Card className="shadow-2xl">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ai-500 to-ai-700 flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">₹</span>
                        </div>
                        <h1 className="text-2xl font-display font-bold text-dark-100 mb-1">Welcome Back</h1>
                        <p className="text-dark-400 text-sm">Sign in to your FinanceAI account</p>
                    </div>

                    <div className="flex bg-dark-800 rounded-xl p-1 mb-6">
                        <button onClick={() => switchMode('password')} className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'password' ? 'bg-ai-600 text-white shadow' : 'text-dark-400 hover:text-dark-200'}`}>
                            <Lock className="w-4 h-4" />Password
                        </button>
                        <button onClick={() => switchMode('otp')} className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${mode === 'otp' ? 'bg-ai-600 text-white shadow' : 'text-dark-400 hover:text-dark-200'}`}>
                            <Smartphone className="w-4 h-4" />Email OTP
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {mode === 'password' && (
                            <motion.form key="password" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handlePasswordLogin} className="space-y-4">
                                <Input type="email" name="email" placeholder="Email address" label="Email" icon={Mail} value={formData.email} onChange={handleChange} required />
                                <Input type="password" name="password" placeholder="Enter your password" label="Password" icon={Lock} value={formData.password} onChange={handleChange} required />
                                <Button type="submit" variant="primary" className="w-full" loading={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
                            </motion.form>
                        )}
                        {mode === 'otp' && otpStep === 1 && (
                            <motion.form key="otp-email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSendOtp} className="space-y-4">
                                <Input type="email" name="email" placeholder="your@email.com" label="Email Address" icon={Mail} value={formData.email} onChange={handleChange} required />
                                <p className="text-xs text-dark-500">We'll send a 6-digit OTP to your registered email</p>
                                <Button type="submit" variant="primary" className="w-full" loading={loading}>{loading ? 'Sending OTP...' : 'Send OTP →'}</Button>
                            </motion.form>
                        )}
                        {mode === 'otp' && otpStep === 2 && (
                            <motion.div key="otp-verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                <p className="text-center text-sm text-dark-400">OTP sent to <span className="text-ai-400 font-medium">{formData.email}</span></p>
                                <OtpInput value={otp} onChange={setOtp} length={6} />
                                <Button variant="primary" className="w-full" onClick={handleVerifyOtp} disabled={loading || otp.length !== 6} loading={loading}>
                                    <CheckCircle className="w-4 h-4 mr-2" />Verify & Login
                                </Button>
                                <div className="flex items-center justify-between text-sm">
                                    <button onClick={() => { setOtpStep(1); setOtp(''); }} className="text-dark-400 hover:text-dark-200 transition-colors">← Change email</button>
                                    <button onClick={handleResend} disabled={resendTimer > 0 || loading} className="inline-flex items-center gap-1 text-ai-400 hover:text-ai-300 disabled:opacity-50 transition-colors">
                                        <RefreshCw className="w-3.5 h-3.5" />{resendTimer > 0 ? `${resendTimer}s` : 'Resend'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-dark-800"></div>
                        <span className="text-sm text-dark-500">or continue with</span>
                        <div className="flex-1 h-px bg-dark-800"></div>
                    </div>

                    <Button variant="secondary" className="w-full" onClick={handleGoogleLogin}>
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign in with Google
                    </Button>

                    <p className="mt-6 text-center text-sm text-dark-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-ai-400 hover:text-ai-300 font-medium transition-colors">Create account</Link>
                    </p>
                </Card>
                <p className="text-center text-xs text-dark-500 mt-6">By signing in, you agree to our Terms of Service and Privacy Policy</p>
            </motion.div>
        </div>
    );
};

export default Login;