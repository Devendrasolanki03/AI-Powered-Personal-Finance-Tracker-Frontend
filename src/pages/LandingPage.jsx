// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Sparkles, TrendingUp, MapPin, Shield, ArrowRight, Zap, BarChart3, Lock } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useRef } from 'react';

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"]
//   });

//   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   const features = [
//     {
//       icon: TrendingUp,
//       title: 'Smart Tracking',
//       description: 'Automatically categorize and track every rupee with AI-powered insights.',
//       gradient: 'from-emerald-500 to-teal-500',
//     },
//     {
//       icon: Sparkles,
//       title: 'AI Insights',
//       description: 'Get personalized recommendations to save more and spend smarter.',
//       gradient: 'from-violet-500 to-purple-500',
//     },
//     {
//       icon: MapPin,
//       title: 'Location-Aware',
//       description: 'Tailored advice based on your location and local market trends.',
//       gradient: 'from-blue-500 to-cyan-500',
//     },
//     {
//       icon: Shield,
//       title: 'Bank-Level Security',
//       description: 'Military-grade encryption keeps your financial data completely private.',
//       gradient: 'from-rose-500 to-pink-500',
//     },
//   ];

//   const stats = [
//     { value: '10K+', label: 'Active Users' },
//     { value: '₹50Cr+', label: 'Money Tracked' },
//     { value: '4.9/5', label: 'User Rating' },
//     { value: '99.9%', label: 'Uptime' },
//   ];

//   return (
//     <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 opacity-30">
//         <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
//         <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Navigation */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className="relative z-50 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl"
//       >
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center gap-3 cursor-pointer group"
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
//                 <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
//                   <Sparkles className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
//                 FinanceAI
//               </span>
//             </motion.div>

//             <div className="flex items-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/login')}
//                 className="px-6 py-2.5 text-slate-300 hover:text-white transition-colors font-medium"
//               >
//                 Login
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/register')}
//                 className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
//               >
//                 Get Started
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Hero Section */}
//       <motion.section
//         style={{ y: heroY, opacity: heroOpacity }}
//         className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32"
//       >
//         <div className="text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm mb-8"
//           >
//             <Zap className="w-4 h-4 text-violet-400" />
//             <span className="text-sm text-violet-300 font-medium">AI-Powered Financial Intelligence</span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight"
//           >
//             Take Control of
//             <br />
//             <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Your Finances
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed"
//           >
//             Smart expense tracking meets AI-powered insights. Save more, spend smarter,
//             and achieve your financial goals with personalized recommendations.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="flex flex-col sm:flex-row items-center justify-center gap-4"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate('/register')}
//               className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold text-lg shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-all flex items-center gap-2"
//             >
//               Start Free Trial
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate('/login')}
//               className="px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all"
//             >
//               Watch Demo
//             </motion.button>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 + index * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="text-4xl font-black bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
//                   {stat.value}
//                 </div>
//                 <div className="text-slate-500 font-medium">{stat.label}</div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Features Section */}
//       <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-5xl font-black text-white mb-4">
//             Everything You Need
//           </h2>
//           <p className="text-xl text-slate-400 max-w-2xl mx-auto">
//             Powerful features designed to help you master your money
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -8, scale: 1.02 }}
//                 className="group relative"
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
//                 <div className="relative h-full p-8 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all">
//                   <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
//                     <Icon className="w-7 h-7 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                   <p className="text-slate-400 leading-relaxed">{feature.description}</p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="relative overflow-hidden rounded-3xl"
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600"></div>
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

//           <div className="relative text-center py-20 px-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//             >
//               <h2 className="text-5xl font-black text-white mb-6">
//                 Ready to Transform Your Finances?
//               </h2>
//               <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
//                 Join thousands of smart savers who've already taken control with AI-powered insights
//               </p>
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)" }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => navigate('/register')}
//                   className="group px-10 py-4 rounded-2xl bg-white text-purple-600 font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all flex items-center gap-2"
//                 >
//                   Get Started Free
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => navigate('/login')}
//                   className="px-10 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-all"
//                 >
//                   Sign In
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-white/5 bg-slate-900/50 backdrop-blur-xl mt-20">
//         <div className="max-w-7xl mx-auto px-6 py-12">
//           <div className="flex flex-col items-center justify-center gap-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
//                 <Sparkles className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
//                 FinanceAI
//               </span>
//             </div>
//             <p className="text-slate-500">
//               © {new Date().getFullYear()} FinanceAI. Empowering financial freedom through AI.
//             </p>
//             <button
//               onClick={() => navigate('/admin/login')}
//               className="text-sm text-slate-600 hover:text-violet-400 transition-colors"
//             >
//               Admin Portal →
//             </button>
//           </div>
//         </div>
//       </footer>

//       {/* Custom CSS for blob animation */}
//       <style>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           25% { transform: translate(20px, -50px) scale(1.1); }
//           50% { transform: translate(-20px, 20px) scale(0.9); }
//           75% { transform: translate(50px, 50px) scale(1.05); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// };

// // export default LandingPage;
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Sparkles, TrendingUp, Brain, Shield, Zap, ArrowRight,
  Wallet, LineChart, Lock, Star, Check, ChevronRight, Circle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Advanced algorithms analyze your spending and provide personalized recommendations',
      stat: '10x smarter',
      color: '#8b5cf6',
      particles: '🧠',
    },
    {
      icon: LineChart,
      title: 'Real-Time Analytics',
      description: 'Beautiful charts and graphs show exactly where your money goes',
      stat: '100% accurate',
      color: '#10b981',
      particles: '📊',
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Military-grade encryption keeps your financial data completely safe',
      stat: '256-bit SSL',
      color: '#ef4444',
      particles: '🔒',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Track expenses in seconds with our instant categorization system',
      stat: '< 0.5s',
      color: '#f59e0b',
      particles: '⚡',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: '👥' },
    { label: 'Money Saved', value: '₹100Cr+', icon: '💰' },
    { label: 'Avg. Rating', value: '4.9★', icon: '⭐' },
    { label: 'Countries', value: '25+', icon: '🌍' },
  ];

  const benefits = [
    'Save up to 40% on monthly expenses',
    'Get instant AI recommendations',
    'Track unlimited transactions',
    'Beautiful visual reports',
    'Secure cloud backup',
    'Multi-device sync',
  ];

  const testimonials = [
    { name: 'Ravi Kumar', role: 'Entrepreneur', text: 'Best finance app I\'ve ever used!', rating: 5 },
    { name: 'Priya Sharma', role: 'Software Engineer', text: 'Saved ₹50,000 in 3 months!', rating: 5 },
    { name: 'Amit Patel', role: 'Doctor', text: 'AI insights are incredibly accurate', rating: 5 },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1e1b4b 50%, #0a0e1a 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Floating Particles */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            animate={{
              y: ['0vh', '100vh'],
              x: [
                `${particle.x}vw`,
                `${particle.x + (Math.random() - 0.5) * 20}vw`,
                `${particle.x}vw`,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: 'absolute',
              top: '-10px',
              left: `${particle.x}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              borderRadius: '50%',
              background: 'rgba(139, 92, 246, 0.5)',
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Gradient */}
      <motion.div
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{
          position: 'fixed',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(40px)',
        }}
      />

      {/* Animated Background Shapes */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Gradient Orbs with Pulsing */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
            rotate: [0, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: '50%',
            right: '30%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(70px)',
          }}
        />

        {/* Animated Grid */}
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo with Pulse Effect */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
            }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.5)',
                  '0 0 40px rgba(139, 92, 246, 0.8)',
                  '0 0 20px rgba(139, 92, 246, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-white font-bold text-xl">₹</span>
              </motion.div>
            </motion.div>
            <div>
              <motion.h1
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 50%, #8b5cf6 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0,
                }}
              >
                FinanceAI
              </motion.h1>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Smart Money Tracker</p>
            </div>
          </motion.div>

          {/* Buttons with Enhanced Animations */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <motion.button
              whileHover={{ scale: 1.05, color: '#f1f5f9' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem',
                position: 'relative',
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Sign In</span>
              <motion.div
                whileHover={{ scaleX: 1 }}
                initial={{ scaleX: 0 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #8b5cf6, #d946ef)',
                  transformOrigin: 'left',
                }}
              />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>Get Started</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          style={{
            y,
            opacity,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '6rem 1.5rem',
            textAlign: 'center',
          }}
        >
          {/* Badge with Floating Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '100px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)',
              position: 'relative',
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity },
              }}
            >
              <Zap size={18} color="#8b5cf6" />
            </motion.div>
            <span style={{ color: '#c4b5fd', fontWeight: 600, fontSize: '0.875rem' }}>
              Powered by Advanced AI Technology
            </span>
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
              }}
            />
          </motion.div>

          {/* Main Heading with Letter Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontWeight: 900,
              color: '#f1f5f9',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(139, 92, 246, 0)',
                  '0 0 40px rgba(139, 92, 246, 0.5)',
                  '0 0 20px rgba(139, 92, 246, 0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Transform Your
            </motion.span>
            <br />
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 50%, #f472b6 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Financial Future
            </motion.span>
          </motion.h1>

          {/* Subtitle with Typing Effect */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: '#94a3b8',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              lineHeight: 1.7,
            }}
          >
            Stop worrying about money. Start making it work for you with
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: '#10b981', fontWeight: 600 }}
            > AI-powered insights</motion.span>,
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              style={{ color: '#8b5cf6', fontWeight: 600 }}
            > smart tracking</motion.span>, and
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              style={{ color: '#f59e0b', fontWeight: 600 }}
            > personalized recommendations</motion.span>.
          </motion.p>

          {/* CTA Buttons with Advanced Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 60px rgba(139, 92, 246, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2.5rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
                border: 'none',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.125rem',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Start Free Trial</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <ArrowRight size={20} />
              </motion.div>

              {/* Ripple Effect */}
              <motion.div
                animate={{
                  scale: [1, 2],
                  opacity: [0.5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.3)',
                }}
              />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderColor: 'rgba(139, 92, 246, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '16px',
                background: 'transparent',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                color: '#f1f5f9',
                fontWeight: 700,
                fontSize: '1.125rem',
                cursor: 'pointer',
              }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Animated Stats with Count-Up Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '2rem',
              maxWidth: '900px',
              margin: '4rem auto 0',
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                }}
                style={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  background: 'rgba(139, 92, 246, 0.05)',
                  border: '1px solid rgba(139, 92, 246, 0.1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  style={{ fontSize: '2rem', marginBottom: '0.5rem' }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    background: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.25rem',
                  }}
                >
                  {stat.value}
                </motion.div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{stat.label}</div>

                {/* Shimmer Effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
                    transform: 'skewX(-20deg)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with Particle Effects */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '6rem 1.5rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <motion.h2
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #f1f5f9 0%, #8b5cf6 50%, #f1f5f9 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}
          >
            Everything You Need
          </motion.h2>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Powerful features that make managing money effortless
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                y: -15,
                scale: 1.03,
                rotateZ: activeFeature === i ? [0, -2, 2, 0] : 0,
              }}
              onHoverStart={() => setActiveFeature(i)}
              style={{
                padding: '2rem',
                borderRadius: '24px',
                background: activeFeature === i
                  ? 'rgba(139, 92, 246, 0.15)'
                  : 'rgba(15, 23, 42, 0.5)',
                border: `2px solid ${activeFeature === i ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.05)'}`,
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Particle Emoji on Hover */}
              {activeFeature === i && (
                <>
                  {[...Array(5)].map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        y: -100,
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: idx * 0.1,
                        repeat: Infinity,
                      }}
                      style={{
                        position: 'absolute',
                        fontSize: '1.5rem',
                      }}
                    >
                      {feature.particles}
                    </motion.div>
                  ))}
                </>
              )}

              <motion.div
                animate={activeFeature === i ? {
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1.05, 1.1, 1],
                } : {}}
                transition={{ duration: 0.6 }}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}40 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  position: 'relative',
                }}
              >
                <feature.icon size={32} color={feature.color} />

                {/* Pulse Ring */}
                {activeFeature === i && (
                  <motion.div
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.5, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      inset: -10,
                      border: `2px solid ${feature.color}`,
                      borderRadius: '20px',
                    }}
                  />
                )}
              </motion.div>

              <motion.div
                animate={activeFeature === i ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '100px',
                  background: `${feature.color}20`,
                  color: feature.color,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                {feature.stat}
              </motion.div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#f1f5f9',
                marginBottom: '0.75rem',
              }}>
                {feature.title}
              </h3>

              <p style={{
                color: '#94a3b8',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}>
                {feature.description}
              </p>

              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: feature.color,
                  fontWeight: 600,
                }}
                animate={activeFeature === i ? {
                  x: [0, 10, 0],
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Learn more <ChevronRight size={18} />
              </motion.div>

              {/* Corner Accent */}
              {activeFeature === i && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: feature.color,
                    boxShadow: `0 0 20px ${feature.color}`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#f1f5f9',
            marginBottom: '1rem',
          }}>
            Loved by Users
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>
            See what people are saying
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 60px rgba(139, 92, 246, 0.2)',
              }}
              style={{
                padding: '2rem',
                borderRadius: '20px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{
                display: 'flex',
                gap: '0.25rem',
                marginBottom: '1rem',
              }}>
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.15 + idx * 0.05 }}
                  >
                    <Star size={18} fill="#fbbf24" color="#fbbf24" />
                  </motion.div>
                ))}
              </div>

              <p style={{
                color: '#cbd5e1',
                fontSize: '1.125rem',
                marginBottom: '1.5rem',
                fontStyle: 'italic',
              }}>
                "{testimonial.text}"
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                }}>
                  {testimonial.name[0]}
                </div>
                <div>
                  <div style={{ color: '#f1f5f9', fontWeight: 600 }}>
                    {testimonial.name}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section with 3D Card Effect */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem 6rem',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            borderRadius: '32px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
            padding: '4rem 2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated Pattern */}
          <motion.div
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px'],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Left Side */}
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  color: '#fff',
                  marginBottom: '1.5rem',
                }}
              >
                Why FinanceAI?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{
                  fontSize: '1.25rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '2rem',
                  lineHeight: 1.6,
                }}
              >
                Join thousands who've transformed their financial lives
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.5rem',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    >
                      <Star size={20} fill="#fbbf24" color="#fbbf24" />
                    </motion.div>
                  ))}
                </div>
                <div style={{ color: '#fff' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>4.9/5 Rating</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>From 10,000+ users</div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Benefits with Stagger */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{
                    x: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={18} color="#fff" strokeWidth={3} />
                  </motion.div>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA with Confetti Effect */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '6rem 1.5rem',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: '#f1f5f9',
              marginBottom: '1.5rem',
            }}
          >
            Ready to Get Started?
          </motion.h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#94a3b8',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
          }}>
            Join 50,000+ users already managing their finances smarter
          </p>

          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: '0 25px 70px rgba(139, 92, 246, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/register')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.5rem 3.5rem',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
              border: 'none',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.375rem',
              cursor: 'pointer',
              boxShadow: '0 15px 50px rgba(139, 92, 246, 0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                inset: -20,
                background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
            />

            <span style={{ position: 'relative', zIndex: 1 }}>Start Free Trial</span>
            <motion.div
              animate={{
                x: [0, 5, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <ArrowRight size={26} />
            </motion.div>

            {/* Shimmer Effect */}
            <motion.div
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: '1.5rem',
              color: '#64748b',
              fontSize: '0.875rem',
            }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
            {' '}No credit card required • 14-day free trial • Cancel anytime{' '}
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              ✨
            </motion.span>
          </motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '3rem 1.5rem',
          textAlign: 'center',
        }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              cursor: 'pointer',
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className="text-white font-bold text-xl">₹</span>
            </motion.div>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              FinanceAI
            </span>
          </motion.div>
          <p style={{ color: '#64748b', marginBottom: '1rem' }}>
            © {new Date().getFullYear()} FinanceAI. Empowering financial freedom through AI.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, color: '#8b5cf6' }}
            onClick={() => navigate('/admin/login')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Admin Portal →
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;