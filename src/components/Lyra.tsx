import { useState, useRef, useEffect } from 'react';
import { Bot, CircuitBoard } from "lucide-react";

/**
 * LYRA Chatbot Component
 * ------------------------------------------
 * - AI portfolio chatbot for Dhananjay's site.
 * - Responds to portfolio/about questions with built-in answers.
 * - Uses OpenAI API for extra/unknown questions.
 * - Responsive & styled with electronics/circuit cues, including circuit board icon.
 * 
 * --- EDIT INSTRUCTIONS ---
 * - To add/edit LYRA's built-in answers: update the answerQuestion() function.
 * - To style or edit chatbot visuals: edit below (see headings in code).
 * - To change/fix chatbot API: scroll to fetchOpenAIAnswer().
 */

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'lyra';
  timestamp: Date;
};

type LyraProps = {
  initialMessage?: string;
};

// API key is hardcoded here (NOT SHOWN IN UI)
const OPENAI_API_KEY = "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";

/**
 * Fetches answer from OpenAI API endpoint (used ONLY if built-in fails).
 */
async function fetchOpenAIAnswer(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Be precise and concise. Only answer questions related to this website, Dhananjay Kumar Seth, or his engineering portfolio. If completely unrelated, politely refuse.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 500,
      }),
    });
    
    if (!response.ok) {
      console.error('Error with OpenAI API');
      return useGenericFallback(prompt);
    }
    
    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content.trim();
    }
    return useGenericFallback(prompt);
  } catch (e) {
    console.error('Exception in AI service:', e);
    return useGenericFallback(prompt);
  }
}

// Helper function to provide some generic responses when API fails
function useGenericFallback(input: string): string {
  const lowerInput = input.toLowerCase();
  
  // Check for common question patterns
  if (lowerInput.includes('who') || lowerInput.includes('what')) {
    return "Dhananjay is an Electronics and Communication Engineering student with expertise in game development and electronics. He studies at GITA Autonomous College in Bhubaneswar.";
  }
  
  if (lowerInput.includes('project') || lowerInput.includes('work')) {
    return "Dhananjay's projects include game development in Roblox and Unity, as well as electronics projects like a Line Follower Robot and Wireless Health Monitor. Check the Projects section for more details!";
  }
  
  if (lowerInput.includes('contact') || lowerInput.includes('reach')) {
    return "You can contact Dhananjay through the form on the Contact page. He's also available on various social media platforms listed there.";
  }
  
  // Default response
  return "I'm LYRA, an AI assistant for Dhananjay's portfolio. I might not have all the answers, but I can help you navigate the site and learn about his work in game development and electronics.";
}

const Lyra = ({
  initialMessage = "Hi, I'm LYRA 🤖, your AI assistant! Ask me anything about Dhananjay's portfolio."
}: LyraProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isBouncing, setIsBouncing] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Load initial message on mount
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

  // --- Always scroll to last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  /**
   * Main QA logic -- edit this function for custom answers.
   * * If returns undefined, fallback to OpenAI!
   */
  function answerQuestion(userInput: string): string | undefined {
    const input = userInput.toLowerCase();

    // PRESCRIPTED ANSWERS:
    if (/project|work|portfolio/.test(input)) {
      return "Dhananjay's portfolio features major projects in game development (Roblox, Unity) and electronics (including a Line Follower Robot). See Projects section for details!";
    }
    if (/education|study|college|school/.test(input)) {
      return "Dhananjay studies Electronics & Communication Engineering at GITA Autonomous College. Schooling: Vikash Institute and Kendriya Vidyalaya Barmer.";
    }
    if (/skill|experience|expertise|technolog/.test(input)) {
      return "Skills: Game Development (Roblox, Unity), Electronics, Problem Solving, Coding. Check About section for more info!";
    }
    if (/resume|cv/.test(input)) {
      return "View or download Dhananjay's resume in the Resume section of this site.";
    }
    if (/contact|hire|email|message/.test(input)) {
      return "Reach out using the Contact section; LYRA will make sure he receives your message quickly!";
    }
    if (/hello|hi|hey|greetings/.test(input)) {
      return "Hello! I'm LYRA, Dhananjay's cheerful AI. Ask about projects, skills, education or how to reach Dhananjay!";
    }
    if (/about you|who are you|lyra/.test(input)) {
      return "I'm LYRA, your AI portfolio assistant! My job is to help you explore Dhananjay's site and answer questions.";
    }
    if (/site|navigation|help/.test(input)) {
      return "Use the top navigation bar to browse About, Projects, Resume or Contact. Or just keep chatting with me.";
    }
    if (/what can you do|features|capabilities/.test(input)) {
      return "I can answer questions about Dhananjay's education, projects, skills, and help you navigate this site. Just ask me anything portfolio-related!";
    }
    if (/tech|technology|tools|languages|frameworks/.test(input)) {
      return "Dhananjay works with various technologies including Unity, Roblox Studio, Arduino, and electronic circuit design tools. His projects showcase both software and hardware skills.";
    }
    if (/game|gaming|unity|roblox/.test(input)) {
      return "Dhananjay has developed several games using Unity and Roblox, including a 3D platformer and an arcade game collection. Check the Projects section for more details!";
    }
    if (/electronics|arduino|circuit|hardware/.test(input)) {
      return "Electronics is one of Dhananjay's core skills. He's created projects like a Line Follower Robot, VLSI Circuit Design, and a Wireless Health Monitor.";
    }
    if (/background|animated|components/.test(input)) {
      return "The animated electronic components you see in the background are SVG illustrations representing various electronic parts like resistors, capacitors, ICs, and microcontrollers - reflecting Dhananjay's interest in electronics!";
    }
    // --- (Add more static responses above this line!) ---
    // If not matched, return undefined to trigger AI fallback.
    return undefined;
  }

  /**
   * Handles form submit event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isWaiting) return;
    const userMsg = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsWaiting(true);

    // Check for built-in answer, else AI
    const builtin = answerQuestion(input);
    setTimeout(async () => {
      let lyraResp: string;
      if (builtin) {
        lyraResp = builtin;
      } else {
        lyraResp = await fetchOpenAIAnswer(input);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: lyraResp,
          sender: 'lyra' as const,
          timestamp: new Date()
        }
      ]);
      setIsWaiting(false);
    }, 700);
  };

  return (
    <>
      {/* --- Floating circular bot button, bottom corner --- */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-5 right-5 z-50 bg-tech-purple text-white rounded-full p-4 shadow-xl drop-shadow-lg
          hover:bg-tech-purple/90 focus:outline-none focus:ring-2 focus:ring-tech-purple focus:ring-offset-2
          transition-all duration-300 ${isBouncing ? 'animate-bounce-gentle' : ''}
          lg:bottom-7 lg:right-8
          `}
        aria-label="Open chat with LYRA"
        style={{ boxShadow: '0 6px 26px 2px #b5aaf6ea' }}
      >
        {!isOpen ? (
          <Bot className="h-7 w-7" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="5" width="18" height="14" rx="4" strokeWidth="2" stroke="currentColor" />
            <path d="M9.5 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* --- Responsive Chat Window --- */}
      <div
        className={`
          fixed z-50 transition-all duration-300
          ${isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'}
          bg-tech-dark border border-tech-purple/40 shadow-2xl
          rounded-xl flex flex-col
          w-[97vw] max-w-[98vw] md:w-96 max-w-md
          md:right-7 md:bottom-24
          max-h-[92vh] bottom-5 right-2
        `}
        style={{
          left: isOpen && window.innerWidth < 640 ? 0 : 'auto',
          right: isOpen && window.innerWidth < 640 ? 0 : '2rem',
          width: isOpen && window.innerWidth < 640 ? '100vw' : undefined
        }}
      >
        {/* ========= Chatbot header bar (with icon) ========== */}
        <div className="flex items-center bg-tech-purple text-white p-4 rounded-t-xl gap-3 border-b border-tech-pink/20">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-tech-pink/85 shadow-lg font-bold text-lg border-2 border-tech-purple/80">
            {/* Electronic/Circuit Look: Lucide "circuit-board" as icon */}
            <CircuitBoard className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
              LYRA <span className="text-xs font-light rounded px-2 py-1 ml-1 bg-tech-dark/30 border border-pink-300/10">AI Assistant</span>
            </h3>
            <div className="text-[11px] text-tech-light/80">Your electronics portfolio chatbot</div>
          </div>
          <div className="flex-1"></div>
        </div>

        {/* ========= Chat message area ========= */}
        <div
          className="flex-1 overflow-y-auto bg-tech-blue/30 p-4 space-y-5"
          style={{ maxHeight: '52vh' }}
        >
          {/* List of all messages (user or lyra) */}
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
                  max-w-[85vw] md:max-w-[75%]
                  text-sm
                  break-words
                  shadow
                  border
                  font-sans
                  ${m.sender === 'lyra'
                    ? 'bg-tech-pink/20 text-tech-light border-tech-pink/25 rounded-bl-none'
                    : 'bg-tech-purple/15 text-white border-tech-purple/15 rounded-br-none'
                  }
                `}
              >
                {m.text}
              </div>
              <span className="text-[11px] text-gray-400" style={{ alignSelf: m.sender === 'lyra' ? 'flex-start' : 'flex-end' }}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {/* Always scroll to here */}
          <div ref={messagesEndRef} />
        </div>

        {/* ========== Chat input =========== */}
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
            placeholder={isWaiting ? "LYRA is thinking..." : "Type your question or say hi..."}
            aria-label="Chat input"
            disabled={isWaiting}
          />
          <button
            type="submit"
            disabled={!input.trim() || isWaiting}
            className="
              bg-tech-purple text-white rounded-r-lg px-5 py-2 font-bold
              hover:bg-tech-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center
            "
            aria-label="Send"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M22 2L11 13" strokeLinecap="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        {/* ========= Footer: Edit information ========== */}
        <div className="px-4 py-2 text-[11px] text-tech-lightBlue/70 bg-tech-dark border-t border-tech-purple/10 rounded-b-xl">
          <p>Ask me anything about Dhananjay, his projects, skills, or portfolio!</p>
        </div>
      </div>
    </>
  );
};

// Define toggleChat function which was used within the component
const toggleChat = () => {
  setIsOpen((open) => !open);
  if (!isOpen) setIsBouncing(false);
};

export default Lyra;
