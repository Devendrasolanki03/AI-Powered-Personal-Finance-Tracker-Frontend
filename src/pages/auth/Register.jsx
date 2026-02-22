// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//     Mail, Lock, User, MapPin, ArrowLeft,
//     Eye, EyeOff, CheckCircle2, XCircle,
//     RefreshCw, CheckCircle, ShieldCheck
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Card from '../../components/Common/Card';
// import Input from '../../components/Common/Input';
// import Button from '../../components/Common/Button';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// // ── OTP Input ─────────────────────────────────────────────────────────────────
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
//         <div className="flex gap-3 justify-center">
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
//                     className="w-12 h-14 text-center text-2xl font-bold
//                                bg-dark-800 border-2 border-dark-700 rounded-xl
//                                text-dark-100 focus:outline-none focus:border-ai-500
//                                focus:ring-2 focus:ring-ai-500/30 transition-all"
//                 />
//             ))}
//         </div>
//     );
// };

// // ── Password Requirement ──────────────────────────────────────────────────────
// const PasswordRequirement = ({ met, text }) => (
//     <div className="flex items-center gap-2 text-xs">
//         {met
//             ? <CheckCircle2 size={14} className="text-accent-400 flex-shrink-0" />
//             : <XCircle size={14} className="text-dark-500 flex-shrink-0" />}
//         <span className={met ? 'text-accent-400' : 'text-dark-500'}>{text}</span>
//     </div>
// );

// // ── Step Indicator ────────────────────────────────────────────────────────────
// const StepIndicator = ({ currentStep }) => (
//     <div className="flex items-center justify-center gap-2 mb-6">
//         {[1, 2].map((step) => (
//             <div key={step} className="flex items-center gap-2">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${currentStep === step
//                         ? 'bg-ai-600 text-white'
//                         : currentStep > step
//                             ? 'bg-accent-500 text-white'
//                             : 'bg-dark-800 text-dark-500'
//                     }`}>
//                     {currentStep > step ? <CheckCircle2 size={16} /> : step}
//                 </div>
//                 {step < 2 && (
//                     <div className={`w-16 h-0.5 transition-all ${currentStep > step ? 'bg-accent-500' : 'bg-dark-700'
//                         }`} />
//                 )}
//             </div>
//         ))}
//     </div>
// );

// // ── Main Register ─────────────────────────────────────────────────────────────
// const Register = () => {
//     const [step, setStep] = useState(1);  // 1=form, 2=otp verify
//     const [otp, setOtp] = useState('');
//     const [resendTimer, setResendTimer] = useState(0);
//     const [formData, setFormData] = useState({
//         name: '', email: '', password: '', confirmPassword: '',
//         city: '', state: '', country: 'India',
//     });
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [passwordStrength, setPasswordStrength] = useState({
//         hasLength: false, hasUppercase: false,
//         hasLowercase: false, hasNumber: false,
//     });

//     const { isAuthenticated, login } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (isAuthenticated) navigate('/dashboard');
//     }, [isAuthenticated, navigate]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         setErrors(prev => ({ ...prev, [name]: '' }));

//         if (name === 'password') {
//             setPasswordStrength({
//                 hasLength: value.length >= 8,
//                 hasUppercase: /[A-Z]/.test(value),
//                 hasLowercase: /[a-z]/.test(value),
//                 hasNumber: /[0-9]/.test(value),
//             });
//         }
//         if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
//             const pwd = name === 'password' ? value : formData.password;
//             const confirmPwd = name === 'confirmPassword' ? value : formData.confirmPassword;
//             setErrors(prev => ({
//                 ...prev,
//                 confirmPassword: confirmPwd && pwd !== confirmPwd ? 'Passwords do not match' : ''
//             }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.name.trim() || formData.name.trim().length < 2)
//             newErrors.name = 'Name must be at least 2 characters';
//         if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
//             newErrors.email = 'Valid email is required';
//         if (!formData.password || formData.password.length < 8)
//             newErrors.password = 'Password must be at least 8 characters';
//         if (!formData.confirmPassword)
//             newErrors.confirmPassword = 'Please confirm your password';
//         else if (formData.password !== formData.confirmPassword)
//             newErrors.confirmPassword = 'Passwords do not match';
//         if (!formData.city.trim()) newErrors.city = 'City is required';
//         if (!formData.state.trim()) newErrors.state = 'State is required';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // ── Step 1: Validate & Send OTP ───────────────────────────────────
//     const startTimer = () => {
//         setResendTimer(30);
//         const interval = setInterval(() => {
//             setResendTimer(prev => {
//                 if (prev <= 1) { clearInterval(interval); return 0; }
//                 return prev - 1;
//             });
//         }, 1000);
//     };

//     const handleRegisterAndSendOtp = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
//         setLoading(true);
//         try {
//             await axios.post('http://localhost:8086/api/auth/otp/send', {
//                 email: formData.email,
//                 purpose: 'REGISTER'
//             });
//             toast.success(`Verification OTP sent to ${formData.email}`);
//             setStep(2);
//             startTimer();
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Failed to send OTP');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ── Step 2: Verify OTP & Create Account ──────────────────────────
//     const handleVerifyAndCreate = async () => {
//         if (otp.length !== 6) return toast.error('Enter 6-digit OTP');
//         setLoading(true);
//         try {
//             const res = await axios.post('http://localhost:8086/api/auth/otp/verify-register', {
//                 ...formData, otp
//             });
//             login(res.data.token, {
//                 name: res.data.name,
//                 email: res.data.email,
//                 role: res.data.role
//             });
//             toast.success(`Welcome, ${res.data.name}! 🎉`);
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
//                 email: formData.email, purpose: 'REGISTER'
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

//     const handleGoogleSignup = () => {
//         window.location.href = 'http://localhost:8086/oauth2/authorization/google';
//     };

//     return (
//         <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute top-20 right-20 w-96 h-96 bg-ai-500/10 rounded-full blur-3xl animate-pulse" />
//                 <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
//             </div>

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-full max-w-2xl relative z-10"
//             >
//                 <Link to="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-dark-100 transition-colors mb-6">
//                     <ArrowLeft className="w-4 h-4" />
//                     <span className="text-sm">Back to home</span>
//                 </Link>

//                 <Card className="shadow-2xl">
//                     {/* Logo */}
//                     <div className="text-center mb-4">
//                         <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ai-500 to-ai-700 flex items-center justify-center mx-auto mb-4">
//                             <span className="text-white font-bold text-xl">₹</span>
//                         </div>
//                         <h1 className="text-2xl font-display font-bold text-dark-100 mb-1">
//                             {step === 1 ? 'Create Your Account' : 'Verify Your Email'}
//                         </h1>
//                         <p className="text-dark-400 text-sm">
//                             {step === 1
//                                 ? 'Fill in your details to get started'
//                                 : `Enter the OTP sent to ${formData.email}`}
//                         </p>
//                     </div>

//                     {/* Step Indicator */}
//                     <StepIndicator currentStep={step} />

//                     <AnimatePresence mode="wait">

//                         {/* ── STEP 1: Registration Form ── */}
//                         {step === 1 && (
//                             <motion.form
//                                 key="step1"
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -30 }}
//                                 onSubmit={handleRegisterAndSendOtp}
//                                 className="space-y-4"
//                             >
//                                 {/* Name + Email */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <Input
//                                         type="text" name="name"
//                                         placeholder="Full name" label="Full Name"
//                                         icon={User} value={formData.name}
//                                         onChange={handleChange} required error={errors.name}
//                                     />
//                                     <Input
//                                         type="email" name="email"
//                                         placeholder="your@email.com" label="Email"
//                                         icon={Mail} value={formData.email}
//                                         onChange={handleChange} required error={errors.email}
//                                     />
//                                 </div>

//                                 {/* Password */}
//                                 <div className="relative">
//                                     <Input
//                                         type={showPassword ? 'text' : 'password'}
//                                         name="password"
//                                         placeholder="Create a strong password"
//                                         label="Password"
//                                         icon={Lock}
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         required
//                                         error={errors.password}
//                                     />
//                                     <button type="button"
//                                         onClick={() => setShowPassword(p => !p)}
//                                         className="absolute right-3 top-9 text-dark-400 hover:text-dark-200">
//                                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                     </button>
//                                 </div>

//                                 {/* Password Strength */}
//                                 {formData.password && (
//                                     <div className="p-3 rounded-lg bg-dark-800/50 border border-dark-700">
//                                         <div className="grid grid-cols-2 gap-1.5">
//                                             <PasswordRequirement met={passwordStrength.hasLength} text="8+ characters" />
//                                             <PasswordRequirement met={passwordStrength.hasUppercase} text="Uppercase letter" />
//                                             <PasswordRequirement met={passwordStrength.hasLowercase} text="Lowercase letter" />
//                                             <PasswordRequirement met={passwordStrength.hasNumber} text="Number" />
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Confirm Password */}
//                                 <div className="relative">
//                                     <Input
//                                         type={showConfirmPassword ? 'text' : 'password'}
//                                         name="confirmPassword"
//                                         placeholder="Re-enter your password"
//                                         label="Confirm Password"
//                                         icon={Lock}
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                         required
//                                         error={errors.confirmPassword}
//                                     />
//                                     <button type="button"
//                                         onClick={() => setShowConfirmPassword(p => !p)}
//                                         className="absolute right-3 top-9 text-dark-400 hover:text-dark-200">
//                                         {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                     </button>
//                                 </div>

//                                 {/* Password match indicator */}
//                                 {formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword && (
//                                     <div className="flex items-center gap-2 text-sm text-accent-400">
//                                         <CheckCircle2 size={16} />
//                                         <span>Passwords match</span>
//                                     </div>
//                                 )}

//                                 {/* Divider */}
//                                 <div className="flex items-center gap-3 py-1">
//                                     <div className="flex-1 h-px bg-dark-700" />
//                                     <span className="text-xs text-dark-500">Location Details</span>
//                                     <div className="flex-1 h-px bg-dark-700" />
//                                 </div>

//                                 {/* City + State */}
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <Input
//                                         type="text" name="city"
//                                         placeholder="Your city" label="City"
//                                         icon={MapPin} value={formData.city}
//                                         onChange={handleChange} required error={errors.city}
//                                     />
//                                     <Input
//                                         type="text" name="state"
//                                         placeholder="Your state" label="State"
//                                         icon={MapPin} value={formData.state}
//                                         onChange={handleChange} required error={errors.state}
//                                     />
//                                 </div>

//                                 {/* Country */}
//                                 <Input
//                                     type="text" name="country"
//                                     placeholder="Country" label="Country"
//                                     icon={MapPin} value={formData.country}
//                                     onChange={handleChange} required
//                                 />

//                                 {/* Info note */}
//                                 <div className="flex items-start gap-2 p-3 bg-ai-500/10 border border-ai-500/20 rounded-lg">
//                                     <Mail className="w-4 h-4 text-ai-400 mt-0.5 flex-shrink-0" />
//                                     <p className="text-xs text-ai-300">
//                                         A 6-digit verification code will be sent to your email after clicking Register
//                                     </p>
//                                 </div>

//                                 {/* Submit */}
//                                 <Button type="submit" variant="primary" className="w-full" loading={loading}>
//                                     {loading ? 'Sending verification code...' : 'Register & Verify Email →'}
//                                 </Button>

//                                 {/* Divider */}
//                                 <div className="flex items-center gap-4">
//                                     <div className="flex-1 h-px bg-dark-800" />
//                                     <span className="text-sm text-dark-500">or</span>
//                                     <div className="flex-1 h-px bg-dark-800" />
//                                 </div>

//                                 {/* Google */}
//                                 <Button variant="secondary" className="w-full" onClick={handleGoogleSignup}>
//                                     <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                                         <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                                         <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                                         <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                                         <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                                     </svg>
//                                     Sign up with Google
//                                 </Button>

//                                 <p className="text-center text-sm text-dark-400">
//                                     Already have an account?{' '}
//                                     <Link to="/login" className="text-ai-400 hover:text-ai-300 font-medium transition-colors">
//                                         Sign in
//                                     </Link>
//                                 </p>
//                             </motion.form>
//                         )}

//                         {/* ── STEP 2: OTP Verification ── */}
//                         {step === 2 && (
//                             <motion.div
//                                 key="step2"
//                                 initial={{ opacity: 0, x: 30 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: 30 }}
//                                 className="space-y-6"
//                             >
//                                 {/* Email icon */}
//                                 <div className="flex flex-col items-center gap-3">
//                                     <div className="w-16 h-16 rounded-full bg-ai-500/20 flex items-center justify-center">
//                                         <ShieldCheck className="w-8 h-8 text-ai-400" />
//                                     </div>
//                                     <div className="text-center">
//                                         <p className="text-dark-300 text-sm">Code sent to</p>
//                                         <p className="text-ai-400 font-semibold">{formData.email}</p>
//                                     </div>
//                                 </div>

//                                 {/* OTP Boxes */}
//                                 <OtpInput value={otp} onChange={setOtp} length={6} />

//                                 {/* Verify Button */}
//                                 <Button
//                                     variant="primary"
//                                     className="w-full"
//                                     onClick={handleVerifyAndCreate}
//                                     disabled={loading || otp.length !== 6}
//                                     loading={loading}
//                                 >
//                                     <CheckCircle className="w-4 h-4 mr-2" />
//                                     {loading ? 'Creating Account...' : 'Verify & Create Account'}
//                                 </Button>

//                                 {/* Resend + Back */}
//                                 <div className="flex items-center justify-between text-sm">
//                                     <button
//                                         onClick={() => { setStep(1); setOtp(''); }}
//                                         className="text-dark-400 hover:text-dark-200 transition-colors"
//                                     >
//                                         ← Edit details
//                                     </button>
//                                     <button
//                                         onClick={handleResend}
//                                         disabled={resendTimer > 0 || loading}
//                                         className="inline-flex items-center gap-1.5 text-ai-400 hover:text-ai-300 disabled:opacity-50 transition-colors"
//                                     >
//                                         <RefreshCw className="w-3.5 h-3.5" />
//                                         {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
//                                     </button>
//                                 </div>

//                                 {/* Summary */}
//                                 <div className="p-3 bg-dark-800/50 rounded-lg border border-dark-700 text-xs text-dark-400 space-y-1">
//                                     <p>📧 <span className="text-dark-300">{formData.email}</span></p>
//                                     <p>👤 <span className="text-dark-300">{formData.name}</span></p>
//                                     <p>📍 <span className="text-dark-300">{formData.city}, {formData.state}, {formData.country}</span></p>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </Card>

//                 <p className="text-center text-xs text-dark-500 mt-6">
//                     By creating an account, you agree to our Terms of Service and Privacy Policy
//                 </p>
//             </motion.div>
//         </div>
//     );
// };

// export default Register;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Lock, User, MapPin, ArrowLeft,
    Eye, EyeOff, CheckCircle2, XCircle,
    RefreshCw, CheckCircle, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Common/Card';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

// ── OTP Input ─────────────────────────────────────────────────────────────────
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
        <div className="flex gap-3 justify-center">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={el => inputs[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ''}
                    onChange={e => handleChange(index, e)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-2xl font-bold
                               bg-dark-800 border-2 border-dark-700 rounded-xl
                               text-dark-100 focus:outline-none focus:border-ai-500
                               focus:ring-2 focus:ring-ai-500/30 transition-all"
                />
            ))}
        </div>
    );
};

// ── Password Requirement ──────────────────────────────────────────────────────
const PasswordRequirement = ({ met, text }) => (
    <div className="flex items-center gap-2 text-xs">
        {met
            ? <CheckCircle2 size={14} className="text-accent-400 flex-shrink-0" />
            : <XCircle size={14} className="text-dark-500 flex-shrink-0" />}
        <span className={met ? 'text-accent-400' : 'text-dark-500'}>{text}</span>
    </div>
);

// ── Step Indicator ────────────────────────────────────────────────────────────
const StepIndicator = ({ currentStep }) => (
    <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2].map((step) => (
            <div key={step} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${currentStep === step
                    ? 'bg-ai-600 text-white'
                    : currentStep > step
                        ? 'bg-accent-500 text-white'
                        : 'bg-dark-800 text-dark-500'
                    }`}>
                    {currentStep > step ? <CheckCircle2 size={16} /> : step}
                </div>
                {step < 2 && (
                    <div className={`w-16 h-0.5 transition-all ${currentStep > step ? 'bg-accent-500' : 'bg-dark-700'
                        }`} />
                )}
            </div>
        ))}
    </div>
);

// ── Main Register ─────────────────────────────────────────────────────────────
const Register = () => {
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        city: '', state: '', country: 'India',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState({
        hasLength: false, hasUppercase: false,
        hasLowercase: false, hasNumber: false,
    });

    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));

        if (name === 'password') {
            setPasswordStrength({
                hasLength: value.length >= 8,
                hasUppercase: /[A-Z]/.test(value),
                hasLowercase: /[a-z]/.test(value),
                hasNumber: /[0-9]/.test(value),
            });
        }
        if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
            const pwd = name === 'password' ? value : formData.password;
            const confirmPwd = name === 'confirmPassword' ? value : formData.confirmPassword;
            setErrors(prev => ({
                ...prev,
                confirmPassword: confirmPwd && pwd !== confirmPwd ? 'Passwords do not match' : ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim() || formData.name.trim().length < 2)
            newErrors.name = 'Name must be at least 2 characters';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Valid email is required';
        if (!formData.password || formData.password.length < 8)
            newErrors.password = 'Password must be at least 8 characters';
        if (!formData.confirmPassword)
            newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const startTimer = () => {
        setResendTimer(30);
        const interval = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) { clearInterval(interval); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    const handleRegisterAndSendOtp = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/auth/otp/send`, {
                email: formData.email,
                purpose: 'REGISTER'
            });
            toast.success(`Verification OTP sent to ${formData.email}`);
            setStep(2);
            startTimer();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndCreate = async () => {
        if (otp.length !== 6) return toast.error('Enter 6-digit OTP');
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/api/auth/otp/verify-register`, {
                ...formData, otp
            });
            login(res.data.token, {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role
            });
            toast.success(`Welcome, ${res.data.name}! 🎉`);
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid OTP');
            setOtp('');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/auth/otp/send`, {
                email: formData.email, purpose: 'REGISTER'
            });
            toast.success('New OTP sent!');
            setOtp('');
            startTimer();
        } catch (err) {
            toast.error('Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        window.location.href = `${API_URL}/oauth2/authorization/google`;
    };

    return (
        <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-96 h-96 bg-ai-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl relative z-10"
            >
                <Link to="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-dark-100 transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back to home</span>
                </Link>

                <Card className="shadow-2xl">
                    {/* Logo */}
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ai-500 to-ai-700 flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">₹</span>
                        </div>
                        <h1 className="text-2xl font-display font-bold text-dark-100 mb-1">
                            {step === 1 ? 'Create Your Account' : 'Verify Your Email'}
                        </h1>
                        <p className="text-dark-400 text-sm">
                            {step === 1
                                ? 'Fill in your details to get started'
                                : `Enter the OTP sent to ${formData.email}`}
                        </p>
                    </div>

                    {/* Step Indicator */}
                    <StepIndicator currentStep={step} />

                    <AnimatePresence mode="wait">

                        {/* ── STEP 1: Registration Form ── */}
                        {step === 1 && (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                onSubmit={handleRegisterAndSendOtp}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        type="text" name="name"
                                        placeholder="Full name" label="Full Name"
                                        icon={User} value={formData.name}
                                        onChange={handleChange} required error={errors.name}
                                    />
                                    <Input
                                        type="email" name="email"
                                        placeholder="your@email.com" label="Email"
                                        icon={Mail} value={formData.email}
                                        onChange={handleChange} required error={errors.email}
                                    />
                                </div>

                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Create a strong password"
                                        label="Password"
                                        icon={Lock}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        error={errors.password}
                                    />
                                    <button type="button"
                                        onClick={() => setShowPassword(p => !p)}
                                        className="absolute right-3 top-9 text-dark-400 hover:text-dark-200">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {formData.password && (
                                    <div className="p-3 rounded-lg bg-dark-800/50 border border-dark-700">
                                        <div className="grid grid-cols-2 gap-1.5">
                                            <PasswordRequirement met={passwordStrength.hasLength} text="8+ characters" />
                                            <PasswordRequirement met={passwordStrength.hasUppercase} text="Uppercase letter" />
                                            <PasswordRequirement met={passwordStrength.hasLowercase} text="Lowercase letter" />
                                            <PasswordRequirement met={passwordStrength.hasNumber} text="Number" />
                                        </div>
                                    </div>
                                )}

                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Re-enter your password"
                                        label="Confirm Password"
                                        icon={Lock}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        error={errors.confirmPassword}
                                    />
                                    <button type="button"
                                        onClick={() => setShowConfirmPassword(p => !p)}
                                        className="absolute right-3 top-9 text-dark-400 hover:text-dark-200">
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword && (
                                    <div className="flex items-center gap-2 text-sm text-accent-400">
                                        <CheckCircle2 size={16} />
                                        <span>Passwords match</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 py-1">
                                    <div className="flex-1 h-px bg-dark-700" />
                                    <span className="text-xs text-dark-500">Location Details</span>
                                    <div className="flex-1 h-px bg-dark-700" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        type="text" name="city"
                                        placeholder="Your city" label="City"
                                        icon={MapPin} value={formData.city}
                                        onChange={handleChange} required error={errors.city}
                                    />
                                    <Input
                                        type="text" name="state"
                                        placeholder="Your state" label="State"
                                        icon={MapPin} value={formData.state}
                                        onChange={handleChange} required error={errors.state}
                                    />
                                </div>

                                <Input
                                    type="text" name="country"
                                    placeholder="Country" label="Country"
                                    icon={MapPin} value={formData.country}
                                    onChange={handleChange} required
                                />

                                <div className="flex items-start gap-2 p-3 bg-ai-500/10 border border-ai-500/20 rounded-lg">
                                    <Mail className="w-4 h-4 text-ai-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-ai-300">
                                        A 6-digit verification code will be sent to your email after clicking Register
                                    </p>
                                </div>

                                <Button type="submit" variant="primary" className="w-full" loading={loading}>
                                    {loading ? 'Sending verification code...' : 'Register & Verify Email →'}
                                </Button>

                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-px bg-dark-800" />
                                    <span className="text-sm text-dark-500">or</span>
                                    <div className="flex-1 h-px bg-dark-800" />
                                </div>

                                <Button variant="secondary" className="w-full" onClick={handleGoogleSignup}>
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Sign up with Google
                                </Button>

                                <p className="text-center text-sm text-dark-400">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-ai-400 hover:text-ai-300 font-medium transition-colors">
                                        Sign in
                                    </Link>
                                </p>
                            </motion.form>
                        )}

                        {/* ── STEP 2: OTP Verification ── */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                className="space-y-6"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-full bg-ai-500/20 flex items-center justify-center">
                                        <ShieldCheck className="w-8 h-8 text-ai-400" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-dark-300 text-sm">Code sent to</p>
                                        <p className="text-ai-400 font-semibold">{formData.email}</p>
                                    </div>
                                </div>

                                <OtpInput value={otp} onChange={setOtp} length={6} />

                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={handleVerifyAndCreate}
                                    disabled={loading || otp.length !== 6}
                                    loading={loading}
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    {loading ? 'Creating Account...' : 'Verify & Create Account'}
                                </Button>

                                <div className="flex items-center justify-between text-sm">
                                    <button
                                        onClick={() => { setStep(1); setOtp(''); }}
                                        className="text-dark-400 hover:text-dark-200 transition-colors"
                                    >
                                        ← Edit details
                                    </button>
                                    <button
                                        onClick={handleResend}
                                        disabled={resendTimer > 0 || loading}
                                        className="inline-flex items-center gap-1.5 text-ai-400 hover:text-ai-300 disabled:opacity-50 transition-colors"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                                    </button>
                                </div>

                                <div className="p-3 bg-dark-800/50 rounded-lg border border-dark-700 text-xs text-dark-400 space-y-1">
                                    <p>📧 <span className="text-dark-300">{formData.email}</span></p>
                                    <p>👤 <span className="text-dark-300">{formData.name}</span></p>
                                    <p>📍 <span className="text-dark-300">{formData.city}, {formData.state}, {formData.country}</span></p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>

                <p className="text-center text-xs text-dark-500 mt-6">
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
            </motion.div>
        </div>
    );
};

export default Register;