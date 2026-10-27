export default function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-[23px] flex items-end justify-between gap-[14px] max-[720px]:mb-4 max-[720px]:items-center max-[720px]:gap-2">
      <div>
        <span className="text-[11px] font-bold tracking-[1px] text-[#91a094]">{eyebrow}</span>
        <h1 className="my-[6px] text-[27px] font-bold leading-tight tracking-[-1px] text-[#29392e] max-[720px]:text-[23px]">{title}</h1>
        <p className="m-0 text-xs text-[#96a097] max-[720px]:max-w-[260px] max-[720px]:text-[11px] max-[720px]:leading-[1.45]">{description}</p>
      </div>
      {action}
    </div>
  );
}
