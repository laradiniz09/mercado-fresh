/**
 * 03_tela_carregamento_mercado
 * Full-screen loading state com imagem central e dots indicadores.
 */
import { useEffect, useState } from 'react'
import StatusBar from '../components/StatusBar'

// Asset local da imagem principal
import imgLoadingFood from '../assets/images/loading-image.png'

const MESSAGES = [
  'Verificando itens no estoque',
  'Montando sua lista de ingredientes',
  'Calculando a melhor rota',
  'Quase pronto…',
]

interface LoadingScreenProps {
  query?: string
  onComplete: () => void
}

export default function LoadingScreen({ query = '', onComplete }: LoadingScreenProps) {
  const [msgIndex, setMsgIndex] = useState(0)

  // Ciclo das mensagens a cada 1.4s
  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((i) => {
        if (i < MESSAGES.length - 1) return i + 1
        clearInterval(timer)
        setTimeout(onComplete, 800)
        return i
      })
    }, 1400)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="flex h-full flex-col items-center bg-surface screen-enter">
      <StatusBar theme="dark" />

      {/* Conteúdo Central */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 w-full">
        
        {/* Nome da Marca */}
        <span className="font-heading text-heading-xl font-bold text-surface-brand">
          Mercado Fresh
        </span>

        {/* Imagem principal (Centralizada) */}
        <div className="flex items-center justify-center h-[140px] w-[140px]">
          <img
            src={imgLoadingFood}
            alt={query || 'Carregando'}
            className="h-[100px] w-[100px] object-contain"
          />
        </div>

        {/* Mensagem + Dots */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-body text-base font-bold text-content-brand text-center">
            {MESSAGES[msgIndex]}
          </p>
          
          {/* Dots fixos conforme especificação */}
          <div className="flex items-center gap-[6px]">
            {/* Dot 1: Full opacity */}
            <div className="h-[6px] w-[6px] rounded-full bg-[#1F5D3B]" />
            
            {/* Dot 2: Opacity 0.4 */}
            <div className="h-[6px] w-[6px] rounded-full bg-[#1F5D3B] opacity-40" />
            
            {/* Dot 3: Opacity 0.4 */}
            <div className="h-[6px] w-[6px] rounded-full bg-[#1F5D3B] opacity-40" />
          </div>
        </div>
      </div>

      {/* Indicador de home do iOS */}
      <div className="flex h-[34px] items-center justify-center w-full shrink-0">
        <div className="h-[5px] w-[134px] rounded-full bg-neutral-150" />
      </div>
    </div>
  )
}
