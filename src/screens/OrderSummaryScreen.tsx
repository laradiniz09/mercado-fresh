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
import { type CartItem, formatPrice, calcCartTotalWithQty, calcItemPriceWithQty, calcPackagesNeeded, formatPurchaseDisplay, SERVICE_FEE } from '../services/recipeService'
import { getProductImage } from '../assets/productImages'

import imgCountdown from '../assets/icons/countdown-container.svg'

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
          <p className="font-body text-body-md font-semibold text-content-primary flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap leading-snug">
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
  cartItems: CartItem[]
  quantities: Record<string, number>
  onBack: () => void
  onCheckout: () => void
  onBackToStore?: () => void
}

export default function OrderSummaryScreen({ cartItems, quantities, onBack, onCheckout, onBackToStore }: OrderSummaryScreenProps) {
  const subtotal = calcCartTotalWithQty(cartItems, quantities)
  const total    = subtotal + SERVICE_FEE
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

      {/* S1: landmark principal */}
      <main className="scroll-area flex flex-col px-4 pb-4">

        {/* Back button */}
        <div className="pt-0 pb-2 shrink-0">
          <BackButton onClick={onBack} />
        </div>

        {/* S2: header semântico — agrupa h1 e contexto introdutório */}
        <header className="flex flex-col items-center gap-4 pt-2 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-check bg-surface-brand">
            {/* A3: ícone decorativo */}
            <CheckIcon aria-hidden="true" className="text-content-inverse h-8 w-8" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center whitespace-pre-line">
            <h1 className="font-heading text-heading-xl font-bold text-content-primary w-full">
              Pedido preparado
            </h1>
            <p className="font-body text-body-md text-content-secondary leading-snug">
              Seus itens foram reservados e estão{'\n'}prontos para o pagamento.
            </p>
          </div>
        </header>

        {/* A1 + A2: snackbar com região ao vivo — anuncia aparecimento sem repetir countdown */}
        {undoVisible && (
          <div
            role="status"
            aria-live="polite"
            aria-atomic="false"
            className="flex flex-col items-center gap-4 rounded-card bg-surface-muted px-2 py-4 mb-4"
          >
            <p className="font-body text-body-md font-medium text-content-primary text-center">
              Pronto! Seu carrinho foi atualizado.
            </p>
            {/* A5: aria-label estático — countdown silenciado para leitores de tela */}
            <button
              aria-label="Desfazer alteração no carrinho"
              onClick={() => setUndoVisible(false)}
              className="flex items-center gap-2 active:opacity-70"
            >
              <img src={imgCountdown} alt="" aria-hidden="true" className="h-5 w-5 animate-spin" />
              <span className="font-body text-body-xs font-extrabold text-content-brand">
                DESFAZER{' '}
                {/* A2: countdown visual apenas — silenciado para leitores de tela */}
                <span aria-hidden="true">({countdown}s)</span>
              </span>
            </button>
          </div>
        )}

        {/* S3: section de resumo com título semântico */}
        <section aria-labelledby="summary-heading" className="flex flex-col gap-4 rounded-card bg-surface-muted px-6 py-4 shadow-card-sm">
          {/* S4: h2 semântico — era <p> */}
          <h2 id="summary-heading" className="font-body text-body-sm font-semibold text-content-brand">
            Resumo
          </h2>

          {/* Product list */}
          <div className="flex flex-col">
            {cartItems.map((item, idx) => {
              const product = item.status === 'out_of_stock' && item.substitute
                ? item.substitute
                : item.product
              const qty       = quantities[item.product.id] ?? calcPackagesNeeded(item.ingredient.quantity, item.ingredient.unit, product)
              const linePrice = calcItemPriceWithQty(item, qty)
              return (
                <ProductRow
                  key={item.product.id}
                  name={product.name}
                  price={formatPrice(linePrice)}
                  qty={formatPurchaseDisplay(qty, product)}
                  img={getProductImage(product.id)}
                  divider={idx < cartItems.length - 1}
                />
              )
            })}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-stroke" />

          {/* Subtotal */}
          <div className="flex items-center justify-between gap-3">
            <p className="font-body text-body-sm text-content-secondary">
              Subtotal
            </p>
            <p className="font-body text-body-md font-bold text-content-primary whitespace-nowrap">
              {formatPrice(subtotal)}
            </p>
          </div>

          {/* Service fee */}
          <div className="flex items-center justify-between gap-3">
            <p className="font-body text-body-sm text-content-secondary">
              Taxa de serviço
            </p>
            <div className="flex items-center gap-1 shrink-0">
              <p className="font-body text-body-md font-bold text-content-primary whitespace-nowrap">
                {formatPrice(SERVICE_FEE)}
              </p>
              <InfoIcon aria-hidden="true" className="text-content-secondary h-4 w-4" />
            </div>
          </div>
        </section>
      </main>

      {/* S5: landmark de rodapé fixo */}
      <footer className="shrink-0 flex flex-col px-6 pt-4 pb-6 bg-surface border-t border-stroke">
        {/* Total row */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex flex-col gap-0.5">
            <p className="font-body text-body-md font-semibold text-content-primary">Total:</p>
            <p className="font-body text-body-sm text-content-primary">
              {(() => {
                const totalItems = Object.values(quantities).reduce((s, q) => s + q, 0)
                return `${totalItems} ${totalItems === 1 ? 'item' : 'itens'} • Frete grátis`
              })()}
            </p>
          </div>
          <p className="font-heading text-heading-xl font-extrabold text-content-primary whitespace-nowrap">
            {formatPrice(total)}
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
            <span className="font-body text-body-lg font-semibold text-content-secondary">
              Voltar ao Mercado
            </span>
          </button>
          {/* G1: inline style no lugar de classes arbitrárias */}
          <div className="h-[5px] w-[134px] rounded-full bg-neutral-150" />
        </div>
      </footer>
    </div>
  )
}
