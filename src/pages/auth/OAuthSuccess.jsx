import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { STORAGE_KEYS } from '../../utils/constants'; 

const OAuthSuccess = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        console.log('🟢 OAuth Processing');
        console.log('  Token:', !!token);

        if (!token) {
            window.location.href = '/login';
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('  Payload:', payload);

            const user = {
                name: payload.name || payload.sub,
                email: payload.sub,
                role: payload.role || 'USER',
                provider: 'GOOGLE',
            };
            console.log('  User:', user);

            // ✅ USE STORAGE_KEYS (same as token.js)
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

            console.log('✅ Saved with keys:', STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER);
            console.log('  Verify token:', !!localStorage.getItem(STORAGE_KEYS.TOKEN));
            console.log('  Verify user:', !!localStorage.getItem(STORAGE_KEYS.USER));

            // Redirect
            setTimeout(() => {
                console.log('🔄 Redirecting...');
                window.location.href = '/dashboard';
            }, 300);

        } catch (error) {
            console.error('❌ Error:', error);
            window.location.href = '/login';
        }
    }, [searchParams]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0f1e',
            color: 'white'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid #a855f7',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 20px'
                }}></div>
                <h2>Signing you in with Google...</h2>
                <p style={{ color: '#888', fontSize: '14px', marginTop: '10px' }}>
                    Check console for details
                </p>
                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default OAuthSuccess;