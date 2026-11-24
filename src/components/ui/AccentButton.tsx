interface AccentButtonProps {
  href: string
  label: string
  hoverLabel?: string
}

export function AccentButton({
  href,
  label,
  hoverLabel = 'CLICK HERE',
}: AccentButtonProps) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded bg-[#FF7A00] px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#120E0D]"
    >
      <span className="relative z-10 block h-[1.25em] overflow-hidden leading-[1.25em]">
        <span className="block transition-all duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full group-hover:opacity-0">
          {label}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex translate-y-4 items-center justify-center text-[#F5F3EF] opacity-0 transition-all delay-150 duration-[700ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:translate-y-0 group-hover:opacity-100"
      >
        {hoverLabel}
      </span>
      <span
        aria-hidden="true"
        className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#120E0D]" />
        <span className="pointer-events-none absolute h-72 w-72 scale-0 rounded-full bg-[#120E0D] transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-100" />
      </span>
    </a>
  )
}
