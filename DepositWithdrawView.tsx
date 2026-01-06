import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Info } from 'lucide-react';
import Button from '../ui/Button';
import PinModal from '../ui/PinModal';
import { TRANSLATIONS } from '../../constants';
import { User, Lang, Theme, TranslationStructure } from '../../types';

interface DepositWithdrawViewProps {
    onBack: () => void;
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    t: TranslationStructure;
    theme: Theme;
    lang: Lang;
    user: User | null;
}

const DepositWithdrawView: React.FC<DepositWithdrawViewProps> = ({ onBack, balance, setBalance, t, theme, lang, user }) => {
    const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit'); 
    const [amount, setAmount] = useState(''); 
    const [currency, setCurrency] = useState('USD');
    const [showPinModal, setShowPinModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [pinAttempts, setPinAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutEnd, setLockoutEnd] = useState<number | null>(null);
    const isDark = theme === 'dark';

    useEffect(() => {
        const lockTime = localStorage.getItem('pinLockUntil');
        if (lockTime && parseInt(lockTime) > Date.now()) {
            setIsLocked(true);
            setLockoutEnd(parseInt(lockTime));
        } else {
            setIsLocked(false);
            setLockoutEnd(null);
            if (lockTime) localStorage.removeItem('pinLockUntil');
        }
    }, [showPinModal]);
    
    const rates: Record<string, {buy: number, sell: number}> = {
        USD: { buy: 25100, sell: 25480 },
        EUR: { buy: 26500, sell: 27200 },
        JPY: { buy: 160, sell: 168 },
        CNY: { buy: 3450, sell: 3600 },
        KRW: { buy: 18, sell: 20 },
        TWD: { buy: 780, sell: 820 }
    };
    const feePercent = 0.02; 

    const parseNumberInput = (value: string) => parseFloat(value.replace(/\./g, '')) || 0;
    const formatNumberInput = (value: string) => value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const numericAmount = parseNumberInput(amount);
    const rate = tab === 'deposit' ? rates[currency].buy : rates[currency].sell;
    
    const depositReceive = numericAmount * rate * (1 - feePercent);
    const depositFee = numericAmount * rate * feePercent;

    const withdrawFeeVND = numericAmount * feePercent;
    const withdrawAmountAfterFee = numericAmount - withdrawFeeVND;
    const withdrawReceiveForeign = withdrawAmountAfterFee / rate;
    const withdrawFeeForeign = withdrawFeeVND / rate;

    const handleConfirm = () => {
        if(numericAmount <= 0) return alert(t.deposit.alertAmount);
        if(tab === 'withdraw' && balance < numericAmount) return alert(t.deposit.alertBalance);
        setShowPinModal(true);
    };

    const submitTransaction = (pin: string) => {
        if (isLocked) return;

        if (pin !== user?.pin) {
            const newAttempts = pinAttempts + 1;
            setPinAttempts(newAttempts);
            if (newAttempts >= 5) {
                const lockUntil = Date.now() + 5 * 60 * 1000;
                setIsLocked(true);
                setLockoutEnd(lockUntil);
                localStorage.setItem('pinLockUntil', lockUntil.toString());
            } else {
                alert(t.validation.pinWrong);
            }
            return;
        }

        setShowPinModal(false);
        setIsSuccess(true);
        setPinAttempts(0);
        
        let newBalance = balance;
        if(tab === 'deposit') {
            newBalance += depositReceive;
        } else {
            newBalance -= numericAmount;
        }
        setBalance(newBalance);
    };

    return (
        <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]'}`}>
            <div className="bg-[#0056D2] p-4 pt-12 pb-8 text-white relative flex items-center justify-center">
                <button onClick={onBack} className="absolute top-12 left-4 p-2 hover:bg-white/10 rounded-full"><ChevronLeft/></button>
                <h3 className="text-center font-bold text-lg uppercase tracking-tight px-10 leading-tight">{t.deposit.title}</h3>
            </div>

            <PinModal 
                isOpen={showPinModal}
                onClose={() => setShowPinModal(false)}
                onSubmit={submitTransaction}
                attempts={pinAttempts}
                isLocked={isLocked}
                lockoutEnd={lockoutEnd}
                t={t}
                isDark={isDark}
            />

            {!isSuccess ? (
            <div className="flex-1 p-6 space-y-6 overflow-y-auto -mt-6">
                <div className={`flex p-1 rounded-2xl shadow-lg mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <button onClick={() => {setTab('deposit'); setAmount('');}} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${tab === 'deposit' ? 'bg-[#0056D2] text-white shadow-md' : 'opacity-50 hover:opacity-100'}`}>{t.deposit.tabDeposit}</button>
                    <button onClick={() => {setTab('withdraw'); setAmount('');}} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${tab === 'withdraw' ? 'bg-[#0056D2] text-white shadow-md' : 'opacity-50 hover:opacity-100'}`}>{t.deposit.tabWithdraw}</button>
                </div>

                <div className={`p-4 rounded-2xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <label className="text-xs font-bold opacity-60 uppercase block mb-3">
                        {lang === 'VIE' 
                            ? (tab === 'deposit' ? "Số tiền muốn nạp" : "Số tiền muốn rút (VND)")
                            : (tab === 'deposit' ? "Deposit Amount" : "Withdraw Amount (VND)")
                        }
                    </label>
                    <div className={`flex items-center rounded-xl p-2 border-2 transition-colors gap-2 ${isDark ? 'bg-gray-700 border-gray-600 focus-within:border-blue-400' : 'bg-gray-50 border-gray-200 focus-within:border-[#0056D2]'}`}>
                        <input 
                            type="text" 
                            value={amount} 
                            onChange={e => setAmount(formatNumberInput(e.target.value))} 
                            className={`flex-1 text-2xl font-bold outline-none bg-transparent placeholder-gray-400 pl-2 ${isDark ? 'text-white' : 'text-[#1A1F36]'}`} 
                            placeholder="0"
                        />
                        {tab === 'deposit' && (
                            <div className="relative border-l border-gray-300 dark:border-gray-500 pl-2">
                                <select 
                                    value={currency} 
                                    onChange={e => setCurrency(e.target.value)}
                                    className={`text-sm font-bold py-2 pr-1 rounded-lg outline-none border-none bg-transparent appearance-none ${isDark ? 'text-blue-300' : 'text-[#0056D2]'}`}
                                >
                                    {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronRight size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"/>
                            </div>
                        )}
                        {tab === 'withdraw' && <span className="font-bold text-sm px-2 text-gray-500">VND</span>}
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-xs opacity-60 text-right">{t.deposit.availBalance}: {balance.toLocaleString()} VND</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="opacity-70">{t.deposit.rate}</span>
                        <span className="font-bold">1 {currency} = {rate.toLocaleString()} VND</span>
                    </div>
                    
                    <div className="h-px bg-gray-200 opacity-20"></div>
                    
                    {tab === 'deposit' ? (
                        <>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs opacity-70 mb-1">{t.deposit.receive}</p>
                                    <span className="text-2xl font-bold text-[#0056D2]">
                                        {depositReceive.toLocaleString('vi-VN', {maximumFractionDigits:0})} VND
                                    </span>
                                </div>
                            </div>
                            <div className={`flex justify-between text-xs p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                                <span className="font-medium">{t.deposit.fee} (2.0%)</span>
                                <span className="font-bold">- {depositFee.toLocaleString('vi-VN', {maximumFractionDigits:0})} VND</span>
                            </div>
                        </>
                    ) : (
                        <>
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs opacity-70 mb-1">{t.deposit.receive}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-[#0056D2]">
                                            {withdrawReceiveForeign.toLocaleString('en-US', {maximumFractionDigits: 2})}
                                        </span>
                                        <select 
                                            value={currency} 
                                            onChange={e => setCurrency(e.target.value)}
                                            className={`text-lg font-bold outline-none border-b border-dashed border-gray-300 bg-transparent ${isDark ? 'text-blue-300' : 'text-[#0056D2]'}`}
                                        >
                                            {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex justify-between text-xs p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                                <span className="font-medium">{t.deposit.fee} (2.0%)</span>
                                <span className="font-bold">- {withdrawFeeForeign.toLocaleString('en-US', {maximumFractionDigits:2})} {currency}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className={`p-4 rounded-xl flex gap-3 items-start border ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-100'}`}>
                    <Info size={20} className="text-[#0056D2] shrink-0 mt-0.5"/>
                    <p className="text-xs leading-relaxed opacity-80">
                        {tab === 'deposit' 
                            ? t.deposit.infoDeposit
                            : t.deposit.infoWithdraw
                        }
                    </p>
                </div>
            </div>
            ) : (
                <div className={`flex flex-col h-full items-center justify-center p-6 animate-in zoom-in ${isDark ? 'text-white' : 'text-[#1A1F36]'}`}>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-lg">
                        <CheckCircle2 size={40}/>
                    </div>
                    <h3 className="text-xl font-bold">{t.deposit.success}</h3>
                    <p className="opacity-70 text-sm mb-4 text-center">
                        {t.deposit.availBalance}: <br/>
                        <b className="text-2xl text-[#0056D2]">{balance.toLocaleString()} VND</b>
                    </p>
                    <div className="flex gap-3 w-full">
                        <Button onClick={() => { setIsSuccess(false); setAmount(''); setPinAttempts(0); }} variant="secondary" fullWidth>{t.deposit.otherTrans}</Button>
                        <Button onClick={onBack} fullWidth>{t.deposit.backHome}</Button>
                    </div>
                </div>
            )}

            {!isSuccess && (
                <div className={`p-6 border-t safe-area-pb ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                    <Button onClick={handleConfirm} fullWidth disabled={numericAmount <= 0}>
                        {tab === 'deposit' ? t.deposit.confirmDeposit : t.deposit.confirmWithdraw}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DepositWithdrawView;