import React, { useState, useEffect } from 'react';
import { Sun, Moon, Bell, X, Info, ShieldCheck, Eye, EyeOff, ArrowRightLeft, QrCode, ScanLine, User as UserIcon, RefreshCcw, Hotel, Map, Signal, Plane, Car, Train, Bus, Flag, Ship, Heart } from 'lucide-react';
import BottomNav from '../ui/BottomNav';
import UtilitiesView from './UtilitiesView';
import DepositWithdrawView from './DepositWithdrawView';
import ReceiveMoneyView from './ReceiveMoneyView';
import ScanView from './ScanView';
import AccountView from './AccountView';
import AiAssistantView from './AiAssistantView';
import { TRANSLATIONS } from '../../constants';
import { User, Lang, Theme } from '../../types';

interface DashboardProps {
    user: User | null;
    onLogout: () => void;
    lang: Lang;
    theme: Theme;
    toggleTheme: () => void;
    onUpdateUser: (user: User) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, lang, theme, toggleTheme, onUpdateUser }) => {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['VIE']; 
    const [balance, setBalance] = useState(user?.balance || 15000000); 
    const [showBalance, setShowBalance] = useState(false); 
    const [showNotifications, setShowNotifications] = useState(false);
    const [activeFeature, setActiveFeature] = useState<string | null>(null); 
    const [currentTime, setCurrentTime] = useState(new Date());
    const [rates, setRates] = useState({ buy: 25180, sell: 25550, trend: 'up' });
    const [showAllRates, setShowAllRates] = useState(false); 
    const isDark = theme === 'dark';

    const emojis: Record<string, string> = { USD: '🇺🇸', EUR: '🇪🇺', JPY: '🇯🇵', CNY: '🇨🇳', KRW: '🇰🇷', TWD: '🇹🇼', SGD: '🇸🇬', THB: '🇹🇭', AUD: '🇦🇺' };
    const allRates = [
        { code: 'USD', buy: 25180, sell: 25550 },
        { code: 'EUR', buy: 27000, sell: 27500 },
        { code: 'JPY', buy: 170, sell: 175 },
        { code: 'CNY', buy: 3500, sell: 3550 },
        { code: 'KRW', buy: 19, sell: 21 },
        { code: 'TWD', buy: 800, sell: 820 },
        { code: 'SGD', buy: 18500, sell: 19200 },
        { code: 'THB', buy: 690, sell: 720 },
        { code: 'AUD', buy: 16500, sell: 17000 },
    ];

    useEffect(() => { 
        const interval = setInterval(() => { 
            setRates(prev => ({ 
                buy: prev.buy + (Math.random() > 0.5 ? 5 : -5), 
                sell: prev.sell + (Math.random() > 0.5 ? 5 : -5), 
                trend: Math.random() > 0.5 ? 'up' : 'down' 
            })); 
            setCurrentTime(new Date()); 
        }, 3000); 
        return () => clearInterval(interval); 
    }, []);
    
    const formatCurrency = (amount: number) => { return new Intl.NumberFormat('vi-VN').format(amount) + " VND"; };

    // Update user balance in parent when it changes locally
    useEffect(() => {
        if (user && balance !== user.balance) {
            onUpdateUser({ ...user, balance });
        }
    }, [balance]);

    if (activeFeature === 'deposit' || activeFeature === 'withdraw' || activeFeature === 'exchange') { 
        return <DepositWithdrawView onBack={() => setActiveFeature(null)} balance={balance} setBalance={setBalance} t={t} theme={theme} lang={lang} user={user} />; 
    }
    if (activeFeature === 'receive') { return <ReceiveMoneyView onBack={() => setActiveFeature(null)} accountNum={user?.generatedAccount || '99998888'} user={user} t={t} theme={theme} />; }
    if (activeFeature === 'pay') { 
        return <ScanView 
            onBack={() => setActiveFeature(null)} 
            t={t} 
            onMyQr={() => setActiveFeature('receive')} 
            user={user}
            balance={balance}
            setBalance={setBalance}
        />; 
    }
    if (activeFeature === 'account') { return <AccountView onBack={() => setActiveFeature(null)} user={user} onLogout={onLogout} t={t} theme={theme} onUpdateUser={onUpdateUser} />; }
    if (activeFeature === 'chat') { return <AiAssistantView onBack={() => setActiveFeature(null)} t={t} theme={theme} lang={lang} />; }
    
    // Check if activeFeature matches any utility key
    const isUtility = ['esim', 'hotel', 'culture', 'flight', 'taxi', 'train', 'bus', 'golf', 'boat', 'medical'].includes(activeFeature || '');
    if (isUtility) { 
        return <UtilitiesView type={activeFeature!} onBack={() => setActiveFeature(null)} t={t} theme={theme} balance={balance} setBalance={setBalance} user={user} lang={lang} />;
    }

    return (
        <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]'} relative overflow-hidden`}>
            {/* All Rates Modal */}
            {showAllRates && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setShowAllRates(false)}>
                    <div className={`w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden max-h-[80%] flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b flex justify-between items-center">
                            <h4 className="font-bold text-lg">{t.dashboard.rates.title} (Live)</h4>
                            <button onClick={() => setShowAllRates(false)}><X size={20}/></button>
                        </div>
                        <div className="overflow-y-auto p-4 space-y-3">
                            <div className="grid grid-cols-3 text-xs font-bold opacity-60 mb-2">
                                <span>{t.dashboard.rates.currency}</span>
                                <span className="text-right">{t.dashboard.rates.buy}</span>
                                <span className="text-right">{t.dashboard.rates.sell}</span>
                            </div>
                            {allRates.map(rate => (
                                <div key={rate.code} className="grid grid-cols-3 items-center py-2 border-b last:border-0 border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{emojis[rate.code]}</span>
                                        <span className="font-bold">{rate.code}</span>
                                    </div>
                                    <div className="text-right text-[#0056D2] font-bold">{rate.buy.toLocaleString()}</div>
                                    <div className="text-right font-medium">{rate.sell.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className={`p-6 pb-4 shadow-sm z-10 sticky top-0 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0056D2] to-blue-400 text-white flex items-center justify-center font-bold text-lg shadow-md">{user?.name?.charAt(0) || "U"}</div><div><p className="text-xs opacity-60">{t.dashboard.greeting}</p><h3 className="font-bold">{user?.name || "User"}</h3></div></div>
                    <div className="flex items-center gap-3">
                        <button onClick={toggleTheme} className={`p-2 rounded-full hover:opacity-80 transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>{isDark ? <Sun size={20} className="text-[#FFC107]"/> : <Moon size={20} className="text-gray-600"/>}</button>
                        <div className="relative"><button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-full hover:opacity-80 relative transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><Bell size={24} className="opacity-80"/><span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span></button>{showNotifications && (<div className={`absolute right-0 top-full mt-2 w-72 rounded-xl shadow-2xl border z-50 animate-in slide-in-from-top-2 fade-in duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><div className="p-3 border-b flex justify-between items-center opacity-80"><h4 className="font-bold text-sm">{t.dashboard.notifications.title}</h4><button onClick={() => setShowNotifications(false)}><X size={14}/></button></div><div className="max-h-60 overflow-y-auto">{t.dashboard.notifications.list.map(n => (<div key={n.id} className={`p-3 border-b last:border-0 cursor-pointer flex gap-3 ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'hover:bg-gray-50'}`}><div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-50 text-[#0056D2]"><Info size={14}/></div><div><p className="text-xs font-bold">{n.title}</p><p className="text-[10px] opacity-70 line-clamp-2">{n.desc}</p><p className="text-[9px] opacity-50 mt-1">{n.time}</p></div></div>))}</div></div>)}</div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-[#0056D2] to-[#1e3c72] rounded-2xl p-5 text-white shadow-xl shadow-blue-200 relative overflow-hidden"><div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div><div className="absolute -left-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div><div className="flex justify-between items-start mb-2 relative z-10"><span className="text-blue-100 text-xs font-medium flex items-center gap-1"><ShieldCheck size={12}/> {t.dashboard.balance}</span><button onClick={() => setShowBalance(!showBalance)} className="text-blue-200 hover:text-white transition-colors">{showBalance ? <Eye size={18}/> : <EyeOff size={18}/>}</button></div><div className="relative z-10"><h2 className="text-3xl font-bold tracking-tight mb-1">{showBalance ? formatCurrency(balance) : '*********'}</h2><p className="text-xs text-blue-200 opacity-80 font-mono tracking-wider">{user?.generatedAccount || '**** 8888'}</p></div></div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24">
                <div className="grid grid-cols-4 gap-2 px-4 py-6">
                    <button onClick={() => setActiveFeature('deposit')} className="flex flex-col items-center gap-2 group"><div className={`w-14 h-14 rounded-2xl shadow-sm border flex items-center justify-center text-[#0056D2] group-hover:scale-105 group-hover:shadow-md transition-all ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><ArrowRightLeft size={24}/></div><span className="text-[10px] font-bold opacity-80 text-center leading-tight">{t.dashboard.actions.deposit}</span></button>
                    <button onClick={() => setActiveFeature('receive')} className="flex flex-col items-center gap-2 group"><div className={`w-14 h-14 rounded-2xl shadow-sm border flex items-center justify-center text-[#0056D2] group-hover:scale-105 group-hover:shadow-md transition-all ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><QrCode size={24}/></div><span className="text-[10px] font-bold opacity-80 text-center leading-tight">{t.dashboard.actions.receive}</span></button>
                    <button onClick={() => setActiveFeature('pay')} className="flex flex-col items-center gap-2 group"><div className={`w-14 h-14 rounded-2xl shadow-sm border flex items-center justify-center text-[#0056D2] group-hover:scale-105 group-hover:shadow-md transition-all ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><ScanLine size={24}/></div><span className="text-[10px] font-bold opacity-80 text-center leading-tight">{t.dashboard.actions.pay}</span></button>
                    <button onClick={() => setActiveFeature('account')} className="flex flex-col items-center gap-2 group"><div className={`w-14 h-14 rounded-2xl shadow-sm border flex items-center justify-center text-[#0056D2] group-hover:scale-105 group-hover:shadow-md transition-all ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}><UserIcon size={24}/></div><span className="text-[10px] font-bold opacity-80 text-center leading-tight">{t.dashboard.actions.account}</span></button>
                </div>
                <div className="px-6 mb-6">
                    <div className="flex justify-between items-center mb-3"><h3 className="font-bold opacity-90 text-sm flex items-center gap-2"><RefreshCcw size={14} className="text-[#0056D2]"/> {t.dashboard.rates.title}</h3><span className={`text-[10px] opacity-60 px-2 py-1 rounded-full animate-pulse ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>{t.dashboard.rates.live} {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>
                    <div onClick={() => setShowAllRates(true)} className={`rounded-2xl shadow-sm border overflow-hidden p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-100'}`}><div className="flex items-center gap-3"><span className="text-3xl">{emojis['USD']}</span><div><p className="font-bold text-sm">USD → VND</p></div></div><div className="text-right"><p className="font-bold text-lg text-[#0056D2] transition-all duration-300">{rates.buy.toLocaleString()} VND</p><p className="text-[10px] opacity-50">1 USD</p></div></div>
                </div>
                
                {/* Main Utilities */}
                <div className="px-6 mb-6">
                    <h3 className="font-bold opacity-90 text-sm mb-3">{t.dashboard.utilities}</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
                        <div onClick={() => setActiveFeature('hotel')} className="min-w-[260px] h-36 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl snap-center shadow-lg relative overflow-hidden flex flex-col justify-between p-4 group cursor-pointer"><div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div><div className="z-10"><div className="flex items-center gap-2 text-blue-200 text-xs mb-1"><Hotel size={14}/> Booking.com</div><h4 className="font-bold text-white text-lg leading-tight">{t.dashboard.ads.hotel.title}<br/>{t.dashboard.ads.hotel.subtitle}</h4></div><button className="bg-white text-[#0056D2] text-xs font-bold py-2 px-4 rounded-lg self-start shadow-sm">{t.dashboard.ads.hotel.btn}</button></div>
                        <div onClick={() => setActiveFeature('culture')} className="min-w-[260px] h-36 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl snap-center shadow-lg relative overflow-hidden flex flex-col justify-between p-4 group cursor-pointer"><div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div><div className="z-10"><div className="flex items-center gap-2 text-orange-100 text-xs mb-1"><Map size={14}/> {t.dashboard.ads.culture.title}</div><h4 className="font-bold text-white text-lg leading-tight">{t.dashboard.ads.culture.subtitle}</h4></div><button className="bg-white text-orange-600 text-xs font-bold py-2 px-4 rounded-lg self-start shadow-sm">{t.dashboard.ads.culture.btn}</button></div>
                        <div onClick={() => setActiveFeature('esim')} className="min-w-[260px] h-36 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl snap-center shadow-lg relative overflow-hidden flex flex-col justify-between p-4 group cursor-pointer"><div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div><div className="z-10"><div className="flex items-center gap-2 text-green-100 text-xs mb-1"><Signal size={14}/> {t.dashboard.ads.esim.title}</div><h4 className="font-bold text-white text-lg leading-tight">{t.dashboard.ads.esim.subtitle}</h4></div><button className="bg-white text-green-600 text-xs font-bold py-2 px-4 rounded-lg self-start shadow-sm">{t.dashboard.ads.esim.btn}</button></div>
                    </div>
                </div>

                {/* Other Utilities Grid */}
                <div className="px-6 mb-6">
                    <h3 className="font-bold opacity-90 text-sm mb-3">{t.dashboard.otherUtilities || "Other Utilities"}</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            {icon: Plane, label: t.utils.flight, color: 'text-sky-500', key: 'flight'},
                            {icon: Car, label: t.utils.taxi, color: 'text-yellow-500', key: 'taxi'},
                            {icon: Train, label: t.utils.train, color: 'text-red-500', key: 'train'},
                            {icon: Bus, label: t.utils.bus, color: 'text-blue-500', key: 'bus'},
                            {icon: Flag, label: t.utils.golf, color: 'text-green-600', key: 'golf'}, 
                            {icon: Ship, label: t.utils.boat, color: 'text-indigo-500', key: 'boat'},
                            {icon: Heart, label: t.utils.medical, color: 'text-pink-500', key: 'medical'}
                        ].map((u, i) => (
                            <div key={i} className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border cursor-pointer hover:bg-gray-50 active:scale-95 transition-all ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-100'}`} onClick={() => setActiveFeature(u.key)}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10 ${u.color.replace('text', 'bg')}`}>
                                    <u.icon className={u.color} size={20}/>
                                </div>
                                <span className="text-[10px] font-bold text-center leading-tight">{u.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <BottomNav activeTab={activeFeature || "home"} onTabChange={setActiveFeature} darkMode={isDark} lang={lang} />
        </div>
    );
};

export default Dashboard;