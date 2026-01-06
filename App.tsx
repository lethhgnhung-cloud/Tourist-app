import React, { useState } from 'react';
import { TRANSLATIONS } from './constants';
import { User, Lang, Theme } from './types';
import WelcomeScreen from './components/views/WelcomeScreen';
import LoginScreen from './components/views/LoginScreen';
import RegistrationFlow from './components/views/RegistrationFlow';
import Dashboard from './components/views/Dashboard';

// Main App Component
const App = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const [lang, setLang] = useState<Lang>('VIE');
    const [currentView, setCurrentView] = useState('welcome');
    const [registeredUser, setRegisteredUser] = useState<User | null>(null);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
    const toggleLang = () => setLang(prev => prev === 'VIE' ? 'ENG' : 'VIE');

    const handleUpdateUser = (updatedUser: User) => {
        setRegisteredUser(updatedUser);
        const users = JSON.parse(localStorage.getItem('touristUsers') || '[]');
        const newUsers = users.map((u: User) => u.generatedAccount === updatedUser.generatedAccount ? updatedUser : u);
        localStorage.setItem('touristUsers', JSON.stringify(newUsers));
    };

    const handleRegistrationComplete = (newUser: User) => {
        // Save new user to localStorage so Login screen can find it
        const storedUsers = JSON.parse(localStorage.getItem('touristUsers') || '[]');
        // Avoid duplicates just in case
        const exists = storedUsers.some((u: User) => u.generatedAccount === newUser.generatedAccount);
        if (!exists) {
            storedUsers.push(newUser);
            localStorage.setItem('touristUsers', JSON.stringify(storedUsers));
        }
        
        setRegisteredUser(newUser);
        setCurrentView('login');
    };

    return (
        <div className={`w-full h-full font-sans ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {currentView === 'welcome' && (
                <WelcomeScreen 
                    onLogin={() => setCurrentView('login')} 
                    onRegister={() => setCurrentView('register')} 
                    theme={theme} 
                    toggleTheme={toggleTheme} 
                    lang={lang} 
                    toggleLang={toggleLang}
                />
            )}
            {currentView === 'register' && (
                <RegistrationFlow 
                    onBack={() => setCurrentView('welcome')} 
                    onComplete={handleRegistrationComplete} 
                    theme={theme} 
                    lang={lang}
                />
            )}
            {currentView === 'login' && (
                <LoginScreen 
                    onBack={() => setCurrentView('welcome')} 
                    onLoginSuccess={(user) => { setRegisteredUser(user); setCurrentView('dashboard'); }} 
                    registeredUser={registeredUser} 
                    theme={theme} 
                    lang={lang}
                />
            )}
            {currentView === 'dashboard' && (
                <Dashboard 
                    user={registeredUser} 
                    onLogout={() => setCurrentView('welcome')} 
                    lang={lang} 
                    theme={theme} 
                    toggleTheme={toggleTheme} 
                    onUpdateUser={handleUpdateUser}
                />
            )}
        </div>
    );
};

export default App;