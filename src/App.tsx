
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
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { BackToTop, CursorGlow, ScrollProgress, SpotlightGlobal } from "@/components/Interactive";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollProgress />
      <CursorGlow />
      <SpotlightGlobal />
      <BackToTop />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <a href="#main" className="skip-link">Skip to content</a>
          <Navbar />
          <div className="flex-grow">
            <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
