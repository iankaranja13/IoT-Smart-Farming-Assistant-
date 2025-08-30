# IoT Smart Farming Assistant

A comprehensive web application for smart farming management with IoT integration, real-time monitoring, and AI-powered insights.

## Features

- **Real-time Dashboard**: Monitor soil moisture, temperature, and environmental conditions
- **Weather Integration**: Get accurate forecasts and climate recommendations
- **AI Chat Assistant**: Get personalized farming advice and recommendations
- **Insights & Analytics**: Data-driven recommendations for crop management
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices


## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Backend**: FastAPI (Python 3.12), runs with Uvicorn

## Backend (FastAPI)

The backend is built with FastAPI and provides REST API endpoints for the frontend, including the AI chatbot integration and sensor data APIs.

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
   *(If `requirements.txt` is missing, install FastAPI and Uvicorn:)*
   ```bash
   pip install fastapi uvicorn httpx python-dotenv
   ```

4. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your API keys and settings as needed.

5. **Run the backend server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   The backend will be available at `http://localhost:8000`

6. **API Endpoints:**
   - `/query` — AI chatbot endpoint (POST)
   - `/sensor-data` — Sensor data API
   - `/recommendations` — Recommendations API
   - `/weather` — Weather data API
   - `/dashboard-data` — Dashboard metrics

7. **CORS:**
   - CORS is enabled by default for all origins, so the frontend can communicate with the backend during development.

8. **Health Check:**
   - Visit `http://localhost:8000/health` to verify the backend is running.

## Project Structure

```
/
├── src/
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── components/
│   ├── ui/                  # Reusable UI components (Shadcn)
│   ├── Dashboard.tsx        # Main dashboard with metrics
│   ├── WelcomePage.tsx      # Authentication/onboarding
│   ├── InsightsPage.tsx     # Climate-smart recommendations
│   ├── ChatbotPage.tsx      # AI assistant interface
│   ├── ChatbotPanel.tsx     # Collapsible chat panel
│   ├── Navigation.tsx       # Main navigation component
│   └── SettingsPage.tsx     # User preferences
├── styles/
│   └── globals.css          # Global styles and design tokens
└── package.json             # Dependencies and scripts
```


## Getting Started (Frontend)

**Important**: This project has been recently restructured to fix React ref issues and improve the development experience.

1. **Clean up old files (if needed):**
   ```bash
   # Remove any old gitignore directory
   rm -rf gitignore/
   # The main App.tsx is now in /src/App.tsx
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## Recent Fixes

- ✅ Fixed React forwardRef issues with ScrollArea, Button, and Input components
- ✅ Moved App.tsx to proper location in /src/App.tsx
- ✅ Fixed all import paths and TypeScript configurations
- ✅ Added proper .gitignore file
- ✅ Updated package.json with all required @radix-ui dependencies
- ✅ Configured Vite to serve on port 3000

## Features Overview

### Welcome Page
- Simple onboarding flow for farmers
- Name, email, and farm ID collection
- Responsive design with feature highlights

### Dashboard
- Real-time metrics display (soil moisture, temperature, rainfall)
- Interactive charts showing trends over time
- Status cards for pH, nutrients, and irrigation
- Collapsible AI chatbot for quick assistance
- Weather forecast integration

### Insights Page
- Climate-smart farming recommendations
- Water management strategies
- Crop selection guidance
- Fertilizer optimization tips
- Weather alert notifications

### Chatbot Assistant
- Full-screen chat interface
- AI-powered farming advice
- Context-aware responses
- Chat history management

### Settings
- User profile management
- Notification preferences
- Theme customization
- Account settings

## Design System

The application uses a custom design system built on Tailwind CSS v4 with:
- Consistent color palette optimized for farming/agriculture theme
- Typography scale with proper hierarchy
- Component variants for different use cases
- Dark mode support
- Responsive breakpoints

## Mock Data

The application includes comprehensive mock data for:
- Weather forecasts
- Soil and environmental metrics
- Chat conversations
- Farming recommendations
- Historical trend data

This allows the application to be fully functional without requiring backend integration.

## Development Guidelines

- Follow the established component structure
- Use TypeScript for all new components
- Implement responsive design principles
- Maintain consistent styling with the design system
- Add proper error handling and loading states

## Troubleshooting

If you see red errors in VS Code:
1. Make sure you're using the App.tsx file in `/src/App.tsx` (not the root one)
2. Run `npm install` to ensure all dependencies are installed
3. Restart your TypeScript language server in VS Code
4. Check that all UI components are properly imported from `./components/ui/`

## Future Enhancements

- Real IoT sensor integration
- Advanced analytics and machine learning
- Multi-language support
- Offline functionality
- Push notifications
- Integration with weather APIs