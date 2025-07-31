TODO APP

Overview
This is a simple and practical Todo application built with React for managing daily tasks efficiently. The app allows users to add, edit, delete, and filter tasks, with built-in reminder notifications to stay organized.
It also features dark/light theme support using useContext and Firebase integration for user authentication and cross-device task synchronization, ensuring your data is always accessible no matter where you log in.

FEATURES

Task Management: Add, edit, delete, and filter tasks to manage your daily schedule efficiently.

Reminders: Receive notifications for tasks with due times.

Dark/Light Mode: Toggle between themes globally using useContext.

Cross-Device Sync: Uses Firebase to store tasks and user data across multiple devices.

Persistent Login: Stay signed in with Firebase Authentication.

Offline Persistence: Tasks are cached locally using localStorage, so they remain accessible even when offline (synced with Firebase when online).

Responsive UI: Optimized for both mobile and desktop using Tailwind CSS.


CORE FUNCTIONALITY
Integrated React Hooks (useState, useEffect) to manage task state and reminders.
Added Theme Toggle (Dark/Light Mode) with useContext for global theme control.
Improved UI/UX with Tailwind CSS for a clean and flexible layout.

TECH STACK
React – Frontend JavaScript library
React Hooks – For state and side-effect management
useContext API – For global theme state (Dark/Light mode)
Tailwind CSS – Utility-first CSS framework for styling
Integrates Firebase for authentication and cross-device task storage.


Vite – Fast development build tool
LocalStorage – To persist tasks between sessions

AUTENTICATION AND DATA STORAGE
Implements Firebase Authentication API to securely handle user login and ensure that users remain signed in across any device.
Uses Firebase Realtime Database / Firestore to store and sync todo lists, allowing users to access
