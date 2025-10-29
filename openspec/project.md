# OpenSpec: AcFunLive HTTP API

## 1. Project Overview

AcFunLive HTTP API is a Node.js library that encapsulates the complex WebSocket-based live streaming protocol of AcFun into a simple and easy-to-use HTTP API and SDK. It helps developers quickly integrate AcFun's live streaming features into their applications.

**Key Features:**
- **Protocol Conversion:** Converts WebSocket protocol to HTTP API and event callbacks.
- **Comprehensive Functionality:** Supports user authentication, real-time chat messages, live stream management, user services, gift system, and room management.
- **Type Safety:** Provides complete TypeScript type definitions.
- **Dual-Mode Support:** Can be used as an SDK in Node.js applications or deployed as a standalone HTTP server.
- **Advanced Session Management:** Includes multi-room monitoring, health checks, auto-reconnect, and performance statistics.

## 2. Tech Stack

| Category          | Technology                               |
| ----------------- | ---------------------------------------- |
| Language          | TypeScript                               |
| Runtime           | Node.js (>=16.0.0)                       |
| HTTP Server       | Express.js                               |
| HTTP Client       | Axios                                    |
| WebSocket         | `ws`                                     |
| Protocol Parsing  | Protobuf.js                              |
| Testing           | Jest, ts-jest                            |
| Linting           | ESLint, @typescript-eslint/parser        |
| Build Tool        | TypeScript Compiler (`tsc`)              |

## 3. Conventions

### 3.1. Coding Style

- **Language:** TypeScript (`strict` mode enabled).
- **Linter:** ESLint with `@typescript-eslint/recommended` configuration.
  - Unused variables are treated as errors.
  - Explicit function return types are encouraged (warning).
  - Usage of `any` type is discouraged (warning).
- **Module System:** CommonJS.
- **File Naming:** PascalCase for services/modules (e.g., `UserService.ts`).

### 3.2. API Development

- **No Mock Data:** All APIs must return real business data. Mock data is strictly forbidden in production code.
- **Testing Environment:** Tests should use a real database or a dedicated test environment with real data.

### 3.3. Testing

- **Framework:** Jest.
- **File Naming:** Test files must end with `.test.ts` (e.g., `UserService.test.ts`).
- **File Location:** All test files are located in the `tests/` directory.
- **Test Execution:** When running tests, only one test case for a single API should be executed at a time, using `it.skip()` to skip others.
- **Test Environment:** All tests must be run directly against the production environment.
- **Output Format:** Test outputs must clearly log request parameters, response status, and response data.

### 3.4. Commits

- Before executing a new command, all current code changes must be committed with a meaningful message describing the changes.

## 4. Project Structure

```
.
├── src/                  # Source code (TypeScript)
├── tests/                # Jest tests
├── dist/                 # Compiled output (JavaScript)
├── protos/               # Protobuf definitions
├── docs/                 # Project documentation
├── .eslintrc.json        # ESLint configuration
├── jest.config.js        # Jest configuration
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project overview
```
