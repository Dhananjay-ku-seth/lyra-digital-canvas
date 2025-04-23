import { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'lyra';
  timestamp: Date;
};

type LyraProps = {
  initialMessage?: string;
};

const Lyra = ({
  initialMessage = "Hi, I'm LYRA, your assistant! Ask me anything about Dhananjay's portfolio."
}: LyraProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isBouncing, setIsBouncing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: initialMessage,
        sender: 'lyra',
        timestamp: new Date()
      }
    ]);
    const t = setTimeout(() => setIsBouncing(false), 5000);
    return () => clearTimeout(t);
  }, [initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen((open) => !open);
    if (!isOpen) setIsBouncing(false);
  };

  function answerQuestion(userInput: string): string {
    const input = userInput.toLowerCase();

    if (
      /project|work|portfolio/.test(input)
    ) {
      return "Dhananjay's portfolio highlights his major projects in game development (Roblox, Unity) and electronics (like his Line Follower Robot). Check the Projects section for full details!";
    }
    if (
      /education|study|college|school/.test(input)
    ) {
      return "Dhananjay studies Electronics & Communication Engineering at GITA Autonomous College. His earlier studies were at Vikash Institute and Kendriya Vidyalaya, Barmer.";
    }
    if (
      /skill|experience|expertise|technolog/.test(input)
    ) {
      return "Skills: Game Development (Roblox, Unity), Electronics Engineering, Problem Solving, Coding. Check the About section for more!";
    }
    if (
      /resume|cv/.test(input)
    ) {
      return "You can download or view Dhananjay's resume in the Resume section of this site.";
    }
    if (
      /contact|hire|email|message/.test(input)
    ) {
      return "Reach out via the Contact section; LYRA will make sure he receives your message quickly!";
    }
    if (
      /hello|hi|hey|greetings/.test(input)
    ) {
      return "Hello! I'm LYRA, Dhananjay's cheerful AI. Ask me about projects, skills, education or how to reach Dhananjay!";
    }
    if (
      /about you|who are you|lyra/.test(input)
    ) {
      return "I'm LYRA, your AI portfolio assistant! My job is to help you explore Dhananjay's site and answer your questions.";
    }
    if (
      /site|navigation|help/.test(input)
    ) {
      return "Use the top navigation bar to browse About, Projects, Resume or Contact. Or just keep chatting with me for info!";
    }
    return "I can answer anything about Dhananjay or his portfolio! Ask about projects, skills, education, or how to get in touch.";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const lyraResp = answerQuestion(input);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: lyraResp,
          sender: 'lyra' as const,
          timestamp: new Date()
        }
      ]);
    }, 900);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-5 right-5 z-50 bg-tech-purple text-white rounded-full p-4 shadow-xl drop-shadow-lg
          hover:bg-tech-purple/90 focus:outline-none focus:ring-2 focus:ring-tech-purple focus:ring-offset-2
          transition-all duration-300 ${isBouncing ? 'animate-bounce-gentle' : ''}
          `}
        aria-label="Open chat with LYRA"
        style={{ boxShadow: '0 6px 26px 2px #b5aaf6ea' }}
      >
        {!isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="5" width="18" height="14" rx="4" strokeWidth="2" stroke="currentColor" />
            <circle cx="8" cy="11" r="1" fill="currentColor" />
            <circle cx="12" cy="11" r="1" fill="currentColor" />
            <circle cx="16" cy="11" r="1" fill="currentColor" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="5" width="18" height="14" rx="4" strokeWidth="2" stroke="currentColor" />
            <path d="M9.5 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        )}
      </button>

      <div
        className={`
          fixed z-50 transition-all duration-300
          ${isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'}
          bg-tech-dark border border-tech-purple/40 shadow-2xl
          rounded-xl flex flex-col
          w-[95vw] max-w-md md:w-96 max-h-[90vh] bottom-5 right-2
          md:right-5 md:bottom-20
        `}
        style={{
          left: isOpen && window.innerWidth < 640 ? 0 : 'auto',
          right: isOpen && window.innerWidth < 640 ? 0 : '2rem',
          width: isOpen && window.innerWidth < 640 ? '100vw' : undefined
        }}
      >
        <div className="flex items-center bg-tech-purple text-white p-4 rounded-t-xl gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-tech-pink/70 shadow-lg font-bold text-lg">
            <span>L</span>
          </div>
          <div>
            <h3 className="font-bold text-base">LYRA <span className="text-xs font-normal text-tech-neon/80">AI</span></h3>
            <p className="text-xs text-tech-light/70">Ask me anything about this portfolio</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-tech-blue/30 p-4 space-y-5" style={{ maxHeight: '52vh' }}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col gap-1 
                ${m.sender === 'lyra' ? 'items-start' : 'items-end'}
              `}
            >
              <div
                className={`
                  px-4 py-2 rounded-2xl
                  max-w-[80vw] md:max-w-[70%]
                  text-sm
                  break-words
                  shadow
                  ${m.sender === 'lyra'
                    ? 'bg-tech-pink/15 text-tech-light border-tech-pink/20 border rounded-bl-none'
                    : 'bg-tech-purple/20 text-white border-tech-purple/20 border rounded-br-none'
                  }
                `}
              >{m.text}</div>
              <span className="text-[11px] text-gray-400" style={{ alignSelf: m.sender === 'lyra' ? 'flex-start' : 'flex-end' }}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex p-3 gap-2 border-t border-tech-purple/20 bg-tech-dark rounded-b-xl"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="
              flex-1 px-4 py-2 bg-tech-blue border border-tech-purple/30 rounded-l-lg
              text-white placeholder:text-tech-light/60 focus:outline-none focus:ring-2 focus:ring-tech-purple
              text-sm
            "
            placeholder="Type your question or say hi..."
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="
              bg-tech-purple text-white rounded-r-lg px-5 py-2 font-bold
              hover:bg-tech-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center"
            aria-label="Send"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M22 2L11 13" strokeLinecap="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        <div className="px-4 py-1 text-[10px] text-tech-lightBlue/80 bg-tech-dark border-t border-tech-purple/10 rounded-b-xl">
          <p>
            <strong>How to edit LYRA:</strong> Update the <code>answerQuestion()</code> function for custom Q&A; change styles in this file for look; to add real AI, replace with an API call.
          </p>
        </div>
      </div>
    </>
  );
};

export default Lyra;
