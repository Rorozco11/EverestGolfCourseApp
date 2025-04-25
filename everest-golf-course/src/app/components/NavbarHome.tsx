// components/Navbar.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white h-[7rem] z-10">
      <div className="container mx-auto h-full flex items-center">
        <div className="pl-0">
          <Link legacyBehavior href="/">
            <a className="relative md:h-24 md:w-24 block">
              <Image
                src="/Images/dark.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </a>
          </Link>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-16">
          {[
            { href: "/", label: "HOME", underline: true },
            { href: "/rates", label: "RATES" },
            { href: "/memberships", label: "MEMBERSHIPS" },
            { href: "/contact", label: "CONTACT" },
          ].map(({ href, label, underline }) => (
            <Link legacyBehavior key={label} href={href}>
              <a
                className={`text-black text-sm font-semibold hover:text-green-700 transition-colors ${
                  underline ? "font-bold underline" : ""
                }`}
              >
                {label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
