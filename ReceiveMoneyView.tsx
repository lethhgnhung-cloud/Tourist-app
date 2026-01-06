import React, { useState } from 'react';
import { ChevronLeft, Copy } from 'lucide-react';
import { TranslationStructure, User } from '../../types';

interface ReceiveMoneyViewProps {
    onBack: () => void;
    accountNum: string;
    user: User | null;
    t: TranslationStructure;
    theme: 'light' | 'dark';
}

const ReceiveMoneyView: React.FC<ReceiveMoneyViewProps> = ({ onBack, accountNum, user, t, theme }) => {
    const [customAmount, setCustomAmount] = useState('');
    const [content, setContent] = useState('');
    // Use Vietcombank BIN (970436) for standard VietQR generation
    const bankId = '970436'; 
    const isDark = theme === 'dark';
    
    // Process account name to be uppercase and unsigned for better compatibility
    const removeAccents = (str: string) => { return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D"); };
    const accountName = user?.name ? removeAccents(user.name.toUpperCase()) : "ALEX NGUYEN";
    
    const parseNumberInput = (value: string) => parseFloat(value.replace(/\./g, '')) || 0;
    const formatNumberInput = (value: string) => value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Correctly structured VietQR URL with parameters
    const amountVal = parseNumberInput(customAmount);
    // Base URL structure: https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png
    let qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNum}-compact.png`;
    
    // Append parameters manually to ensure correctness
    const params = new URLSearchParams();
    if (amountVal > 0) params.append('amount', amountVal.toString());
    if (content) params.append('addInfo', content);
    if (accountName) params.append('accountName', accountName);
    
    const finalQrUrl = `${qrUrl}?${params.toString()}`;

    return (
        <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-[#0056D2]'} relative`}>
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 pt-12 z-20 flex justify-center items-center text-white">
                <button onClick={onBack} className="absolute left-4 p-2 hover:bg-white/10 rounded-full"><ChevronLeft/></button>
                <h3 className="font-bold text-2xl uppercase tracking-tight">RECEIVE MONEY</h3>
            </div>

            {/* Main Content Area - Dark Card Style */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 pt-24 pb-8 animate-in slide-in-from-bottom duration-500">
                <div className="w-full max-w-sm bg-[#1e2330] rounded-3xl shadow-2xl p-6 flex flex-col items-center text-white relative border border-gray-700/50">
                    
                    {/* QR Card - White Container */}
                    <div className="bg-white rounded-2xl p-4 w-full mb-6 relative shadow-lg transform transition-transform hover:scale-[1.02]">
                        {/* QR Code */}
                        <div className="aspect-square w-full bg-white flex items-center justify-center relative">
                            <img src={finalQrUrl} className="w-full h-full object-contain" alt="QR Code" />
                        </div>

                        {/* Footer Logos */}
                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-1">
                                <span className="text-blue-900 font-bold text-[10px] italic">napas247</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-green-600 font-bold text-[10px]">Vietcombank</span>
                            </div>
                        </div>
                    </div>

                    {/* Account Info */}
                    <h4 className="font-bold text-lg text-blue-400 mb-1 uppercase tracking-wide">{accountName}</h4>
                    <p className="text-xs text-gray-400 mb-6 text-center leading-relaxed">Joint Stock Commercial Bank for Foreign<br/>Trade of Vietnam</p>

                    {/* Inputs */}
                    <div className="w-full space-y-3 mb-6">
                        <input 
                            type="text" 
                            value={customAmount} 
                            onChange={e => setCustomAmount(formatNumberInput(e.target.value))} 
                            className="w-full p-4 text-sm bg-[#2c3240] border border-gray-700 rounded-xl outline-none focus:border-blue-500 transition-colors text-center text-white placeholder-gray-500 focus:bg-[#363d4e]" 
                            placeholder={t.receive.amountPlace} 
                        />
                        <input 
                            type="text" 
                            value={content} 
                            onChange={e => setContent(e.target.value)} 
                            className="w-full p-4 text-sm bg-[#2c3240] border border-gray-700 rounded-xl outline-none focus:border-blue-500 transition-colors text-center text-white placeholder-gray-500 focus:bg-[#363d4e]" 
                            placeholder={t.receive.placeholder} 
                        />
                    </div>

                    {/* Footer Button */}
                    <div className="w-full mt-auto pt-4 border-t border-gray-700/50">
                        <button 
                            onClick={() => { navigator.clipboard.writeText(finalQrUrl).then(() => alert("Copied!")); }} 
                            className="w-full bg-[#2c3240] hover:bg-[#363d4e] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
                        >
                            <Copy size={18} />
                            {t.receive.copy}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiveMoneyView;