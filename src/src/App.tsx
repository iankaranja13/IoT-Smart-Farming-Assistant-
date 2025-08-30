import React, { useState } from 'react';
import { WelcomePage } from '../components/WelcomePage';
import { Dashboard } from '../components/Dashboard';
import { InsightsPage } from '../components/InsightsPage';
import { ChatbotPage } from '../components/ChatbotPage';
import { SettingsPage } from '../components/SettingsPage';
import { Navigation } from '../components/Navigation';

type Page = 'welcome' | 'dashboard' | 'insights' | 'chatbot' | 'settings';

interface User {
  name: string;
  email: string;
  farmId?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('welcome');
  };

  if (!user && currentPage !== 'welcome') {
    setCurrentPage('welcome');
  }

  return (
    <div className="min-h-screen bg-background">
      {user && currentPage !== 'welcome' && (
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      <main className={user && currentPage !== 'welcome' ? 'pt-16' : ''}>
        {currentPage === 'welcome' && (
          <WelcomePage onLogin={handleLogin} />
        )}
        {currentPage === 'dashboard' && user && (
          <Dashboard 
            user={user} 
            isChatbotOpen={isChatbotOpen}
            setIsChatbotOpen={setIsChatbotOpen}
            onNavigateToChat={() => setCurrentPage('chatbot')}
          />
        )}
        {currentPage === 'insights' && user && (
          <InsightsPage user={user} />
        )}
        {currentPage === 'chatbot' && user && (
          <ChatbotPage user={user} />
        )}
        {currentPage === 'settings' && user && (
          <SettingsPage user={user} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}