/**
 * Root component.
 *
 * The site is a single page with anchored sections (About, Projects, Skills, Experience, Education, Contact).
 * The old multi-page addresses still work: they redirect to the matching section.
 */
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BackToTop, ScrollProgress } from "@/components/Interactive";
import LazyLyra from "@/components/LazyLyra";
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/** Old page address -> the same content as a section of the single page (keeping any ?filters). */
const ToSection = ({ hash }: { hash: string }) => {
  const { search } = useLocation();
  return <Navigate to={{ pathname: "/", search, hash }} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <ScrollProgress />
      <BackToTop />
      <BrowserRouter>
        <a href="#about" className="skip-link">Skip to content</a>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<ToSection hash="#about" />} />
          <Route path="/projects" element={<ToSection hash="#projects" />} />
          <Route path="/resume" element={<ToSection hash="#experience" />} />
          <Route path="/contact" element={<ToSection hash="#contact" />} />
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
        <LazyLyra />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
