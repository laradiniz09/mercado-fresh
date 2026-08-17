/**
 * recipeService.ts — Lógica de negócio para montagem do carrinho
 *
 * Responsabilidades:
 *   1. Resolver ingredientes de uma receita aplicando restrição de lactose
 *      (resolveIngredientsForRecipe)
 *   2. Processar a lista resolvida, identificar itens esgotados e trazer
 *      seus substitutos (buildCartItems)
 *   3. Composição conveniente das duas etapas (getCartItemsForRecipe)
 *
 * Nenhuma tela é alterada por este arquivo.
 */

import {
  type Recipe,
  type RecipeIngredient,
  type Product,
  type Unit,
  getRecipeById,
  getProductById,
  getSubstitute,
} from '../database'

// ─── Tipos de saída ───────────────────────────────────────────────────────────

/**
 * Status de disponibilidade de um item no carrinho.
 *
 * - 'available'      → produto em estoque, pronto para compra
 * - 'out_of_stock'   → esgotado, mas há um substituto cadastrado
 * - 'no_substitute'  → esgotado sem nenhuma alternativa disponível
 */
export type CartItemStatus = 'available' | 'out_of_stock' | 'no_substitute'

/**
 * Ingrediente resolvido após aplicar o filtro de lactose.
 * Pode diferir do ingrediente original da receita se houve troca.
 */
export interface ResolvedIngredient {
  /** Linha original da receita (quantidade, unidade, notas) */
  ingredient: RecipeIngredient
  /** Produto que será efetivamente adicionado ao carrinho */
  product: Product
  /**
   * True quando o produto foi trocado automaticamente por uma versão
   * zero lactose em função da intolerância do usuário.
   */
  wasSwappedForLactose: boolean
  /**
   * Produto original da receita, presente apenas quando wasSwappedForLactose
   * é true — útil para exibir "substituído por" na UI.
   */
  originalProduct?: Product
}

/**
 * Item final do carrinho, pronto para alimentar IngredientsScreen
 * e SubstitutionScreen.
 */
export interface CartItem extends ResolvedIngredient {
  status: CartItemStatus
  /**
   * Produto substituto sugerido quando status === 'out_of_stock'.
   * Undefined nos demais casos.
   */
  substitute?: Product
}

// ─── Erros tipados ────────────────────────────────────────────────────────────

export class RecipeNotFoundError extends Error {
  constructor(recipeId: string) {
    super(`Receita não encontrada: "${recipeId}"`)
    this.name = 'RecipeNotFoundError'
  }
}

// ─── Funções internas (não exportadas) ───────────────────────────────────────

/**
 * Dado um produto com is_lactose_free: false e um usuário intolerante,
 * tenta encontrar uma alternativa lactose-free via substitute_id.
 *
 * Retorna o substituto apenas se ele existir E for is_lactose_free: true.
 * Retorna undefined caso contrário.
 */
function findLactoseFreeAlternative(product: Product): Product | undefined {
  if (!product.substitute_id) return undefined
  const candidate = getProductById(product.substitute_id)
  if (!candidate) return undefined
  return candidate.is_lactose_free ? candidate : undefined
}

/**
 * Determina o status de estoque de um produto e resolve seu substituto
 * quando aplicável.
 */
function resolveStockStatus(product: Product): {
  status: CartItemStatus
  substitute: Product | undefined
} {
  if (product.in_stock) {
    return { status: 'available', substitute: undefined }
  }

  const substitute = getSubstitute(product)
  if (substitute) {
    return { status: 'out_of_stock', substitute }
  }

  return { status: 'no_substitute', substitute: undefined }
}

// ─── Função 1 ─────────────────────────────────────────────────────────────────

/**
 * Busca os ingredientes de uma receita e aplica a restrição de lactose.
 *
 * Se `isLactoseIntolerant` for true, produtos com is_lactose_free: false
 * são automaticamente trocados pela versão lactose-free cadastrada em
 * substitute_id — quando disponível.
 *
 * Ingredientes cujo product_id não exista no catálogo são ignorados
 * (aviso emitido no console).
 *
 * @throws {RecipeNotFoundError} se o recipeId não for encontrado
 */
export function resolveIngredientsForRecipe(
  recipeId: string,
  isLactoseIntolerant: boolean,
): ResolvedIngredient[] {
  const recipe: Recipe | undefined = getRecipeById(recipeId)

  if (!recipe) {
    throw new RecipeNotFoundError(recipeId)
  }

  const resolved: ResolvedIngredient[] = []

  for (const ingredient of recipe.ingredients) {
    const product = getProductById(ingredient.product_id)

    if (!product) {
      console.warn(
        `[recipeService] Produto "${ingredient.product_id}" não encontrado no catálogo — ingrediente ignorado.`,
      )
      continue
    }

    // Produto já é lactose-free ou usuário não tem restrição: passa direto
    if (!isLactoseIntolerant || product.is_lactose_free) {
      resolved.push({ ingredient, product, wasSwappedForLactose: false })
      continue
    }

    // Usuário intolerante e produto tem lactose: busca alternativa
    const alternative = findLactoseFreeAlternative(product)

    if (alternative) {
      resolved.push({
        ingredient,
        product: alternative,
        wasSwappedForLactose: true,
        originalProduct: product,
      })
    } else {
      // Sem alternativa lactose-free: mantém o original e não bloqueia o fluxo.
      // A UI pode usar wasSwappedForLactose: false + product.is_lactose_free: false
      // para exibir um aviso ao usuário.
      console.warn(
        `[recipeService] Nenhuma alternativa lactose-free para "${product.name}" — mantendo produto original.`,
      )
      resolved.push({ ingredient, product, wasSwappedForLactose: false })
    }
  }

  return resolved
}

// ─── Função 2 ─────────────────────────────────────────────────────────────────

/**
 * Processa a lista de ingredientes já resolvidos (saída da Função 1),
 * identifica quais produtos estão esgotados e resolve seus substitutos.
 *
 * Cada item retornado carrega:
 *   - status: 'available' | 'out_of_stock' | 'no_substitute'
 *   - substitute: produto substituto (somente quando status === 'out_of_stock')
 */
export function buildCartItems(resolved: ResolvedIngredient[]): CartItem[] {
  return resolved.map((resolvedIngredient) => {
    const { status, substitute } = resolveStockStatus(resolvedIngredient.product)

    return {
      ...resolvedIngredient,
      status,
      substitute,
    }
  })
}

// ─── Composição principal ─────────────────────────────────────────────────────

/**
 * Ponto de entrada único para montar o carrinho de uma receita.
 *
 * Encapsula resolveIngredientsForRecipe + buildCartItems em uma chamada só.
 * É esta função que as telas devem consumir.
 *
 * @example
 * const items = getCartItemsForRecipe('pudim-leite-condensado', true)
 * const unavailable = items.filter(i => i.status !== 'available')
 *
 * @throws {RecipeNotFoundError} se o recipeId não for encontrado
 */
export function getCartItemsForRecipe(
  recipeId: string,
  isLactoseIntolerant: boolean,
): CartItem[] {
  const resolved = resolveIngredientsForRecipe(recipeId, isLactoseIntolerant)
  return buildCartItems(resolved)
}

// ─── Helpers de consulta sobre CartItem[] ────────────────────────────────────

/** Itens disponíveis — prontos para o carrinho sem intervenção */
export function getAvailableItems(items: CartItem[]): CartItem[] {
  return items.filter((i) => i.status === 'available')
}

/** Itens esgotados que possuem substituto sugerido */
export function getOutOfStockItems(items: CartItem[]): CartItem[] {
  return items.filter((i) => i.status === 'out_of_stock')
}

/** Itens esgotados sem nenhuma alternativa cadastrada */
export function getItemsWithoutSubstitute(items: CartItem[]): CartItem[] {
  return items.filter((i) => i.status === 'no_substitute')
}

// ─── Query parsing ────────────────────────────────────────────────────────────

const LACTOSE_KEYWORDS = [
  'lactose',
  'intolerante',
  'intolerância',
  'sem lactose',
  'zero lactose',
]

/**
 * Analisa o texto digitado pelo usuário e detecta se ele declarou
 * intolerância à lactose — via palavras-chave em qualquer posição.
 */
export function detectLactoseIntolerance(query: string): boolean {
  const lower = query.toLowerCase()
  return LACTOSE_KEYWORDS.some((kw) => lower.includes(kw))
}

const RECIPE_KEYWORD_MAP: Array<{ keywords: string[]; recipeId: string }> = [
  { keywords: ['pudim', 'pudim de leite'], recipeId: 'pudim-leite-condensado' },
  { keywords: ['bolo', 'fubá', 'bolo de fubá'], recipeId: 'bolo-simples' },
  { keywords: ['mousse', 'mousse de chocolate'], recipeId: 'mousse-chocolate' },
]

const DEFAULT_RECIPE_ID = 'pudim-leite-condensado'

/**
 * Detecta qual receita o usuário quer preparar a partir do texto livre.
 * Retorna o ID da receita correspondente ou o ID padrão (pudim) se
 * nenhuma palavra-chave for encontrada.
 */
export function detectRecipeFromQuery(query: string): string {
  const lower = query.toLowerCase()
  for (const { keywords, recipeId } of RECIPE_KEYWORD_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) return recipeId
  }
  return DEFAULT_RECIPE_ID
}

// ─── Formatters ───────────────────────────────────────────────────────────────

/** Formata um valor numérico em BRL (ex: 7.80 → "R$ 7,80") */
export function formatPrice(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

/**
 * Formata a quantidade de uma receita para exibição na lista de ingredientes.
 * Mostra a medida culinária, não a embalagem (ex: "3 unidades", "200g").
 */
export function formatQuantity(quantity: number, unit: Unit): string {
  const plural: Partial<Record<Unit, string>> = {
    unidade: 'unidades',
    lata:    'latas',
    dúzia:   'dúzias',
    pacote:  'pacotes',
    caixa:   'caixas',
  }
  const unitLabel = quantity === 1 ? unit : (plural[unit] ?? unit)
  const noSpace: Partial<Record<Unit, true>> = { g: true, ml: true, kg: true, l: true }
  return noSpace[unit] ? `${quantity}${unitLabel}` : `${quantity} ${unitLabel}`
}

// ─── Cálculo de embalagens ────────────────────────────────────────────────────

/**
 * Calcula quantas embalagens fechadas precisam ser compradas para atender
 * a quantidade pedida pela receita.
 *
 * Fórmula: ceil(recipe_qty / package_size)
 *
 * Requer que `recipeUnit === product.commercial_unit.package_unit`.
 * Em caso de divergência de unidade, retorna 1 (compra ao menos 1 embalagem)
 * e emite aviso no console.
 *
 * Exemplos:
 *   - 200g açúcar, pacote 1000g → ceil(200/1000) = 1 pacote
 *   - 3 ovos, bandeja 12 un    → ceil(3/12)    = 1 bandeja
 *   - 3 barras, barra 1 un     → ceil(3/1)     = 3 barras
 */
export function calcPackagesNeeded(
  recipeQty: number,
  recipeUnit: Unit,
  product: Product,
): number {
  const { package_size, package_unit } = product.commercial_unit
  if (recipeUnit !== package_unit) {
    console.warn(
      `[recipeService] Divergência de unidade para "${product.id}": ` +
      `receita usa '${recipeUnit}', embalagem usa '${package_unit}'. ` +
      `Assumindo 1 embalagem.`,
    )
    return 1
  }
  return Math.ceil(recipeQty / package_size)
}

// ─── Formatação de compra ─────────────────────────────────────────────────────

/** Pluraliza nomes de embalagem em português */
function pluralizePackage(name: string): string {
  const PLURAL: Record<string, string> = {
    bandeja:   'bandejas',
    lata:      'latas',
    pacote:    'pacotes',
    caixa:     'caixas',
    garrafa:   'garrafas',
    pote:      'potes',
    frasco:    'frascos',
    barra:     'barras',
    caixinha:  'caixinhas',
    unidade:   'unidades',
    kg:        'kg',
  }
  return PLURAL[name] ?? `${name}s`
}

/** Formata medida total da embalagem (ex: 1000g → "1 kg", 12 unidades → "12 unidades") */
function formatPackageSize(totalSize: number, unit: Unit): string {
  if (unit === 'g' && totalSize >= 1000) {
    const kg = totalSize / 1000
    const kgStr = Number.isInteger(kg) ? `${kg}` : kg.toFixed(1).replace('.', ',')
    return `${kgStr} kg`
  }
  const noSpace: Partial<Record<Unit, true>> = { g: true, ml: true, kg: true, l: true }
  if (noSpace[unit]) return `${totalSize}${unit}`
  const plural: Partial<Record<Unit, string>> = {
    unidade: 'unidades', lata: 'latas', caixa: 'caixas', pacote: 'pacotes',
  }
  return `${totalSize} ${totalSize === 1 ? unit : (plural[unit] ?? unit)}`
}

/**
 * Formata a quantidade de compra para exibição no resumo do pedido.
 * Mostra embalagens, não medidas culinárias.
 *
 * Exemplos:
 *   - 1 bandeja de ovos  → "1 bandeja (12 unidades)"
 *   - 1 pacote de açúcar → "1 pacote (1 kg)"
 *   - 3 barras chocolate → "3 barras (3 unidades)"
 *   - 1 lata creme coco  → "1 lata (200ml)"
 */
export function formatPurchaseDisplay(packages: number, product: Product): string {
  const cu = product.commercial_unit
  const pkgLabel = packages === 1 ? cu.sold_as : pluralizePackage(cu.sold_as)
  const totalSize = packages * cu.package_size
  const sizeStr = formatPackageSize(totalSize, cu.package_unit)
  return `${packages} ${pkgLabel} (${sizeStr})`
}

// ─── Cálculo de preços ────────────────────────────────────────────────────────

/**
 * Calcula o preço de linha de um único item do carrinho:
 *   preço_embalagem × número_de_embalagens_necessárias
 *
 * - Itens out_of_stock usam o preço do substituto.
 * - Itens no_substitute retornam 0.
 */
export function calcItemPrice(item: CartItem): number {
  if (item.status === 'no_substitute') return 0

  const product =
    item.status === 'out_of_stock' && item.substitute
      ? item.substitute
      : item.product

  const packages = calcPackagesNeeded(
    item.ingredient.quantity,
    item.ingredient.unit,
    product,
  )
  return product.price * packages
}

/**
 * Calcula o subtotal do carrinho.
 * Itens sem substituto não são contabilizados.
 */
export function calcCartTotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + calcItemPrice(item), 0)
}

/** Taxa de serviço fixa aplicada a todos os pedidos (fonte única de verdade) */
export const SERVICE_FEE = 2.00

/**
 * Retorna o total final do pedido: subtotal + taxa de serviço.
 * Use esta função no App.tsx para garantir que OrderSummaryScreen
 * e PaymentScreen exibam sempre o mesmo valor.
 */
export function calcOrderTotal(items: CartItem[]): number {
  return calcCartTotal(items) + SERVICE_FEE
}

// ─── Variantes com quantidades explícitas (user-overridden) ───────────────────

/**
 * Calcula o preço de linha de um item usando uma quantidade de embalagens
 * explicitamente fornecida — respeitando o ajuste feito pelo usuário na tela
 * de ingredientes, em vez de recalcular a partir da receita.
 */
export function calcItemPriceWithQty(item: CartItem, qty: number): number {
  if (item.status === 'no_substitute') return 0
  const product =
    item.status === 'out_of_stock' && item.substitute
      ? item.substitute
      : item.product
  return product.price * qty
}

/**
 * Calcula o subtotal do carrinho usando o mapa de quantidades ajustadas
 * pelo usuário. Itens sem chave no mapa recaem para calcPackagesNeeded.
 */
export function calcCartTotalWithQty(
  items: CartItem[],
  quantities: Record<string, number>,
): number {
  return items.reduce((acc, item) => {
    const qty =
      quantities[item.product.id] ??
      calcPackagesNeeded(item.ingredient.quantity, item.ingredient.unit, item.product)
    return acc + calcItemPriceWithQty(item, qty)
  }, 0)
}

/**
 * Retorna o total final do pedido respeitando as quantidades ajustadas:
 * subtotal (com qty do usuário) + taxa de serviço.
 */
export function calcOrderTotalWithQty(
  items: CartItem[],
  quantities: Record<string, number>,
): number {
  return calcCartTotalWithQty(items, quantities) + SERVICE_FEE
}
