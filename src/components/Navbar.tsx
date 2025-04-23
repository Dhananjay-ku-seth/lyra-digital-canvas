
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const mobileNavLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, [scrolled]);

  // Prevent background scroll and ensure body state clean-up
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [mobileOpen]);

  // Fix for rare mobile bug: explicitly close on route change/hash change, etc
  useEffect(() => {
    const closeMenu = () => setMobileOpen(false);
    window.addEventListener("resize", closeMenu);
    window.addEventListener("orientationchange", closeMenu);
    window.addEventListener("hashchange", closeMenu);
    return () => {
      window.removeEventListener("resize", closeMenu);
      window.removeEventListener("orientationchange", closeMenu);
      window.removeEventListener("hashchange", closeMenu);
    }
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-tech-dark/90 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-tech-lightBlue"
        >
          DKS<span className="text-tech-pink">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {mobileNavLinks.map(link => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors duration-300 z-[60] focus:outline-none active:scale-95"
          aria-label="Toggle Menu"
          onClick={() => setMobileOpen(v => !v)}
          tabIndex={0}
        >
          {/* Hamburger lines */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-7 h-7 transition-transform duration-200 ${mobileOpen ? "-rotate-90" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm flex flex-col md:hidden transition"
          onClick={() => setMobileOpen(false)}
          style={{
            touchAction: 'none',
            WebkitTapHighlightColor: "rgba(0,0,0,0)"
          }}
        >
          <nav
            className="bg-tech-dark w-full py-12 flex flex-col gap-5 items-center animate-slide-down"
            onClick={e => e.stopPropagation()}
            tabIndex={0}
          >
            {mobileNavLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xl font-semibold nav-link py-2"
                onClick={() => setMobileOpen(false)}
                tabIndex={0}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
