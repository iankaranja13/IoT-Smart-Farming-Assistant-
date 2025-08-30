# IoT Smart Farming Assistant

A comprehensive web application for farmers to monitor and manage their agricultural operations using IoT sensors and AI-powered insights.

## Features

- **Real-time Dashboard**: Monitor soil moisture, temperature, weather predictions, and crop recommendations
- **Smart Insights**: Get AI-powered recommendations for water management, crop selection, and fertilizer optimization
- **AI Chatbot**: Interactive assistant for farming questions and guidance
- **User Settings**: Manage profile and preferences
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone or copy the project files to your local directory
2. Navigate to the project directory in your terminal
3. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── main.tsx              # Application entry point
├── App.tsx                   # Main application component
├── components/               # React components
│   ├── WelcomePage.tsx      # Login/welcome screen
│   ├── Dashboard.tsx        # Main dashboard with metrics
│   ├── InsightsPage.tsx     # AI recommendations page
│   ├── ChatbotPage.tsx      # Full-screen chatbot
│   ├── ChatbotPanel.tsx     # Sidebar chatbot panel
│   ├── SettingsPage.tsx     # User settings
│   ├── Navigation.tsx       # Main navigation component
│   └── ui/                  # Shadcn/ui components
├── styles/
│   └── globals.css          # Global styles and Tailwind config
└── package.json             # Project dependencies and scripts
```

## Technologies Used

- **React** with TypeScript for the frontend framework
- **Tailwind CSS v4** for styling and responsive design
- **Vite** for fast development and build tooling
- **Recharts** for data visualization and charts
- **Lucide React** for icons
- **Shadcn/ui** for consistent UI components

## Usage

1. Start by entering your name, email, and optional farm ID on the welcome page
2. Navigate through different sections using the top navigation bar
3. Monitor real-time farm metrics on the dashboard
4. Check insights for AI-powered farming recommendations
5. Use the chatbot for interactive assistance
6. Manage your profile and settings as needed

