// components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  // 從 sessionStorage 檢查登入標記
  const isAuthenticated = sessionStorage.getItem('isLoggedIn') === 'true';

  // 如果有登入，回傳子組件 (AdminPage)；否則導向登入頁
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;