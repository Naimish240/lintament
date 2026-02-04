import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { DocsPage } from './pages/DocsPage';
export function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'docs'>('landing');
  return (
    <>
      {currentPage === 'landing' ?
      <LandingPage onNavigate={setCurrentPage} /> :

      <DocsPage onNavigate={setCurrentPage} />
      }
    </>);

}