
import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Star, Moon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-purple-900/95 via-blue-900/90 to-indigo-950/95 text-white overflow-hidden">
      {/* Dreamy Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 via-blue-800/20 to-indigo-800/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      
      {/* Floating Stars */}
      <div className="absolute top-8 left-20">
        <Star className="h-4 w-4 text-yellow-300/60 animate-pulse" fill="currentColor" />
      </div>
      <div className="absolute top-16 right-32">
        <Sparkles className="h-3 w-3 text-blue-200/50 animate-pulse" />
      </div>
      <div className="absolute bottom-20 left-1/3">
        <Star className="h-3 w-3 text-purple-200/40 animate-pulse" fill="currentColor" />
      </div>
      <div className="absolute top-32 right-20">
        <Moon className="h-5 w-5 text-blue-100/30 animate-pulse" />
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Heart className="h-8 w-8 text-pink-300 fill-current animate-pulse" />
                <div className="absolute inset-0 h-8 w-8 text-pink-300/30 fill-current scale-150 animate-ping"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Your Jannah
              </span>
            </div>
            <p className="text-purple-100/90 text-sm leading-relaxed">
              Building your path to paradise through meaningful giving and spiritual connection with the global Muslim community.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Facebook className="h-4 w-4 text-blue-200 group-hover:text-white transition-colors" />
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Twitter className="h-4 w-4 text-blue-200 group-hover:text-white transition-colors" />
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Instagram className="h-4 w-4 text-pink-200 group-hover:text-white transition-colors" />
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                <Youtube className="h-4 w-4 text-red-200 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-200 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-purple-300" />
              Quick Links
            </h3>
            <div className="space-y-2 text-sm">
              <Link to="/campaigns" className="block text-purple-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Active Campaigns
              </Link>
              <Link to="/charity-partners" className="block text-purple-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Charity Partners
              </Link>
              <Link to="/leaderboards" className="block text-purple-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Leaderboards
              </Link>
              <Link to="/why-donate" className="block text-purple-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Why Donate
              </Link>
              <Link to="/membership" className="block text-purple-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Membership
              </Link>
            </div>
          </div>

          {/* Islamic Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200 flex items-center">
              <Moon className="h-4 w-4 mr-2 text-blue-300" />
              Spiritual Journey
            </h3>
            <div className="space-y-2 text-sm">
              <Link to="/namaz-times" className="block text-blue-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Prayer Times
              </Link>
              <Link to="/quran-reader" className="block text-blue-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Quran Reader
              </Link>
              <Link to="/duas-library" className="block text-blue-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Duas Library
              </Link>
              <Link to="/zakat-calculator" className="block text-blue-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Zakat Calculator
              </Link>
              <Link to="/islamic-calendar" className="block text-blue-100/80 hover:text-white transition-colors hover:translate-x-1 transform duration-200">
                Islamic Calendar
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-pink-200 flex items-center">
              <Star className="h-4 w-4 mr-2 text-pink-300" fill="currentColor" />
              Connect With Us
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 group">
                <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Mail className="h-3 w-3 text-pink-300" />
                </div>
                <span className="text-pink-100/90">hello@yourjannah.com</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="h-3 w-3 text-blue-300" />
                </div>
                <span className="text-blue-100/90">+44 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <MapPin className="h-3 w-3 text-purple-300" />
                </div>
                <span className="text-purple-100/90">London, United Kingdom</span>
              </div>
              <Link to="/charity-partner-program" className="inline-block bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20">
                Partner With Us ✨
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-purple-200/80">
              © 2024 Your Jannah. All rights reserved. Made with 💜 for the Ummah
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-purple-200/70 hover:text-white transition-colors hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-purple-200/70 hover:text-white transition-colors hover:underline">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-purple-200/70 hover:text-white transition-colors hover:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
