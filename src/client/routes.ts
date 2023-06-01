export interface NavRoute {
    href: string
    label: string
}

export const CLIENT_AUTH_ROUTES = ['/', '/repos']
export const NAV_AUTH_ROUTES: NavRoute[] = [
    { href: '/', label: 'Home' },
    { href: '/repos', label: 'Repos' },
]

export const CLIENT_UNAUTH_ROUTES = ['/login', '/login-callback']
export const NAV_UNAUTH_ROUTES: NavRoute[] = [{ href: '/login', label: 'Log in' }]
