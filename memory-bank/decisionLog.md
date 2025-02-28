# Architectural Decision Log: Ask Vipassana

This document chronicles key architectural decisions made during the development of the Ask Vipassana project, providing context, rationale, and implications for each decision.

## 1. Frontend Framework Selection
- **Date**: Project initiation
- **Context**: Need for a modern, performant web application framework
- **Decision**: Adopted Next.js 14 with TypeScript
- **Rationale**:
  - Server-side rendering capabilities for improved performance
  - TypeScript for type safety and improved developer experience
  - Built-in routing and API route support
  - Strong community support and documentation
- **Implications**:
  - Development follows Next.js conventions and patterns
  - TypeScript enforces stronger typing throughout the codebase

## 2. Styling Approach
- **Date**: Project initiation
- **Context**: Need for consistent, maintainable styling system
- **Decision**: Adopted Tailwind CSS with shadcn/UI component library
- **Rationale**:
  - Utility-first approach reduces CSS bloat
  - Design system consistency through shadcn/UI
  - Highly customizable to match the minimalist design aesthetic
- **Implications**:
  - Component styling follows Tailwind's utility class pattern
  - UI maintains consistency through the shadcn/UI system

## 3. Animation System
- **Date**: Project initiation
- **Context**: Need for subtle, mindful animations that enhance user experience
- **Decision**: Implemented Framer Motion for animations
- **Rationale**:
  - Declarative API for complex animations
  - Performance optimizations built in
  - Support for gesture-based interactions
  - Ability to create custom animation components
- **Implications**:
  - Animation patterns established through reusable components
  - Performance considerations for animation rendering

## 4. State Management
- **Date**: Project initiation
- **Context**: Need for storing user conversation history
- **Decision**: Used React useState with localStorage persistence
- **Rationale**:
  - Lightweight solution appropriate for the application's needs
  - Privacy-focused approach keeping data on client
  - No need for complex state management libraries
- **Implications**:
  - Chat history persists across browser sessions
  - Limited by localStorage capacity (~5MB)
  - Private by design - data stays on user's device

## 5. Backend Integration
- **Date**: Project initiation
- **Context**: Need for processing conversation messages through AI
- **Decision**: Integrated with N8N webhook endpoint
- **Rationale**:
  - Leverages existing N8N server infrastructure
  - Simplifies backend requirements
  - Allows for future workflow modifications without frontend changes
- **Implications**:
  - Frontend remains focused on UI/UX
  - API integration limited to simple POST requests

## 6. Authentication Strategy
- **Date**: Project initiation
- **Context**: Whether to implement user authentication
- **Decision**: No authentication system implemented
- **Rationale**:
  - Aligns with simplicity principle
  - Reduces barriers to using the application
  - Privacy concerns minimized by not collecting user data
- **Implications**:
  - All users have the same experience
  - No personalization based on user identity
  - Reduced complexity in implementation

## 7. First-Time User Guidance Implementation
- **Date**: 28/02/2025
- **Context**: Need to provide guidance for new users
- **Decision**: Implemented welcome message and suggested questions for first-time visitors
- **Rationale**:
  - Helps users understand the purpose of the application
  - Provides starting points for conversation
  - Creates a more welcoming experience
- **Implications**:
  - First-time visit detection using localStorage
  - Conditional rendering of guidance components
  - Improved user experience for newcomers

## 8. Meditation Timer Implementation
- **Date**: 28/02/2025
- **Context**: Need for a meditation timer feature
- **Decision**: Created a floating button with modal timer component
- **Rationale**:
  - Unobtrusive access to timer functionality
  - Visual breathing animation reinforces meditation concept
  - Customizable duration options
- **Implications**:
  - Timer preferences stored in localStorage
  - Visual progress indicator using SVG circle
  - Floating button positioned for easy access without disrupting chat flow

## 9. Automatic Conversation Clearing
- **Date**: 28/02/2025
- **Context**: Need for privacy-focused data management
- **Decision**: Implemented automatic clearing of chat history after 7 days of inactivity
- **Rationale**:
  - Enhances privacy by not keeping conversations indefinitely
  - Aligns with minimalist philosophy of the application
  - Provides fresh experience for returning users after long absence
- **Implications**:
  - Timestamp tracking for last activity
  - Check on application load for inactivity period
  - Manual clearing option still available for immediate control

## 10. Message Management Implementation
- **Date**: 28/02/2025
- **Context**: Need for more control over conversation history
- **Decision**: Implemented message deletion and conversation refresh functionality
- **Rationale**:
  - Gives users more control over their conversation
  - Allows for correcting or removing unwanted messages
  - Enables restarting conversation from a specific point
  - Enhances user experience with more interactive options
- **Implications**:
  - Added delete functionality for both user and assistant messages
  - Added refresh functionality for user messages
  - Updated UI to show these controls on hover
  - Enhanced state management to handle message operations
## 11. Visual Effects System
- **Date**: 28/02/2025
- **Context**: Need for enhanced interactive elements
- **Decision**: Created a visual effects utility with configurable intensity
- **Rationale**:
  - Provides consistent visual feedback across interactive elements
  - Enhances user experience with subtle animations
  - Configurable intensity allows for future user preferences
  - Centralizes effect definitions for easier maintenance
- **Implications**:
  - Created utility functions for hover and click effects
  - Applied effects to buttons and interactive elements
  - Implemented intensity control for future user customization
  - Enhanced UI responsiveness with visual feedback

## 12. Markdown Rendering Implementation
- **Date**: 28/02/2025
- **Context**: Need for rich text formatting in chat messages
- **Decision**: Implemented markdown rendering using react-markdown and remark-gfm
- **Rationale**:
  - Enhances readability of complex information
  - Allows for better structured responses with headers, lists, code blocks, etc.
  - Improves the presentation of Dhamma teachings with proper formatting
  - Provides a more engaging and professional user experience
- **Implications**:
  - Added react-markdown and remark-gfm dependencies
  - Configured Tailwind typography plugin for styling markdown content
  - Updated ChatMessage component to render markdown instead of plain text
  - Enhanced styling to ensure consistent appearance of markdown elements

## Pending Decisions
## Pending Decisions

### Source Reference System
- **Context**: Need to implement citations for original texts
- **Options**:
  1. Inline citations with hover details
  2. Footnote-style references at message end
  3. Expandable reference sections
- **Considerations**: User experience, readability, technical implementation

### Enhanced Error Handling
- **Context**: Need for mindful error messaging
- **Options**:
  1. Calming messages with meditation prompts
  2. Automatic retry with exponential backoff
  3. Offline mode with cached responses
- **Considerations**: User experience during connectivity issues, technical implementation
