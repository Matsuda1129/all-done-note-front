import Router from 'next/router';
import Cookies from 'js-cookie';

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = Router;
  const signedIn = Cookies.get('signedIn');
  if (signedIn !== 'true') router.replace('/login');

  return <main>{children}</main>;
};
