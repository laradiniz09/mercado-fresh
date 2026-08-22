import { useEffect } from 'react'
import imgSignal from '../assets/icons/signal.svg'
import imgWifi from '../assets/icons/wifi.svg'
import imgBattery from '../assets/icons/battery.svg'
import imgCart from '../assets/images/carrinho.png'

interface SplashScreenProps {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <main
      role="region"
      aria-label="Carregando aplicativo Mercado Fresh"
      className="relative flex h-full flex-col justify-between overflow-hidden bg-gradient-to-b from-fresh-light to-fresh-dark screen-enter"
    >
      {/* Header com Status Bar */}
      <header className="flex h-11 w-full shrink-0 items-center justify-between px-6 z-10">
        <span aria-hidden="true" className="font-heading text-status-bar text-content-inverse">9:41</span>
        <span className="sr-only">Horário atual: 9 horas e 41 minutos</span>
        <div className="flex items-center gap-1.5">
          <img src={imgSignal} alt="" aria-hidden="true" className="h-5 w-5 brightness-0 invert" />
          <img src={imgWifi} alt="" aria-hidden="true" className="h-5 w-5 brightness-0 invert" />
          <img src={imgBattery} alt="" aria-hidden="true" className="h-5 w-6 brightness-0 invert" />
        </div>
      </header>

      {/* Espaço intermediário livre (vazio para permitir que o fundo degrade respire) */}
      <div className="flex-1" />

      {/* Bloco único na base: Título + Imagem colados e com gap de 16px (gap-4) */}
      <div className="flex flex-col items-center w-full z-10">
        <div className="flex flex-col items-center gap-4 w-full">
          <h1 className="font-script text-heading-xxl text-content-inverse text-shadow-soft text-center">
            Mercado Fresh
          </h1>
          <img
            src={imgCart}
            alt="Ilustração de mulher segurando uma cesta de frutas e legumes frescos"
            className="w-full object-contain"
          />
        </div>
      </div>
    </main>
  )
}
