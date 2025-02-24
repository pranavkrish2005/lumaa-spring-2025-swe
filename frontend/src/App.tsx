import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/common/Navigation';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { TaskList } from './components/tasks/TaskList';
import { ProtectedRoute } from './components/common/ProtectedRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TaskList />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/" 
              element={<Navigate to={localStorage.getItem('token') ? '/tasks' : '/login'} />} 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
