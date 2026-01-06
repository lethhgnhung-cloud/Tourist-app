import React, { useState, useEffect } from 'react';
import { ChevronLeft, AlertTriangle, LockOpen, Lock, ShieldCheck, EyeOff, Eye } from 'lucide-react';
import Button from '../ui/Button';
import NotificationToast from '../ui/NotificationToast';
import { TRANSLATIONS } from '../../constants';
import { User, Lang, Theme } from '../../types';

interface LoginScreenProps {
    onBack: () => void;
    onLoginSuccess: (user: User) => void;
    registeredUser: User | null;
    theme: Theme;
    lang: Lang;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLoginSuccess, registeredUser, theme, lang }) => {
    const [accountNum, setAccountNum] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [viewState, setViewState] = useState<'login' | 'forgot' | 'forgot-otp'>('login'); 
    const [forgotEmail, setForgotEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPass, setNewPass] = useState('');
    const [notification, setNotification] = useState<{sender: string, title: string, message: string} | null>(null);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [showNewPass, setShowNewPass] = useState(false);
    const [isNewPassValid, setIsNewPassValid] = useState(false);

    const t = TRANSLATIONS[lang] || TRANSLATIONS['VIE']; 
    const isDark = theme === 'dark';
    const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]';
    const inputClass = isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-[#1A1F36]';

    useEffect(() => {
        const pass = newPass;
        const hasLetter = /[a-zA-Z]/.test(pass);
        const hasNumber = /\d/.test(pass);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        setIsNewPassValid(pass.length > 8 && hasLetter && hasNumber && hasSpecial);
    }, [newPass]);

    const handleLogin = () => {
        const storedUsers = JSON.parse(localStorage.getItem('touristUsers') || '[]');
        const user = storedUsers.find((u: User) => u.generatedAccount === accountNum);

        if (!user) {
            setError(t.validation.accNotFound);
            return;
        }
        if (user.password === password) {
            onLoginSuccess(user);
        } else {
            setError(t.validation.loginFail);
        }
    };

    const handleSendForgotOtp = () => {
        if (!forgotEmail) return;
        
        const storedUsers = JSON.parse(localStorage.getItem('touristUsers') || '[]');
        const emailExists = storedUsers.some((u: User) => u.email === forgotEmail);

        if (!emailExists) {
            setError(t.validation.emailNotFound);
            return;
        }
        
        setError('');
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(code);
        setViewState('forgot-otp');
        
        setNotification({
            sender: t.emailSim.sender,
            title: t.emailSim.subject,
            message: `${t.emailSim.bodyPrefix} ${code} ${t.emailSim.bodySuffix}`
        });
        setTimeout(() => setNotification(null), 8000); 
    };

    const handleResetPassword = () => {
        if (otp !== generatedOtp) {
            setError(t.validation.otpWrong);
            return;
        }
        
        if (!isNewPassValid) {
            alert(t.validation.passWeak);
            return;
        }
        
        const storedUsers = JSON.parse(localStorage.getItem('touristUsers') || '[]');
        const userIndex = storedUsers.findIndex((u: User) => u.email === forgotEmail);

        if (userIndex !== -1) {
            storedUsers[userIndex].password = newPass;
            localStorage.setItem('touristUsers', JSON.stringify(storedUsers));
            alert(t.validation.resetSuccess);
            setViewState('login');
        } else {
            setError(t.validation.emailNotFound);
        }
    };

    return (
        <div className={`flex flex-col h-full pt-8 p-6 animate-in slide-in-from-right ${bgClass}`}>
            {notification && <NotificationToast {...notification} onClose={() => setNotification(null)} visible={!!notification} />}
            
            {viewState === 'forgot' && (
                <>
                    <button onClick={() => setViewState('login')} className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100/10"><ChevronLeft size={24}/></button>
                    <h2 className="text-2xl font-bold mt-8 mb-2">{t.forgot.title}</h2>
                    <p className="text-sm opacity-60 mb-6">{t.forgot.desc}</p>
                    <div className="space-y-4">
                        <div className="flex items-stretch rounded-xl overflow-hidden border">
                             <input 
                                value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                                className={`flex-1 p-4 outline-none ${inputClass} border-none`} 
                                placeholder="username" 
                              />
                              <div className={`px-3 flex items-center justify-center font-bold border-l ${isDark ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                  @gmail.com
                              </div>
                        </div>
                        {error && <div className="p-3 bg-[#D32F2F]/10 text-[#D32F2F] text-sm rounded-lg flex items-center gap-2 border border-[#D32F2F]/20"><AlertTriangle size={16}/> {error}</div>}
                        <Button onClick={handleSendForgotOtp} fullWidth>{t.sendOtp}</Button>
                    </div>
                </>
            )}

            {viewState === 'forgot-otp' && (
                <>
                    <button onClick={() => setViewState('forgot')} className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100/10"><ChevronLeft size={24}/></button>
                    <h2 className="text-2xl font-bold mt-8 mb-2">{t.forgot.resetTitle}</h2>
                    <div className="space-y-4">
                        <input 
                            value={otp} onChange={e => setOtp(e.target.value)}
                            className={`w-full p-4 rounded-xl border outline-none ${inputClass}`} placeholder={t.otpPlaceholder}
                            maxLength={4}
                        />
                        
                        <div>
                            <div className="relative">
                                <input 
                                    type={showNewPass ? "text" : "password"}
                                    value={newPass} onChange={e => setNewPass(e.target.value)}
                                    className={`w-full p-4 rounded-xl border outline-none ${inputClass} pr-10`} placeholder={t.forgot.newPass}
                                />
                                <button 
                                    onClick={() => setShowNewPass(!showNewPass)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100"
                                >
                                    {showNewPass ? <LockOpen size={20} /> : <Lock size={20} />}
                                </button>
                            </div>
                            <p className={`text-[10px] mt-1 flex items-center gap-1 font-bold ${isNewPassValid ? 'text-green-500' : 'text-red-500'}`}>
                                <ShieldCheck size={12}/> {t.step3.passReq}
                            </p>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button onClick={handleResetPassword} fullWidth>{t.forgot.updatePass}</Button>
                    </div>
                </>
            )}

            {viewState === 'login' && (
                <>
                    <button onClick={onBack} className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100/10"><ChevronLeft size={24}/></button>
                    <h2 className="text-3xl font-bold mt-8 mb-2">{t.loginWelcome}</h2>
                    <p className="mb-8 opacity-60">{t.loginSubtitle}</p>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold ml-1 mb-1 block opacity-60">{t.accountNum}</label>
                            <input value={accountNum} onChange={(e) => setAccountNum(e.target.value)} className={`w-full p-4 rounded-xl border outline-none ${inputClass}`} placeholder={t.accountNum} />
                        </div>
                        <div>
                            <label className="text-xs font-bold ml-1 mb-1 block opacity-60">{t.password}</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className={`w-full p-4 rounded-xl border outline-none ${inputClass} pr-10`} 
                                    placeholder="••••••••" 
                                />
                                <button 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="text-right">
                            <span onClick={() => setViewState('forgot')} className={`text-xs font-semibold cursor-pointer hover:underline ${isDark ? 'text-blue-400' : 'text-[#0056D2]'}`}>{t.forgotPass}</span>
                        </div>
                    </div>
                    {error && <div className="mt-4 p-3 bg-[#D32F2F]/10 text-[#D32F2F] text-sm rounded-lg flex items-center gap-2 border border-[#D32F2F]/20"><AlertTriangle size={16}/> {error}</div>}
                    <div className="mt-auto mb-8">
                        <Button onClick={handleLogin} fullWidth>{t.login}</Button>
                        <div className="mt-4 text-center">
                            <span className="text-sm opacity-60">{t.noAccount}</span>
                            <span onClick={onBack} className={`font-bold text-sm cursor-pointer hover:underline ${isDark ? 'text-blue-400' : 'text-[#0056D2]'}`}>{t.registerNow}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginScreen;