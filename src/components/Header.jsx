import { Bell, ChevronDown, Menu, Users } from 'lucide-react';

export default function Header({ page, level, onMenuClick, onProfileClick, notify }) {
  return (
    <header className="flex h-[65px] items-center justify-between border-b border-[#e9eee7] bg-[#f9faf7] px-[43px] text-xs text-[#9aa39b] max-[1100px]:px-[26px] max-[720px]:h-14 max-[720px]:gap-[9px] max-[720px]:px-[13px]">
      <button className="hidden size-[34px] place-items-center rounded-lg border-0 bg-transparent text-[#607067] max-[720px]:grid" onClick={onMenuClick} aria-label="Abrir navegação"><Menu size={20} /></button>
      <div className="flex items-center gap-[9px] max-[720px]:flex-1 max-[720px]:gap-1 max-[720px]:overflow-hidden max-[720px]:whitespace-nowrap"><span className="max-[720px]:hidden">EcoLeague</span><i className="text-[#c5ccc4] not-italic max-[720px]:hidden">/</i><strong className="font-semibold text-[#4c5b4e]">{page}</strong></div>
      <div className="flex items-center gap-3 max-[720px]:gap-[7px]">
        <button className="relative grid size-[34px] place-items-center rounded-lg border border-[#e7ebe4] bg-white text-[#637067]" onClick={() => notify('Você está em dia com as novidades!')} aria-label="Notificações"><Bell size={17} /><i className="absolute right-[5px] top-[5px] size-[6px] rounded-full border border-white bg-[#ec9c66]" /></button>
        <button className="flex items-center gap-2 rounded-lg border border-transparent bg-transparent px-2 py-1 text-left hover:border-[#e7ebe4] hover:bg-white" onClick={onProfileClick} aria-label="Abrir perfil e equipe">
          <span className="grid size-[32px] shrink-0 place-items-center rounded-full bg-[#eee9f7] text-[10px] font-semibold text-[#6d5c92]"><Users size={15} /></span>
          <span className="grid gap-[2px] max-[720px]:gap-0"><strong className="text-[11px] font-semibold text-[#4c5b4e] max-[720px]:hidden">Ana Oliveira</strong><small className="text-[10px] text-[#8d988e] max-[720px]:text-[9px]">Nível {level} · Guardiã</small></span>
          <ChevronDown size={14} className="text-[#8d988e] max-[720px]:hidden" />
        </button>
      </div>
    </header>
  );
}

