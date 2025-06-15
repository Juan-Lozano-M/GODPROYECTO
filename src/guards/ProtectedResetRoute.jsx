import { Navigate, useSearchParams } from 'react-router-dom';

const ProtectedResetRoute = ({ children }) => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  if (!oobCode) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedResetRoute;