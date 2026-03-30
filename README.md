# Real-time Chat Application

A real-time messaging web application built with NestJS, React, MongoDB, and Socket.IO.

## Table of Contents

- [Task Description](#task-description)
- [Local Setup](#local-setup)
- [Technical Decisions](#technical-decisions)

## Task Description

Develop a web application for real-time messaging. Optionally, video stories functionality can be added.

### Tech Stack

- Backend: NestJS + TypeScript
- Frontend: SvelteKit + TypeScript(React was allowed)
- Database: MongoDB
- Real-time: Socket.io / WebSocket

### Functional Requirements

#### Authentication

- User registration (email, password, username)
- Login (JWT tokens)
- Protected private routes

#### Conversations (required)

- List of all user conversations
- Creating a new conversation with another user
- Sending text messages
- Receiving messages in real-time (WebSocket)

#### Users

- List of all system users
- Search users by username
- Ability to start a conversation with any user

#### Stories (optional, bonus)

- Video recording via webcam (up to 15 seconds)
- Stories feed — list of users with active stories
- Auto-deletion — stories are deleted after 24 hours

### Technical Requirements

#### Backend (NestJS)

- REST API for core operations (auth, users, conversations, messages)
- WebSocket gateway for real-time messages
- JWT authentication
- Input data validation
- Basic error handling
- Optional: Stories API, video upload (multipart/form-data)

#### Frontend (SvelteKit)

- Svelte stores for state management (auth, messages, conversations)
- WebSocket client for real-time messages
- Handling loading and error states
- Optional: Video recording (MediaRecorder API), video player, recording timer

### Out of Scope

- Group chats (only 1-on-1 conversations)
- Sending files/images in chat
- Editing/deleting messages
- Video filters and effects
- Video processing/conversion on the backend
- Push notifications
- Production deployment
- Complex UI/UX (basic functionality is sufficient)
- Video size optimization (can be uploaded as-is)

### Expected Deliverables

- GitHub repository with source code
- README with setup instructions
- Docker Compose for local deployment (optional, but a bonus)
- A working application that can be run locally

### Success Criteria

#### Required:

- Application starts and works
- User can register and log in
- Users can exchange messages in real-time
- Messages arrive via WebSocket without page reload
- Code is structured and readable
- Basic error handling is present

#### Bonus:

- Stories functionality implemented (recording, viewing, auto-deletion)
- Docker Compose for quick startup
- Tests (at least basic ones)

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

3. **No internationalization (i18n).** All UI strings are hardcoded in English. Setting up an i18n library with locale files (e.g. `en-US.json`) was not required by the task and would add unnecessary abstraction for a single-language test assignment.

