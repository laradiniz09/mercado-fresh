/**
 * 05_tela_substitutos — Refatorado e consolidado
 * Recebe pendingItem: CartItem para exibir o produto esgotado e seu substituto.
 */
import { useRef, useState } from 'react'
import StatusBar from '../components/StatusBar'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { BellIcon } from '../components/icons'
import { type CartItem, formatPrice } from '../services/recipeService'
import { getProductImage } from '../assets/productImages'

// ─── RadioDot ────────────────────────────────────────────────────────────────
// variant='unchecked'  → dot vazio        (Notification default)
// variant='persuasion' → dot fresh-light  (Substitution default — sugestão visual)
// variant='checked'    → dot fresh        (seleção confirmada pelo usuário)
type RadioDotVariant = 'unchecked' | 'persuasion' | 'checked'

function RadioDot({ variant }: { variant: RadioDotVariant }) {
  const filled = variant !== 'unchecked'
  const colorClass =
    variant === 'checked'
      ? 'bg-fresh border-fresh'
      : variant === 'persuasion'
        ? 'bg-fresh-light border-fresh-light'
        : 'bg-surface border-stroke'

  return (
    // puramente visual — oculto de leitores de tela
    <div
      aria-hidden="true"
      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors pointer-events-none ${colorClass}`}
    >
      {filled && <div className="h-2 w-2 rounded-full bg-neutral-50" />}
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────
type OptionId = 'substitute' | 'notify'

interface SubstitutionScreenProps {
  /** Item esgotado que o usuário quer substituir */
  pendingItem: CartItem
  onBack: () => void
  onApply: (option: OptionId) => void
  onBackToCart?: () => void
}

const OPTIONS: OptionId[] = ['substitute', 'notify']

export default function SubstitutionScreen({ pendingItem, onBack, onApply, onBackToCart }: SubstitutionScreenProps) {
  const substitute = pendingItem.substitute
  // L1: null = nenhuma seleção explícita do usuário (substitution mostra estado de persuasão)
  const [selected, setSelected] = useState<OptionId | null>(null)

  // C2: refs para roving tabindex (padrão W3C radiogroup)
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([])

  // C3: navegação por teclado — Arrow keys movem foco e selecionam; Space/Enter confirmam
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      const next = (currentIndex + 1) % OPTIONS.length
      setSelected(OPTIONS[next])
      radioRefs.current[next]?.focus()
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = (currentIndex - 1 + OPTIONS.length) % OPTIONS.length
      setSelected(OPTIONS[prev])
      radioRefs.current[prev]?.focus()
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      setSelected(OPTIONS[currentIndex])
    }
  }

  // A2: roving tabindex — o card ativo (ou o primeiro se nada selecionado) recebe tabIndex=0
  const getTabIndex = (id: OptionId, index: number): number => {
    if (selected === null) return index === 0 ? 0 : -1
    return selected === id ? 0 : -1
  }

  return (
    <div className="flex h-full flex-col bg-surface screen-enter">
      <StatusBar theme="dark" />

      {/* landmark de cabeçalho */}
      <header className="shrink-0 flex flex-col gap-4 px-4 pt-2 pb-4">
        <BackButton onClick={onBack} />
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-heading-xl font-bold text-content-primary">
            Substituir produto
          </h1>
          <p className="font-body text-body-md text-content-secondary">
            Escolha uma das opções abaixo para não ficar sem seu item.
          </p>
        </div>
      </header>

      {/* landmark principal */}
      <main className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">

        {/* A1: radiogroup com heading sr-only como rótulo */}
        <h2 id="radio-group-label" className="sr-only">
          Selecione uma opção de substituição
        </h2>
        <div role="radiogroup" aria-labelledby="radio-group-label" className="flex flex-col gap-4">

          {/* Card Substitution ─────────────────────────────────────────────── */}
          {/* D1: borda weight 1 default → weight 2 quando selecionado         */}
          {/* D3: dot persuasion (fresh-light) → checked (fresh) ao selecionar */}
          {substitute && (
          <button
            ref={(el) => { radioRefs.current[0] = el }}
            role="radio"
            aria-checked={selected === 'substitute'}
            aria-label={`Substituição recomendada: ${substitute.name} por ${formatPrice(substitute.price)}`}
            tabIndex={getTabIndex('substitute', 0)}
            onClick={() => setSelected('substitute')}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            className={`w-full flex flex-col gap-2 rounded-card p-4 text-left bg-surface active:opacity-90 transition-all ${
              selected === 'substitute' ? 'card-border-selected' : 'card-border-default'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-body text-body-sm font-semibold text-content-brand">
                Substituição recomendada
              </span>
              <RadioDot variant={selected === 'substitute' ? 'checked' : 'persuasion'} />
            </div>
            <div className="flex items-center gap-2 w-full rounded-sm py-3 px-2">
              <img
                src={getProductImage(substitute.id)}
                alt={substitute.name}
                className="h-12 w-12 rounded-sm object-cover"
              />
              <div className="flex flex-1 flex-col gap-1 min-w-0">
                <p className="font-body text-body-sm font-semibold text-content-primary">
                  {substitute.name}
                </p>
                <p className="font-body text-body-sm font-medium text-content-secondary">
                  {formatPrice(substitute.price)}
                </p>
              </div>
            </div>
          </button>
          )}

          {/* Card Notification ─────────────────────────────────────────────── */}
          {/* D2: borda weight 1 default → weight 2 quando selecionado         */}
          {/* D4: dot unchecked (vazio) → checked (fresh) ao selecionar        */}
          <button
            ref={(el) => { radioRefs.current[1] = el }}
            role="radio"
            aria-checked={selected === 'notify'}         // A3: só true com ação explícita
            aria-label="Avisar quando voltar ao estoque: seguiremos com a compra sem este item"
            tabIndex={getTabIndex('notify', 1)}           // A2: roving tabindex
            onClick={() => setSelected('notify')}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            className={`w-full flex flex-col gap-2 rounded-card p-4 text-left bg-surface border-stroke active:opacity-90 transition-all ${
              selected === 'notify' ? 'card-border-selected' : 'card-border-default'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-body text-body-sm font-semibold text-content-primary">
                Avisar quando voltar ao estoque
              </span>
              <RadioDot variant={selected === 'notify' ? 'checked' : 'unchecked'} />
            </div>
            <div className="flex items-center gap-2 w-full py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-avatar bg-surface-muted">
                <BellIcon aria-hidden="true" className="text-content-secondary h-5 w-5" />
              </div>
              <p className="font-body text-body-sm text-content-secondary leading-normal flex-1">
                Seguiremos com a compra sem este item e te notificaremos assim que ele chegar.
              </p>
            </div>
          </button>

        </div>
      </main>

      {/* landmark de rodapé */}
      <footer className="shrink-0 flex flex-col items-center gap-4 px-4 pt-4 pb-6 bg-surface border-t border-stroke">
        {/* L2: selected null → substitution como padrão (sugestão persuasiva) */}
        <Button variant="primary" onClick={() => onApply(selected ?? 'substitute')}>
          Aplicar seleção e continuar
        </Button>
        <button
          onClick={onBackToCart}
          className="flex h-10 w-full items-center justify-center active:opacity-70"
        >
          <span className="font-body text-body-lg font-semibold text-content-secondary">
            Voltar ao carrinho
          </span>
        </button>
      </footer>
    </div>
  )
}
