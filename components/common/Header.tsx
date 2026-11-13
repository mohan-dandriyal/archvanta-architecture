
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { MouseEvent } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ChevronDown,
  Menu,
  Phone,
  X,
  ArrowUpRight,
} from "lucide-react";

import { sectionHref } from "../navigation";
import { HeaderData } from "@/types/templates.types";
import Container from "../ui/Container";

const { logo, navLinks, contact, styles } = HeaderData;

const DEFAULT_HEADER_HEIGHT = 100;
const GOLD = "#E5AD49";

const getSectionId = (href: string) => {
  const resolved = sectionHref(href);
  const hash = resolved.split("#")[1];

  return hash ? decodeURIComponent(hash) : null;
};

export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const headerRef = useRef<HTMLElement>(null);
  const scrollLockRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // =========================================
  // HELPERS
  // =========================================

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, []);

  const getHeaderHeight = useCallback(() => {
    return (
      headerRef.current?.getBoundingClientRect()
        .height ?? DEFAULT_HEADER_HEIGHT
    );
  }, []);

  // =========================================
  // ACTIVE SECTION DETECTION
  // =========================================

  const detectActiveSection = useCallback(() => {
    if (scrollLockRef.current) return;

    const sectionIds = Array.from(
      new Set(
        navLinks
          .map((item) => getSectionId(item.href))
          .filter((id): id is string => Boolean(id))
      )
    );

    const scrollPosition =
      window.scrollY + getHeaderHeight() + 30;

    let currentSection = sectionIds[0] ?? "home";

    for (const id of sectionIds) {
      const element = document.getElementById(id);

      if (!element) continue;

      const sectionTop =
        element.getBoundingClientRect().top +
        window.scrollY;

      if (scrollPosition >= sectionTop) {
        currentSection = id;
      }
    }

    if (window.scrollY < 50) {
      currentSection = "home";
    }

    setActiveSection((previous) =>
      previous === currentSection
        ? previous
        : currentSection
    );
  }, [getHeaderHeight]);

  // =========================================
  // SCROLL LISTENER
  // =========================================

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        detectActiveSection();
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [detectActiveSection, pathname]);

  // =========================================
  // RESET MENUS ON ROUTE CHANGE
  // =========================================

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // =========================================
  // ESCAPE KEY + RESPONSIVE MENU
  // =========================================

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const desktop = window.matchMedia(
      "(min-width: 1024px)"
    );

    const onResize = () => {
      if (desktop.matches) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);

    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [closeMenu]);

  // =========================================
  // MOBILE BODY SCROLL LOCK
  // =========================================

  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // =========================================
  // CLEANUP SCROLL TIMER
  // =========================================

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  // =========================================
  // NAVIGATION CLICK HANDLER
  // =========================================

  const handleSectionClick = useCallback(
    (
      event: MouseEvent<HTMLAnchorElement>,
      href: string
    ) => {
      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const resolvedHref = sectionHref(href);

      const url = new URL(
        resolvedHref,
        window.location.origin
      );

      // Different page: let Next.js handle navigation.
      if (url.pathname !== window.location.pathname) {
        closeMenu();
        return;
      }

      const sectionId = url.hash
        ? decodeURIComponent(url.hash.slice(1))
        : null;

      // Home link without a hash.
      if (!sectionId && url.pathname === "/") {
        event.preventDefault();
        closeMenu();

        setActiveSection("home");

        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "instant" : "smooth",
        });

        window.history.replaceState(
          window.history.state,
          "",
          "/"
        );

        return;
      }

      if (!sectionId) {
        closeMenu();
        return;
      }

      const target = document.getElementById(
        sectionId
      );

      if (!target) {
        closeMenu();
        return;
      }

      event.preventDefault();
      closeMenu();

      // Highlight clicked menu immediately.
      setActiveSection(sectionId);

      // Temporarily prevent scroll spy overriding
      // the clicked section during smooth scrolling.
      scrollLockRef.current = true;

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      const headerHeight = getHeaderHeight();

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: reduceMotion ? "instant" : "smooth",
      });

      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`
      );

      scrollTimerRef.current = setTimeout(() => {
        scrollLockRef.current = false;
        detectActiveSection();
      }, reduceMotion ? 0 : 850);
    },
    [
      closeMenu,
      reduceMotion,
      getHeaderHeight,
      detectActiveSection,
    ]
  );

  // =========================================
  // ACTIVE MENU CHECK
  // =========================================

  const isMenuActive = useCallback(
    (href: string) => {
      const resolvedHref = sectionHref(href);
      const sectionId = getSectionId(href);

      if (sectionId && pathname === "/") {
        return activeSection === sectionId;
      }

      if (resolvedHref === "/") {
        return pathname === "/" &&
          activeSection === "home";
      }

      const path = resolvedHref.split("#")[0];

      return (
        pathname === path ||
        pathname.startsWith(`${path}/`)
      );
    },
    [pathname, activeSection]
  );

  // =========================================
  // HEADER JSX
  // =========================================

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "shadow-xl shadow-black/15"
          : ""
      }`}
      style={{
        backgroundColor: styles.background,
        color: styles.text,
      }}
    >
      <Container>
        <div className="mx-auto flex min-h-[80px] w-full items-center justify-between gap-2 lg:min-h-[100px]">

          {/* LOGO */}
          <Link
            href={logo.href}
            aria-label="ArchVanta Home"
            onClick={(event) =>
              handleSectionClick(event, logo.href)
            }
            className="relative z-50 flex shrink-0 items-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height || 100}
              priority
              className="h-auto w-[150px] object-contain sm:w-[230px] lg:w-[260px] 2xl:w-[300px]"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden h-full items-center gap-5 lg:flex xl:gap-7 2xl:gap-11"
          >
            {navLinks.map((item) => {
              const active = isMenuActive(item.href);

              const hasChildren =
                "children" in item &&
                Array.isArray(item.children) &&
                item.children.length > 0;

              return (
                <div
                  key={item.id}
                  className="group relative flex h-full items-center"
                >
                  <Link
                    href={sectionHref(item.href)}
                    onClick={(event) =>
                      handleSectionClick(
                        event,
                        item.href
                      )
                    }
                    aria-current={
                      active ? "location" : undefined
                    }
                    className={`font-montserrat relative flex items-center gap-2 whitespace-nowrap py-2 text-[15px] font-semibold transition-colors duration-300 xl:text-[17px] ${
                      active
                        ? "text-[#E5AD49]"
                        : "text-white hover:text-[#E5AD49]"
                    }`}
                  >
                    {item.label}

                    {hasChildren && (
                      <ChevronDown
                        size={18}
                        className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                      />
                    )}

                    {/* ACTIVE UNDERLINE */}
                    <span
                      className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-[#E5AD49] transition-all duration-300 ${
                        active
                          ? "w-full"
                          : "w-0 group-hover:w-full group-focus-within:w-full"
                      }`}
                    />
                  </Link>

                  {/* DESKTOP DROPDOWN */}
                  {hasChildren && (
                    <div className="invisible absolute left-0 top-[calc(100%-12px)] z-50 w-[260px] translate-y-3 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#12384C] py-2 shadow-2xl">
                        {item.children?.map(
                          (child, index) => {
                            const childActive =
                              isMenuActive(child.href);

                            return (
                              <Link
                                key={index}
                                href={sectionHref(
                                  child.href
                                )}
                                onClick={(event) =>
                                  handleSectionClick(
                                    event,
                                    child.href
                                  )
                                }
                                className={`block px-5 py-3 font-montserrat text-sm font-medium transition-colors hover:bg-white/10 hover:text-[#E5AD49] ${
                                  childActive
                                    ? "bg-white/10 text-[#E5AD49]"
                                    : "text-white"
                                }`}
                              >
                                {child.label}
                              </Link>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* DESKTOP PHONE BUTTON */}
          <motion.a
            href={contact.href}
            whileHover={
              reduceMotion
                ? undefined
                : { scale: 1.035 }
            }
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.97 }
            }
            className="hidden shrink-0 items-center justify-center gap-3 rounded-[18px] border border-[#F1BF62]/30 bg-gradient-to-r from-[#D69A3F] via-[#E3AD53] to-[#D69A3F] px-5 py-4 text-[15px] font-semibold text-white shadow-lg shadow-black/10 transition-shadow hover:shadow-xl xl:flex xl:px-6 xl:text-[17px] 2xl:px-8"
          >
            <Phone
              size={23}
              fill="white"
              strokeWidth={1}
            />
            <span>{contact.label}</span>
          </motion.a>

          {/* MOBILE ACTIONS */}
          <div className="relative z-50 flex items-center gap-2 lg:hidden">
            <a
              href={contact.href}
              aria-label={`Call ${contact.label}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCA448] text-white"
            >
              <Phone size={21} />
            </a>

            <button
              type="button"
              onClick={() =>
                setMenuOpen((prev) => !prev)
              }
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white"
            >
              {menuOpen ? (
                <X size={27} />
              ) : (
                <Menu size={27} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, height: 0 }
              }
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-full w-full overflow-hidden border-t border-white/10 bg-[#103245] shadow-2xl lg:hidden"
            >
              <div className="max-h-[calc(100dvh-88px)] space-y-1 overflow-y-auto px-5 py-6 sm:px-8">
                {navLinks.map((item) => {
                  const active = isMenuActive(
                    item.href
                  );

                  const hasChildren =
                    "children" in item &&
                    Array.isArray(
                      item.children
                    ) &&
                    item.children.length > 0;

                  return (
                    <div
                      key={item.id}
                      className="border-b border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={sectionHref(
                            item.href
                          )}
                          onClick={(event) =>
                            handleSectionClick(
                              event,
                              item.href
                            )
                          }
                          className={`flex-1 py-4 font-montserrat text-[17px] font-medium ${
                            active
                              ? "text-[#E5AD49]"
                              : "text-white"
                          }`}
                        >
                          {item.label}
                        </Link>

                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() =>
                              setServicesOpen(
                                (prev) => !prev
                              )
                            }
                            aria-label="Toggle Services submenu"
                            aria-expanded={
                              servicesOpen
                            }
                            className="flex h-11 w-11 items-center justify-center text-white"
                          >
                            <ChevronDown
                              size={20}
                              className={`transition-transform ${
                                servicesOpen
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {hasChildren &&
                          servicesOpen && (
                            <motion.div
                              initial={
                                reduceMotion
                                  ? false
                                  : {
                                      height: 0,
                                      opacity: 0,
                                    }
                              }
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={
                                reduceMotion
                                  ? undefined
                                  : {
                                      height: 0,
                                      opacity: 0,
                                    }
                              }
                              className="overflow-hidden"
                            >
                              <div className="space-y-1 pb-3 pl-5">
                                {item.children?.map(
                                  (child) => (
                                    <Link
                                      key={
                                        child.href
                                      }
                                      href={sectionHref(
                                        child.href
                                      )}
                                      onClick={(
                                        event
                                      ) =>
                                        handleSectionClick(
                                          event,
                                          child.href
                                        )
                                      }
                                      className={`flex items-center justify-between rounded-md px-3 py-3 font-montserrat text-sm transition-colors hover:bg-white/10 hover:text-[#E5AD49] ${
                                        isMenuActive(
                                          child.href
                                        )
                                          ? "text-[#E5AD49]"
                                          : "text-white/80"
                                      }`}
                                    >
                                      {
                                        child.label
                                      }
                                      <ArrowUpRight
                                        size={15}
                                      />
                                    </Link>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <a
                  href={contact.href}
                  className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-[#DCA448] px-5 py-4 text-base font-semibold text-white"
                >
                  <Phone size={20} />
                  {contact.label}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
