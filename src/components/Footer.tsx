
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Donate Feels Great</h3>
            <p className="text-gray-400">
              Making charity meaningful and rewarding for everyone.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/quran" className="hover:text-white">Quran Reader</a></li>
              <li><a href="/namaz" className="hover:text-white">Prayer Times</a></li>
              <li><a href="/zakat" className="hover:text-white">Zakat Calculator</a></li>
              <li><a href="/duas" className="hover:text-white">Duas Library</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/masjid" className="hover:text-white">Masjid Management</a></li>
              <li><a href="/calendar" className="hover:text-white">Islamic Calendar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Donate Feels Great. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
