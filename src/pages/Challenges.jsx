import { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';
import ChallengeCard from '../components/ChallengeCard';
import PageHeading from '../components/PageHeading';

const filters = ['Todos', 'Em andamento', 'Concluídos'];

export default function Challenges({ challenges }) {
  const [filter, setFilter] = useState('Todos');
  const visibleChallenges = challenges.filter((challenge) => {
    if (filter === 'Concluídos') return challenge.progress >= challenge.goal;
    if (filter === 'Em andamento') return challenge.progress < challenge.goal;
    return true;
  });

  return (
    <>
      <PageHeading eyebrow="METAS QUE MOVEM" title="Desafios" description="Pequenas missões para criar um grande impacto."
        action={<span className="flex items-center gap-[5px] rounded-lg bg-[#fff3e9] px-[10px] py-2 text-[11px] text-[#d69056]"><Flame size={15} /> {challenges.length} ativos</span>} />
      <section className="mb-[18px] min-h-[180px] rounded-xl bg-[#214a34] px-6 py-5 text-white max-[720px]:min-h-[168px] max-[720px]:p-4">
        <span className="flex items-center gap-[5px] text-[10px] font-bold tracking-[1px] text-[#d0dfa9]"><Sparkles size={13} /> DESAFIO COLETIVO</span>
        <h2 className="my-2 font-display text-[23px] font-semibold leading-tight max-[720px]:text-[21px]">Uma cidade mais limpa<br />começa com <em className="text-[#c9e1aa] not-italic">a gente.</em></h2>
        <p className="m-0 text-[11px] text-[#c5d3c4] max-[720px]:max-w-[260px] max-[720px]:text-[10px] max-[720px]:leading-[1.45]">Junte-se à comunidade para reciclar 5.000 itens até o fim do mês.</p>
        <div className="mt-3 flex max-w-[350px] items-center gap-[10px]"><div className="h-[5px] flex-1 overflow-hidden rounded-full bg-white/20"><span className="block h-full rounded-full bg-[#c2dc8e]" style={{ width: '62%' }} /></div><strong className="whitespace-nowrap text-[10px]">3.120 <small className="font-normal text-[#c5d3c4]">/ 5.000 itens</small></strong></div>
      </section>
      <div className="mb-3 flex items-center justify-between gap-3 max-[720px]:items-start max-[720px]:flex-col"><div><h2 className="mb-1 font-display text-[15px] font-bold text-[#39473d]">Seus desafios</h2><p className="m-0 text-[11px] text-[#96a097]">Complete missões e ganhe EcoPoints extras.</p></div><div className="flex gap-[2px] rounded-lg bg-[#f1f4ef] p-[3px] max-[720px]:w-full max-[720px]:justify-between">{filters.map((item) => <button key={item} className={`rounded-md px-[9px] py-[7px] text-[10px] max-[720px]:flex-1 max-[720px]:px-1 max-[720px]:text-[9px] ${filter === item ? 'bg-white text-[#4c8052] shadow-sm' : 'bg-transparent text-[#879188]'}`} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
      <div className="grid grid-cols-3 gap-3 max-[1100px]:grid-cols-2 max-[720px]:gap-2">{visibleChallenges.length ? visibleChallenges.map((challenge) => <article className="min-w-0 rounded-xl border border-[#edf0eb] bg-white p-[13px] max-[720px]:p-[10px]" key={challenge.id}><div className="mb-[10px] grid h-[78px] place-items-center rounded-lg bg-[#eef5e9] text-[30px] max-[720px]:h-[68px]">{challenge.icon}</div><div className="flex items-center justify-between gap-[5px] max-[720px]:items-start max-[720px]:flex-col"><h3 className="m-0 font-display text-[13px] font-bold text-[#455449] max-[720px]:text-[11px]">{challenge.title}</h3><span className="whitespace-nowrap text-[9px] text-[#9a8a4f]">✦ +{challenge.reward} XP</span></div><p className="my-[5px] min-h-6 text-[10px] text-[#929d93] max-[720px]:text-[9px]">{challenge.description}</p><ChallengeCard challenge={challenge} /></article>) : <p className="col-span-full rounded-xl bg-white p-[30px] text-center text-xs text-[#859186]">Ainda não há desafios concluídos. Continue reciclando para completar suas missões!</p>}</div>
    </>
  );
}
