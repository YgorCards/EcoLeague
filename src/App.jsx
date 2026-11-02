import { useEffect, useState } from 'react';
import Header from './components/Header';
import RecyclingModal from './components/RecyclingModal';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Groups, { InviteModal } from './pages/Groups';
import { initialActivity, materials, players } from './data';

export default function App() {
  const defaultProfile = { name: 'Ana Oliveira', avatar: '', theme: 'light', notifications: true };
  const [profile, setProfile] = useState(() => {
    try { return { ...defaultProfile, ...JSON.parse(localStorage.getItem('ecoleague-profile') || '{}') }; }
    catch { return defaultProfile; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = profile.theme === 'dark' ? 'dark' : 'light';
  }, [profile.theme]);
  const [page, setPage] = useState('Início');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [xp, setXp] = useState(2340);
  const [totalItems, setTotalItems] = useState(42);
  const [activity, setActivity] = useState(initialActivity);
  const [toast, setToast] = useState('');
  const [groups, setGroups] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ecoleague-groups') || '[]');
      const cutoff = Date.now() - 2 * 24 * 60 * 60 * 1000;
      return stored.filter((group) => !group.dismissedAt && !(group.closed && group.closedAt && new Date(group.closedAt).getTime() <= cutoff));
    } catch { return []; }
  });
  const [inviteGroupId, setInviteGroupId] = useState(() => localStorage.getItem('ecoleague-invite-group') || '');
  useEffect(() => {
    const timer = window.setInterval(() => {
      const cutoff = Date.now() - 2 * 24 * 60 * 60 * 1000;
      setGroups((current) => current.filter((group) => !group.dismissedAt && !(group.closed && group.closedAt && new Date(group.closedAt).getTime() <= cutoff)));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const [inviteGroup, setInviteGroup] = useState(null);
  useEffect(() => { localStorage.setItem('ecoleague-groups', JSON.stringify(groups)); }, [groups]);
  useEffect(() => {
    const openInviteFromUrl = () => {
      const inviteId = new URLSearchParams(window.location.search).get('convite');
      if (!inviteId) { setInviteGroup(null); return; }
      const found = groups.find((group) => group.id === inviteId);
      if (found?.closed) notify('Este grupo já foi encerrado.');
      else if (found) setInviteGroup(found);
      else notify('Este convite não está disponível neste dispositivo.');
    };
    openInviteFromUrl();
    window.addEventListener('popstate', openInviteFromUrl);
    return () => window.removeEventListener('popstate', openInviteFromUrl);
  }, [groups]);
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

  function createGroup(details) {
    const group = { ...details, id: crypto.randomUUID(), owner: profile.name, members: [profile.name] };
    setGroups((current) => [group, ...current]);
    setInviteGroupId(group.id);
    localStorage.setItem('ecoleague-invite-group', group.id);
    notify('Grupo criado! Agora convide seus amigos.');
  }

  function selectInviteGroup(id) {
    setInviteGroupId(id);
    localStorage.setItem('ecoleague-invite-group', id);
  }

  function inviteFriends() {
    const group = groups.find((item) => item.id === inviteGroupId && !item.closed);
    if (!group) {
      notify(groups.some((item) => item.closed) ? 'Escolha um grupo aberto para convidar amigos.' : 'Crie um grupo antes de convidar amigos.');
      setPage('Grupos');
      return;
    }
    const inviteUrl = new URL(window.location.href);
    inviteUrl.search = '';
    inviteUrl.hash = '';
    inviteUrl.searchParams.set('convite', group.id);
    const message = `Oi! Vamos competir juntos no EcoLeague? Entre no grupo “${group.name}”: ${inviteUrl.toString()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  function updateGroup(id, details) {
    setGroups((current) => current.map((group) => group.id === id ? { ...group, ...details } : group));
    notify('Configurações do grupo atualizadas.');
  }

  function closeGroup(id) {
    setGroups((current) => current.map((group) => group.id === id ? { ...group, closed: true, closedAt: new Date().toISOString() } : group));
    notify('Grupo encerrado.');
  }

  function dismissGroup(id) {
    setGroups((current) => current.filter((group) => group.id !== id));
    notify('Grupo removido da sua lista.');
  }

  function closeInvite(accepted) {
    const selected = inviteGroup;
    setInviteGroup(null);
    const url = new URL(window.location.href); url.searchParams.delete('convite'); window.history.replaceState({}, '', url);
    if (!selected) return;
    if (accepted) {
      setGroups((current) => current.map((group) => group.id !== selected.id ? group : group.members.includes(profile.name) ? group : group.members.length >= group.maxMembers ? group : { ...group, members: [...group.members, profile.name] }));
      notify('Você aceitou o convite para a competição!');
    } else notify('Convite rejeitado.');
  }

  function renderPage() {
    if (page === 'Ranking') return <Ranking xp={xp} profile={profile} />;
    if (page === 'Grupos') return <Groups groups={groups} profile={profile} onCreate={createGroup} onUpdate={updateGroup} onCloseGroup={closeGroup} onDismissGroup={dismissGroup} onSelectInviteGroup={selectInviteGroup} notify={notify} />;
    if (page === 'Meu perfil') return <Profile xp={xp} level={level} totalItems={totalItems} activity={activity} profile={profile} />;
    if (page === 'Configurações') return <Settings profile={profile} onChange={setProfile} onSave={() => { const saved = { ...profile, name: profile.name.trim() }; setProfile(saved); localStorage.setItem('ecoleague-profile', JSON.stringify(saved)); notify('Configurações salvas!'); }} notify={notify} />;
    return <Dashboard xp={xp} level={level} rank={currentPosition} progress={levelProgress} totalItems={totalItems} activity={activity} profile={profile} onRegister={() => setIsModalOpen(true)} onNavigate={setPage} />;
  }

  return (
    <div className="min-h-screen bg-eco-50 font-sans">
      <Sidebar page={page} setPage={setPage} xp={xp} level={level} levelProgress={levelProgress} isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} onInviteFriends={inviteFriends} />
      <main className="ml-[248px] min-h-screen max-[1100px]:ml-[220px] max-[720px]:ml-0">
        <Header page={page} level={level} profile={profile} onMenuClick={() => setIsMobileNavOpen((open) => !open)} onProfileClick={() => setPage('Meu perfil')} notify={notify} />
        <div className="mx-auto w-full max-w-[1480px] px-[43px] pb-7 pt-8 max-[1100px]:px-[26px] max-[720px]:px-[15px] max-[720px]:pb-6 max-[720px]:pt-[22px]">{renderPage()}</div>
      </main>
      {isModalOpen && <RecyclingModal onClose={() => setIsModalOpen(false)} onSubmit={registerMaterial} />}
      {inviteGroup && <InviteModal group={inviteGroup} onAccept={() => closeInvite(true)} onReject={() => closeInvite(false)} />}
      {toast && <div className="fixed bottom-[22px] right-6 z-[60] rounded-lg bg-[#214d34] px-4 py-3 text-xs text-white shadow-lg max-[720px]:inset-x-3 max-[720px]:bottom-[calc(12px+env(safe-area-inset-bottom))] max-[720px]:text-center" role="status">✓ {toast}</div>}
    </div>
  );
}
