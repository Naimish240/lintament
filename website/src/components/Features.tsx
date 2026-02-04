import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Scroll, Zap, Eraser } from 'lucide-react';
const features = [
{
  icon: Brain,
  title: 'AI-Powered Judgment',
  description:
  'Our advanced LLM analyzes your code not for bugs, but for spiritual weakness and lack of discipline.'
},
{
  icon: Scroll,
  title: 'Ancient Wisdom',
  description:
  'Replace technical debt with philosophical debt. Why fix a memory leak when you can contemplate the impermanence of RAM?'
},
{
  icon: Zap,
  title: 'Zero Learning Curve',
  description:
  'If you can read, you can be enlightened. There are no configuration files, only destiny.'
},
{
  icon: Eraser,
  title: 'Instant Enlightenment',
  description:
  'No refactoring required. Bad code is simply removed from existence, as it should be.'
}];

export function Features() {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: index * 0.1,
              duration: 0.5
            }}
            className="group p-5 sm:p-6 rounded-xl bg-surface border border-white/5 hover:border-primary/50 transition-colors duration-300">

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-surface-highlight flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}