/**
 * productImages.ts — Mapa de product IDs para URLs de imagem importadas via Vite.
 *
 * Centraliza todos os imports de imagem de produtos para que as telas não
 * precisem importar assets individualmente — basta chamar getProductImage(id).
 */

import imgLeiteCondensado      from './images/leite-condensado.png'
import imgLeiteCondensadoElige from './images/leite-condensado-elige.png'
import imgLeiteDesnatadoElige  from './images/leite-desnatado-elige.png'
import imgOvos                 from './images/ovos.png'
import imgAcucar               from './images/acucar.png'
import imgLeitePiraque         from './images/leite.png'
import imgLeiteCoco            from './images/leite-de-coco.png'
import imgCafe                 from './images/cafesuper.png'
import imgSuco                 from './images/sucomira.png'
import imgBombom               from './images/chocolate.png'
import imgSabonete             from './images/sabonete.png'
import imgVinagre              from './images/vinagre.png'
import imgTrigo                from './images/trigo.png'
import imgOleo                 from './images/oleo.png'
import imgSalRefinado          from './images/sal-refinado.png'
import imgFallback             from './images/carrinho.png'

/** Mapeamento de product.id → URL da imagem. */
export const PRODUCT_IMAGES: Record<string, string> = {
  // ── Versões tradicionais Eligê ──────────────────────────────────────────────
  'leite-desnatado-eliga':        imgLeiteDesnatadoElige,
  'leite-condensado-eliga':       imgLeiteCondensadoElige,
  // ── Versões zero lactose ────────────────────────────────────────────────────
  'leite-condensado-piracanjuba': imgLeiteCondensado,
  'leite-condensado-moca':        imgLeiteCondensado,
  'leite-piraque-zero-lactose':   imgLeitePiraque,
  'leite-de-coco-vegano':         imgLeiteCoco,
  // ── Mercearia ───────────────────────────────────────────────────────────────
  'farinha-de-trigo':             imgTrigo,
  'oleo-de-soja':                 imgOleo,
  'sal-refinado':                 imgSalRefinado,
  // ── Outros ──────────────────────────────────────────────────────────────────
  'ovos-jumbo':                   imgOvos,
  'acucar-demerara':              imgAcucar,
  'acucar-cristal':               imgAcucar,
  'cafe-super':                   imgCafe,
  'suco-mira':                    imgSuco,
  'bombom-bo':                    imgBombom,
  'sabonete-li':                  imgSabonete,
  'vinagre-ult':                  imgVinagre,
}

/**
 * Retorna a URL da imagem de um produto pelo ID.
 * Usa imgFallback (carrinho) quando o produto não tem imagem cadastrada.
 */
export function getProductImage(productId: string): string {
  return PRODUCT_IMAGES[productId] ?? imgFallback
}
