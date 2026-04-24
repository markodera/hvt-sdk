# HVT TypeScript SDK

Zero-dependency frontend and server SDK for HVT.

This repository contains the standalone TypeScript client for the HVT authentication platform.

- Main app: [hvts.app](https://hvts.app)
- Direct API base URL: [api.hvts.app](https://api.hvts.app)
- Docs: [docs.hvts.app](https://docs.hvts.app)
- Backend API and platform code: [markodera/hvt](https://github.com/markodera/hvt)
- SDK issues: [markodera/hvt-sdk/issues](https://github.com/markodera/hvt-sdk/issues)

## Install

```bash
npm install @hvt/sdk
```

## Local Build

From the repository root:

```powershell
node ./scripts/build.mjs
```

The build copies `src/index.js` and `src/index.d.ts` into `dist/`.

## Control Plane Auth

```ts
import { HVTClient } from "@hvt/sdk";

const client = new HVTClient({
  baseUrl: "http://localhost:8000",
});

const session = await client.auth.login({
  email: "owner@example.com",
  password: "password123",
});

client.setAccessToken(session.access);

const me = await client.auth.me();
const org = await client.organizations.current();
const users = await client.users.list({ page_size: 25 });
```

## Runtime Auth with API Keys

```ts
import { HVTClient } from "@hvt/sdk";

const client = new HVTClient({
  baseUrl: "http://localhost:8000",
  apiKey: "hvt_test_xxx",
});

const providers = await client.auth.listRuntimeSocialProviders();
const github = providers.providers.find((provider) => provider.provider === "github");

if (github) {
  const authorizationUrl = client.auth.buildSocialAuthorizationUrl(github, {
    origin: "http://localhost:3000",
    state: "optional-csrf-state",
  });

  console.log(authorizationUrl);
}

const socialSession = await client.auth.runtimeGithub({
  code: "github-oauth-code",
  callback_url: "http://localhost:3000/auth/github/callback",
  role_slug: "seller",
});

const session = await client.auth.runtimeLogin({
  email: "customer@example.com",
  password: "password123",
});

client.setAccessToken(session.access);

const runtimeUser = await client.auth.runtimeMe();
```

## Development Notes

- `client.auth.me()` and `client.auth.updateMe()` target `/api/v1/auth/me/` for the HVT control plane.
- `client.auth.runtimeMe()` targets `/api/v1/auth/runtime/me/` for API-key-backed integrator apps.
- `provider.authorization_url` from `listSocialProviders()` / `listRuntimeSocialProviders()` is the provider authorization endpoint. Use `client.auth.buildSocialAuthorizationUrl(provider, options)` to build the final browser-ready OAuth URL.
- Runtime social signup can include an optional `role_slug` for a self-assignable project role. Your frontend should persist the selected role through the OAuth redirect and send it with `code` and `callback_url` on the callback request.
- JWT takes priority over `X-API-Key` if both are sent. Do not send both at once.
- Cookie auth is supported. The client defaults to `credentials: "include"`.
- Runtime auth requires the `auth:runtime` scope.
- Failed refreshes clear the in-memory access token and dispatch `auth:logout` by default so apps can react consistently.
- If you are integrating from a language without an SDK, call the HTTP API directly at `https://api.hvts.app`.

## License

AGPL-3.0-only. See [LICENSE](LICENSE).
