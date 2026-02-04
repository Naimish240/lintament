import React from 'react';
import { Github, Twitter } from 'lucide-react';
interface FooterProps {
  onNavigate?: (page: 'landing' | 'docs') => void;
}
export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="font-serif font-bold text-lg sm:text-xl text-white mb-1">
            Lintament
          </div>
          <p className="text-[10px] sm:text-xs text-secondary">
            Made with questionable decisions.
          </p>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
          {onNavigate &&
          <button
            onClick={() => onNavigate('docs')}
            className="text-secondary hover:text-primary transition-colors">

              Documentation
            </button>
          }
          <a
            href="https://github.com/Naimish240/lintament/"
            className="text-secondary hover:text-primary transition-colors">

            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="#"
            className="text-secondary hover:text-primary transition-colors">

            <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>

        <div className="text-[10px] sm:text-xs text-secondary text-center md:text-left">
          © {new Date().getFullYear()} Lintament. No rights reserved.
        </div>
      </div>
    </footer>);

}