// Bottom navigation — matches Figma 02_tela_home tab-bar (64px + 34px home indicator)
import savedIcon  from '../assets/icons/bookmark.svg'
import cartIcon   from '../assets/icons/shopping-cart.svg'
import userIcon   from '../assets/icons/user.svg'
import { HouseIcon } from './icons'

export type TabId = 'home' | 'saved' | 'cart' | 'account'

interface TabBarProps {
  activeTab?: TabId
  onTabChange?: (tab: TabId) => void
}

const IMG_TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'saved',   label: 'Salvo',    icon: savedIcon  },
  { id: 'cart',    label: 'Carrinho', icon: cartIcon   },
  { id: 'account', label: 'Conta',    icon: userIcon   },
]

export default function TabBar({ activeTab = 'home', onTabChange }: TabBarProps) {
  const tabs: TabId[] = ['home', 'saved', 'cart', 'account']

  return (
    <div className="shrink-0 border-t border-stroke bg-surface">
      {/* Tab row */}
      <div className="flex h-16 items-center justify-between px-3 pt-2">
        {tabs.map((id) => {
          const isActive = id === activeTab
          const label = id === 'home' ? 'Home' : IMG_TABS.find((t) => t.id === id)!.label
          return (
            <button
              key={id}
              onClick={() => onTabChange?.(id)}
              className="flex flex-1 flex-col items-center gap-1 min-w-0"
            >
              {id === 'home' ? (
                <HouseIcon
                  className={`h-6 w-6 transition-colors ${
                    isActive ? 'text-content-primary' : 'text-content-tertiary'
                  }`}
                />
              ) : (
                <img
                  src={IMG_TABS.find((t) => t.id === id)!.icon}
                  alt={label}
                  className={`h-6 w-6 transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}
                />
              )}
              <span
                className={`font-body text-body-xsm ${
                  isActive ? 'font-semibold text-content-brand' : 'font-medium text-content-tertiary'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>

      {/* iOS home indicator */}
      <div className="flex h-[34px] items-center justify-center">
        <div className="h-[5px] w-[134px] rounded-full bg-neutral-150" />
      </div>
    </div>
  )
}
