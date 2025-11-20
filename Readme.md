## About Project
## About Project

The project is demonstrate usage of idempotent concept. It covers both backend and frontend codebase.

- Backend - Run `pnpm dev`
- Frontend - Run `npm run dev`

## Backend Features

- Get all customers (Currently its stored in memory so persistent is not achieve. Provision to learn any DB)
- Create customer with basic parameters
- Update customer with all basic fields
- Delete Customer by ID
- Added middleware to handle idempotent concept. Its fetch from Redis Cache if available.

Technologies: Express, Redis, nodemon, cors

## Frontend Features

- Home as landing page
- Page to show all customers added
- View details of the customers and navigate to edit page
- Create customer page
- Edit customer details if any

Technologies: React, Shadcn, tailwindcss
