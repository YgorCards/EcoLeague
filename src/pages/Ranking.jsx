import { useMemo, useState } from 'react';
import { ChevronDown, ShieldCheck, Users } from 'lucide-react';
import PageHeading from '../components/PageHeading';
import { players } from '../data';

const teams = [
  { name: 'Folhas em Ação', initials: '🍃', points: 12480 },
  { name: 'Planeta Azul', initials: '🌊', points: 11230 },
  { name: 'Time Recomeço', initials: '🌱', points: 9840, me: true },
  { name: 'Verde que te quero', initials: '🌿', points: 8210 },
  { name: 'Raiz Forte', initials: '🌳', points: 7790 },
];

export default function Ranking({ xp }) {
  const [tab, setTab] = useState('Individual');
  const [period, setPeriod] = useState('Esta semana');
  const individual = useMemo(() => players.map((player) => player.me ? { ...player, points: xp } : player).sort((a, b) => b.points - a.points), [xp]);
  const entries = tab === 'Individual' ? individual : teams;

  function togglePeriod() {
    setPeriod((currentPeriod) => currentPeriod === 'Esta semana' ? 'Este mês' : 'Esta semana');
  }

  return (
    <>
      <PageHeading eyebrow="COMPETIÇÃO SAUDÁVEL" title="Ranking" description="Um pouco de competição, muita mudança positiva."
        action={(
          <button
            aria-label={`Período: ${period}. Toque para alternar.`}
            className="flex h-[36px] shrink-0 items-center gap-[7px] rounded-lg border border-[#e9eee7] bg-white px-3 text-[11px] font-medium text-[#526052] transition-colors hover:bg-[#f5f8f3] max-[720px]:bg-[#edf5eb] max-[720px]:px-[10px] max-[720px]:text-[#3f7047]"
            onClick={togglePeriod}
          >
            <span className="max-[720px]:hidden">{period}</span>
            <span className="hidden max-[720px]:inline">{period === 'Esta semana' ? 'Semana' : 'Mês'}</span>
            <ChevronDown size={15} className="shrink-0" />
          </button>
        )}
      />

      <section className="relative mb-[14px] flex h-[225px] justify-between overflow-hidden rounded-[13px] bg-[#214833] px-[25px] py-[22px] text-white max-[720px]:h-[340px] max-[720px]:p-4">
        <div className="relative z-[2] max-[720px]:max-w-[270px]">
          <span className="text-[10px] font-bold tracking-[1px] text-[#d0dfa9]">🏆 TEMPORADA DE PRIMAVERA</span>
          <h2 className="my-[10px] font-display text-[25px] font-semibold leading-tight max-[720px]:text-[21px]">O planeta ganha<br />quando <em className="text-[#c9e1aa] not-italic">todo mundo joga.</em></h2>
          <p className="mb-4 text-[11px] text-[#c4d1c3] max-[720px]:mb-[10px]">Confira quem está fazendo bonito nesta temporada.</p>
          <small className="flex items-center text-[10px] text-[#d1dfce]"><Users size={14} /> 24 participantes　 🔥 12 dias restantes</small>
        </div>
        <div className="flex items-end gap-[11px] pr-5 max-[720px]:absolute max-[720px]:inset-x-0 max-[720px]:bottom-0 max-[720px]:h-[136px] max-[720px]:justify-center max-[720px]:gap-3 max-[720px]:pr-0">
          {entries.slice(0, 3).map((player, index) => (
            <div className="flex w-[65px] flex-col items-center text-center max-[720px]:w-[76px]" key={player.name}>
              <b className="grid size-[35px] place-items-center rounded-full bg-[#e2edda] text-[11px] text-[#568450]">{index === 0 ? '♛' : player.initials}</b>
              <span className="my-1 text-[10px] text-[#e7eee4]">{player.name.split(' ')[0]}</span>
              <small className="text-[9px] text-[#e7eee4]">{player.points.toLocaleString('pt-BR')} XP</small>
              <i className={`mt-[6px] h-12 w-full relative rounded-t-[5px] bg-[#9dbb7e] pt-[7px] font-display after:absolute after:inset-x-0 after:top-full after:h-[22px] after:content-[''] text-base font-bold not-italic text-[#496b49] max-[720px]:h-[37px] ${index === 0 ? 'h-[68px] bg-[#c0d696] after:bg-[#c0d696] max-[720px]:h-[51px]' : index === 1 ? 'bg-[#829d73] text-white after:bg-[#829d73]' : 'h-[34px] bg-[#708e67] text-white after:bg-[#708e67] max-[720px]:h-[30px]'}`}>{index + 1}</i>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-[#edf0eb] bg-white p-[17px] max-[720px]:p-3">
        <div className="mb-[14px] flex items-center justify-between gap-2 max-[720px]:items-start">
          <div><h2 className="mb-1 font-display text-[15px] font-bold text-[#39473d] max-[720px]:text-[12px]">Classificação geral</h2><p className="m-0 text-[11px] text-[#96a097] max-[720px]:max-w-[150px] max-[720px]:text-[9px]">A disputa está acirrada — continue no ritmo!</p></div>
          <div className="flex gap-[2px] rounded-lg bg-[#f1f4ef] p-[3px]">
            <button className={`flex items-center gap-[5px] rounded-md px-[9px] py-[7px] text-[10px] ${tab === 'Individual' ? 'bg-white text-[#4c8052] shadow-sm' : 'bg-transparent text-[#879188]'} max-[720px]:p-[7px]`} onClick={() => setTab('Individual')}><Users size={14} /><span className="max-[720px]:hidden">Individual</span></button>
            <button className={`flex items-center gap-[5px] rounded-md px-[9px] py-[7px] text-[10px] ${tab === 'Equipes' ? 'bg-white text-[#4c8052] shadow-sm' : 'bg-transparent text-[#879188]'} max-[720px]:p-[7px]`} onClick={() => setTab('Equipes')}><ShieldCheck size={14} /><span className="max-[720px]:hidden">Equipes</span></button>
          </div>
        </div>
        <div className="grid grid-cols-[.6fr_2.2fr_1fr_.75fr] items-center border-b border-[#eff2ee] px-2 pb-2 text-[9px] font-bold tracking-[.6px] text-[#a1aaa1] max-[720px]:grid-cols-[.38fr_1.75fr_.85fr] max-[720px]:px-[3px] max-[720px]:text-[8px]"><span>POSIÇÃO</span><span>PARTICIPANTE</span><span>PONTOS</span><span className="max-[720px]:hidden">ÚLTIMOS 7 DIAS</span></div>
        {entries.map((entry, index) => (
          <div className={`grid min-h-[45px] grid-cols-[.6fr_2.2fr_1fr_.75fr] items-center border-b border-[#f0f2ef] px-2 py-[7px] text-[11px] text-[#768276] last:border-0 max-[720px]:min-h-[44px] max-[720px]:grid-cols-[.38fr_1.75fr_.85fr] max-[720px]:px-[3px] max-[720px]:text-[10px] ${entry.me ? 'rounded-lg bg-[#f6faf4]' : ''}`} key={entry.name}>
            <span className={index < 3 ? 'text-[#b78463]' : ''}>{String(index + 1).padStart(2, '0')}</span>
            <span className="flex min-w-0 items-center gap-2 max-[720px]:gap-[5px]"><i className="grid size-[27px] shrink-0 place-items-center rounded-full bg-[#e6efe2] text-[10px] not-italic text-[#59815b] max-[720px]:size-6">{entry.initials}</i><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-semibold text-[#506052] max-[720px]:text-[10px]">{entry.name}</strong>{entry.me && <em className="rounded bg-[#e8f2e4] px-[5px] py-[3px] text-[8px] not-italic text-[#5f9163]">VOCÊ</em>}</span>
            <strong className="whitespace-nowrap text-[#465646]">{entry.points.toLocaleString('pt-BR')} <small className="text-[9px] font-normal text-[#9aa49a]">XP</small></strong><span className="text-[#65a06d] max-[720px]:hidden">↗ {320 - index * 34}</span>
          </div>
        ))}
      </section>
    </>
  );
}



