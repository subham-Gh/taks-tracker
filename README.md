# Personal Task Manager

A modern, responsive web application to manage tasks efficiently with a touch of AI-like intelligence and voice input. Built with React and styled with Tailwind CSS, this app allows users to create, edit, and track tasks seamlessly, with a unique feature to parse natural language input (e.g., "Buy milk tomorrow") via a mock AI parser and voice commands using the Web Speech API. Perfect for organizing daily todos with a professional and intuitive UI.

## Features

- **Task Management**: Add, edit, delete tasks, and mark them as completed with a clean, user-friendly interface.
- **Natural Language Parsing**: Input tasks in natural language (e.g., "Finish report by tomorrow with work, urgent") and let the mock AI parser extract the title, deadline, and tags automatically.
- **Voice Input**: Use the Google Material Icons microphone to create tasks via speech, leveraging the Web Speech API for transcription, seamlessly integrated with the mock AI parser.
- **Categories/Tags**: Assign comma-separated tags to tasks for easy organization (e.g., "work, urgent").
- **Responsive Design**: Built with Tailwind CSS, the app adapts beautifully to mobile and desktop screens.
- **Local Storage**: Tasks are persisted in the browser's `localStorage` for a lightweight, offline experience.

## Tech Stack

- **Frontend**: React (single-page application with reusable components)
- **Styling**: Tailwind CSS (via CDN for rapid, utility-first styling)
- **Icons**: Google Material Icons (via CDN for professional UI elements)
- **Storage**: Browser `localStorage` for task persistence
- **Speech Recognition**: Web Speech API for voice input
- **Mock AI**: Custom JavaScript parser for natural language processing (extensible to xAI API)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A modern browser (Chrome/Edge recommended for Web Speech API support)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`.

### Usage

- **Add a Task**: Type a task (e.g., "Call mom tomorrow with family") in the textarea and click "Parse with AI" to auto-fill the form, or manually enter title, deadline, and tags.
- **Voice Input**: Click the microphone icon (Google Material Icons), speak your task, and watch the form populate automatically.
- **Manage Tasks**: Edit, delete, or mark tasks as completed. Tasks are saved in `localStorage` and persist across sessions.
- **Responsive UI**: Try resizing the browser or accessing on mobile to see the adaptive layout.

## Project Structure

```
task-manager/
├── public/
│   ├── index.html           # Includes Tailwind CSS and Google Material Icons CDNs
├── src/
│   ├── components/          # React components (TaskForm, TaskList, TaskItem, Header)
│   ├── hooks/              # Custom hook (useTasks) for task management
│   ├── services/           # Mock AI parser (aiService.js)
│   ├── utils/              # Local storage helper (storage.js)
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
├── .gitignore              # Ignores node_modules, .env, etc.
├── package.json            # Dependencies and scripts
├── README.md               # You're reading it!
```

## Future Enhancements

- Integrate xAI's Grok API for real natural language processing (see [xAI API](https://x.ai/api)).
- Add animations for the microphone icon (e.g., pulsing when listening).
- Support more date formats in the mock parser (e.g., "August 20th").
- Add task filtering by tags or sorting by deadline.
- Implement dark mode with Tailwind's `dark:` classes.

## Why This Project?

I built this app to explore modern web development with React, Tailwind CSS, and the Web Speech API, while simulating AI capabilities through a custom parser. It’s a practical tool for task management and a showcase of my ability to integrate APIs, create responsive UIs, and design extensible features. Try it out and let me know your feedback!

## License

MIT License - feel free to use and modify this project.
