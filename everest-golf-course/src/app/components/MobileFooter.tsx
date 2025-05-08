import Image from 'next/image'
import Link from 'next/link'

export default function MobileFooter({ textColor = "white" }: { textColor?: "white" | "black" }) {
    const textClass = textColor === "black" ? "text-black" : "text-white";
   
    return (
        <footer className="relative mt-auto">
            <div className="flex md:hidden w-full justify-center z-50 px-4 mb-4">
                <div className="w-full max-w-xs bg-black bg-opacity-60 rounded-xl py-3 px-4 flex justify-between items-start text-white text-xs">
                    <div className="flex flex-col items-start">
                        <span className="font-bold mb-1">Location</span>
                        <span className="flex items-center">
                            300 Everest Road, Nepal 06044
                        </span>
                    </div>
                    <div className="flex flex-col items-start ml-6">
                        <span className="font-bold mb-1">Hours</span>
                        <span>8AM–6PM</span>
                    </div>
                </div>
            </div>

            {/* Social Icons Row for Mobile */}
            <div className="flex md:hidden w-full justify-center z-50 mb-2">
                <div className="flex flex-row gap-6 bg-black bg-opacity-60 rounded-xl py-2 px-4">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <img src="/Images/instagram.png" alt="Instagram" className="w-6 h-6 filter invert" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <img src="/Images/facebook.png" alt="Facebook" className="w-6 h-6 filter invert" />
                    </a>
                    <a href="tel:629-299-1555">
                        <img src="/Images/phone.png" alt="Phone" className="w-6 h-6 -rotate-90 filter invert" />
                    </a>
                    <a href="mailto:everestgolfclub@gmail.com">
                        <img src="/Images/email.png" alt="Email" className="w-6 h-6 filter invert" />
                    </a>
                </div>
            </div>

            <div className="flex md:hidden w-full justify-center z-50 mb-4">
                <p className={`text-[.5rem] ${textClass} text-center`}>
                    ©2025 EVEREST GOLF CLUB BY RYAN OROZCO
                </p>
            </div>
        </footer>
    )
}   