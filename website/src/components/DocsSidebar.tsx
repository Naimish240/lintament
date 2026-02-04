import React from 'react';
import {
  Book,
  Terminal,
  Settings,
  HelpCircle,
  AlertTriangle,
  Scroll } from
'lucide-react';
type Section =
'getting-started' |
'configuration' |
'cli' |
'troubleshooting' |
'philosophy';
interface DocsSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  onBack: () => void;
}
export function DocsSidebar({
  activeSection,
  onSectionChange,
  onBack
}: DocsSidebarProps) {
  const navItems = [
  {
    id: 'getting-started',
    label: 'Installation (of Doubt)',
    icon: Terminal
  },
  {
    id: 'configuration',
    label: 'Configuration',
    icon: Settings
  },
  {
    id: 'cli',
    label: 'The Commands',
    icon: Scroll
  },
  {
    id: 'troubleshooting',
    label: 'Emotional Support',
    icon: AlertTriangle
  },
  {
    id: 'philosophy',
    label: 'Why We Do This',
    icon: HelpCircle
  }] as
  const;
  return (
    <aside className="w-full md:w-64 bg-surface border-r border-white/5 flex flex-col h-full sticky top-0">
      <div className="p-6 border-b border-white/5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-serif font-bold text-xl hover:opacity-80 transition-opacity">

          <Book className="w-5 h-5" />
          <span>Lintament Docs</span>
        </button>
        <div className="text-xs text-secondary mt-1 font-mono">
          v0.0.1 (Alpha/Omega)
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) =>
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id as Section)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeSection === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-secondary hover:bg-white/5 hover:text-white'}`}>

            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        )}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="p-3 rounded bg-surface-highlight border border-white/5 text-xs text-secondary">
          <p className="font-bold text-white mb-1">Warning:</p>
          Reading these docs may cause introspection.
        </div>
      </div>
    </aside>);

}