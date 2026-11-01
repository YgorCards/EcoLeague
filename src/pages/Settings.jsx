import { useRef } from 'react';
import { Bell, Camera, Check, ImagePlus, Moon, Sun, UserRound } from 'lucide-react';
import PageHeading from '../components/PageHeading';

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() || '').join('') || 'AN';
}

export default function Settings({ profile, onChange, onSave, notify }) {
  const fileInput = useRef(null);

  function handlePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      notify('Escolha um arquivo de imagem.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      notify('A imagem deve ter até 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange({ ...profile, avatar: reader.result });
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  return (
    <>
      <PageHeading eyebrow="SUA CONTA" title="Configurações" description="Personalize seu perfil e suas preferências." />

      <section className="mb-4 rounded-xl border border-[#edf0eb] bg-white p-5 max-[720px]:p-[14px]" aria-labelledby="profile-settings-title">
        <div className="mb-4 flex items-center gap-3 border-b border-[#f0f2ef] pb-4">
          <span className="grid size-9 place-items-center rounded-[10px] bg-[#edf5eb] text-[#58835d]"><UserRound size={18} /></span>
          <div><h2 id="profile-settings-title" className="m-0 font-display text-[15px] font-bold text-[#39473d]">Seu perfil</h2><p className="m-0 mt-1 text-[11px] text-[#96a097]">Essas informações aparecem para sua equipe.</p></div>
        </div>

        <div className="flex items-center gap-4 max-[500px]:items-start">
          <div className="relative shrink-0">
            {profile.avatar ? <img src={profile.avatar} alt="Foto de perfil" className="size-[70px] rounded-full object-cover" /> : <span className="grid size-[70px] place-items-center rounded-full bg-[#eee9f7] text-lg font-bold text-[#6d5c92]">{initials(profile.name)}</span>}
            <button type="button" onClick={() => fileInput.current?.click()} aria-label="Adicionar foto de perfil" className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full border-2 border-white bg-[#438c55] text-white"><Camera size={13} /></button>
            <input ref={fileInput} type="file" accept="image/*" className="sr-only" onChange={handlePhoto} />
          </div>
          <div className="min-w-0 flex-1">
            <strong className="text-xs text-[#556356]">Foto de perfil</strong>
            <p className="mb-2 mt-1 text-[10px] text-[#9ba49b]">JPG ou PNG, até 5 MB.</p>
            <button type="button" onClick={() => fileInput.current?.click()} className="inline-flex h-8 items-center gap-2 rounded-lg border border-[#e7ebe4] bg-white px-3 text-[11px] font-semibold text-[#58745b] hover:bg-[#f6f9f4]"><ImagePlus size={14} /> Escolher foto</button>
            {profile.avatar && <button type="button" onClick={() => onChange({ ...profile, avatar: '' })} className="ml-2 h-8 rounded-lg px-2 text-[11px] text-[#8c968d] hover:bg-[#f6f7f5]">Remover</button>}
          </div>
        </div>

        <label className="mt-5 block max-w-[480px] text-[11px] font-semibold text-[#68756a]" htmlFor="display-name">Nome de exibição
          <input id="display-name" maxLength={40} value={profile.name} onChange={(event) => onChange({ ...profile, name: event.target.value })} placeholder="Como você quer ser chamado?" className="mt-2 h-10 w-full rounded-lg border border-[#e7ebe4] bg-[#fcfdfb] px-3 text-[13px] font-normal text-[#39473d] outline-none placeholder:text-[#b0b8b0] focus:border-[#9bc49b]" />
        </label>
      </section>

      <section className="mb-4 rounded-xl border border-[#edf0eb] bg-white p-5 max-[720px]:p-[14px]" aria-labelledby="appearance-title">
        <div className="mb-4 flex items-center gap-3 border-b border-[#f0f2ef] pb-4">
          <span className="grid size-9 place-items-center rounded-[10px] bg-[#f2f0f8] text-[#756792]"><Sun size={18} /></span>
          <div><h2 id="appearance-title" className="m-0 font-display text-[15px] font-bold text-[#39473d]">Aparência</h2><p className="m-0 mt-1 text-[11px] text-[#96a097]">Escolha sua preferência para quando os temas estiverem disponíveis.</p></div>
        </div>
        <div className="grid max-w-[520px] grid-cols-2 gap-3 max-[430px]:grid-cols-1">
          {[{ value: 'light', label: 'Claro', icon: Sun }, { value: 'dark', label: 'Escuro', icon: Moon }].map(({ value, label, icon: Icon }) => (
            <button key={value} type="button" aria-pressed={profile.theme === value} onClick={() => onChange({ ...profile, theme: value })} className={`flex h-12 items-center gap-3 rounded-lg border px-3 text-left text-xs font-semibold transition-colors ${profile.theme === value ? 'border-[#8fba91] bg-[#f1f7ef] text-[#3e7548]' : 'border-[#e7ebe4] bg-white text-[#778178] hover:bg-[#fafbf9]'}`}><Icon size={17} /><span className="flex-1">{label}</span>{profile.theme === value && <Check size={16} />}</button>
          ))}
        </div>
        <p className="mb-0 mt-3 flex items-center gap-1.5 text-[10px] text-[#9aa39b]"><Moon size={12} /> A troca de cores será ativada em uma atualização futura.</p>
      </section>

      <section className="mb-5 flex items-center gap-3 rounded-xl border border-[#edf0eb] bg-white p-4 max-[720px]:p-[13px]">
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#fbf3e8] text-[#b5854d]"><Bell size={17} /></span>
        <span className="min-w-0 flex-1"><strong className="block text-xs text-[#556356]">Avisos de novidades</strong><small className="mt-1 block text-[10px] text-[#9ba49b]">Receber lembretes e atualizações da EcoLeague.</small></span>
        <button type="button" role="switch" aria-checked={profile.notifications} aria-label="Avisos de novidades" onClick={() => onChange({ ...profile, notifications: !profile.notifications })} className={`relative h-[23px] w-[40px] shrink-0 rounded-full transition-colors ${profile.notifications ? 'bg-[#66a36e]' : 'bg-[#d8ded7]'}`}><span className={`absolute top-[3px] size-[17px] rounded-full bg-white shadow-sm transition-transform ${profile.notifications ? 'translate-x-[20px]' : 'translate-x-[3px]'}`} /></button>
      </section>

      <div className="flex justify-end"><button type="button" onClick={onSave} disabled={!profile.name.trim()} className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#438c55] px-4 text-xs font-bold text-white hover:bg-[#357746] disabled:cursor-not-allowed disabled:opacity-50"><Check size={15} /> Salvar alterações</button></div>
    </>
  );
}
