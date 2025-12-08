# Idempotency Demo Project

This project demonstrates a complete, end-to-end implementation of **idempotent request handling**, showcasing how both backend and frontend layers can work together to ensure safe, repeatable operations. It is designed as a learning resource for developers exploring idempotent API design, caching strategies, and foundational CRUD workflows.

---

## 🚀 Getting Started

### Backend
```bash
pnpm dev

Backend Overview

The backend provides a lightweight customer management service with idempotency support. All customer data is currently stored in memory, making the system simple and easy to extend with any database of choice.

🔧 Features

Fetch All Customers
Returns a list of customers stored in memory. (Can be adapted to use any database.)

Create Customer
Creates a new customer with basic fields.

Update Customer
Updates all editable fields of a customer.

Delete Customer
Deletes a customer using a unique ID.

Idempotency Middleware
Incoming requests are checked against Redis Cache.
If a response exists for the same idempotency key, the cached response is returned—avoiding duplicate processing.

🛠 Technologies
Express.js
Redis
nodemon
cors

Frontend Overview

The frontend is a minimal UI built to interact with the backend API and demonstrate how client applications can work with idempotent backend flows.

🎨 Features

Landing Page
A simple home interface.

Customer Listing Page
Displays all stored customers with navigation options.

Customer Details View
View individual customer information and navigate to edit.

Create Customer Page
Add new customer records.

Edit Customer Page
Update existing customer details.

📘 Purpose of the Project

This codebase is designed for developers who want to:
Understand how idempotency works in real applications
Learn how to integrate Redis caching for idempotent APIs
Explore full-stack CRUD workflows
Practice designing resilient backend operations
Build clean React interfaces that interact with an API

🌐 Technologies
React
shadcn/ui
Tailwind CSS
