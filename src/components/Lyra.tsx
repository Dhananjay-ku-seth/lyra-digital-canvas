
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

const Lyra = ({ initialMessage = "Hi, I'm LYRA, your assistant! I'm here to guide you through Dhananjay's portfolio. How can I assist you today?" }: LyraProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isBouncing, setIsBouncing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial message
    const initialMsg: Message = {
      id: '1',
      text: initialMessage,
      sender: 'lyra',
      timestamp: new Date()
    };
    setMessages([initialMsg]);
    
    // Stop bouncing after a few seconds
    const bouncingTimeout = setTimeout(() => {
      setIsBouncing(false);
    }, 5000);
    
    return () => clearTimeout(bouncingTimeout);
  }, [initialMessage]);

  useEffect(() => {
    // Scroll to the bottom of the messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // If opening, stop bouncing
    if (!isOpen) {
      setIsBouncing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Generate LYRA's response after a short delay
    setTimeout(() => {
      const lyraResponse = generateResponse(input);
      const lyraMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: lyraResponse,
        sender: 'lyra',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, lyraMessage]);
    }, 1000);
  };

  // Simple response generation - in a real app, this could be connected to an API
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('project') || input.includes('work')) {
      return "Dhananjay has worked on several exciting projects, including game development in Roblox and Unity, as well as electronics engineering projects like a Line Follower Robot. You can check them out in the Projects section!";
    } else if (input.includes('education') || input.includes('study') || input.includes('college')) {
      return "Dhananjay is currently in his 4th year of Electronics and Communication Engineering at GITA Autonomous College, Bhubaneswar. He completed his +2 from Vikash Group of Institute, Bargarh, and his 10th from Kendriya Vidyalaya, Barmer.";
    } else if (input.includes('skill') || input.includes('experience')) {
      return "Dhananjay specializes in Game Development and Electronics Engineering. He has expertise in Roblox, Unity, and various electronics projects.";
    } else if (input.includes('resume') || input.includes('cv')) {
      return "You can view and download Dhananjay's resume in the Resume section of this portfolio.";
    } else if (input.includes('contact') || input.includes('hire') || input.includes('email')) {
      return "You can get in touch with Dhananjay through the Contact section. I'll make sure he receives your message promptly!";
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm LYRA, Dhananjay's AI assistant. How can I help you navigate his portfolio today?";
    } else if (input.includes('who are you') || input.includes('about you')) {
      return "I'm LYRA, an AI assistant created to help visitors navigate Dhananjay's portfolio. I can answer questions about his projects, skills, education, and more!";
    } else {
      return "I'm here to help you learn more about Dhananjay and his work. Feel free to ask about his projects, education, skills, or how to contact him!";
    }
  };

  return (
    <>
      {/* Chat bubble button - fixed at bottom right */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-5 right-5 z-50 bg-tech-purple text-white rounded-full p-4 shadow-lg
          transition-all duration-300 hover:bg-tech-purple/90 focus:outline-none focus:ring-2 focus:ring-tech-purple/70 focus:ring-offset-2
          ${isBouncing ? 'animate-bounce-gentle' : ''}`}
        aria-label={isOpen ? 'Close chat' : 'Open chat with LYRA'}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div 
        className={`fixed bottom-20 right-5 w-80 md:w-96 bg-tech-dark border border-tech-purple/30 rounded-lg shadow-2xl shadow-tech-purple/20 z-50 transition-all duration-300 transform 
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-tech-purple text-white p-4 rounded-t-lg flex items-center">
          <div className="w-8 h-8 bg-tech-pink rounded-full flex items-center justify-center mr-3">
            <span className="font-bold">L</span>
          </div>
          <div>
            <h3 className="font-bold">LYRA</h3>
            <p className="text-xs text-tech-light/80">AI Assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 bg-tech-blue/30">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 max-w-3/4 ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
            >
              <div 
                className={`p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-tech-purple/20 text-white rounded-br-none ml-auto' 
                    : 'bg-tech-pink/20 text-white rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
              <div 
                className={`text-xs text-gray-400 mt-1 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-tech-purple/30 bg-tech-dark rounded-b-lg">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask LYRA something..."
              className="flex-1 py-2 px-3 bg-tech-blue border border-tech-purple/30 rounded-l-md focus:outline-none focus:ring-1 focus:ring-tech-purple text-white"
            />
            <button
              type="submit"
              className="bg-tech-purple text-white py-2 px-4 rounded-r-md hover:bg-tech-purple/90 transition-colors"
              disabled={!input.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Lyra;
