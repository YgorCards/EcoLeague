import { Check, Recycle, X } from 'lucide-react';
import { useState } from 'react';
import { materials } from '../data';

export default function RecyclingModal({ onClose, onSubmit }) {
  const [materialId, setMaterialId] = useState('pet');
  const [amount, setAmount] = useState(1);
  const selected = materials.find((material) => material.id === materialId);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(materialId, amount);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#10251bb3] p-4 backdrop-blur-[3px] max-[720px]:items-end max-[720px]:p-0" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="max-h-[90vh] w-full max-w-[445px] overflow-y-auto rounded-[15px] bg-white p-[21px] shadow-[0_20px_60px_#0b21163d] max-[720px]:max-h-[92dvh] max-[720px]:max-w-none max-[720px]:rounded-t-[18px] max-[720px]:rounded-b-none max-[720px]:px-4 max-[720px]:pt-[18px] max-[720px]:pb-[calc(18px+env(safe-area-inset-bottom))]" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="mb-[13px] flex items-center justify-between"><span className="grid size-[35px] place-items-center rounded-[10px] bg-[#e8f3e7] text-[#4c905b]"><Recycle size={20} /></span><button className="grid size-[34px] place-items-center rounded-lg border-0 bg-transparent text-[#78867a]" onClick={onClose} aria-label="Fechar"><X size={19} /></button></div>
        <span className="text-[11px] font-bold tracking-[1px] text-[#91a094]">UM NOVO PASSO VERDE</span>
        <h2 id="modal-title" className="my-[5px] text-xl font-bold text-[#334137]">Registrar reciclagem</h2>
        <p className="mb-4 text-[11px] text-[#939d94]">Fez a sua parte? Conte pra gente e ganhe EcoPoints!</p>
        <form onSubmit={handleSubmit}>
          <label className="mb-[7px] mt-[10px] block text-[11px] font-bold text-[#566457]">O que você reciclou?</label>
          <div className="grid grid-cols-2 gap-[7px] max-[720px]:gap-[6px]">
            {materials.map((material) => (
              <button type="button" key={material.id} className={`relative grid min-h-[52px] grid-cols-[24px_1fr] grid-rows-2 gap-x-[5px] rounded-lg border p-[7px] text-left ${materialId === material.id ? 'border-[#7aaf7e] bg-[#f7fbf5]' : 'border-[#e9ede7] bg-white'}`} onClick={() => setMaterialId(material.id)}>
                <span className="row-span-2 self-center text-base">{material.emoji}</span><strong className="self-end text-[10px] text-[#536154]">{material.name}</strong><small className="self-start text-[9px] text-[#9aa49a]">{material.points} XP / un.</small>
                {materialId === material.id && <i className="absolute right-[5px] top-[5px] grid size-[14px] place-items-center rounded-full bg-[#72aa71] text-white"><Check size={11} /></i>}
              </button>
            ))}
          </div>
          <label className="mb-[7px] mt-[13px] block text-[11px] font-bold text-[#566457]" htmlFor="material-amount">Quantidade</label>
          <div className="flex h-9 items-center gap-[6px] rounded-lg border border-[#e8ede6] p-[3px]">
            <button type="button" className="h-[27px] w-7 rounded-md border-0 bg-[#f3f6f1] text-lg text-[#56735a]" onClick={() => setAmount((value) => Math.max(1, value - 1))} aria-label="Diminuir quantidade">−</button>
            <input id="material-amount" className="w-10 border-0 text-center font-semibold outline-none" type="number" min="1" max="99" value={amount} onChange={(event) => setAmount(Math.max(1, Number(event.target.value)))} />
            <button type="button" className="h-[27px] w-7 rounded-md border-0 bg-[#f3f6f1] text-lg text-[#56735a]" onClick={() => setAmount((value) => Math.min(99, value + 1))} aria-label="Aumentar quantidade">+</button>
            <span className="text-[10px] text-[#9aa39b]">unidades</span>
          </div>
          <div className="my-[13px] flex items-center justify-between rounded-lg bg-[#f2f7ee] px-3 py-[10px] text-[11px] text-[#708170]"><span>✦ Pontuação estimada</span><strong className="font-display text-base text-[#508858]">+{selected.points * amount} <small className="font-sans text-[10px] font-medium text-[#93a293]">XP</small></strong></div>
          <button className="flex min-h-[43px] w-full items-center justify-center gap-2 rounded-lg border-0 bg-[#28794c] px-3 text-xs font-semibold text-white hover:bg-[#21683f]" type="submit"><Check size={16} /> Confirmar registro</button>
          <p className="mt-[10px] text-center text-[10px] text-[#9ba69b]">✓ Esse registro é só seu. Valeu por fazer a diferença!</p>
        </form>
      </section>
    </div>
  );
}
