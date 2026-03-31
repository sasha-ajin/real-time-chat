# Task Description

Develop a web application for real-time messaging. Optionally, video stories functionality can be added.

## Tech Stack

- Backend: NestJS + TypeScript
- Frontend: SvelteKit + TypeScript(React was allowed)
- Database: MongoDB
- Real-time: Socket.io / WebSocket

## Functional Requirements

### Authentication

- User registration (email, password, username)
- Login (JWT tokens)
- Protected private routes

### Conversations (required)

- List of all user conversations
- Creating a new conversation with another user
- Sending text messages
- Receiving messages in real-time (WebSocket)

### Users

- List of all system users
- Search users by username
- Ability to start a conversation with any user

### Stories (optional, bonus)

- Video recording via webcam (up to 15 seconds)
- Stories feed — list of users with active stories
- Auto-deletion — stories are deleted after 24 hours

## Technical Requirements

### Backend (NestJS)

- REST API for core operations (auth, users, conversations, messages)
- WebSocket gateway for real-time messages
- JWT authentication
- Input data validation
- Basic error handling
- Optional: Stories API, video upload (multipart/form-data)

### Frontend (SvelteKit)

- Svelte stores for state management (auth, messages, conversations)
- WebSocket client for real-time messages
- Handling loading and error states
- Optional: Video recording (MediaRecorder API), video player, recording timer

## Out of Scope

- Group chats (only 1-on-1 conversations)
- Sending files/images in chat
- Editing/deleting messages
- Video filters and effects
- Video processing/conversion on the backend
- Push notifications
- Production deployment
- Complex UI/UX (basic functionality is sufficient)
- Video size optimization (can be uploaded as-is)

## Expected Deliverables

- GitHub repository with source code
- README with setup instructions
- Docker Compose for local deployment (optional, but a bonus)
- A working application that can be run locally

## Success Criteria

### Required:

- Application starts and works
- User can register and log in
- Users can exchange messages in real-time
- Messages arrive via WebSocket without page reload
- Code is structured and readable
- Basic error handling is present

### Bonus:

- Stories functionality implemented (recording, viewing, auto-deletion)
- Docker Compose for quick startup
- Tests (at least basic ones)

## Clarifications

The following points were clarified with the team before starting:

1. **Tech stack:** The task specifies SvelteKit, but using React was confirmed as allowed.
2. **WebSocket authentication:** JWT token must be passed during WebSocket handshake.
3. **User search:** Exact match or substring search by username is acceptable; no need for full-text search engines like Elasticsearch.
4. **UI library:** Using any open-source component library is fine; responsiveness is not a focus.
5. **Lazy loading:** Not required for messages or conversation lists.
6. **Conversation list behavior:** Reordering conversations on new message and read/unread status are not required.
7. **Validation:** No specific constraints on field lengths (username, password, message text). The goal is to demonstrate that validation is working.
