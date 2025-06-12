# User Management API

A simple Node.js API for managing users, built with Express and Object-Oriented Programming principles. Features full test coverage with Jest, Supertest for integration testing, and Stryker for mutation testing.

---

## 📑 Table of Contents

- Project Overview
- Prerequisites
- Project Structure
- Installation
- Running the API
- Running Tests
- Mutation Testing with Stryker
- API Usage
- Troubleshooting

---

## 🌟 Project Overview

This project is a **CRUD (Create, Read, Update, Delete)** API for user management, built with:

- **Node.js** and **Express** for the server.
- **Jest** and **Supertest** for unit and integration testing.
- **Stryker** for mutation testing to ensure robust test coverage.

The API follows an OOP structure with separated concerns (controllers, services, repositories, etc.) for maintainability and scalability.

---

## 🛠 Prerequisites

Before running the project, ensure you have:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- A code editor (e.g., VSCode)
- Optional: A tool like **Postman** or **cURL** for testing API endpoints

---

## 📂 Project Structure

```plaintext
src/
├── controllers/    # Request handling logic
├── models/         # Data models
├── repositories/   # Data access layer
├── routes/         # API routes
├── services/       # Business logic
tests/              # Jest test files
├── *.test.js
```

---

## 📥 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AugustoBuin/mutation-test.git
   cd mutation-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## 🚀 Running the API

Start the server:

```bash
npm start
```

The API will be available at: http://localhost:3000/users

> **Note**: Ensure the `/users` endpoint is correctly configured in your routes.

---

## ✅ Running Tests

Run tests with **Jest** and **Supertest**:

```bash
npm test
```

Or directly:

```bash
npx jest
```

---

## 🧬 Mutation Testing with Stryker

Mutation testing ensures your tests are robust by introducing small code changes ("mutants") and checking if your tests catch them.

### Run mutation tests:

```bash
npm run stryker
```

Or directly:

```bash
npx styker run
```

---

### View the mutation report:

Open the generated HTML report:

```bash
open reports/mutation/mutation.html
```

Or navigate to:

```
file:///absolute-path-to-your-project/reports/mutation/mutation.html
```

### Mutation Testing Explained

| Term               | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| **Mutant**         | A small code change (e.g., `a > b` to `a >= b`).                |
| **Killed**         | A mutant is detected by a failing test.                         |
| **Survived**       | A mutant goes undetected, indicating weak test coverage.        |
| **Mutation Score** | Percentage of mutants killed (aim for \~100% for robust tests). |

**Example**:

```javascript
// Original
if (user.age > 18) { ... }

// Mutant
if (user.age >= 18) { ... }
```

If tests fail on the mutant, it's **killed**. If they pass, it **survives**.

---

## 📡 API Usage

### Endpoints

> All routes are registered under `/users`

- **POST /users**: Create a new user
- **GET /users/:id**: Retrieve a user by ID
- **PUT /users/:id**: Update a user by ID
- **DELETE /users/:id**: Delete a user by ID
- **PATCH /users/:id/deactivate**: Deactivate a user (sets `ativo = false`)

### 🧪 Example: Create a User

```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{ id: '1', nome: 'Ana', nivelAcesso: 'admin', cpf: '12345678900', senha: 'senha123' }'
```

### 📄 Example: Get a User by ID

```bash
curl http://localhost:3000/users/1
```

### 🛠️ Example: Update a User

```bash
curl -X PUT http://localhost:3000/users/1 \
-H "Content-Type: application/json" \
-d '{ "nome": "Ana Maria" }'
```

### ❌ Example: Delete a User

```bash
curl -X DELETE http://localhost:3000/users/1
```

### 🚫 Example: Deactivate a User

```bash
curl -X PATCH http://localhost:3000/users/1/deactivate
```

---

## 🛠 Troubleshooting

- **Port Conflict**: If `localhost:3000` is in use, change the port in `src/server.js`.
- **Tests Failing**: Ensure dependencies are installed (`npm install`) and check test logs for details.
- **Stryker Errors**: Verify Stryker is installed (`npm install @stryker-mutator/core`) and your Jest tests pass.

---
