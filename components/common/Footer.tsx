
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import type { MouseEvent } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  CalendarDays,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Printer,
} from "lucide-react";

import { sectionHref } from "../navigation";
import { FooterData } from "@/types/templates.types";
import Container from "../ui/Container";

const footer = FooterData;

const EASE = [0.22, 1, 0.36, 1] as const;
const GOLD = "#FFBF00";

function resolveHref(href: string) {
  if (
    /^(tel:|mailto:|https?:\/\/)/i.test(href)
  ) {
    return href;
  }

  return sectionHref(href);
}

function getSectionId(href: string) {
  const resolved = resolveHref(href);

  if (!resolved.includes("#")) {
    return null;
  }

  return decodeURIComponent(
    resolved.split("#")[1] || ""
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  const [activeSection, setActiveSection] =
    useState("home");

  const contactItems = [
    {
      icon: MapPin,
      value: footer.contact.address,
      href: "",
    },
    {
      icon: Phone,
      value: footer.contact.phone,
      href: footer.contact.phone
        ? `tel:${footer.contact.phone.replace(
            /[^\d+]/g,
            ""
          )}`
        : "",
    },
    {
      icon: Mail,
      value: footer.contact.email,
      href: footer.contact.email
        ? `mailto:${footer.contact.email}`
        : "",
    },
    {
      icon: Printer,
      value: footer.contact.fax,
      href: "",
    },
  ].filter((item) => item.value);

  // =========================================
  // GET STICKY HEADER HEIGHT
  // =========================================

  const getHeaderHeight = useCallback(() => {
    const header = document.querySelector(
      "header"
    );

    return (
      header?.getBoundingClientRect().height ??
      100
    );
  }, []);

  // =========================================
  // ACTIVE SECTION SCROLL SPY
  // =========================================

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = Array.from(
      new Set(
        footer.links
          .map((link) => getSectionId(link.href))
          .filter(
            (id): id is string => Boolean(id)
          )
      )
    );

    // Also track the main homepage sections.
    const knownSections = [
      "home",
      "about",
      "services",
      "projects",
      "testimonials",
      "faq",
      "contact",
    ];

    const ids = Array.from(
      new Set([...knownSections, ...sectionIds])
    );

    let frame = 0;

    const detectActiveSection = () => {
      const scrollPosition =
        window.scrollY + getHeaderHeight() + 40;

      let current = "home";

      for (const id of ids) {
        const element =
          document.getElementById(id);

        if (!element) continue;

        const sectionTop =
          element.getBoundingClientRect().top +
          window.scrollY;

        if (scrollPosition >= sectionTop) {
          current = id;
        }
      }

      setActiveSection((previous) =>
        previous === current ? previous : current
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(
        detectActiveSection
      );
    };

    detectActiveSection();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(
        "scroll",
        onScroll
      );
      window.removeEventListener(
        "resize",
        onScroll
      );
    };
  }, [pathname, getHeaderHeight]);

  // =========================================
  // HANDLE FOOTER LINK CLICK
  // =========================================

  const handleFooterClick = useCallback(
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

      const resolvedHref = resolveHref(href);

      // Leave external, email and phone links alone.
      if (
        /^(tel:|mailto:|https?:\/\/)/i.test(
          href
        )
      ) {
        return;
      }

      const url = new URL(
        resolvedHref,
        window.location.origin
      );

      // Let Next.js handle different pages.
      if (
        url.pathname !==
        window.location.pathname
      ) {
        return;
      }

      const sectionId = url.hash
        ? decodeURIComponent(
            url.hash.slice(1)
          )
        : null;

      if (!sectionId) {
        if (url.pathname === "/") {
          event.preventDefault();

          setActiveSection("home");

          window.scrollTo({
            top: 0,
            behavior: reduceMotion
              ? "instant"
              : "smooth",
          });

          window.history.replaceState(
            window.history.state,
            "",
            "/"
          );
        }

        return;
      }

      const target = document.getElementById(
        sectionId
      );

      if (!target) return;

      event.preventDefault();

      setActiveSection(sectionId);

      const headerHeight = getHeaderHeight();

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: reduceMotion
          ? "instant"
          : "smooth",
      });

      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`
      );
    },
    [reduceMotion, getHeaderHeight]
  );

  // =========================================
  // CHECK ACTIVE FOOTER LINK
  // =========================================

  const isLinkActive = useCallback(
    (href: string) => {
      const resolved = resolveHref(href);
      const sectionId = getSectionId(href);

      if (sectionId && pathname === "/") {
        return activeSection === sectionId;
      }

      const path = resolved.split("#")[0];

      if (path === "/") {
        return (
          pathname === "/" &&
          activeSection === "home"
        );
      }

      if (!path) return false;

      return (
        pathname === path ||
        pathname.startsWith(`${path}/`)
      );
    },
    [pathname, activeSection]
  );

  // =========================================
  // FOOTER JSX
  // =========================================

  return (
    <footer className="relative isolate overflow-hidden bg-[#052C43] font-poppins text-white">

      {/* BACKGROUND IMAGE */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={footer.backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-65"
        />
      </div>

      <Container className="py-10 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-9">

          {footer.columns.map((column, index) => (
            <motion.div
              key={column.key}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 35 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: EASE,
              }}
            >
              {/* ABOUT COLUMN */}
              {column.key === "about" && (
                <>
                  <Link
                    href="/"
                    onClick={(event) =>
                      handleFooterClick(
                        event,
                        "/"
                      )
                    }
                    className="mb-7 block"
                  >
                    <Image
                      src={footer.logo.src}
                      alt={footer.logo.alt}
                      width={245}
                      height={95}
                      className="h-auto w-[190px] object-contain sm:w-[230px] lg:w-[260px] 2xl:w-[300px]"
                    />
                  </Link>

                  <p className="max-w-[290px] text-sm leading-[1.9] text-white/80">
                    {footer.about}
                  </p>
                </>
              )}

              {/* COLUMN HEADINGS */}
              {column.key !== "about" && (
                <>
                  <h3 className="font-montserrat sm:text-lg font-semibold uppercase">
                    {column.title}
                  </h3>

                  <span
                    className="mb-7 mt-3 block h-[3px] w-14"
                    style={{
                      backgroundColor: GOLD,
                    }}
                  />
                </>
              )}

              {/* EVENTS COLUMN */}
              {column.key === "events" && (
                <div className="space-y-5">
                  {footer.events.map((event) => (
                    <Link
                      key={event.id}
                      href={resolveHref(
                        event.href
                      )}
                      onClick={(e) =>
                        handleFooterClick(
                          e,
                          event.href
                        )
                      }
                      className="group flex items-start gap-3 font-montserrat"
                    >
                      <div className="relative h-[75px] w-[85px] shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="85px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div>
                        <h4 className="text-sm font-medium leading-snug transition-colors group-hover:text-[#FFBF00]">
                          {event.title}
                        </h4>

                        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/75">
                          <CalendarDays
                            size={14}
                            className="text-[#FFBF00]"
                          />
                          {event.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* INFORMATION LINKS */}
              {column.key === "links" && (
                <ul className="space-y-3">
                  {footer.links.map(
                    (link, index) => {
                      const active =
                        isLinkActive(link.href);

                      return (
                        <li
                          key={`${link.href}-${index}`}
                        >
                          <Link
                            href={resolveHref(
                              link.href
                            )}
                            onClick={(event) =>
                              handleFooterClick(
                                event,
                                link.href
                              )
                            }
                            aria-current={
                              active
                                ? "location"
                                : undefined
                            }
                            className={`group flex items-center gap-2 font-montserrat text-sm font-medium transition-colors duration-300 text-white/80 hover:text-[#FFBF00]`}
                          >
                            <ChevronRight
                              size={17}
                              strokeWidth={3}
                              className={`shrink-0 transition-all duration-300 text-[#FFBF00] group-hover:translate-x-1`}
                            />

                            <span className="relative">
                              {link.label}

                             
                            </span>
                          </Link>
                        </li>
                      );
                    }
                  )}
                </ul>
              )}

              {/* CONTACT COLUMN */}
              {column.key === "contact" && (
                <>
                  <p className="mb-6 text-sm leading-relaxed text-white/80">
                    {footer.contact.description}
                  </p>

                  <div className="space-y-5">
                    {contactItems.map(
                      (item, index) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#FFBF00] text-[#103245]">
                              <Icon size={18} />
                            </span>

                            {item.href ? (
                              <a
                                href={item.href}
                                className="break-words text-sm leading-relaxed text-white/80 transition-colors hover:text-[#FFBF00]"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <span className="text-sm leading-relaxed text-white/80">
                                {item.value}
                              </span>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* COPYRIGHT */}
        <div className="mt-16 border-t border-white/35 pt-6 text-center font-montserrat">
          <p className="text-sm text-white/85">
            {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
