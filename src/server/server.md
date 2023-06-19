# Server architecture

High-level: `app/api/[routes]` only invoke functions in `services`, which invoke and process results from functions in `lib`



## `services`

- abstract and wrap around the functions defined in `lib`
- may call utils to process/combine data to return neatly to the requesting route
- often: `services` is the bridge from raw backend data in `lib` to the models (defined in `models/shared`) needed by `/api` routes to return to client
- for example: `lib/GH_API_getUser` returns a massive raw `GH_User` object, and `services/getUser` processes the raw `GH_User` into the `models/shared.User` format for `/api` route to return directly to the client



## `lib`
- contains all direct calls to external sources (ex. GitHub API, database provider, etc.)
- handles the raw `Response` object, handles `status`/`statusText`, returns raw un-processed JSON wrapped into `success`/`error` fields


### `lib/gh-api`

Handles authenticated HTTP `GET` API calls to `https://api.github.com`.

File structure and conventions:
- `lib/gh-api/index.ts` contains the main `fetch` entrypoint to the GitHub REST API, `BASE_GH_API_Call__getWithAuth`
    - `BASE_GH_API_Call_getWithAuth` calls `fetch` with appropriate authentication/content req headers, and returns the raw `Response` object
- each base GitHub API endpoint `/ENDPOINT` (e.g. `/repos`, `/users`, etc. as defined in the [GitHub API docs](https://docs.github.com/en/rest?apiVersion=2022-11-28)) has a corresponding directory in `lib/gh-api/{ENDPOINT}`
- each `{ENDPOINT}` directory contains `index.ts` and `model.ts`
- `model.ts` defines:
    - `GH_API_Obj__` `[interface]`: match the JSON response fields and types of the corresponding endpoint
    - note the GitHub API often directly returns JSON objects, matching `GH_API_Obj__`
- `index.ts` defines:
    - `GH_API_Call__` `[function]`: wrapper around `BASE_GH_API_Call__getWithAuth` for each corresponding route using the endpoint
    - e.g. each of `/repos/{owner}/{repo}`, `/user/repos`, etc. would have a corresponding `GH_API_Call__` function
- `GH_API_Call__` conventions:
    1. each `GH_API_Call__` has a corresponding `GH_API_Response__`, which is a `success`/`error` wrapper around (usually) the returned `GH_API_Obj__`
    2. each `GH_API_Call__` returns its `GH_API_Response__` object
    3. each `GH_API_Call__` is responsible for processing `status`/`statusCode`/`headers` on the `Response` object from `BASE_GH_API_Call__getWithAuth`
    4. each `GH_API_Call__` is responsible for type-casting `res.json()` into the desired `GH_API_Obj__` to fit into the `GH_API_Response__`


### `lib/gh-gql`

Handles authenticated HTTP `POST` calls to `https://api.github.com/graphql`.

File structure and conventions:
- `server/lib/gh-gql-index.ts` contains the main `fetch` entrypoint to the GitHub GraphQL API, `BASE_GH_GQL_Call__makeQueryWithAuth`.
    - `BASE_GH_GQL_Call__makeQueryWithAuth` calls `fetch` with appropriate authentication/content req headers and req body (with GraphQL query/variables), and returns the raw `Response` object
- each `QUERY_NAME` has its own directory `lib/gh-gql/{QUERY_NAME}`
- each `{QUERY_NAME}` directory contains `index.ts` and `query.ts`
- `query.ts` defines:
    - `GH_GQL_Query__` `[string]`: the stringified GraphQL query
    - `GH_GQL_QueryVars__` `[interface]`: the variables that must be provided to the `GH_GQL_Query__`, if any
    - `GH_GQL_Schema__` `[interface]`: the exact expected fields and types of the GraphQL query JSON result
- `index.ts` defines:
    - `GH_GQL_Call__` `[function]`: wrapper around `BASE_GH_GQL_Call__makeQueryWithAuth` using query `GH_GQL_Query__`, expects `GH_GQL_QueryVars` as parameter
    - `GH_GQL_Response__` `[interface]`: corresponding `success`/`error` wrapper around `GH_GQL_Schema__`, returned by `GH_GQL_Call__`
    - `GH_GQL_RawResponse__` `[interface]`: each call to `BASE_GH_GQL_Call__makeQueryWithAuth` may return an `errors` JSON field if the query is malformed or something goes wrong on the GitHub GraphQL server end. `GH_GQL_RawResponse` helps distinguish those error cases, and usually contains a `data: object` field which is the standard response JSON format of the GraphQL API
