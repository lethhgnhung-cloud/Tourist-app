import React, { useState, useEffect, useRef } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Camera, Loader2, Sparkles, Plus, Edit2, Trash2, ChevronLeft, LockOpen, Lock, EyeOff, Eye, LockKeyhole } from 'lucide-react';
import Button from '../ui/Button';
import NotificationToast from '../ui/NotificationToast';
import StepsHeader from '../ui/StepsHeader';
import { TRANSLATIONS } from '../../constants';
import { Lang, Theme, User } from '../../types';

interface RegistrationFlowProps {
    onComplete: (user: User) => void;
    onBack: () => void;
    theme: Theme;
    lang: Lang;
}

const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ onComplete, onBack, theme, lang }) => {
    const [step, setStep] = useState(1);
    const [subStep2, setSubStep2] = useState(1); 
    const [subStep3, setSubStep3] = useState(1);
    const [showCVV, setShowCVV] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [pinVisible, setPinVisible] = useState(false);
    const [additionalCards, setAdditionalCards] = useState<any[]>([]);
    const [legalAgreed, setLegalAgreed] = useState(false);
    const [serviceAgreed, setServiceAgreed] = useState(false);
    const [newCardData, setNewCardData] = useState({ cardName: '', cardNumber: '', cardExp: '', cardCvv: '' });
    const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '', gender: 'Nam', email: '', otp: '', generatedAccount: '', password: '', pin: '', cardName: '', cardNumber: '', cardExp: '', cardCvv: '', balance: 15000000 });
    const [frontImg, setFrontImg] = useState<string | null>(null);
    const [backImg, setBackImg] = useState<string | null>(null);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(0); 
    const [notification, setNotification] = useState<{sender: string, title: string, message: string} | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Validation State
    const [isPassValid, setIsPassValid] = useState(false);
    const [isPinValid, setIsPinValid] = useState(false);

    const t = TRANSLATIONS[lang] || TRANSLATIONS['VIE']; 
    const isDark = theme === 'dark';
    const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]';
    const inputClass = isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-[#1A1F36]';

    const updateForm = (k: string, v: any) => setFormData(p => ({ ...p, [k]: v }));
    const updateNewCard = (k: string, v: any) => setNewCardData(p => ({ ...p, [k]: v }));
    
    // Card formatting: Group by 4 digits
    const formatCardNumber = (val: string) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();

    // OTP Timer
    useEffect(() => {
        let interval: any = null;
        if (timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timeLeft]);

    // Generate account number
    useEffect(() => {
        if (step === 3 && !formData.generatedAccount) {
            updateForm('generatedAccount', '88' + Math.floor(Math.random() * 100000000));
        }
    }, [step, formData.generatedAccount]);

    // Validation Logic
    useEffect(() => {
        const pass = formData.password;
        const hasLetter = /[a-zA-Z]/.test(pass);
        const hasNumber = /\d/.test(pass);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        setIsPassValid(pass.length > 8 && hasLetter && hasNumber && hasSpecial);

        const pin = formData.pin;
        setIsPinValid(pin.length === 4 && /^\d+$/.test(pin));
    }, [formData.password, formData.pin]);

    const handleBack = () => {
        if (step === 3) {
            if (subStep3 > 1) { setSubStep3(prev => prev - 1); return; } 
            setStep(2); setSubStep2(5); return; 
        }
        if (step === 2) {
            if (subStep2 > 1) { setSubStep2(prev => prev - 1); return; } 
            setStep(1); return; 
        }
        if (step === 1) { onBack(); return; }
    };

    const handleSendOtp = () => {
        if (!formData.name.trim() || !formData.email.trim()) {
            alert(t.validation.reqAll);
            return;
        }
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(code);
        setTimeLeft(120); 
        setTimeout(() => {
            setNotification({
                sender: t.emailSim.sender,
                title: t.emailSim.subject,
                message: `${t.emailSim.bodyPrefix} ${code} ${t.emailSim.bodySuffix}`
            });
            setTimeout(() => setNotification(null), 5000);
        }, 1000);
    };

    const handleVerifyOtp = () => {
        if (formData.otp === generatedOtp) {
            setStep(2); 
            setSubStep2(1); 
        } else {
            alert(t.validation.otpWrong);
        }
    };

    const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setIsAnalyzing(true);
                setAnalysisError('');
                setTimeout(() => {
                    setIsAnalyzing(false);
                    const result = e.target?.result as string;
                    if (subStep2 === 3) setFrontImg(result);
                    if (subStep2 === 3.5) setBackImg(result);
                    
                    if (subStep2 === 3) {
                        updateForm('cardNumber', '4220 1234 5678 9000');
                        updateForm('cardExp', '12/28');
                        updateForm('cardCvv', '123');
                        updateForm('cardName', formData.name.toUpperCase());
                    }
                }, 2000);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditCard = (card: any, index: number) => {
        setNewCardData(card);
        setEditingCardIndex(index);
        setSubStep3(3);
    }

    const handleAddCard = () => {
        if (!newCardData.cardNumber || !newCardData.cardCvv) {
             alert(t.validation.reqAll);
             return;
        }
        const len = newCardData.cardNumber.replace(/\s/g, '').length;
        if (len !== 16 && len !== 19) {
            alert(t.validation.cardNumLen);
            return;
        }
        const expParts = newCardData.cardExp.split('/');
        if (expParts.length === 2) {
             const month = parseInt(expParts[0], 10);
             if (month < 1 || month > 12) {
                 alert(t.validation.cardExpInvalid);
                 return;
             }
        }
        if (editingCardIndex !== null) {
            const updated = [...additionalCards];
            updated[editingCardIndex] = newCardData;
            setAdditionalCards(updated);
        } else {
            setAdditionalCards([...additionalCards, newCardData]);
        }
        setNewCardData({ cardName: '', cardNumber: '', cardExp: '', cardCvv: '' });
        setEditingCardIndex(null);
        setSubStep3(2);
    };

    const renderStep2Content = () => {
        // ... (unchanged code for step 2)
        switch(subStep2) {
            case 1:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right pt-4">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-[#0056D2] mb-4"><ShieldCheck size={40}/></div>
                            <h4 className="font-bold text-xl mb-2">{t.step2.introTitle}</h4>
                            <p className={`text-sm opacity-60`}>{t.step2.introDesc}</p>
                        </div>
                        <div className="space-y-3 mt-8">
                            <Button onClick={() => setSubStep2(2)} fullWidth>{t.step2.continue}</Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 animate-in slide-in-from-right pt-4">
                        <h4 className="font-bold text-lg">{t.step2.guideTitle}</h4>
                        <div className={`p-4 rounded-xl border-l-4 border-[#0056D2] ${isDark ? 'bg-gray-800' : 'bg-blue-50'}`}>
                            <p className="text-sm font-bold mb-2">{t.step2.guideDesc}</p>
                            <ul className="list-disc ml-5 text-sm space-y-1 opacity-80">{t.step2.guideNote.map((n, i) => <li key={i}>{n}</li>)}</ul>
                        </div>
                        <Button onClick={() => setSubStep2(3)} fullWidth>{t.step2.frontCam}</Button>
                    </div>
                );
            case 3:
            case 3.5:
                const isBack = subStep2 === 3.5;
                const currentImg = isBack ? backImg : frontImg;
                return (
                      <div className="space-y-4 animate-in slide-in-from-right h-full flex flex-col">
                          <h4 className="font-bold text-lg">{isBack ? t.step2.backCam : t.step2.frontCam}</h4>
                          <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleCapture} className="hidden" />
                          <div className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center relative overflow-hidden bg-black ${isDark ? 'border-gray-700' : 'border-blue-300'}`}>
                              {isAnalyzing ? (
                                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-20">
                                      <Loader2 className="animate-spin mb-2"/>
                                      <p className="text-sm">{t.validation.cardAnalyzing}</p>
                                  </div>
                              ) : currentImg ? (
                                  <div className="relative w-full h-full">
                                      <img src={currentImg} className="w-full h-full object-contain" />
                                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 p-4">
                                          <Button onClick={() => { if(isBack) setBackImg(null); else setFrontImg(null); fileInputRef.current?.click(); }} variant="secondary" className="!py-2 !px-4 text-sm bg-white/90">{t.step2.retake}</Button>
                                          <Button onClick={() => isBack ? setSubStep2(4) : setSubStep2(3.5)} className="!py-2 !px-4 text-sm">{t.step2.usePhoto}</Button>
                                      </div>
                                  </div>
                              ) : (
                                  <div className="flex flex-col items-center text-gray-400 cursor-pointer p-8" onClick={() => fileInputRef.current?.click()}>
                                      <Camera size={48} className="text-[#0056D2] mb-4 animate-pulse"/>
                                      <span className="text-sm text-[#0056D2] font-medium">{t.step2.tapCam}</span>
                                      {analysisError && <p className="text-[#D32F2F] text-xs mt-2 font-bold">{analysisError}</p>}
                                  </div>
                              )}
                          </div>
                      </div>
                );
            case 4:
                return (
                    <div className="space-y-4 animate-in slide-in-from-right">
                        <h4 className="font-bold text-lg">{t.step2.ocrTitle}</h4>
                        <div className="bg-[#388E3C]/10 p-3 rounded-lg flex items-center gap-2 text-[#388E3C] text-sm border border-[#388E3C]/20">
                            <Sparkles size={16}/> <span className="font-bold">Visa Signature Verified</span>
                        </div>
                        <div className={`p-4 rounded-xl border space-y-3 text-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700"><span>{t.fullName}:</span><b>{formData.name.toUpperCase()}</b></div>
                            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700"><span>{t.email}:</span><b>{formData.email}@gmail.com</b></div>
                            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700"><span>{t.step3.cardNum}:</span><b className="font-mono">{formData.cardNumber}</b></div>
                            <div className="flex justify-between items-center border-b pb-2 border-gray-200 dark:border-gray-700">
                                <span>{t.step3.cardCvv}:</span>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type={showCVV ? "text" : "password"} 
                                        value={formData.cardCvv} 
                                        onChange={(e) => updateForm('cardCvv', e.target.value)}
                                        className={`w-16 p-1 text-right bg-transparent border-b border-dashed focus:outline-none font-bold ${isDark ? 'border-gray-500' : 'border-gray-300'}`}
                                        maxLength={3}
                                    />
                                    <button onClick={() => setShowCVV(!showCVV)}>
                                        {showCVV ? <EyeOff size={14}/> : <Eye size={14}/>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {frontImg && <img src={frontImg} className="w-16 h-10 object-cover rounded border" />}
                            {backImg && <img src={backImg} className="w-16 h-10 object-cover rounded border" />}
                        </div>
                        <Button onClick={() => setSubStep2(5)} fullWidth>{t.confirmInfo}</Button>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4 animate-in slide-in-from-right flex flex-col h-full">
                        <h4 className="font-bold text-lg sticky top-0 bg-inherit py-2 z-10">{t.step2.legalTitle}</h4>
                        <div className={`flex-1 p-4 rounded-xl overflow-y-auto text-xs leading-relaxed border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'}`} style={{maxHeight: '350px'}}>
                            <p className="font-bold mb-1">{t.step2.legalHeader}</p>
                            <p className="mb-4 opacity-90">{t.step2.legalIntro}</p>
                            {t.step2.legalContent.map((section, i) => (
                                <div key={i} className="mb-4">
                                    <p className="font-bold mb-1 text-sm">{section.title}</p>
                                    <p className="opacity-90 whitespace-pre-line">{section.text}</p>
                                </div>
                            ))}
                        </div>
                        <label className="flex items-center gap-2 p-2 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 accent-[#0056D2]" checked={legalAgreed} onChange={e => setLegalAgreed(e.target.checked)} />
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-[#1A1F36]'}`}>{t.step2.confirmPolicy}</span>
                        </label>
                        <Button onClick={() => { 
                             if(!legalAgreed) return alert(t.validation.agreeReq);
                             setStep(3); 
                             setSubStep3(1); 
                        }} fullWidth>{t.step2.continue}</Button>
                    </div>
                );
            default: return null;
        }
    };

    const renderStep3Content = () => {
        if (subStep3 === 1) { 
            return (
                <div className="space-y-6 animate-in slide-in-from-right">
                    <h4 className="font-bold text-lg">{t.step3.accSetup}</h4>
                    <div className="bg-gradient-to-r from-[#0056D2] to-blue-800 text-white p-6 rounded-xl shadow-lg text-center">
                        <p className="text-blue-200 text-xs uppercase mb-1">{t.yourAccount}</p>
                        <p className="text-3xl font-mono font-bold tracking-wider">{formData.generatedAccount}</p>
                    </div>
                    
                    {/* Password Field */}
                    <div>
                        <label className={`text-xs font-bold block mb-1 opacity-60`}>{t.createPass}</label>
                        <div className="relative">
                            <input 
                                type={passwordVisible ? "text" : "password"} 
                                value={formData.password} 
                                onChange={e => updateForm('password', e.target.value)} 
                                className={`w-full p-3 border rounded-xl pr-10 outline-none ${inputClass}`} 
                            />
                            <button 
                                className="absolute right-3 top-3.5 opacity-50 hover:opacity-100 transition-colors"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? <LockOpen size={18}/> : <Lock size={18}/>}
                            </button>
                        </div>
                        {/* VALIDATION FEEDBACK FOR PASSWORD */}
                        <p className={`text-[10px] font-bold mt-1 flex items-center gap-1 ${isPassValid ? 'text-green-500' : 'text-[#D32F2F]'}`}>
                            <ShieldCheck size={12}/> {t.step3.passReq}
                        </p>
                    </div>

                    {/* Transaction PIN Field */}
                    <div>
                        <label className={`text-xs font-bold block mb-1 opacity-60`}>{t.createPin}</label>
                        <div className="relative">
                            <input 
                                type={pinVisible ? "text" : "password"} 
                                value={formData.pin} 
                                maxLength={4}
                                inputMode="numeric"
                                onChange={e => {
                                    const val = e.target.value.replace(/\D/g, ''); 
                                    if(val.length <= 4) updateForm('pin', val);
                                }} 
                                className={`w-full p-3 border rounded-xl pr-10 outline-none tracking-widest font-bold ${inputClass}`} 
                                placeholder={t.pinPlaceholder}
                            />
                            <button 
                                className="absolute right-3 top-3.5 opacity-50 hover:opacity-100 transition-colors"
                                onClick={() => setPinVisible(!pinVisible)}
                            >
                                {pinVisible ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>
                        {/* VALIDATION FEEDBACK FOR PIN */}
                        <p className={`text-[10px] font-bold mt-1 flex items-center gap-1 ${isPinValid ? 'text-green-500' : 'text-red-500'}`}>
                            <LockKeyhole size={12}/> {t.step3.pinReq}
                        </p>
                    </div>

                    <Button onClick={() => {
                        if (!isPassValid) {
                            return alert(t.validation.passWeak);
                        }
                        if (!isPinValid) {
                            return alert(t.validation.pinInvalid);
                        }
                        setSubStep3(2);
                    }} fullWidth>{t.step2.continue}</Button>
                </div>
            );
        } else if (subStep3 === 2) { 
            return (
                <div className="space-y-4 animate-in slide-in-from-right h-full overflow-y-auto pb-6">
                    <h4 className="font-bold text-lg">{t.step3.paymentSetup}</h4>
                    <div className={`p-4 rounded-xl border space-y-3 opacity-80 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-300 dark:border-gray-600">
                             <span className="font-bold text-[#0056D2] text-xs uppercase">Thẻ chính (OCR)</span>
                             <Lock size={14} className="text-gray-500"/>
                        </div>
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{t.step3.cardHolder}</label>
                            <input value={formData.cardName} readOnly className={`w-full p-2 border rounded outline-none text-sm bg-gray-200 text-gray-600 cursor-not-allowed`} />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{t.step3.cardNum}</label>
                            <input value={formData.cardNumber} readOnly className={`w-full p-2 border rounded outline-none text-sm font-mono bg-gray-200 text-gray-600 cursor-not-allowed`} />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{t.step3.cardExp}</label>
                                <input value={formData.cardExp} readOnly className={`w-full p-2 border rounded outline-none text-sm bg-gray-200 text-gray-600 cursor-not-allowed`} />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{t.step3.cardCvv}</label>
                                <input value={formData.cardCvv} readOnly className={`w-full p-2 border rounded outline-none text-sm bg-gray-200 text-gray-600 cursor-not-allowed`} />
                            </div>
                        </div>
                    </div>
                    
                    {additionalCards.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-500 uppercase">{t.step3.linkedCards}</p>
                            {additionalCards.map((card, index) => (
                                <div onClick={() => handleEditCard(card, index)} key={index} className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer hover:bg-gray-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                                        <div>
                                            <p className="text-xs font-bold">**** {card.cardNumber.slice(-4)}</p>
                                            <p className="text-[10px] opacity-70">{card.cardName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Edit2 size={16} className="text-blue-500"/>
                                        <button onClick={(e) => { e.stopPropagation(); setAdditionalCards(additionalCards.filter((_, i) => i !== index)); }} className="text-red-500 p-2 hover:bg-red-50 rounded-full"><Trash2 size={16}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button onClick={() => setSubStep3(3)} className="flex items-center gap-2 text-[#0056D2] text-sm font-bold p-3 hover:bg-blue-50 rounded-xl w-full justify-center border border-dashed border-blue-300 transition-colors">
                        <Plus size={16}/> {t.step3.addCard}
                    </button>

                    <label className="flex items-start gap-2 cursor-pointer mt-2 p-2 bg-gray-50 rounded-lg">
                        <input type="checkbox" className="mt-1 w-4 h-4 accent-[#0056D2]" checked={serviceAgreed} onChange={e => setServiceAgreed(e.target.checked)} />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t.agreeTerm}</span>
                    </label>

                    <Button onClick={() => { 
                          if(!serviceAgreed) return alert(t.validation.agreeReq);
                          const newUser = { ...formData, additionalCards, balance: 15000000 };
                          setStep(4);
                    }} fullWidth>{t.finish}</Button>
                </div>
            );
        } else if (subStep3 === 3) { 
            return (
                 <div className="space-y-4 animate-in slide-in-from-right">
                    <div className="flex items-center gap-2 mb-2">
                        <button onClick={() => setSubStep3(2)}><ChevronLeft/></button>
                        <h4 className="font-bold text-lg">{editingCardIndex !== null ? t.step3.editCardTitle : t.step3.addCardTitle}</h4>
                    </div>

                    <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{t.step3.cardHolder}</label>
                            <input value={newCardData.cardName} onChange={e => updateNewCard('cardName', e.target.value)} className={`w-full p-2 border rounded outline-none text-sm ${inputClass}`} placeholder="NGUYEN VAN B" />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{t.step3.cardNum}</label>
                            <input value={newCardData.cardNumber} onChange={e => { const val = e.target.value; if(val.replace(/\s/g,'').length <= 19) updateNewCard('cardNumber', formatCardNumber(val)); }} className={`w-full p-2 border rounded outline-none text-sm font-mono ${inputClass}`} placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{t.step3.cardExp}</label>
                                <input value={newCardData.cardExp} onChange={e => { let val = e.target.value.replace(/\D/g, ''); if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4); updateNewCard('cardExp', val); }} className={`w-full p-2 border rounded outline-none text-sm ${inputClass}`} placeholder="MM/YY" maxLength={5} />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">{t.step3.cardCvv}</label>
                                <input value={newCardData.cardCvv} onChange={e => updateNewCard('cardCvv', e.target.value)} className={`w-full p-2 border rounded outline-none text-sm ${inputClass}`} placeholder="CVV" maxLength={3} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                         <Button onClick={() => setSubStep3(2)} variant="secondary" className="flex-1">{t.step3.cancel}</Button>
                         <Button onClick={handleAddCard} className="flex-1">{t.step3.saveCard}</Button>
                    </div>
                 </div>
            );
        }
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div className="space-y-4 animate-in slide-in-from-right">
                        <h4 className="font-bold text-lg">{t.steps[0]}</h4>
                        <div>
                            <label className={`text-xs ml-1 mb-1 block opacity-60`}>{t.fullName} <span className="text-[#D32F2F]">*</span></label>
                            <input value={formData.name} onChange={e => updateForm('name', e.target.value)} className={`w-full p-3 border rounded-xl outline-none ${inputClass}`} placeholder={t.fullName} />
                        </div>
                        <div>
                            <label className={`text-xs ml-1 mb-1 block opacity-60`}>{t.gender}</label>
                            <select value={formData.gender} onChange={e => updateForm('gender', e.target.value)} className={`w-full p-3 border rounded-xl outline-none ${inputClass}`}>
                                <option>{t.genderOpt.male}</option>
                                <option>{t.genderOpt.female}</option>
                                <option>{t.genderOpt.other}</option>
                            </select>
                        </div>
                        <div>
                             <label className={`text-xs ml-1 mb-1 block opacity-60`}>{t.email} <span className="text-[#D32F2F]">*</span></label>
                             <div className="flex items-stretch rounded-xl overflow-hidden border">
                                 <input 
                                    value={formData.email} 
                                    onChange={e => updateForm('email', e.target.value)} 
                                    className={`flex-1 p-3 outline-none ${inputClass} border-none`} 
                                    placeholder="username" 
                                 />
                                 <div className={`px-3 flex items-center justify-center font-bold border-l ${isDark ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                     @gmail.com
                                 </div>
                             </div>
                             <div className="mt-2">
                                 <Button onClick={handleSendOtp} className="w-full text-xs" disabled={timeLeft > 0}>
                                     {timeLeft > 0 ? `${t.resendOtp} (${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')})` : t.sendOtp}
                                 </Button>
                             </div>
                        </div>
                        {generatedOtp && (
                            <div className="p-4 rounded-xl border bg-blue-50 border-blue-100">
                                <p className="text-xs text-[#0056D2] mb-2 flex items-center gap-1"><Mail size={12}/> {t.validation.otpSent}</p>
                                <input 
                                    value={formData.otp} 
                                    onChange={e => updateForm('otp', e.target.value)} 
                                    maxLength={4}
                                    className="w-full p-3 border rounded-xl outline-none text-center tracking-[1em] font-bold text-xl bg-white text-[#1A1F36]" 
                                    placeholder="----" 
                                />
                            </div>
                        )}
                        <Button onClick={handleVerifyOtp} fullWidth>{t.verifyContinue}</Button>
                    </div>
                );
            case 2: return renderStep2Content();
            case 3: return renderStep3Content();
            case 4:
                return (
                    <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in h-full">
                        <div className="w-24 h-24 bg-[#388E3C] rounded-full flex items-center justify-center mb-6 text-white shadow-xl animate-bounce">
                            <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{t.successTitle}</h3>
                        <p className={`text-center mb-8 px-8 opacity-60 leading-relaxed`}>{t.successDesc}</p>
                        <Button onClick={() => onComplete({ ...formData, additionalCards, balance: 15000000 })} fullWidth>{t.backLogin}</Button>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className={`flex flex-col h-full ${bgClass} relative`}>
            {notification && (
                <NotificationToast 
                    sender={notification.sender}
                    title={notification.title}
                    message={notification.message}
                    visible={!!notification}
                    onClose={() => setNotification(null)}
                />
            )}
            <StepsHeader step={step} onBack={handleBack} isDark={isDark} t={t} />
            <div className="flex-1 overflow-y-auto p-6">
                {renderStep()}
            </div>
        </div>
    );
};

export default RegistrationFlow;