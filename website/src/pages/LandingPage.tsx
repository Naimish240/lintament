import React from 'react';
import { Hero } from '../components/Hero';
import { CodeTransformDemo } from '../components/CodeTransformDemo';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Star } from 'lucide-react';
interface LandingPageProps {
  onNavigate: (page: 'landing' | 'docs') => void;
}
export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-primary-light">
      <main>
        <Hero onNavigate={onNavigate} />
        <CodeTransformDemo />
        <Features />
        <HowItWorks />
        <Testimonials />

        {/* Final CTA Section */}
        <section className="py-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/50 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Embrace the Chaos?
            </h2>
            <p className="text-xl text-secondary mb-10">
              Or continue writing bad code. We don't judge. (The LLM does.)
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors active:scale-95">
              <Star className="w-5 h-5 fill-black" />
              Star on GitHub
            </button>
          </div>
        </section>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>);

}