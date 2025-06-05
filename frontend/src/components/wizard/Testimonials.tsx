import React from 'react';

const testimonials = [
  {
    quote: "The AI Readiness Assessment provided invaluable insights into our organization's capabilities and helped us create a clear roadmap for AI implementation.",
    author: "Sarah Johnson",
    role: "CTO, TechCorp"
  },
  {
    quote: "A comprehensive and well-structured assessment that helped us identify key areas for improvement in our AI strategy.",
    author: "Michael Chen",
    role: "Head of Innovation, DataFlow"
  },
  {
    quote: "The personalized recommendations were spot-on and gave us actionable steps to enhance our AI readiness.",
    author: "Emily Rodriguez",
    role: "Director of Digital Transformation, FutureTech"
  }
];

export function Testimonials() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#2E363C] mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-[#F5F6FA] p-8 rounded-lg">
              <p className="text-[#687177] mb-6">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-[#2E363C]">
                  {testimonial.author}
                </p>
                <p className="text-[#687177] text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 