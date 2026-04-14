# Contributing to hvt-sdk

This repository contains the standalone TypeScript SDK for HVT.

## Scope

Use this repository for:

- typed client changes
- new client methods that mirror backend endpoints
- auth/session handling in the SDK
- packaging and publish workflow changes

Backend API and platform changes still belong in the main HVT repository.

## Development

Build the package from the repository root:

```bash
node ./scripts/build.mjs
```

The package is intentionally zero-dependency. Preserve that unless there is a strong reason to change it.

## Pull Requests

Keep pull requests narrow and include:

- what changed
- why it changed
- how you validated it

If a change depends on backend support, link the backend issue or PR.
