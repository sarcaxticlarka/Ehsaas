📱 Mental Wellness & Mood Tracking App (Ehsaas → feelings, awareness)

Detailed Project Documentation

1. 📌 Project Overview
The Mental Wellness & Mood Tracking App is a mobile application designed to help users monitor, understand, and improve their emotional well-being. The application enables users to log their daily moods, write reflections, analyze emotional trends, and access curated mental wellness content.
The system is built with a scalable and modular architecture, ensuring that future features can be added without major structural changes.

2. 🎯 Problem Statement
In today’s fast-paced environment, individuals often neglect their mental health. There is a lack of simple, accessible tools that allow users to:
Track emotional patterns
Reflect on daily experiences
Gain insights into mental well-being
This application addresses these issues by providing a structured and user-friendly emotional tracking system.

3. 🎯 Objectives
To provide a platform for daily mood tracking
To enable users to reflect on their emotions
To analyze mood trends over time
To promote mental well-being through insights and content
To design a scalable and extensible system

4. 👥 Target Audience
Students managing academic stress
Working professionals dealing with workload
Individuals focused on self-improvement
Users interested in mental wellness tracking

5. 📱 Key Features
5.1 Core Features (MVP)
1. User Authentication
Secure login and registration system
Email-based authentication
2. User Profile Management
Profile creation and editing
Profile picture upload
Personal details storage
3. Daily Mood Tracking
Selection of mood (e.g., Happy, Sad, Calm, Angry, Stressed)
Optional intensity level
Daily logging system
4. Reflection Journal
Text-based journaling feature
Stored alongside mood entries
5. Mood History
Chronological list of past entries
Easy access to previous logs
6. Basic Analytics
Weekly and monthly summaries
Mood distribution visualization

5.2 Advanced Features (Future Scope)
AI-based emotional insights
Personalized recommendations
Daily reminders and notifications
Streak tracking system
Meditation and breathing exercises
Social interaction features



6. 🔁 Application Workflow
User launches the application
User logs in or registers
User accesses the home screen
User selects mood and adds reflection
Data is stored in the database
User views analytics and history
User explores mental wellness content
User manages profile and settings

7. 🧱 System Architecture
7.1 Frontend
Mobile application interface
Handles user interaction and UI rendering
7.2 Backend
Manages business logic
Handles API requests
Processes and stores data
7.3 Database
Stores user data, mood entries, and system information
Designed for scalability and flexibility

8. 🗄️ Database Design
The database follows a modular and normalized structure to ensure scalability and maintainability.

8.1 Entities Overview
User
Profile
MoodEntry
Streak
Settings
ActivityLog
Content
UserContentInteraction

8.2 Entity Relationships
One User has one Profile
One User has many Mood Entries
One User has one Settings record
One User has one Streak record
One User has many Activity Logs
Users interact with multiple Content items

8.3 Entity Descriptions
User
Stores authentication-related information such as email, password, and account status.
Profile
Stores personal details including name, profile picture, bio, and preferences.
MoodEntry
Stores daily mood data along with reflection and timestamps.
Streak
Tracks user consistency and engagement over time.
Settings
Stores user-specific preferences such as notifications and privacy.
ActivityLog
Records user actions for analytics and tracking purposes.
Content
Stores mental wellness resources such as articles and videos.
UserContentInteraction
Tracks user engagement with content (views, likes, bookmarks).
Dark mode and UI customization

9. 🧩 Functional Modules
9.1 Authentication Module
Handles user registration, login, and session management.
9.2 Profile Module
Manages user information and profile customization.
9.3 Mood Tracking Module
Allows users to log daily emotions and reflections.
9.4 Analytics Module
Processes mood data to generate insights and summaries.
9.5 Content Module
Displays mental health resources and educational material.
9.6 Settings Module
Manages user preferences and application behavior.
9.7 Activity Tracking Module
Logs user actions for monitoring and future analysis.

10. 🎨 UI/UX Design Principles
Minimalistic and clean interface
Use of soft and calming color palettes
Consistent spacing and typography
Intuitive navigation
Emotion-focused design elements

11. ⚙️ Non-Functional Requirements
Performance: Fast and responsive UI
Scalability: Support for large user base
Security: Secure user data handling
Reliability: Stable and consistent operation
Usability: Easy to use for all user types

12. 🚀 Development Methodology
The project follows an iterative development approach:
Phase 1: Core functionality (MVP)
Phase 2: Feature enhancement
Phase 3: Optimization and scaling

13. ⚠️ Challenges and Solutions
Challenge
Solution
Data scalability
Modular database design
UI complexity
Minimal design approach
User engagement
Streak and reminders
Data analysis
Structured analytics module


14. 📈 Future Enhancements
AI-driven emotional analysis
Chatbot for mental support
Social sharing features
Cross-platform compatibility
Advanced visualization tools

 
 

