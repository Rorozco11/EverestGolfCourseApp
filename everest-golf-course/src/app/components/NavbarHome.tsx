// components/Navbar.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/rates", label: "RATES" },
    { href: "/memberships", label: "MEMBERSHIPS" },
    { href: "/contact", label: "CONTACT" },
  ];

  const showTeeTimeButton = ["/rates", "/memberships", "/contact"].includes(pathname);

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-white z-10"
      style={{ height: "var(--navbar-height)" }}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
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
          {navLinks.map(({ href, label }) => (
            <Link legacyBehavior key={label} href={href}>
              <a
                className={`text-black text-sm font-medium hover:text-green-700 transition-colors ${
                  pathname === href ? "font-bold underline" : ""
                }`}
              >
                {label}
              </a>
            </Link>
          ))}
        </div>

        <div className="ml-auto">
          {showTeeTimeButton && (
            <button className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition-colors font-semibold text-base">
              BOOK A TEE TIME
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
