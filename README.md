# PostgreSQL Slow Query Log Analyzer

This GitHub Action collects and analyzes slow query log data for a PostgreSQL database.

## Inputs

- `metis_api_key` *(required)*: The Metis API key project identifier.
- `github_token` *(required)*: The GitHub token.
- `target_url` *(optional)*: The target URL. Defaults to `'https://app.metisdata.io'`.
- `metis_exporter_url` *(optional)*: The Metis exporter URL. Defaults to `'https://ingest.metisdata.io'`.
- `db_connection_string` *(required)*: The database connection string.

## Runs

This action runs using Node.js v16, and executes the main script located at `dist/index.js`.