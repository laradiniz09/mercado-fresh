/**
 * App — mobile shell + navigation stack
 *
 * Fluxo completo (Figma):
 *   Splash Screen (2s timer) → WelcomeScreen
 *   
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
 *     → onBack        → SubstitutionScreen
 *     → onCheckout    → PaymentScreen
 *     → onBackToStore → HomeScreen
 *
 *   PaymentScreen
 *     → onBack    → OrderSummaryScreen
 *     → onConfirm → HomeScreen  (pedido confirmado)
 *
 * Navegação: stack simples — navigate() empilha, goBack() desempilha.
 * Layout: shell 390 px centralizado; cada tela é h-full flex-col.
 */
import { useState } from 'react'
import SplashScreen       from './screens/SplashScreen'
import WelcomeScreen      from './screens/WelcomeScreen'
import HomeScreen         from './screens/HomeScreen'
import LoadingScreen      from './screens/LoadingScreen'
import IngredientsScreen  from './screens/IngredientsScreen'
import SubstitutionScreen from './screens/SubstitutionScreen'
import OrderSummaryScreen from './screens/OrderSummaryScreen'
import PaymentScreen      from './screens/PaymentScreen'
import {
  type CartItem,
  getCartItemsForRecipe,
  detectLactoseIntolerance,
  detectRecipeFromQuery,
  calcOrderTotal,
} from './services/recipeService'
import { getRecipeById } from './database'

type Screen =
  | 'splash'
  | 'welcome'
  | 'home'
  | 'loading'
  | 'ingredients'
  | 'substitution'
  | 'order-summary'
  | 'payment'

export default function App() {
  // History stack — last item is current screen (iniciando com 'splash')
  const [history, setHistory] = useState<Screen[]>(['splash'])
  const [query,   setQuery]   = useState('')

  // Estado global do carrinho — inicializado com o pudim sem restrição de lactose
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    getCartItemsForRecipe('pudim-leite-condensado', false)
  )
  const [recipeName, setRecipeName] = useState('Pudim de Leite Condensado')
  // Item esgotado que o usuário escolheu substituir
  const [pendingSubstitution, setPendingSubstitution] = useState<CartItem | null>(null)

  const screen = history[history.length - 1]

  /** Push a new screen onto the stack */
  const navigate = (to: Screen) =>
    setHistory((prev) => [...prev, to])

  /** Pop current screen; go back to previous */
  const goBack = () =>
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))

  /** Jump to root, clearing the whole history */
  const goHome = () => setHistory(['home'])

  /**
   * Chamado pelo HomeScreen ao confirmar a busca.
   * Detecta lactose + receita → executa o serviço → armazena o carrinho.
   */
  const handleSearch = (q: string) => {
    const isLactoseIntolerant = detectLactoseIntolerance(q)
    const recipeId            = detectRecipeFromQuery(q)
    const recipe              = getRecipeById(recipeId)
    try {
      const items = getCartItemsForRecipe(recipeId, isLactoseIntolerant)
      setCartItems(items)
      setRecipeName(recipe?.name ?? recipeId)
    } catch {
      // RecipeNotFoundError — mantém o carrinho atual
    }
    setQuery(q)
    navigate('loading')
  }

  /** Remove um item do carrinho pelo product.id */
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  /**
   * Aplicar decisão de substituição:
   * - 'substitute' → troca o produto esgotado pelo substituto
   * - 'notify'     → remove o item do carrinho
   */
  const handleApplySubstitution = (option: 'substitute' | 'notify') => {
    if (pendingSubstitution) {
      setCartItems((prev) => {
        if (option === 'substitute' && pendingSubstitution.substitute) {
          return prev.map((item) =>
            item.product.id === pendingSubstitution.product.id
              ? {
                  ...item,
                  product:    pendingSubstitution.substitute!,
                  status:     'available' as const,
                  substitute: undefined,
                }
              : item
          )
        }
        // 'notify' ou sem substituto: remove o item
        return prev.filter((item) => item.product.id !== pendingSubstitution.product.id)
      })
    }
    navigate('order-summary')
  }

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
        {screen === 'splash' && (
          <SplashScreen
            onFinish={() => navigate('welcome')}
          />
        )}

        {screen === 'welcome' && (
          <WelcomeScreen
            onStart={() => navigate('home')}
          />
        )}

        {screen === 'home' && (
          <HomeScreen
            onSearch={handleSearch}
            onGoToCart={() => navigate('order-summary')}
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
            cartItems={cartItems}
            recipeName={recipeName}
            onBack={goHome}
            onContinue={() => navigate('order-summary')}
            onSubstitute={(item) => {
              setPendingSubstitution(item)
              navigate('substitution')
            }}
            onRemove={handleRemoveItem}
          />
        )}

        {screen === 'substitution' && pendingSubstitution && (
          <SubstitutionScreen
            pendingItem={pendingSubstitution}
            onBack={goBack}
            onApply={handleApplySubstitution}
            onBackToCart={goHome}
          />
        )}

        {screen === 'order-summary' && (
          <OrderSummaryScreen
            cartItems={cartItems}
            onBack={goBack}
            onCheckout={() => navigate('payment')}
            onBackToStore={goHome}
          />
        )}

        {screen === 'payment' && (
          <PaymentScreen
            total={calcOrderTotal(cartItems)}
            onBack={goBack}
            onConfirm={goHome}
          />
        )}
      </div>
    </div>
  )
}
