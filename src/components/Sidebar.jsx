import { Activity, BarChart3, ChevronRight, Recycle, Settings, Trophy, Users } from 'lucide-react';

const navigation = [
  { label: 'Início', icon: BarChart3 },
  { label: 'Ranking', icon: Trophy, badge: '3º' },
  { label: 'Meu perfil', icon: Users },
];

export default function Sidebar({ page, setPage, xp, level, levelProgress, isOpen, onClose, notify }) {
  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-20 flex w-[248px] flex-col border-r border-[#e9eee7] bg-white px-[17px] py-[27px] pb-[14px] max-[1100px]:w-[220px] max-[720px]:w-[84vw] max-[720px]:max-w-[290px] max-[720px]:-translate-x-full max-[720px]:p-4 max-[720px]:py-[22px] max-[720px]:pb-[13px] max-[720px]:shadow-[12px_0_35px_#1f322015] max-[720px]:transition-transform ${isOpen ? 'max-[720px]:translate-x-0' : ''}`}>
        <button className="mb-[26px] ml-[5px] flex items-center gap-[10px] border-0 bg-transparent p-0 text-left text-[#23412e]" onClick={() => setPage('Início')}>
          <span className="grid size-[38px] place-items-center rounded-[13px] bg-[#e8f3e7] text-[#438c55]"><Recycle size={21} /></span>
          <span className="font-display text-[20px] font-extrabold leading-none tracking-[-1px]">eco<strong className="font-medium text-[#76a779]">league</strong><small className="mt-[5px] block font-sans text-[11px] font-medium tracking-[.7px] text-[#9aa49b]">Jogue pelo planeta</small></span>
        </button>

        <section className="mb-[26px] rounded-[11px] bg-[#f3f7f0] p-3" aria-label="Resumo de EcoPoints">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-[.6px] text-[#829183]"><span>SEUS ECOPOINTS</span><span>✦</span></div>
          <strong className="my-[9px] block font-display text-[24px] text-[#344239]">{xp.toLocaleString('pt-BR')} <small className="font-sans text-[11px] font-medium text-[#8c9b8e]">XP</small></strong>
          <div className="mb-2 h-[5px] overflow-hidden rounded-full bg-[#e4ebe1]"><i className="block h-full rounded-full bg-[#78b27b]" style={{ width: `${levelProgress / 10}%` }} /></div>
          <div className="flex justify-between text-[10px] text-[#829183]"><span>Nível {level}</span><span>{levelProgress}/1.000 XP</span></div>
        </section>

        <p className="mb-[9px] ml-[9px] text-[11px] font-bold tracking-[1px] text-[#a4ada4]">MENU PRINCIPAL</p>
        <nav className="grid gap-1" aria-label="Navegação principal">
          {navigation.map(({ label, icon: Icon, badge }) => (
            <button className={`flex h-[41px] items-center gap-3 rounded-[9px] px-[10px] text-left text-[13px] text-[#79857c] hover:bg-[#edf5eb] hover:text-[#337347] ${page === label ? 'bg-[#edf5eb] font-bold text-[#337347]' : ''}`} key={label} onClick={() => { setPage(label); onClose(); }}>
              <Icon size={18} strokeWidth={1.8} /><span className="flex-1">{label}</span>
              {badge && <em className="rounded-[5px] bg-[#e5f1e3] px-[6px] py-[3px] text-[10px] not-italic text-[#548354]">{badge}</em>}
            </button>
          ))}
        </nav>

        <div className="min-h-4 flex-1" />
        <nav className="grid gap-1 border-t border-[#eef1ec] pt-2" aria-label="Convites e configurações">
          <button className="flex h-[36px] items-center gap-3 rounded-lg px-[10px] text-left text-xs text-[#79857c] hover:bg-[#edf5eb]" onClick={() => notify('Convites para amigos estarão disponíveis em breve.')}><Users size={17} /><span className="flex-1">Convidar amigos</span><ChevronRight size={14} /></button>
          <button className="flex h-[36px] items-center gap-3 rounded-lg px-[10px] text-left text-xs text-[#79857c] hover:bg-[#edf5eb]" onClick={() => notify('Configurações em breve')}><Settings size={17} /><span className="flex-1">Configurações</span></button>
        </nav>
      </aside>
      {isOpen && <button className="fixed inset-0 z-[15] border-0 bg-[#14251a77] min-[721px]:hidden" aria-label="Fechar menu" onClick={onClose} />}
    </>
  );
}
