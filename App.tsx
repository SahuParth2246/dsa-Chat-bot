import React, { useState, useEffect, useRef } from 'react';
import { Menu, GraduationCap } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { Message, Role } from './types';
import { sendMessageStream } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: Role.MODEL,
      content: 'Hello! I am your AI assistant specialized in **Data Structures and Algorithms** for Engineering. \n\nWe focus on C++, Memory Management, and Hardware Applications. What would you like to learn today?',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: Role.USER,
      content: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const tempBotMessageId = uuidv4();
    // Add a placeholder "Thinking" message
    setMessages(prev => [...prev, {
      id: tempBotMessageId,
      role: Role.MODEL,
      content: '',
      isThinking: true,
      timestamp: Date.now()
    }]);

    try {
      let accumulatedResponse = "";
      
      await sendMessageStream(
        messages.concat(userMessage),
        text,
        (chunkText) => {
          accumulatedResponse = chunkText;
          setMessages(prev => prev.map(msg => 
            msg.id === tempBotMessageId 
              ? { ...msg, content: accumulatedResponse, isThinking: false } 
              : msg
          ));
        }
      );
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === tempBotMessageId 
          ? { ...msg, content: '**Connection Error.** Please try again later.', isThinking: false } 
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: uuidv4(),
        role: Role.MODEL,
        content: 'We have started a new session. What topic would you like to discuss?',
        timestamp: Date.now()
      }
    ]);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        onSelectTopic={(prompt) => handleSendMessage(prompt)}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className="flex-1 flex flex-col h-full relative w-full">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <GraduationCap size={20} />
             </div>
             <span className="font-bold text-slate-800">DSA Tutor</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar scroll-smooth">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default App;