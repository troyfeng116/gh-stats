# `models` conventions

-   `SHARED_APIFields` extends `SHARED_APIFields__BASE`, used in client-server interactions (i.e. bridge from `/api/routes` to client)
-   `SHARED_Model` is custom-defined model, usually wrapped in `SHARED_APIFields`
