'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  if (pathname !== '/') {
    return null
  }

  return (
    <header className="py-6 md:py-8 mb-6 md:mb-8">
      <div className="flex justify-center items-center">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Logo Principal */}
          <div className="group">
            <Link href="/">
              <div className="
                relative
                bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950 dark:to-transparent
                rounded-2xl p-6 md:p-8
                transition-all duration-500
                group-hover:scale-105
                group-hover:-translate-y-2
                group-hover:shadow-[0_20px_60px_-20px_rgba(29,78,216,0.4)]
                dark:group-hover:shadow-[0_20px_60px_-20px_rgba(29,78,216,0.3)]
              ">
                <img
                  src="/Imagem1.png"
                  alt="UFC Sobral Logo"
                  className="w-[300px] md:w-[400px] h-auto transition-all duration-500 group-hover:brightness-110 drop-shadow-lg"
                />
              </div>
            </Link>
          </div>

          {/* Logo 70 Anos */}
          <div className="group">
            <div className="
              relative
              bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950 dark:to-transparent
              rounded-2xl p-5 md:p-6
              transition-all duration-500
              group-hover:scale-105
              group-hover:-translate-y-2
              group-hover:shadow-[0_20px_60px_-20px_rgba(245,158,11,0.4)]
              dark:group-hover:shadow-[0_20px_60px_-20px_rgba(245,158,11,0.3)]
            ">
              <img
                src="/UFC-70-Horizontal-Cor-2048x463.png"
                alt="UFC 70 Anos"
                className="w-[220px] md:w-[280px] h-auto transition-all duration-500 group-hover:brightness-110 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
