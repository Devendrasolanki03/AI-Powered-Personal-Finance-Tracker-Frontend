// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login as loginAPI, register as registerAPI, getCurrentUser } from '../api/auth.api';
// import { setToken, removeToken, getToken, setUser as setUserStorage, removeUser, getUser as getUserStorage } from '../utils/token';
// import toast from 'react-hot-toast';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const initAuth = async () => {
//             const token = getToken();
//             const savedUser = getUserStorage();

//             if (token && savedUser) {
//                 setUser(savedUser);

//                 if (savedUser.provider === 'LOCAL') {
//                     try {
//                         const freshUser = await getCurrentUser();
//                         setUser(freshUser);
//                         setUserStorage(freshUser);
//                     } catch (error) {
//                         console.warn('Failed to fetch fresh user:', error.message);
//                     }
//                 }
//             } else {
//                 removeToken();
//                 removeUser();
//                 setUser(null);
//             }

//             setLoading(false);
//         };

//         initAuth();
//     }, []);

//     // ================= LOGIN =================
//     const login = async (credentials) => {
//         try {
//             // auth.api.js returns response.data directly → { token, name, email, role }
//             const data = await loginAPI(credentials);

//             const token = data?.token;
//             if (!token) throw new Error('No token received from server');

//             const userData = {
//                 name: data.name,
//                 email: data.email,
//                 role: data.role || 'USER',
//                 provider: data.provider || 'LOCAL',
//             };

//             setToken(token);
//             setUserStorage(userData);
//             setUser(userData);

//             toast.success(`Welcome back, ${userData.name}! 🎉`);
//             navigate('/dashboard');
//             return { success: true };

//         } catch (error) {
//             const errorMessage =
//                 error.response?.data?.message || error.message || 'Login failed. Please try again.';
//             toast.error(errorMessage);
//             return { success: false, error: errorMessage };
//         }
//     };

//     // ================= REGISTER =================
//     const register = async (userData) => {
//         try {
//             // auth.api.js returns response.data directly → { token, name, email, role }
//             const data = await registerAPI(userData);

//             const token = data?.token;

//             if (!token) {
//                 // Backend registered but didn't return token → send to login
//                 toast.success('Account created! Please sign in. 🎉');
//                 navigate('/login');
//                 return { success: true };
//             }

//             // ✅ Token received → save → go directly to dashboard
//             const newUser = {
//                 name: data.name || userData.name,
//                 email: data.email || userData.email,
//                 role: data.role || 'USER',
//                 provider: data.provider || 'LOCAL',
//             };

//             setToken(token);
//             setUserStorage(newUser);
//             setUser(newUser);

//             toast.success(`Welcome, ${newUser.name}! 🎉`);
//             navigate('/dashboard');   // ✅ DIRECT TO DASHBOARD - no login needed!
//             return { success: true };

//         } catch (error) {
//             const errorMessage =
//                 error.response?.data?.message || error.message || 'Registration failed. Please try again.';
//             toast.error(errorMessage);
//             return { success: false, error: errorMessage };
//         }
//     };

//     // ================= LOGOUT =================
//     const logout = () => {
//         removeToken();
//         removeUser();
//         setUser(null);
//         toast.success('Logged out successfully');
//         navigate('/login');
//     };

//     const value = {
//         user,
//         login,
//         register,
//         logout,
//         loading,
//         isAuthenticated: !!user,
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI, register as registerAPI, getCurrentUser } from '../api/auth.api';
import { setToken, removeToken, getToken, setUser as setUserStorage, removeUser, getUser as getUserStorage } from '../utils/token';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            const token = getToken();
            const savedUser = getUserStorage();

            if (token && savedUser) {
                setUser(savedUser);

                if (savedUser.provider === 'LOCAL') {
                    try {
                        const freshUser = await getCurrentUser();
                        setUser(freshUser);
                        setUserStorage(freshUser);
                    } catch (error) {
                        console.warn('Failed to fetch fresh user:', error.message);
                    }
                }
            } else {
                removeToken();
                removeUser();
                setUser(null);
            }

            setLoading(false);
        };

        initAuth();
    }, []);

    // ================= LOGIN =================
    // ✅ 2 cases:
    // Case 1 - Password login: login({ email, password })
    // Case 2 - OTP login:      login(token, { name, email, role })
    const login = async (credentialsOrToken, otpUserData = null) => {
        try {
            // ── OTP Login (token + user data directly) ──────────────────
            if (typeof credentialsOrToken === 'string' && otpUserData) {
                const token = credentialsOrToken;
                const userData = {
                    name: otpUserData.name,
                    email: otpUserData.email,
                    role: otpUserData.role || 'USER',
                    provider: 'LOCAL',
                };

                setToken(token);
                setUserStorage(userData);
                setUser(userData);

                // Toast & navigate handled in OTP component itself
                return { success: true };
            }

            // ── Password Login (credentials object) ─────────────────────
            const data = await loginAPI(credentialsOrToken);

            const token = data?.token;
            if (!token) throw new Error('No token received from server');

            const userData = {
                name: data.name,
                email: data.email,
                role: data.role || 'USER',
                provider: data.provider || 'LOCAL',
            };

            setToken(token);
            setUserStorage(userData);
            setUser(userData);

            toast.success(`Welcome back, ${userData.name}! 🎉`);
            navigate('/dashboard');
            return { success: true };

        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // ================= REGISTER =================
    // ✅ 2 cases:
    // Case 1 - Password register: register({ name, email, password, ... })
    // Case 2 - OTP register:      register(token, { name, email, role })
    const register = async (userDataOrToken, otpUserData = null) => {
        try {
            // ── OTP Register (token + user data directly) ───────────────
            if (typeof userDataOrToken === 'string' && otpUserData) {
                const token = userDataOrToken;
                const newUser = {
                    name: otpUserData.name,
                    email: otpUserData.email,
                    role: otpUserData.role || 'USER',
                    provider: 'LOCAL',
                };

                setToken(token);
                setUserStorage(newUser);
                setUser(newUser);

                // Toast & navigate handled in OTP component itself
                return { success: true };
            }

            // ── Password Register (form data object) ────────────────────
            const data = await registerAPI(userDataOrToken);

            const token = data?.token;

            if (!token) {
                toast.success('Account created! Please sign in. 🎉');
                navigate('/login');
                return { success: true };
            }

            const newUser = {
                name: data.name || userDataOrToken.name,
                email: data.email || userDataOrToken.email,
                role: data.role || 'USER',
                provider: data.provider || 'LOCAL',
            };

            setToken(token);
            setUserStorage(newUser);
            setUser(newUser);

            toast.success(`Welcome, ${newUser.name}! 🎉`);
            navigate('/dashboard');
            return { success: true };

        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // ================= LOGOUT =================
    const logout = () => {
        removeToken();
        removeUser();
        setUser(null);
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};