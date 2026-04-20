### Inventory Management

Full-stack application for inventory management, built with Next.js, Prisma, and PostgreSQL.

The system enables users to monitor key inventory metrics, manage products, and track stock levels in real time through an analytical dashboard.

## Features
* Dashboard
* Total inventory value
* Total number of products
* Low stock alerts
* Products
* Add and remove products
* Tabular visualization
* Optimized search with debounce
  
## Authentication
* Email and password authentication
* OAuth login with Google and GitHub
* Implemented using Better Auth
  
## Tech Stack
* Frontend
* Next.js
* React
* TailwindCSS
* shadcn/ui
* Radix UI
* Recharts
  
## Backend
* Next.js (Server Actions / API Routes)
* Prisma ORM
* PostgreSQL
  
## Other
* Better Auth
* React Hook Form
* Zod
* use-debounce
* Lucide React / React Icons

## Installation

* Clone the repository
  
```bash
git clone git@github.com:Rafhael-Augusto/inventory-management.git
```

* Navigate to the project folder

```bash
cd inventory-management
```
* Install dependencies

```bash
npm install
```

## Configuration

* Create a .env file in the root directory:

```bash
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

DATABASE_URL="your-database-url"
```

* Then run:

```bash
npx prisma generate
npx prisma migrate dev
```

* Running the project

```bash
npm run dev
```

* Access the application at:

http://localhost:3000

## Deployment

https://inventory-management-gamma-one-18.vercel.app/
