import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/login'
    }
});

export const config = {
    matcher: [
        '/feed/:path*',
        '/post/:path*',
        '/checkout/:path*',
        '/messages/:path*',
        // Protecting main components from Phase 3 plan if they are added as routes
        '/explore/:path*',
        '/cart/:path*',
    ],
};
