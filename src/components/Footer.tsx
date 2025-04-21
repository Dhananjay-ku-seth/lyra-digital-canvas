
/**
 * Footer Component
 * 
 * A responsive footer with social links and copyright information.
 * Features:
 * - Glassmorphism design
 * - Responsive layout
 * - Social media links
 * - Copyright information
 */
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 bg-tech-dark/80 backdrop-blur-md border-t border-tech-purple/20 mt-auto">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-tech-purple transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-tech-purple transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-400 hover:text-tech-purple transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Dhananjay Kumar Seth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
