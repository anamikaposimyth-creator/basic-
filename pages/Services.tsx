
import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <div className="animate-fadeIn py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Expert Services for Modern Enterprises</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We provide a comprehensive suite of consulting and implementation services designed to accelerate your growth and mitigate operational risks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 flex space-x-8 group hover:shadow-lg transition-all">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-300">
                  <i className={`fas ${service.icon} text-2xl text-indigo-600 group-hover:text-white transition-all duration-300`}></i>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-500 text-sm">
                    <i className="fas fa-chevron-right text-indigo-600 text-xs mr-2"></i>
                    Bespoke implementation roadmap
                  </li>
                  <li className="flex items-center text-slate-500 text-sm">
                    <i className="fas fa-chevron-right text-indigo-600 text-xs mr-2"></i>
                    Ongoing support and optimization
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              Our experts are ready to design a strategy tailored specifically to your unique organizational challenges and goals.
            </p>
            <a href="#contact" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg">
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
