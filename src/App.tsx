/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Database,
  Server,
  Atom,
  Cpu,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Phone,
  Send,
  Code2,
  Menu,
  X,
  Sun,
  Moon,
  Check,
  ChevronUp,
  ChevronDown,
  Award,
  Trash2,
  MessageSquare,
  Clock,
  Lock,
  Unlock,
  RefreshCw,
  Shield,
  Terminal,
  Network,
  Search,
  Activity,
  GraduationCap,
  Palette
} from 'lucide-react';
import { portfolioData, Skill, Project, Certificate, Experience } from './data/portfolioData';
import { SpotlightCard } from './components/SpotlightCard';
import { DecryptedText } from './components/DecryptedText';

// Map of icons for dynamic rendering
const IconMap: Record<string, any> = {
  Database,
  Server,
  Atom,
  Cpu,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Phone,
  Send,
  Code2,
  Award,
  Trash2,
  MessageSquare,
  Clock,
  Lock,
  Unlock,
  RefreshCw,
  Shield,
  Terminal,
  Network,
  Search,
  Activity,
  GraduationCap,
  Palette
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectActiveTab, setProjectActiveTab] = useState<'all' | 'technical' | 'creative'>('all');

  // Block body scroll when project modal is open
  useEffect(() => {
    if (showAllProjects) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAllProjects]);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Custom icon resolver
  const getSkillIcon = (iconName: string) => {
    const IconComponent = IconMap[iconName] || Code2;
    return <IconComponent className="w-8 h-8" />;
  };

  // Tracking dynamic active section and scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll to top button
      if (window.scrollY > 500) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }

      // Identify active viewport section
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form submit handler with auto-email drafting
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      // 1. Draft raw mailto link and trigger native email app redirect
      const mailRecipient = portfolioData.personalInfo.email || 'qwyndji@gmail.com';
      const mailSubject = `[Portfolio] ${formData.subject || 'Collaboration / Project Inquiry'} - ${formData.name}`;
      const mailBody = `Hi ${portfolioData.personalInfo.name},\n\nYou received a new message from a visitor on your portfolio interactive website:\n\n----------------------------------------\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject || "No Subject"}\n\nMessage:\n${formData.message}\n----------------------------------------\n\n(Sent via Portfolio Live Form)`;
      
      const mailtoLink = `mailto:${mailRecipient}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
      
      // Trigger the local default mail composer (Gmail, Apple Mail, Outlook, etc.)
      window.location.href = mailtoLink;

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success banner after 6 seconds
      setTimeout(() => setSubmitSuccess(false), 6000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certificates', id: 'certificates' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // Helper to trigger CV download or draft email request
  const handleDownloadCV = () => {
    if (portfolioData.personalInfo.resumeUrl && portfolioData.personalInfo.resumeUrl !== "#") {
      window.open(portfolioData.personalInfo.resumeUrl, "_blank");
    } else {
      const email = portfolioData.personalInfo.email || "qwyndji@gmail.com";
      const subject = encodeURIComponent("Inquiry regarding CV / Resume - Qwyn Celine");
      const body = encodeURIComponent("Hi Qwyn,\n\nI visited your portfolio and would like to request a copy of your latest CV/Resume.\n\nBest regards,");
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className={`relative overflow-hidden min-h-screen transition-colors duration-500 ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Background ambient glows (Cosmic / Salmverse pastel theme) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none h-full z-0">
        <div className={`absolute top-[-150px] right-[5%] w-[650px] h-[650px] rounded-full neon-glow-purple transition-opacity duration-500 ${isDark ? 'opacity-25' : 'opacity-[0.38]'}`} style={{ filter: 'blur(100px)' }} />
        <div className={`absolute top-[350px] left-[-150px] w-[550px] h-[550px] rounded-full neon-glow-blue transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-[0.28]'}`} style={{ filter: 'blur(90px)' }} />
        <div className={`absolute top-[950px] right-[-100px] w-[500px] h-[500px] rounded-full neon-glow-purple transition-opacity duration-500 ${isDark ? 'opacity-15' : 'opacity-[0.32]'}`} style={{ filter: 'blur(90px)' }} />
        <div className={`absolute bottom-[100px] left-[10%] w-[600px] h-[600px] rounded-full neon-glow-blue transition-opacity duration-500 ${isDark ? 'opacity-15' : 'opacity-[0.25]'}`} style={{ filter: 'blur(100px)' }} />
      </div>

      {/* HEADER NAVBAR */}
      <header id="app-header" className="sticky top-0 z-50 w-full transition-all duration-300 border-b border-rose-500/0">
        <div className={`mx-auto px-6 lg:px-12 py-4 flex items-center justify-between ${
          isDark ? 'glass-panel-dark' : 'glass-panel-light'
        }`}>
          {/* Logo */}
          <div id="header-logo" className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {portfolioData.personalInfo.firstName}.
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-sm font-medium transition-all duration-200 hover:text-indigo-500 relative py-1 cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-indigo-500 font-semibold' 
                    : isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Controls: Theme Toggle & Mobile Burger */}
          <div id="header-controls" className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full cursor-pointer transition-colors duration-300 relative overflow-hidden ${
                isDark ? 'bg-slate-900 border border-slate-800 text-yellow-400 hover:bg-slate-800' : 'bg-white border border-slate-200 text-indigo-600 shadow-sm hover:bg-slate-100'
              }`}
              title="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg md:hidden cursor-pointer ${
                isDark ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden border-b ${
                isDark ? 'bg-slate-950/95 border-slate-800 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-950'
              }`}
            >
              <nav className="flex flex-col p-6 gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left font-sans text-base font-medium py-2 transition-colors duration-150 cursor-pointer ${
                      activeSection === item.id ? 'text-indigo-500 font-bold' : isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 px-6 sm:px-12 lg:px-24">
        
        {/* HERO SECTION */}
        <section id="home" className="pt-12 pb-24 md:py-32 flex flex-col md:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
          
          {/* Hero Left Content */}
          <div className="flex-1 space-y-6 text-center order-2 md:order-1 flex flex-col items-center">
            {/* Main Name & Title */}
            <div className="space-y-2">
              <h1 id="hero-heading-name" className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance">
                {portfolioData.personalInfo.firstName}{' '}
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  {portfolioData.personalInfo.lastName}
                </span>
              </h1>
            </div>

            {/* Hero Description */}
            <p id="hero-paragraph-desc" className={`font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed text-balance ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {portfolioData.personalInfo.description}
            </p>

            {/* Call to Actions buttons */}
            <div id="hero-actions-container" className="flex flex-wrap items-center gap-4 justify-center pt-2">
              <button
                id="hero-view-work-btn"
                onClick={() => handleNavClick('projects')}
                className="px-6 py-3 rounded-xl font-medium text-sm cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:scale-105 duration-200 flex items-center gap-2"
              >
                View My Work
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                id="hero-contact-btn"
                onClick={() => handleNavClick('contact')}
                className={`px-6 py-3 rounded-xl font-medium text-sm cursor-pointer border transition-all duration-300 ${
                  isDark 
                    ? 'border-slate-800 text-slate-300 bg-slate-900/50 hover:bg-slate-900 hover:text-white hover:border-slate-700' 
                    : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:text-indigo-600 shadow-sm'
                }`}
              >
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div id="hero-social-links" className="flex items-center gap-5 justify-center pt-6">
              {[
                { id: 'social-github', href: portfolioData.socialLinks.github, icon: <Github className="w-5.5 h-5.5" />, label: 'GitHub', hoverColor: 'hover:text-white hover:bg-slate-900' },
                { id: 'social-linkedin', href: portfolioData.socialLinks.linkedin, icon: <Linkedin className="w-5.5 h-5.5" />, label: 'LinkedIn', hoverColor: 'hover:text-blue-600 hover:bg-slate-200/50' },
                { id: 'social-instagram', href: portfolioData.socialLinks.instagram, icon: <Instagram className="w-5.5 h-5.5" />, label: 'Instagram', hoverColor: 'hover:text-pink-600 hover:bg-slate-200/50' }
              ].map((link, idx) => (
                <a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full transition-colors duration-200 hover:scale-110 ${isDark ? 'text-slate-400' : 'text-slate-600'} ${link.hoverColor}`}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Hero Right Avatar (Beautiful 3D-styled box) */}
          <div className="flex-1 flex justify-center items-center order-1 md:order-2 relative">
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 lg:w-96 lg:h-96">
              {/* Spinning or pulsing glowing aura underneath the portrait card */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 opacity-20 blur-xl animate-pulse" />
              
              {/* Profile Image card container */}
              <div 
                className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl p-3 border ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100'
                }`}
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative group">
                  <img
                    id="hero-avatar-image"
                    src={portfolioData.personalInfo.avatarUrl}
                    alt={portfolioData.personalInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle vignette/reflection on avatar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="py-24 max-w-7xl mx-auto border-t border-slate-800/10 dark:border-slate-800/50">
          <div className="text-center md:text-left mb-12 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">About Me</p>
            <h2 id="about-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              <DecryptedText text="About Me" speed={45} />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Bio Part */}
            <div className="lg:col-span-7 space-y-6">
              <p id="about-bio-par" className={`font-sans text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {portfolioData.personalInfo.aboutMe}
              </p>

              <p className={`font-sans text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                My goal is to become a cybersecurity professional who builds secure, reliable, and impactful digital solutions.
              </p>

              {/* Download CV actions */}
              <div className="pt-2">
                <button
                  id="about-download-cv-btn"
                  onClick={handleDownloadCV}
                  className="px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer bg-indigo-500 h-11 inline-flex items-center gap-2 text-white hover:bg-indigo-600 shadow-md shadow-indigo-500/10 hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4" />
                  Download CV/Resume
                </button>
              </div>
            </div>

            {/* Right Quick Resume Metadata Info Card */}
            <div className="lg:col-span-5">
              <div className={`p-6 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200/60 shadow-sm'
              }`}>
                <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-indigo-500 to-blue-500" />
                  Fast Facts
                </h3>

                <div className="space-y-4">
                  {/* Name item */}
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                      <Briefcase className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className={`text-[11px] font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Name</p>
                      <p className="text-sm font-semibold font-sans">{portfolioData.personalInfo.name}</p>
                    </div>
                  </div>

                  {/* Email item */}
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className={`text-[11px] font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Email</p>
                      <a href={`mailto:${portfolioData.personalInfo.email}`} id="fact-email-link" className="text-sm font-semibold font-sans hover:text-indigo-500 transition-colors">
                        {portfolioData.personalInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Location item */}
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className={`text-[11px] font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Location</p>
                      <p className="text-sm font-semibold font-sans">{portfolioData.personalInfo.location}</p>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MY SKILLS SECTION */}
        <section id="skills" className="py-24 max-w-7xl mx-auto border-t border-slate-800/10 dark:border-slate-800/50">
          <div className="text-center md:text-left mb-12 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">My Skills</p>
            <h2 id="skills-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              <DecryptedText text="Tools & Technologies I Work With" speed={45} />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.skills.map((skill: Skill, index: number) => {
              return (
                <motion.div
                  key={skill.name}
                  id={`skill-card-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2, transition: { duration: 0.15 } }}
                >
                  <SpotlightCard
                    isDark={isDark}
                    className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      isDark 
                        ? 'bg-slate-900/30 border-slate-800/60 hover:bg-slate-900/50 hover:border-slate-750' 
                        : 'bg-white border-slate-200/75 hover:bg-slate-50/50 hover:border-indigo-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      {/* Skill icon wrapper */}
                      <div className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                        skill.name.includes('Forensics') ? isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600' :
                        skill.name.includes('Network') ? isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600' :
                        skill.name.includes('Hacking') ? isDark ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-rose-50 border-rose-100 text-rose-600' :
                        skill.name.includes('Packet') ? isDark ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-cyan-50 border-cyan-100 text-cyan-600' :
                        skill.name.includes('Cryptography') ? isDark ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-amber-50 border-amber-100 text-amber-600' :
                        skill.name.includes('System') ? isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                        skill.name.includes('OSINT') ? isDark ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-100 text-purple-600' :
                        skill.name.includes('UI/UX') ? isDark ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' : 'bg-pink-50 border-pink-100 text-pink-600' :
                        isDark ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-violet-50 border-violet-100 text-violet-600'
                      }`}>
                        {getSkillIcon(skill.icon)}
                      </div>

                      {/* Level text */}
                      <span className={`text-[10px] font-semibold font-sans px-2.5 py-0.5 rounded-full border ${
                        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}>
                        {skill.level}
                      </span>
                    </div>

                    {/* Skill info */}
                    <div className="space-y-3">
                      <h3 className="font-display text-base font-bold tracking-tight">{skill.name}</h3>
                      
                      {/* Progress Indicator */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={isDark ? 'text-slate-400 animate-pulse' : 'text-slate-500'}>Expertise</span>
                          <span className="font-sans font-bold text-indigo-500">{skill.percentage}%</span>
                        </div>
                        {/* Progress Bar Track */}
                        <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200/60'}`}>
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${
                              skill.name.includes('Forensics') ? 'from-blue-500 to-cyan-400' :
                              skill.name.includes('Network') ? 'from-indigo-500 to-violet-400' :
                              skill.name.includes('Hacking') ? 'from-rose-500 to-orange-400' :
                              skill.name.includes('Packet') ? 'from-cyan-500 to-blue-400' :
                              skill.name.includes('Cryptography') ? 'from-amber-400 to-yellow-500' :
                              skill.name.includes('System') ? 'from-emerald-500 to-teal-400' :
                              skill.name.includes('OSINT') ? 'from-purple-500 to-pink-500' :
                              skill.name.includes('UI/UX') ? 'from-pink-500 to-rose-400' :
                              'from-violet-500 to-indigo-500'
                            }`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.05 }}
                          />
                        </div>
                      </div>

                      {/* Always Visible Tool Tags */}
                      {skill.tools && (
                        <div className="pt-1.5">
                          <div className="flex flex-wrap gap-1">
                            {skill.tools.map((t) => (
                              <span
                                key={t}
                                className={`text-[10px] px-2 py-0.5 rounded-md font-sans font-medium tracking-wide border transition-all ${
                                  isDark 
                                    ? 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-indigo-500/30 hover:text-indigo-400' 
                                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-200 hover:text-indigo-600'
                                }`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>

          {/* SOFT SKILLS INFINITE MARQUEE */}
          <div className="mt-16 pt-12 border-t border-slate-800/10 dark:border-slate-800/30">
            <div className="text-center mb-8 space-y-1">
              <h3 className={`font-display text-base sm:text-lg font-semibold tracking-wide ${isDark ? 'text-white' : 'text-slate-700'}`}>
                Soft Skills & Strengths
              </h3>
            </div>

            <div className="relative w-full overflow-hidden py-3 marquee-container">
              <div className="animate-marquee gap-4 flex flex-row items-center w-max">
                {[
                  'Leadership',
                  'Team Working',
                  'Time Management',
                  'Responsibility',
                  'Public Speaking',
                  'Problem Solving',
                  'Adaptability',
                  'Critical Thinking',
                  'Leadership',
                  'Team Working',
                  'Time Management',
                  'Responsibility',
                  'Public Speaking',
                  'Problem Solving',
                  'Adaptability',
                  'Critical Thinking',
                  'Leadership',
                  'Team Working',
                  'Time Management',
                  'Responsibility',
                  'Public Speaking',
                  'Problem Solving',
                  'Adaptability',
                  'Critical Thinking'
                ].map((name, idx) => (
                  <div
                    key={`${name}-${idx}`}
                    className={`px-6 py-3 rounded-full border shadow-sm backdrop-blur-sm whitespace-nowrap ${
                      isDark 
                        ? 'bg-slate-900/60 border-slate-800/80 text-white hover:border-indigo-500/40 hover:bg-slate-900' 
                        : 'bg-white/90 border-slate-200 text-slate-800 hover:border-indigo-300'
                    } transition-all duration-300 cursor-default`}
                  >
                    <span className={`font-sans text-sm font-semibold tracking-wide ${isDark ? 'text-white' : 'text-slate-800'}`}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MY PROJECTS SECTION */}
        <section id="projects" className="py-24 max-w-7xl mx-auto border-t border-slate-800/10 dark:border-slate-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="text-center md:text-left space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">My Projects</p>
              <h2 id="projects-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                <DecryptedText text="Featured Projects" speed={45} />
              </h2>
            </div>
            
            <button
              id="projects-view-all-btn"
              onClick={() => {
                setProjectActiveTab('all');
                setProjectSearchQuery('');
                setShowAllProjects(true);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                isDark 
                  ? 'border-slate-800 text-slate-300 bg-slate-900/50 hover:bg-slate-900 hover:text-white hover:border-slate-700' 
                  : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:text-indigo-600 shadow-sm'
              }`}
            >
              View All Projects
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.filter(p => !p.isCreative).map((proj: Project, index: number) => (
              <motion.div
                key={proj.id}
                id={`project-card-motion-${proj.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
              >
                <SpotlightCard
                  isDark={isDark}
                  className={`flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 select-none ${
                    isDark 
                      ? 'bg-slate-900/20 border-slate-800/80 hover:border-indigo-500/30' 
                      : 'bg-white border-slate-200/80 shadow-sm hover:border-indigo-400'
                  }`}
                >
                  <article className="flex flex-col h-full">
                    {/* Project Image Container */}
                    <div className="relative aspect-video w-full overflow-hidden shrink-0 bg-slate-950">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Subtle hover overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                      {/* Action Link overlay shortcuts */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                        {proj.githubUrl && (
                          <a
                            id={`proj-${proj.id}-github-link`}
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-950/80 border border-white/10 hover:border-white/30 text-white backdrop-blur-sm transition-all duration-250 hover:scale-110"
                            title="View GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && !proj.liveUrl.includes('github.com') && (
                          <a
                            id={`proj-${proj.id}-live-link`}
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-950/80 border border-white/10 hover:border-white/30 text-white backdrop-blur-sm transition-all duration-250 hover:scale-110"
                            title="View Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project Text Information */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-2">
                        <h3 className="font-display text-xl font-bold tracking-tight">
                          <span className={isDark ? 'text-white' : 'text-slate-950 font-bold'}>{proj.title}</span>
                        </h3>
                        <p className={`font-sans text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {proj.description}
                        </p>
                      </div>

                      <div className="space-y-4 pt-1">
                        {/* Tech stack badges */}
                        <div className="flex flex-wrap gap-2">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`font-sans text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-md border ${
                                isDark 
                                  ? 'bg-slate-900/80 border-slate-800 text-slate-300' 
                                  : 'bg-indigo-50/50 border-indigo-100 text-indigo-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LICENSES & CERTIFICATES SECTION */}
        <section id="certificates" className="py-24 max-w-7xl mx-auto border-t border-slate-800/10 dark:border-slate-800/50">
          <div className="text-center md:text-left mb-12 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Credentials</p>
            <h2 id="certificates-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              <DecryptedText text="Licenses & Certifications" speed={45} />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.certificates.map((cert: Certificate, index: number) => (
              <motion.div
                key={cert.id}
                id={`cert-card-motion-${cert.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
              >
                <SpotlightCard
                  isDark={isDark}
                  className={`flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                    isDark 
                      ? 'bg-slate-900/20 border-slate-800/80 hover:border-indigo-500/30' 
                      : 'bg-white border-slate-200/80 shadow-sm hover:border-indigo-400'
                  }`}
                >
                  <div className="flex flex-col h-full">
                    {/* Badge / Credential Cover Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950 shrink-0">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                      
                      {/* Brand/Issuer Seal overlay */}
                      <div className="absolute bottom-3 left-4 flex items-center gap-1.5 z-10">
                        <span className="p-1 rounded-md bg-indigo-600/90 text-white flex items-center justify-center">
                          <Award className="w-4 h-4" />
                        </span>
                        <span className="text-[10px] font-bold tracking-wider uppercase font-sans text-indigo-200 bg-slate-950/80 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                          {cert.issuer.split(' ')[0]} Verified
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-semibold font-sans tracking-wide ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {cert.date}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        </div>
                        
                        <h3 className="font-display text-lg font-bold tracking-tight">
                          <span className={isDark ? 'text-white' : 'text-slate-950 font-bold'}>{cert.title}</span>
                        </h3>
                        
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="text-xs font-sans text-slate-500 dark:text-slate-400">Issued by:</span>
                          <span className="text-xs font-semibold font-sans text-indigo-500">{cert.issuer}</span>
                        </div>
                      </div>

                      {/* Verify Button */}
                      <div className="pt-2">
                        <a
                          id={`cert-${cert.id}-verify-btn`}
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full py-2.5 rounded-xl font-medium text-xs transition-all duration-300 inline-flex items-center justify-center gap-1.5 border ${
                            isDark
                              ? 'border-slate-800 bg-slate-900/40 text-slate-350 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-xs'
                          }`}
                        >
                          Verify Credential
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE SECTION */}
        <section id="experience" className="py-24 max-w-7xl mx-auto border-t border-slate-800/10 dark:border-slate-800/50">
          <div className="text-center md:text-left mb-12 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Journey</p>
            <h2 id="experience-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              <DecryptedText text="My Experience" speed={45} />
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:right-auto before:left-4 md:before:left-1/2 before:w-0.5 before:bg-indigo-500/25 dark:before:bg-indigo-500/15">
            {portfolioData.experiences.map((exp: Experience, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  id={`exp-card-motion-${exp.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 flex items-center justify-center z-10">
                    <span className="w-8 h-8 rounded-full border-2 border-indigo-500 bg-white dark:bg-slate-950 flex items-center justify-center shadow-md">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                    </span>
                  </div>

                  {/* Spacer for large screens */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Section */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <SpotlightCard
                      isDark={isDark}
                      className={`rounded-2xl border p-6 transition-all duration-300 ${
                        isDark
                          ? 'bg-slate-900/20 border-slate-800/80 hover:border-indigo-500/30'
                          : 'bg-white border-slate-200/80 shadow-sm hover:border-indigo-400'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-y-2">
                          <div>
                            <h3 className="font-display text-lg font-bold tracking-tight">
                              <span className={isDark ? 'text-white' : 'text-slate-950 font-bold'}>{exp.role}</span>
                            </h3>
                            <p className="text-sm font-semibold text-indigo-500 mt-0.5">{exp.company}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wide border ${
                            isDark
                              ? 'bg-slate-950/80 border-slate-800/50 text-slate-100'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}>
                            <Calendar className="w-3 h-3 text-indigo-500" />
                            {exp.period}
                          </span>
                        </div>

                        <ul className="space-y-2 list-none p-0 m-0">
                          {exp.description.map((bullet, bIdx) => (
                            <li key={bIdx} className={`flex items-start gap-2.5 text-xs sm:text-sm font-sans leading-relaxed ${isDark ? 'text-white' : 'text-slate-700'}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/70 shrink-0 mt-1.5" />
                              <span className={isDark ? 'text-white' : 'text-slate-700'}>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className={`text-[10px] sm:text-[11px] font-sans font-semibold tracking-wide px-2.5 py-1 rounded-md border ${
                                isDark
                                  ? 'bg-slate-950/80 border-slate-800/50 text-slate-100'
                                  : 'bg-slate-50 border-slate-200/60 text-slate-600'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CONTACT & GET IN TOUCH SECTION */}
        <section id="contact" className="py-24 max-w-7xl mx-auto border-t border-slate-800/10 dark:border-slate-800/50">
          <div className="text-center mb-12 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Contact Me</p>
            <h2 id="contact-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              <DecryptedText text="Get In Touch" speed={45} />
            </h2>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Direct email box */}
            <a
              href={`mailto:${portfolioData.personalInfo.email}`}
              id="contact-email-card"
              className={`p-6 rounded-2xl border flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] ${
                isDark 
                  ? 'bg-slate-900/20 border-slate-800/80 hover:bg-slate-900/40 hover:border-indigo-500/50' 
                  : 'bg-white border-slate-200/60 hover:border-indigo-500/50 shadow-sm hover:shadow-md'
              }`}
            >
              <div className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${isDark ? 'bg-indigo-500/10 border-indigo-500/25 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                <Mail className="w-5.5 h-5.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-sans text-slate-500 font-semibold uppercase tracking-wider">Email Me</p>
                <span id="contact-email-val" className="text-base font-bold font-sans break-all text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                  {portfolioData.personalInfo.email}
                </span>
              </div>
            </a>

            {/* Direct Location box */}
            <div className={`p-6 rounded-2xl border flex items-center gap-4 ${isDark ? 'bg-slate-900/20 border-slate-800/80' : 'bg-white border-slate-200/60 shadow-sm'}`}>
              <div className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${isDark ? 'bg-indigo-500/10 border-indigo-500/25 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                <MapPin className="w-5.5 h-5.5" />
              </div>
              <div>
                <p className="text-[10px] font-sans text-slate-500 font-semibold uppercase tracking-wider">Location</p>
                <p className="text-base font-bold font-sans">{portfolioData.personalInfo.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="app-footer" className={`border-t py-12 relative z-10 ${
        isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-white border-slate-250 text-slate-600 shadow-sm'
      }`}>
        <div className="mx-auto px-6 sm:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl">
          {/* Logo / Name */}
          <div className="text-center md:text-left">
            <p className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {portfolioData.personalInfo.name}
            </p>
          </div>

          {/* Copyright description */}
          <div className="text-center md:text-right">
            <p className="text-xs font-sans">
              &copy; 2026 Qwyn Celine Djimondo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            id="scroll-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`fixed bottom-6 right-6 p-3 rounded-full cursor-pointer shadow-xl z-50 border transition-all hover:-translate-y-1 ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 text-indigo-400 hover:bg-slate-800 hover:text-white' 
                : 'bg-white border-slate-200 text-indigo-600 hover:bg-slate-100 hover:text-indigo-800'
            }`}
            title="Scroll to Top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ALL PROJECTS SHOWCASE MODAL */}
      <AnimatePresence>
        {showAllProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setShowAllProjects(false)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`relative w-full max-w-5xl max-h-[85vh] rounded-3xl border flex flex-col overflow-hidden shadow-2xl z-10 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Modal Header */}
              <div className={`p-6 md:p-8 border-b shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDark ? 'border-slate-800/80' : 'border-slate-100'
              }`}>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Portfolio Explorer</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                    All My Projects
                  </h3>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowAllProjects(false)}
                  className={`absolute top-6 right-6 p-2 rounded-xl border transition-all hover:scale-105 cursor-pointer ${
                    isDark 
                      ? 'border-slate-800 bg-slate-950/50 hover:bg-slate-950 hover:border-slate-700 text-slate-400 hover:text-white' 
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filters & Search Control Bar */}
              <div className={`px-6 py-4 md:px-8 border-b shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDark ? 'bg-slate-950/30 border-slate-800/80' : 'bg-slate-50/50 border-slate-100'
              }`}>
                {/* Category selectors */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Projects', count: portfolioData.projects.length },
                    { id: 'technical', label: 'Technical', count: portfolioData.projects.filter(p => !p.isCreative).length },
                    { id: 'creative', label: 'Creative', count: portfolioData.projects.filter(p => p.isCreative).length },
                  ].map((tab) => {
                    const isActive = projectActiveTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setProjectActiveTab(tab.id as any)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md'
                            : isDark
                              ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                              : 'bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                        }`}
                      >
                        {tab.label} <span className="opacity-60 ml-1">({tab.count})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Search input bar */}
                <div className="relative w-full md:max-w-xs">
                  <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search title, tech, or tags..."
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-1.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                      isDark 
                        ? 'bg-slate-950/80 border-slate-800 text-white placeholder-slate-500' 
                        : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  {projectSearchQuery && (
                    <button
                      onClick={() => setProjectSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable grid container */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                {/* Filter and search execution */}
                {(() => {
                  let filtered = portfolioData.projects;
                  
                  // Apply active tab filtering
                  if (projectActiveTab === 'technical') {
                    filtered = filtered.filter(p => !p.isCreative);
                  } else if (projectActiveTab === 'creative') {
                    filtered = filtered.filter(p => p.isCreative);
                  }

                  // Apply search filtering
                  if (projectSearchQuery.trim()) {
                    const q = projectSearchQuery.toLowerCase();
                    filtered = filtered.filter(p => 
                      p.title.toLowerCase().includes(q) || 
                      p.description.toLowerCase().includes(q) ||
                      p.techStack.some(t => t.toLowerCase().includes(q))
                    );
                  }

                  if (filtered.length === 0) {
                    return (
                      <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <div className={`p-4 rounded-full border ${isDark ? 'bg-slate-950/50 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                          <Search className="w-8 h-8" />
                        </div>
                        <div className="text-center space-y-1">
                          <h4 className="font-display font-bold text-lg">No projects match your criteria</h4>
                          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            Try adjusting your search query or selecting a different tab.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setProjectSearchQuery('');
                            setProjectActiveTab('all');
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                        >
                          Reset Filters
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filtered.map((proj: Project, index: number) => (
                        <motion.div
                          key={proj.id}
                          id={`modal-project-motion-${proj.id}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                          className={`flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 ${
                            isDark 
                              ? 'bg-slate-950/40 border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-950/60' 
                              : 'bg-slate-50/50 border-slate-200/80 shadow-sm hover:border-indigo-400 hover:bg-white'
                          }`}
                        >
                          {/* Project Image Container */}
                          <div className="relative aspect-video w-full overflow-hidden shrink-0 bg-slate-950">
                            <img
                              src={proj.image}
                              alt={proj.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Subtle hover overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                            {/* Label overlay (e.g. Creative Project) */}
                            {proj.isCreative && (
                              <div className="absolute top-4 left-4 z-20">
                                <span className="bg-indigo-600/90 text-white border border-indigo-500/30 backdrop-blur-sm font-sans text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-md shadow-md">
                                  Creative Project
                                </span>
                              </div>
                            )}

                            {/* Action Link overlay shortcuts */}
                            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                              {proj.githubUrl && (
                                <a
                                  id={`modal-${proj.id}-github-link`}
                                  href={proj.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl bg-slate-950/80 border border-white/10 hover:border-white/30 text-white backdrop-blur-sm transition-all duration-250 hover:scale-110"
                                  title="View GitHub Repository"
                                >
                                  <Github className="w-4 h-4" />
                                </a>
                              )}
                              {proj.liveUrl && !proj.liveUrl.includes('github.com') && (
                                <a
                                  id={`modal-${proj.id}-live-link`}
                                  href={proj.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl bg-slate-950/80 border border-white/10 hover:border-white/30 text-white backdrop-blur-sm transition-all duration-250 hover:scale-110"
                                  title="View Live Demo"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Project Text Information */}
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-display text-lg font-bold tracking-tight">
                                <span className={isDark ? 'text-white' : 'text-slate-950 font-bold'}>{proj.title}</span>
                              </h4>
                              <p className={`font-sans text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {proj.description}
                              </p>
                            </div>

                            <div className="space-y-4 pt-1">
                              {/* Tech stack badges */}
                              <div className="flex flex-wrap gap-1.5">
                                {proj.techStack.map((tech) => (
                                  <span
                                    key={tech}
                                    className={`font-sans text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded border ${
                                      isDark 
                                        ? 'bg-slate-900 border-slate-800 text-slate-300' 
                                        : 'bg-indigo-50 border-indigo-100/50 text-indigo-700'
                                    }`}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer */}
              <div className={`p-4 border-t shrink-0 flex items-center justify-between text-[11px] ${
                isDark ? 'border-slate-800 bg-slate-950/25 text-slate-500' : 'border-slate-100 bg-slate-50/50 text-slate-400'
              }`}>
                <p>Showing {portfolioData.projects.length} total creations</p>
                <button
                  onClick={() => setShowAllProjects(false)}
                  className="font-semibold text-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Close Showcase
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
