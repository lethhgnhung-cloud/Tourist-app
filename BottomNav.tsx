import React from 'react';
import { CreditCard, ArrowRightLeft, QrCode, MessageCircle, User } from 'lucide-react';
import { TRANSLATIONS } from '../../constants';
import { Lang } from '../../types';

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    darkMode: boolean;
    lang: Lang;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, darkMode, lang }) => {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['VIE']; 
    const iconBase = darkMode ? "text-gray-400" : "text-gray-400";
    const iconActive = "text-[#0056D2] dark:text-blue-400";

    const NavItem = ({ icon: Icon, label, id }: { icon: any, label: string, id: string }) => (
        <button 
            onClick={() => onTabChange(id)} 
            className={`flex flex-col items-center gap-1 w-12 ${activeTab === id ? iconActive : iconBase}`}
        >
            <Icon size={24} strokeWidth={activeTab === id ? 2.5 : 2} />
            <span className="text-[10px] font-medium whitespace-nowrap">{label}</span>
        </button>
    );

    return (
        <div className={`absolute bottom-0 left-0 right-0 border-t px-6 py-4 flex justify-between items-end pb-8 z-40 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
            <NavItem icon={CreditCard} label={t.home} id="home" />
            <NavItem icon={ArrowRightLeft} label={t.exchange} id="exchange" />
            <div className="-mt-12 relative z-50">
                <button 
                    onClick={() => onTabChange('pay')} 
                    className={`w-16 h-16 rounded-2xl shadow-xl flex flex-col items-center justify-center border transition-transform active:scale-95
                    ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-100 text-[#1A1F36]'}`}
                >
                    <QrCode size={28} />
                    <span className="text-[10px] font-bold mt-1">QR</span>
                </button>
            </div>
            <NavItem icon={MessageCircle} label={t.aiNav} id="chat" />
            <NavItem icon={User} label={t.profile} id="account" />
        </div>
    );
};

export default BottomNav;