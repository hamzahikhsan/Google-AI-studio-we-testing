/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ConsoleShowcase } from './components/ConsoleShowcase';
import { Capabilities } from './components/Capabilities';
import { InteractiveDeployment } from './components/InteractiveDeployment';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToConsole = () => {
    const el = document.getElementById('console-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToDeploy = () => {
    const el = document.getElementById('deploy');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 3-zone Header Contract */}
      <Navbar onLaunchConsole={scrollToConsole} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreConsole={scrollToConsole}
          onOpenDeployModal={scrollToDeploy}
        />

        {/* Live Operations Console (Collapsible sidebar, summary cards, data table) */}
        <ConsoleShowcase />

        {/* Capabilities Bento Grid */}
        <Capabilities />

        {/* Quick CLI & Deployment Lead Capture */}
        <InteractiveDeployment />
      </main>

      {/* Quiet Footer */}
      <Footer />
    </div>
  );
}
