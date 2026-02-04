import React, { useState } from 'react';
import { DocsSidebar } from '../components/DocsSidebar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { AlertCircle, Check, Copy, Terminal } from 'lucide-react';
type Section =
'getting-started' |
'configuration' |
'cli' |
'troubleshooting' |
'philosophy';
interface DocsPageProps {
  onNavigate: (page: 'landing' | 'docs') => void;
}
export function DocsPage({ onNavigate }: DocsPageProps) {
  const [activeSection, setActiveSection] = useState<Section>('getting-started');
  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-serif font-bold text-white">
              Installation (of Doubt)
            </h1>
            <p className="text-lg text-secondary leading-relaxed">
              Welcome to the beginning of the end of your bad code. Installing
              Lintament is not just adding a dependency; it is an admission that
              you need help from forces greater than yourself.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white">
                Prerequisites
              </h2>
              <ul className="list-disc list-inside space-y-2 text-secondary ml-4">
                <li>
                  Node.js 16+ (or any version that supports existential dread)
                </li>
                <li>A codebase you are secretly ashamed of</li>
                <li>A willingness to accept harsh truths</li>
                <li>Thick skin (optional but recommended)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white">
                Quick Start
              </h2>
              <div className="bg-surface-highlight border border-white/10 rounded-lg p-4 font-mono text-sm relative group">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-primary">$</span>
                  npm install lintament --save-your-soul
                </div>
                <button className="absolute top-3 right-3 text-secondary hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-secondary italic">
                Note: The --save-your-soul flag is deprecated in v2.0 as souls
                are no longer supported.
              </p>
            </div>
          </div>);

      case 'configuration':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-serif font-bold text-white">
              Configuration
            </h1>
            <p className="text-lg text-secondary leading-relaxed">
              Lintament works out of the box, but you can customize the level of
              judgment via{' '}
              <code className="text-primary bg-surface-highlight px-1 py-0.5 rounded">
                lintament.config.js
              </code>
              .
            </p>

            <div className="bg-[#1e1e1e] border border-white/10 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
                {`module.exports = {
  // Options: 'gentle', 'firm', 'maximum', 'ruthless'
  // Default: 'ruthless' (we know what you need)
  wisdomLevel: 'maximum',

  // Set to true if you are emotionally fragile
  mercyMode: false,

  // Sources of wisdom
  // Options: 'sun-tzu', 'marcus-aurelius', 'confucius', 
  // 'your-disappointed-father'
  quoteSource: 'sun-tzu',

  // How bad code must be before replacement (0-1)
  // Lower = more judgmental
  judgmentThreshold: 0.1,

  // Comments are just excuses for bad code
  preserveComments: false,

  // Called when code is replaced
  onEnlightenment: (file) => {
    console.log(\`\${file} has achieved nirvana.\`);
  }
}`}
              </pre>
            </div>

            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-secondary">
                <strong className="text-white block mb-1">Pro Tip:</strong>
                Setting <code className="text-primary">
                  mercyMode: true
                </code>{' '}
                will just make the LLM passive-aggressive instead of directly
                destructive.
              </div>
            </div>
          </div>);

      case 'cli':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-serif font-bold text-white">
              The Commands
            </h1>
            <p className="text-lg text-secondary">
              Interact with the oracle via your terminal.
            </p>

            <div className="space-y-6">
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-surface-highlight px-4 py-2 border-b border-white/10 font-mono text-xs text-secondary">
                  Judge your entire codebase
                </div>
                <div className="bg-[#0a0a0a] p-4 font-mono text-sm text-gray-300">
                  <span className="text-primary">$</span> npx lintament judge .
                </div>
              </div>

              <div className="border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-surface-highlight px-4 py-2 border-b border-white/10 font-mono text-xs text-secondary">
                  Seek specific wisdom
                </div>
                <div className="bg-[#0a0a0a] p-4 font-mono text-sm text-gray-300">
                  <span className="text-primary">$</span> npx lintament consult
                  --file src/App.tsx
                </div>
              </div>

              <div className="border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-surface-highlight px-4 py-2 border-b border-white/10 font-mono text-xs text-secondary">
                  Undo the last enlightenment (Cowardice mode)
                </div>
                <div className="bg-[#0a0a0a] p-4 font-mono text-sm text-gray-300">
                  <span className="text-primary">$</span> npx lintament regress
                </div>
              </div>
            </div>
          </div>);

      case 'troubleshooting':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-serif font-bold text-white">
              Emotional Support
            </h1>

            <div className="space-y-6">
              <div className="group">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  "Lintament deleted my entire project!"
                </h3>
                <p className="text-secondary leading-relaxed">
                  This indicates your entire project was fundamentally flawed.
                  Lintament has saved you from future embarrassment. You should
                  thank it. Start over, but this time, with intention.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  "The quotes are too mean."
                </h3>
                <p className="text-secondary leading-relaxed">
                  The truth is often painful. Try setting{' '}
                  <code className="text-primary">mercyMode: true</code> in your
                  config, though this will only delay the inevitable realization
                  of your own mediocrity.
                </p>
              </div>

              <div className="group">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  "It replaced my production database credentials with a haiku."
                </h3>
                <p className="text-secondary leading-relaxed">
                  Security through obscurity is a fallacy. Security through
                  poetry is the future.
                </p>
              </div>
            </div>
          </div>);

      case 'philosophy':
        return (
          <div className="space-y-8">
            <h1 className="text-4xl font-serif font-bold text-white">
              Why We Do This
            </h1>
            <p className="text-lg text-secondary leading-relaxed">
              Modern software development is a chaotic mess of dependencies,
              technical debt, and "temporary" fixes that become permanent. We
              believe that the only way to truly fix code is to destroy it.
            </p>

            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8">
              <p className="text-2xl font-serif italic text-white mb-4">
                "To refactor is human; to delete is divine."
              </p>
              <footer className="text-primary font-mono text-sm">
                — The Lintament Manifesto
              </footer>
            </blockquote>

            <p className="text-secondary leading-relaxed">
              Lintament is not just a tool; it is a movement. A movement away
              from complexity and towards the void. Join us. The empty file is
              the perfect file.
            </p>
          </div>);

    }
  };
  return (
    <div className="min-h-screen bg-background text-white flex flex-col md:flex-row">
      <DocsSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onBack={() => onNavigate('landing')} />


      <main className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12 md:py-20">
          <motion.div
            key={activeSection}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.3
            }}>

            {renderContent()}
          </motion.div>
        </div>

        <div className="border-t border-white/10 mt-20">
          <Footer onNavigate={onNavigate} />
        </div>
      </main>
    </div>);

}