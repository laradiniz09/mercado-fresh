// Bottom navigation — matches Figma 02_tela_home tab-bar (64px + 34px home indicator)
import type { ComponentType, SVGProps } from 'react'
import { HouseIcon, BookmarkIcon, ShoppingCartIcon, UserIcon } from './icons'

export type TabId = 'home' | 'saved' | 'cart' | 'account'

type IconProps = SVGProps<SVGSVGElement>

interface TabConfig {
  id: TabId
  label: string
  Icon: ComponentType<IconProps>
}

const TABS: TabConfig[] = [
  { id: 'home',    label: 'Home',     Icon: HouseIcon        },
  { id: 'saved',   label: 'Salvo',    Icon: BookmarkIcon     },
  { id: 'cart',    label: 'Carrinho', Icon: ShoppingCartIcon },
  { id: 'account', label: 'Conta',    Icon: UserIcon         },
]

interface TabBarProps {
  activeTab?: TabId
  onTabChange?: (tab: TabId) => void
}

export default function TabBar({ activeTab = 'home', onTabChange }: TabBarProps) {
  return (
    <nav aria-label="Navegação principal" className="shrink-0 border-t border-stroke bg-surface">

      {/* Tab row */}
      <div className="flex h-16 items-center justify-between px-3 pt-2">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = id === activeTab
          return (
            <button
              key={id}
              onClick={() => onTabChange?.(id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className="flex flex-1 flex-col items-center gap-1 min-w-0"
            >
              <Icon
                aria-hidden="true"
                className={`h-6 w-6 transition-colors ${
                  isActive ? 'text-content-brand' : 'text-content-tertiary'
                }`}
              />
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

      {/* iOS home indicator — h-8.5 = 34px (token), dimensões da barra via inline style */}
      <div className="flex h-8.5 items-center justify-center">
        <div
          className="rounded-full bg-neutral-150"
          style={{ width: '134px', height: '5px' }}
        />
      </div>
    </nav>
  )
}
