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
        // /explore is deliberately NOT listed: it is public discovery, linked
        // from the marketing navbar, the hero and the CTA on the logged-out
        // landing page. Gating it sent every one of those visitors to /login.
        // /cart is deliberately NOT listed: a guest can build a bag, which
        // persists in localStorage. /checkout above still requires a session,
        // so authentication happens at payment rather than at the bag.
        // /checkout/:path* is already covered above.
    ],
};
