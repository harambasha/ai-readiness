import { Wizard } from '../components/Wizard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Wizard />
      </div>
    </main>
  );
} 