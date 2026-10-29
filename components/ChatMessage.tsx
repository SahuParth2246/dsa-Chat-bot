import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Role } from '../types';
import { Bot, User, Copy, Check } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={`group flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] lg:max-w-[80%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
        } shadow-sm mt-1`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Bubble */}
        <div className={`flex-1 relative`}>
           <div className={`px-5 py-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
             isUser 
               ? 'bg-indigo-600 text-white rounded-tr-none' 
               : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
           }`}>
             {message.isThinking ? (
               <div className="flex items-center gap-2 text-slate-500">
                 <div className="flex gap-1 h-3">
                   <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                   <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                   <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                 </div>
                 <span className="text-xs font-medium">Thinking...</span>
               </div>
             ) : (
               <div className={`markdown-content ${isUser ? 'text-white' : ''}`}>
                 <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeText = String(children).replace(/\n$/, '');
                        // Generate a simple unique ID based on length and content prefix
                        const codeIndex = codeText.length; 

                        return !inline && match ? (
                          <div className="relative group/code my-4 rounded-lg overflow-hidden border border-slate-200 bg-slate-900">
                            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-slate-400 text-xs border-b border-slate-700">
                              <span className="font-mono font-medium text-slate-300">{match[1]}</span>
                              <button 
                                onClick={() => handleCopy(codeText, codeIndex)}
                                className="flex items-center gap-1.5 hover:text-white transition-colors"
                              >
                                {copiedIndex === codeIndex ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                <span>{copiedIndex === codeIndex ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                            <pre className="p-4 overflow-x-auto bg-slate-900 text-slate-100 font-mono text-xs md:text-sm">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>
                        ) : (
                          <code className={`font-mono text-[0.9em] px-1.5 py-0.5 rounded ${
                            isUser ? 'bg-indigo-700/50 text-indigo-50 border border-indigo-500/30' : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`} {...props}>
                            {children}
                          </code>
                        );
                      },
                      p: ({children}) => <p className="mb-3 last:mb-0">{children}</p>,
                      ul: ({children}) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                      li: ({children}) => <li className="pl-1">{children}</li>,
                      h1: ({children}) => <h1 className="text-lg font-bold mb-2 mt-4">{children}</h1>,
                      h2: ({children}) => <h2 className="text-base font-bold mb-2 mt-3">{children}</h2>,
                      h3: ({children}) => <h3 className="text-sm font-bold mb-2 mt-2">{children}</h3>,
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-slate-300 pl-4 py-1 my-3 text-slate-500 italic bg-slate-50 rounded-r">
                          {children}
                        </blockquote>
                      ),
                      a: ({children, href}) => (
                         <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{children}</a>
                      )
                    }}
                 >
                   {message.content}
                 </ReactMarkdown>
               </div>
             )}
           </div>
           
           {/* Timestamp */}
           <div className={`mt-1 text-[10px] text-slate-400 font-medium ${isUser ? 'text-right pr-1' : 'text-left pl-1'}`}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;