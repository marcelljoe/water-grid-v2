import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface PageProps {
  // Define your page-specific props here
}

interface UserData {
  // Define the structure of your user data
}

interface AuthenticatedPageProps extends PageProps {
  data: UserData;
}

export function withAuth(gssp: GetServerSideProps<PageProps>): GetServerSideProps<AuthenticatedPageProps> {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AuthenticatedPageProps>> => {
    try {
      const response = await fetch('http://localhost:4000/user/me');
      const data = await response.json();

      if (!data) {
        return {
          redirect: {
            destination: '/admin/login',
            permanent: false
          }
        };
      }

      const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data

      // Pass page-specific props along with user data from `withAuth` to component
      return {
        props: {
          ...gsspData,
          data
        }
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {
        redirect: {
          destination: '/error', // Redirect to an error page if there's an error
          permanent: false
        }
      };
    }
  };
}
