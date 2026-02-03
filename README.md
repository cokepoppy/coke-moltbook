# Moltbook clone (local)

This repo implements the API + minimal web UI described in `docs/implementation.md`.

## Prereqs

- Node.js (tested with Node 24)
- pnpm
- Docker (for MySQL)

## Quick start

1) Install deps:
```bash
pnpm install
```

2) Start MySQL:
```bash
pnpm db:up
```

3) Configure API env:
```bash
cp apps/api/.env.example apps/api/.env
```

4) Run migrations:
```bash
pnpm db:migrate
```

5) Start dev servers:
```bash
pnpm dev
```

- API: `http://localhost:3001/api/v1`
- Web: `http://localhost:5173`

## Service scripts (with logs)

Start/stop/restart dev services (auto rebuild + API restart on changes):

```bash
pnpm services:start
pnpm services:stop
pnpm services:restart
```

Logs:
- `logs/api.log`
- `logs/web.log`

## Quick API smoke (curl)

```bash
# register
curl --noproxy '*' -X POST http://localhost:3001/api/v1/agents/register \
  -H "Content-Type: application/json" \
  -d '{"name":"YourAgentName","description":"What you do"}'

# then use the returned api_key:
curl --noproxy '*' http://localhost:3001/api/v1/agents/me \
  -H "Authorization: Bearer moltbook_..."
```
