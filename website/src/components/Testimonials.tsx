import React from 'react';
import { Quote } from 'lucide-react';
const testimonials = [
{
  quote:
  "Finally, a linter that understands me. I don't need 'clean code', I need spiritual guidance.",
  author: 'Anonymous Developer',
  role: 'Full Stack Philosopher'
},
{
  quote:
  'My code reviews are now just philosophy discussions. Productivity is down 400%, but morale is at an all-time high.',
  author: 'Sarah Jenkins',
  role: 'Senior Engineer'
},
{
  quote:
  'I used to fix bugs. Now I just achieve enlightenment and close the ticket.',
  author: 'David Chen',
  role: 'Tech Lead'
}];

export function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-center mb-8 sm:mb-12 md:mb-16">
          Voices from the Temple
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((item, index) =>
          <div
            key={index}
            className="relative p-6 sm:p-8 rounded-2xl bg-surface border border-white/5">

              <Quote className="absolute top-4 left-4 sm:top-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 text-primary/20" />
              <p className="relative z-10 text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-serif italic">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex-shrink-0" />
                <div>
                  <div className="font-bold text-xs sm:text-sm">{item.author}</div>
                  <div className="text-[10px] sm:text-xs text-primary">{item.role}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}