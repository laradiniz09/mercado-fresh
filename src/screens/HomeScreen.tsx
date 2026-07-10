/**
 * 02_tela_home — Figma node 12:4
 * Main app screen: category grid, AI input card, daily offers, bottom tab bar.
 * Layout: flex-col h-full → scroll-area (flex-1 overflow-y-auto) + TabBar (shrink-0)
 */
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import TabBar, { type TabId } from '../components/TabBar'
import { MapPinIcon, BellIcon, SearchIcon } from '../components/icons'

// ─── Images (Vite static imports — bundled at build time) ─────────────────────
import imgUserAvatar  from '../assets/images/user-avatar.png'
// Category images
import imgHortfrutas  from '../assets/images/hortfrutas.png'
import imgQueijo      from '../assets/images/queijo.png'
import imgMercearia   from '../assets/images/mercearia.png'
import imgCarne       from '../assets/images/carne.png'
import imgCondimentos from '../assets/images/condimentos.png'
import imgPadaria     from '../assets/images/padaria.png'
import imgLimpeza     from '../assets/images/limpeza.png'
import imgGuloseima  from '../assets/images/guloseima.png'
import imgMassas      from '../assets/images/massas.png'
import imgBebidas     from '../assets/images/bebidas.png'
// Offer images
import imgCafe        from '../assets/images/cafesuper.png'
import imgSuco        from '../assets/images/sucomira.png'
import imgBombom      from '../assets/images/chocolate.png'
import imgSabonete    from '../assets/images/sabonete.png'
import imgVinagre     from '../assets/images/vinagre.png'

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: 'Hortfrutas', img: imgHortfrutas },
  { label: 'Frios',      img: imgQueijo     },
  { label: 'Mercearia',  img: imgMercearia  },
  { label: 'Carnes',     img: imgCarne      },
  { label: 'Condimento', img: imgCondimentos },
  { label: 'Padaria',    img: imgPadaria    },
  { label: 'Limpeza',    img: imgLimpeza    },
  { label: 'Guloseimas', img: imgGuloseima },
  { label: 'Massas',     img: imgMassas      },
  { label: 'Bebidas',    img: imgBebidas    },
]

const OFFERS = [
  { label: 'Café Super',    price: 'R$28,00', img: imgCafe     },
  { label: 'Suco Mira',     price: 'R$16,00', img: imgSuco     },
  { label: 'Bombom Bo',     price: 'R$18,00', img: imgBombom   },
  { label: 'Sabonete Li',   price: 'R$12,00', img: imgSabonete },
  { label: 'Vinagre Ult',   price: 'R$15,00', img: imgVinagre  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function CategoryItem({ label, img }: { label: string; img: string }) {
  return (
    <button className="flex flex-col items-center gap-1 active:opacity-70">
      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-muted overflow-hidden">
        <img src={img} alt={label} className="h-10 w-10 rounded-sm object-cover" />
      </div>
      <span className="w-17 text-center font-body text-body-xsm text-content-primary">
        {label}
      </span>
    </button>
  )
}

function OfferItem({ label, price, img }: { label: string; price: string; img: string }) {
  return (
    <button className="flex flex-col items-center gap-2 active:opacity-70">
      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-muted overflow-hidden">
        <img src={img} alt={label} className="h-10 w-10 rounded-sm object-cover" />
      </div>
      <div className="flex flex-col items-start gap-0.5 w-15">
        <span className="font-body text-body-sm font-semibold text-content-primary">{price}</span>
        <span className="font-body text-body-xsm text-content-secondary leading-tight">{label}</span>
      </div>
    </button>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────
interface HomeScreenProps {
  onSearch: (query: string) => void
}

export default function HomeScreen({ onSearch }: HomeScreenProps) {
  const [query, setQuery]   = useState('')
  const [activeTab, setTab] = useState<TabId>('home')

  const handleSearch = () => {
    if (query.trim()) onSearch(query.trim())
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="flex h-full flex-col bg-surface screen-enter">

      {/* ── Sticky top section (status bar + nav + categories) ── */}
      <div className="shrink-0 bg-surface">
        <StatusBar theme="dark" />

        {/* Nav Bar */}
        <div className="flex h-14 items-center justify-between px-6">
          <div className="h-8 w-8 overflow-hidden rounded-card border-2 border-fresh">
            <img src={imgUserAvatar} alt="Avatar" className="h-full w-full object-cover" />
          </div>

          <div className="flex items-center gap-3 px-4">
            <MapPinIcon className="text-content-secondary shrink-0" />
            <span className="font-body text-body-xsm text-content-primary">
              Rua das Flores, 123
            </span>
          </div>

          <button className="h-8 w-8 flex items-center justify-center active:opacity-70 bg-surface-muted rounded-full">
            <BellIcon className="text-content-primary" />
          </button>
        </div>

        {/* Category Grid — 2 rows × 5 columns */}
        <div className="flex flex-col gap-4 px-6 pb-8 pt-8">
          <div className="flex items-start justify-between">
            {CATEGORIES.slice(0, 5).map((c) => (
              <CategoryItem key={c.label} {...c} />
            ))}
          </div>
          <div className="flex items-start justify-between">
            {CATEGORIES.slice(5, 10).map((c) => (
              <CategoryItem key={c.label} {...c} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="scroll-area px-6 pb-4 pt-0 flex flex-col gap-6">

        {/* AI Input Card */}
        <div className="relative rounded-xl bg-surface-brand p-4 flex flex-col gap-4">
          
          {/* Headline */}
          <div className="flex flex-col gap-1 px-4 pr-16">
            <h2 className="font-heading text-heading-md text-content-inverse leading-tight">
              O que vamos cozinhar hoje?
            </h2>
            <p className="font-body text-body-sm text-content-inverse opacity-90">
              Digite o prato e suas restrições. Nós montamos a sua lista de ingredientes em segundos.
            </p>
          </div>

          {/* Input — 278×36px */}
          <div className="flex items-center gap-2 rounded-lg bg-surface h-9 w-full px-3 shadow-ai-card">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Digite o prato que deseja."
              className="flex-1 font-body text-body-sm text-content-primary placeholder:text-content-tertiary bg-transparent outline-none min-w-0"
            />
            <button
              onClick={handleSearch}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-brand active:opacity-80 shadow-send-btn"
            >
              <SearchIcon className="text-content-inverse h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Offers Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="font-heading text-heading-sm text-content-primary">
              Ofertas do dia
            </span>
            <button className="font-body text-body-xsm text-content-brand active:opacity-70">
              Ver mais
            </button>
          </div>

          <div className="flex items-start justify-between">
            {OFFERS.map((o) => (
              <OfferItem key={o.label} {...o} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Bar (in flow, not fixed) ── */}
      <TabBar activeTab={activeTab} onTabChange={setTab} />
    </div>
  )
}
