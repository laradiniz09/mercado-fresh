/**
 * 04_tela_ingredientes — Figma node 14:4
 * Ingredient list screen: available items, unavailable item, substitute/remove CTAs.
 * Layout: flex-col h-full → scroll-area (flex-1 overflow-y-auto)
 */
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { TrashIcon } from '../components/icons'

// ─── Assets ──────────────────────────────────────────────────────────────────
import imgPlus            from '../assets/icons/plus.svg'
import imgLeiteCondensado from '../assets/images/leite-condensado.png'
import imgOvos            from '../assets/images/ovos.png'
import imgAcucar          from '../assets/images/acucar.png'
import imgLeitePiraque    from '../assets/images/leite.png' 

// ─── Data ─────────────────────────────────────────────────────────────────────
const AVAILABLE_ITEMS = [
  {
    id: 'leite-condensado',
    name: 'Leite Condensado Piracanjuba Zero Lactose 395g',
    price: 'R$ 7,80',
    img: imgLeiteCondensado,
    badge: 'Zero lactose',
    badgeColor: 'bg-orange-200',
  },
  {
    id: 'ovos',
    name: 'Ovos brancos Jumbo',
    price: 'R$ 11,50',
    img: imgOvos,
    badge: null,
    badgeColor: '',
  },
  {
    id: 'acucar',
    name: 'Açúcar Demerara Mel 1kg',
    price: 'R$ 7,50',
    img: imgAcucar,
    badge: null,
    badgeColor: '',
  },
]

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
    <div
      className="flex gap-4 rounded-card bg-surface p-3 items-start"
      style={{ boxShadow: '0px 4px 6px rgba(0,0,0,0.04)' }}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-surface-muted overflow-hidden">
        <img src={img} alt={name} className="h-12 w-12 rounded-sm object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <p className="font-body text-body-md font-semibold text-content-primary leading-[1.3] overflow-hidden text-ellipsis whitespace-nowrap">
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
          <button onClick={onDecrement} className="flex items-center justify-center active:opacity-70">
            <TrashIcon className="text-content-secondary h-5 w-5" />
          </button>
          <span className="font-semibold text-base text-content-primary">{qty}</span>
          <button onClick={onIncrement} className="active:opacity-70">
            <img src={imgPlus} alt="Aumentar" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────
interface IngredientsScreenProps {
  onBack: () => void
  onSubstitute: () => void
  onRemove?: () => void
}

export default function IngredientsScreen({ onBack, onSubstitute, onRemove }: IngredientsScreenProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(AVAILABLE_ITEMS.map((i) => [i.id, 1]))
  )

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] ?? 1) + delta) }))
  }

  return (
    <div className="flex h-full flex-col bg-surface screen-enter">
      <StatusBar theme="dark" />

      <div className="scroll-area flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-4 px-4 pt-2 pb-4 shrink-0">
          <BackButton onClick={onBack} />
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-heading-xl font-bold text-content-primary">
              Ingredientes para o pudim
            </h1>
            <p className="font-body text-body-md text-content-secondary">
              Um dos itens da sua receita acabou. Veja o que falta e escolha uma alternativa abaixo.
            </p>
          </div>
        </div>

        {/* Available items section */}
        <div className="flex flex-col gap-4 px-4 pb-6">
          <p className="font-heading text-heading-sm  text-neutral-250 pt-2">
            No seu carrinho
          </p>
          {AVAILABLE_ITEMS.map((item) => (
            <IngredientCard
              key={item.id}
              {...item}
              qty={quantities[item.id] ?? 1}
              onDecrement={() => updateQty(item.id, -1)}
              onIncrement={() => updateQty(item.id, +1)}
            />
          ))}
        </div>

        {/* Unavailable items section */}
        <div className="flex flex-col gap-4 px-4 pb-6">
          <p className="font-heading text-heading-sm  text-orange-100">
            Indisponível
          </p>

          {/* Disabled card */}
          <div
            className="flex gap-4 rounded-card bg-surface p-3 items-start"
            style={{ boxShadow: '0px 4px 6px rgba(0,0,0,0.04)' }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-surface-muted overflow-hidden">
              <img
                src={imgLeitePiraque}
                alt="Leite Piraquê"
                className="h-12 w-12 rounded-sm object-cover opacity-60"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 min-w-0">
              <p className="font-body text-body-md font-semibold text-content-disabled leading-[1.3] overflow-hidden text-ellipsis whitespace-nowrap">
                Leite Piraquê Zero Lactose 1l
              </p>
              <div className="flex items-center justify-between">
                <span className="font-body text-body-sm text-content-disabled">R$ 7,80</span>
                <span className="rounded-full bg-orange-50 px-1.5 py-1 font-body text-body-xsm text-content-inverse opacity-80">
                  Zero lactose
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-2">
            <Button variant="primary" onClick={onSubstitute}>
              Substituir item
            </Button>
            <button
              onClick={onRemove}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-surface-muted active:opacity-80"
            >
              <TrashIcon className="text-danger h-5 w-5" />
              <span className="font-body text-base font-semibold text-danger">Remover da compra</span>
            </button>
          </div>

          {/* iOS home indicator */}
          <div className="flex items-center justify-center pt-2 pb-1">
            <div className="h-[5px] w-[134px] rounded-full bg-neutral-150" />
          </div>
        </div>
      </div>
    </div>
  )
}
