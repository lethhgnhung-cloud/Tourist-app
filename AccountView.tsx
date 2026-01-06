import React, { useState, useEffect } from 'react';
import { ChevronLeft, User, Mail, Phone, Calendar, MapPin, Wifi, Plus, Edit2, Trash2, Lock, ShieldCheck, ChevronRight, Fingerprint, LogOut, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';
import { TranslationStructure, User as UserType, Theme } from '../../types';

interface AccountViewProps {
    onBack: () => void;
    user: UserType | null;
    onLogout: () => void;
    t: TranslationStructure;
    theme: Theme;
    onUpdateUser: (user: UserType) => void;
}

const AccountView: React.FC<AccountViewProps> = ({ onBack, user, onLogout, t, theme, onUpdateUser }) => {
    const isDark = theme === 'dark';
    const [currentSection, setCurrentSection] = useState<string | null>(null); 
    const [isChangingPass, setIsChangingPass] = useState(false);
    const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });
    
    // Visibility states for password fields
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    // Validation State
    const [isNewPassValid, setIsNewPassValid] = useState(false);

    useEffect(() => {
        const pass = passData.new;
        const hasLetter = /[a-zA-Z]/.test(pass);
        const hasNumber = /\d/.test(pass);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        setIsNewPassValid(pass.length > 8 && hasLetter && hasNumber && hasSpecial);
    }, [passData.new]);

    const renderHeader = (title: string) => (<div className={`p-4 pt-12 pb-4 shadow-sm flex items-center gap-3 sticky top-0 z-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}><button onClick={currentSection ? () => setCurrentSection(null) : onBack}><ChevronLeft size={24}/></button><h3 className="font-bold text-2xl uppercase tracking-tight">{title}</h3></div>);

    const handleChangePassword = () => {
        if (!passData.current || !passData.new || !passData.confirm) return alert("Vui lòng điền đầy đủ thông tin.");
        if (passData.current !== user?.password) return alert("Mật khẩu hiện tại không đúng.");
        if (passData.new !== passData.confirm) return alert("Mật khẩu xác nhận không khớp.");
        
        if (!isNewPassValid) return alert(t.validation.passWeak);
        
        if (user) {
            onUpdateUser({ ...user, password: passData.new });
            alert("Đổi mật khẩu thành công!");
            setIsChangingPass(false);
            setPassData({ current: '', new: '', confirm: '' });
            setShowCurrent(false);
            setShowNew(false);
            setShowConfirm(false);
        }
    };

    const CardItem = ({ number, holder, type = "VISA", color = "from-gray-900 to-gray-700" }: any) => (
        <div className={`relative w-full aspect-[1.58] bg-gradient-to-r ${color} rounded-2xl p-6 text-white shadow-xl overflow-hidden mb-4 shrink-0`}>
            <div className="absolute top-0 right-0 p-4 opacity-50"><Wifi size={24}/></div>
            <div className="mt-8 text-xl font-mono tracking-widest">{number}</div>
            <div className="mt-8 flex justify-between items-end">
                <div>
                    <p className="text-[10px] uppercase opacity-70">Card Holder</p>
                    <p className="font-bold uppercase tracking-wider">{holder}</p>
                </div>
                <div className="font-bold italic">{type}</div>
            </div>
        </div>
    );

    if (currentSection === 'info') {
        return (<div className={`flex flex-col h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]'}`}>{renderHeader(t.account.info)}<div className="p-6 space-y-4"><div className="flex flex-col items-center mb-6"><div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg mb-3">{user?.name?.charAt(0)}</div><h2 className="font-bold text-xl">{user?.name}</h2></div><div className={`p-4 rounded-xl border space-y-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex items-center justify-between border-b pb-2 dark:border-gray-700"><span className="opacity-60 text-sm flex items-center gap-2"><User size={16}/> {t.fullName}</span><span className="font-medium">{user?.name}</span></div><div className="flex items-center justify-between border-b pb-2 dark:border-gray-700"><span className="opacity-60 text-sm flex items-center gap-2"><Mail size={16}/> Email</span><span className="font-medium">{user?.email}@gmail.com</span></div><div className="flex items-center justify-between border-b pb-2 dark:border-gray-700"><span className="opacity-60 text-sm flex items-center gap-2"><Phone size={16}/> {t.account.phone}</span><span className="font-medium">0909 *** ***</span></div><div className="flex items-center justify-between border-b pb-2 dark:border-gray-700"><span className="opacity-60 text-sm flex items-center gap-2"><Calendar size={16}/> {t.account.dob}</span><span className="font-medium">01/01/1990</span></div><div className="flex items-center justify-between"><span className="opacity-60 text-sm flex items-center gap-2"><MapPin size={16}/> {t.account.address}</span><span className="font-medium">Vietnam</span></div></div></div></div>);
    }
    if (currentSection === 'management') {
        return (
            <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]'}`}>
                {renderHeader(t.account.management)}
                <div className="p-6 space-y-6">
                    <h4 className="font-bold text-sm opacity-70">Thẻ của tôi</h4>
                    <div className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar">
                        {/* Main Card */}
                        <div className="w-[85%] shrink-0 snap-center">
                            <CardItem number={user?.cardNumber || "**** **** **** 8888"} holder={user?.name || "CARD HOLDER"} />
                        </div>
                        {/* Additional Cards */}
                        {user?.additionalCards?.map((card, i) => (
                            <div key={i} className="w-[85%] shrink-0 snap-center">
                                <CardItem number={card.cardNumber} holder={card.cardName} color="from-blue-900 to-blue-700" />
                            </div>
                        ))}
                        {/* Add Card Placeholder */}
                        <div className="w-[85%] shrink-0 snap-center flex items-center justify-center bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 dark:bg-gray-800 dark:border-gray-600 h-full min-h-[180px]">
                            <div className="flex flex-col items-center opacity-50">
                                <Plus size={32}/>
                                <span className="text-xs font-bold mt-2">Add New Card</span>
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold">{t.accountNum}</span>
                            <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{user?.generatedAccount}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (currentSection === 'security') {
        return (
            <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]'}`}>
                {renderHeader(t.account.security)}
                <div className="p-6 space-y-4">
                    {isChangingPass ? (
                        <div className={`p-4 rounded-xl border space-y-4 animate-in slide-in-from-right ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                            <h4 className="font-bold text-sm">{t.account.changePass}</h4>
                            
                            <div className="relative">
                                <input 
                                    type={showCurrent ? "text" : "password"} 
                                    value={passData.current} 
                                    onChange={e => setPassData({...passData, current: e.target.value})} 
                                    placeholder={t.account.currentPass} 
                                    className={`w-full p-3 border rounded-lg text-sm pr-10 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} 
                                />
                                <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                                    {showCurrent ? <EyeOff size={16}/> : <Eye size={16}/>}
                                </button>
                            </div>

                            <div>
                                <div className="relative">
                                    <input 
                                        type={showNew ? "text" : "password"} 
                                        value={passData.new} 
                                        onChange={e => setPassData({...passData, new: e.target.value})} 
                                        placeholder={t.account.newPass} 
                                        className={`w-full p-3 border rounded-lg text-sm pr-10 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} 
                                    />
                                    <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                                        {showNew ? <EyeOff size={16}/> : <Eye size={16}/>}
                                    </button>
                                </div>
                                <p className={`text-[10px] font-bold mt-1 flex items-center gap-1 ${isNewPassValid ? 'text-green-500' : 'text-red-500'}`}>
                                    <ShieldCheck size={12}/> {t.step3.passReq}
                                </p>
                            </div>
                            
                            <div className="relative">
                                <input 
                                    type={showConfirm ? "text" : "password"} 
                                    value={passData.confirm} 
                                    onChange={e => setPassData({...passData, confirm: e.target.value})} 
                                    placeholder={t.account.confirmPass} 
                                    className={`w-full p-3 border rounded-lg text-sm pr-10 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`} 
                                />
                                <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                                    {showConfirm ? <EyeOff size={16}/> : <Eye size={16}/>}
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={() => setIsChangingPass(false)} variant="secondary" className="flex-1">{t.account.cancel}</Button>
                                <Button onClick={handleChangePassword} className="flex-1">{t.account.save}</Button>
                            </div>
                        </div>
                    ) : (
                        <div className={`p-4 rounded-xl border space-y-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                            <div onClick={() => setIsChangingPass(true)} className="flex items-center justify-between cursor-pointer">
                                <span className="font-medium flex items-center gap-2"><Lock size={18}/> {t.account.changePass}</span>
                                <ChevronRight size={16} className="opacity-50"/>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium flex items-center gap-2"><Fingerprint size={18}/> {t.account.biometric}</span>
                                <div className="w-10 h-6 bg-[#0056D2] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium flex items-center gap-2"><ShieldCheck size={18}/> {t.account.twoFa}</span>
                                <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return (<div className={`flex flex-col h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]'}`}>{renderHeader(t.account.title)}<div className="p-6 space-y-6 overflow-y-auto flex-1"><div className="flex items-center gap-4"><div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500">{user?.name?.charAt(0)}</div><div><h2 className="font-bold text-xl">{user?.name}</h2><p className="opacity-60 text-sm">{user?.email}@gmail.com</p></div></div><div className={`rounded-xl shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}><div onClick={() => setCurrentSection('info')} className={`p-4 border-b flex justify-between items-center cursor-pointer hover:opacity-80 ${isDark ? 'border-gray-700' : ''}`}><div className="flex items-center gap-3"><User size={20} className="opacity-50"/><span className="text-sm font-medium">{t.account.info}</span></div><ChevronRight size={16} className="opacity-30"/></div><div onClick={() => setCurrentSection('management')} className={`p-4 border-b flex justify-between items-center cursor-pointer hover:opacity-80 ${isDark ? 'border-gray-700' : ''}`}><div className="flex items-center gap-3"><User size={20} className="opacity-50"/><span className="text-sm font-medium">{t.account.management}</span></div><ChevronRight size={16} className="opacity-30"/></div><div onClick={() => setCurrentSection('security')} className="p-4 flex justify-between items-center cursor-pointer hover:opacity-80"><div className="flex items-center gap-3"><ShieldCheck size={20} className="opacity-50"/><span className="text-sm font-medium">{t.account.security}</span></div><ChevronRight size={16} className="opacity-30"/></div></div><Button onClick={onLogout} variant="outline" fullWidth className="text-red-500 border-red-200 hover:bg-red-50"><LogOut size={18}/> {t.account.logout}</Button></div></div>);
}

export default AccountView;