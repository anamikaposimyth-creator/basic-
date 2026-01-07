
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Our Legacy</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-4 mb-6">Building Tomorrow's Foundations Today</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Founded in 2008, Nexus Global Solutions started with a simple vision: to bridge the gap between complex technological potential and real-world business outcomes.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Today, we are a leading consultancy with a presence across three continents, helping Fortune 500 companies and agile startups alike to reinvent their operations through digital innovation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                  <span className="font-medium text-slate-700">Integrity First</span>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                  <span className="font-medium text-slate-700">Innovation Led</span>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                  <span className="font-medium text-slate-700">Client Centric</span>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                  <span className="font-medium text-slate-700">Agile Driven</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://picsum.photos/seed/nexus-team/800/600"
                alt="Our Team"
                className="rounded-2xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-indigo-100 rounded-2xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16">Global Leadership</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: 'Elena Rodriguez', role: 'Chief Executive Officer', img: 'https://picsum.photos/seed/ceo/400/400' },
              { name: 'David Park', role: 'Head of Strategy', img: 'https://picsum.photos/seed/strat/400/400' },
              { name: 'Sofia Chen', role: 'CTO & Innovation lead', img: 'https://picsum.photos/seed/cto/400/400' },
            ].map((leader, i) => (
              <div key={i}>
                <img src={leader.img} alt={leader.name} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white/10" />
                <h3 className="text-xl font-bold">{leader.name}</h3>
                <p className="text-indigo-400 font-medium">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
