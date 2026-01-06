import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NotificationToastProps {
    message: string;
    sender: string;
    title: string;
    visible: boolean;
    onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, sender, title, visible, onClose }) => {
    if (!visible) return null;
    return (
        <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-4 z-[100] border-l-4 border-[#0056D2] animate-in slide-in-from-top duration-500 cursor-pointer" onClick={onClose}>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 bg-[#D32F2F] rounded text-white flex items-center justify-center text-[10px] font-bold">M</div>
                    <span className="text-xs font-bold text-gray-500">GMAIL • Now</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-gray-400 hover:text-gray-600"><X size={14}/></button>
            </div>
            <h4 className="font-bold text-[#1A1F36] text-sm">{sender}</h4>
            <p className="text-xs font-semibold text-gray-800 mt-1">{title}</p>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{message}</p>
        </div>
    );
};

export default NotificationToast;