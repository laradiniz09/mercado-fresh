/**
 * 07_tela_pagamento
 * Payment screen: delivery address, payment method selection, order total, checkout CTA.
 * Layout: flex-col h-full → scroll-area (flex-1 overflow-y-auto) + sticky footer
 */
import { useRef, useState } from 'react'
import StatusBar from '../components/StatusBar'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { MapPinIcon, PixIcon, CreditCardIcon, MealVoucherIcon } from '../components/icons'
import { formatPrice, SERVICE_FEE } from '../services/recipeService'

// ─── Types ────────────────────────────────────────────────────────────────────
export type PaymentMethod = 'pix' | 'credit-card' | 'meal-voucher'

interface PaymentOption {
  id: PaymentMethod
  label: string
  description: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'pix',
    label: 'Pix',
    description: 'Aprovação imediata, 24h por dia',
    Icon: PixIcon,
  },
  {
    id: 'credit-card',
    label: 'Cartão de crédito',
    description: 'Visa, Mastercard, Elo e outros',
    Icon: CreditCardIcon,
  },
  {
    id: 'meal-voucher',
    label: 'Vale-refeição',
    description: 'Alelo, Sodexo, VR e outros',
    Icon: MealVoucherIcon,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Accessible radio dot indicator — purely visual, hidden from screen readers */
function RadioDot({ checked }: { checked: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors pointer-events-none ${
        checked
          ? 'bg-fresh border-fresh'
          : 'bg-surface border-stroke'
      }`}
    >
      {checked && <div className="h-2 w-2 rounded-full bg-neutral-50" />}
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────
interface PaymentScreenProps {
  /** Total do carrinho (subtotal + taxa de serviço) — calculado pelo App */
  total?: number
  onBack: () => void
  onConfirm: (method: PaymentMethod) => void
}

export default function PaymentScreen({ total = 0, onBack, onConfirm }: PaymentScreenProps) {
  const subtotal = Math.max(0, total - SERVICE_FEE)
  const [selected, setSelected] = useState<PaymentMethod>('pix')

  // Roving tabindex refs (W3C radiogroup keyboard pattern)
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([])
  const OPTIONS_IDS = PAYMENT_OPTIONS.map((o) => o.id)

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      const next = (currentIndex + 1) % PAYMENT_OPTIONS.length
      setSelected(OPTIONS_IDS[next])
      radioRefs.current[next]?.focus()
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = (currentIndex - 1 + PAYMENT_OPTIONS.length) % PAYMENT_OPTIONS.length
      setSelected(OPTIONS_IDS[prev])
      radioRefs.current[prev]?.focus()
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      setSelected(OPTIONS_IDS[currentIndex])
    }
  }

  const selectedOption = PAYMENT_OPTIONS.find((o) => o.id === selected)

  return (
    <div className="flex h-full flex-col bg-surface screen-enter">
      <StatusBar theme="dark" />

      {/* ── Scrollable content ───────────────────────────────────────────────── */}
      <main className="scroll-area flex flex-col px-4 pb-4">
        {/* Back button */}
        <div className="pt-0 pb-2 shrink-0">
          <BackButton onClick={onBack} />
        </div>

        {/* Screen Title (IngredientsScreen pattern) */}
        <div className="pt-2 pb-6">
          <h1 className="font-heading text-heading-xl font-bold text-content-primary">
            Forma de pagamento
          </h1>
        </div>

        {/* Container das seções com gap de 24px (gap-6) */}
        <div className="flex flex-col gap-6">
          {/* ── Delivery address ─────────────────────────────────────────────── */}
          <section aria-labelledby="address-heading">
            <h2
              id="address-heading"
              className="font-heading text-heading-sm text-content-secondary mb-3"
            >
              Endereço de entrega
            </h2>

            <div className="flex items-center gap-3 rounded-card bg-surface-muted px-4 py-3 shadow-card-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-surface-muted">
                <MapPinIcon aria-hidden="true" className="text-content-brand h-5 w-5" />
              </div>
              <address className="flex flex-col gap-0.5 not-italic">
                <span className="font-body text-body-md font-semibold text-content-primary">
                  Rua das Flores, 123
                </span>
                <span className="font-body text-body-sm text-content-secondary">
                  São Paulo, SP
                </span>
              </address>
            </div>
          </section>

          {/* ── Payment options ───────────────────────────────────────────────── */}
          <section aria-labelledby="payment-heading">
            <h2
              id="payment-heading"
              className="font-heading text-heading-sm text-content-secondary mb-3"
            >
              Formas de pagamento
            </h2>

            <div
              role="radiogroup"
              aria-labelledby="payment-heading"
              className="flex flex-col gap-3"
            >
              {PAYMENT_OPTIONS.map(({ id, label, description, Icon }, index) => {
                const isSelected = selected === id
                return (
                  <button
                    key={id}
                    ref={(el) => { radioRefs.current[index] = el }}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`${label} — ${description}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelected(id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`w-full flex items-center gap-3 rounded-card bg-surface-muted px-4 py-3 text-left shadow-card-sm transition-all active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fresh focus-visible:ring-offset-2 ${
                      isSelected
                        ? 'border-2 border-stroke-active'
                        : 'border border-stroke'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm transition-colors ${
                        isSelected ? 'bg-fresh' : 'bg-surface-muted'
                      }`}
                    >
                      <Icon
                        aria-hidden="true"
                        className={`h-5 w-5 ${isSelected ? 'text-content-inverse' : 'text-content-secondary'}`}
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                      <span className="font-body text-body-md font-semibold text-content-primary">
                        {label}
                      </span>
                      <span className="font-body text-body-sm text-content-secondary">
                        {description}
                      </span>
                    </div>

                    <RadioDot checked={isSelected} />
                  </button>
                )
              })}
            </div>
          </section>

          {/* ── Order summary ─────────────────────────────────────────────────── */}
          <section aria-labelledby="summary-heading">
            <h2
              id="summary-heading"
              className="font-heading text-heading-sm text-content-secondary mb-3"
            >
              Resumo do pedido
            </h2>

            <div className="flex flex-col gap-3 rounded-card bg-surface-muted px-4 py-4 shadow-card-sm">
              <div className="flex items-center justify-between">
                <span className="font-body text-body-sm text-content-secondary">Subtotal</span>
                <span className="font-body text-body-sm font-semibold text-content-primary">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-body-sm text-content-secondary">Taxa de serviço</span>
                <span className="font-body text-body-sm font-semibold text-content-primary">{formatPrice(SERVICE_FEE)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-body-sm text-content-secondary">Frete</span>
                <span className="font-body text-body-sm font-semibold text-fresh">Grátis</span>
              </div>

              <div className="h-px w-full bg-stroke" />

              <div className="flex items-center justify-between">
                <span className="font-body text-body-md font-semibold text-content-primary">
                  Total a pagar
                </span>
                <span className="font-heading text-heading-md font-extrabold text-content-primary">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="shrink-0 flex flex-col gap-4 px-4 pt-4 pb-2 bg-surface border-t border-stroke">
        {selectedOption && (
          <p className="font-body text-body-sm text-content-secondary text-center">
            Pagando com{' '}
            <span className="font-semibold text-content-primary">{selectedOption.label}</span>
          </p>
        )}

        <Button
          variant="primary"
          onClick={() => onConfirm(selected)}
          aria-label={`Confirmar pagamento com ${selectedOption?.label ?? 'método selecionado'}`}
        >
          Confirmar pagamento
        </Button>

        <div className="flex items-center justify-center py-2">
          <div className="h-[5px] w-[134px] rounded-full bg-neutral-150" />
        </div>
      </footer>
    </div>
  )
}
