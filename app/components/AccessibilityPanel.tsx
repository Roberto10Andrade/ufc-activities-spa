'use client'

import { useAccessibilityContext } from '@/app/context/AccessibilityContext'

export default function AccessibilityPanel() {
  const { settings, updateSettings } = useAccessibilityContext()

  return (
    <details className="group">
      <summary className="nav-link flex items-center gap-3 p-2 rounded-lg text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer list-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
          <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm161.5-86.1c-12.2-5.2-26.3 .4-31.5 12.6s.4 26.3 12.6 31.5l11.9 5.1c17.3 7.4 35.2 12.9 53.6 16.3v50.1c0 4.3-.7 8.6-2.1 12.6l-28.7 86.1c-4.2 12.6 2.6 26.2 15.2 30.4s26.2-2.6 30.4-15.2l24.4-73.2c1.3-3.8 4.8-6.4 8.8-6.4s7.6 2.6 8.8 6.4l24.4 73.2c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-28.7-86.1c-1.4-4.1-2.1-8.3-2.1-12.6V235.5c18.4-3.5 36.3-8.9 53.6-16.3l11.9-5.1c12.2-5.2 17.8-19.3 12.6-31.5s-19.3-17.8-31.5-12.6L338.7 175c-26.1 11.2-54.2 17-82.7 17s-56.5-5.8-82.7-17l-11.9-5.1zM256 160a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
        </svg>
        <span className="flex-1">Acessibilidade</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-3 h-3 transition-transform duration-200 group-open:rotate-180"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      
      <div className="mt-2 p-3 bg-black/20 rounded-xl space-y-4">
        {/* Tamanho da Fonte */}
        <div>
          <h3 className="text-[10px] font-semibold text-white/70 uppercase tracking-wide mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-3 h-3">
              <path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z"/>
            </svg>
            Fonte
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => updateSettings({ fontSize: 'normal' })}
              className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-semibold transition-all ${
                settings.fontSize === 'normal'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              A
            </button>
            <button
              onClick={() => updateSettings({ fontSize: 'large' })}
              className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-semibold transition-all ${
                settings.fontSize === 'large'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              A+
            </button>
            <button
              onClick={() => updateSettings({ fontSize: 'larger' })}
              className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-semibold transition-all ${
                settings.fontSize === 'larger'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              A++
            </button>
          </div>
        </div>

        {/* Contraste */}
        <div>
          <h3 className="text-[10px] font-semibold text-white/70 uppercase tracking-wide mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-3 h-3">
              <path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
            </svg>
            Contraste
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => updateSettings({ contrast: 'normal' })}
              className={`block w-full py-2 px-3 rounded-lg text-xs font-medium transition-all text-left ${
                settings.contrast === 'normal'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => updateSettings({ contrast: 'high' })}
              className={`block w-full py-2 px-3 rounded-lg text-xs font-medium transition-all text-left ${
                settings.contrast === 'high'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Alto Contraste
            </button>
          </div>
        </div>

        {/* Dislexia */}
        <div>
          <h3 className="text-[10px] font-semibold text-white/70 uppercase tracking-wide mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-3 h-3">
              <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
            </svg>
            Dislexia
          </h3>
          <div className="space-y-1.5">
            <button
              onClick={() => updateSettings({ dyslexia: false })}
              className={`flex items-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                !settings.dyslexia
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
                <path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z"/>
              </svg>
              Fonte Normal
            </button>
            <button
              onClick={() => updateSettings({ dyslexia: true })}
              className={`flex items-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                settings.dyslexia
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="w-4 h-4">
                <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"/>
              </svg>
              Fonte para Dislexia
            </button>
          </div>
        </div>
      </div>
    </details>
  )
}
