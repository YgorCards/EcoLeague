import { useState } from 'react';
import { CalendarDays, Check, Copy, Pencil, Plus, Shield, Users, X } from 'lucide-react';
import PageHeading from '../components/PageHeading';

const inputClass = 'mt-1 w-full rounded-lg border border-[#e5ebe3] bg-white px-3 py-2.5 text-sm text-[#425146] outline-none focus:border-[#8dbb8c]';
const dateLabel = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR') : '—';

export function InviteModal({ group, onAccept, onReject }) {
  if (!group) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#14251a77] p-4" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="invite-title" className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl">
    <div className="mb-4 grid size-11 place-items-center rounded-xl bg-[#edf5eb] text-[#4c8052]"><Users size={21} /></div>
    <p className="mb-1 text-[10px] font-bold tracking-[1px] text-[#799477]">CONVITE PARA COMPETIÇÃO</p><h2 id="invite-title" className="m-0 font-display text-xl font-bold text-[#35443a]">{group.name}</h2>
    <p className="mt-2 text-sm leading-relaxed text-[#7f8c80]">{group.owner} convidou você para competir neste grupo fechado.</p>
    <div className="my-4 grid grid-cols-2 gap-2 rounded-xl bg-[#f5f8f3] p-3 text-xs text-[#68776a]"><span>Início<br/><b className="mt-1 inline-block text-[#405344]">{dateLabel(group.startDate)}</b></span><span>Término<br/><b className="mt-1 inline-block text-[#405344]">{dateLabel(group.endDate)}</b></span><span className="col-span-2 mt-1">Participantes <b>{group.members.length}/{group.maxMembers}</b></span></div>
    <div className="flex gap-2"><button onClick={onReject} className="flex-1 rounded-lg border border-[#e6ebe4] bg-white px-3 py-2.5 text-sm font-semibold text-[#718075] hover:bg-[#f6f8f5]"><X size={15} className="mr-1 inline"/>Rejeitar</button><button onClick={onAccept} className="flex-1 rounded-lg border-0 bg-[#32734a] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#285e3d]"><Check size={15} className="mr-1 inline"/>Aceitar convite</button></div>
  </section></div>;
}

export default function Groups({ groups, profile, onCreate, onUpdate, onCloseGroup, onDismissGroup, onSelectInviteGroup, notify }) {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxMembers, setMaxMembers] = useState('10');
  const [copied, setCopied] = useState('');
  const [editing, setEditing] = useState('');
  const [closing, setClosing] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  function submit(event) {
    event.preventDefault();
    if (name.trim().length < 3) return notify('Dê um nome com pelo menos 3 caracteres ao grupo.');
    if (!startDate || !endDate || endDate < startDate) return notify('Confira as datas da competição.');
    const details = { name: name.trim(), startDate, endDate, maxMembers: Math.min(30, Math.max(2, Number(maxMembers) || 2)) };
    if (editing) onUpdate(editing, details);
    else onCreate(details);
    setCreating(false); setName(''); setStartDate(''); setEndDate(''); setMaxMembers('10');
    setEditing('');
  }
  function editGroup(group) {
    setEditing(group.id); setName(group.name); setStartDate(group.startDate); setEndDate(group.endDate); setMaxMembers(String(group.maxMembers)); setCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  async function copyInvite(group) {
    const url = new URL(window.location.href); url.search = ''; url.hash = ''; url.searchParams.set('convite', group.id);
    onSelectInviteGroup(group.id);
    try { await navigator.clipboard.writeText(url.toString()); setCopied(group.id); notify('Link do convite copiado!'); window.setTimeout(() => setCopied(''), 2000); }
    catch { notify(`Link do convite: ${url.toString()}`); }
  }
  return <>
    <PageHeading eyebrow="COMPETIÇÃO ENTRE AMIGOS" title="Grupos fechados" description="Crie uma competição privada e convide pessoas por link." action={!creating && <button onClick={() => { setCreating(true); setEditing(''); setName(''); setStartDate(''); setEndDate(''); setMaxMembers('10'); }} className="inline-flex items-center gap-2 rounded-lg bg-[#32734a] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#285e3d]"><Plus size={16}/>Criar grupo</button>} />
    <section className="mb-5 flex items-start gap-3 rounded-xl border border-[#e6eee1] bg-[#f0f6ec] p-4 text-sm text-[#637565]"><Shield size={18} className="mt-0.5 shrink-0 text-[#648c60]"/><p className="m-0 leading-relaxed">Cada grupo é fechado e aceita até <b>30 participantes</b>. Defina o período da competição e compartilhe o link.</p></section>
    {creating && <form onSubmit={submit} className="mb-5 rounded-xl border border-[#e8eee6] bg-white p-5"><h2 className="mb-4 font-display text-base font-bold text-[#3e4d41]">{editing ? 'Editar configurações do grupo' : 'Nova competição'}</h2><div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1"><label className="col-span-2 text-xs font-semibold text-[#748176] max-[600px]:col-span-1">Nome do grupo<input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Desafio da turma" maxLength={50} required /></label><label className="text-xs font-semibold text-[#748176]">Data de início<input type="date" className={inputClass} min={editing ? undefined : today} value={startDate} onChange={(e) => setStartDate(e.target.value)} required /></label><label className="text-xs font-semibold text-[#748176]">Data de término<input type="date" className={inputClass} min={editing ? undefined : (startDate || today)} value={endDate} onChange={(e) => setEndDate(e.target.value)} required /></label><label className="text-xs font-semibold text-[#748176]">Máximo de participantes<input type="number" className={inputClass} min={Math.max(2, groups.find((group) => group.id === editing)?.members.length || 2)} max="30" value={maxMembers} onChange={(e) => setMaxMembers(e.target.value)} required/><small className="mt-1 block font-normal text-[#99a39a]">Inclui você. Limite de 30 pessoas.</small></label></div><div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => { setCreating(false); setEditing(''); }} className="rounded-lg border border-[#e5ebe3] bg-white px-4 py-2 text-xs font-semibold text-[#718075]">Cancelar</button><button className="rounded-lg bg-[#32734a] px-4 py-2 text-xs font-semibold text-white">{editing ? 'Salvar configurações' : 'Criar grupo'}</button></div></form>}
    {!(creating && editing) && (groups.length === 0 ? <section className="rounded-xl border border-dashed border-[#dce6d8] bg-white px-5 py-12 text-center"><span className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-[#eff5eb] text-[#6f9c70]"><Users size={22}/></span><h2 className="mb-1 font-display text-base font-bold text-[#48564a]">Sua primeira competição começa aqui</h2><p className="mx-auto mb-4 max-w-sm text-xs leading-relaxed text-[#929e93]">Crie um grupo fechado, escolha as datas e convide amigos para competir.</p>{!creating && <button onClick={() => setCreating(true)} className="rounded-lg bg-[#32734a] px-4 py-2.5 text-xs font-semibold text-white">Criar grupo</button>}</section> : <div className="grid grid-cols-2 gap-3 max-[800px]:grid-cols-1">{groups.map((group) => <article key={group.id} className="rounded-xl border border-[#e9eee7] bg-white p-5"><div className="flex items-start justify-between gap-3"><div><span className={`mb-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold ${group.closed ? 'bg-[#f3eeee] text-[#986c6c]' : 'bg-[#eff5eb] text-[#668449]'}`}><Shield size={12}/>{group.closed ? 'ENCERRADO' : 'FECHADO'}</span><h2 className="m-0 font-display text-base font-bold text-[#3e4d41]">{group.name}</h2><p className="mt-1 text-xs text-[#97a197]">Criado por {group.owner}</p></div><span className="rounded-lg bg-[#f5f7f2] px-2.5 py-1.5 text-xs font-semibold text-[#718075]">{group.members.length}/{group.maxMembers}</span></div><div className="my-4 grid grid-cols-2 gap-2 rounded-lg bg-[#f7f9f5] p-3 text-xs text-[#869287]"><span className="flex items-center gap-1.5"><CalendarDays size={14}/>Início: <b className="text-[#576658]">{dateLabel(group.startDate)}</b></span><span className="flex items-center gap-1.5"><CalendarDays size={14}/>Fim: <b className="text-[#576658]">{dateLabel(group.endDate)}</b></span></div><div className="mb-4 flex flex-wrap gap-1.5">{group.members.map((member, index) => <span key={`${member}-${index}`} className="rounded-full border border-[#e8eee6] px-2.5 py-1 text-[10px] text-[#718075]">{member}{member === profile.name ? ' (você)' : ''}</span>)}</div><div className="flex flex-wrap gap-2">{!group.closed && <button disabled={group.members.length >= group.maxMembers} onClick={() => copyInvite(group)} className="rounded-lg bg-[#32734a] px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"><Copy size={13} className="mr-1 inline"/>{copied === group.id ? 'Copiado' : 'Copiar link de convite'}</button>}{!group.closed && <button onClick={() => editGroup(group)} className="rounded-lg border border-[#dce8d9] bg-white px-3 py-2 text-xs font-semibold text-[#55815a]"><Pencil size={13} className="mr-1 inline"/>Editar configurações</button>}{group.closed ? <button onClick={() => onDismissGroup(group.id)} className="rounded-lg border border-[#e5ebe3] bg-white px-3 py-2 text-xs font-semibold text-[#718075]">Remover da tela</button> : <button onClick={() => setClosing(group)} className="rounded-lg border border-[#eddede] bg-white px-3 py-2 text-xs font-semibold text-[#a15f5f] hover:bg-[#fff7f7]">Fechar grupo</button>}</div></article>)}</div>)}
    {closing && <div className="fixed inset-0 z-50 grid place-items-center bg-[#14251a77] p-4"><section role="dialog" aria-modal="true" aria-labelledby="close-group-title" className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-2xl"><h2 id="close-group-title" className="m-0 font-display text-lg font-bold text-[#35443a]">Fechar “{closing.name}”?</h2><p className="mt-2 text-sm leading-relaxed text-[#7f8c80]">A competição será encerrada e ninguém mais poderá entrar ou usar o link de convite.</p><div className="mt-5 flex justify-end gap-2"><button onClick={() => setClosing(null)} className="rounded-lg border border-[#e5ebe3] bg-white px-4 py-2 text-xs font-semibold text-[#718075]">Cancelar</button><button onClick={() => { onCloseGroup(closing.id); setClosing(null); }} className="rounded-lg bg-[#9b5d5d] px-4 py-2 text-xs font-semibold text-white">Fechar grupo</button></div></section></div>}
  </>;
}
