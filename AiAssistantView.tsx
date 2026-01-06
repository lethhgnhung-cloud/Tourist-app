import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Sparkles, Send, Bot } from 'lucide-react';
import { TranslationStructure, Lang } from '../../types';

interface AiAssistantViewProps {
    onBack: () => void;
    t: TranslationStructure;
    theme: 'light' | 'dark';
    lang: Lang;
}

const AiAssistantView: React.FC<AiAssistantViewProps> = ({ onBack, t, theme, lang }) => {
    const isDark = theme === 'dark';
    const [messages, setMessages] = useState([{ role: 'system', text: t.ai.welcome }]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleSend = (textInput?: string) => {
        const textToSend = textInput || input;
        if (!textToSend.trim()) return;
        
        const newMsgs = [...messages, { role: 'user', text: textToSend }];
        setMessages(newMsgs);
        setInput('');
        
        setTimeout(() => {
            let response = lang === 'VIE' 
                ? "Hmm, mình chưa rõ lắm. Bạn thử hỏi về tỷ giá hay địa điểm du lịch xem sao nhé! 🤔"
                : "Hmm, I'm not sure. Try asking about exchange rates or tourist spots! 🤔";
            
            const lowerInput = textToSend.toLowerCase();
            
            if (lowerInput.includes('rate') || lowerInput.includes('giá') || lowerInput.includes('tỷ giá')) {
                response = lang === 'VIE' 
                    ? "Tỷ giá hiện tại nè bạn ơi: 1 USD ≈ 25,480 VND. Tỷ giá có thể thay đổi liên tục nha! 💸"
                    : "Current rate: 1 USD ≈ 25,480 VND. Rates fluctuate constantly! 💸";
            } else if (lowerInput.includes('hotel') || lowerInput.includes('khách sạn')) {
                response = lang === 'VIE' 
                    ? "Mình gợi ý bạn vài khách sạn xịn sò ở Quận 1 như Caravelle, Rex hay Majestic nhé. Bạn vào mục Tiện ích để đặt phòng nha! 🏨"
                    : "I recommend top hotels in District 1 like Caravelle, Rex, or Majestic. Check the Utilities section to book! 🏨";
            } else if (lowerInput.includes('hello') || lowerInput.includes('chào') || lowerInput.includes('hi')) {
                response = lang === 'VIE' 
                    ? "Chào bạn nha! Sẵn sàng khám phá Việt Nam tươi đẹp chưa nè? 🇻🇳 ✨"
                    : "Hello there! Ready to explore beautiful Vietnam? 🇻🇳 ✨";
            } else if (lowerInput.includes('phở') || lowerInput.includes('eat')) {
                response = lang === 'VIE'
                    ? "Phở Hòa Pasteur hoặc Phở Lệ là những lựa chọn tuyệt vời ở Sài Gòn! 🍜"
                    : "Pho Hoa Pasteur or Pho Le are great choices in Saigon! 🍜";
            } else if (lowerInput.includes('history') || lowerInput.includes('lịch sử')) {
                response = lang === 'VIE'
                    ? "Chợ Bến Thành được xây dựng từ năm 1912, là biểu tượng lịch sử của Sài Gòn qua nhiều thăng trầm. 🏛️"
                    : "Ben Thanh Market was built in 1912, a historical symbol of Saigon through many ups and downs. 🏛️";
            }

            setMessages(prev => [...prev, { role: 'system', text: response }]);
        }, 1000);
    };

    return (
        <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]'}`}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 pt-12 pb-4 text-white flex items-center gap-3 shadow-lg">
                <button onClick={onBack}><ChevronLeft/></button>
                <div>
                    <h3 className="font-bold flex items-center gap-2"><Sparkles size={18} className="text-yellow-300"/> Gemini AI Assistant</h3>
                    <p className="text-[10px] opacity-80">Powered by Google</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'system' && (
                            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mr-2 shrink-0 self-end mb-1">
                                <Bot size={16}/>
                            </div>
                        )}
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${m.role === 'user' ? 'bg-[#0056D2] text-white rounded-br-none' : (isDark ? 'bg-gray-800 text-white rounded-bl-none border border-gray-700' : 'bg-white text-gray-800 rounded-bl-none')}`}>
                            {m.text}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Suggested Prompts */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                {t.ai.suggestions.map((sug, i) => (
                    <button 
                        key={i} 
                        onClick={() => handleSend(sug)}
                        className={`text-xs whitespace-nowrap px-3 py-1.5 rounded-full border transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        {sug}
                    </button>
                ))}
            </div>

            <div className={`p-4 border-t flex gap-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <input 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    className={`flex-1 p-3 rounded-xl outline-none border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-200'}`}
                    placeholder={t.ai.placeholder}
                />
                <button onClick={() => handleSend()} className="bg-[#0056D2] text-white p-3 rounded-xl hover:bg-blue-700"><Send size={20}/></button>
            </div>
        </div>
    );
};

export default AiAssistantView;