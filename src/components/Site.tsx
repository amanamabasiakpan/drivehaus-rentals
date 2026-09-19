"use client";

import { useEffect, useMemo, useState } from "react";
import { site, pickupOptions, vehicleTypes } from "@/data/site";
import {
  categories,
  vehicles,
  formatNaira,
  type Vehicle,
  type CategoryId,
} from "@/data/vehicles";

const nav = [
  ["Home", "#home"],
  ["Cars", "#cars"],
  ["Services", "#services"],
  ["How It Works", "#how"],
  ["About", "#why"],
  ["Reviews", "#reviews"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

const faqs = [
  ["What documents do I need to rent a car?", "A valid driver's licence, government-issued identification, and a signed rental agreement. Additional verification may apply for self-drive bookings."],
  ["Do you offer self-drive rentals?", "Yes. Self-drive is available subject to licence checks, identification, a security deposit, and vehicle availability."],
  ["Can I rent a car with a driver?", "Yes. Professional chauffeur service is available for airport transfers, events, executives, and daily hire."],
  ["Do you offer airport pickup?", "Yes. We collect from Murtala Muhammed International Airport and deliver to hotels, residences, and offices across Lagos."],
  ["Can I rent a vehicle for one month?", "Yes. Weekly and monthly rentals are available. Ask for a longer-term quote."],
  ["Is a security deposit required?", "A refundable security deposit is typically required for self-drive rentals. The amount depends on the vehicle."],
  ["Can I extend my rental period?", "Yes, subject to availability. Message us on WhatsApp before the current booking ends."],
  ["What happens if the vehicle breaks down?", "Contact support immediately. We arrange assistance and a replacement vehicle where available."],
  ["Can I request a specific vehicle?", "Yes. Specific models are subject to availability at the time of booking."],
  ["Do you deliver vehicles to customers?", "Yes. Delivery is available across Lagos service areas."],
  ["Do you operate outside Lagos?", "Lagos is our primary market. Ask about Abuja bookings."],
];

const reviews = [
  { q: "The Camry was clean, comfortable, and exactly as described. Booking through WhatsApp was surprisingly easy.", n: "Michael A.", p: "Lagos" },
  { q: "We booked an airport transfer for our visiting clients and everything went smoothly.", n: "Ada N.", p: "Victoria Island" },
  { q: "The driver arrived early and the entire experience felt professional.", n: "Chinedu O.", p: "Lekki" },
  { q: "Used the Highlander for a family weekend. Spacious, quiet, and well maintained.", n: "Tomi K.", p: "Ikoyi" },
];

const gallery = [
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1544620341-11cb2cd7c62d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=80",
];

function daysBetween(a: string, b: string) {
  if (!a || !b) return 1;
  const d = Math.ceil((+new Date(b) - +new Date(a)) / 86400000);
  return Math.max(1, d);
}

export default function Site() {
  const [dark, setDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [detail, setDetail] = useState<Vehicle | null>(null);
  const [galleryIdx, setGalleryIdx] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [review, setReview] = useState(0);
  const [compare, setCompare] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [pickup, setPickup] = useState("Lagos");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vtype, setVtype] = useState("All Cars");
  const [sel, setSel] = useState<Vehicle>(vehicles[0]);
  const [option, setOption] = useState<"Self Drive" | "With Driver">("With Driver");
  const [delivery, setDelivery] = useState<"Pick up at location" | "Deliver to me">("Pick up at location");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loc, setLoc] = useState("Victoria Island");
  const [note, setNote] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const list = useMemo(
    () =>
      vehicles.filter((v) => {
        const byCat = filter === "all" || v.category === filter;
        const byType =
          vtype === "All Cars" ||
          (vtype === "SUVs" && v.category === "suv") ||
          (vtype === "Vans" && v.category === "van") ||
          v.category === vtype.toLowerCase();
        return byCat && (vtype === "All Cars" ? true : byType);
      }),
    [filter, vtype]
  );

  const nights = daysBetween(from, to);
  const estimate = sel.pricePerDay * nights;

  function wa(text: string) {
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  }

  function sendBooking() {
    const msg = `Hello DriveHaus, I'd like to book a ${sel.name} from ${from || "TBC"} to ${to || "TBC"}. Rental option: ${option}. Pick-up location: ${loc || pickup}. Delivery: ${delivery}. Name: ${name || "\u2014"}. Phone: ${phone || "\u2014"}. Please confirm availability and final price.`;
    wa(msg);
  }

  function toggleCompare(id: string) {
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]));
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <header className="sticky top-0 z-50 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#home" className="leading-tight">
            <div className="text-lg font-semibold tracking-tight">DriveHaus</div>
            <div className="text-[10px] tracking-[0.22em] text-[var(--muted)]">{site.descriptor}</div>
          </a>
          <nav className="hidden items-center gap-5 text-sm lg:flex">
            {nav.map(([l, h]) => (
              <a key={l} href={h} className="text-[var(--muted)] hover:text-[var(--fg)]">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button aria-label="Toggle theme" onClick={() => setDark((d) => !d)} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs">{dark ? "Light" : "Dark"}</button>
            <a href="#book" className="hidden rounded-full btn-primary px-4 py-2 text-sm sm:inline-block">Book a Car \u2192</a>
            <button className="lg:hidden rounded-md border border-[var(--line)] px-3 py-2" onClick={() => setMenu((m) => !m)} aria-label="Menu">\u2630</button>
          </div>
        </div>
        {menu && (
          <div className="grid gap-2 px-4 pb-4 lg:hidden">
            {nav.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMenu(false)} className="rounded-lg px-2 py-2 hover:bg-[var(--bg-elev)]">{l}</a>
            ))}
          </div>
        )}
      </header>

      <section id="home" className="relative min-h-[88vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80" alt="Premium vehicle in Lagos at golden hour" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-end">
          <div className="text-white">
            <div className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] tracking-[0.16em]">PREMIUM CAR RENTALS IN LAGOS</div>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">Drive the right car for every journey.</h1>
            <p className="mt-4 max-w-lg text-white/80">Reliable cars for business trips, airport transfers, weekend getaways, special occasions, and everyday mobility across Lagos.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cars" className="rounded-full btn-primary px-5 py-3">Browse Cars \u2192</a>
              <button onClick={() => wa("Hello DriveHaus, I would like to book a vehicle.")} className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white">Book on WhatsApp</button>
            </div>
          </div>
          <form id="search" className="glass rounded-3xl p-5 text-[var(--fg)] shadow-2xl" onSubmit={(e) => { e.preventDefault(); document.getElementById("cars")?.scrollIntoView(); }}>
            <div className="mb-4 text-sm font-medium">Find a car</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-[var(--muted)]">Pick-up Location
                <select className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elev)] px-3 py-2.5 text-sm" value={pickup} onChange={(e) => setPickup(e.target.value)}>{pickupOptions.map((o) => <option key={o}>{o}</option>)}</select>
              </label>
              <label className="text-xs text-[var(--muted)]">Vehicle Type
                <select className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elev)] px-3 py-2.5 text-sm" value={vtype} onChange={(e) => setVtype(e.target.value)}>{vehicleTypes.map((o) => <option key={o}>{o}</option>)}</select>
              </label>
              <label className="text-xs text-[var(--muted)]">Pick-up Date
                <input type="date" className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elev)] px-3 py-2.5 text-sm" value={from} onChange={(e) => setFrom(e.target.value)} />
              </label>
              <label className="text-xs text-[var(--muted)]">Return Date
                <input type="date" className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elev)] px-3 py-2.5 text-sm" value={to} onChange={(e) => setTo(e.target.value)} />
              </label>
            </div>
            <button className="btn-primary mt-4 w-full rounded-full py-3">Find a Car \u2192</button>
          </form>
        </div>
      </section>

      <div className="border-y border-[var(--line)] bg-[var(--bg-elev)]">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {["Well-Maintained Vehicles", "Flexible Rental Options", "Lagos & Abuja Availability", "WhatsApp Booking"].map((t) => (
            <div key={t} className="flex items-center gap-2"><span className="text-[var(--accent)]">\u2713</span> {t}</div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold">Find the right ride.</h2>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          <button onClick={() => setFilter("all")} className={`shrink-0 rounded-2xl border px-5 py-4 ${filter === "all" ? "border-[var(--accent)] bg-[var(--bg-elev)]" : "border-[var(--line)]"}`}>All</button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setFilter(c.id as CategoryId)} className={`shrink-0 rounded-2xl border px-5 py-4 ${filter === c.id ? "border-[var(--accent)] bg-[var(--bg-elev)]" : "border-[var(--line)]"}`}>
              <div>{c.icon}</div>
              <div className="mt-1 text-sm">{c.label}</div>
            </button>
          ))}
        </div>
      </section>

      <section id="cars" className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="text-3xl font-semibold">Popular rentals</h2>
        <p className="mt-2 text-[var(--muted)]">Choose from our selection of clean, well-maintained vehicles.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((v) => (
            <article key={v.id} className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg-elev)] transition hover:-translate-y-1">
              <div className="relative h-52">
                <img src={v.images[0]} alt={v.name} className="h-full w-full object-cover" />
                {v.badge && <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] tracking-widest text-white">{v.badge}</span>}
                <span className="absolute right-3 top-3 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] text-white">Available</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{v.name}</h3>
                    <p className="text-sm text-[var(--muted)]">{v.year} \u00b7 {v.transmission} \u00b7 {v.fuel} \u00b7 {v.seats} seats</p>
                  </div>
                  <div className="text-right text-sm">From<div className="font-semibold">{formatNaira(v.pricePerDay)} / day</div></div>
                </div>
                <label className="mt-3 flex items-center gap-2 text-xs text-[var(--muted)]">
                  <input type="checkbox" checked={compare.includes(v.id)} onChange={() => toggleCompare(v.id)} /> Compare
                </label>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setDetail(v)} className="flex-1 rounded-full border border-[var(--line)] py-2 text-sm">View Details</button>
                  <button onClick={() => { setSel(v); setBookOpen(true); }} className="flex-1 rounded-full btn-primary py-2 text-sm">Book Now</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => setFilter("all")} className="rounded-full border border-[var(--line)] px-5 py-2">View All Vehicles \u2192</button>
          <button disabled={compare.length < 2} onClick={() => setShowCompare(true)} className="rounded-full border border-[var(--line)] px-5 py-2 disabled:opacity-40">Compare Vehicles ({compare.length})</button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-semibold">More than just a car.</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {[
            ["Self-Drive Rental", "Enjoy the freedom to drive yourself.", "Valid driver's licence \u00b7 Identification \u00b7 Security deposit \u00b7 Rental agreement", "Explore Self Drive \u2192"],
            ["Car With Driver", "Perfect for executives, visitors, events, and airport transfers.", "Professional chauffeur \u00b7 Timed pickups \u00b7 Discreet service", "Book With Driver \u2192"],
            ["Corporate Rental", "Flexible transportation solutions for companies and teams.", "Account support \u00b7 Multiple vehicles \u00b7 Scheduled transport", "Ask About Corporate Rental \u2192"],
          ].map(([t, d, r, c]) => (
            <div key={t} className="rounded-3xl border border-[var(--line)] bg-[var(--bg-elev)] p-7">
              <h3 className="text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-[var(--muted)]">{d}</p>
              <p className="mt-4 text-sm">{r}</p>
              <button onClick={() => setBookOpen(true)} className="mt-6 text-sm font-medium">{c}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="relative my-10 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80" alt="Airport transfer in Lagos" className="h-[420px] w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-12 text-white">
          <h2 className="text-3xl font-semibold md:text-5xl">Landing in Lagos? We've got the ride.</h2>
          <p className="mt-3 max-w-xl text-white/80">Pre-book a comfortable vehicle and professional driver for airport pickup and drop-off.</p>
          <p className="mt-3 text-sm">Murtala Muhammed International Airport</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">{["Airport", "Hotel", "Residence", "Office"].map((x) => <span key={x} className="rounded-full border border-white/25 px-3 py-1">{x}</span>)}</div>
          <button onClick={() => { setOption("With Driver"); setPickup("Airport"); setBookOpen(true); }} className="btn-primary mt-6 w-fit rounded-full px-5 py-3">Book Airport Transfer \u2192</button>
        </div>
      </section>

      <section id="why" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold">Why rent with DriveHaus?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Clean, Maintained Cars", "Every vehicle is prepared before rental."],
            ["Flexible Rental Periods", "Daily, weekly, and longer-term options."],
            ["Easy Booking", "Book online or through WhatsApp."],
            ["Driver Options", "Choose self-drive or professional driver service."],
            ["Transparent Quotes", "Understand your rental before confirming."],
            ["Customer Support", "Help before, during, and after your rental."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-[var(--line)] p-6"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-[var(--muted)]">{d}</p></div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["01", "Choose Your Car", "Browse available vehicles."],
            ["02", "Select Your Dates", "Tell us when you need the vehicle."],
            ["03", "Confirm Your Booking", "Review details and receive confirmation."],
            ["04", "Pick Up & Drive", "Collect the vehicle or arrange delivery."],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-[var(--line)] p-5"><div className="text-sm text-[var(--accent)]">{n}</div><h3 className="mt-2 font-semibold">{t}</h3><p className="mt-1 text-sm text-[var(--muted)]">{d}</p></div>
          ))}
        </div>
        <a href="#book" className="btn-primary mt-8 inline-block rounded-full px-5 py-3">Start Booking \u2192</a>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold">Built around your journey.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Daily Rentals", "Flexible short-term vehicle rental."],
            ["Weekly Rentals", "Better flexibility for extended trips."],
            ["Monthly Rentals", "Longer-term transportation solutions."],
            ["Airport Transfers", "Comfortable airport pickup and drop-off."],
            ["Chauffeur Service", "Professional drivers for business and events."],
            ["Corporate Fleet Rental", "Vehicles for companies and teams."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-[var(--bg-elev)] p-6 border border-[var(--line)]"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-[var(--muted)]">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--bg-elev)] p-8 md:p-12">
          <h2 className="text-3xl font-semibold">Reliable mobility for your business.</h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">Need vehicles for employees, executives, visiting clients, or business operations? DriveHaus provides flexible corporate rental options.</p>
          <ul className="mt-6 grid gap-2 text-sm md:grid-cols-2">{["Dedicated account support", "Flexible rental periods", "Multiple vehicle options", "Driver services", "Scheduled transportation"].map((x) => <li key={x}\u2014 {x}</li>)}</ul>
          <button onClick={() => wa("Hello DriveHaus, I would like to speak with Corporate Rentals.")} className="btn-primary mt-8 rounded-full px-5 py-3">Talk to Corporate Rentals \u2192</button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold">Make an entrance.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Weddings", "Premium vehicles for the couple and bridal party."],
            ["Corporate Events", "Executive transportation for guests and teams."],
            ["Photoshoots", "Vehicles available for productions and creative projects."],
            ["VIP Events", "Luxury transportation for special occasions."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-[var(--line)] p-6"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-sm text-[var(--muted)]">{d}</p></div>
          ))}
        </div>
        <button onClick={() => setBookOpen(true)} className="mt-6 rounded-full border border-[var(--line)] px-5 py-3">Plan My Transport \u2192</button>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-semibold">Rental rates</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[["Economy", 65000], ["SUV", 120000], ["Luxury", 180000], ["Executive", 220000]].map(([t, p]) => (
            <div key={String(t)} className="rounded-2xl border border-[var(--line)] p-6">
              <div className="text-sm text-[var(--muted)]">{t}</div>
              <div className="mt-2 text-2xl font-semibold">From {formatNaira(p as number)}/day</div>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-sm text-[var(--muted)]">Rates shown are sample starting prices for demonstration purposes. Final rates depend on vehicle availability, rental duration, driver option, delivery location, security deposit, and other rental terms.</p>
        <a href="#cars" className="mt-4 inline-block text-sm font-medium">Check Vehicle Availability \u2192</a>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold">See the fleet.</h2>
        <div className="mt-8 columns-2 gap-3 md:columns-3">
          {gallery.map((src, i) => (
            <button key={src} onClick={() => setGalleryIdx(i)} className="mb-3 block w-full overflow-hidden rounded-2xl">
              <img src={src} alt={`DriveHaus fleet ${i + 1}`} className="w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-semibold">What clients say</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">Fictional demo testimonials.</p>
        <div className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--bg-elev)] p-8">
          <p className="text-xl leading-relaxed">&ldquo;{reviews[review].q}&rdquo;</p>
          <p className="mt-4 text-sm text-[var(--muted)]">{reviews[review].n} \u2014 {reviews[review].p}</p>
          <div className="mt-6 flex gap-2">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setReview(i)} className={`h-2 w-8 rounded-full ${i === review ? "bg-[var(--accent)]" : "bg-[var(--line)]"}`} aria-label={`Review ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold">Available across Lagos</h2>
        <div className="mt-6 flex flex-wrap gap-2">{site.locations.map((l) => <span key={l} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">{l}</span>)}</div>
        <p className="mt-4 text-sm text-[var(--muted)]">Ask about Abuja bookings.</p>
        <div className="mt-6 h-40 rounded-3xl bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800" />
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-8">
        <h2 className="text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {faqs.map(([q, a], i) => (
            <div key={q}>
              <button className="flex w-full items-center justify-between py-4 text-left" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <span>{q}</span><span>{faqOpen === i ? "\u2013" : "+"}</span>
              </button>
              {faqOpen === i && <p className="pb-4 text-sm text-[var(--muted)]">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section id="book" className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-semibold">Book your ride</h2>
        <div className="mt-8 grid gap-6 rounded-3xl border border-[var(--line)] bg-[var(--bg-elev)] p-6">
          <label className="text-sm">1. Choose your car
            <select className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2" value={sel.id} onChange={(e) => setSel(vehicles.find((v) => v.id === e.target.value) || vehicles[0])}>
              {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name} \u2014 from {formatNaira(v.pricePerDay)}/day</option>)}
            </select>
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">2. Pick-up date<input type="date" className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2" value={from} onChange={(e) => setFrom(e.target.value)} /></label>
            <label className="text-sm">Return date<input type="date" className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2" value={to} onChange={(e) => setTo(e.target.value)} /></label>
          </div>
          <div>
            <div className="text-sm">3. Rental option</div>
            <div className="mt-2 flex gap-2">{(["Self Drive", "With Driver"] as const).map((o) => <button key={o} onClick={() => setOption(o)} className={`rounded-full px-4 py-2 text-sm border ${option === o ? "border-[var(--accent)]" : "border-[var(--line)]"}`}>{o}</button>)}</div>
          </div>
          <div>
            <div className="text-sm">4. Pick-up / delivery</div>
            <div className="mt-2 flex flex-wrap gap-2">{(["Pick up at location", "Deliver to me"] as const).map((o) => <button key={o} onClick={() => setDelivery(o)} className={`rounded-full px-4 py-2 text-sm border ${delivery === o ? "border-[var(--accent)]" : "border-[var(--line)]"}`}>{o}</button>)}</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input placeholder="Full Name" className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Phone Number" className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input placeholder="Email" className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Pick-up Location" className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2" value={loc} onChange={(e) => setLoc(e.target.value)} />
            <textarea placeholder="Special Request" className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2 sm:col-span-2" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="rounded-2xl border border-[var(--line)] p-4 text-sm">
            <div className="font-semibold">{sel.name}</div>
            <div>{nights} Day{nights > 1 ? "s" : ""} \u00b7 {formatNaira(sel.pricePerDay)} \u00d7 {nights}</div>
            <div className="mt-2 text-lg font-semibold">Estimated rental: {formatNaira(estimate)}</div>
            <p className="mt-2 text-xs text-[var(--muted)]">Final price may vary based on vehicle availability, delivery, duration, deposit, insurance, and selected options.</p>
          </div>
          <button onClick={sendBooking} className="btn-primary rounded-full py-3">Continue on WhatsApp \u2192</button>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=2000&q=80" alt="Night-time premium vehicle" className="h-[380px] w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4 text-white">
          <h2 className="text-4xl font-semibold">Your next journey starts here.</h2>
          <p className="mt-3 text-white/80">Choose your car, pick your dates, and let DriveHaus handle the rest.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#book" className="btn-primary rounded-full px-5 py-3">Book a Car \u2192</a>
            <button onClick={() => wa("Hello DriveHaus")} className="rounded-full border border-white/30 px-5 py-3">WhatsApp Us</button>
          </div>
          <p className="mt-4 text-sm">{site.phone}</p>
        </div>
      </section>

      <footer id="contact" className="border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-4">
          <div><div className="text-lg font-semibold">DriveHaus Rentals</div><p className="mt-2 text-sm text-[var(--muted)]">{site.tagline}</p></div>
          <div><div className="text-sm font-semibold">Fleet</div><ul className="mt-3 space-y-1 text-sm text-[var(--muted)]"><li>Economy</li><li>SUVs</li><li>Luxury</li><li>Executive</li><li>Vans</li></ul></div>
          <div><div className="text-sm font-semibold">Services</div><ul className="mt-3 space-y-1 text-sm text-[var(--muted)]"><li>Self Drive</li><li>Chauffeur</li><li>Airport Transfers</li><li>Corporate Rentals</li><li>Long-Term Rentals</li></ul></div>
          <div><div className="text-sm font-semibold">Contact</div><ul className="mt-3 space-y-1 text-sm text-[var(--muted)]"><li>{site.location}</li><li>{site.phone}</li><li>{site.email}</li><li>Mon \u2013 Sun</li><li>7:00 AM \u2013 10:00 PM</li></ul></div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 pb-8 text-sm text-[var(--muted)]">
          <div className="flex gap-4"><a href={site.social.instagram}>Instagram</a><a href={site.social.facebook}>Facebook</a><a href={site.social.tiktok}>TikTok</a><a href={site.social.linkedin}>LinkedIn</a></div>
          <div>\u00a9 2026 DriveHaus Rentals. All rights reserved.</div>
        </div>
      </footer>

      <a href="#book" className="fixed bottom-5 left-5 z-40 hidden rounded-full btn-primary px-5 py-3 shadow-xl md:inline-block">Book a Car</a>
      <a href="#book" className="fixed bottom-5 left-4 right-20 z-40 rounded-full btn-primary py-3 text-center shadow-xl md:hidden">Book Now</a>
      <button onClick={() => wa("Hello DriveHaus")} className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl" aria-label="WhatsApp">WA</button>

      {detail && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/70 p-4">
          <div className="mx-auto max-w-3xl rounded-3xl bg-[var(--bg)] p-5">
            <img src={detail.images[0]} alt={detail.name} className="h-64 w-full rounded-2xl object-cover" />
            <div className="mt-4 flex items-start justify-between"><h3 className="text-2xl font-semibold">{detail.name}</h3><button onClick={() => setDetail(null)}>Close</button></div>
            <p className="mt-1">From {formatNaira(detail.pricePerDay)}/day</p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm"><li>{detail.year}</li><li>{detail.transmission}</li><li>{detail.fuel}</li><li>{detail.seats} seats</li><li>Air conditioning</li><li>Bluetooth</li><li>USB</li><li>Reverse camera</li></ul>
            <p className="mt-4 text-sm text-[var(--muted)]">{detail.description}</p>
            <div className="mt-4 text-sm">Self Drive \u2014 available subject to requirements.<br />With Driver \u2014 professional driver available.</div>
            <div className="mt-5 flex gap-2">
              <button className="btn-primary rounded-full px-5 py-2" onClick={() => { setSel(detail); setDetail(null); setBookOpen(true); }}>Book This Car \u2192</button>
              <button className="rounded-full border border-[var(--line)] px-5 py-2" onClick={() => wa(`Hello DriveHaus, I have a question about the ${detail.name}.`)}>Ask on WhatsApp \u2192</button>
            </div>
          </div>
        </div>
      )}

      {showCompare && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/70 p-4">
          <div className="mx-auto max-w-5xl rounded-3xl bg-[var(--bg)] p-5">
            <div className="flex justify-between"><h3 className="text-xl font-semibold">Compare vehicles</h3><button onClick={() => setShowCompare(false)}>Close</button></div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr><th className="p-2 text-left"> </th>{compare.map((id) => { const v = vehicles.find((x) => x.id === id)!; return <th key={id} className="p-2 text-left">{v.name}</th>; })}</tr></thead>
                <tbody>
                  {([
                    ["Price", (v: Vehicle) => formatNaira(v.pricePerDay) + "/day"],
                    ["Seats", (v: Vehicle) => String(v.seats)],
                    ["Transmission", (v: Vehicle) => v.transmission],
                    ["Fuel", (v: Vehicle) => v.fuel],
                    ["Year", (v: Vehicle) => String(v.year)],
                    ["Air conditioning", (v: Vehicle) => (v.ac ? "Yes" : "No")],
                    ["Reverse camera", (v: Vehicle) => (v.reverseCamera ? "Yes" : "No")],
                    ["Driver option", (v: Vehicle) => (v.driverOption ? "Yes" : "No")],
                  ] as [string, (v: Vehicle) => string][]).map(([label, fn]) => (
                    <tr key={label} className="border-t border-[var(--line)]">
                      <td className="p-2 text-[var(--muted)]">{label}</td>
                      {compare.map((id) => { const v = vehicles.find((x) => x.id === id)!; return <td key={id} className="p-2">{fn(v)}</td>; })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {galleryIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setGalleryIdx(null)}>
          <img src={gallery[galleryIdx]} alt="Fleet gallery" className="max-h-[85vh] max-w-full rounded-2xl" />
        </div>
      )}

      {bookOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/70 p-4">
          <div className="mx-auto max-w-lg rounded-3xl bg-[var(--bg)] p-6">
            <div className="flex justify-between"><h3 className="text-xl font-semibold">Quick book</h3><button onClick={() => setBookOpen(false)}>Close</button></div>
            <p className="mt-2 text-sm text-[var(--muted)]">{sel.name}</p>
            <button onClick={sendBooking} className="btn-primary mt-4 w-full rounded-full py-3">Continue on WhatsApp \u2192</button>
            <a href="#book" onClick={() => setBookOpen(false)} className="mt-3 block text-center text-sm">Open full booking form</a>
          </div>
        </div>
      )}
    </div>
  );
}
