import React from 'react';
import { Github, Twitter } from 'lucide-react';
interface FooterProps {
  onNavigate?: (page: 'landing' | 'docs') => void;
}
export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="font-serif font-bold text-xl text-white mb-1">
            Lintament
          </div>
          <p className="text-xs text-secondary">
            Made with questionable decisions.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          {onNavigate &&
          <button
            onClick={() => onNavigate('docs')}
            className="text-secondary hover:text-primary transition-colors">

              Documentation
            </button>
          }
          <a
            href="#"
            className="text-secondary hover:text-primary transition-colors">

            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-secondary hover:text-primary transition-colors">

            <Twitter className="w-5 h-5" />
          </a>
        </div>

        <div className="text-xs text-secondary">
          © {new Date().getFullYear()} Lintament. No rights reserved.
        </div>
      </div>
    </footer>);

}