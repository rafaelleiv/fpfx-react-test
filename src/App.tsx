import Overview from '@/components/Overview.tsx';
import LeaderBoard from '@/components/LeaderBoard.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-primary text-textPrimary">
      <div className="max-w-7xl mx-auto px-3 py-4 sm:px-8 sm:py-10">
        {/* Leaderboard Section */}
        <section className="bg-secondary p-4 rounded-lg shadow-md">
          <LeaderBoard />
        </section>

        {/* Overview Section */}
        <section className="mt-8 bg-secondary p-4 rounded-lg shadow-md">
          <Overview />
        </section>
      </div>
    </div>
  );
}
