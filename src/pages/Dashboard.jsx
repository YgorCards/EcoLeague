import { ArrowRight, Plus, Recycle, Trophy } from 'lucide-react';
import PageHeading from '../components/PageHeading';

export default function Dashboard({ xp, level, rank, progress, totalItems, activity, onRegister, onNavigate }) {
  const todayActivity = activity.filter((item) => item.when === 'Hoje' || item.when.startsWith('Hoje,') || item.when === 'Agora mesmo');
  const todayItems = todayActivity.reduce((sum, item) => sum + item.amount, 0);
  const todayPoints = todayActivity.reduce((sum, item) => sum + item.points, 0);

  return (
    <>
      <PageHeading
        eyebrow="TERÇA-FEIRA, 27 DE OUTUBRO"
        title="Início"
        description="Acompanhe seus EcoPoints e seu impacto na reciclagem."
      />
      <section className="relative mb-[14px] flex min-h-[209px] items-center overflow-hidden rounded-[13px] bg-[#19432e] px-[27px] py-6 text-white max-[720px]:min-h-[254px] max-[720px]:items-start max-[720px]:px-[17px] max-[720px]:py-[19px]">
        <div className="relative z-[2] w-full max-w-[660px]">
          <p className="mb-2 text-[13px] font-semibold tracking-[.4px] text-[#c5d6c4]">SEU PERFIL</p>
          <h2 className="m-0 font-display text-[25px] font-semibold leading-tight tracking-[-.5px] max-[720px]:text-[22px]">Ana Oliveira</h2>
          <div className="mt-2 flex items-baseline gap-2"><strong className="font-display text-[34px] font-bold tracking-[-1px] max-[720px]:text-[30px]">{xp.toLocaleString('pt-BR')}</strong><span className="text-sm text-[#d4e2d0]">EcoPoints</span></div>
          <div className="mt-[10px] flex flex-wrap items-center gap-2 text-[12px] text-[#d4e2d0]"><span className="font-semibold text-white">Resumo de hoje</span><span className="text-[#89a88b]">·</span><span>{todayItems} {todayItems === 1 ? 'item reciclado' : 'itens reciclados'}</span><span className="text-[#89a88b]">·</span><span>+{todayPoints} XP</span></div>
          <button className="mt-[14px] flex h-[38px] items-center justify-center gap-[7px] rounded-lg border-0 bg-[#f3f7f0] px-[14px] text-xs font-semibold text-[#245237] hover:bg-white" onClick={onRegister}><Plus size={17} /> Registrar reciclagem</button>
        </div>
        <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-[100px] font-light text-white/[.07] max-[720px]:right-3 max-[720px]:top-5 max-[720px]:translate-y-0 max-[720px]:text-[64px]" aria-hidden="true">✳</div>
      </section>

      <section className="mb-[14px] grid grid-cols-[1.15fr_1fr_1fr] gap-3 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1 max-[720px]:mb-[9px] max-[720px]:gap-2">
        <article className="relative h-[137px] min-w-0 overflow-hidden rounded-xl border border-[#edf0eb] bg-white p-4 max-[1100px]:col-span-2 max-[720px]:col-span-1 max-[720px]:h-[138px] max-[720px]:p-[11px]">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-[.7px] text-[#97a197]">SEUS ECOPOINTS <span className="text-base text-[#81a26a]">✦</span></div>
          <strong className="my-[3px] block font-display text-[27px] font-bold tracking-[-1px] text-[#2c3c30] max-[720px]:my-[3px] max-[720px]:text-[24px]">{xp.toLocaleString('pt-BR')} <small className="font-sans text-[11px] font-medium tracking-normal text-[#9da69d]">XP</small></strong>
          <p className="mb-[3px] flex flex-wrap items-center gap-[7px] text-[11px] text-[#9ba49b] max-[720px]:mb-[3px]"><em className="rounded bg-[#eff5e9] px-[5px] py-1 text-[9px] font-bold not-italic text-[#668449]">NÍVEL {level}</em> Faltam {1000 - progress} XP para o próximo</p>
          <div className="my-[4px] h-1 overflow-hidden rounded-full bg-[#e4ebe1]"><i className="block h-full rounded-full bg-[#78b27b]" style={{ width: `${progress / 10}%` }} /></div>
          <small className="flex justify-between text-[9px] text-[#9ba49b]"><span>Guardiã da natureza</span><span>{progress} / 1.000 XP</span></small>
        </article>
        <article className="relative h-[137px] min-w-0 overflow-hidden rounded-xl border border-[#edf0eb] bg-white p-4 max-[720px]:h-[126px] max-[720px]:p-[11px]">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-[.7px] text-[#97a197]">ITENS RECICLADOS <Recycle size={17} className="text-[#81a26a]" /></div>
          <strong className="my-[3px] block font-display text-[27px] font-bold tracking-[-1px] text-[#2c3c30] max-[720px]:text-[23px]">{totalItems} <small className="font-sans text-[11px] font-medium tracking-normal text-[#9da69d]">itens</small></strong>
          <p className="mb-[3px] flex flex-wrap items-center gap-[7px] text-[11px] text-[#9ba49b] max-[720px]:mb-[3px]"><em className="rounded bg-[#eff5e9] px-[5px] py-1 text-[9px] font-bold not-italic text-[#668449]">↗ 18%</em> em relação ao mês passado</p>
          <div className="absolute inset-x-4 bottom-[11px] flex h-[22px] items-end gap-[5px] max-[720px]:inset-x-[11px]">{[30, 50, 40, 75, 53, 92, 65, 100, 71].map((height, index) => <i key={index} className={`flex-1 rounded-t-[2px] ${index % 3 === 0 ? 'bg-[#b8d8b9]' : 'bg-[#d7ead8]'}`} style={{ height: `${height}%` }} />)}</div>
        </article>
        <article className="h-[137px] min-w-0 rounded-xl border border-[#edf0eb] bg-white p-4 max-[720px]:h-[126px] max-[720px]:p-[11px]">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-[.7px] text-[#97a197]">SUA POSIÇÃO <Trophy size={17} className="text-[#81a26a]" /></div>
          <strong className="my-[3px] block font-display text-[27px] font-bold tracking-[-1px] text-[#2c3c30] max-[720px]:text-[23px]">#{rank} <small className="font-sans text-[11px] font-medium tracking-normal text-[#9da69d]">no ranking</small></strong>
          <p className="my-2 flex flex-wrap items-center gap-1 text-[11px] text-[#9ba49b]">🟢 🟠 🟣 <span className="ml-1 text-[9px]">Você está à frente de <b className="text-[#546354]">18 pessoas</b></span></p>
          <button className="inline-flex items-center gap-[5px] border-0 bg-transparent p-0 text-[10px] font-semibold text-[#628e68]" onClick={() => onNavigate('Ranking')}>Ver classificação <ArrowRight size={13} /></button>
        </article>
      </section>

      <section className="rounded-xl border border-[#edf0eb] bg-white p-[15px] max-[720px]:p-[13px]">
        <div className="flex items-center justify-between gap-2"><div><h2 className="mb-1 font-display text-[15px] font-bold text-[#39473d]">Atividade recente</h2><p className="m-0 text-[11px] text-[#96a097]">Seus últimos registros de reciclagem.</p></div><button className="grid size-[27px] shrink-0 place-items-center rounded-[7px] border-0 bg-[#f5f8f3] text-[#829184]" onClick={() => onNavigate('Meu perfil')} aria-label="Ver histórico"><ArrowRight size={16} /></button></div>
        <div className="mt-[9px]">{activity.slice(0, 5).map((item, index) => <div className="flex items-center gap-[9px] border-b border-[#f0f2ef] py-2 last:border-0" key={item.id}><span className={`grid size-[30px] shrink-0 place-items-center rounded-lg text-base ${['bg-[#edf4e9]', 'bg-[#f6efe1]', 'bg-[#edf0e6]'][index % 3]}`}>{item.emoji}</span><span className="grid min-w-0 flex-1 gap-1"><strong className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-[#556356]">{item.name}</strong><small className="text-[10px] text-[#a0a9a0]">{item.amount} itens <i className="mx-1 inline-block size-[3px] rounded-full bg-[#bdc6bd]" /> {item.when}</small></span><strong className="whitespace-nowrap text-xs text-[#599764]">+{item.points} <small className="text-[9px]">XP</small></strong></div>)}</div>
        <button className="inline-flex items-center gap-[5px] border-0 bg-transparent p-0 text-[10px] font-semibold text-[#628e68]" onClick={() => onNavigate('Meu perfil')}>Ver todo o histórico <ArrowRight size={13} /></button>
      </section>
    </>
  );
}




