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
        // /cart is deliberately NOT listed: a guest can build a bag, which
        // persists in localStorage. /checkout above still requires a session,
        // so authentication happens at payment rather than at the bag.
        // /checkout/:path* is already covered above.
    ],
};
