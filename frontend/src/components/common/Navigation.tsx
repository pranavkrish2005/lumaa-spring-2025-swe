import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Task Manager</Link>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="hover:text-gray-300">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};
