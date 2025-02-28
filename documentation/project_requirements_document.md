# Project Requirements Document: Ask Vipassana

## 1. Project Overview

Ask Vipassana is a web-based chatbot designed specifically for meditation practitioners seeking authentic Vipassana Buddhist wisdom. The application offers a minimalist, calm conversational interface that provides clear guidance on meditation techniques, Dhamma teachings, and practical spiritual advice without the commercial distractions of mainstream meditation apps. Its teacher-like tone is modeled after traditional Goenka teachings and is intended to spark a sense of peace and directness in every interaction.

This project is built to meet the need for accessible, authentic, and privacy-focused spiritual guidance for both beginners and intermediate practitioners. Key objectives include delivering a distraction-free user experience, preserving user context within a session while guarding privacy by storing data locally, and integrating subtle mindful animations. Success will be measured by the app’s simplicity, user engagement, and its ability to deliver helpful, contemplative guidance seamlessly.

## 2. In-Scope vs. Out-of-Scope

**In-Scope:**

*   A clean, minimalist chat interface that promotes a calm user experience.
*   A teacher-like conversational tone with responses modeled after Goenka teachings.
*   Contextual memory that persists within a single session (stored locally on the client side) with manual and optional automated (after seven days of inactivity) clearing.
*   Integration of a basic meditation timer with start, stop, and a subtle pause option.
*   Subtle, mindful animations (breathing animations for loading, gentle fades for transitions, soft pulses for the timer).
*   A source reference system that cites titles and authors of original texts.
*   Use of a custom webhook endpoint on an N8N server to process chat messages through POST JSON requests.
*   Graceful error handling with calming fallback messages and retry mechanisms with exponential backoff.
*   Privacy-centric design ensuring no long-term tracking or external retention of chat history.

**Out-of-Scope:**

*   Sign-up, registration, or multi-device/cross-browser synchronization beyond basic localStorage.
*   Complex timer functionality such as detailed logging or advanced controls.
*   Commercial features like notifications, badges, gamification elements, or third-party advertisements.
*   Extensive designs or functionality that deviate from the core simplicity and mindfulness (for example, high-contrast or font size adjustments are not planned).
*   Advanced integrations (e.g., immediate multi-language support or integration with additional spiritual content) beyond planning notes for future phases.

## 3. User Flow

When a user first lands on Ask Vipassana, they are greeted by a clean, focused landing screen with a simple, welcoming message that immediately sets a calm tone. There is no need for a sign-up, so users can start interacting with the chat interface right away. The interface suggests a few starter questions (like “How do I start practicing Vipassana?”) to help beginners ease into the conversation. Subtle animations, such as a gentle breathing effect, enhance the initial impression and create a sense of calm.

As the conversation unfolds, the chat interface continues with a thoughtful, teacher-like tone. The dialogue flows naturally with each response displayed using smooth transitions and mindful animations that mirror natural breathing and subtle light effects. The client's session maintains contextual memory to ensure the conversation feels continuous, yet the user has full control to reset if desired. A floating meditation timer offers additional support during practice with basic controls (start, stop, and a subtle pause), ensuring that any interruptions are handled gracefully without taking attention away from the core dialogue.

## 4. Core Features

*   **Minimalist Chat Interface:**\
    A distraction-free, clean layout with generous white space and calm aesthetics that embody the simplicity of Vipassana practice.
*   **Teacher-Like Conversational Experience:**\
    The chatbot delivers spiritual guidance with a tone reminiscent of Goenka teachings—direct yet gentle, combining profound wisdom with accessible language.
*   **Contextual Memory within Session:**\
    The conversation context is stored solely on the client side for the duration of the session. Users can manually clear chat history, and an automatic clearing mechanism is set after a period of inactivity (e.g., seven days).
*   **Subtle Mindful Animations:**\
    Includes breathing animations during loading states, gentle fade transitions between messages, and soft pulse animations for the meditation timer to enhance calmness.
*   **Basic Meditation Timer Integration:**\
    A built-in timer with essential controls (start, stop, and a slight pause functionality) to support the user's meditation practice without unnecessary complexity.
*   **Source Reference System:**\
    When applicable, the chatbot cites the titles and authors of original texts at the end of responses to maintain authenticity without disrupting the flow.
*   **Graceful Error Handling:**\
    The system provides calming fallback messages in case of an unclear AI response or server issue, with retry mechanisms (using exponential backoff) to handle temporary failures efficiently.

## 5. Tech Stack & Tools

*   **Frontend:**

    *   Next.js 14 for the web application framework.
    *   TypeScript for type safety and clarity.
    *   Tailwind CSS for styling with the minimalist and natural design aesthetics.
    *   shadcn/UI for pre-designed UI components that align with the project’s visual simplicity.
    *   Framer Motion to create mindful, natural animations such as breathing, fades, and pulses.

*   **Backend:**

    *   N8N server managing a custom API endpoint that processes chat messages.
    *   The chat messages are sent via POST requests with a JSON payload structured as:\
        { history: [{ "role": "user", "content": "Hey!" }], "chatInput": "How are you?" }\
        An API token (stored in environment variables) is used for authentication.

*   **Data Storage:**

    *   localStorage on the client side is used to maintain the chat history only during the session.

*   **Additional Tools:**

    *   Cursor (an advanced IDE for AI-powered assistance) to streamline development with real-time suggestions.
    *   Plugins or integrations (like Windsurf if needed) can be added later for enhanced coding practices but are not part of the initial release.

## 6. Non-Functional Requirements

*   **Performance:**\
    AI responses should be delivered within a few seconds to maintain a seamless and calm conversational experience. The application must load quickly and run without noticeable lag.
*   **Security & Privacy:**\
    Chat history is stored only on the local device. No sensitive or personal meditation data should be transmitted over the network or stored on external servers. The API token for the N8N endpoint must be managed securely using environment variables.
*   **Usability & Accessibility:**\
    The interface should be intuitive, clear, and minimalist to avoid distractions. Even though no additional accessibility features (like adjustable font size or high contrast mode) are planned for now, the basic design must be clean and focused.
*   **Error Handling & Reliability:**\
    In case of server issues, the system should provide clear, calming error messages and implement retries with exponential backoff. All errors should be logged for future server reliability improvements.

## 7. Constraints & Assumptions

*   **Context Storage:**\
    Contextual memory is restricted to the duration of the session and is stored on the client side using localStorage. It does not persist across different sessions unless manually saved by the user.
*   **API Availability:**\
    The N8N server endpoint must be responsive and the assumption is that it will maintain efficient response times to avoid breaking the seamless user experience.
*   **Simplified Feature Set:**\
    The meditation timer and chat interface are intentionally kept simple to adhere to Vipassana principles. Complex features, multi-device sync, or commercial functionalities are not considered in the initial version.
*   **Environment Variables:**\
    API authentication tokens are assumed to be securely managed via environment variables and should not be exposed in the client-side code.
*   **Design Consistency:**\
    The interface and animation design should strictly follow the principles of mindfulness and minimalism without introducing distractions.

## 8. Known Issues & Potential Pitfalls

*   **API Response Delays:**\
    There is a risk that if the N8N server experiences delays, it could impact the calming experience. Mitigation includes implementing retries with exponential backoff and logging instances for analysis and improvement.
*   **Session Data Handling:**\
    Relying solely on client-side localStorage may lead to issues if the browser limits storage size or if users clear their browser data unexpectedly. Ensuring a clear warning about data loss and providing manual clearing options can help manage user expectations.
*   **Animation Performance:**\
    Although animations are meant to be subtle, if not optimized they might slow down the interface on older devices or browsers. It is important to test the animations across a variety of devices to keep performance smooth.
*   **Error Messaging Consistency:**\
    In cases of unclear AI responses or technical faults, ensuring that fallback messages always maintain the calm tone might require extra attention during testing and quality assurance.
*   **Future Enhancements:**\
    Planned additional features like multi-language support or additional spiritual content integrations (e.g., RAG, knowledge enhancements) should be modularly designed so they do not clutter or complicate the initial minimalist design.

This PRD serves as the main framework for the Ask Vipassana project. Each section is crafted to ensure no detail is left to guesswork, allowing subsequent technical documents—like the Tech Stack Document, Frontend Guidelines, and Backend Structure—to be generated with complete, clear instructions.
