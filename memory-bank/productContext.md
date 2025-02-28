# Ask Vipassana Project Context

## Project Overview
"Ask Vipassana" is a chatbot application designed for meditation practitioners to access authentic Vipassana Buddhist wisdom through a conversational interface. The application provides clear guidance on meditation techniques, Dhamma teachings, and practical spiritual advice without commercialization.

## Purpose of Memory Bank Files
- **productContext.md** (this file): Provides a comprehensive overview of the project, its goals, technical architecture, and design philosophy
- **activeContext.md**: Tracks the current development session context and immediate focus areas
- **progress.md**: Documents project development progress, completed features, and upcoming work
- **decisionLog.md**: Records architectural decisions and their rationales

## Target Audience
- Vipassana meditation practitioners (beginner to intermediate)
- Students of Goenka-tradition Vipassana seeking guidance between retreats
- Spiritual seekers interested in authentic Buddhist teachings
- People looking to establish or deepen a meditation practice based on original teachings

## Technical Architecture
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/UI, Framer Motion for animations
- **Backend**: N8N server with custom API endpoint (already established)
- **Storage**: LocalStorage for chat history (privacy-focused)
- **Analytics**: Self-hosted Plausible analytics (privacy-focused, cookie-free)
- **Deployment**: Web application

## Core Features
1. **Minimalist chat interface** embodying the simplicity of Vipassana practice
2. **Subtle, mindful animations** that enhance rather than distract
3. **Teacher-like conversational tone** balancing wisdom with accessibility
4. **Contextual memory** to provide continuity in spiritual guidance
5. **Optional meditation timer** integrated within the chat interface
6. **Source reference system** that cites original texts when relevant

## Design Philosophy
- Pure, distraction-free interface with ample white space
- Subtle animations mirroring meditation concepts
- Natural, earthy color palette
- Typography emphasizing readability and calm
- No notifications, badges, gamification elements, or commercial features

## Project Structure
- **/app**: Core Next.js application pages and routes
- **/components**: React components organized by feature/purpose
- **/public**: Static assets including images
- **/lib**: Utility functions and shared code
- **/documentation**: Project documentation
## Current Implementation Status
- Landing page with minimalist design and animations
- Basic chat interface with local storage for history
- API integration with N8N webhook
- UI components following the specified design aesthetic
- Responsive design for various device sizes
- First-time user guidance with welcome message and suggested questions
- Meditation timer with breathing animations
- Message management (delete and refresh functionality)
- Visual effects for interactive elements
- Markdown rendering in chat messages for rich text formatting
- Privacy-focused analytics with self-hosted Plausible
- Code quality improvements with fixed ESLint and TypeScript errors
- Successful production build with optimized assets
- Successful production build with optimized assets

## Code Quality Standards
- TypeScript for type safety throughout the application
- ESLint for code quality enforcement
- Proper component typing with React.ComponentProps where appropriate
- Clean code practices with removal of unused components
- Type-safe component interfaces
