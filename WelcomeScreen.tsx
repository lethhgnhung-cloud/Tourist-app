import React from 'react';
import { Globe, Sun, Moon, Plane } from 'lucide-react';
import Button from '../ui/Button';
import BottomNav from '../ui/BottomNav';
import { TRANSLATIONS } from '../../constants';
import { Lang, Theme } from '../../types';

interface WelcomeScreenProps {
    onLogin: () => void;
    onRegister: () => void;
    theme: Theme;
    toggleTheme: () => void;
    lang: Lang;
    toggleLang: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin, onRegister, theme, toggleTheme, lang, toggleLang }) => {
    const isDark = theme === 'dark';
    const t = TRANSLATIONS[lang] || TRANSLATIONS['VIE']; 
    
    return (
        <div className={`flex flex-col h-full pt-8 relative ${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-[#0056D2] to-blue-700 text-white'}`}>
            <div className="flex justify-between items-center p-6 pt-2">
                <button onClick={toggleLang} className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm hover:bg-white/30 transition">
                    <Globe size={14}/> {lang === 'VIE' ? 'VIE' : 'ENG'}
                </button>
                <button onClick={toggleTheme} className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
                    {isDark ? <Sun size={18} className="text-[#FFC107]"/> : <Moon size={18}/>}
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center -mt-20">
                <div className={`w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl mb-6 ${isDark ? 'bg-gray-800 text-blue-400' : 'bg-white text-[#0056D2]'}`}>
                    <Plane size={56} strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-2 whitespace-pre-line">{t.welcomeTitle}</h1>
                <p className={`text-sm max-w-[220px] ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>
                    {t.welcomeSlogan}
                </p>

                <div className="w-full max-w-xs space-y-3 mt-10">
                    <Button onClick={onLogin} fullWidth variant="white">
                        {t.login}
                    </Button>
                    <Button onClick={onRegister} fullWidth variant="outline" className={isDark ? 'border-gray-500 text-gray-300 hover:bg-gray-800' : 'border-white text-white hover:bg-white/10'}>
                        {t.register}
                    </Button>
                </div>
            </div>
            <BottomNav activeTab="home" onTabChange={() => {}} darkMode={isDark} lang={lang} />
        </div>
    );
};

export default WelcomeScreen;