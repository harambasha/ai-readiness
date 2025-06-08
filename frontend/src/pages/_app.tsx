import type { AppProps } from 'next/app';
import { WizardProvider } from '../context/WizardContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WizardProvider>
      <Component {...pageProps} />
    </WizardProvider>
  );
} 