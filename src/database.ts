/**
 * database.ts — Fonte de verdade tipada do Mercado IA
 *
 * Estrutura:
 *   1. Tipos base (CommercialUnit, Product, Recipe, RecipeIngredient)
 *   2. Catálogo de produtos reais (com unidade de comercialização mínima)
 *   3. Receitas com quantidades de culinária (ex: 200g, 3 ovos)
 *   4. Helpers de acesso tipado
 */

// ─── 1. Tipos ────────────────────────────────────────────────────────────────

export type ProductCategory =
  | 'hortfrutas'
  | 'frios'
  | 'mercearia'
  | 'carnes'
  | 'condimentos'
  | 'padaria'
  | 'limpeza'
  | 'guloseimas'
  | 'massas'
  | 'bebidas'

export type Unit =
  | 'unidade'
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'dúzia'
  | 'pacote'
  | 'lata'
  | 'caixa'

/**
 * Descreve como um produto é vendido no supermercado.
 * O `package_unit` DEVE coincidir com a `unit` do RecipeIngredient
 * que usa este produto, para que `calcPackagesNeeded` funcione corretamente.
 */
export interface CommercialUnit {
  /** Nome da embalagem (singular) — ex: 'bandeja', 'pacote', 'lata' */
  sold_as: string
  /**
   * Quantidade de recipe-units por embalagem.
   * Ex: pacote de açúcar 1kg → package_size: 1000, package_unit: 'g'
   * Ex: bandeja de ovos 12 un → package_size: 12, package_unit: 'unidade'
   */
  package_size: number
  /**
   * Unidade em que package_size é medido.
   * Deve corresponder à `unit` do RecipeIngredient para este produto.
   */
  package_unit: Unit
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  /** Preço por embalagem em reais (BRL) */
  price: number
  in_stock: boolean
  is_lactose_free: boolean
  /**
   * ID de um produto substituto sugerido quando este está esgotado.
   * Null quando não há substituto ou o item está em estoque.
   */
  substitute_id: string | null
  /** Unidade mínima de comercialização (embalagem fechada do supermercado) */
  commercial_unit: CommercialUnit
}

export interface RecipeIngredient {
  /** Referência ao Product.id no catálogo */
  product_id: string
  /**
   * Quantidade na medida da culinária (ex: 200 para 200g de açúcar,
   * 3 para 3 ovos). O serviço converte para embalagens usando commercial_unit.
   */
  quantity: number
  unit: Unit
  /** Observações opcionais (ex: "em temperatura ambiente") */
  notes?: string
}

export interface Recipe {
  id: string
  name: string
  description: string
  /** Número de porções que a receita rende */
  servings: number
  ingredients: RecipeIngredient[]
}

// ─── 2. Catálogo de Produtos ─────────────────────────────────────────────────

export const PRODUCTS: Product[] = [

  // ── Mercearia ───────────────────────────────────────────────────────────────
  {
    id: 'leite-condensado-piracanjuba',
    name: 'Leite Condensado Piracanjuba Zero Lactose 395g',
    category: 'mercearia',
    price: 7.80,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'lata', package_size: 1, package_unit: 'lata' },
  },
  {
    id: 'leite-condensado-moca',
    name: 'Leite Condensado Moça 395g',
    category: 'mercearia',
    price: 6.90,
    in_stock: true,
    is_lactose_free: false,
    substitute_id: null,
    commercial_unit: { sold_as: 'lata', package_size: 1, package_unit: 'lata' },
  },
  {
    id: 'acucar-demerara',
    name: 'Açúcar Demerara Mel 1kg',
    category: 'mercearia',
    price: 7.50,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    // Receita pede 200g → ceil(200 / 1000) = 1 pacote
    commercial_unit: { sold_as: 'pacote', package_size: 1000, package_unit: 'g' },
  },
  {
    id: 'acucar-cristal',
    name: 'Açúcar Cristal União 1kg',
    category: 'mercearia',
    price: 5.90,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'pacote', package_size: 1000, package_unit: 'g' },
  },
  {
    id: 'farinha-de-trigo',
    name: 'Farinha de Trigo Anaconda 1kg',
    category: 'mercearia',
    price: 4.50,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'pacote', package_size: 1000, package_unit: 'g' },
  },
  {
    id: 'oleo-de-soja',
    name: 'Óleo de Soja Liza 900ml',
    category: 'mercearia',
    price: 8.90,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    // Receita pede 120ml → ceil(120 / 900) = 1 garrafa
    commercial_unit: { sold_as: 'garrafa', package_size: 900, package_unit: 'ml' },
  },
  {
    id: 'sal-refinado',
    name: 'Sal Refinado Cisne 1kg',
    category: 'mercearia',
    price: 3.20,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'pacote', package_size: 1000, package_unit: 'g' },
  },
  {
    id: 'vinagre-ult',
    name: 'Vinagre de Álcool Ult 750ml',
    category: 'condimentos',
    price: 15.00,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'garrafa', package_size: 750, package_unit: 'ml' },
  },

  // ── Frios / Laticínios ──────────────────────────────────────────────────────

  // Versões tradicionais (com lactose) — produto base das receitas.
  // substitute_id aponta para a versão zero lactose usada quando
  // isLactoseIntolerant = true.
  {
    id: 'leite-desnatado-eliga',
    name: 'Leite Desnatado Eligê 1l',
    category: 'frios',
    price: 4.90,
    in_stock: true,
    is_lactose_free: false,
    substitute_id: 'leite-piraque-zero-lactose',
    commercial_unit: { sold_as: 'caixa', package_size: 1, package_unit: 'l' },
  },
  {
    id: 'leite-condensado-eliga',
    name: 'Leite Condensado Eligê 395g',
    category: 'mercearia',
    price: 5.80,
    in_stock: true,
    is_lactose_free: false,
    substitute_id: 'leite-condensado-piracanjuba',
    commercial_unit: { sold_as: 'lata', package_size: 1, package_unit: 'lata' },
  },

  {
    id: 'leite-piraque-zero-lactose',
    name: 'Leite Piraquê Zero Lactose 1l',
    category: 'frios',
    price: 7.80,
    in_stock: false,
    is_lactose_free: true,
    substitute_id: 'leite-de-coco-vegano',
    commercial_unit: { sold_as: 'caixa', package_size: 1, package_unit: 'l' },
  },
  {
    id: 'leite-de-coco-vegano',
    name: 'Leite de Coco (Vegano) 1l',
    category: 'frios',
    price: 18.00,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'caixa', package_size: 1, package_unit: 'l' },
  },
  {
    id: 'manteiga-aviacao',
    name: 'Manteiga Aviação com Sal 200g',
    category: 'frios',
    price: 9.90,
    in_stock: true,
    is_lactose_free: false,
    substitute_id: 'margarina-qualy',
    commercial_unit: { sold_as: 'pote', package_size: 200, package_unit: 'g' },
  },
  {
    id: 'margarina-qualy',
    name: 'Margarina Qualy Vegetal 500g',
    category: 'frios',
    price: 7.20,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'pote', package_size: 500, package_unit: 'g' },
  },
  {
    id: 'creme-de-leite-nestlé',
    name: 'Creme de Leite Nestlé 200g',
    category: 'frios',
    price: 5.80,
    in_stock: true,
    is_lactose_free: false,
    substitute_id: 'creme-de-coco',
    // Receita usa ml; density ≈ 1 g/ml → 200g ≈ 200ml
    commercial_unit: { sold_as: 'caixinha', package_size: 200, package_unit: 'ml' },
  },
  {
    id: 'creme-de-coco',
    name: 'Creme de Coco Predilecta 200ml',
    category: 'frios',
    price: 6.40,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    // Receita mousse pede 200ml → ceil(200 / 200) = 1 lata
    commercial_unit: { sold_as: 'lata', package_size: 200, package_unit: 'ml' },
  },

  // ── Hortfrutas / Ovos ───────────────────────────────────────────────────────
  {
    id: 'ovos-jumbo',
    name: 'Ovos Brancos Jumbo',
    category: 'hortfrutas',
    price: 12.90,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    // Receita pede 3 unidades → ceil(3 / 12) = 1 bandeja (12 ovos)
    commercial_unit: { sold_as: 'bandeja', package_size: 12, package_unit: 'unidade' },
  },
  {
    id: 'banana-nanica',
    name: 'Banana Nanica (kg)',
    category: 'hortfrutas',
    price: 4.50,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'kg', package_size: 1, package_unit: 'kg' },
  },
  {
    id: 'limao-tahiti',
    name: 'Limão Tahiti (kg)',
    category: 'hortfrutas',
    price: 6.90,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'kg', package_size: 1, package_unit: 'kg' },
  },

  // ── Bebidas ─────────────────────────────────────────────────────────────────
  {
    id: 'cafe-super',
    name: 'Café Super Torrado e Moído 500g',
    category: 'bebidas',
    price: 28.00,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'pacote', package_size: 500, package_unit: 'g' },
  },
  {
    id: 'suco-mira',
    name: 'Suco Mira Caju 1l',
    category: 'bebidas',
    price: 16.00,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'garrafa', package_size: 1, package_unit: 'l' },
  },
  {
    id: 'agua-mineral',
    name: 'Água Mineral Crystal 500ml',
    category: 'bebidas',
    price: 2.50,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'garrafa', package_size: 500, package_unit: 'ml' },
  },

  // ── Guloseimas ──────────────────────────────────────────────────────────────
  {
    id: 'bombom-bo',
    name: 'Bombom Boavista Sortido 250g',
    category: 'guloseimas',
    price: 18.00,
    in_stock: true,
    is_lactose_free: false,
    substitute_id: null,
    commercial_unit: { sold_as: 'caixa', package_size: 250, package_unit: 'g' },
  },
  {
    id: 'barra-chocolate-70',
    name: 'Barra de Chocolate 70% Cacau 80g',
    category: 'guloseimas',
    price: 9.90,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    // Receita pede 3 unidades → ceil(3 / 1) = 3 barras
    commercial_unit: { sold_as: 'barra', package_size: 1, package_unit: 'unidade' },
  },

  // ── Limpeza / Higiene ───────────────────────────────────────────────────────
  {
    id: 'sabonete-li',
    name: 'Sabonete Líquido Li Lavanda 250ml',
    category: 'limpeza',
    price: 12.00,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'frasco', package_size: 250, package_unit: 'ml' },
  },
  {
    id: 'detergente-ype',
    name: 'Detergente Ypê Neutro 500ml',
    category: 'limpeza',
    price: 3.80,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'frasco', package_size: 500, package_unit: 'ml' },
  },

  // ── Massas ──────────────────────────────────────────────────────────────────
  {
    id: 'macarrao-espaguete',
    name: 'Macarrão Espaguete Renata 500g',
    category: 'massas',
    price: 5.20,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'pacote', package_size: 500, package_unit: 'g' },
  },
  {
    id: 'macarrao-integral',
    name: 'Macarrão Integral Galo 500g',
    category: 'massas',
    price: 6.50,
    in_stock: true,
    is_lactose_free: true,
    substitute_id: null,
    commercial_unit: { sold_as: 'pacote', package_size: 500, package_unit: 'g' },
  },
]

// ─── 3. Receitas ─────────────────────────────────────────────────────────────
// Quantidades em medidas culinárias. O recipeService converte para embalagens.

export const RECIPES: Recipe[] = [
  {
    id: 'pudim-leite-condensado',
    name: 'Pudim de Leite Condensado',
    description:
      'Clássico pudim cremoso com calda de caramelo, feito com leite condensado e ovos.',
    servings: 8,
    ingredients: [
      {
        product_id: 'leite-condensado-eliga',
        quantity: 1,
        unit: 'lata',
        notes: 'Versão tradicional; intolerantes recebem leite condensado zero lactose',
        // isLactoseIntolerant=false → Eligê (R$ 5,80)
        // isLactoseIntolerant=true  → Piracanjuba zero lactose (R$ 7,80)
      },
      {
        product_id: 'leite-desnatado-eliga',
        quantity: 1,
        unit: 'l',
        notes: 'Versão tradicional; intolerantes recebem leite zero lactose',
        // isLactoseIntolerant=false → Eligê desnatado (R$ 4,90)
        // isLactoseIntolerant=true  → Piraquê zero lactose → se esgotado: leite de coco
      },
      {
        product_id: 'ovos-jumbo',
        quantity: 3,
        unit: 'unidade',
        notes: 'Em temperatura ambiente',
        // → ceil(3 / 12) = 1 bandeja
      },
      {
        product_id: 'acucar-demerara',
        quantity: 200,
        unit: 'g',
        notes: 'Para a calda de caramelo',
        // → ceil(200 / 1000) = 1 pacote
      },
    ],
  },
  {
    id: 'bolo-simples',
    name: 'Bolo Simples de Fubá',
    description: 'Bolo fofinho de fubá, receita tradicional brasileira.',
    servings: 12,
    ingredients: [
      {
        product_id: 'farinha-de-trigo',
        quantity: 250,
        unit: 'g',
        // → ceil(250 / 1000) = 1 pacote
      },
      {
        product_id: 'acucar-cristal',
        quantity: 200,
        unit: 'g',
        // → ceil(200 / 1000) = 1 pacote
      },
      {
        product_id: 'ovos-jumbo',
        quantity: 3,
        unit: 'unidade',
        // → ceil(3 / 12) = 1 bandeja
      },
      {
        product_id: 'oleo-de-soja',
        quantity: 120,
        unit: 'ml',
        // → ceil(120 / 900) = 1 garrafa
      },
      {
        product_id: 'leite-desnatado-eliga',
        quantity: 240,
        unit: 'ml',
        // unit mismatch (recipe 'ml', package 'l') → fallback 1 caixa
        // isLactoseIntolerant=true → troca para leite zero lactose
      },
      {
        product_id: 'sal-refinado',
        quantity: 1,
        unit: 'g',
        notes: 'Uma pitada',
        // → ceil(1 / 1000) = 1 pacote
      },
    ],
  },
  {
    id: 'mousse-chocolate',
    name: 'Mousse de Chocolate Vegano',
    description: 'Mousse aerada feita com chocolate 70% cacau e creme de coco — sem lactose.',
    servings: 6,
    ingredients: [
      {
        product_id: 'barra-chocolate-70',
        quantity: 3,
        unit: 'unidade',
        notes: 'Derretido em banho-maria',
        // → ceil(3 / 1) = 3 barras
      },
      {
        product_id: 'creme-de-coco',
        quantity: 200,
        unit: 'ml',
        notes: 'Gelado por pelo menos 4 horas antes de usar',
        // → ceil(200 / 200) = 1 lata
      },
      {
        product_id: 'acucar-demerara',
        quantity: 50,
        unit: 'g',
        // → ceil(50 / 1000) = 1 pacote
      },
    ],
  },
]

// ─── 4. Helpers de acesso tipado ─────────────────────────────────────────────

/** Retorna um produto pelo ID, ou undefined se não encontrado */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

/** Retorna o produto substituto de um item esgotado, ou undefined */
export function getSubstitute(product: Product): Product | undefined {
  if (!product.substitute_id) return undefined
  return getProductById(product.substitute_id)
}

/** Retorna todos os produtos de uma categoria */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

/** Retorna os produtos de uma receita com os dados completos do catálogo */
export function getRecipeProducts(
  recipe: Recipe,
): Array<{ ingredient: RecipeIngredient; product: Product | undefined }> {
  return recipe.ingredients.map((ingredient) => ({
    ingredient,
    product: getProductById(ingredient.product_id),
  }))
}

/** Retorna quais ingredientes de uma receita estão fora de estoque */
export function getUnavailableIngredients(recipe: Recipe): RecipeIngredient[] {
  return recipe.ingredients.filter((ing) => {
    const product = getProductById(ing.product_id)
    return product !== undefined && !product.in_stock
  })
}

/** Retorna uma receita pelo ID, ou undefined se não encontrada */
export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id)
}
