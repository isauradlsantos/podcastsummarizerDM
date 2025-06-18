import React from 'react';
import { ExternalLink, Sparkles, Mic, Zap } from 'lucide-react';

interface AdSectionProps {
  type: 'sidebar' | 'banner' | 'sponsored';
}

export default function AdSection({ type }: AdSectionProps) {
  const sidebarAds = [
    {
      title: "Start Your Podcast Today",
      description: "Professional hosting, unlimited uploads, and analytics. Get started for free!",
      cta: "Try Anchor Now",
      icon: <Mic className="w-6 h-6" />,
      gradient: "from-purple-400 to-pink-400",
      link: "#"
    },
    {
      title: "AI-Powered Editing",
      description: "Remove filler words, enhance audio quality, and create clips automatically.",
      cta: "Get Descript",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-blue-400 to-cyan-400",
      link: "#"
    }
  ];

  const sponsoredContent = {
    title: "Sponsored by PodcastHost Pro",
    description: "The #1 choice for serious podcasters. Get unlimited storage, advanced analytics, and premium distribution.",
    features: ["Unlimited uploads", "Advanced analytics", "Premium distribution", "24/7 support"],
    cta: "Start Free Trial",
    link: "#"
  };

  if (type === 'banner') {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-8 text-white mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-xl mb-2">Upgrade Your Podcast Game</h3>
            <p className="text-purple-100 font-light">Professional tools for serious creators</p>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-2xl font-light hover:bg-purple-50 transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    );
  }

  if (type === 'sponsored') {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-light text-gray-500 uppercase tracking-wide">SPONSORED</span>
        </div>
        
        <h3 className="font-medium text-gray-900 mb-3">{sponsoredContent.title}</h3>
        <p className="text-gray-600 font-light text-sm mb-4 leading-relaxed">{sponsoredContent.description}</p>
        
        <ul className="space-y-2 mb-6">
          {sponsoredContent.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 font-light">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <a
          href={sponsoredContent.link}
          className="block w-full text-center bg-gray-900 text-white py-3 px-4 rounded-2xl font-light hover:bg-gray-800 transition-colors duration-300"
        >
          {sponsoredContent.cta}
          <ExternalLink className="w-4 h-4 inline ml-2" />
        </a>
      </div>
    );
  }

  // Sidebar type
  return (
    <div className="space-y-6">
      {sidebarAds.map((ad, index) => (
        <div key={index} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ad.gradient} flex items-center justify-center text-white mb-4`}>
            {ad.icon}
          </div>
          
          <h4 className="font-medium text-gray-900 mb-3">{ad.title}</h4>
          <p className="text-gray-600 font-light text-sm mb-4 leading-relaxed">{ad.description}</p>
          
          <a
            href={ad.link}
            className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-light text-sm transition-colors duration-300"
          >
            <span>{ad.cta}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      ))}
    </div>
  );
}