// iOS-style status bar — matches Figma spec (44px height)
import signalIcon  from '../assets/icons/signal.svg'
import wifiIcon    from '../assets/icons/wifi.svg'
import batteryIcon from '../assets/icons/battery.svg'

interface StatusBarProps {
  /** 'dark' = dark text/icons on light bg; 'light' = white text/icons on dark bg */
  theme?: 'dark' | 'light'
  time?: string
}

export default function StatusBar({ theme = 'dark', time = '9:41' }: StatusBarProps) {
  const textClass = theme === 'light' ? 'text-content-inverse' : 'text-content-primary'

  // A1: container oculto de leitores de tela — informação de sistema já anunciada pelo OS
  return (
    <div aria-hidden="true" className="flex h-11 w-full shrink-0 items-center justify-between px-6">
      <span className={`font-heading text-[15px] font-semibold ${textClass}`}>{time}</span>

      <div className="flex items-center gap-1.5">
        {/* A2 + A3: decorativos — alt vazio por consistência */}
        <img src={signalIcon}  alt="" className="h-5 w-5" />
        <img src={wifiIcon}    alt="" className="h-5 w-5" />
        <img src={batteryIcon} alt="" className="h-5 w-6" />
      </div>
    </div>
  )
}
