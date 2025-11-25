import { GalleryVerticalEndIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import type { Route } from "./+types/_index";
import { Button } from "~/components/ui/button";
import { GridPattern } from "~/components/ui/grid-pattern";
import LandingPage from "~/features/landing/landing-page";
import { anonymousMiddleware } from "~/features/user-authentication/user-authentication-middleware.server";
import { cn } from "~/lib/utils";

export const middleware = [anonymousMiddleware];

export function loader() {
  return { stealthMode: process.env.STEALTH_MODE === "true" };
}

export default function LandingRoute({
  loaderData: { stealthMode },
}: Route.ComponentProps) {
  return stealthMode ? <StealthModeLandingPage /> : <LandingPage />;
}

// --- Stealth Mode Landing Page ---

function XLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const HERO_GRADIENT = `radial-gradient(77% 116% at 37% 67%, #EEA5BA, rgba(238, 165, 186, 0) 50%),
  radial-gradient(56% 84% at 34% 56%, #3A8BFD, rgba(58, 139, 253, 0) 50%),
  radial-gradient(85% 127% at 100% 100%, #E4C795, rgba(228, 199, 149, 0) 50%),
  radial-gradient(82% 122% at 3% 29%, #855AFC, rgba(133, 90, 252, 0) 50%),
  radial-gradient(90% 136% at 52% 100%, #FD3A4E, rgba(253, 58, 78, 0) 50%),
  radial-gradient(102% 143% at 92% 7%, #72FE7D, rgba(114, 254, 125, 0) 50%)`;

function useScroll(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}

function StealthModeLandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <HeaderComponent />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Shades */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden contain-strict lg:block"
        >
          <div className="-z-10 absolute inset-0 isolate bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.06),transparent)] contain-strict" />
          <div
            aria-hidden="true"
            className="absolute inset-0 isolate z-1 bg-[radial-gradient(35%_10%_at_100%_0%,--theme(--color-foreground/.06),transparent)] contain-strict"
          />
        </div>

        {/* X Borders */}
        <div
          aria-hidden="true"
          className="absolute inset-0 mx-auto hidden w-full max-w-5xl md:block"
        >
          <div className="mask-[linear-gradient(to_bottom,transparent,black,transparent)] absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/20" />
          <div className="mask-[linear-gradient(to_bottom,transparent,black,transparent)] absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/20" />
        </div>

        <HeroSectionComponent />

        <TrustedByExpertsComponent />
      </main>
    </div>
  );
}

function HeaderComponent() {
  const { t } = useTranslation("stealthMode", { keyPrefix: "header" });
  const scrolled = useScroll(10);

  return (
    <header
      className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
        "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link className="rounded-md p-2 hover:bg-accent" to="/">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            <span className="font-mono text-sm font-medium">ara</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <a
              href="https://x.com/araos_official"
              rel="noopener noreferrer"
              target="_blank"
            >
              <XLogoIcon className="size-4" />
              {t("follow")}
            </a>
          </Button>
          <Button asChild>
            <Link to="/contact-us">{t("contactUs")}</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function HeroSectionComponent() {
  const { t } = useTranslation("stealthMode", { keyPrefix: "hero" });

  return (
    <section className="relative flex flex-1 items-center justify-center">
      {/* Gradients Background */}
      <div className="-inset-x-10 transform-[translate3d(0,0,0)] absolute bottom-0 h-[60%] opacity-40 blur-[100px] dark:opacity-0">
        <div
          className="-scale-y-100 mask-[radial-gradient(closest-side,black_100%,transparent_100%)] size-full"
          style={{ backgroundImage: HERO_GRADIENT }}
        />
      </div>

      {/* Grid Pattern */}
      <GridPattern
        className={cn(
          "fill-none stroke-foreground/10",
          "mask-[linear-gradient(to_bottom,transparent,var(--background),transparent)]",
        )}
        height={60}
        width={60}
        x={-8}
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-16">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-0 h-full w-full",
            "bg-[radial-gradient(ellipse_at_center,var(--background)_10%,transparent,transparent)]",
          )}
        />
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center gap-5">
          <div className="fade-in slide-in-from-bottom-10 mx-auto flex w-fit animate-in items-center gap-2 rounded-full border bg-card fill-mode-backwards p-1.5 px-3 shadow duration-500 ease-out">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium">{t("stealthMode")}</span>
          </div>

          <h1 className="fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl tracking-tight delay-100 duration-500 ease-out md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="fade-in slide-in-from-bottom-10 mx-auto max-w-lg animate-in fill-mode-backwards text-center text-base text-foreground/80 tracking-wider delay-200 duration-500 ease-out sm:text-lg md:text-xl">
            {t("description")}
          </p>

          <div className="fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
            <Button
              asChild
              className="rounded-full border bg-card active:scale-98"
              size="lg"
              variant="ghost"
            >
              <a
                href="https://x.com/araos_official"
                rel="noopener noreferrer"
                target="_blank"
              >
                <XLogoIcon className="size-4" />
                {t("follow")}
              </a>
            </Button>
            <Button asChild className="rounded-full active:scale-98" size="lg">
              <Link to="/contact-us">{t("contactUs")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedByExpertsComponent() {
  const { t } = useTranslation("stealthMode");

  return (
    <section className="relative mt-auto pb-8">
      <div className="flex h-10 items-end">
        <div className="flex-1 translate-x-px border-b" />
        <CurveComponent className="h-full" direction="tr" />
        <div className="relative w-full max-w-[400px] flex-1/2 py-1.5 md:flex-1">
          <div className="absolute inset-x-0 top-0 h-px border-t" />
          <h2 className="whitespace-nowrap text-center font-medium text-muted-foreground tracking-tight md:text-lg lg:text-xl">
            {t("tagline")}
          </h2>
        </div>
        <CurveComponent className="h-full" direction="tl" />
        <div className="-translate-x-px flex-1 border-b" />
      </div>
    </section>
  );
}

type CurveComponentProps = React.ComponentProps<"svg"> & {
  backgroundColor?: string;
  borderColor?: string;
  direction?: "tl" | "tr" | "bl" | "br";
};

function CurveComponent({
  direction = "tl",
  preserveAspectRatio = "none",
  backgroundColor = "transparent",
  borderColor = "var(--border)",
  className,
  ...props
}: Omit<CurveComponentProps, "viewBox" | "fill">) {
  const directionClass = {
    bl: "rotate-180 scale-x-[-1]",
    br: "rotate-180",
    tl: "rotate-0",
    tr: "rotate-0 scale-x-[-1]",
  }[direction];

  return (
    <svg
      aria-hidden="true"
      className={cn("overflow-hidden", directionClass, className)}
      fill="none"
      preserveAspectRatio={preserveAspectRatio}
      viewBox="0 0 60 42"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        height="43"
        id="overlay_nav_mask0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
        width="60"
        x="0"
        y="0"
      >
        <mask
          fill="black"
          height="43"
          id="path_1_outside"
          maskUnits="userSpaceOnUse"
          width="60"
          x="0"
          y="0"
        >
          <rect fill="white" height="43" width="60" y="0" />
          <path d="M1 0L8.0783 0C15.772 0 22.7836 4.41324 26.111 11.3501L34.8889 29.6498C38.2164 36.5868 45.228 41 52.9217 41H60H1L1 0Z" />
        </mask>
        <path
          d="M1 0L8.0783 0C15.772 0 22.7836 4.41324 26.111 11.3501L34.8889 29.6498C38.2164 36.5868 45.228 41 52.9217 41H60H1L1 0Z"
          fill="white"
        />
        <path
          d="M1 0V-1H0V0L1 0ZM1 41H0V42H1V41ZM34.8889 29.6498L33.9873 30.0823L34.8889 29.6498ZM26.111 11.3501L27.0127 10.9177L26.111 11.3501ZM1 1H8.0783V-1H1V1ZM60 40H1V42H60V40ZM2 41V0L0 0L0 41H2ZM25.2094 11.7826L33.9873 30.0823L35.7906 29.2174L27.0127 10.9177L25.2094 11.7826ZM52.9217 42H60V40H52.9217V42ZM33.9873 30.0823C37.4811 37.3661 44.8433 42 52.9217 42V40C45.6127 40 38.9517 35.8074 35.7906 29.2174L33.9873 30.0823ZM8.0783 1C15.3873 1 22.0483 5.19257 25.2094 11.7826L27.0127 10.9177C23.5188 3.6339 16.1567 -1 8.0783 -1V1Z"
          fill="black"
          mask="url(#path_1_outside)"
        />
      </mask>

      <g mask="url(#overlay_nav_mask0)">
        <mask
          fill="black"
          height="43"
          id="path_3_outside"
          maskUnits="userSpaceOnUse"
          width="60"
          x="-1"
          y="0"
        >
          <rect fill="white" height="43" width="60" x="-1" y="0" />
          <path d="M0 1.02441H7.0783C14.772 1.02441 21.7836 5.43765 25.111 12.3746L33.8889 30.6743C37.2164 37.6112 44.228 42.0244 51.9217 42.0244H59H0L0 1.02441Z" />
        </mask>
        <path
          d="M0 1.02441H7.0783C14.772 1.02441 21.7836 5.43765 25.111 12.3746L33.8889 30.6743C37.2164 37.6112 44.228 42.0244 51.9217 42.0244H59H0L0 1.02441Z"
          fill={backgroundColor}
        />
        <path
          d="M0 1.02441L0 0H-1V1.02441H0ZM0 42.0244H-1V43.0244H0L0 42.0244ZM33.8889 30.6743L32.9873 31.1068L33.8889 30.6743ZM25.111 12.3746L26.0127 11.9421L25.111 12.3746ZM0 2.02441H7.0783V0.0244141H0L0 2.02441ZM59 41.0244H0L0 43.0244H59V41.0244ZM1 42.0244L1 1.02441H-1L-1 42.0244H1ZM24.2094 12.8071L32.9873 31.1068L34.7906 30.2418L26.0127 11.9421L24.2094 12.8071ZM51.9217 43.0244H59V41.0244H51.9217V43.0244ZM32.9873 31.1068C36.4811 38.3905 43.8433 43.0244 51.9217 43.0244V41.0244C44.6127 41.0244 37.9517 36.8318 34.7906 30.2418L32.9873 31.1068ZM7.0783 2.02441C14.3873 2.02441 21.0483 6.21699 24.2094 12.8071L26.0127 11.9421C22.5188 4.65831 15.1567 0.0244141 7.0783 0.0244141V2.02441Z"
          fill={borderColor}
          mask="url(#path_3_outside)"
        />
      </g>
    </svg>
  );
}
