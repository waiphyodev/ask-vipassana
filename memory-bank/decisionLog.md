# Decision Log for Ask Vipassana

This document tracks key decisions made during the development of the Ask Vipassana application.

## UI/UX Decisions

### 2025-02-28: Critical UI Fixes

1. **Extended textarea height**
   - **Decision**: Increase maximum textarea height from 300px to 400px and add proper padding
   - **Rationale**: Prevents content truncation at the bottom edge, improving user experience when typing longer messages
   - **Implementation**: Modified the useEffect hook in chat-input.tsx to use a larger max height value and added proper padding to the textarea

2. **Repaired theme toggle functionality**
   - **Decision**: Implement a more robust theme toggle mechanism that explicitly overrides system preferences
   - **Rationale**: Ensures reliable theme switching by forcing light/dark mode regardless of system settings
   - **Implementation**:
     - Updated the toggleTheme function to explicitly set themes and store an override flag in localStorage
     - Added a utility class to force refresh the theme
     - Modified ThemeProvider to check for override flag on initialization

3. **Removed gradient effects and fixed chat input positioning**
   - **Decision**: Remove all gradient effects, ensure page height matches viewport exactly, and fix chat input positioning
   - **Rationale**: Gradients were not working properly, page should be constrained to viewport height, and chat input must be fully visible
   - **Implementation**:
     - Completely removed all gradient overlays from chat container
     - Removed gradient-related CSS classes from globals.css
     - Added max-h-screen and overflow-hidden to main container to ensure it doesn't exceed viewport height
     - Applied overflow-hidden to chat page container to prevent scrolling beyond viewport
     - Changed chat input container from sticky to fixed positioning at bottom of screen
     - Added left-0 and right-0 to ensure the input spans the full width
     - Increased bottom padding of content area to 20px to prevent overlap with fixed input
     - Reduced maximum height of textarea from 400px to 200px to prevent it from taking too much space
     - Added max-height CSS class to textarea to ensure consistent behavior

### 2025-02-28: UI Enhancement and Refinement (Update)

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

### 2025-02-28: Additional UI Refinements

7. **Fixed textarea height issue**
   - **Decision**: Increase max height of textarea and ensure content is fully visible
   - **Rationale**: Prevents content from being cut off at the bottom, improving user experience when typing longer messages
   - **Implementation**: Updated textarea height calculations, increased min-height, and added auto-scroll to keep cursor visible

8. **Repaired and relocated theme toggle**
   - **Decision**: Fix non-functioning theme toggle and move it to the header area
   - **Rationale**: Improves accessibility of the theme toggle and fixes functionality issues
   - **Implementation**: Updated to use resolvedTheme instead of theme for more reliable state detection and moved component to header

9. **Updated logo and branding**
   - **Decision**: Reduce logo size, change text to "Ask Teacher", and decrease padding
   - **Rationale**: Creates a more streamlined header with clearer branding aligned with application purpose
   - **Implementation**: Modified image dimensions and updated text in the header component

10. **Added gradient fade effect at container boundaries**
    - **Decision**: Implement gradient fade/blur effect at chat container edges
    - **Rationale**: Provides visual cues about scrollable content and creates a more polished interface with natural transitions
    - **Implementation**: Added gradient overlay divs at top and bottom of the chat container with appropriate z-index

## Technical Decisions

### 2025-02-28: Build Error Fixes

1. **Script Loading Strategy**
   - **Decision**: Add 'defer' attribute to synchronous script in layout.tsx
   - **Rationale**: Prevents blocking page rendering while loading external scripts, following Next.js best practices
   - **Implementation**: Modified the script tag for lordicon.js to include the defer attribute

2. **Code Cleanup**
   - **Decision**: Remove unused imports across multiple components
   - **Rationale**: Improves code quality, reduces bundle size, and eliminates ESLint warnings
   - **Implementation**: Removed unused imports from app/page.tsx, components/chat/chat-container.tsx, and components/chat/chat-message.tsx

3. **React Hook Optimization**
   - **Decision**: Wrap playCompletionSound function in useCallback in meditation-timer.tsx
   - **Rationale**: Prevents unnecessary re-creation of the function on each render and fixes React Hook dependency warning
   - **Implementation**: Imported useCallback and wrapped the function with proper dependencies

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
