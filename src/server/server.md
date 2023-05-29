# Server architecture

High-level: `app/api/[routes]` only invoke functions in `services`, which invoke and process results from functions in `lib`



### `services`

- abstract and wrap around the functions defined in `lib`
- may call utils to process/combine data to return neatly to the requesting route
- often: `services` is the bridge from raw backend data in `lib` to the models (defined in `models/shared`) needed by `/api` routes to return to client
- for example: `lib/GH_API_getUser` returns a massive raw `GH_User` object, and `services/getUser` processes the raw `GH_User` into the `models/shared.User` format for `/api` route to return directly to the client



### `lib`
- contains all direct calls to external sources (ex. GitHub API, database provider, etc.)
- handles the raw `Response` object, handles `status`/`statusText`, returns raw un-processed JSON wrapped into `success`/`error` fields
