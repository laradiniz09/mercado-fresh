import { BackArrowIcon } from './icons'

interface BackButtonProps {
  onClick: () => void
  className?: string
}

export default function BackButton({ onClick, className }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Voltar"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[30px] border border-stroke active:opacity-70 ${className ?? ''}`}
    >
      <BackArrowIcon className="text-content-primary" />
    </button>
  )
}
