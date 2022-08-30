# Doc Serious Game

Base de donnée :

```bash
mongosh

use seriousgame

db.createUser( {user: "SG_USER", pwd: "SG_PASS", roles:[{role: "dbOwner" , db:"seriousgame"}]})
```

.env.local :

```jsx
# Public Environment variables that can be used in the browser.

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_REDIRECT_URI="/api/callback"
NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI="/"
NEXT_PUBLIC_SG_API=http://localhost:3000/api/v1
NEXT_PUBLIC_SG_API_STATIC=http://localhost:3000

# Secret environment variables only available to Node.js
JWT_KEY=C93bUQ!T6iDM

SESSION_PASSWORD="0919aa9ca42b4646f76aa59a8704e76089f53cb266a1190b5c4419cd1bafbf27"

MONGO_PASS="SG_PASS"
MONGO_USER="SG_USER"
MONGO_URI="127.0.0.1:27017/seriousgame"

NEXT_AUTH_URL=http://localhost:3000
```# Doc Serious Game

Base de donnée :

```bash
mongosh

use seriousgame

db.createUser( {user: "SG_USER", pwd: "SG_PASS", roles:[{role: "dbOwner" , db:"seriousgame"}]})
```

.env.local :

```jsx
# Public Environment variables that can be used in the browser.

NEXT_PUBLIC_AUTH0_CLIENT_ID=TEST
NEXT_PUBLIC_AUTH0_SCOPE="openid profile"
NEXT_PUBLIC_AUTH0_DOMAIN="http://example.com"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_REDIRECT_URI="/api/callback"
NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI="/"
NEXT_PUBLIC_SG_API=http://localhost:3000/api/v1
NEXT_PUBLIC_SG_API_STATIC=http://localhost:3000

# Secret environment variables only available to Node.js
JWT_KEY=C93bUQ!T6iDM

SESSION_PASSWORD="0919aa9ca42b4646f76aa59a8704e76089f53cb266a1190b5c4419cd1bafbf27"

MONGO_PASS="SG_PASS"
MONGO_USER="SG_USER"
MONGO_URI="127.0.0.1:27017/seriousgame"

NEXT_AUTH_URL=http://localhost:3000
```

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed
on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited
in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated
as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
