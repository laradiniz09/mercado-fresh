/**
 * 01_tela_welcome — Figma node 64:205
 * Full-screen green gradient with branding, cart illustration, and CTA.
 */
import Button from '../components/Button'

// ─── Assets Locais ────────────────────────────────────────────────────────────
// Ícones (SVG) na pasta assets/icons
import imgSignal       from '../assets/icons/signal.svg'
import imgWifi         from '../assets/icons/wifi.svg'
import imgBattery      from '../assets/icons/battery.svg'
import imgShoppingCart from '../assets/icons/shopping-cart.svg'

// Imagem (PNG) na pasta assets/images
import imgCart         from '../assets/images/carrinho.png'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-between pb-12 bg-gradient-to-b from-fresh-light to-fresh-dark screen-enter">
      
      {/* Status Bar — light theme (white text/icons) */}
      <div className="flex h-11 w-full shrink-0 items-center justify-between px-6">
        <span className="font-heading text-status-bar text-content-inverse">9:41</span>
        <div className="flex items-center gap-1.5">
          <img src={imgSignal}   alt="" className="h-5 w-5 brightness-0 invert" />
          <img src={imgWifi}     alt="" className="h-5 w-5 brightness-0 invert" />
          <img src={imgBattery}  alt="" className="h-5 w-6 brightness-0 invert" />
        </div>
      </div>

      {/* Center Content */}
      <div className="flex w-full flex-col items-center gap-6 px-0">
        {/* Store Name + Tagline */}
        <div className="flex flex-col items-center gap-2 px-6">
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-heading-xxl text-content-inverse text-shadow-soft">
              Mercado Fresh
            </h1>
            <img src={imgShoppingCart} alt="" className="h-8 w-8" />
          </div>
          <p className="font-body text-body-lg text-content-inverse text-center text-shadow-soft">
            Comida fresquinha entregue na sua casa
          </p>
        </div>

        {/* Cart Illustration */}
        <div className="relative w-full aspect-[390/352] overflow-hidden">
          <img
            src={imgCart}
            alt="Carrinho de compras"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full px-4">
        <Button
          variant="primary"
          onClick={onStart}
          className="bg-fresh shadow-none font-semibold text-body-lg"
        >
          Vamos começar
        </Button>
      </div>
    </div>
  )
}
