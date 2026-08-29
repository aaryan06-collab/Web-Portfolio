import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { quickReplies, getReply } from '../data/kb';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m Aaryan\'s portfolio assistant. Ask me anything — or tap a quick question below.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: getReply(text) }]);
    }, 350);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-[70] w-14 h-14 rounded-full bg-accent text-white shadow-xl flex items-center justify-center hover:bg-accent-light transition-colors"
        aria-label="Chat with portfolio assistant"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-[70] w-[min(92vw,20rem)] bg-dark-card border border-dark-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '26rem' }}
          >
            <div className="px-4 py-3 border-b border-dark-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white text-sm font-medium">Portfolio Assistant</span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2" style={{ minHeight: '10rem' }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'ml-auto bg-accent/20 text-accent-light border border-accent/20'
                      : 'bg-white/5 text-gray-300 border border-dark-border'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20 hover:bg-accent/20 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="px-3 py-3 border-t border-dark-border flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask me anything..."
                className="flex-1 bg-dark border border-dark-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-accent/50 placeholder-gray-600"
                aria-label="Chat message"
              />
              <button
                onClick={() => send()}
                className="shrink-0 w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center hover:bg-accent-light transition-colors"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
