import Router from 'next/router';
import Cookies from 'js-cookie';

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = Router;
  const signedIn = Cookies.get('signedIn');
  if (signedIn !== 'true') router.replace('/login');

  const overflow = { overflow: 'auto' };
  // const overflow = { position: 'fixed' };

  return <main style={overflow}>{children}</main>;
};
