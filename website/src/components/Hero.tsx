import { motion } from 'framer-motion';
import { Scroll, Github } from 'lucide-react';
interface HeroProps {
  onNavigate: (page: 'landing' | 'docs') => void;
}
export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut'
          }}>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-highlight border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Scroll className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>v0.0.1 - The Art of War Edition</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight tracking-tight px-2">
            Lintament: When Your Code Needs{' '}
            <span className="text-primary italic">Ancient Wisdom</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: 'easeOut'
          }}
          className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed px-4">

          An LLM-powered linter that replaces bad code with Sun Tzu quotes.
          Because sometimes, the best fix is philosophical acceptance.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: 'easeOut'
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full px-4">

          <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-black font-bold rounded-lg overflow-hidden transition-transform active:scale-95 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          onClick={() => window.open('https://github.com/Naimish240/lintament/', '_blank')}>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              View on GitHub
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button
            onClick={() => onNavigate('docs')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-surface border border-white/10 text-white rounded-lg hover:bg-surface-highlight transition-colors active:scale-95 text-sm sm:text-base">

            Read the Documentation
          </button>
        </motion.div>
      </div>
    </section>);

}