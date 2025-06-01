import React from 'react';
import Header from '@/components/Header';
import ProjectDonationWidget from '@/components/ProjectDonationWidget';
import { Building2 } from 'lucide-react';

const BuildMosque = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Header />
      <ProjectDonationWidget projectType="mosque" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-left">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Build a Mosque
            </h2>
            <p className="mt-6 text-xl">
              Empower communities by providing a sacred space for prayer and reflection.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#impact"
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold py-3 px-6 rounded-full transition-colors duration-300"
              >
                See the Impact
              </a>
              <a
                href="#projects"
                className="bg-teal-500 text-white hover:bg-teal-700 font-semibold py-3 px-6 rounded-full transition-colors duration-300"
              >
                View Active Projects
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <Building2 className="h-48 w-auto text-emerald-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Impact Section */}
        <section id="impact" className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            The Impact of Building a Mosque
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                Building a mosque provides a community with a central place for worship,
                education, and social gatherings. It fosters unity, strengthens faith, and
                serves as a beacon of hope.
              </p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Provides a space for daily prayers and religious education</li>
                <li>Strengthens community bonds and promotes social cohesion</li>
                <li>Offers refuge and support for those in need</li>
                <li>Serves as a symbol of Islamic identity and culture</li>
              </ul>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/600x400/22c55e/fff?text=Mosque+Impact"
                alt="Mosque Impact"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Active Projects Section */}
        <section id="projects" className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            Active Mosque Building Projects
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300/a3e635/fff?text=Project+Gaza"
                alt="Project Gaza"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Mosque in Gaza
                </h4>
                <p className="text-gray-600 mb-4">
                  Supporting the construction of a new mosque in Gaza to serve the
                  local community.
                </p>
                <a
                  href="#"
                  className="bg-emerald-500 text-white hover:bg-emerald-700 font-semibold py-2 px-4 rounded-full transition-colors duration-300 inline-block"
                >
                  Donate Now
                </a>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300/a3e635/fff?text=Project+Syria"
                alt="Project Syria"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Mosque in Syria
                </h4>
                <p className="text-gray-600 mb-4">
                  Rebuilding a damaged mosque in Syria to provide a safe place for
                  worship.
                </p>
                <a
                  href="#"
                  className="bg-emerald-500 text-white hover:bg-emerald-700 font-semibold py-2 px-4 rounded-full transition-colors duration-300 inline-block"
                >
                  Donate Now
                </a>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300/a3e635/fff?text=Project+Yemen"
                alt="Project Yemen"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Mosque in Yemen
                </h4>
                <p className="text-gray-600 mb-4">
                  Constructing a new mosque in Yemen to support the growing
                  community.
                </p>
                <a
                  href="#"
                  className="bg-emerald-500 text-white hover:bg-emerald-700 font-semibold py-2 px-4 rounded-full transition-colors duration-300 inline-block"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How to Contribute Section */}
        <section id="contribute">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            How to Contribute
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                You can contribute to building a mosque by donating directly to
                one of our active projects. Your donation will help provide
                essential resources and support for the construction process.
              </p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Choose a project that resonates with you</li>
                <li>Select the amount you wish to donate</li>
                <li>Make a secure online donation</li>
                <li>Receive updates on the project's progress</li>
              </ul>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/600x400/22c55e/fff?text=Contribute+Now"
                alt="Contribute Now"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuildMosque;
