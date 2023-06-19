# Client architecture


## `components`

Contains:
- `Pages`, split into `Auth` and `Unauth`
    - each `Auth/{COMPONENT}` corresponds to some authenticated `app/{PAGE}`
    - likewise for `Unauth/{COMPONENT}`
    - note that components in `Auth/` are only rendered if the user is authenticated, and components in `Unauth/` are only rendered if the user is unauthenticated (see `Wrappers/AuthWrapper`)
- `Wrappers` for universal-client and layout-related items (e.g. client-side routing based on auth, nav bar, etc.)
    - `AuthProvider` handles authentication-related state, and provides it to all descendant components
    - `ClientWrapper` is invoked directly in the root layout `app/layout.tsx`, and specifies all other wrappers
    - `Wrappers/AuthWrapper` handles all client-side redirects based on authentication status, and prevents unauthorized rendering of pages
- `Reuse` for common components (e.g. `Button`, `Card`, etc.)



## `lib`
- contains all calls to the auth/unauth APIs defined in `app/api/{ROUTE}`
- responsible for type-casting results
