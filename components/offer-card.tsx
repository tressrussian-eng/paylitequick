"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CalendarDays, CheckCircle2, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Offer, totalPrice } from "@/lib/products"

const LOGIN_URL = "https://quickairtelcredit-fsp7.vercel.app/" 

export function OfferCard({ offer }: { offer: Offer }) {
  const [open, setOpen] = useState(false)
  const days = offer.months * 30

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={offer.image || "/placeholder.svg"}
            alt={offer.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {offer.months} mois
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <h3 className="font-display text-lg font-semibold leading-tight text-card-foreground text-balance">
            {offer.name}
          </h3>

          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-secondary p-3">
              <dt className="text-xs font-medium text-muted-foreground">
                Acompte
              </dt>
              <dd className="mt-0.5 font-display text-xl font-bold text-secondary-foreground">
                {offer.deposit} $
              </dd>
            </div>
            <div className="rounded-xl bg-primary/10 p-3">
              <dt className="text-xs font-medium text-muted-foreground">
                Par jour
              </dt>
              <dd className="mt-0.5 font-display text-xl font-bold text-primary">
                {offer.daily.toFixed(2)} $
              </dd>
            </div>
          </dl>

          <p className="text-sm text-muted-foreground">
            Payez{" "}
            <span className="font-medium text-foreground">
              {offer.deposit} $
            </span>{" "}
            aujourd&apos;hui, puis{" "}
            <span className="font-medium text-foreground">
              {offer.daily.toFixed(2)} $/jour
            </span>{" "}
            pendant {days.toLocaleString("fr-FR")} jours.
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground">
                Prix total à payer
              </p>
              <p className="font-display text-base font-semibold text-foreground">
                {totalPrice(offer).toLocaleString("fr-FR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                ${offer.estimated ? "*" : ""}
              </p>
            </div>
            <Button
              size="sm"
              className="rounded-full px-5"
              onClick={() => setOpen(true)}
            >
              Demander
            </Button>
          </div>
        </div>
      </article>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Demande pour ${offer.name}`}
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <div className="flex gap-4 border-b border-border p-5">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-lg font-semibold text-card-foreground text-balance">
                  {offer.name}
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  Plan de {offer.months} mois
                </p>
                <p className="mt-2 font-display text-sm font-semibold text-foreground">
                  {totalPrice(offer).toLocaleString("fr-FR", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}{" "}
                  ${offer.estimated ? "*" : ""}{" "}
                  <span className="font-normal text-muted-foreground">
                    au total
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-3 p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-secondary p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Acompte aujourd&apos;hui
                  </p>
                  <p className="mt-0.5 font-display text-xl font-bold text-secondary-foreground">
                    {offer.deposit} $
                  </p>
                </div>
                <div className="rounded-xl bg-primary/10 p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Paiement quotidien
                  </p>
                  <p className="mt-0.5 font-display text-xl font-bold text-primary">
                    {offer.daily.toFixed(2)} $
                  </p>
                </div>
              </div>

              <ul className="space-y-2 rounded-xl bg-secondary/60 p-4 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Période de paiement
                  </span>
                  <span className="font-medium text-foreground">
                    {days.toLocaleString("fr-FR")} jours
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">
                    Total des paiements quotidiens
                  </span>
                  <span className="font-medium text-foreground">
                    {(offer.daily * days).toLocaleString("fr-FR", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                    $
                  </span>
                </li>
              </ul>

              <a
                href={LOGIN_URL}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ShieldCheck className="size-4" />
                Continuer avec Airtel pour vérifier
              </a>

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <CheckCircle2 className="size-3.5 text-primary" />
                Vérifiez votre éligibilité — l&apos;inscription est sans
                engagement.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
