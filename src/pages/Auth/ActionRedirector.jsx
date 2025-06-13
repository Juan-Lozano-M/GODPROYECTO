import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ActionRedirector = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    if (!mode || !oobCode) {
      navigate('/');
      return;
    }    // Redirige según el tipo de acción
    if (mode === 'verifyEmail' || mode === 'verifyAndChangeEmail') {
      navigate(`/verify-email?oobCode=${oobCode}&mode=${mode}`);
    } else if (mode === 'resetPassword') {
      navigate(`/login/resetpassword?oobCode=${oobCode}`);
    } else {
      navigate('/');
    }
  }, [mode, oobCode, navigate]);

  return <p>Redirigiendo...</p>;
};

export default ActionRedirector;
