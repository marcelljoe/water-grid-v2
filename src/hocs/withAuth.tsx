import { IAccess } from '@/lib/services';
import { http } from '@/utils/httpClient';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';

const withAuth = <P extends object>(Component: React.ComponentType<P>, path?: string) => {
  const AuthenticatedComponent: React.FC<P> = props => {
    const router = useRouter();
    const [access, setAccess] = useState<IAccess | null>();
    const [calledPush, setCalledPush] = useState(false);
    let { query, pathname } = router;

    const checkAuth = useCallback(() => {
      const abortController = new AbortController();
      const getSession = async () => {
        if (path) pathname = path;
        try {
          const session = await http.get('/api/session/access?path=' + pathname, { signal: abortController.signal });
          setAccess(session.data);

          if (calledPush) {
            return;
          }

          if (session.data?.statusCode == 401) {
            await http.get('/api/auth/session_expired');
            router.replace(`/login?redirect=${router.asPath}`, `/login`);
            setCalledPush(true);
          }

          if (session.data) {
            if (query?.redirect) {
              router.replace(query.redirect as string);
              setCalledPush(true);
            }
          }
        } catch (error: any) {
          if (error.statusCode == 401 || error.statusCode == 403) {
            await http.get('/api/auth/session_expired');
            router.replace(`/login?redirect=${router.asPath}`, `/login`);
            setCalledPush(true);
          }
        }
      };

      getSession();
      return () => {
        abortController.abort();
      };
    }, []);

    useEffect(() => {
      // run checkAuth every page visit
      checkAuth();

      // run checkAuth every focus changes
      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    return access && <Component session={access} {...props} />; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};

export default withAuth;
