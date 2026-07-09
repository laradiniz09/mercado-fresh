/**
 * 06_screen — Figma node 37:152
 * Order summary screen: success header, undo snackbar, product list, pricing, checkout CTA.
 * Layout: flex-col h-full → scroll-area (flex-1 overflow-y-auto) + sticky footer
 */
import { useEffect, useState } from 'react'
import StatusBar from '../components/StatusBar'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { CheckIcon, InfoIcon } from '../components/icons'

// ─── Assets Locais ────────────────────────────────────────────────────────────
import imgCountdown       from '../assets/icons/countdown.svg'
import imgLeiteCoco       from '../assets/images/leite-de-coco.png'
import imgOvos            from '../assets/images/ovos.png'
import imgAcucar          from '../assets/images/acucar.png'
import imgLeiteCondensado from '../assets/images/leite-condensado.png'

// ─── Data ─────────────────────────────────────────────────────────────────────
const ORDER_ITEMS = [
  { id: 'leite-coco',       name: 'Leite de Coco vegano',        price: 'R$18,00', qty: '1 unidade',   img: imgLeiteCoco        },
  { id: 'ovos',             name: 'Ovos Jumbo',                  price: 'R$12,90', qty: '12 unidades', img: imgOvos            },
  { id: 'acucar',           name: 'Açúcar Demerara Mel',         price: 'R$7,50',  qty: '1 unidade',   img: imgAcucar           },
  { id: 'leite-condensado', name: 'Leite Condensado Zero Lac.',  price: 'R$7,80',  qty: '1 unidade',   img: imgLeiteCondensado },
]

const UNDO_SECONDS = 5

// ─── Sub-components ───────────────────────────────────────────────────────────
function ProductRow({
  name,
  price,
  qty,
  img,
  divider,
}: {
  name: string
  price: string
  qty: string
  img: string
  divider: boolean
}) {
  return (
    <div
      className={`flex gap-3 items-center py-3 ${divider ? 'border-b border-stroke' : ''}`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-surface-muted overflow-hidden">
        <img src={img} alt={name} className="h-12 w-12 rounded-sm object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-body text-body-md font-semibold text-content-primary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap leading-[1.3]">
            {name}
          </p>
          <p className="font-body text-body-md font-bold text-content-primary shrink-0 whitespace-nowrap">
            {price}
          </p>
        </div>
        <p className="font-body text-body-sm text-content-secondary">
          {qty}
        </p>
      </div>
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────
interface OrderSummaryScreenProps {
  onBack: () => void
  onCheckout: () => void
  onBackToStore?: () => void
}

export default function OrderSummaryScreen({ onBack, onCheckout, onBackToStore }: OrderSummaryScreenProps) {
  const [undoVisible, setUndoVisible] = useState(true)
  const [countdown, setCountdown] = useState(UNDO_SECONDS)

  useEffect(() => {
    if (!undoVisible) return
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer)
          setUndoVisible(false)
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [undoVisible])

  return (
    <div className="flex h-full flex-col bg-surface screen-enter">
      <StatusBar theme="dark" />

      {/* Scrollable content */}
      <div className="scroll-area flex flex-col px-4 pb-4">

        {/* Back button */}
        <div className="pt-0 pb-4 shrink-0">
          <BackButton onClick={onBack} />
        </div>

        {/* Success header */}
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-[36px] bg-surface-brand">
            <CheckIcon className="text-content-inverse h-8 w-8" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center w-full">
            <h1 className="font-heading text-heading-xl font-bold text-content-primary w-full">
              Pedido preparado
            </h1>
            <p className="font-body text-body-md text-content-secondary leading-[1.4]">
              Seus itens foram reservados e estão{'\n'}prontos para o pagamento.
            </p>
          </div>
        </div>

        {/* Undo snackbar */}
        {undoVisible && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface-muted px-2 py-4 mb-4">
            <p className="font-body text-body-md font-medium text-content-primary text-center">
              Pronto! Seu carrinho foi atualizado.
            </p>
            <button
              onClick={() => setUndoVisible(false)}
              className="flex items-center gap-2 active:opacity-70"
            >
              <img src={imgCountdown} alt="" className="h-5 w-5" />
              <span className="font-body text-[13px] font-extrabold text-content-brand">
                DESFAZER ({countdown}s)
              </span>
            </button>
          </div>
        )}

        {/* Summary card */}
        <div
          className="flex flex-col gap-4 rounded-card bg-surface-muted px-6 py-4"
          style={{ boxShadow: '0px 4px 6px rgba(0,0,0,0.03)' }}
        >
          <p className="font-heading text-body-sm font-semibold text-content-brand">
            Resumo
          </p>

          {/* Product list */}
          <div className="flex flex-col">
            {ORDER_ITEMS.map((item, idx) => (
              <ProductRow
                key={item.id}
                {...item}
                divider={idx < ORDER_ITEMS.length - 1}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-stroke" />

          {/* Subtotal */}
          <div className="flex items-center justify-between gap-3">
            <p className="font-body text-[13px] font-semibold text-content-primary flex-1">
              Subtotal
            </p>
            <p className="font-body text-body-md font-bold text-content-primary whitespace-nowrap">
              R$39,70
            </p>
          </div>

          {/* Service fee */}
          <div className="flex items-center justify-between gap-3">
            <p className="font-body text-[13px] font-semibold text-content-primary flex-1">
              Taxa de serviço
            </p>
            <div className="flex items-center gap-1 shrink-0">
              <p className="font-body text-body-md font-bold text-content-primary whitespace-nowrap">
                R$2,00
              </p>
              <InfoIcon className="text-content-secondary h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 flex flex-col px-6 pt-4 pb-6 bg-surface border-t border-stroke">
        {/* Total row */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex flex-col gap-0.5">
            <p className="font-body text-body-md font-semibold text-content-primary">Total:</p>
            <p className="font-body text-body-sm text-content-primary">4 itens • Frete grátis</p>
          </div>
          <p className="font-heading text-[24px] font-extrabold text-content-primary whitespace-nowrap">
            R$ 46,80
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-3">
          <Button variant="primary" onClick={onCheckout}>
            Prosseguir para o pagamento
          </Button>
          <button
            onClick={onBackToStore}
            className="flex h-10 w-full items-center justify-center active:opacity-70"
          >
            <span className="font-body text-base font-semibold text-content-secondary">
              Voltar ao Mercado
            </span>
          </button>
          <div className="h-[5px] w-[134px] rounded-full bg-neutral-150" />
        </div>
      </div>
    </div>
  )
}
