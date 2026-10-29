import React from 'react';
import { Topic } from '../types';
import { SUGGESTED_TOPICS, PRACTICE_TOPICS, FOUNDATION_TOPICS } from '../constants';
import { 
  LayoutList, ArrowDownUp, Network, BookOpen, 
  MessageSquarePlus, Code2, Layers, Hammer, 
  BrainCircuit, CheckCircle, Cpu, Binary, BoxSelect
} from 'lucide-react';

interface SidebarProps {
  onSelectTopic: (prompt: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectTopic, onNewChat, isOpen, toggleSidebar }) => {
  
  // Helper to get icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutList': return <LayoutList size={18} />;
      case 'ArrowDownUp': return <ArrowDownUp size={18} />;
      case 'Network': return <Network size={18} />;
      case 'Code2': return <Code2 size={18} />;
      case 'Layers': return <Layers size={18} />;
      case 'Hammer': return <Hammer size={18} />;
      case 'BrainCircuit': return <BrainCircuit size={18} />;
      case 'CheckCircle': return <CheckCircle size={18} />;
      case 'Cpu': return <Cpu size={18} />;
      case 'Binary': return <Binary size={18} />;
      case 'BoxSelect': return <BoxSelect size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  const renderTopicList = (topics: Topic[], title: string, titleIcon: React.ReactNode, bgColorClass: string) => (
    <div className="mb-6">
       <h3 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
         {titleIcon}
         {title}
       </h3>
       <div className="space-y-1">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => { onSelectTopic(topic.prompt); if (window.innerWidth < 1024) toggleSidebar(); }}
              className={`w-full text-left flex items-center gap-3 p-2.5 rounded-lg transition-colors group ${bgColorClass}`}
            >
              <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">
                {getIcon(topic.icon)}
              </span>
              <span className="font-medium text-sm text-slate-600 group-hover:text-slate-900">{topic.title}</span>
            </button>
          ))}
       </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-20 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Content */}
      <aside 
        className={`fixed lg:relative inset-y-0 left-0 w-72 bg-white border-r border-slate-200 shadow-xl lg:shadow-none z-30 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Code2 size={24} />
              </div>
              <div>
                <h1 className="font-bold text-xl text-slate-800 tracking-tight">DSA Tutor</h1>
                <p className="text-xs text-slate-500 font-medium">C++ & Algorithms</p>
              </div>
            </div>

            <button 
              onClick={() => { onNewChat(); if (window.innerWidth < 1024) toggleSidebar(); }}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95"
            >
              <MessageSquarePlus size={18} />
              <span>New Conversation</span>
            </button>
          </div>

          {/* Topics List */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            
            {renderTopicList(
              FOUNDATION_TOPICS, 
              "Programming Foundation", 
              <Cpu size={14} />,
              "hover:bg-amber-50"
            )}

            {renderTopicList(
              SUGGESTED_TOPICS, 
              "Core Learning (C++)", 
              <BookOpen size={14} />,
              "hover:bg-indigo-50"
            )}

            {renderTopicList(
              PRACTICE_TOPICS, 
              "Practice & Grading", 
              <Hammer size={14} />,
              "hover:bg-emerald-50"
            )}

            <div className="mt-4 px-4 py-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Study Notes</h4>
              <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
                <li>Prioritize C++ for memory.</li>
                <li>Avoid STL (vector, list) initially.</li>
                <li>Implement struct/class manually.</li>
              </ul>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-slate-100 text-center">
             <p className="text-xs text-slate-400">Powered by Gemini 3.0 Pro</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;