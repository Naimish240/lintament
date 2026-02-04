import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Terminal,
  AlertCircle,
  CheckCircle2 } from
'lucide-react';
const BAD_CODE = `function processUserData(users) {
  if (users) {
    if (users.length > 0) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].isActive) {
          if (users[i].role === 'admin') {
            // TODO: fix this mess later
            save(users[i]);
          }
        }
      }
    }
  }
}`;
const WISDOM_QUOTE = `/* 
 * "The supreme art of war is to subdue 
 *  the enemy without fighting."
 * 
 * - Sun Tzu, The Art of War
 */

// Code replaced by Lintament v1.0
// Reason: Cognitive complexity exceeds 
// mortal comprehension.`;
export function CodeTransformDemo() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'wisdom'>('idle');
  const handleLint = () => {
    setStatus('scanning');
    setTimeout(() => {
      setStatus('wisdom');
    }, 2000);
  };
  const handleReset = () => {
    setStatus('idle');
  };
  return (
    <section className="py-20 px-4 bg-surface/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            See the Enlightenment
          </h2>
          <p className="text-secondary">
            Watch as spaghetti code is transformed into timeless wisdom.
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1e1e1e]">
          {/* Window Controls */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="text-xs text-secondary font-mono flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              lintament-demo.js
            </div>
            <div className="w-16" /> {/* Spacer */}
          </div>

          {/* Code Area */}
          <div className="relative min-h-[400px] p-6 md:p-8 font-mono text-sm md:text-base overflow-hidden">
            <AnimatePresence mode="wait">
              {status === 'idle' || status === 'scanning' ?
              <motion.div
                key="bad-code"
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0,
                  filter: 'blur(10px)'
                }}
                className="text-gray-300 whitespace-pre">

                  {BAD_CODE.split('\n').map((line, i) =>
                <div key={i} className="relative">
                      <span className="inline-block w-8 text-gray-600 select-none text-right mr-4">
                        {i + 1}
                      </span>
                      <span
                    className={
                    line.includes('if') || line.includes('for') ?
                    'text-purple-400' :
                    ''
                    }>

                        {line}
                      </span>
                      {/* Error Indicators */}
                      {(line.includes('if') || line.includes('for')) &&
                  <motion.span
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1
                    }}
                    className="absolute right-0 text-error text-xs flex items-center gap-1">

                          <AlertCircle className="w-3 h-3" />
                          <span>complexity overload</span>
                        </motion.span>
                  }
                    </div>
                )}

                  {/* Scanning Effect */}
                  {status === 'scanning' &&
                <motion.div
                  className="absolute inset-0 bg-primary/5 border-b-2 border-primary/50 z-10"
                  initial={{
                    top: 0,
                    height: '0%'
                  }}
                  animate={{
                    top: '100%',
                    height: '0%'
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'linear',
                    repeat: Infinity
                  }}
                  style={{
                    height: '4px',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
                  }} />

                }
                </motion.div> :

              <motion.div
                key="wisdom"
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="flex items-center justify-center h-full min-h-[300px]">

                  <div className="text-center space-y-6">
                    <div className="inline-block p-4 rounded-full bg-success/10 text-success mb-4">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-serif text-primary italic max-w-2xl mx-auto leading-relaxed">
                      "The supreme art of war is to subdue the enemy without
                      fighting."
                    </blockquote>
                    <div className="text-secondary font-mono text-sm">
                      — Sun Tzu, The Art of War
                    </div>
                    <div className="text-xs text-gray-500 mt-8 font-mono border-t border-white/10 pt-4">
                      Original code removed for your own protection.
                    </div>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 right-6 z-20">
            {status === 'idle' ?
            <button
              onClick={handleLint}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-black/50">

                <Play className="w-4 h-4" />
                Run Lintament
              </button> :
            status === 'wisdom' ?
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-surface-highlight text-white border border-white/10 rounded-lg hover:bg-white/10 transition-colors shadow-lg shadow-black/50">

                <RotateCcw className="w-4 h-4" />
                Reset Demo
              </button> :

            <button
              disabled
              className="flex items-center gap-2 px-6 py-3 bg-surface-highlight text-secondary border border-white/5 rounded-lg cursor-wait">

                <span className="animate-spin">⟳</span>
                Consulting the Ancients...
              </button>
            }
          </div>
        </div>
      </div>
    </section>);

}