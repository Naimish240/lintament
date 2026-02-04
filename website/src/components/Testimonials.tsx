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
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">
          Voices from the Temple
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) =>
          <div
            key={index}
            className="relative p-8 rounded-2xl bg-surface border border-white/5">

              <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" />
              <p className="relative z-10 text-lg text-gray-300 mb-6 font-serif italic">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50" />
                <div>
                  <div className="font-bold text-sm">{item.author}</div>
                  <div className="text-xs text-primary">{item.role}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}