import { useState } from 'react';
import CircuitBackground from '@/components/CircuitBackground';
import Lyra from '@/components/Lyra';

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLyraResponse, setShowLyraResponse] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setShowLyraResponse(true);
      }, 1000);
    }, 1500);
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setIsSubmitted(false);
    setShowLyraResponse(false);
  };

  return (
    <main className="min-h-screen pt-20 pb-16 relative overflow-hidden">
      <CircuitBackground />
      
      <div className="container-custom opacity-0 animate-fade-in">
        <h1 className="section-heading text-center mx-auto">Contact Me</h1>
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="animate-slide-up">
            <div className="bg-tech-dark/80 backdrop-blur-md rounded-lg border border-tech-purple/20 p-6 card-hover transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 text-tech-lightBlue">Get In Touch</h2>
              
              <p className="text-gray-300 mb-8">
                Thank you for visiting my portfolio! I'm always open to discussing new projects, 
                opportunities, or tech innovations. Feel free to reach out using the form or 
                connect with me through the channels below.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 bg-tech-purple/20 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tech-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Email</h3>
                    <p className="text-gray-300 mt-1">dhananjay.ks@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-tech-pink/20 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tech-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Location</h3>
                    <p className="text-gray-300 mt-1">GITA Autonomous College, Bhubaneswar, Odisha</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-tech-lightBlue/20 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tech-lightBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4.364-0.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Social Media</h3>
                    <div className="flex space-x-4 mt-3">
                      <a 
                        href="#" 
                        className="p-2 bg-tech-dark border border-tech-purple/30 rounded-full hover:bg-tech-purple/10 transition-colors"
                        aria-label="GitHub"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tech-purple" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      <a 
                        href="#" 
                        className="p-2 bg-tech-dark border border-tech-pink/30 rounded-full hover:bg-tech-pink/10 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tech-pink" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                        </svg>
                      </a>
                      <a 
                        href="#" 
                        className="p-2 bg-tech-dark border border-tech-lightBlue/30 rounded-full hover:bg-tech-lightBlue/10 transition-colors"
                        aria-label="Twitter"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tech-lightBlue" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-tech-dark/80 backdrop-blur-md rounded-lg border border-tech-purple/20 p-6 card-hover transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 text-tech-lightBlue">Send a Message</h2>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-tech-dark border ${
                        errors.name ? 'border-red-500' : 'border-tech-purple/30'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-purple/50 text-white`}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  
                  <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-tech-dark border ${
                        errors.email ? 'border-red-500' : 'border-tech-purple/30'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-purple/50 text-white`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 bg-tech-dark border ${
                        errors.message ? 'border-red-500' : 'border-tech-purple/30'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-purple/50 text-white`}
                      placeholder="Enter your message"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in ${
                      isSubmitting
                        ? 'bg-tech-purple/50 cursor-not-allowed'
                        : 'bg-tech-purple hover:bg-tech-purple/90'
                    } text-white`}
                    style={{ animationDelay: '0.6s' }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 animate-scale-up">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 animate-slide-up">Thank You!</h3>
                  <p className="text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Your message has been sent successfully. 
                    {showLyraResponse && (
                      <span className="block mt-2 text-tech-purple animate-fade-in">
                        LYRA will notify Dhananjay soon!
                      </span>
                    )}
                  </p>
                  <button 
                    onClick={resetForm}
                    className="px-6 py-2 bg-tech-dark border border-tech-purple text-tech-purple rounded-lg hover:bg-tech-purple/10 transition-all duration-300 transform hover:scale-105 animate-fade-in"
                    style={{ animationDelay: '0.4s' }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Lyra initialMessage="This is the contact section. Feel free to send Dhananjay a message, and I'll make sure he receives it promptly!" />
    </main>
  );
};

export default Contact;
