import React from 'react';
import { Terminal, Scale, Sparkles } from 'lucide-react';
export function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-surface/30 border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-8 sm:mb-12 md:mb-16">
          The Path to Enlightenment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          {/* Step 1 */}
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface border-4 border-surface-highlight flex items-center justify-center mb-4 sm:mb-6 z-10 relative">
              <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-secondary" />
              <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-surface-highlight flex items-center justify-center font-bold font-mono text-xs sm:text-sm border border-white/10">
                1
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Run Lintament</h3>
            <p className="text-secondary text-xs sm:text-sm px-2">
              Execute the command in your terminal. Watch your CPU spike as it
              judges your life choices.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface border-4 border-primary/20 flex items-center justify-center mb-4 sm:mb-6 z-10 relative shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <Scale className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-black flex items-center justify-center font-bold font-mono text-xs sm:text-sm">
                2
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">The Judgment</h3>
            <p className="text-secondary text-xs sm:text-sm px-2">
              Our LLM analyzes your nested loops and lack of comments with the
              severity of a 10x engineer.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface border-4 border-surface-highlight flex items-center justify-center mb-4 sm:mb-6 z-10 relative">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-success" />
              <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-surface-highlight flex items-center justify-center font-bold font-mono text-xs sm:text-sm border border-white/10">
                3
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">Wisdom Prevails</h3>
            <p className="text-secondary text-xs sm:text-sm px-2">
              Bad code is nuked. Sun Tzu quotes are inserted. Your codebase is
              now a temple.
            </p>
          </div>
        </div>
      </div>
    </section>);

}