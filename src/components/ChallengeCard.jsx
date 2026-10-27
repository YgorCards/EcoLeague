export default function ChallengeCard({ challenge }) {
  const progress = Math.min(100, Math.round((challenge.progress / challenge.goal) * 100));

  return (
    <article className="flex gap-[9px] border-b border-[#f0f2ef] py-[9px] last:border-0">
      <span className="grid size-[29px] shrink-0 place-items-center rounded-lg bg-[#eff5e9] text-base">
        {challenge.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <strong className="text-[11px] text-[#526052]">{challenge.title}</strong>
          <span className="whitespace-nowrap text-[10px] text-[#a39357]">+{challenge.reward} XP</span>
        </div>
        <p className="my-[3px] text-[10px] text-[#9ca59c]">{challenge.description}</p>
        <div className="mt-[6px] flex items-center gap-[7px]">
          <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#e4ebe1]">
            <span className="block h-full rounded-full bg-[#78b27b]" style={{ width: `${progress}%` }} />
          </div>
          <small className="text-[9px] text-[#9ca69d]">{challenge.progress}/{challenge.goal}</small>
        </div>
      </div>
    </article>
  );
}
