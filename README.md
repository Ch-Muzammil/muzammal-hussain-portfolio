# Next Base App

Multi-role Next.js starter (admin / freelancer / client) with App Router, JWT-in-memory auth, Axios + Socket.IO clients, Zustand, and a shadcn/Base UI component kit.

Use this README as the single source of truth for setup, architecture, libs, UI, tests, and security tooling.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) → **Sign in** → pick a demo role → land on that role’s dashboard.

```bash
npm run build && npm start   # production build
npm run test:unit            # Vitest unit tests
npm run test:e2e             # Playwright
npm run lint
```

---

## What this app is for

| Goal | How it’s handled |
|------|------------------|
| Multi-role product | Route groups `(admin)` / `(freelancer)` / `(client)` + shared shells |
| Secure SPA-style auth | Access token in **memory** (Zustand); `app_role` cookie only for edge route guards |
| Talk to a REST API | Axios `apiClient` with Bearer + 401 refresh queue (refresh stubbed) |
| Realtime | Socket.IO singleton under `lib/socket` |
| Consistent UI | shadcn **base-vega** components in `src/components/ui/<Name>/` |
| Forms | React Hook Form + Zod; auth forms in `modules/auth` |
| Safe dependencies | npm overrides + **Snyk** CLI |

Backend is separate — this repo is the frontend base.

---

## Folder map

| Path | Purpose |
|------|---------|
| `src/app/` | Routes only (layouts, pages, loading/error) |
| `src/modules/` | Feature islands + public barrels (`modules/auth`, …) |
| `src/components/ui/` | Shared UI (one folder per component + `index.ts`) |
| `src/components/layout/` | `PublicShell`, `AppShell` |
| `src/lib/` | API, socket, auth helpers, pure utils |
| `src/store/` | Zustand (auth session) |
| `src/config/` | `env`, `roles`, `nav` |
| `src/providers/` | Root client providers (`TooltipProvider`, auth bootstrap) |
| `src/proxy.ts` | Edge route protection (Next proxy, not deprecated middleware) |
| `tests/unit/` | Vitest |
| `tests/e2e/` | Playwright |

**Rules:** `app/` = routing only. Features live in `modules/`. Import UI from `@/components/ui/Button` (folder barrel), never flat `ui/button.tsx` re-exports.

---

## Environment

| Command | Env file (local, gitignored) |
|---------|------------------------------|
| `npm run dev` | `.env.development` |
| `npm run build:staging` / `start:staging` | `.env.staging` |
| `npm run build` / `start` | `.env.production` |

Copy the template once:

```bash
cp env.example .env.development
```

Always read config via:

```ts
import { env } from "@/config/env";

env.apiUrl
env.socketUrl
env.isDev / env.isStaging / env.isProd
```

Do **not** use `process.env` in feature code. Never commit real `.env*` files — only `env.example`.

---

## Roles & navigation

| File | Purpose |
|------|---------|
| `src/config/roles.ts` | Role list, home routes, path prefixes |
| `src/config/nav.ts` | Sidebar + public nav |

```ts
import { getHomeRouteForRole } from "@/config/roles";
getHomeRouteForRole("admin"); // "/admin/dashboard"
```

**Add a role:** update `roles.ts` → `nav.ts` → add `app/(role)/…` routes.

---

## Auth

**Store:** `src/store/auth-store.ts`

- Access token = **memory only**
- `app_role` cookie = for `proxy.ts` only (not the JWT)

```ts
import { useAuthStore } from "@/store/auth-store";

useAuthStore.getState().setSession({ accessToken, user });
useAuthStore.getState().clearSession();
useAuthStore.getState().getAccessToken();
```

Helpers: `src/lib/auth/session.ts`, `src/lib/auth/session-cookie.ts`  
`refreshAccessToken()` is a **stub** until `POST /auth/refresh` exists.

**Proxy (`src/proxy.ts`):**

- `/admin/*`, `/freelancer/*`, `/client/*` need matching `app_role`
- No cookie → `/login?next=…`
- Wrong role → that role’s home
- Logged-in user on `/login` → role home

**Auth module pattern:**

```ts
import { LoginForm, SignupForm, loginRequest } from "@/modules/auth";
```

- **Pages** (`app/(auth)/…`): thin server components — title, footer links, `Suspense` + form
- **Forms** (`modules/auth/components/*-form.tsx`): client — React Hook Form + Zod
- **Schemas** (`modules/auth/schemas/*-schema.ts`): shared Zod schemas / factories
- **API** (`modules/auth/services/…`): mock login today → swap to `apiClient`
- **Public API:** `modules/auth/index.ts` only

Screens: login, signup, forgot-password, reset-password (OTP) — same shell pattern.

---

## Forms (RHF + Zod)

```ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, PasswordField } from "@/components/ui/Input";

// Controls take optional label + error — no manual Label / FieldError wrappers
<Input label="Email" error={errors.email?.message} {...register("email")} />
<PasswordField label="Password" error={errors.password?.message} {...field} />
```

| Piece | Where |
|-------|--------|
| Password policy | `lib/password-validation` (+ live checklist in `PasswordField`) |
| Field chrome | `components/ui/Field` (used by Input / Textarea / pickers / OTP) |
| OTP | `InputOTPField` — `length={4\|6}`, `charset="numeric"\|"alpha"\|"mixed"` |
| Toasts | `toast.success` / `error` / `info` via `@/components/ui/Sonner` |

---

## Libraries (what / why / where)

### Runtime dependencies

| Package | Purpose | Used in |
|---------|---------|---------|
| `next` / `react` / `react-dom` | App Router + UI | `src/app`, components |
| `@base-ui/react` | Headless primitives under shadcn base-vega | Most `components/ui/*` |
| `axios` | HTTP client + interceptors | `lib/api/*` |
| `socket.io-client` | Realtime | `lib/socket/*` |
| `zustand` | Client session store | `store/auth-store.ts` |
| `react-hook-form` | Form state | Auth forms, future forms |
| `zod` | Schema validation | `modules/auth/schemas/*` |
| `@hookform/resolvers` | Zod ↔ RHF bridge | Auth forms |
| `sonner` | Toasts | `@/components/ui/Sonner` + API errors |
| `class-variance-authority` | Variant APIs (`buttonVariants`, …) | `components/ui/*/variants.ts` |
| `clsx` + `tailwind-merge` | `cn()` class merging | `lib/utils.ts` |
| `lucide-react` | Icons | UI everywhere |
| `date-fns` + `react-day-picker` | Dates / calendar | `DatePicker`, `Calendar` |
| `input-otp` | OTP input | `InputOtp` |
| `tw-animate-css` | Enter/exit animations | `globals.css` |
| `shadcn` (dev) | CLI to pull components | not imported at runtime |

### App libs (`src/lib`)

| Module | Purpose |
|--------|---------|
| `lib/utils.ts` | `cn()` — Tailwind class merge |
| `lib/api/api-client.ts` | Shared Axios instance export |
| `lib/api/axios-instance.ts` | Bearer, credentials, 401 refresh queue |
| `lib/api/api-error.ts` | `ApiError` shape for services |
| `lib/socket/socket-instance.ts` | `connectSocket` / `disconnectSocket` / `getSocket` |
| `lib/socket/socket-events.ts` | Typed event names (fill as you add features) |
| `lib/auth/session.ts` | Refresh stub + session expired handler |
| `lib/auth/session-cookie.ts` | `app_role` cookie set/clear |
| `lib/format-date.ts` | Local date/time formatting |
| `lib/format-number.ts` | Number / currency |
| `lib/format-relative-time.ts` | “2 hours ago” |
| `lib/debounce.ts` / `throttle.ts` / `sleep.ts` | Timing helpers |
| `lib/clamp.ts` | Min/max clamp |
| `lib/copy-to-clipboard.ts` | Clipboard helper |
| `lib/password-validation.ts` | Shared password rules / `validatePassword` / `isPasswordValid` |

### REST usage

```ts
import { apiClient } from "@/lib/api/api-client";

export async function getProjects() {
  const { data } = await apiClient.get("/projects");
  return data;
}
```

Flow: **page → module hook → module service → apiClient → backend**

### Socket usage

```ts
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket/socket-instance";

connectSocket();      // after login
disconnectSocket();   // on logout
```



---

## UI components

Import from the **folder barrel**:

```ts
import { Button } from "@/components/ui/Button"
import { DataTable } from "@/components/ui/Table"
import { DatePicker, DateTimePicker } from "@/components/ui/DatePicker"
```

Layout:

```
components/ui/Button/
  button.tsx      # component
  variants.ts     # CVA styles (export stays buttonVariants)
  index.ts        # public exports
```

### Component catalog

| Folder | What it is |
|--------|------------|
| `Button` | Enhanced button: variants, icons, `loading`, async click guard |
| `Input` / `PasswordField` / `Label` / `Textarea` | Form controls (`label` + `error` props) |
| `Field` | Shared label/error chrome for custom controls |
| `Select` / `Combobox` | Select vs searchable combobox |
| `InputGroup` / `InputOtp` | Grouped inputs + **`InputOTPField`** (`length`, `charset`) |
| `Checkbox` / `Switch` / `Separator` | Form / layout primitives |
| `Tooltip` | `SimpleTooltip` + `side` (`top` default) |
| `Spinner` / `Skeleton` | Loaders; `Loader` variants: `spinner` \| `skeleton` \| `dots` |
| `Table` | Primitives + production **`DataTable`** (sort, widths, sticky, responsive hide, loading) |
| `Pagination` | Primitives + **`DataPagination`** |
| `Empty` | Empty + **`EmptyState`** |
| `Avatar` | Avatar + **`UserAvatar`** |
| `Header` | **`AppHeader`** (title / actions / sticky) |
| `Dialog` | Dialog + **`Modal`** helper |
| `AlertDialog` | Alert + **`ConfirmDialog`** |
| `Drawer` / `Sheet` | Overlays |
| `Sidebar` | Full shadcn sidebar (used by `AppShell`) |
| `Popover` / `Calendar` | Building blocks for date pickers |
| `DatePicker` | **`DatePicker`** (single/range/presets) + **`DateTimePicker`** |
| `Sonner` | App **`Toaster`** (rich colors, close inside toast) |

Shells:

- Public: `components/layout/public-shell.tsx`
- Authenticated roles: `components/layout/app-shell.tsx` (Sidebar + header bar)
- Providers: `providers/app-providers.tsx`

### Adding a shadcn component

CLI writes flat `ui/<name>.tsx`. Our layout is nested folders:

1. `npx shadcn add <name> -y` (decline overwriting Button/Input/…)
2. Move into `src/components/ui/ComponentName/`
3. Split styles to `variants.ts` if useful
4. Add `index.ts` barrel
5. Fix imports to `@/components/ui/Other` barrels

Optional: `npx shadcn add drawer -y -p src/components/ui/Drawer` then still add `index.ts`.

---

## Scripts

| Script | What it does |
|--------|----------------|
| `npm run dev` | Dev server (Turbopack, port **3001**) |
| `npm run dev:staging` / `dev:production` | Dev with that env file |
| `npm run build` / `build:staging` | Production build |
| `npm start` / `start:staging` | Serve build |
| `npm run lint` | ESLint |
| `npm run test:unit` | Vitest once |
| `npm run test:unit:watch` | Vitest watch |
| `npm run test:e2e` | Playwright |
| `npm run test:all` | Unit + e2e |
| `npm run fix:cursor-tunnel` | One-time Admin fix for Cursor Ports (`code-tunnel.exe` ENOENT) |
| `npm run snyk` | Snyk dependency scan |
| `npm run snyk:code` | Snyk Code (SAST) |
| `npm run snyk:monitor` | Snapshot project on Snyk dashboard |

---

## Testing

- Unit: `tests/unit/**` (Vitest + Testing Library + jsdom)
- Setup: `tests/setup/vitest.setup.ts` (jest-dom matchers + cleanup)
- Types: `tests/vitest-env.d.ts`

```bash
npm run test:unit
```

Covered areas include utils (`cn`, clamp, formatters, debounce/throttle, ApiError, cookies, password validation), config (roles/nav/env), and UI (Button, DataTable, Pagination, Input/PasswordField, Modal, etc.).

---

## Security: Snyk

Snyk scans dependencies and source for known issues. The CLI is a **devDependency**.

### 1. Create a token

1. Sign up / log in at [https://app.snyk.io](https://app.snyk.io)
2. **Account settings → General → Auth token** (or **Personal API Token**)
3. Create / copy the token (treat it like a password — never commit it)

### 2. Authenticate (pick one)

**Interactive (local):**

```bash
npx snyk auth
```

Opens the browser and links the CLI to your account.

**CI / token env (recommended for pipelines):**

```bash
# Windows PowerShell
$env:SNYK_TOKEN="your-token-here"

# macOS / Linux
export SNYK_TOKEN="your-token-here"
```

Or add to a **local-only** `.env` that is gitignored (do not put the token in committed env files).

### 3. Run scans

```bash
npm run snyk           # open-source dependency vulnerabilities
npm run snyk:code      # static code analysis
npm run snyk:monitor   # upload snapshot to Snyk UI for ongoing monitoring
```

First `snyk test` / `snyk code test` may ask you to confirm org / enable Snyk Code in the dashboard.

### 4. Interpret results

- **High/Critical** → fix or upgrade before shipping
- Use `snyk ignore` only with a tracked reason and expiry
- Prefer fixing in `package.json` / `overrides` over ignoring

This repo already uses npm `overrides` for known transitive issues (e.g. `postcss`, `sharp`, `minimatch`). Keep `npm audit` and `npm run snyk` both green when you can.

---

## Stack snapshot

- **Next.js 16** App Router · **React 19** · **Tailwind CSS v4**
- **shadcn** style `base-vega` · **Base UI** primitives
- **Zustand** · **React Hook Form** · **Zod** · **Axios** · **Socket.IO**
- **Vitest** · **Playwright** · **Snyk** · **Husky**
- **Sonner** toasts

---

## Learn more

- [Next.js docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Snyk CLI docs](https://docs.snyk.io/snyk-cli)
