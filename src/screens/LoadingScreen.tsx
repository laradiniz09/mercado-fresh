/**
 * 03_tela_carregamento_mercado
 * Full-screen loading minimalista estilo iFood (apenas dots por ~2 segundos)
 */
import { useEffect } from 'react'
import StatusBar from '../components/StatusBar'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    // Duração exata e rápida (ex: 2 segundos)
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <main aria-label="Carregando, aguarde" className="flex h-full flex-col items-center bg-surface screen-enter">
      <StatusBar theme="dark" />

      {/* Conteúdo Central: Apenas os dots com animação rítmica */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div 
          role="status" 
          aria-live="polite"
          aria-label="Carregando"
          className="flex items-center gap-2"
        >
          <div className="h-2 w-2 rounded-full bg-surface-brand animate-bounce [animation-delay:-0.3s]" />
          <div className="h-2 w-2 rounded-full bg-surface-brand animate-bounce [animation-delay:-0.15s]" />
          <div className="h-2 w-2 rounded-full bg-surface-brand animate-bounce" />
        </div>
      </div>

      {/* Indicador de home do iOS */}
      <div className="flex h-8.5 items-center justify-center w-full shrink-0">
        <div className="h-[5px] w-[134px] rounded-full bg-neutral-150" />
      </div>
    </main>
  )
}
