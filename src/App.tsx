import LeaderBoard from './components/LeaderBoard.tsx';
import Overview from './components/Overview.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-primary text-textPrimary">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <section className="bg-secondary p-4 rounded-lg shadow-md">
          <LeaderBoard />
        </section>

        {/* Gráfico de resumen */}
        <section className="mt-10 bg-secondary p-4 rounded-lg shadow-md">
          <Overview />
        </section>
      </div>
    </div>
  );
}
