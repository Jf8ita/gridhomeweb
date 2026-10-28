/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import TechnologyView from './components/TechnologyView';
import CalculatorView from './components/CalculatorView';
import AerothermalView from './components/AerothermalView';

export default function App() {
  const [currentPath, setCurrentPath] = useState('home');
  const [expandedTechSection, setExpandedTechSection] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setExpandedTechSection(null);
  };

  const handleExplore = (sectionId: string) => {
    setExpandedTechSection(sectionId);
    setCurrentPath('technology');
  };

  return (
    <Layout currentPath={currentPath} onNavigate={handleNavigate}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {currentPath === 'home' && <HomeView onExplore={handleExplore} />}
          {currentPath === 'technology' && <TechnologyView expandedSection={expandedTechSection} />}
          {currentPath === 'aerothermal' && <AerothermalView />}
          {currentPath === 'calculator' && <CalculatorView />}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}


