// PhotocopyOrderForm.jsx
// Informational service page — matches LanyardOrderForm layout structure.

// ── Shared primitives (mirrors LanyardOrderForm) ───────────────────────────────
function SectionCard({ title, icon, children }) {
return (
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
    <span className="text-xl">{icon}</span>
    <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">{title}</h2>
    </div>
    <div className="px-6 py-5">{children}</div>
</div>
)
}

// ── Static data ────────────────────────────────────────────────────────────────
const SERVICES = [
{ icon: "🖤", title: "Black & White Photocopy",  desc: "Fast monochrome copies for documents, forms, reports, and school requirements." },
{ icon: "🎨", title: "Colored Photocopy",         desc: "Vibrant full-color reproduction for presentations, photos, and marketing materials." },
{ icon: "🔍", title: "Document Scanning",         desc: "High-resolution scans saved to USB or emailed as PDF or JPG." },
{ icon: "🖨️", title: "Document Printing",         desc: "Print from USB, email, or cloud. Supports PDF, Word, Excel, and image files." },
]

const PRICING = [
{
category: "Black & White",
icon: "🖤",
rows: [
    { label: "Short Bond (A4)",   price: "₱2",  unit: "/ page" },
    { label: "Long Bond (Legal)", price: "₱3",  unit: "/ page" },
],
},
{
category: "Colored",
icon: "🎨",
rows: [
    { label: "Short Bond (A4)",   price: "₱10", unit: "/ page" },
    { label: "Long Bond (Legal)", price: "₱12", unit: "/ page" },
],
},
{
category: "Scanning",
icon: "🔍",
rows: [
    { label: "Per page",          price: "₱5",  unit: "/ page" },
    { label: "Bulk (20+ pages)",  price: "₱3",  unit: "/ page" },
],
},
]

const PAPER_OPTIONS = [
{ icon: "📄", label: "Short Bond",      sub: "A4 · 8.5\" × 11\"" },
{ icon: "📃", label: "Long Bond",       sub: "Legal · 8.5\" × 14\"" },
{ icon: "✨", label: "Specialty Paper", sub: "Glossy, Matte, Card Stock" },
]

const TURNAROUND = [
{ icon: "⚡", type: "Walk-in",                   time: "Same Day",           note: "Ready while you wait for small batches." },
{ icon: "📦", type: "Bulk (50–200 pages)",        time: "Within the Day",     note: "Drop off in the morning, pick up by afternoon." },
{ icon: "🗓️", type: "Large Volume (200+ pages)",  time: "1–2 Business Days",  note: "We'll notify you via SMS once your order is ready." },
]

const STEPS = [
{ n: "01", title: "Visit or Contact Us",       desc: "Walk in to our store or send us a message to get started." },
{ n: "02", title: "Bring Your Files",          desc: "USB drive, email attachment, or a printed copy — we accept them all." },
{ n: "03", title: "Choose Paper & Quantity",   desc: "Tell us the paper size and number of copies you need." },
{ n: "04", title: "Wait or Return for Pickup", desc: "Small jobs are done on the spot; larger orders can be scheduled for pickup." },
]

const QUICK_FACTS = [
{ label: "B&W per page",     value: "from ₱2"        },
{ label: "Colored per page", value: "from ₱10"       },
{ label: "Scanning",         value: "from ₱3"        },
{ label: "Walk-in",          value: "Same day"       },
{ label: "Bulk orders",      value: "1–2 days"       },
{ label: "Hours",            value: "Mon–Sat 8AM–6PM"},
]

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PhotocopyOrderForm() {
return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Hero banner */}
    <div className="rounded-2xl bg-red-500 px-8 py-8 text-white overflow-hidden relative">
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-red-400 opacity-40" />
        <div className="absolute bottom-0 right-20 w-28 h-28 rounded-full bg-red-600 opacity-30" />
        <div className="relative z-10">
        <span className="inline-block bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Walk-in &amp; Pre-order Available
        </span>
        <h1 className="text-2xl font-black tracking-tight mb-2">Photocopy Services</h1>
        <p className="text-white/80 text-sm leading-relaxed max-w-lg">
            Fast, affordable, and high-quality photocopying for your documents, school
            requirements, and business needs. From single pages to bulk orders — we've got
            you covered.
        </p>
        </div>
    </div>

    {/* Services Offered */}
    <SectionCard title="Services Offered" icon="📋">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICES.map(({ icon, title, desc }) => (
            <div
            key={title}
            className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50"
            >
            <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
            <div>
                <p className="text-sm font-black text-gray-800">{title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
            </div>
            </div>
        ))}
        </div>
    </SectionCard>

    {/* Pricing Table */}
    <SectionCard title="Pricing" icon="💰">
        <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRICING.map(({ category, icon, rows }) => (
            <div
                key={category}
                className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden"
            >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-white">
                <span className="text-base">{icon}</span>
                <span className="text-xs font-black text-gray-700 uppercase tracking-wide">{category}</span>
                </div>
                <div className="px-4 py-3 flex flex-col gap-2.5">
                {rows.map(({ label, price, unit }) => (
                    <div key={label} className="flex items-end justify-between gap-2">
                    <span className="text-[11px] text-gray-500 leading-tight">{label}</span>
                    <span className="shrink-0 text-right">
                        <span className="text-base font-black text-gray-900">{price}</span>
                        <span className="text-[10px] text-gray-400 ml-0.5">{unit}</span>
                    </span>
                    </div>
                ))}
                </div>
            </div>
            ))}
        </div>

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
            <span className="shrink-0">💡</span>
            <p>
            <strong>Bulk Discount:</strong> Orders of 50 pages or more get a reduced
            rate. Ask our staff for the latest bulk pricing when you visit.
            </p>
        </div>
        </div>
    </SectionCard>

    {/* Paper Options */}
    <SectionCard title="Paper Options" icon="📄">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PAPER_OPTIONS.map(({ icon, label, sub }) => (
            <div
            key={label}
            className="flex items-center gap-4 px-4 py-4 rounded-xl border border-gray-100 bg-gray-50"
            >
            <span className="text-2xl shrink-0">{icon}</span>
            <div>
                <p className="text-sm font-black text-gray-800">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
            </div>
            </div>
        ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
        * Specialty paper may require advance notice. Please contact us to confirm availability.
        </p>
    </SectionCard>

    {/* Turnaround Time */}
    <SectionCard title="Turnaround Time" icon="⏱️">
        <div className="flex flex-col gap-3">
        {TURNAROUND.map(({ icon, type, time, note }) => (
            <div
            key={type}
            className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50"
            >
            <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-gray-800">{type}</p>
                <p className="text-xs text-gray-500 mt-0.5">{note}</p>
            </div>
            <span className="shrink-0 text-xs font-black text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full whitespace-nowrap">
                {time}
            </span>
            </div>
        ))}
        </div>
    </SectionCard>

    {/* How to Avail */}
    <SectionCard title="How to Avail" icon="📝">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {STEPS.map(({ n, title, desc }) => (
            <div
            key={n}
            className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50"
            >
            <div className="shrink-0 w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center font-black text-xs">
                {n}
            </div>
            <div>
                <p className="text-sm font-black text-gray-800">{title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
            </div>
            </div>
        ))}
        </div>
    </SectionCard>

    </div>

    {/* ── RIGHT: Info Panel (mirrors Summary sidebar) ──── */}
    <div className="xl:col-span-1">
    <div className="sticky top-6 flex flex-col gap-4">

        {/* Quick Reference Card — mirrors SummaryCard */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-linear-to-r from-red-500 to-red-600">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/90">Quick Reference</h2>
        </div>

        <div className="px-6 py-4 flex flex-col gap-2">
            {QUICK_FACTS.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-2 text-sm">
                <span className="text-gray-400 shrink-0">{label}</span>
                <span className="text-right text-gray-700 font-semibold">{value}</span>
            </div>
            ))}
        </div>

        <div className="mx-6 border-t border-gray-100" />

        <div className="px-6 py-4">
            <div className="flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Bulk savings</span>
            <span className="text-lg font-black text-red-500">50+ pages</span>
            </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-3">
            <a
            href="tel:+639XXXXXXXXX"
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all text-center block"
            >
            📞 Call Now
            </a>
            <a
            href="https://m.me/"
            className="w-full py-3 bg-white border-2 border-red-500 hover:bg-red-50 text-red-500 text-sm font-black uppercase tracking-widest rounded-xl transition-all text-center block"
            >
            💬 Message Us
            </a>
            <p className="text-[11px] text-gray-400 text-center mt-1">
            No appointment needed for walk-in orders.
            </p>
        </div>
        </div>

        {/* Store Info Card — mirrors HelpCard */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🏪</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Visit Us</h3>
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>📞</span>
            <span className="font-semibold">+63 9XX XXX XXXX</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>📧</span>
            <span className="font-semibold">hello@yourprintshop.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>🕐</span>
            <span className="font-semibold">Mon – Sat · 8:00 AM – 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>📍</span>
            <span className="font-semibold">123 Sample St., Your City</span>
            </div>
        </div>
        </div>

    </div>
    </div>

</div>
)
}