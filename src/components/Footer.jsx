import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const links = [
  { href: "#nexus", label: "Nexus" },
  { href: "#vault", label: "Vault" },
  { href: "#prologue", label: "Prologue" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord />, label: "Discord" },
  { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },  
  { href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
  { href: "https://medium.com", icon: <FaMedium />, label: "Medium" },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-black py-10 text-blue-50">
      <div className="container mx-auto px-10">
        <div className="flex flex-col items-center gap-8">
          {/* Links Section */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="font-general text-xs uppercase transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-blue-50 transition-all duration-300 hover:scale-110 hover:text-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 transition-colors hover:bg-white/10">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 md:flex-row">
            <p className="font-general text-xs text-center md:text-left">
              VERVE {new Date().getFullYear()}. All rights reserved
            </p>
            
            <div className="flex gap-6">
              <a
                href="#privacy-policy"
                className="font-general text-xs hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="font-general text-xs hover:underline"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;