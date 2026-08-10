import { BackArrowIcon } from './icons'

interface BackButtonProps {
  onClick: () => void
  className?: string
}

export default function BackButton({ onClick, className }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Voltar para a tela anterior"
      style={{
        borderRadius: '30px',
        width: '40px',
        height: '40px',
        border: '1px solid #d1d5db', // Cor cinza visível aplicada direto via CSS
        backgroundColor: 'transparent', // Fundo transparente conforme a referência
      }}
      className={`flex shrink-0 items-center justify-center active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fresh focus-visible:ring-offset-2 ${className ?? ''}`}
    >
      <BackArrowIcon aria-hidden="true" className="h-5 w-5 text-neutral-800" />
    </button>
  )
}
