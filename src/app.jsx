import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, Instagram, Mail } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('head-staff');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('tfr-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('tfr-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
      
      const reveals = document.querySelectorAll('.scroll-reveal');
      reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your message has been sent successfully!"
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const academyData = {
    'head-staff': [
      { name: 'Alex Rodriguez', role: 'Manager', image: 'Professional esports manager with headset', description: 'Leading TFR with 8+ years of esports management experience' },
      { name: 'Sarah Chen', role: 'Coordinator', image: 'Female esports coordinator at desk', description: 'Coordinating all academy operations and player development' },
      { name: 'Marcus Johnson', role: 'Head Coach', image: 'Male esports coach analyzing gameplay', description: 'Strategic mastermind with championship coaching background' },
      { name: 'Emma Wilson', role: 'Analyst', image: 'Female data analyst with multiple monitors', description: 'Performance analysis expert optimizing team strategies' }
    ],
    'pubg-mobile': [
      { name: 'Jake Thompson', role: 'IGL', image: 'Male PUBG Mobile player focused on phone', description: 'In-game leader with tactical expertise' },
      { name: 'Ryan Davis', role: 'Fragger', image: 'Male gamer playing PUBG Mobile intensely', description: 'Aggressive player with high elimination rate' },
      { name: 'Tyler Brown', role: 'Support', image: 'Male PUBG player in team jersey', description: 'Support specialist ensuring team coordination' },
      { name: 'Connor Wilson', role: 'Sniper', image: 'Male esports player with precision aim', description: 'Long-range elimination expert' },
      { name: 'Austin Miller', role: 'Assault', image: 'Male PUBG Mobile competitive player', description: 'Frontline assault specialist' },
      { name: 'Sophia Martinez', role: 'IGL', image: 'Female PUBG Mobile player leading team', description: 'Female team captain with strategic mind' },
      { name: 'Isabella Garcia', role: 'Fragger', image: 'Female gamer playing PUBG Mobile competitively', description: 'Aggressive female player with high KD ratio' },
      { name: 'Mia Rodriguez', role: 'Support', image: 'Female PUBG player in gaming setup', description: 'Support player ensuring team success' },
      { name: 'Ava Johnson', role: 'Sniper', image: 'Female esports sniper with headset', description: 'Precision shooter with excellent aim' },
      { name: 'Charlotte Lee', role: 'Assault', image: 'Female PUBG Mobile pro player', description: 'Frontline female assault specialist' },
      { name: 'Coach Mike', role: 'Head Coach', image: 'Male PUBG Mobile coach analyzing strategies', description: 'PUBG Mobile coaching expert' },
      { name: 'Coach Lisa', role: 'Assistant Coach', image: 'Female esports coach with tablet', description: 'Assistant coach specializing in player development' },
      { name: 'Manager Tom', role: 'Team Manager', image: 'Male team manager in esports facility', description: 'Managing PUBG Mobile academy operations' }
    ],
    'fifa': [
      { name: 'Diego Santos', role: 'FIFA Pro', image: 'Male FIFA player with controller', description: 'FIFA champion with multiple tournament wins' },
      { name: 'Coach Roberto', role: 'FIFA Coach', image: 'Male FIFA coach analyzing gameplay', description: 'FIFA coaching specialist and former pro player' }
    ],
    'valorant': [
      { name: 'Alex Kim', role: 'Duelist', image: 'Male Valorant player aiming precisely', description: 'Entry fragger with exceptional aim' },
      { name: 'Jordan Smith', role: 'Controller', image: 'Male Valorant controller player', description: 'Smoke specialist controlling map areas' },
      { name: 'Casey Brown', role: 'Initiator', image: 'Male Valorant initiator player', description: 'Information gatherer and team setup specialist' },
      { name: 'Taylor Wilson', role: 'Sentinel', image: 'Male Valorant sentinel defending site', description: 'Site anchor with defensive expertise' },
      { name: 'Morgan Davis', role: 'IGL', image: 'Male Valorant in-game leader', description: 'Strategic caller leading the team' },
      { name: 'Zoe Chen', role: 'Duelist', image: 'Female Valorant duelist player', description: 'Aggressive entry fragger with quick reflexes' },
      { name: 'Maya Patel', role: 'Controller', image: 'Female Valorant controller with headset', description: 'Smoke controller with map control expertise' },
      { name: 'Luna Rodriguez', role: 'Initiator', image: 'Female Valorant initiator player', description: 'Intel gatherer setting up team plays' },
      { name: 'Nova Johnson', role: 'Sentinel', image: 'Female Valorant sentinel player', description: 'Defensive specialist holding sites' },
      { name: 'Aria Martinez', role: 'Flex', image: 'Female Valorant flexible player', description: 'Versatile player adapting to team needs' },
      { name: 'Coach David', role: 'Head Coach', image: 'Male Valorant coach with tactical board', description: 'Valorant strategic coach and analyst' },
      { name: 'Coach Anna', role: 'Assistant Coach', image: 'Female Valorant coach reviewing gameplay', description: 'Assistant coach focusing on individual skills' },
      { name: 'Manager Chris', role: 'Team Manager', image: 'Male Valorant team manager', description: 'Managing Valorant academy team operations' }
    ]
  };

  const proTeam = [
    { name: 'Phoenix', role: 'Star Player', image: 'Professional esports player in red jersey', stats: 'MVP 2023 Championship' },
    { name: 'Viper', role: 'Team Captain', image: 'Esports team captain with trophy', stats: '5x Tournament Winner' },
    { name: 'Sage', role: 'Strategic Player', image: 'Professional gamer analyzing strategies', stats: 'Highest Win Rate 2023' }
  ];

  const tfrLogo = "https://horizons-cdn.hostinger.com/5fa0b8d3-c44f-4dca-8d10-eedac9823804/7420bec5d227a6278d0ddf928ec2d3da.png";

  return (
    <>
      <Helmet>
        <title>TFR - The First Rulers | Professional Esports Organization</title>
        <meta name="description" content="TFR (The First Rulers) - Professional esports organization featuring academy teams, pro players, and championship-winning talent. One team, One spirit." />
      </Helmet>

      <div className="min-h-screen">
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarScrolled ? 'navbar-scrolled' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img 
                  src={tfrLogo} 
                  alt="TFR Logo" 
                  className="h-10 w-auto" 
                />
              </div>
              
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {['Home', 'About Us', 'TFR Academy', 'Pro Team', 'Media', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:text-red-500 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                
                <div className="md:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-md"
                  >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black bg-opacity-95">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['Home', 'About Us', 'TFR Academy', 'Pro Team', 'Media', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 transition-colors w-full text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center hero-parallax">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <img className="absolute inset-0 w-full h-full object-cover -z-10" alt="TFR esports arena with gaming setup" src="https://images.unsplash.com/photo-1576990049702-8418081b420e" />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center text-white px-4"
          >
            <img 
              src={tfrLogo} 
              alt="The First Rulers Logo" 
              className="mx-auto mb-6 h-40 md:h-64 w-auto" 
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-text">
              THE FIRST <span className="text-red-500">RULERS</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              One team, One spirit
            </p>
            <button
              onClick={() => scrollToSection('about-us')}
              className="btn-primary text-lg px-8 py-4"
            >
              Discover Our Legacy
            </button>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section id="about-us" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-red-500">TFR</span></h2>
              <p className="text-lg max-w-3xl mx-auto">
                Founded in 2019 by a group of enthusiasts, The First Rulers (TFR) is a premier esports organization dedicated to excellence, 
                innovation, and competitive spirit. We nurture talent, build champions, and create legends.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Our Mission',
                  description: 'To develop world-class esports talent and compete at the highest level while maintaining integrity and sportsmanship.',
                  icon: '🎯'
                },
                {
                  title: 'Our Values',
                  description: 'Excellence, teamwork, dedication, and respect. We believe in the power of unity and the strength of individual growth.',
                  icon: '⭐'
                },
                {
                  title: 'Our Achievements',
                  description: 'Multiple championship titles, top-tier tournament placements, and a growing legacy of successful professional players.',
                  icon: '🏆'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="card-hover bg-gray-100 dark:bg-gray-800 p-8 text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-red-500">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TFR Academy Section */}
        <section id="tfr-academy" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">TFR <span className="text-red-500">Academy</span></h2>
              <p className="text-lg max-w-3xl mx-auto">
                Our academy is where champions are forged. Meet our talented players and dedicated staff 
                across multiple gaming disciplines.
              </p>
            </motion.div>

            {/* Academy Tabs */}
            <div className="flex flex-wrap justify-center mb-12">
              {[
                { id: 'head-staff', label: 'Head Staff' },
                { id: 'pubg-mobile', label: 'PUBG Mobile' },
                { id: 'fifa', label: 'FIFA' },
                { id: 'valorant', label: 'Valorant' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Academy Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 academy-grid"
            >
              {academyData[activeTab].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-hover bg-white dark:bg-gray-800 p-6 text-center"
                >
                  <img className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" alt={`${member.name} - ${member.role}`} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-red-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{member.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pro Team Section */}
        <section id="pro-team" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Pro <span className="text-red-500">Team</span></h2>
              <p className="text-lg max-w-3xl mx-auto">
                Meet our elite professional players who compete at the highest level of esports competition.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {proTeam.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="card-hover bg-gradient-to-br from-red-500 to-red-700 text-white p-8 text-center"
                >
                  <img className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white" alt={`${player.name} - ${player.role}`} src="https://images.unsplash.com/photo-1602901248846-e655ca3f53ce" />
                  <h3 className="text-2xl font-bold mb-2">{player.name}</h3>
                  <p className="text-red-100 font-semibold mb-4">{player.role}</p>
                  <p className="text-red-100">{player.stats}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Section */}
        <section id="media" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Media <span className="text-red-500">Gallery</span></h2>
              <p className="text-lg max-w-3xl mx-auto">
                Highlights from our tournaments, training sessions, and championship moments.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                'TFR team celebrating championship victory',
                'Intense gaming moment during tournament',
                'TFR academy players training session'
              ].map((description, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="hover-zoom overflow-hidden rounded-lg"
                >
                  <img className="w-full h-64 object-cover" alt={`TFR media ${index + 1}`} src="https://images.unsplash.com/photo-1611798416123-c1255cff2c0e" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In <span className="text-red-500">Touch</span></h2>
              <p className="text-lg max-w-3xl mx-auto">
                Ready to join the TFR family? Have questions about our academy or sponsorship opportunities? 
                We'd love to hear from you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.form
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="form-input"
                    placeholder="Tell us about yourself or your inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
                  <div className="flex justify-center space-x-4">
                    <a href="https://instagram.com/the_first_rulers" target="_blank" rel="noopener noreferrer" className="social-link">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://discord.gg/hn8ucWybPy" target="_blank" rel="noopener noreferrer" className="social-link">
                      <span className="text-lg font-bold">D</span>
                    </a>
                    <a href="mailto:contact_tfr@gmail.com" className="social-link">
                      <Mail className="h-6 w-6" />
                    </a>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                  <h4 className="text-xl font-bold mb-4">Join Our Academy</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Looking to take your gaming to the next level? Our academy is always looking for talented players 
                    who share our passion for excellence.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Professional coaching and training</li>
                    <li>• State-of-the-art gaming facilities</li>
                    <li>• Tournament opportunities</li>
                    <li>• Career development support</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 mb-4">One team, One spirit</p>
            <div className="flex justify-center items-center gap-4">
              <img 
                src={tfrLogo} 
                alt="TFR Logo" 
                className="h-12 w-auto" 
              />
              <p className="text-sm text-gray-500">
                © 2024 The First Rulers (TFR). All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        <Toaster />
      </div>
    </>
  );
}

export default App;