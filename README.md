# PostgreSQL Slow Query Log Analyzer

This GitHub Action collects and analyzes slow query log data for a PostgreSQL database.

## Inputs

| <span style="color:green">Name</span> | <span style="color:green">Requirement</span> | <span style="color:green">Description</span> | <span style="color:green">Default</span> |
| ---------------------| ------------| -----------------------------------------------------------| -------------------------------------|
| `metis_api_key`       | Required    | The Metis API key project identifier.                      |                                      |
| `github_token`       | Required    | The GitHub token.                                          |                                      |
| `target_url`         | Optional    | The target URL. Defaults to `'https://app.metisdata.io'`.  | `'https://app.metisdata.io'`         |
| `metis_exporter_url` | Optional    | The Metis exporter URL. Defaults to `'https://ingest.metisdata.io'`. | `'https://ingest.metisdata.io'` |
| `db_connection_string`| Required    | The database connection string.                            |                                      |


## Runs

This action runs using Node.js v16, and executes the main script located at `dist/index.js`.