
import { useState, useRef, useEffect } from 'react';
import { Bot, CircuitBoard } from "lucide-react";

/**
 * LYRA Chatbot Component
 * ------------------------------------------
 * - AI portfolio chatbot for Dhananjay's site.
 * - Responds to portfolio/about questions with built-in answers.
 * - Uses Perplexity AI API for extra/unknown questions. (see code below for API setup)
 * - Responsive & styled with electronics/circuit cues, including circuit board icon.
 * 
 * --- EDIT INSTRUCTIONS ---
 * - To add/edit LYRA's built-in answers: update the answerQuestion() function.
 * - To style or edit chatbot visuals: edit below (see headings in code).
 * - To change/fix chatbot API: scroll to fetchPerplexityAnswer().
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

// * ---- (1) You can set your Perplexity API key here temporarily for testing. ------
// * For production, integrate Supabase and store your secrets safely (see Lovable docs)
const PERPLEXITY_KEY_STORAGE = "perplexity_api_key"; // LocalStorage key

/**
 * Helper: Returns user's api key (stored for session) or asks for prompt.
 */
function getPerplexityKey(): string | null {
  return localStorage.getItem(PERPLEXITY_KEY_STORAGE) || null;
}

/**
 * Fetches answer from Perplexity.ai endpoint (used ONLY if built-in fails).
 */
async function fetchPerplexityAnswer(prompt: string): Promise<string> {
  const apiKey = getPerplexityKey();
  if (!apiKey) {
    return `To use AI answers, set your Perplexity API key (admin only): See LYRA.tsx file!`;
  }
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          { role: 'system', content: 'Be precise and concise. Only answer questions related to this website, Dhananjay Kumar Seth, or his engineering portfolio. If completely unrelated, politely refuse.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 500,
      }),
    });
    if (!response.ok) {
      return `The AI service is temporarily unavailable. Please try again later.`;
    }
    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content.trim();
    }
    return `Sorry, I couldn't get an answer from the AI.`;
  } catch (e) {
    return `Sorry, there was an error with the AI service.`;
  }
}

const Lyra = ({
  initialMessage = "Hi, I'm LYRA 🤖, your AI assistant! Ask me anything about Dhananjay's portfolio."
}: LyraProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isBouncing, setIsBouncing] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [apiKeyTemp, setApiKeyTemp] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
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

  // --- Responsive hack to cover full width on mobile
  useEffect(() => {
    // Nothing needed here; the responsive classes cover all cases
  }, []);

  // --- Toggle chat open/close (and stop bounce)
  const toggleChat = () => {
    setIsOpen((open) => !open);
    if (!isOpen) setIsBouncing(false);
  };

  /**
   * Main QA logic -- edit this function for custom answers.
   * * If returns undefined, fallback to Perplexity!
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
        lyraResp = await fetchPerplexityAnswer(input);
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

  // --- Save API key (admin only, not public-facing) ---
  const handleApiKeySave = () => {
    if (apiKeyTemp.trim().length > 20) {
      localStorage.setItem(PERPLEXITY_KEY_STORAGE, apiKeyTemp.trim());
      setShowKeyInput(false);
      setApiKeyTemp('');
    }
  };

  // --- Remove API key (for debugging/admin only) ---
  const handleApiKeyRemove = () => {
    localStorage.removeItem(PERPLEXITY_KEY_STORAGE);
    setShowKeyInput(false);
    setApiKeyTemp('');
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
          {/* API key settings for admin (hidden by default) */}
          <button
            onClick={() => setShowKeyInput(val => !val)}
            className="text-xs text-tech-light/80 hover:text-pink-400 border-none focus:outline-none ml-auto"
            style={{ display: "none" /* Show only for admin debug */ }}
            aria-label="Set API Key"
            title="Set Perplexity API key"
          >🔑</button>
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
          {/* API key admin UI (hidden unless toggled, for security) */}
          {showKeyInput && (
            <div className="p-3 text-xs bg-tech-dark/80 border rounded mb-3 text-tech-light">
              <input
                type="password"
                value={apiKeyTemp}
                onChange={e => setApiKeyTemp(e.target.value)}
                placeholder="Enter Perplexity API Key"
                className="bg-tech-blue/50 border px-2 py-1 rounded text-white w-48"
              />
              <button
                onClick={handleApiKeySave}
                className="ml-2 px-3 py-1 rounded bg-tech-purple text-white"
              >Set</button>
              <button
                onClick={handleApiKeyRemove}
                className="ml-2 px-2 py-1 rounded bg-gray-700/80 text-gray-200"
              >Clear</button>
              <span className="ml-2 text-yellow-300">For site admin only</span>
            </div>
          )}
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

        {/* ========= Footer: Editing instructions ========== */}
        <div className="px-4 py-1 text-[10px] text-tech-lightBlue/90 bg-tech-dark border-t border-tech-purple/10 rounded-b-xl">
          <p>
            <strong>Edit tips:</strong> 
            <br />
            - To add more topics, update <code>answerQuestion()</code> in <b>Lyra.tsx</b>.
            <br />
            - To change the fallback AI, update <code>fetchPerplexityAnswer()</code> setup at top.
            <br />
            - Change visuals and electronics style anywhere below the return statement.
          </p>
        </div>
      </div>
    </>
  );
};

export default Lyra;

