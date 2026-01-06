import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, Image as ImageIcon, QrCode, ScanLine, CreditCard, CheckCircle2, Share2, Home } from 'lucide-react';
import { TranslationStructure, User } from '../../types';
import NotificationToast from '../ui/NotificationToast';
import Button from '../ui/Button';
import PinModal from '../ui/PinModal';

interface ScanViewProps {
    onBack: () => void;
    t: TranslationStructure;
    onMyQr: () => void;
    user: User | null;
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const ScanView: React.FC<ScanViewProps> = ({ onBack, t, onMyQr, user, balance, setBalance }) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [notification, setNotification] = useState<{sender: string, title: string, message: string} | null>(null);
    const [viewState, setViewState] = useState<'scan' | 'form' | 'success'>('scan');
    
    // Transfer Form Data
    const [transferData, setTransferData] = useState({
        bank: 'Vietcombank',
        account: '',
        name: '',
        amount: '',
        content: ''
    });

    // PIN State
    const [showPinModal, setShowPinModal] = useState(false);
    const [pinAttempts, setPinAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutEnd, setLockoutEnd] = useState<number | null>(null);

    // Banks - Added Agribank
    const banks = ["Vietcombank", "Techcombank", "MBBank", "BIDV", "VietinBank", "Agribank"];

    useEffect(() => {
        // Check lock state
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

    const formatNumber = (value: string) => {
        // Remove non-digits
        const number = value.replace(/\D/g, '');
        // Add dots every 3 digits
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const formatted = formatNumber(val);
        setTransferData({ ...transferData, amount: formatted });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Simulate processing QR Code
            setTimeout(() => {
                // Simulate decoding data from QR
                setTransferData({
                    bank: 'Vietcombank',
                    account: '9988776655',
                    name: 'NGUYEN VAN B',
                    amount: '500.000',
                    content: 'Transfer via QR'
                });
                setViewState('form');
            }, 800);
        }
    };

    const handleManualEntry = () => {
        setViewState('form');
    };

    const handleTransferSubmit = () => {
        if (!transferData.account || !transferData.amount) return alert("Please fill in required fields.");
        const numAmount = parseInt(transferData.amount.replace(/\./g, ''));
        if (numAmount <= 0) return alert("Invalid amount.");
        if (numAmount > balance) return alert("Insufficient balance.");
        
        setShowPinModal(true);
    };

    const onPinSubmit = (pin: string) => {
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

        // Success
        setShowPinModal(false);
        setPinAttempts(0);
        const numAmount = parseInt(transferData.amount.replace(/\./g, ''));
        setBalance(prev => prev - numAmount);
        setViewState('success');
    };

    if (viewState === 'success') {
        return (
            <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white animate-in zoom-in duration-300">
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-lg animate-bounce">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Transaction Successful!</h2>
                    <p className="opacity-60 mb-8 text-sm">Your payment has been processed.</p>

                    <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm mb-8">
                        <div className="flex justify-between items-center mb-4 border-b border-dashed border-gray-200 dark:border-gray-600 pb-4">
                            <span className="text-sm opacity-60">Amount</span>
                            <span className="text-2xl font-bold text-[#0056D2]">{transferData.amount} VND</span>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="opacity-60">Recipient</span>
                                <span className="font-bold uppercase">{transferData.name || transferData.account}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-60">Bank</span>
                                <span className="font-bold">{transferData.bank}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-60">Time</span>
                                <span className="font-bold">{new Date().toLocaleTimeString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="opacity-60">Content</span>
                                <span className="font-medium text-right max-w-[150px] truncate">{transferData.content}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full">
                        <Button onClick={() => setViewState('scan')} variant="secondary" fullWidth className="flex-1">
                            <Home size={18} /> Home
                        </Button>
                        <Button onClick={() => alert("Share receipt simulated")} fullWidth className="flex-1">
                            <Share2 size={18}/> Share
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (viewState === 'form') {
        return (
            <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <PinModal 
                    isOpen={showPinModal}
                    onClose={() => setShowPinModal(false)}
                    onSubmit={onPinSubmit}
                    attempts={pinAttempts}
                    isLocked={isLocked}
                    lockoutEnd={lockoutEnd}
                    t={t}
                    isDark={false} 
                />
                
                <div className="p-4 pt-12 border-b flex items-center gap-3 shadow-sm bg-[#0056D2] text-white">
                    <button onClick={() => setViewState('scan')}><ChevronLeft/></button>
                    <h3 className="font-bold text-lg">Transfer Money</h3>
                </div>

                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-xs font-bold opacity-60 mb-1">Bank</label>
                        <select 
                            value={transferData.bank} 
                            onChange={e => setTransferData({...transferData, bank: e.target.value})}
                            className="w-full p-3 rounded-xl border outline-none bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                        >
                            {banks.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold opacity-60 mb-1">Account Number</label>
                        <input 
                            value={transferData.account} 
                            onChange={e => setTransferData({...transferData, account: e.target.value})}
                            className="w-full p-3 rounded-xl border outline-none bg-gray-50 dark:bg-gray-800 dark:border-gray-700" 
                            placeholder="Enter account number"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold opacity-60 mb-1">Recipient Name</label>
                        <input 
                            value={transferData.name} 
                            onChange={e => setTransferData({...transferData, name: e.target.value})}
                            className="w-full p-3 rounded-xl border outline-none bg-gray-50 dark:bg-gray-800 dark:border-gray-700 uppercase font-bold" 
                            placeholder="Recipient Name"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold opacity-60 mb-1">Amount (VND)</label>
                        <input 
                            value={transferData.amount} 
                            onChange={handleAmountChange}
                            className="w-full p-3 rounded-xl border outline-none bg-gray-50 dark:bg-gray-800 dark:border-gray-700 font-bold text-lg text-[#0056D2]" 
                            placeholder="0"
                            type="text" 
                            inputMode="numeric"
                        />
                        <p className="text-xs text-right mt-1 opacity-60">Balance: {balance.toLocaleString()} VND</p>
                    </div>
                    <div>
                        <label className="block text-xs font-bold opacity-60 mb-1">Content</label>
                        <input 
                            value={transferData.content} 
                            onChange={e => setTransferData({...transferData, content: e.target.value})}
                            className="w-full p-3 rounded-xl border outline-none bg-gray-50 dark:bg-gray-800 dark:border-gray-700" 
                            placeholder="Transfer content"
                        />
                    </div>
                </div>

                <div className="p-6 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700 safe-area-pb">
                    <Button onClick={handleTransferSubmit} fullWidth>Confirm Payment</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-black relative">
            {notification && (
                <NotificationToast 
                    sender={notification.sender}
                    title={notification.title}
                    message={notification.message}
                    visible={!!notification}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="absolute top-0 left-0 right-0 p-4 pt-12 z-20 flex justify-between items-center text-white bg-gradient-to-b from-black/60 to-transparent">
                <button onClick={onBack} className="p-2 bg-white/20 backdrop-blur rounded-full"><ChevronLeft/></button>
                <h3 className="font-bold text-2xl uppercase tracking-wider">{t.scan.title}</h3>
                <div className="w-10"></div>
            </div>
            
            <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center"><p className="text-white/30 text-xs">{t.scan.sim}</p></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
                        {/* Scan Frame Corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#0056D2] rounded-tl-xl -mt-1 -ml-1"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#0056D2] rounded-tr-xl -mt-1 -mr-1"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#0056D2] rounded-bl-xl -mb-1 -ml-1"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#0056D2] rounded-br-xl -mb-1 -mr-1"></div>
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                    </div>
                    <p className="text-white text-sm mt-8 font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur">{t.scan.instruction}</p>
                    
                    {/* Manual Entry Button - Blue Box */}
                    <button 
                        onClick={handleManualEntry}
                        className="mt-6 flex items-center gap-2 bg-[#0056D2] hover:bg-blue-600 shadow-lg shadow-blue-500/30 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all active:scale-95"
                    >
                        <CreditCard size={18}/> Enter Details Manually
                    </button>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 bg-gradient-to-t from-black/80 to-transparent z-20 flex justify-center gap-8">
                <input type="file" className="hidden" ref={fileRef} accept="image/*" onChange={handleFileUpload} />
                <button onClick={() => fileRef.current?.click()} className="flex flex-col items-center gap-2 text-white opacity-80 hover:opacity-100">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><ImageIcon size={20}/></div>
                    <span className="text-xs">{t.scan.gallery}</span>
                </button>
                <button onClick={onMyQr} className="flex flex-col items-center gap-2 text-white opacity-80 hover:opacity-100">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><QrCode size={20}/></div>
                    <span className="text-xs">{t.scan.myCode}</span>
                </button>
            </div>
            <style>{`@keyframes scan {0% { top: 10%; opacity: 0; }10% { opacity: 1; }90% { opacity: 1; }100% { top: 90%; opacity: 0; }}`}</style>
        </div>
    );
};

export default ScanView;