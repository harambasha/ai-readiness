import React from 'react';
import { WizardProvider } from './context/WizardContext';
import { LanguageProvider } from './context/LanguageContext';
import { Wizard } from './components/Wizard';
import Footer from './components/common/Footer';
import LanguageSwitcher from './components/common/LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <WizardProvider>
        <div className="min-h-screen flex flex-col">
          <LanguageSwitcher />
          <main className="flex-grow">
            <Wizard />
          </main>
          <Footer />
        </div>
      </WizardProvider>
    </LanguageProvider>
  );
}

export default App;