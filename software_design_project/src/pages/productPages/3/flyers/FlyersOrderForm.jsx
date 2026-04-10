import { useState, useRef, useEffect } from "react"

// ── Shared primitives (matching existing codebase style) ───────────────────────
const inputCls =
"w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 " +
"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition placeholder:text-gray-400"

const selectCls = inputCls + " cursor-pointer"

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

function Field({ label, hint, children, required }) {
return (
<div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
    {label}
    {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {hint && <p className="text-[11px] text-gray-400 -mt-0.5">{hint}</p>}
    {children}
</div>
)
}

function ToggleBtn({ active, onClick, children }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex-1 py-2.5 text-sm font-bold border rounded-xl transition-all ${
    active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

function PillGroup({ options, value, onChange }) {
return (
<div className="flex flex-wrap gap-2">
    {options.map((opt) => {
    const val = opt.value ?? opt
    const lbl = opt.label ?? opt
    return (
        <button
        key={val}
        type="button"
        onClick={() => onChange(val)}
        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
            val === value
            ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
            : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
        }`}
        >
        {lbl}
        </button>
    )
    })}
</div>
)
}

function CardOption({ label, sublabel, active, onClick, badge }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all w-full ${
    active ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <div
    className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
        active ? "border-red-500 bg-red-500" : "border-gray-300"
    }`}
    />
    <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 flex-wrap">
        <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
        {badge && (
        <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
            {badge}
        </span>
        )}
    </div>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{sublabel}</p>}
    </div>
</button>
)
}

// ── Size presets ───────────────────────────────────────────────────────────────
const SIZE_PRESETS = [
{ label: "A6", w: "4.1", h: "5.8", unit: "in" },
{ label: "A5", w: "5.8", h: "8.3", unit: "in" },
{ label: "A4", w: "8.3", h: "11.7", unit: "in" },
{ label: "Letter", w: "8.5", h: "11", unit: "in" },
{ label: "Custom", w: null, h: null, unit: "in" },
]

// ── Pricing ────────────────────────────────────────────────────────────────────
const PAPER_BASE = {
"Bond Paper": 2,
"Glossy Paper": 5,
"Matte Paper": 5,
Cardstock: 8,
}

function computePrice({ paperType, printType, sides, folding, lamination, qty }) {
let unit = PAPER_BASE[paperType] ?? 2
if (printType === "Full Color") unit += 3
if (sides === "Double-sided") unit += 2
if (folding !== "None") unit += 1
if (lamination !== "None") unit += 2
return { unitPrice: unit, total: unit * qty }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function FlyersOrderForm() {
// A. Flyer Details
const [sizePreset, setSizePreset] = useState("A5")
const [width, setWidth]           = useState("5.8")
const [height, setHeight]         = useState("8.3")
const [dimUnit, setDimUnit]       = useState("in")
const [qty, setQty]               = useState(100)

// B. Paper
const [paperType, setPaperType]   = useState("Glossy Paper")
const [paperGsm, setPaperGsm]     = useState("120 GSM")

// C. Printing
const [printType, setPrintType]   = useState("Full Color")
const [sides, setSides]           = useState("Single-sided")

// D. Finishing
const [folding, setFolding]       = useState("None")
const [lamination, setLamination] = useState("None")

// E. Design
const [file, setFile]                   = useState(null)
const [needsDesign, setNeedsDesign]     = useState(false)
const [instructions, setInstructions]   = useState("")
const fileRef = useRef()

// F. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Errors
const [errors, setErrors] = useState({})

// Sync size preset
useEffect(() => {
const p = SIZE_PRESETS.find((p) => p.label === sizePreset)
if (p && p.w !== null) {
    setWidth(p.w)
    setHeight(p.h)
    setDimUnit(p.unit)
}
}, [sizePreset])

const validate = () => {
const e = {}
if (!parseFloat(width) || parseFloat(width) <= 0) e.width = "Enter a valid width"
if (!parseFloat(height) || parseFloat(height) <= 0) e.height = "Enter a valid height"
if (!qty || qty < 1) e.qty = "Minimum quantity is 1"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(
    `✅ Order submitted!\n\nFlyers – ${sizePreset === "Custom" ? `${width}×${height} ${dimUnit}` : sizePreset}\nQty: ${qty.toLocaleString()} pcs\nPaper: ${paperType} (${paperGsm})\nPrint: ${printType} · ${sides}\nTotal: ₱${total.toLocaleString()}`
)
}

const { unitPrice, total } = computePrice({ paperType, printType, sides, folding, lamination, qty })

const sizeLabel =
sizePreset === "Custom"
    ? `${width || "—"} × ${height || "—"} ${dimUnit}`
    : sizePreset

const summaryRows = [
{ label: "Size",       value: sizeLabel },
{ label: "Quantity",   value: `${qty.toLocaleString()} pc${qty > 1 ? "s" : ""}` },
{ label: "Paper Type", value: paperType },
{ label: "Paper Weight", value: paperGsm },
{ label: "Print Type", value: printType },
{ label: "Sides",      value: sides },
{ label: "Folding",    value: folding },
{ label: "Lamination", value: lamination },
]

const GSM_OPTIONS = ["80 GSM", "120 GSM", "170 GSM", "220 GSM"]

const FOLDING_OPTIONS = [
{ val: "None",      icon: "🚫", desc: "No folding — flat flyer as-is" },
{ val: "Half Fold", icon: "📄", desc: "+₱1/pc — folded in half (4 panels)" },
{ val: "Tri-Fold",  icon: "📃", desc: "+₱1/pc — 3 equal panels, classic brochure" },
]

const LAMINATION_OPTIONS = [
{ val: "None",   icon: "🚫", desc: "No coating" },
{ val: "Glossy", icon: "✨", desc: "+₱2/pc — shiny, vivid finish" },
{ val: "Matte",  icon: "🎞️", desc: "+₱2/pc — soft, non-glare finish" },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT: Form ───────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Flyer Details */}
    <SectionCard title="Flyer Details" icon="📄">
        <div className="flex flex-col gap-5">

        {/* Unit toggle */}
        <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Dimensions</span>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden text-xs font-bold">
            {["in", "cm"].map((u) => (
                <button
                key={u}
                type="button"
                onClick={() => setDimUnit(u)}
                className={`px-4 py-1.5 transition-all ${
                    dimUnit === u ? "bg-red-500 text-white" : "bg-white text-gray-500 hover:bg-red-50"
                }`}
                >
                {u}
                </button>
            ))}
            </div>
        </div>

        {/* Size preset pills */}
        <Field label="Paper Size">
            <PillGroup
            options={SIZE_PRESETS.map((p) => ({ label: p.label, value: p.label }))}
            value={sizePreset}
            onChange={setSizePreset}
            />
        </Field>

        {/* Size info badge for standard sizes */}
        {sizePreset !== "Custom" && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 text-xs text-blue-700">
            <span>📐</span>
            <span>
                <strong>{sizePreset}</strong> — {width} × {height} {dimUnit}
            </span>
            </div>
        )}

        {/* Custom W × H */}
        {sizePreset === "Custom" && (
            <div className="grid grid-cols-2 gap-4">
            <Field label={`Width (${dimUnit})`} required>
                <input
                type="number"
                min={0.1}
                step={0.1}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className={inputCls + (errors.width ? " border-red-400 ring-1 ring-red-300" : "")}
                placeholder="e.g. 5.8"
                />
                {errors.width && <p className="text-[11px] text-red-500 mt-0.5">{errors.width}</p>}
            </Field>
            <Field label={`Height (${dimUnit})`} required>
                <input
                type="number"
                min={0.1}
                step={0.1}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={inputCls + (errors.height ? " border-red-400 ring-1 ring-red-300" : "")}
                placeholder="e.g. 8.3"
                />
                {errors.height && <p className="text-[11px] text-red-500 mt-0.5">{errors.height}</p>}
            </Field>
            </div>
        )}

        {/* Quantity */}
        <Field label="Quantity (pieces)" required hint="Bulk orders get better unit pricing — minimum 1 pc">
            <div className="flex flex-col gap-2">
            <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
                placeholder="e.g. 500"
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
            <div className="flex gap-2 flex-wrap">
                {[100, 250, 500, 1000, 2000, 5000].map((q) => (
                <button
                    key={q}
                    type="button"
                    onClick={() => setQty(q)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    qty === q
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-500 border-gray-200 hover:border-red-300 hover:text-red-500"
                    }`}
                >
                    {q.toLocaleString()}
                </button>
                ))}
            </div>
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Paper Options */}
    <SectionCard title="Paper Options" icon="🗂️">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Paper Type */}
        <Field label="Paper Type">
            <div className="flex flex-col gap-2">
            {[
                { val: "Bond Paper",   icon: "📋", desc: "Standard writing paper — economical",   price: "₱2/pc base" },
                { val: "Glossy Paper", icon: "✨", desc: "Shiny finish — vibrant image quality",  price: "₱5/pc base" },
                { val: "Matte Paper",  icon: "🎞️", desc: "Soft finish — no glare, premium feel", price: "₱5/pc base" },
                { val: "Cardstock",    icon: "🃏", desc: "Thick, sturdy — upscale presentation",  price: "₱8/pc base" },
            ].map(({ val, icon, desc, price }) => (
                <button
                key={val}
                type="button"
                onClick={() => setPaperType(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    paperType === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <span className="text-lg mt-0.5">{icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className={`text-sm font-bold ${paperType === val ? "text-red-700" : "text-gray-700"}`}>
                        {val}
                    </p>
                    <span className="text-[10px] font-bold text-gray-400">{price}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                <div
                    className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
                    paperType === val ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`}
                />
                </button>
            ))}
            </div>
        </Field>

        {/* Paper Weight */}
        <Field label="Paper Weight (GSM)" hint="Higher GSM = thicker, sturdier paper">
            <div className="flex flex-col gap-2">
            {[
                { val: "80 GSM",  desc: "Thin — ideal for basic handouts" },
                { val: "120 GSM", desc: "Standard — everyday flyers and ads" },
                { val: "170 GSM", desc: "Heavyweight — quality promotional material" },
                { val: "220 GSM", desc: "Cardstock-grade — premium feel" },
            ].map(({ val, desc }) => (
                <button
                key={val}
                type="button"
                onClick={() => setPaperGsm(val)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all ${
                    paperGsm === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <div
                    className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                    paperGsm === val ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`}
                />
                <div className="flex-1">
                    <p className={`text-sm font-bold ${paperGsm === val ? "text-red-700" : "text-gray-700"}`}>
                    {val}
                    </p>
                    <p className="text-[11px] text-gray-400">{desc}</p>
                </div>
                {/* Thickness bar */}
                <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                    className={`h-full rounded-full ${paperGsm === val ? "bg-red-400" : "bg-gray-300"}`}
                    style={{
                        width:
                        val === "80 GSM" ? "25%" :
                        val === "120 GSM" ? "50%" :
                        val === "170 GSM" ? "75%" : "100%",
                    }}
                    />
                </div>
                </button>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Printing Options */}
    <SectionCard title="Printing Options" icon="🖨️">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Print Type */}
        <Field label="Print Type">
            <div className="flex flex-col gap-2">
            <CardOption
                label="Black & White"
                sublabel="Cost-effective — ideal for text-heavy flyers"
                active={printType === "Black & White"}
                onClick={() => setPrintType("Black & White")}
            />
            <CardOption
                label="Full Color"
                sublabel="Vibrant CMYK printing for image-rich designs"
                active={printType === "Full Color"}
                onClick={() => setPrintType("Full Color")}
                badge="+₱3/pc"
            />
            </div>
        </Field>

        {/* Sides */}
        <Field label="Print Sides">
            <div className="flex flex-col gap-2">
            <CardOption
                label="Single-sided"
                sublabel="Print on front face only"
                active={sides === "Single-sided"}
                onClick={() => setSides("Single-sided")}
            />
            <CardOption
                label="Double-sided"
                sublabel="Print on both front and back"
                active={sides === "Double-sided"}
                onClick={() => setSides("Double-sided")}
                badge="+₱2/pc"
            />
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Finishing Options */}
    <SectionCard title="Finishing Options" icon="💎">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Folding */}
        <Field label="Folding">
            <div className="flex flex-col gap-2">
            {FOLDING_OPTIONS.map(({ val, icon, desc }) => (
                <button
                key={val}
                type="button"
                onClick={() => setFolding(val)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    folding === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <span className="text-lg">{icon}</span>
                <div className="flex-1">
                    <p className={`text-sm font-bold ${folding === val ? "text-red-700" : "text-gray-700"}`}>
                    {val}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                <div
                    className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                    folding === val ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`}
                />
                </button>
            ))}
            </div>
        </Field>

        {/* Lamination */}
        <Field label="Lamination">
            <div className="flex flex-col gap-2">
            {LAMINATION_OPTIONS.map(({ val, icon, desc }) => (
                <button
                key={val}
                type="button"
                onClick={() => setLamination(val)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    lamination === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}
                >
                <span className="text-lg">{icon}</span>
                <div className="flex-1">
                    <p className={`text-sm font-bold ${lamination === val ? "text-red-700" : "text-gray-700"}`}>
                    {val}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                <div
                    className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                    lamination === val ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`}
                />
                </button>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Design Section */}
    <SectionCard title="Design" icon="🎨">
        <div className="flex flex-col gap-5">

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <span className="shrink-0 text-base">💡</span>
            <p>
            For best results, provide a print-ready file at <strong>300 DPI</strong> with{" "}
            <strong>3mm bleed</strong> on all sides. We accept CMYK or RGB files.
            </p>
        </div>

        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI, EPS accepted · 300 DPI recommended">
            <div
            onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className="text-3xl group-hover:scale-110 transition-transform">
                {file ? "✅" : "📁"}
            </span>
            {file ? (
                <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
            ) : (
                <>
                <p className="text-xs text-gray-500 text-center font-semibold">
                    Click to browse or drag & drop your artwork
                </p>
                <p className="text-[11px] text-gray-400">PDF preferred for print production</p>
                </>
            )}
            <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf,.ai,.eps"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0] || null)}
            />
            </div>
        </Field>

        {file && (
            <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
                <span>📎</span>
                <span className="text-xs font-semibold text-green-700 break-all">{file.name}</span>
            </div>
            <button
                type="button"
                onClick={() => setFile(null)}
                className="text-xs text-red-400 hover:text-red-600 font-bold ml-2 shrink-0"
            >
                Remove
            </button>
            </div>
        )}

        {/* Design assistance checkbox */}
        <label className="flex items-start gap-3 cursor-pointer select-none group">
            <div
            onClick={() => setNeedsDesign(!needsDesign)}
            className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
                needsDesign
                ? "bg-red-500 border-red-500"
                : "bg-white border-gray-300 group-hover:border-red-400"
            }`}
            >
            {needsDesign && <span className="text-white text-[10px] font-black">✓</span>}
            </div>
            <span className="text-sm text-gray-700 leading-snug">
            I need <strong>design assistance</strong> — please help me create or refine my artwork.
            </span>
        </label>

        {needsDesign && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span>🖌️</span>
            <p>
                Our design team will reach out to discuss your concept, layout, and content. Design
                assistance fees may apply depending on complexity.
            </p>
            </div>
        )}

        <Field label="Special Instructions" hint="Notes on layout, colors, fonts, bleed, or anything we should know">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Keep logo at top-right, use brand colors #FF0000 and #000000, add 3mm bleed..."
            className={inputCls + " resize-none"}
            />
        </Field>
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery Info" icon="🚚">
        <div className="flex flex-col gap-5">
        <Field label="Fulfillment Method">
            <div className="flex gap-3">
            <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>
                🏪 Pickup
            </ToggleBtn>
            <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>
                📦 Delivery
            </ToggleBtn>
            </div>
        </Field>

        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span>📍</span>
            <p>
                Ready for pickup at our store. You'll receive an SMS notification when your order is ready.
            </p>
            </div>
        )}

        {delivery === "Delivery" && (
            <Field
            label="Delivery Address"
            hint="Include barangay, city, and province"
            required
            >
            <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="e.g. 45 Rizal Ave., Brgy. Poblacion, Makati City, Metro Manila"
                className={
                inputCls +
                " resize-none" +
                (errors.address ? " border-red-400 ring-1 ring-red-300" : "")
                }
            />
            {errors.address && (
                <p className="text-[11px] text-red-500 mt-0.5">{errors.address}</p>
            )}
            </Field>
        )}
        </div>
    </SectionCard>

    </div>

    {/* ── RIGHT: Summary ───────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-35 flex flex-col gap-4">

        {/* Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-linear-to-r from-red-500 to-red-600">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/90">Order Summary</h2>
        </div>

        <div className="px-6 py-4 flex flex-col gap-2">
            {summaryRows.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-2 text-sm">
                <span className="text-gray-400 shrink-0">{label}</span>
                <span className="text-right text-gray-700 font-semibold">{value}</span>
            </div>
            ))}
        </div>

        <div className="mx-6 border-t border-gray-100" />

        {/* Pricing breakdown */}
        <div className="px-6 py-4 flex flex-col gap-1.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Pricing Breakdown</p>
            <div className="flex justify-between text-xs text-gray-500">
            <span>Base ({paperType})</span>
            <span>₱{PAPER_BASE[paperType]}/pc</span>
            </div>
            {printType === "Full Color" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>Full Color</span>
                <span>+₱3/pc</span>
            </div>
            )}
            {sides === "Double-sided" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>Double-sided</span>
                <span>+₱2/pc</span>
            </div>
            )}
            {folding !== "None" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>{folding}</span>
                <span>+₱1/pc</span>
            </div>
            )}
            {lamination !== "None" && (
            <div className="flex justify-between text-xs text-gray-500">
                <span>{lamination} Lamination</span>
                <span>+₱2/pc</span>
            </div>
            )}
            <div className="flex justify-between text-sm font-bold text-gray-700 border-t border-gray-100 pt-2 mt-1">
            <span>Price per piece</span>
            <span>₱{unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
            <span>× {qty.toLocaleString()} pcs</span>
            </div>
        </div>

        <div className="mx-6 mb-4 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-500">₱{total.toLocaleString()}</span>
        </div>

        <div className="px-6 pb-6">
            <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all"
            >
            Place Order →
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-3">
            Our team will confirm your order and send a payment link within 24 hours.
            </p>
        </div>
        </div>

        {/* Bulk savings nudge */}
        {qty < 500 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-lg">📢</span>
            <div>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Bulk Savings</p>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                Order 500+ pcs for better per-unit pricing. Ask us about bulk discounts!
            </p>
            </div>
        </div>
        )}

        {/* Help Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💬</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Need Help?</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Unsure about paper, finish, or file format? We're happy to help you choose the right specs.
        </p>
        <div className="flex flex-col gap-2">
            <a
            href="tel:+639474631561"
            className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition"
            >
            📞 0947-463-1561
            </a>
            <a
            href="https://m.me/p2printing"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition"
            >
            💬 Chat on Messenger
            </a>
            <a
            href="mailto:picktwoprint@gmail.com"
            className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition"
            >
            ✉️ picktwoprint@gmail.com
            </a>
        </div>
        </div>

    </div>
    </div>

</div>
)
}