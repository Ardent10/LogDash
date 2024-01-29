## Features

- Ingest logs via HTTP (port 3000).
- Hybrid database (PostgreSQL + MongoDB) for structured data and efficient search.
- Full-text search and filters for log attributes.
- Scalability with database indexing and sharding.
- Distributed system architecture.
- User-friendly Web UI.
- Bonus: Date range search, regex search, multi-filtering, real-time log operations, role-based access.

## Setup

### Backend (Go)

1. Clone: `git clone <repository-url>`
2. Navigate: `cd LogDash`
3. Install: `go mod download`
4. Set env vars: Create `.env` from `.env.example` with MongoDB and PostgreSQL details.
5. Run: `$ CompileDaemon -command="./LogDash"`

### Frontend (React)

1. Navigate: `cd LogDash/frontend`
2. Install: `npm install`
3. Run: `npm start`

## Database

- PostgreSQL: Store logs data (excluding metadata).
- MongoDB: Store metadata.

## Usage

1. Ingest logs: HTTP POST to `http://localhost:3000/ingest-logs` with JSON log data.
2. View logs: `http://localhost:3000/get-logs`.
3. Use Web UI for searches and filters.

## Advanced Features

- **Search Date Ranges:** Filter logs between timestamps.
- **Multi-Filtering:** Apply multiple filters.
- **Real-time Operations:** Real-time log ingestion and searching.

Distributed under the MIT License. See `LICENSE.txt` for more information.
