import React from 'react';
import { WizardProvider } from './context/WizardContext';
import { Wizard } from './components/Wizard';
import Footer from './components/common/Footer';

function App() {
  return (
    <WizardProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Wizard />
        </main>
        <Footer />
      </div>
    </WizardProvider>
  );
}

export default App;