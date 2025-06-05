import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechVision",
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg",
      quote: "The assessment provided clear, actionable insights that helped us prioritize our AI initiatives."
    },
    {
      name: "James Wilson",
      role: "CEO, Innovation Labs",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      quote: "This scorecard was instrumental in helping us understand our AI readiness gaps and opportunities."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Digital",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      quote: "The recommendations were practical and helped us create a solid AI implementation roadmap."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how organizations like yours benefited from our AI readiness assessment
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 shadow-xl">
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#B4926E] fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-8">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 