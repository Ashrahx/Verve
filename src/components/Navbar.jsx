import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import logo from "/img/logo.svg";

const navItems = [
  { name: "Zterminal", hasDropdown: true },
  { name: "About", hasDropdown: true },
  { name: "Contact", hasDropdown: true },
];

// Botón con deformación líquida corregida (sin el bug del border-radius)
const NavButton = ({ title, showIcon }) => (
  <button className="group relative flex cursor-pointer items-center justify-center gap-2 px-6 py-3 text-xs font-medium text-black">
    
    {/* Capa de fondo que se deforma (Líquida) 
        Usamos rounded-[30px] en lugar de rounded-full para evitar el salto matemático de 9999px a 8px
    */}
    <div className="absolute inset-0 z-0 bg-blue-50 rounded-[30px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] 
      group-hover:scale-[1.04] 
      group-hover:rounded-[8px] 
      group-hover:skew-x-[8deg] 
      group-hover:skew-y-[2deg]" 
    />

    {/* Contenido (Texto e Icono) */}
    <div className="relative z-10 flex items-center gap-2">
      
      {/* Máscara de opacidad y texto que sube - Sincronizado con el fondo */}
      <div className="relative flex h-[16px] items-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
        <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%] uppercase font-general">
          {title}
        </span>
        <span className="absolute left-0 inline-block translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 uppercase font-general">
          {title}
        </span>
      </div>
      
      {showIcon && (
        <TiLocationArrow size={15} className="rotate-[135deg]" />
      )}
    </div>
  </button>
);

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  
  const pillRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const handleMouseEnter = (e) => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    gsap.to(pillRef.current, {
      opacity: 1,
      x: offsetLeft,
      width: offsetWidth,
      duration: 0.4,
      ease: "power3.out", 
    });
  };

  const handleMouseLeave = () => {
    gsap.to(pillRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-[67.2px] border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0">
              <img src={logo} alt="Logo" className="h-[5rem] w-[10rem]" />
            </div>

            <div className="hidden md:flex items-center gap-3 ml-4">
              <NavButton title="PRODUCTS" showIcon={true} />
              <NavButton title="WHITEPAPER" showIcon={false} />
            </div>
          </div>

          <div className="flex h-full items-center gap-8">
            <div 
              className="hidden md:flex items-center relative py-1"
              onMouseLeave={handleMouseLeave}
            >
              <div 
                ref={pillRef}
                className="absolute top-1/2 h-[34px] -translate-y-1/2 bg-white rounded-full z-0 pointer-events-none opacity-0"
                style={{ width: 0, left: 0 }} 
              />

              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.name.toLowerCase()}`}
                  onMouseEnter={handleMouseEnter}
                  className="relative z-10 flex items-center gap-1 font-general text-xs uppercase text-blue-50 px-5 py-2.5 transition-colors duration-300 hover:text-black"
                >
                  {item.name}
                  {item.hasDropdown && <TiLocationArrow size={15} />}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;