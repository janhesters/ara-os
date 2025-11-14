import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const imageClassNames = "border-border rounded-xl border object-contain";
const imageFadeStyle: CSSProperties = {
  maskImage: "linear-gradient(to bottom, black 75%, transparent)",
  WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent)",
};

export function Hero() {
  const { t } = useTranslation("landing", { keyPrefix: "hero" });

  return (
    <section className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-primary/50 to-primary/30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-2xl py-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <Badge variant="secondary">
            {t("announcementBadge")}{" "}
            <Link
              className="font-semibold text-primary hover:text-primary/80"
              to="#"
            >
              <span aria-hidden="true" className="absolute inset-0" />
              {t("announcementLink")} <span aria-hidden="true">&rarr;</span>
            </Link>
          </Badge>
        </div>

        <div className="text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
            {t("title")}
          </h2>

          <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
            {t("description")}
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link to="/register">{t("ctaButton")}</Link>
            </Button>

            <Link
              className={buttonVariants({ size: "lg", variant: "ghost" })}
              to="#"
            >
              {t("secondaryButton")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 px-4">
        <img
          alt={t("image.light")}
          className={cn(imageClassNames, "shadow-sm dark:hidden")}
          src="/images/app-light.png"
          style={imageFadeStyle}
        />

        <img
          alt={t("image.dark")}
          className={cn(imageClassNames, "hidden dark:block")}
          src="/images/app-dark.png"
          style={imageFadeStyle}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-primary/50 to-primary/30 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}
