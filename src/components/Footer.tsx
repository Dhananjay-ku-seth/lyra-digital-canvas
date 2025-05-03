
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
import { Github, Linkedin, Mail, Twitter, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 bg-tech-dark/80 backdrop-blur-md border-t border-tech-purple/20 mt-auto">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/dhananjay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-tech-purple transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/dhananjay-kumar-seth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-tech-purple transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/dhananjay_ks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-tech-purple transition-colors"
              aria-label="Twitter Profile"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:dhananjay.ks@example.com"
              className="text-gray-400 hover:text-tech-purple transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="tel:+919876543210"
              className="text-gray-400 hover:text-tech-purple transition-colors"
              aria-label="Phone"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
          
          {/* Quick Links */}
          <div className="flex gap-4 mb-4 md:mb-0">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contact" className="text-gray-400 hover:text-tech-purple">
                Contact
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/resume" className="text-gray-400 hover:text-tech-purple">
                Resume
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/projects" className="text-gray-400 hover:text-tech-purple">
                Projects
              </Link>
            </Button>
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
