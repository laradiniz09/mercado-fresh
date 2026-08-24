/**
 * 04_tela_ingredientes — Figma node 14:4
 * Ingredient list screen: available items, unavailable item, substitute/remove CTAs.
 * Layout: flex-col h-full → scroll-area (flex-1 overflow-y-auto)
 *
 * Dados vêm de CartItem[] (recipeService) — sem mocks hardcoded.
 */
import StatusBar from '../components/StatusBar'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { TrashIcon } from '../components/icons'
import { type CartItem, formatPrice } from '../services/recipeService'
import { getProductImage } from '../assets/productImages'

import imgPlus from '../assets/icons/plus.svg'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Palavras-chave que identificam laticínios derivados.
 * A tag "Zero lactose" só faz sentido nesses produtos —
 * ovos, açúcar, óleo, sal, etc. são naturalmente sem lactose.
 */
const DAIRY_KEYWORDS = ['leite', 'creme', 'manteiga', 'queijo', 'requeijão', 'iogurte', 'nata']

function isDairy(name: string, id: string): boolean {
  const n = name.toLowerCase()
  const i = id.toLowerCase()
  return DAIRY_KEYWORDS.some((k) => n.includes(k) || i.includes(k))
}

function getLactosBadge(item: CartItem): { text: string; color: string } | null {
  if (item.product.is_lactose_free && isDairy(item.product.name, item.product.id))
    return { text: 'Zero lactose', color: 'bg-orange-200' }
  return null
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function IngredientCard({
  name,
  price,
  img,
  badge,
  badgeColor,
  qty,
  onDecrement,
  onIncrement,
}: {
  name: string
  price: string
  img: string
  badge: string | null
  badgeColor: string
  qty: number
  onDecrement: () => void
  onIncrement: () => void
}) {
  return (
    <div className="flex gap-4 rounded-card bg-surface-lighter p-3 items-start shadow-card-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-surface-muted overflow-hidden">
        <img src={img} alt={name} className="h-12 w-12 rounded-sm object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <p className="font-body text-body-md font-semibold text-content-primary leading-snug overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-body text-body-sm text-content-secondary">{price}</span>
          {badge && (
            <span className={`rounded-full ${badgeColor} px-1.5 py-1 font-body text-body-xsm text-content-inverse`}>
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 self-start rounded-sm bg-surface-muted p-1">
          <button
            aria-label={`Diminuir quantidade de ${name}`}
            onClick={onDecrement}
            className="flex items-center justify-center active:opacity-70"
          >
            <TrashIcon aria-hidden="true" className="text-content-primary h-5 w-5" />
          </button>
          <span className="font-body text-body-lg font-semibold text-content-primary">{qty}</span>
          <button
            aria-label={`Aumentar quantidade de ${name}`}
            onClick={onIncrement}
            className="active:opacity-70"
          >
            <img src={imgPlus} alt="" aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────
interface IngredientsScreenProps {
  cartItems: CartItem[]
  quantities: Record<string, number>
  onQuantityChange: (productId: string, delta: number) => void
  recipeName?: string
  onBack: () => void
  onContinue: () => void
  onSubstitute: (item: CartItem) => void
  onRemove: (productId: string) => void
}

export default function IngredientsScreen({
  cartItems,
  quantities,
  onQuantityChange,
  recipeName = 'receita',
  onBack,
  onContinue,
  onSubstitute,
  onRemove,
}: IngredientsScreenProps) {

  const availableItems   = cartItems.filter((i) => i.status === 'available')
  const unavailableItems = cartItems.filter((i) => i.status !== 'available')

  return (
    <div className="flex h-full flex-col bg-surface screen-enter">
      <StatusBar theme="dark" />

      <main className="scroll-area flex flex-col pb-4">

        {/* Header */}
        <header className="flex flex-col gap-4 px-4 pt-2 pb-4 shrink-0">
          <BackButton onClick={onBack} />
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-heading-xl font-bold text-content-primary">
              Ingredientes para {recipeName.toLowerCase()}
            </h1>
            {unavailableItems.length > 0 && (
              <p className="font-body text-body-md text-content-secondary">
                Um dos itens da sua receita acabou. Veja o que falta e escolha uma alternativa abaixo.
              </p>
            )}
          </div>
        </header>

        {/* Itens disponíveis */}
        {availableItems.length > 0 && (
          <section aria-labelledby="available-heading" className="flex flex-col gap-4 px-4 pb-6">
            <h2 id="available-heading" className="font-heading text-heading-sm text-neutral-250 pt-2">
              No seu carrinho
            </h2>
            {availableItems.map((item) => {
              const badge = getLactosBadge(item)
              return (
                <IngredientCard
                  key={item.product.id}
                  name={item.product.name}
                  price={formatPrice(item.product.price)}
                  img={getProductImage(item.product.id)}
                  badge={badge?.text ?? null}
                  badgeColor={badge?.color ?? ''}
                  qty={quantities[item.product.id] ?? item.ingredient.quantity}
                  onDecrement={() => onQuantityChange(item.product.id, -1)}
                  onIncrement={() => onQuantityChange(item.product.id, +1)}
                />
              )
            })}
          </section>
        )}

        {/* Itens indisponíveis */}
        {unavailableItems.length > 0 && (
          <section aria-labelledby="unavailable-heading" className="flex flex-col gap-4 px-4 pb-6">
            <h2 id="unavailable-heading" className="font-heading text-heading-sm text-orange-100">
              Indisponível
            </h2>

            {unavailableItems.map((item) => (
              <div key={item.product.id} className="flex flex-col gap-6">

                {/* Card do produto indisponível */}
                <div className="flex gap-4 rounded-card bg-surface p-3 items-start shadow-card-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-surface-muted overflow-hidden">
                    <img
                      src={getProductImage(item.product.id)}
                      alt={item.product.name}
                      className="h-12 w-12 rounded-sm object-cover opacity-60"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 min-w-0">
                    <p className="font-body text-body-md font-semibold text-content-disabled leading-snug overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.product.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-body-sm text-content-disabled">
                        {formatPrice(item.product.price)}
                      </span>
                      {(() => { const b = getLactosBadge(item); return b && (
                        <span className={`rounded-full ${b.color} px-1.5 py-1 font-body text-body-xsm text-content-inverse opacity-80`}>
                          {b.text}
                        </span>
                      )})()}
                    </div>
                  </div>
                </div>

                {/* Botões de ação — lado a lado */}
                <div className="flex gap-3">
                  <button
                    onClick={() => onRemove(item.product.id)}
                    aria-label={`Remover ${item.product.name} do pedido`}
                    className="flex h-11 w-40 items-center justify-center rounded-xl bg-neutral-100 active:opacity-80"
                  >
                    <span className="font-body text-body-md font-semibold text-danger">
                      Remover item
                    </span>
                  </button>

                  {item.status === 'out_of_stock' && (
                    <button
                      onClick={() => onSubstitute(item)}
                      aria-label={`Escolher substituto para ${item.product.name}`}
                      className="flex h-11 w-40 items-center justify-center rounded-xl bg-fresh-light active:opacity-90"
                    >
                      <span className="font-body text-body-md font-semibold text-content-inverse">
                        Escolher substituto
                      </span>
                    </button>
                  )}
                </div>

              </div>
            ))}

          </section>
        )}

      </main>

      {/* Footer fixo */}
      <footer className="shrink-0 flex flex-col px-6 pt-4 pb-6 bg-surface border-t border-stroke">
        <div className="flex flex-col items-center gap-3">
          <Button variant="primary" onClick={onContinue}>
            Ver resumo do pedido
          </Button>
          <button
            onClick={onBack}
            className="flex h-10 w-full items-center justify-center active:opacity-70"
          >
            <span className="font-body text-body-lg font-semibold text-content-secondary">
              Continuar comprando
            </span>
          </button>
          <div className="h-[5px] w-[134px] rounded-full bg-neutral-150" />
        </div>
      </footer>
    </div>
  )
}
