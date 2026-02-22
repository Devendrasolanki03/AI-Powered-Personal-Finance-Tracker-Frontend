import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const adminToken = localStorage.getItem('admin_token');

    if (!adminToken) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;