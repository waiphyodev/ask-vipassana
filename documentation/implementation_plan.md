# Implementation Plan for Ask Vipassana

This plan outlines step-by-step actions based on the PRD, Q&A, and tech stack documents. Each step references the appropriate sections and specifies file locations and actions.

## Phase 1: Environment Setup

1.  **Install Core Tools:**

    *   Verify Node.js is installed; if not, install Node.js v20.2.1 and ensure it is available in the terminal.
    *   **Reference:** PRD Section 5; Tech Stack Document

2.  **Initialize Next.js Project:**

    *   In a new directory (e.g. `ask-vipassana/`), initialize a Next.js 14 project with TypeScript by running the appropriate `npx create-next-app@14 --typescript` command.
    *   **Reference:** Tech Stack Document (Next.js 14 note)

3.  **Set Up Version Control:**

    *   Initialize a Git repository in the project root and create `main` and `dev` branches with branch protection rules.
    *   **Reference:** PRD Section 1

4.  **Install Dependencies:**

    *   Add Tailwind CSS, shadcn/UI components, Framer Motion for animations.
    *   **Validation:** Confirm installation by checking `package.json` for dependencies.
    *   **Reference:** Tech Stack Document

5.  **Configure Environment Variables:**

    *   Create an `.env` file at the project root to store the API token (e.g. `N8N_API_TOKEN`) and the N8N webhook URL (e.g. `N8N_ENDPOINT`).
    *   **Reference:** PRD Section 4, Security & Privacy

## Phase 2: Frontend Development

1.  **Create Global Styles:**

    *   Configure Tailwind CSS in `/styles/globals.css` and import it in the `_app.tsx` (e.g. `/pages/_app.tsx`).
    *   **Reference:** Frontend Guidelines Document

2.  **Design Landing Page:**

    *   Create `/pages/index.tsx` with a minimalist welcome message and a subtle breathing animation using Framer Motion.
    *   **Reference:** PRD Section 3, Design & Prototyping

3.  **Develop Chat Interface Component:**

    *   Create `/components/ChatInterface.tsx` to render the conversation view with an input field and a send button.
    *   Include a display area for messages with gentle fade transitions via Framer Motion.
    *   **Reference:** PRD Sections 3 & 4

4.  **Implement Local Storage for Chat History:**

    *   Within the Chat Interface, add functionality to store the conversation (JSON format) in localStorage.
    *   Include a feature to manually clear chat history and implement an automatic clearing mechanism after seven days of inactivity.
    *   **Reference:** PRD Section 4, Contextual Memory

5.  **Add Source Citation Display:**

    *   In the Chat Interface, allocate space at the end of each message to display source references (titles and authors) when applicable.
    *   **Reference:** PRD Section 4, Source Reference System

6.  **Create Meditation Timer Component:**

    *   Build `/components/MeditationTimer.tsx` with basic start, stop, and a subtle pause function.
    *   Design the component to be unobtrusive, using soft pulse animations for visual feedback.
    *   **Reference:** PRD Section 4 & Q&A (Meditation Timer)

7.  **Integrate Floating Timer Button:**

    *   Add a floating button in the Chat Interface (e.g. in `/components/ChatInterface.tsx`) to toggle the Meditation Timer visibility.
    *   **Reference:** PRD Section 3, UX Flow

## Phase 3: Backend Integration Development

1.  **Create API Service File for Chat Requests:**

    *   In `/services/chatService.ts`, implement a function to send POST requests to the N8N webhook endpoint. Use the request body format:

2.  `{ history: [{ "role": "user", "content": "..." }], "chatInput": "..." }`

    *   Include API token authentication from the environment variable.
    *   **Reference:** PRD Section 4, API Integration

3.  **Implement Exponential Backoff:**

    *   Enhance the API call in `/services/chatService.ts` with error handling that employs exponential backoff on failures and captures errors in logs.
    *   **Reference:** Q&A (Custom Webhook Endpoint)

4.  **Integrate Calming Fallback Message:**

    *   When the API call fails, ensure the Chat Interface displays the fallback message: "I'm sorry, something went wrong in retrieving a wise response. Let's take a moment to breathe and try again.".
    *   **Reference:** Q&A (Error Handling)

5.  **Validate API Integration:**

    *   Test the API service by sending a sample chat request and logging the response in the console.
    *   **Validation:** Use browser developer tools to check for correct API responses and error handling.

## Phase 4: Integration

1.  **Connect Chat Interface to API Service:**

    *   In `/components/ChatInterface.tsx`, import the API function from `/services/chatService.ts` and call it when the user submits a message.
    *   Update the UI with AI-generated responses on success.
    *   **Reference:** PRD Sections 3 & 4

2.  **Bind LocalStorage with Chat Flow:**

    *   Ensure every new message updates the stored chat history into localStorage and that the clear function is properly wired to a UI control.
    *   **Validation:** Test by sending messages and verifying localStorage content in browser dev tools.
    *   **Reference:** PRD Section 4, Privacy-Centric Data Management

3.  **Integrate Floating Timer into Chat Layout:**

    *   Position the Meditation Timer component conditionally so that it appears unobtrusively when the floating button is pressed.
    *   **Reference:** PRD Section 3 & Q&A (Meditation Timer)

4.  **Front-to-Back End-to-UI Synchronization:**

    *   Run end-to-end testing within the local environment to ensure that messages sent from the Chat Interface are processed and responses are displayed with proper animations and source citations.
    *   **Validation:** Simulate API failures to verify fallback messages and retry logic.

## Phase 5: Deployment

1.  **Prepare Build for Production:**

    *   Run `npm run build` (or equivalent) to produce an optimized build of the Next.js application.
    *   **Reference:** PRD Section 6, Non-Functional Requirements

2.  **Select Deployment Platform:**

    *   Deploy the application on a cloud hosting solution (e.g., Vercel for Next.js apps), ensuring appropriate environment variables (like N8N_API_TOKEN and N8N_ENDPOINT) are set in the hosting dashboard.
    *   **Reference:** PRD Section 6, Deployment

3.  **Configure CI/CD Pipeline:**

    *   Set up continuous integration with GitHub Actions (or similar) to run tests on both `main` and `dev` branches and enable automatic deployment on merge to `main`.
    *   **Validation:** Confirm deployment by accessing the production URL and running end-to-end checks.
    *   **Reference:** PRD Section 6

4.  **Final Validation and Testing:**

    *   Perform end-to-end tests to verify functionality including chat flow, meditation timer operations, localStorage handling, and graceful error fallback messages.
    *   **Reference:** Q&A (Pre-Launch Checklist) & PRD Section 7

This plan establishes a clear roadmap to develop and deploy the Ask Vipassana application, ensuring that each task is precisely executed and validated according to the requirements and underlying spiritual philosophy of the project. Enjoy coding mindfully!
