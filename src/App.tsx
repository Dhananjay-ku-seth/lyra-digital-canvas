
/**
 * Root Application Component
 * 
 * This is the main application component that sets up:
 * 1. React Query for data fetching
 * 2. Tooltip provider for UI tooltips
 * 3. Toast notifications (both standard and Sonner)
 * 4. React Router for navigation
 * 
 * Layout Structure:
 * - Navbar (fixed at top)
 * - Main content area (flex-grow)
 * - Footer (fixed at bottom)
 * 
 * Route Configuration:
 * - / -> Home page
 * - /about -> About page
 * - /projects -> Projects showcase
 * - /resume -> Resume/CV
 * - /contact -> Contact form
 * - * -> 404 Not Found
 * 
 * To add new routes:
 * 1. Import the new page component
 * 2. Add a new Route element inside Routes
 * 3. Update the Navbar component if needed
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
