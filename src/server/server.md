# Server architecture

High-level: `/src/api/[routes]` only invoke functions in `services`, which invoke and process results from functions in `lib`



### `services`

- abstract and wrap around the functions defined in `lib`
- may call utils to process/combine data to return neatly to the requesting route



### `lib`
- contains all direct calls to external sources (ex. GitHub API, database provider, etc.)
- handles the raw `Response` object, handles `status`/`statusText`, returns raw un-processed JSON wrapped into `success`/`error` fields
