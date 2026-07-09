/**
 * 05_tela_substitutos — Refatorado e consolidado
 */
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { BellIcon } from '../components/icons'
import imgLeiteCoco from '../assets/images/leite-de-coco.png'

// ─── Radio toggle Refatorado ─────────────────────────────────────────────────
function RadioDot({ checked }: { checked: boolean }) {
  return (
    <div
      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors pointer-events-none ${
        checked
          ? 'bg-fresh-primary-fresh border-fresh-primary-fresh' 
          : 'bg-transparent border-fresh-primary-light'
      }`}
    >
      {checked && <div className="h-2 w-2 rounded-full bg-white" />}
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────
type OptionId = 'substitute' | 'notify'

interface SubstitutionScreenProps {
  onBack: () => void
  onApply: (option: OptionId) => void
  onBackToCart?: () => void
}

export default function SubstitutionScreen({ onBack, onApply, onBackToCart }: SubstitutionScreenProps) {
  const [selected, setSelected] = useState<OptionId>('substitute')

  return (
    <div className="flex h-full flex-col bg-surface screen-enter">
      <StatusBar theme="dark" />

      {/* Header - Intacto */}
      <div className="shrink-0 flex flex-col gap-4 px-4 pt-2 pb-4">
        <BackButton onClick={onBack} />
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-heading-xl font-bold text-content-primary">
            Substituir produto
          </h1>
          <p className="font-body text-body-md text-content-secondary">
            Escolha uma das opções abaixo para não ficar sem seu item.
          </p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">

        {/* Card: Substitution */}
        <button
          onClick={() => setSelected('substitute')}
          className={`w-full flex flex-col gap-2 rounded-[16px] p-4 text-left transition-all duration-200 bg-surface border ${
            selected === 'substitute'
              ? 'border-2 border-stroke-border-divider'
              : 'border border-stroke-border-default'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-body text-body-sm font-semibold text-content-brand">
              Substituição recomendada
            </span>
            <RadioDot checked={selected === 'substitute'} />
          </div>
          <div className="flex items-center gap-2 w-full rounded-sm bg-surface-muted py-3 px-2">
            <img src={imgLeiteCoco} alt="Leite de Coco" className="h-12 w-12 rounded-sm object-cover" />
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <p className="font-body text-body-sm font-semibold text-content-primary">
                Leite de Coco (Vegano) 1l
              </p>
              <p className="font-body text-body-sm font-medium text-content-secondary">
                R$ 18,00
              </p>
            </div>
          </div>
        </button>

        {/* Card: Notification */}
        <button
          onClick={() => setSelected('notify')}
          className={`w-full flex flex-col gap-2 rounded-[16px] p-4 text-left transition-all duration-200 bg-surface border ${
            selected === 'notify'
              ? 'border-2 border-stroke-border-divider'
              : 'border border-stroke-border-default'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-body text-body-sm font-semibold text-content-primary">
              Avisar quando voltar ao estoque
            </span>
            <RadioDot checked={selected === 'notify'} />
          </div>
          <div className="flex items-center gap-2 w-full py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] bg-surface-muted">
              <BellIcon className="text-content-secondary h-5 w-5" />
            </div>
            <p className="font-body text-body-sm text-content-secondary leading-[1.5] flex-1">
              Seguiremos com a compra sem este item e te notificaremos assim que ele chegar.
            </p>
          </div>
        </button>
      </div>

      {/* Sticky Bottom Bar - Intacto */}
      <div className="shrink-0 flex flex-col items-center gap-4 px-4 pt-4 pb-6 bg-surface border-t border-stroke-border-default">
        <Button variant="primary" onClick={() => onApply(selected)}>
          Aplicar seleção e continuar
        </Button>
        <button
          onClick={onBackToCart}
          className="flex h-10 w-full items-center justify-center active:opacity-70"
        >
          <span className="font-body text-base font-semibold text-content-secondary">
            Voltar ao carrinho
          </span>
        </button>
      </div>
    </div>
  )
}
