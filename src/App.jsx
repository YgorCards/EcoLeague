import { useState } from 'react';
import Header from './components/Header';
import RecyclingModal from './components/RecyclingModal';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import { initialActivity, materials, players } from './data';

export default function App() {
  const defaultProfile = { name: 'Ana Oliveira', avatar: '', theme: 'light', notifications: true };
  const [profile, setProfile] = useState(() => {
    try { return { ...defaultProfile, ...JSON.parse(localStorage.getItem('ecoleague-profile') || '{}') }; }
    catch { return defaultProfile; }
  });
  const [page, setPage] = useState('Início');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [xp, setXp] = useState(2340);
  const [totalItems, setTotalItems] = useState(42);
  const [activity, setActivity] = useState(initialActivity);
  const [toast, setToast] = useState('');
  const level = Math.floor(xp / 1000) + 1;
  const levelProgress = xp % 1000;
  const currentPosition = [...players]
    .map((player) => player.me ? { ...player, points: xp } : player)
    .sort((a, b) => b.points - a.points)
    .findIndex((player) => player.me) + 1;

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  function registerMaterial(materialId, amount) {
    const material = materials.find((item) => item.id === materialId);
    const points = material.points * amount;
    setXp((currentXp) => currentXp + points);
    setTotalItems((currentCount) => currentCount + amount);
    setActivity((currentActivity) => [{
      id: Date.now(), name: material.name, amount, points, when: 'Agora mesmo', emoji: material.emoji,
    }, ...currentActivity]);
    setIsModalOpen(false);
    notify(`+${points} EcoPoints adicionados!`);
  }

  function renderPage() {
    if (page === 'Ranking') return <Ranking xp={xp} profile={profile} />;
    if (page === 'Meu perfil') return <Profile xp={xp} level={level} totalItems={totalItems} activity={activity} profile={profile} />;
    if (page === 'Configurações') return <Settings profile={profile} onChange={setProfile} onSave={() => { const saved = { ...profile, name: profile.name.trim() }; setProfile(saved); localStorage.setItem('ecoleague-profile', JSON.stringify(saved)); notify('Configurações salvas!'); }} notify={notify} />;
    return <Dashboard xp={xp} level={level} rank={currentPosition} progress={levelProgress} totalItems={totalItems} activity={activity} profile={profile} onRegister={() => setIsModalOpen(true)} onNavigate={setPage} />;
  }

  return (
    <div className="min-h-screen bg-eco-50 font-sans">
      <Sidebar page={page} setPage={setPage} xp={xp} level={level} levelProgress={levelProgress} isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} notify={notify} />
      <main className="ml-[248px] min-h-screen max-[1100px]:ml-[220px] max-[720px]:ml-0">
        <Header page={page} level={level} profile={profile} onMenuClick={() => setIsMobileNavOpen((open) => !open)} onProfileClick={() => setPage('Meu perfil')} notify={notify} />
        <div className="mx-auto w-full max-w-[1480px] px-[43px] pb-7 pt-8 max-[1100px]:px-[26px] max-[720px]:px-[15px] max-[720px]:pb-6 max-[720px]:pt-[22px]">{renderPage()}</div>
      </main>
      {isModalOpen && <RecyclingModal onClose={() => setIsModalOpen(false)} onSubmit={registerMaterial} />}
      {toast && <div className="fixed bottom-[22px] right-6 z-[60] rounded-lg bg-[#214d34] px-4 py-3 text-xs text-white shadow-lg max-[720px]:inset-x-3 max-[720px]:bottom-[calc(12px+env(safe-area-inset-bottom))] max-[720px]:text-center" role="status">✓ {toast}</div>}
    </div>
  );
}
