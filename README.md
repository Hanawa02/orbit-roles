# Orbit Roles (Nuxt)

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Generating DB Types

1. Export the project id:

```bash
export PROJECT_ID="myProjectId"
```

2. Run `npm run codegen`


## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Packages/Stack

- Supabase backend
- nuxt module for supabase
- [x] Tailwind
- [x] Localization
- [ ] Prettier
- [ ] EsLint
- [ ] Storybook (docs + test)


## Features (in order of importance)

- [ ] Manage Roles
  - [ ] Invite/Add people
- [ ] Auto-generate events
- [ ] Events visualization
  - [ ] List
  - [ ] Calendar
- [ ] Sync with Calendar providers
  - [ ] Outlook
  - [ ] Google