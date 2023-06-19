export interface NavRoute {
    href: string
    label: string
}

export const CLIENT_AUTH_ROUTES = ['/', '/repos', '/contributions']
export const NAV_AUTH_ROUTES: NavRoute[] = [
    { href: '/', label: 'Home' },
    { href: '/repos', label: 'Repos' },
    { href: '/contributions', label: 'Contributions' },
]

export const CLIENT_UNAUTH_ROUTES = ['/login', '/login-callback']
export const NAV_UNAUTH_ROUTES: NavRoute[] = [{ href: '/login', label: 'Log in' }]
