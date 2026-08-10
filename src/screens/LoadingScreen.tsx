/**
 * 03_tela_carregamento_mercado
 * Full-screen loading state com imagem central e dots indicadores.
 */
import { useEffect, useState } from 'react'
import StatusBar from '../components/StatusBar'

const MESSAGES = [
  'Verificando itens no estoque',
  'Montando sua lista de ingredientes',
  'Quase pronto...',
]

interface LoadingScreenProps {
  query?: string
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
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
    // 2: aria-label informa leitores de tela que a tela está em carregamento
    <main aria-label="Carregando, aguarde" className="flex h-full flex-col items-center bg-surface screen-enter">
      <StatusBar theme="dark" />

      {/* Conteúdo Central */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 w-full">

        {/* 1: role="status" + aria-live="polite" — anuncia cada nova mensagem automaticamente */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="flex flex-col items-center gap-3"
        >
          <p className="font-body text-heading-sm text-content-brand text-center">
            {MESSAGES[msgIndex]}
          </p>

          {/* 3: dots puramente visuais — ignorados por leitores de tela */}
          <div aria-hidden="true" className="flex items-center gap-1.5">
            <div className={`h-1.5 w-1.5 rounded-full bg-fresh-dark ${msgIndex === 0 ? '' : 'opacity-40'}`} />
            <div className={`h-1.5 w-1.5 rounded-full bg-fresh-dark ${msgIndex === 1 ? '' : 'opacity-40'}`} />
            <div className={`h-1.5 w-1.5 rounded-full bg-fresh-dark ${msgIndex === 2 ? '' : 'opacity-40'}`} />
          </div>
        </div>
      </div>

      {/* Indicador de home do iOS — inline style no lugar de classes arbitrárias */}
      <div className="flex h-8.5 items-center justify-center w-full shrink-0">
        <div className="h-[5px] w-[134px] rounded-full bg-neutral-150" />
      </div>
    </main>
  )
}

