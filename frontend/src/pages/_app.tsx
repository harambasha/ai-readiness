import type { AppProps } from 'next/app';
import { WizardProvider } from '../context/WizardContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WizardProvider>
      <Component {...pageProps} />
    </WizardProvider>
  );
} 