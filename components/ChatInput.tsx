import React, { useState, useRef, useEffect } from 'react';
import { Send, StopCircle } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  return (
    <div className="bg-white border-t border-slate-200 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask about algorithms, data structures..."
            rows={1}
            disabled={isLoading}
            className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-3 min-h-[48px] max-h-[150px] text-slate-800 placeholder-slate-400 text-sm md:text-base disabled:opacity-50"
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`flex-shrink-0 p-3 rounded-xl transition-all duration-200 ${
              input.trim() && !isLoading
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transform hover:-translate-y-0.5' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
             {isLoading ? (
               <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
             ) : (
               <Send size={20} />
             )}
          </button>
        </form>
        
        <div className="text-center mt-2">
           <p className="text-[10px] text-slate-400">
             Tip: Press Shift + Enter for a new line. AI can make mistakes, please verify important info.
           </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;