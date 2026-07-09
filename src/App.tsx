/**
 * App — mobile shell + navigation stack
 *
 * Fluxo completo (Figma):
 *   WelcomeScreen
 *     → onStart → HomeScreen
 *
 *   HomeScreen
 *     → onSearch(q) → LoadingScreen
 *
 *   LoadingScreen
 *     → onComplete → IngredientsScreen
 *
 *   IngredientsScreen
 *     → onBack      → HomeScreen
 *     → onSubstitute → SubstitutionScreen
 *     → onRemove    → IngredientsScreen (remove item, permanece na tela)
 *
 *   SubstitutionScreen
 *     → onBack       → IngredientsScreen
 *     → onApply      → OrderSummaryScreen
 *     → onBackToCart → HomeScreen
 *
 *   OrderSummaryScreen
 *     → onBack       → SubstitutionScreen
 *     → onCheckout   → HomeScreen  (pagamento fora do escopo)
 *     → onBackToStore → HomeScreen
 *
 * Navegação: stack simples — navigate() empilha, goBack() desempilha.
 * Layout: shell 390 px centralizado; cada tela é h-full flex-col.
 */
import { useState } from 'react'
import WelcomeScreen      from './screens/WelcomeScreen'
import HomeScreen         from './screens/HomeScreen'
import LoadingScreen      from './screens/LoadingScreen'
import IngredientsScreen  from './screens/IngredientsScreen'
import SubstitutionScreen from './screens/SubstitutionScreen'
import OrderSummaryScreen from './screens/OrderSummaryScreen'

type Screen =
  | 'welcome'
  | 'home'
  | 'loading'
  | 'ingredients'
  | 'substitution'
  | 'order-summary'

export default function App() {
  // History stack — last item is current screen
  const [history, setHistory] = useState<Screen[]>(['welcome'])
  const [query,   setQuery]   = useState('')

  const screen  = history[history.length - 1]

  /** Push a new screen onto the stack */
  const navigate = (to: Screen) =>
    setHistory((prev) => [...prev, to])

  /** Pop current screen; go back to previous */
  const goBack = () =>
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))

  /** Jump to root, clearing the whole history */
  const goHome = () => setHistory(['home'])

  return (
    <div className="flex min-h-screen items-start justify-center bg-neutral-200 sm:items-center sm:py-8">
      {/*
       * Phone shell — 390 px wide, full viewport height on mobile,
       * capped to 844 px (iPhone 14) on desktop.
       */}
      <div
        className="
          relative w-[390px] overflow-hidden bg-surface
          h-screen sm:h-[844px]
          sm:rounded-phone sm:ring-4 sm:ring-neutral-300/40
        "
        style={{ contain: 'strict' }}
      >
        {screen === 'welcome' && (
          <WelcomeScreen
            onStart={() => navigate('home')}
          />
        )}

        {screen === 'home' && (
          <HomeScreen
            onSearch={(q) => {
              setQuery(q)
              navigate('loading')
            }}
          />
        )}

        {screen === 'loading' && (
          <LoadingScreen
            query={query}
            onComplete={() => navigate('ingredients')}
          />
        )}

        {screen === 'ingredients' && (
          <IngredientsScreen
            onBack={goBack}
            onSubstitute={() => navigate('substitution')}
            onRemove={goBack}
          />
        )}

        {screen === 'substitution' && (
          <SubstitutionScreen
            onBack={goBack}
            onApply={() => navigate('order-summary')}
            onBackToCart={goHome}
          />
        )}

        {screen === 'order-summary' && (
          <OrderSummaryScreen
            onBack={goBack}
            onCheckout={goHome}
            onBackToStore={goHome}
          />
        )}
      </div>
    </div>
  )
}
