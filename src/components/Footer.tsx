
import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-blue-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-emerald-300 fill-current" />
              <span className="text-2xl font-bold">Donate Feels Great</span>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Making charity engaging, rewarding, and impactful for the global Muslim community.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-emerald-200 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-emerald-200 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-emerald-200 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-emerald-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-200">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/campaigns" className="block text-emerald-100 hover:text-white transition-colors">
                Active Campaigns
              </Link>
              <Link to="/charity-partners" className="block text-emerald-100 hover:text-white transition-colors">
                Charity Partners
              </Link>
              <Link to="/leaderboards" className="block text-emerald-100 hover:text-white transition-colors">
                Leaderboards
              </Link>
              <Link to="/why-donate" className="block text-emerald-100 hover:text-white transition-colors">
                Why Donate
              </Link>
              <Link to="/membership" className="block text-emerald-100 hover:text-white transition-colors">
                Membership
              </Link>
            </div>
          </div>

          {/* Islamic Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-200">Islamic Features</h3>
            <div className="space-y-2 text-sm">
              <Link to="/namaz-times" className="block text-emerald-100 hover:text-white transition-colors">
                Prayer Times
              </Link>
              <Link to="/quran-reader" className="block text-emerald-100 hover:text-white transition-colors">
                Quran Reader
              </Link>
              <Link to="/duas-library" className="block text-emerald-100 hover:text-white transition-colors">
                Duas Library
              </Link>
              <Link to="/zakat-calculator" className="block text-emerald-100 hover:text-white transition-colors">
                Zakat Calculator
              </Link>
              <Link to="/islamic-calendar" className="block text-emerald-100 hover:text-white transition-colors">
                Islamic Calendar
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-200">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-300" />
                <span className="text-emerald-100">hello@donatefeelsgreat.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-300" />
                <span className="text-emerald-100">+44 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-300" />
                <span className="text-emerald-100">London, United Kingdom</span>
              </div>
              <Link to="/charity-partner-program" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-600/30 bg-emerald-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-emerald-200">
              © 2024 Donate Feels Great. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-emerald-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-emerald-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-emerald-200 hover:text-white transition-colors">
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
