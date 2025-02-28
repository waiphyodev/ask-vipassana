# Decision Log for Ask Vipassana

This document tracks key decisions made during the development of the Ask Vipassana application.

## UI/UX Decisions

### 2025-02-28: UI Enhancement and Refinement

1. **Removed scroll bars and disabled main container scrolling**
   - **Decision**: Implement hidden scrollbars for chat container while preventing page scrolling
   - **Rationale**: Creates a cleaner, more app-like experience with focus on content rather than UI controls
   - **Implementation**: Used CSS classes to hide scrollbars and set overflow properties appropriately

2. **Implemented theme switch toggle**
   - **Decision**: Add a dedicated theme toggle for light/dark mode switching
   - **Rationale**: Enhances user experience by allowing customization of visual experience based on preference or lighting conditions
   - **Implementation**: Used existing theme provider with toggle component in appropriate location

3. **Removed avatar icons and styled messages distinctly**
   - **Decision**: Replace avatar icons with distinct message styling based on role (user/assistant)
   - **Rationale**: Creates a cleaner chat interface while maintaining clear visual distinction between participants
   - **Implementation**: Used different background colors, border styles, and positioning for user vs. assistant messages

4. **Added glow and shine animations**
   - **Decision**: Implement subtle visual effects for message bubbles
   - **Rationale**: Adds polish and visual interest without being distracting, enhancing the premium feel of the application
   - **Implementation**: Created utility functions for generating appropriate CSS classes and animations based on effect intensity

5. **Modified meditation timer**
   - **Decision**: Add sound feedback on completion and integrate timer more seamlessly
   - **Rationale**: Provides auditory notification when timer completes, improving user experience especially during eyes-closed meditation
   - **Implementation**: Used Web Audio API to generate a bell-like sound when timer completes, with user option to enable/disable

6. **Reorganized UI controls**
   - **Decision**: Reposition "Clear Conversation" button to right side below input area and integrate timer button in the UI
   - **Rationale**: Creates a more balanced layout and improves functional organization of controls
   - **Implementation**: Updated layout in chat-container component to place controls in optimal positions

## Technical Decisions

### 2025-01-15: Initial Project Setup

1. **Framework Selection**
   - **Decision**: Use Next.js with TypeScript and Tailwind CSS
   - **Rationale**: Modern, performant stack with strong typing and efficient styling
   - **Implementation**: Created Next.js project with appropriate configuration

### 2025-01-30: Component Library

1. **UI Component Selection**
   - **Decision**: Use shadcn/UI as component library
   - **Rationale**: High-quality, accessible components with excellent customization options
   - **Implementation**: Installed and configured shadcn/UI with project theming

### 2025-02-15: Local Storage Strategy

1. **Persistence Approach**
   - **Decision**: Use browser localStorage for chat history and user preferences
   - **Rationale**: Simple implementation without requiring backend, suitable for MVP
   - **Implementation**: Created utility functions for managing localStorage data
