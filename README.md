# Real-time Chat Application

The task took 10-12 hours spread across 8 days between other work tasks.

- **Mar 19 (~0.5h)** — Project initialization (React, NestJS). Atomic Design structure setup. SignIn/SignUp forms with Formik + Yup.
- **Mar 20 (~1.5h)** — Backend authentication: JWT, bcrypt, Mongoose, validation. Logout with token blacklist. ConfigModule, duplicate username/email handling.
- **Mar 21 (~0.5h)** — Redux Toolkit for auth state, localStorage token persistence. Navbar, PrivateRoute, 404 page.
- **Mar 22 (~0.5h)** — Logout in navigation, hiding private links. Circular dependency resolution (forwardRef) in NestJS, user search endpoint.
- **Mar 28 (~0.5h)** — Refactoring nickname → userName. Navigation after sign-in/sign-up, user search UI, improved backend error handling in forms.
- **Mar 29 (~6h)** — Core feature: thread list, WebSocket chat (send/receive messages), thread creation/upsert. Regex escaping, CORS, MongooseExceptionFilter. README: task description, technical decisions.
- **Mar 30 (~1h)** — Cleanup: removing unused code, env file configuration, user creation refactoring, all-users list implementation.
- **Mar 31 (~1h)** — UI refactoring (NarrowColumnTemplate), async in ChatGateway, extracting validation constants, message maxLength, README updates (JWT/localStorage).

## Table of Contents

- [Task Description](#task-description)
- [Local Setup](#local-setup)
- [Technical Decisions](#technical-decisions)

## Task Description

See [TASK.md](TASK.md) for the full task description, requirements, and success criteria.

### Clarifications

The following points were clarified with the team before starting:

1. **Tech stack:** The task specifies SvelteKit, but using React was confirmed as allowed.
2. **WebSocket authentication:** JWT token must be passed during WebSocket handshake.
3. **User search:** Exact match or substring search by username is acceptable; no need for full-text search engines like Elasticsearch.
4. **UI library:** Using any open-source component library is fine; responsiveness is not a focus.
5. **Lazy loading:** Not required for messages or conversation lists.
6. **Conversation list behavior:** Reordering conversations on new message and read/unread status are not required.
7. **Validation:** No specific constraints on field lengths (username, password, message text). The goal is to demonstrate that validation is working.

## Local Setup

### Clone the Repository

```bash
git clone git@github.com:sasha-ajin/real-time-chat.git
cd real-time-chat
```

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) 20+ and npm

### Backend

The backend (NestJS + MongoDB) runs entirely in Docker:

```bash
cd server
cp .env.example .env.development.local
docker-compose up --build
```

This starts:
- **MongoDB** on port `27017`
- **NestJS server** on port `3001`

To stop the services:

```bash
docker-compose down
```

### Frontend

The frontend (React) runs outside Docker:

```bash
cd client
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

## Technical Decisions

### Backend

1. **No refresh/reset tokens.** The task only requires JWT authentication and does not mention token rotation. For a test assignment, a single access token is sufficient — adding refresh tokens would introduce extra complexity (httpOnly cookies, a refresh endpoint, client-side token rotation logic) without meaningful benefit in this context. The sign-out flow uses an in-memory token blacklist (`Set<string>`) — this works for a single-server setup but does not survive server restarts. In production, this would be replaced with Redis or a database-backed store, but for a test assignment running on a single instance it is a reasonable trade-off.

2. **Persistent WebSocket connection.** A single WebSocket connection is established at login and stays alive for the entire session. The client joins and leaves chat rooms via socket events (`joinThread` / `leaveThread`) instead of opening a new connection each time a chat is opened. Creating a new connection per chat would only make sense in an application where chat is a secondary feature and users rarely enter it — in a chat-first application, a persistent connection avoids repeated handshake and JWT verification overhead.

3. **No transaction for message creation and thread last message update.** When a message is sent, two separate operations run sequentially: creating the message and updating the thread's `lastMessage` field. Under concurrent writes, the `lastMessage` on a thread could briefly show a non-latest message. A MongoDB transaction would guarantee atomicity but would add a performance cost on every message send. Since this is not a financial or order-critical operation, the trade-off is acceptable — the message itself is always saved correctly, and users see the correct message history when they open the chat. The `lastMessage` preview in the thread list is eventually consistent.

### Frontend

1. **Atomic Design for component architecture.** Components are organized into atoms, molecules, organisms, and templates following the [Atomic Design methodology](https://medium.com/@abdulnasirolcan/mastering-modular-architecture-with-react-and-atomic-design-advanced-techniques-and-hands-on-93e649654a06) (explore hyperlink). Feature-Sliced Design (FSD) was considered but felt like overkill for a project with a small number of components. I wanted to choose architecture, which would enforce me to write minimal, single-responsibility components, which was a priority — FSD is better suited for larger applications where cross-feature isolation matters more than component granularity.

2. **Formik over React Hook Form.** The application has simple forms (sign in, sign up, search, message input) with no complex validation scenarios like phone numbers or multi-step wizards, so Zod + React Hook Form was unnecessary. Formik was chosen for its straightforward controlled-component model — form values, errors, touched state, and submission logic all live in one explicit React state, making the forms easy to read and debug. Its API surface is compact (`Formik`, `Form`, `Field`, `ErrorMessage`, `useFormikContext`) compared to RHF's split between `register`, `Controller`, `watch`, `setValue`, and `formState`, which adds cognitive overhead for simple CRUD forms.

3. **JWT stored in `localStorage`.** The access token is kept in `localStorage` so it survives page refreshes and is available to the Axios interceptor and the WebSocket handshake without extra plumbing. `localStorage` is accessible to any JavaScript on the page, which means a successful XSS attack could steal the token. In a production application, the token would be stored in an `httpOnly` cookie (inaccessible to JS) and the API would rely on cookie-based authentication with CSRF protection — but that requires backend cooperation (setting `Set-Cookie` headers, CORS credentials, CSRF tokens) that adds significant complexity. For a single-page test assignment with no third-party scripts and no user-generated HTML, `localStorage` is a pragmatic choice that keeps the auth flow simple.

