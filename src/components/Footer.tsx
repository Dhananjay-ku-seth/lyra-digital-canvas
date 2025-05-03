
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
              href="https://github.com/Dhananjay-ku-seth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-tech-purple transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/dhananjay-kumar-seth-4a5b31283/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-tech-purple transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/RedDEVILSGamer1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-tech-purple transition-colors"
              aria-label="Twitter Profile"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:adplayers746@gmail.com"
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
