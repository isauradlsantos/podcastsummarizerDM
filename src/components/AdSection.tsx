import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdSectionProps {
  type: 'sidebar' | 'banner' | 'sponsored';
}

export default function AdSection({ type }: AdSectionProps) {
  const sidebarAds = [
    {
      title: "Premium Coffee Subscription",
      description: "Artisan coffee delivered to your door. Fresh roasted beans from around the world.",
      cta: "Get 20% Off",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop",
      link: "#"
    },
    {
      title: "Smart Home Security",
      description: "Protect your home with AI-powered cameras and smart sensors. 24/7 monitoring included.",
      cta: "Free Installation",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      link: "#"
    },
    {
      title: "Fitness App Premium",
      description: "Personalized workout plans, nutrition tracking, and live coaching sessions.",
      cta: "Start Free Trial",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      link: "#"
    },
    {
      title: "Travel Insurance Plus",
      description: "Comprehensive coverage for your adventures. Medical, baggage, and trip cancellation protection.",
      cta: "Get Quote",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
      link: "#"
    }
  ];

  const sponsoredContent = {
    title: "Sponsored by TechGear Pro",
    description: "Premium tech accessories for professionals. Wireless charging, smart watches, and more.",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=250&fit=crop",
    features: ["Free shipping", "30-day returns", "Premium support", "Lifetime warranty"],
    cta: "Shop Now",
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
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="relative">
          <img 
            src={sponsoredContent.image} 
            alt={sponsoredContent.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-light text-gray-700 uppercase tracking-wide">SPONSORED</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
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
      </div>
    );
  }

  // Sidebar type
  return (
    <div className="grid grid-cols-4 gap-4">
      {sidebarAds.map((ad, index) => (
        <div key={index} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="relative">
            <img 
              src={ad.image} 
              alt={ad.title}
              className="w-full h-32 object-cover"
            />
          </div>
          
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-2 text-sm">{ad.title}</h4>
            <p className="text-gray-600 font-light text-xs mb-3 leading-relaxed">{ad.description}</p>
            
            <a
              href={ad.link}
              className="inline-flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-light text-xs transition-colors duration-300"
            >
              <span>{ad.cta}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}