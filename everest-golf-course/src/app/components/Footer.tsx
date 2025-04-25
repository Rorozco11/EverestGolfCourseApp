// components/FooterSection.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function FooterSection() {
  return (
    <footer className="w-full bg-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center">
          {/* Location & Hours */}
          <div>
            <h3 className="font-bold mb-2">Location</h3>
            <p className="flex items-center gap-2">
              <span className="text-red-500">📍</span>
              300 Everest Road, Nepal 06044
            </p>
            <h3 className="font-bold mt-4 mb-2">Hours</h3>
            <p>Everyday 8AM–6PM</p>
          </div>

          {/* Center Logo & Copyright */}
          <div className="text-center">
            <div className="relative h-40 w-40 mx-auto">
              <Image
                src="/Images/dark.png"
                alt="Bottom Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[.5rem] text-gray-600 mt-2">
              ©2025 EVEREST GOLF CLUB BY RYAN OROZCO
            </p>
          </div>

          {/* Social & Contact */}
          <div className="text-right">
            {[
              { icon: "/Images/instagram.png", alt: "Instagram", label: "everestgolfclub", href: "#" },
              { icon: "/Images/facebook.png",  alt: "Facebook",  label: "everestgolfclub", href: "#" },
              { icon: "/Images/phone.png",     alt: "Phone",     label: "629-299-1555",     href: "tel:629-299-1555", rotate: true },
              { icon: "/Images/email.png",     alt: "Email",     label: "everestgolfclub@gmail.com", href: "mailto:everestgolfclub@gmail.com" },
            ].map(({ icon, alt, label, href, rotate }) => (
              <Link legacyBehavior key={alt + label} href={href}>
                <a className="flex items-center justify-end gap-2 mb-2">
                  <Image
                    src={icon}
                    alt={alt}
                    width={20}
                    height={20}
                    className={rotate ? "-rotate-90" : ""}
                  />
                  <span className="text-sm">{label}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
