import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  RefreshCw,
  Copy,
  Check,
  BookOpen,
  Camera,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Pill,
  Trash2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { MedicineSpec } from '../types/pharmacy';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AIChatbotViewProps {
  medicines: MedicineSpec[];
  onOpenDatabase?: (medicineId?: string) => void;
  onOpenScanner?: () => void;
  onOpenBatchVerifier?: () => void;
}

export const AIChatbotView: React.FC<AIChatbotViewProps> = ({
  medicines,
  onOpenDatabase,
  onOpenScanner,
  onOpenBatchVerifier
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Hello! I am your **MedVerify AI Pharmacist & Monograph Assistant**.\n\nI have direct access to our verified 20-medicine pharmaceutical reference database (including **Sertraline, Lithosun, Paracetamol, Amoxicillin, Metformin, Lipitor, Pantoprazole**, and more) as well as active regulatory counterfeit recall notices.\n\nHow can I help you today? You can ask about:\n• Pill deboss imprints & physical dimensions\n• Packaging authenticity & 45° Optical Variable Ink\n• Batch number syntax validation\n• Known counterfeit flaws and adulterants`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    'How do I check if my Sertraline 50mg is genuine?',
    'What does the imprint "LITHO 300" mean on a pill?',
    'Explain the 45° Optical Variable Ink test',
    'Is batch JK4829 on any counterfeit recall list?',
    'What are the authentic packaging specs for Pantoprazole 40mg?',
    'What should authentic Amoxicillin capsules look like?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const historyPayload = messages.concat(userMsg).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          userMessage: text.trim()
        })
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error(data.error || 'Failed to receive reply');
      }
    } catch (err: any) {
      console.error('Chat send error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `I encountered an issue connecting to the AI verification core. Please make sure the server is online and try asking your question again.\n\n*Technical note: ${err?.message || 'Network error'}*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-reset',
        role: 'assistant',
        content: `Conversation reset. Ask me anything about medicine identification, imprints, blister packaging, or counterfeit batch recall notices!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to render markdown-like text cleanly with bold and bullet lists
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Bold rendering
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={pIdx} className="italic text-slate-700">{part.slice(1, -1)}</em>;
        }
        return part;
      });

      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-800 my-0.5 leading-relaxed">
            {renderedLine}
          </li>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-slate-800 leading-relaxed my-0.5">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto py-2">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-teal-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-teal-950/60 shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-sans">
                MedVerify AI Pharmacist Assistant
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-teal-200/80 mt-0.5">
              Grounded in 20 official medicine monographs, GS1 batch regex standards, and CDSCO/FDA recall feeds.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleClearChat}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            title="Reset Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Main Chat Box & Quick Prompts Area */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden flex flex-col h-[640px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4 text-teal-200" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm space-y-1.5 shadow-xs relative group ${
                    isUser
                      ? 'bg-teal-700 text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[10px] font-mono opacity-70 mb-1">
                    <span className="font-bold">
                      {isUser ? 'You' : 'MedVerify AI Assistant'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className={`space-y-1 ${isUser ? 'text-white' : 'text-slate-800'}`}>
                    {isUser ? (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div>{renderFormattedContent(msg.content)}</div>
                    )}
                  </div>

                  {!isUser && (
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-2">
                        {onOpenDatabase && (
                          <button
                            onClick={() => onOpenDatabase()}
                            className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>Database</span>
                          </button>
                        )}
                        {onOpenScanner && (
                          <button
                            onClick={onOpenScanner}
                            className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <Camera className="w-3 h-3" />
                            <span>Scanner</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Copied
                          </span>
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-teal-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Bot className="w-4 h-4 text-teal-200 animate-pulse" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-teal-800 font-bold font-mono">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Cross-referencing monographs & recall bulletins...</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Questions Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 overflow-x-auto flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
            <Sparkles className="w-3 h-3 text-teal-600" />
            Quick Prompts:
          </span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-[11px] font-semibold text-slate-700 whitespace-nowrap transition-colors shadow-2xs cursor-pointer shrink-0 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Textarea & Send Button */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-end gap-2 bg-slate-50 border border-slate-300 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about pill imprints, packaging authentication, batch checks, or counterfeit alerts..."
              className="flex-1 bg-transparent resize-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden max-h-28 py-1.5 px-2"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim() || isLoading}
              className="p-2.5 bg-teal-700 hover:bg-teal-600 text-white rounded-xl shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 px-1">
            <span>Powered by Gemini 3.8 Flash • Preliminary Verification Assistance</span>
            <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
};
