# CapTrack Web Repository System
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/ChanChen43/CapTrack-Web-Repository-System)

## Overview

CapTrack is a comprehensive web-based repository and management system designed for university capstone projects. It provides a streamlined platform for students, faculty, and administrators to manage the entire lifecycle of a capstone project, from submission to feedback and grading. The system features distinct, role-based dashboards tailored to the specific needs of each user group.

This application is built with React and TypeScript, using Vite for a fast development experience and shadcn/ui with Tailwind CSS for a modern, responsive user interface.

## Live Demo

The application is deployed and accessible via GitHub Pages:

**[https://chanchen43.github.io/CapTrack-Web-Repository-System/](https://chanchen43.github.io/CapTrack-Web-Repository-System/)**

The login page includes demo credentials for accessing the Student, Faculty, and Admin dashboards.

# CapTrack Web System

  This is a code bundle for CapTrack Web System. The original project is available at https://www.figma.com/design/0LnQreA345ptIoCM0MLie3/CapTrack-Web-System.

## Features

*   **Role-Based Access Control:** Separate dashboards and functionalities for Students, Faculty, and Administrators.
*   **Student Dashboard:** View project progress, submit files, and receive feedback from advisors.
*   **Faculty Dashboard:** Review student submissions, provide feedback, assign grades, and browse the project repository.
*   **Admin Dashboard:** Comprehensive control panel for user management, system health monitoring, viewing activity logs, and configuring system-wide settings.
*   **Project & File Management:** Centralized repository for all project-related files, with features for uploading, viewing, and organizing documents.
*   **Interactive UI:** Modern, responsive interface built with shadcn/ui components, including modals, tables, forms, and notifications.
*   **Mock Authentication:** A simulated authentication system (`AuthContext`) demonstrates the login flow and role-based routing.

## Technologies Used

*   **Frontend:** React, TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS, shadcn/ui
*   **State Management:** React Context API
*   **Icons:** Lucide React

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have Node.js and npm (or a compatible package manager) installed on your system.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/chanchen43/captrack-web-repository-system.git
    cd captrack-web-repository-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000` (or another port if 3000 is in use).

## Project Structure

The codebase is organized into the following key directories:

```
src/
├── components/      # Main React components for pages and modals
│   ├── ui/          # Reusable UI components from shadcn/ui
│   ├── AdminDashboard.tsx
│   ├── FacultyDashboard.tsx
│   └── StudentDashboard.tsx
├── contexts/        # React context providers (e.g., AuthContext)
├── lib/             # Mock data and utility functions
├── styles/          # Global CSS files
└── types/           # TypeScript type definitions
```
*   `src/components`: Contains the primary components that make up the different pages and modals of the application.
*   `src/components/ui`: Houses the reusable, low-level UI components (Button, Card, etc.), many of which are based on shadcn/ui.
*   `src/contexts`: Manages global state, such as authentication status.
*   `src/lib`: Contains mock data used throughout the application to simulate a real backend.
*   `src/types`: Defines TypeScript interfaces for data structures like `User`, `Project`, and `Submission`.
