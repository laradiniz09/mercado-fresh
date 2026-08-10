/**
 * 01_tela_welcome — Figma node 64:205
 * Full-screen green gradient with branding, cart illustration, and CTA.
 */
import Button from '../components/Button'

// ─── Assets Locais ────────────────────────────────────────────────────────────
// Ícones (SVG) na pasta assets/icons
import imgSignal      from '../assets/icons/signal.svg'
import imgWifi        from '../assets/icons/wifi.svg'
import imgBattery     from '../assets/icons/battery.svg'

// Imagem (PNG) na pasta assets/images
import imgCart        from '../assets/images/carrinho.png'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    // S1: landmark principal
    <main className="flex h-full flex-col items-center justify-between pb-12 bg-gradient-to-b from-fresh-light to-fresh-dark screen-enter">

      {/* S2: header semântico — Status Bar light theme */}
      <header className="flex h-11 w-full shrink-0 items-center justify-between px-6">
        {/* A5: hora visual silenciada — contexto dado pelo sr-only abaixo */}
        <span aria-hidden="true" className="font-heading text-status-bar text-content-inverse">9:41</span>
        {/* A6: contexto legível para leitores de tela */}
        <span className="sr-only">Horário atual: 9 horas e 41 minutos</span>
        <div className="flex items-center gap-1.5">
          {/* A1 + A2 + A3: ícones decorativos de sistema */}
          <img src={imgSignal}  alt="" aria-hidden="true" className="h-5 w-5 brightness-0 invert" />
          <img src={imgWifi}    alt="" aria-hidden="true" className="h-5 w-5 brightness-0 invert" />
          <img src={imgBattery} alt="" aria-hidden="true" className="h-5 w-6 brightness-0 invert" />
        </div>
      </header>

      {/* Center Content */}
      <div className="flex w-full flex-col items-center gap-6">

        {/* Cart Illustration */}
        <div className="w-25 h-24 overflow-hidden flex items-center justify-center">
          <img
            src={imgCart}
            alt="Ilustração de um carrinho de compras cheio de produtos frescos"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Store Name + Tagline */}
        <div className="flex flex-col items-center gap-2 px-6">
          <h1 className="font-script text-heading-xxl text-content-inverse text-shadow-soft">
            Mercado Fresh
          </h1>
          <p className="font-body text-body-lg text-content-inverse text-center text-shadow-soft">
            Comida fresquinha entregue na sua casa
          </p>
        </div>
      </div>

      {/* S3: footer semântico — CTA */}
      <footer className="w-full px-4">
        <Button
          variant="primary"
          onClick={onStart}
          className="bg-fresh shadow-none font-semibold text-body-lg"
        >
          Vamos começar
        </Button>
      </footer>
    </main>
  )
}
