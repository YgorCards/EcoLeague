import { Award, Check, LockKeyhole } from 'lucide-react';
import PageHeading from '../components/PageHeading';

const achievements = [
  { icon: '🌱', title: 'Primeiro passo', description: 'Fez seu primeiro registro', unlocked: true },
  { icon: '🧴', title: 'Plástico consciente', description: 'Reciclou 10 garrafas PET', unlocked: true },
  { icon: '🔥', title: 'Ritmo constante', description: 'Recicle por 3 semanas seguidas', unlocked: false },
  { icon: '🏆', title: 'No pódio', description: 'Entre nos 3 primeiros do ranking', unlocked: true },
];

export default function Profile({ xp, level, totalItems, activity }) {
  return (
    <>
      <PageHeading eyebrow="SUA JORNADA VERDE" title="Meu perfil" description="Cada registro conta uma parte da sua história." />
      <section className="flex items-center gap-[14px] rounded-xl border border-[#edf0eb] bg-white p-5 max-[720px]:flex-wrap max-[720px]:gap-[10px] max-[720px]:p-[13px]">
        <span className="grid size-[58px] shrink-0 place-items-center rounded-full bg-[#ede8f5] font-bold text-[#6d5c92] max-[720px]:size-12">AN</span>
        <div className="min-w-0 flex-1"><h2 className="m-0 mb-[6px] font-display text-lg font-bold text-[#39473d] max-[720px]:text-sm">Ana Oliveira <em className="rounded bg-[#eff5e9] px-[6px] py-1 align-middle font-sans text-[9px] font-bold not-italic text-[#668449]">NÍVEL {level}</em></h2><p className="text-[11px] text-[#929d93] max-[720px]:text-[9px]">Guardiã da natureza · Membro desde setembro de 2026</p><small className="text-[11px] text-[#929d93] max-[720px]:text-[9px]">📍 São Paulo, SP　·　🏆 3º no ranking</small></div>
        <div className="grid w-[190px] gap-[6px] border-l border-[#e9eee7] pl-[18px] max-[720px]:grid-cols-[1fr_auto] max-[720px]:w-full max-[720px]:gap-[5px] max-[720px]:border-l-0 max-[720px]:border-t max-[720px]:pl-0 max-[720px]:pt-[10px]"><small className="text-[9px] text-[#929d93] max-[720px]:col-start-1">SEUS ECOPOINTS</small><strong className="font-display text-xl text-[#344239] max-[720px]:col-start-1">{xp.toLocaleString('pt-BR')} <span className="font-sans text-[11px] font-medium text-[#929d93]">XP</span></strong><div className="h-[5px] overflow-hidden rounded-full bg-[#e4ebe1] max-[720px]:col-start-2 max-[720px]:row-start-1 max-[720px]:w-[100px]"><i className="block h-full rounded-full bg-[#78b27b]" style={{ width: `${(xp % 1000) / 10}%` }} /></div><small className="text-[9px] text-[#929d93] max-[720px]:col-start-2 max-[720px]:text-right">{1000 - (xp % 1000)} XP até o próximo nível</small></div>
      </section>
      <section className="my-3 grid grid-cols-3 gap-3 max-[720px]:gap-[7px]">
        {[['ITENS RECICLADOS', totalItems, 'em toda sua jornada'], ['DESAFIOS CONCLUÍDOS', '8', 'missões completadas'], ['SEQUÊNCIA ATUAL', '🔥 3 dias', 'continue nesse ritmo!']].map(([label, value, note]) => <article className="min-h-[96px] rounded-xl border border-[#edf0eb] bg-white p-4 max-[720px]:min-h-[88px] max-[720px]:p-[9px]" key={label}><div className="min-h-[18px] text-[10px] font-bold tracking-[.5px] text-[#97a197] max-[720px]:text-[8px]">{label}</div><strong className="my-[7px] block font-display text-[23px] font-bold text-[#2c3c30] max-[720px]:text-[17px]">{value}</strong><p className="m-0 text-[10px] text-[#9ba49b] max-[720px]:text-[8px]">{note}</p></article>)}
      </section>
      <div className="grid grid-cols-2 gap-[13px] max-[720px]:grid-cols-1 max-[720px]:gap-[9px]">
        <section className="rounded-xl border border-[#edf0eb] bg-white p-[15px] max-[720px]:p-[13px]"><div className="mb-2 flex items-center justify-between"><div><h2 className="mb-1 font-display text-[15px] font-bold text-[#39473d]">Conquistas</h2><p className="m-0 text-[11px] text-[#96a097]">3 de 8 medalhas desbloqueadas</p></div><Award size={19} className="text-[#829184]" /></div>
          {achievements.map((achievement) => <div className={`flex items-center gap-[9px] border-b border-[#f0f2ef] py-[9px] last:border-0 ${achievement.unlocked ? '' : 'opacity-55'}`} key={achievement.title}><span className="text-lg">{achievement.icon}</span><div className="grid flex-1 gap-[3px]"><strong className="text-[11px] text-[#566457]">{achievement.title}</strong><small className="text-[9px] text-[#9ba49b]">{achievement.description}</small></div>{achievement.unlocked ? <Check size={15} className="text-[#65a06d]" /> : <LockKeyhole size={15} className="text-[#65a06d]" />}</div>)}
        </section>
        <section className="rounded-xl border border-[#edf0eb] bg-white p-[15px] max-[720px]:p-[13px]"><div className="mb-2"><h2 className="mb-1 font-display text-[15px] font-bold text-[#39473d]">Histórico recente</h2><p className="m-0 text-[11px] text-[#96a097]">Seus últimos registros.</p></div>
          {activity.slice(0, 4).map((item, index) => <div className="flex items-center gap-[9px] border-b border-[#f0f2ef] py-2 last:border-0" key={item.id}><span className={`grid size-[30px] shrink-0 place-items-center rounded-lg text-base ${['bg-[#edf4e9]', 'bg-[#f6efe1]', 'bg-[#edf0e6]'][index % 3]}`}>{item.emoji}</span><span className="grid min-w-0 flex-1 gap-1"><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#556356]">{item.name}</strong><small className="text-[10px] text-[#a0a9a0]">{item.amount} itens <i className="mx-1 inline-block size-[3px] rounded-full bg-[#bdc6bd]" /> {item.when}</small></span><strong className="whitespace-nowrap text-xs text-[#599764]">+{item.points} <small className="text-[9px]">XP</small></strong></div>)}
        </section>
      </div>
    </>
  );
}
