HackReminder
# HackReminder

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

HackReminder is your essential companion for hackathons, designed to help participants stay organized, manage their time effectively, and streamline the submission process.

## Table of Contents

*   [About HackReminder](#about-hackreminder)
*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [How We Built It](#how-we-built-it)
*   [Challenges Faced](#challenges-faced)
*   [Accomplishments](#accomplishments)
*   [Future Enhancements](#future-enhancements)
*   [Getting Started](#getting-started)
*   [Contributing](#contributing)
*   [License](#license)

## About HackReminder

Hackathons are intense, fast-paced events where effective time management and organization are paramount for success. Many participants struggle with keeping track of deadlines, managing tasks, and preparing their project submissions, often leading to last-minute stress. HackReminder was created to address these challenges by providing a simple yet powerful client-side web application that centralizes all essential hackathon information, allowing hackers to focus on building.

## Features

*   **Dynamic Countdown & Reminders:** Track hackathon deadlines with a real-time countdown. Receive personalized audio and visual alerts based on custom or identity-based reminder presets (e.g., 2 hours, 30 minutes before deadline).
*   **Task Checklist:** A robust task management system to add, edit, mark as complete, and delete tasks, helping break down your project into manageable steps.
*   **Quick Notes:** A dedicated notepad for jotting down ideas, code snippets, links, or any crucial information. Notes can be exported as text files or shared via email.
*   **Customizable Devpost Templates:** Simplify your submission with pre-written, editable templates for common Devpost sections ("Built With," "Challenges," "What We Learned"), copyable with a single click.
*   **Personalized Settings:** Customize your experience with light/dark mode, language preferences (English/Chinese), and toggle audio alerts.
*   **Custom Hackathon Support:** Add your own hackathons with specific deadlines and reminder frequencies.

## Technologies Used

*   **Languages:** TypeScript, JavaScript, HTML, CSS
*   **Frontend Framework:** React
*   **UI Components/Icons:** Lucide React
*   **Styling:** Tailwind CSS
*   **Build Tool:** Vite
*   **Data Storage:** Browser `localStorage` (for all user data persistence, ensuring a completely client-side solution)

## How We Built It

HackReminder was developed as a modern, responsive Single Page Application (SPA). We chose **React** for its component-based architecture, enabling modular and reusable UI elements. **TypeScript** was integral for enhancing code quality and maintainability through strong typing. **Vite** provided an exceptionally fast development environment, significantly boosting our productivity with its rapid hot module reloading. For styling, **Tailwind CSS** allowed us to quickly implement a clean, modern, and responsive design directly within our JSX. All user data, including tasks, notes, settings, and custom hackathons, is persistently stored in the user's browser using `localStorage`, making HackReminder a fully client-side application that requires no backend server or database.

## Challenges Faced

During development, we navigated several challenges:

*   **Robust Local Storage Management:** Ensuring reliable and seamless persistence of various data types to `localStorage`, while handling potential parsing errors and maintaining data integrity.
*   **Accurate Time Management and Reminders:** Precisely calculating and displaying countdowns and triggering timely alerts required careful handling of JavaScript's `Date` objects and `setInterval` to prevent time drift.
*   **Dynamic UI for Editing:** Implementing intuitive in-place editing for tasks and Devpost templates, where elements dynamically switch between display and input modes, demanded meticulous state management.
*   **Cross-Browser Audio Alerts:** Ensuring consistent audio alert functionality across different browsers and addressing potential playback restrictions (e.g., browser autoplay policies) required fallback mechanisms.

## Accomplishments

We are proud to have successfully developed a fully functional and intuitive tool that directly addresses common pain points for hackathon participants. Our key accomplishments include:

*   Integrating real-time countdowns, robust task management, and customizable Devpost templates into a seamless, client-side application.
*   Delivering a practical solution with a clean, responsive UI built efficiently with Tailwind CSS.
*   Implementing reliable data persistence using `localStorage`, making HackReminder a private, accessible, and reliable companion for any hacker without needing a server.

## Future Enhancements

We have exciting plans to further enhance HackReminder:

*   **Team Collaboration Mode:** Introduce a feature allowing team members to share tasks, notes, and deadlines in real-time.
*   **Cloud Synchronization:** Explore optional cloud synchronization (e.g., using Supabase) to enable cross-device access to user data.
*   **Advanced Task Management:** Add features like task priorities, subtasks, and drag-and-drop reordering.
*   **Hackathon Resource Integration:** Allow users to easily add and manage external resource links directly within a selected hackathon's profile.
*   **More Customizable Reminders:** Offer more granular control over reminder types, sounds, and notification methods.
*   **Mobile Application:** Investigate building a native mobile application using Expo for an even more seamless on-the-go experience.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/HackReminder.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Run the development server
    ```sh
    npm run dev
    ```
    This will typically open the application in your browser at `http://localhost:5173`.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
