import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import CircuitBackground from '@/components/CircuitBackground';
import Lyra from '@/components/Lyra';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen pt-20 pb-16 relative flex flex-col items-center justify-center">
      <CircuitBackground />
      
      <div className="text-center z-10 animate-fade-in">
        <div className="text-9xl font-bold text-tech-purple mb-4">404</div>
        <h1 className="text-4xl font-bold mb-6 text-white">Page Not Found</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Return to Home
        </Link>
      </div>
      
      <Lyra initialMessage="Oops! It seems like you've reached a page that doesn't exist. Let me help you navigate back to the main sections of Dhananjay's portfolio." />
    </main>
  );
};

export default NotFound;
