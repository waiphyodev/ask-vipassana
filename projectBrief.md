# Project Definition: Ask Vipassana

I want to build a chatbot application for meditation practitioners to access authentic Vipassana Buddhist wisdom through a conversational interface. This tool provides clear guidance on meditation techniques, Dhamma teachings, and practical spiritual advice without the commercialization found in mainstream meditation apps.

## Project Name
"Ask Vipassana"

## Target Audience
- Vipassana meditation practitioners (beginner to intermediate)
- Students of Goenka-tradition Vipassana seeking guidance between retreats
- Spiritual seekers interested in authentic Buddhist teachings
- People looking to establish or deepen a meditation practice based on original teachings

## Core Features
1. **Minimalist chat interface** embodying the simplicity of Vipassana practice
2. **Subtle, mindful animations** that enhance rather than distract from the experience
3. **Teacher-like conversational tone** that balances wisdom with accessibility
4. **Contextual memory** to provide continuity in spiritual guidance
5. **Optional meditation timer** integrated directly within the chat interface
6. **Source reference system** that cites original texts when relevant

## Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/UI, Framer Motion for mindful animations
- **Backend:** N8N server with custom API endpoint (already established)
- **Storage:** Minimal localStorage for chat history (privacy-focused approach)
- **API Integration:** Connect to a custom webhook endpoint for processing chat messages
  - Send POST requests with JSON payload containing user's message
  ```
  body: {history: [{"role": "user", "content": "Hey!"}], "chatInput": "How are you?"}
  ```
  - Uses API token for authentication defined as environment variable
  - Receive AI-generated responses based on Vipassana teachings

## Design Preferences
A pure, distraction-free interface with ample white space representing the clarity of mind that Vipassana cultivates. Subtle animations should mirror meditation concepts:

- Breathing animations for loading states
- Gentle fades for transitions between messages
- Soft pulses for meditation timer
- Natural, earthy color palette (soft whites, warm neutrals, occasional accent inspired by sunrise/sunset)
- Typography emphasizing readability and calm (system fonts or simple serifs)
- No notifications, badges, gamification elements, or commercial features

## Animation Principles
1. **Purposeful:** Each animation should serve the experience, not distract from it
2. **Mindful:** Animations should be slow, deliberate, and calming
3. **Subtle:** Effects should be barely noticeable but emotionally impactful
4. **Natural:** Drawing inspiration from breathing, water ripples, and natural light
5. **Reduced:** Less is more - use animation sparingly for maximum effect

## User Experience Flow
1. User arrives at a clean, focused landing screen with simple welcome message
2. No sign-up required - conversation begins immediately
3. Interface suggests starting questions to help beginners (e.g., "How do I start practicing Vipassana?")
4. Responses appear with gentle transitions, embodying the patient nature of teaching
5. Optional floating timer button for meditation sessions appears unobtrusively
6. Sources are cited subtly at message conclusion when drawing from specific texts

## Ethical Considerations
- Clear disclaimer about AI limitations in spiritual guidance
- No tracking of personal meditation experiences
- No commercialization of Dhamma content
- Option to clear conversation history easily
- Transparency about the nature of the service (AI-assisted, not replacement for human teachers)

## Development Phases
1. **Design & Prototyping:** Create the minimalist interface with animation concepts
2. **Core Chat Implementation:** Connect to N8N endpoint with simple conversation flow
3. **Animation Refinement:** Implement and tune the mindful animations
4. **Timer Feature:** Add the simple meditation timer component
5. **Testing:** Verify with experienced practitioners and teachers
6. **Deployment:** Launch as a simple web application

The essence of this project is to embody the Vipassana principles of simplicity, directness, and non-materialistic approach to spirituality through both content and design.
