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
    // Mantém na Splash Screen por 2 segundos e depois chama a função para avançar
    const timer = setTimeout(() => {
      onFinish()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    // Adicionado aria-live="polite" para informar leitores de tela sobre o carregamento inicial
    <main 
      role="region" 
      aria-label="Carregando aplicativo Mercado Fresh" 
      className="flex h-full flex-col items-center justify-between pb-12 bg-gradient-to-b from-fresh-light to-fresh-dark screen-enter"
    >
      {/* Header com Status Bar */}
      <header className="flex h-11 w-full shrink-0 items-center justify-between px-6">
        <span aria-hidden="true" className="font-heading text-status-bar text-content-inverse">9:41</span>
        <span className="sr-only">Horário atual: 9 horas e 41 minutos</span>
        <div className="flex items-center gap-1.5">
          <img src={imgSignal} alt="" aria-hidden="true" className="h-5 w-5 brightness-0 invert" />
          <img src={imgWifi} alt="" aria-hidden="true" className="h-5 w-5 brightness-0 invert" />
          <img src={imgBattery} alt="" aria-hidden="true" className="h-5 w-6 brightness-0 invert" />
        </div>
      </header>

      {/* Conteúdo Centralizado */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-25 h-24 overflow-hidden flex items-center justify-center">
          <img
            src={imgCart}
            alt="Ilustração de um carrinho de compras com produtos frescos, representando o logotipo do Mercado Fresh"
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="font-script text-heading-xxl text-content-inverse text-shadow-soft">
          Mercado Fresh
        </h1>
      </div>

      {/* Espaçador decorativo */}
      <div className="h-10" aria-hidden="true" />
    </main>
  )
}