/**
 * 02_tela_home — Figma node 12:4
 * Main app screen: category grid, AI input card, daily offers, bottom tab bar.
 */
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import TabBar, { type TabId } from '../components/TabBar'
import { MapPinIcon, BellIcon, SearchIcon } from '../components/icons'

// ─── Imports de Imagens ──────────────────────────────────────────────────────
import imgUserAvatar from '../assets/images/user-avatar.png'
import imgHortfrutas from '../assets/images/hortfrutas.png'
import imgQueijo from '../assets/images/queijo.png'
import imgMercearia from '../assets/images/mercearia.png'
import imgCarne from '../assets/images/carne.png'
import imgCondimentos from '../assets/images/condimentos.png'
import imgPadaria from '../assets/images/padaria.png'
import imgLimpeza from '../assets/images/limpeza.png'
import imgGuloseima from '../assets/images/guloseima.png'
import imgMassas from '../assets/images/massas.png'
import imgBebidas from '../assets/images/bebidas.png'
import imgCafe from '../assets/images/cafesuper.png'
import imgSuco from '../assets/images/sucomira.png'
import imgBombom from '../assets/images/chocolate.png'
import imgSabonete from '../assets/images/sabonete.png'
import imgVinagre      from '../assets/images/vinagre.png'
import imgBannerAnuncio from '../assets/images/banner-anuncio.png'

const CATEGORIES = [
  { label: 'Hortfrutas', img: imgHortfrutas }, { label: 'Frios', img: imgQueijo },
  { label: 'Mercearia', img: imgMercearia }, { label: 'Carnes', img: imgCarne },
  { label: 'Condimento', img: imgCondimentos }, { label: 'Padaria', img: imgPadaria },
  { label: 'Limpeza', img: imgLimpeza }, { label: 'Guloseimas', img: imgGuloseima },
  { label: 'Massas', img: imgMassas }, { label: 'Bebidas', img: imgBebidas },
]

const OFFERS = [
  { label: 'Café Super', price: 'R$28,00', img: imgCafe }, { label: 'Suco Mira', price: 'R$16,00', img: imgSuco },
  { label: 'Bombom Bo', price: 'R$18,00', img: imgBombom }, { label: 'Sabonete Li', price: 'R$12,00', img: imgSabonete },
  { label: 'Vinagre Ult', price: 'R$15,00', img: imgVinagre },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function CategoryItem({ label, img }: { label: string; img: string }) {
  return (
    <button aria-label={label} className="flex flex-col items-center gap-1 active:opacity-70">
      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-muted overflow-hidden">
        <img src={img} alt="" className="h-10 w-10 rounded-sm object-cover" />
      </div>
      <span className="w-17 text-center font-body text-body-xsm text-content-primary">{label}</span>
    </button>
  )
}

function OfferItem({ label, price, img }: { label: string; price: string; img: string }) {
  return (
    <button aria-label={`${label}, ${price}`} className="flex flex-col items-center gap-2 active:opacity-70">
      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-muted overflow-hidden">
        <img src={img} alt="" className="h-10 w-10 rounded-sm object-cover" />
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
  onGoToCart?: () => void
}

export default function HomeScreen({ onSearch, onGoToCart }: HomeScreenProps) {
  const [query, setQuery] = useState('')
  const [activeTab, setTab] = useState<TabId>('home')

  const handleSearch = () => { if (query.trim()) onSearch(query.trim()) }
  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSearch() }

  const handleTabChange = (tab: TabId) => {
    setTab(tab)
    if (tab === 'cart') onGoToCart?.()
  }

  return (
    <div className="flex h-full flex-col bg-surface screen-enter">
      <header className="shrink-0 bg-surface">
        <StatusBar theme="dark" />
        <nav className="flex h-14 items-center justify-between px-6">
          <div className="h-8 w-8 overflow-hidden rounded-card">
            <img src={imgUserAvatar} alt="Foto de perfil" className="h-full w-full object-cover" />
          </div>
          <address className="flex items-center gap-3 px-4 not-italic">
            <MapPinIcon aria-hidden="true" className="text-icon-secondary shrink-0" />
            <span className="font-body text-body-sm text-content-primary">Rua das Flores, 123</span>
          </address>
          <button aria-label="Notificações" className="h-8 w-8 flex items-center justify-center active:opacity-70 bg-surface-muted rounded-full">
            <BellIcon aria-hidden="true" className="text-content-primary" />
          </button>
        </nav>
        
        {/* Banner de Anúncio — py-4 (16px em cima, 16px embaixo) */}
        <div className="px-6 py-4">
          <img
            src={imgBannerAnuncio}
            alt="Produtos exclusivos — Seja cliente +"
            className="w-full rounded-card object-cover"
          />
        </div>

        {/* Category Grid — py-4 (16px em cima, 16px embaixo) */}
        <div className="flex flex-col gap-4 px-6 py-4">
          <div className="flex items-start justify-between">{CATEGORIES.slice(0, 5).map(c => <CategoryItem key={c.label} {...c} />)}</div>
          <div className="flex items-start justify-between">{CATEGORIES.slice(5, 10).map(c => <CategoryItem key={c.label} {...c} />)}</div>
        </div>
      </header>

      {/* Main Container — pt-4 (16px em cima para garantir os 32px totais de distância das categorias) */}
      <main className="scroll-area px-6 pb-4 pt-4 flex flex-col">

        {/* AI Input Card — mb-4 (16px embaixo) e bg-surface-card (ou bg-card se ajustado no tailwind) */}
        <div className="mb-4 relative rounded-xl bg-surface-card flex flex-col gap-4 w-full p-4 overflow-hidden">
          <div className="flex flex-col gap-1 px-4">
            <h2 className="font-heading text-heading-md text-content-inverse leading-tight">O que vamos cozinhar hoje?</h2>
            <p className="font-body text-body-sm text-content-inverse opacity-90 leading-tight">
              Digite o prato e suas restrições. Nós montamos a sua lista de ingredientes em segundos.
            </p>
          </div>

          {/* Input row */}
          <div className="flex flex-col justify-between rounded-2xl bg-surface shadow-ai-card w-full p-4">
            <label htmlFor="ai-search" className="sr-only">Digite o prato e suas restrições</label>
            <input
              id="ai-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Digite aqui o que deseja."
              className="w-full font-body text-body-sm text-content-primary placeholder:text-content-tertiary bg-transparent outline-none"
            />
            <div className="flex justify-end">
              <button aria-label="Buscar prato" onClick={handleSearch} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-brand active:opacity-80 shadow-send-btn">
                <SearchIcon aria-hidden="true" className="text-content-inverse h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
                
        {/* Section Ofertas — mt-4 (16px em cima para garantir 32px totais em relação ao card de IA) */}
        <section aria-labelledby="offers-heading" className="mt-4 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 id="offers-heading" className="font-heading text-heading-sm text-content-secondary">Ofertas do dia</h2>
            <button aria-label="Ver mais ofertas" className="font-body text-body-xsm text-content-brand active:opacity-70">Ver mais</button>
          </div>
          <div className="flex items-start justify-between">{OFFERS.map(o => <OfferItem key={o.label} {...o} />)}</div>
        </section>
      </main>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
