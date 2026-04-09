import { useState, useRef } from "react"

// ── Shared primitives ──────────────────────────────────────────────────────────
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

function CardToggle({ label, sublabel, icon, active, onClick }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all w-full ${
    active ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <span className="text-2xl">{icon}</span>
    <div className="flex-1 min-w-0">
    <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    {sublabel && <p className="text-[11px] text-gray-400 truncate mt-0.5">{sublabel}</p>}
    </div>
    <div
    className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${
        active ? "bg-red-500 border-red-500" : "border-gray-300"
    }`}
    >
    {active && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
</button>
)
}

function RadioCard({ value, selected, onSelect, children }) {
return (
<button
    type="button"
    onClick={() => onSelect(value)}
    className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all w-full ${
    selected === value
        ? "border-red-500 bg-red-50"
        : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <div
    className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
        selected === value ? "border-red-500 bg-red-500" : "border-gray-300"
    }`}
    />
    <span className={`text-sm font-semibold ${selected === value ? "text-red-700" : "text-gray-700"}`}>
    {children}
    </span>
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

// ── Lanyard preview ────────────────────────────────────────────────────────────
function LanyardPreview({ width, material, baseColor, doubleSided }) {
const widthPx = { "10mm": 6, "15mm": 10, "20mm": 14, "25mm": 18 }[width] ?? 10
const materialLabel = { Polyester: "Poly", Nylon: "Nylon", Satin: "Satin" }[material] ?? material
return (
<div className="flex flex-col items-center gap-2">
    <div className="relative w-full h-32 rounded-xl bg-linear-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
    {/* Hook */}
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-gray-400 bg-transparent" />
    {/* Lanyard loop */}
    <svg viewBox="0 0 120 100" className="w-32 h-28">
        <path
        d="M60 10 C30 10, 15 30, 15 55 C15 75, 30 90, 45 90 L75 90 C90 90, 105 75, 105 55 C105 30, 90 10, 60 10Z"
        fill="none"
        stroke={baseColor}
        strokeWidth={widthPx}
        strokeLinecap="round"
        />
        {doubleSided && (
        <path
            d="M60 10 C30 10, 15 30, 15 55 C15 75, 30 90, 45 90 L75 90 C90 90, 105 75, 105 55 C105 30, 90 10, 60 10Z"
            fill="none"
            stroke="white"
            strokeWidth={Math.max(1, widthPx - 4)}
            strokeLinecap="round"
            strokeDasharray="6 6"
            opacity="0.4"
        />
        )}
    </svg>
    {/* Badge */}
    <div className="absolute bottom-3 right-3 bg-white rounded-lg px-2 py-1 shadow text-[10px] font-bold text-gray-500 border border-gray-100">
        {width} · {materialLabel}
    </div>
    </div>
    <p className="text-[10px] text-gray-400 italic">Live preview (approximate)</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
const MATERIAL_PRICE = { Polyester: 20, Nylon: 30, Satin: 35 }
const HOOK_EXTRA = {
"Standard Metal Hook": 0,
"Swivel Hook": 5,
"Bulldog Clip": 8,
Carabiner: 15,
}

function computePrice({ material, printType, doubleSided, hookType, withIDHolder, qty }) {
let unit = MATERIAL_PRICE[material] ?? 20
if (printType === "Sublimation (Full Color)") unit += 10
if (doubleSided) unit += 5
unit += HOOK_EXTRA[hookType] ?? 0
if (withIDHolder) unit += 10
return { unitPrice: unit, total: unit * qty }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function LanyardOrderForm() {
// A. Lanyard Details
const [lanyardWidth, setLanyardWidth] = useState("15mm")
const [lengthType, setLengthType]     = useState("Standard (36 inches loop)")
const [customLength, setCustomLength] = useState("")
const [qty, setQty]                   = useState(50)

// B. Material & Print
const [material, setMaterial]     = useState("Polyester")
const [printType, setPrintType]   = useState("Silk Screen")

// C. Color & Design
const [baseColor, setBaseColor]         = useState("#c0392b")
const [file, setFile]                   = useState(null)
const [printColors, setPrintColors]     = useState(1)
const [doubleSided, setDoubleSided]     = useState(false)
const fileRef = useRef()

// D. Attachments
const [hookType, setHookType]         = useState("Standard Metal Hook")
const [breakaway, setBreakaway]       = useState(false)
const [buckleRelease, setBuckleRelease] = useState(false)

// E. Add-ons
const [withIDHolder, setWithIDHolder]   = useState(false)
const [packaging, setPackaging]         = useState("Bulk Pack")

// F. Design Assistance
const [needsDesign, setNeedsDesign]     = useState(false)
const [instructions, setInstructions]   = useState("")

// G. Delivery
const [delivery, setDelivery] = useState("Pickup")
const [address, setAddress]   = useState("")

// Errors
const [errors, setErrors] = useState({})

const { unitPrice, total } = computePrice({ material, printType, doubleSided, hookType, withIDHolder, qty })

const validate = () => {
const e = {}
if (qty < 1) e.qty = "Minimum quantity is 1"
if (lengthType === "Custom" && (!customLength || parseFloat(customLength) <= 0))
    e.customLength = "Enter a valid custom length"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter a delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\nLanyard ${lanyardWidth} – ${material}\nQty: ${qty}\nTotal: ₱${total.toLocaleString()}`)
}

const summaryRows = [
{ label: "Width",       value: lanyardWidth },
{ label: "Length",      value: lengthType === "Custom" ? `${customLength || "—"} inches` : "36 inches (Standard)" },
{ label: "Quantity",    value: `${qty} pcs` },
{ label: "Material",    value: material },
{ label: "Print Type",  value: printType },
{ label: "Base Color",  value: baseColor },
...(printType === "Silk Screen" ? [{ label: "Print Colors", value: `${printColors} color${printColors > 1 ? "s" : ""}` }] : []),
{ label: "Double-sided", value: doubleSided ? "Yes (+₱5/pc)" : "No" },
{ label: "Hook",        value: hookType },
...(breakaway     ? [{ label: "Safety Breakaway", value: "Yes" }] : []),
...(buckleRelease ? [{ label: "Buckle Release",   value: "Yes" }] : []),
...(withIDHolder  ? [{ label: "ID Card Holder",   value: "+₱10/pc" }] : []),
{ label: "Packaging",   value: packaging },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ─────────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Lanyard Details */}
    <SectionCard title="Lanyard Details" icon="🪪">
        <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Lanyard Width">
            <PillGroup
                options={["10mm", "15mm", "20mm", "25mm"]}
                value={lanyardWidth}
                onChange={setLanyardWidth}
            />
            </Field>
            <Field label="Quantity" required>
            <input
                type="number" min={1} value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-0.5">{errors.qty}</p>}
            </Field>
        </div>

        <Field label="Length">
            <div className="flex flex-col gap-2">
            {["Standard (36 inches loop)", "Custom"].map((opt) => (
                <button
                key={opt} type="button" onClick={() => setLengthType(opt)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                    lengthType === opt
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                }`}
                >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                    lengthType === opt ? "border-red-500 bg-red-500" : "border-gray-300"
                }`} />
                {opt}
                {opt === "Standard (36 inches loop)" && (
                    <span className="ml-auto text-[10px] text-gray-400 font-normal">Most popular</span>
                )}
                </button>
            ))}
            </div>
            {lengthType === "Custom" && (
            <div className="mt-2">
                <input
                type="number" min={1} value={customLength}
                onChange={(e) => setCustomLength(e.target.value)}
                placeholder="Enter length in inches"
                className={inputCls + (errors.customLength ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.customLength && <p className="text-[11px] text-red-500 mt-0.5">{errors.customLength}</p>}
            </div>
            )}
        </Field>
        </div>
    </SectionCard>

    {/* Material & Print Type */}
    <SectionCard title="Material & Print Type" icon="🖨️">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Material">
            <div className="flex flex-col gap-2">
            {[
                { val: "Polyester", desc: "Affordable, durable everyday use", price: "₱20/pc" },
                { val: "Nylon",     desc: "Smooth texture, premium feel",      price: "₱30/pc" },
                { val: "Satin",     desc: "Luxurious sheen for events",         price: "₱35/pc" },
            ].map(({ val, desc, price }) => (
                <button key={val} type="button" onClick={() => setMaterial(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    material === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
                    material === val ? "border-red-500 bg-red-500" : "border-gray-300"
                }`} />
                <div className="flex-1">
                    <p className={`text-sm font-bold ${material === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                <span className={`text-xs font-bold shrink-0 ${material === val ? "text-red-500" : "text-gray-400"}`}>{price}</span>
                </button>
            ))}
            </div>
        </Field>

        <Field label="Printing Type">
            <div className="flex flex-col gap-2">
            {[
                { val: "Silk Screen",            desc: "Best for 1–4 solid colors",         extra: null },
                { val: "Heat Transfer",           desc: "Sharp graphics, photos",             extra: null },
                { val: "Sublimation (Full Color)", desc: "Full-color all-over print",        extra: "+₱10/pc" },
            ].map(({ val, desc, extra }) => (
                <button key={val} type="button" onClick={() => setPrintType(val)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    printType === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}>
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 ${
                    printType === val ? "border-red-500 bg-red-500" : "border-gray-300"
                }`} />
                <div className="flex-1">
                    <p className={`text-sm font-bold ${printType === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                </div>
                {extra && (
                    <span className="text-xs font-bold text-red-500 shrink-0">{extra}</span>
                )}
                </button>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Color & Design */}
    <SectionCard title="Color & Design" icon="🎨">
        <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Live Preview */}
            <div>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Preview</p>
            <LanyardPreview
                width={lanyardWidth}
                material={material}
                baseColor={baseColor}
                doubleSided={doubleSided}
            />
            </div>

            <div className="flex flex-col gap-4">
            <Field label="Base Color">
                <div className="flex items-center gap-3">
                <input
                    type="color" value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-12 h-10 rounded-xl border border-gray-200 cursor-pointer p-1 bg-white"
                />
                <div className="flex-1">
                    <p className="text-sm font-mono text-gray-700 font-semibold">{baseColor.toUpperCase()}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Click swatch to change</p>
                </div>
                <div className="w-8 h-8 rounded-lg border border-gray-200 shadow-sm" style={{ backgroundColor: baseColor }} />
                </div>
            </Field>

            {printType === "Silk Screen" && (
                <Field label="Number of Print Colors" hint="More colors = higher cost">
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map((n) => (
                    <button key={n} type="button" onClick={() => setPrintColors(n)}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
                        printColors === n
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                        }`}>
                        {n}
                    </button>
                    ))}
                </div>
                </Field>
            )}

            <Field label="Double-sided Print?">
                <div className="flex gap-3">
                <ToggleBtn active={!doubleSided} onClick={() => setDoubleSided(false)}>
                    Single
                </ToggleBtn>
                <ToggleBtn active={doubleSided} onClick={() => setDoubleSided(true)}>
                    Double (+₱5)
                </ToggleBtn>
                </div>
            </Field>
            </div>
        </div>

        <Field label="Upload Design File" hint="PNG, JPG, PDF, AI accepted · Max 50MB">
            <div
            onClick={() => fileRef.current.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-5 cursor-pointer hover:border-red-300 hover:bg-red-50 transition group"
            >
            <span className="text-2xl group-hover:scale-110 transition-transform">{file ? "✅" : "📁"}</span>
            {file
                ? <p className="text-xs text-center text-green-700 font-semibold break-all">{file.name}</p>
                : <p className="text-xs text-gray-400 text-center">Click to browse or drag & drop your artwork</p>
            }
            <input ref={fileRef} type="file" accept="image/*,.pdf,.ai,.eps" className="hidden"
                onChange={(e) => setFile(e.target.files[0] || null)} />
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Attachments / Hooks */}
    <SectionCard title="Attachments & Hooks" icon="🔗">
        <div className="flex flex-col gap-5">
        <Field label="Hook Type">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
                { val: "Standard Metal Hook", icon: "🔵", desc: "Included",    extra: null },
                { val: "Swivel Hook",          icon: "🔄", desc: "360° swivel", extra: "+₱5" },
                { val: "Bulldog Clip",          icon: "📎", desc: "Strong grip", extra: "+₱8" },
                { val: "Carabiner",             icon: "🧗", desc: "Heavy duty",  extra: "+₱15" },
            ].map(({ val, icon, desc, extra }) => (
                <button key={val} type="button" onClick={() => setHookType(val)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    hookType === val
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}>
                <span className="text-lg">{icon}</span>
                <div className="flex-1">
                    <p className={`text-sm font-bold ${hookType === val ? "text-red-700" : "text-gray-700"}`}>{val}</p>
                    <p className="text-[11px] text-gray-400">{desc}</p>
                </div>
                {extra
                    ? <span className={`text-xs font-bold ${hookType === val ? "text-red-500" : "text-gray-400"}`}>{extra}</span>
                    : hookType === val && <span className="text-red-500 font-bold">✓</span>
                }
                </button>
            ))}
            </div>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CardToggle
            label="Safety Breakaway"
            sublabel="Snaps open under pressure for safety"
            icon="🔓"
            active={breakaway}
            onClick={() => setBreakaway(!breakaway)}
            />
            <CardToggle
            label="Buckle Release"
            sublabel="Quick-release side buckle clasp"
            icon="🔘"
            active={buckleRelease}
            onClick={() => setBuckleRelease(!buckleRelease)}
            />
        </div>
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons" icon="➕">
        <div className="flex flex-col gap-4">
        <CardToggle
            label="ID Card Holder"
            sublabel="+₱10/pc — clear PVC sleeve with snap button"
            icon="🪪"
            active={withIDHolder}
            onClick={() => setWithIDHolder(!withIDHolder)}
        />
        <Field label="Packaging Option">
            <div className="flex gap-3">
            {[
                { val: "Bulk Pack",        label: "📦 Bulk Pack" },
                { val: "Individual Wrap",  label: "🎁 Individual Wrap" },
            ].map(({ val, label }) => (
                <ToggleBtn key={val} active={packaging === val} onClick={() => setPackaging(val)}>
                {label}
                </ToggleBtn>
            ))}
            </div>
        </Field>
        </div>
    </SectionCard>

    {/* Design Assistance */}
    <SectionCard title="Design Assistance" icon="✏️">
        <div className="flex flex-col gap-5">
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
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
            <span>💡</span>
            <p>Our design team will reach out to collect your branding materials. Additional fees may apply.</p>
            </div>
        )}

        <Field label="Special Instructions" hint="Colors, logo position, text details, reference images, etc.">
            <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            placeholder="e.g. Use white text on black background, logo on both sides, no border..."
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
            <p>Ready for pickup at our store. You'll receive an SMS notification when your order is ready.</p>
            </div>
        )}
        {delivery === "Delivery" && (
            <Field label="Delivery Address" hint="Include barangay, city, and province" required>
            <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="e.g. 123 Rizal Ave., Brgy. Poblacion, Makati City, Metro Manila"
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.address && <p className="text-[11px] text-red-500 mt-0.5">{errors.address}</p>}
            </Field>
        )}
        </div>
    </SectionCard>

    </div>

    {/* ── RIGHT: Summary ───────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-6 flex flex-col gap-4">

        {/* Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-linear-to-r from-red-500 to-red-600">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/90">Order Summary</h2>
        </div>

        <div className="px-6 py-4 flex flex-col gap-2">
            {summaryRows.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-2 text-sm">
                <span className="text-gray-400 shrink-0">{label}</span>
                <span className="text-right text-gray-700 font-semibold">
                {label === "Base Color"
                    ? <span className="flex items-center gap-1.5 justify-end">
                        <span className="inline-block w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: value }} />
                        {value.toUpperCase()}
                    </span>
                    : value
                }
                </span>
            </div>
            ))}
        </div>

        <div className="mx-6 border-t border-gray-100" />

        <div className="px-6 py-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price / pc</span>
            <span className="font-semibold text-gray-700">₱{unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">× {qty} pcs</span>
            </div>
            <div className="mt-2 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-500">₱{total.toLocaleString()}</span>
            </div>
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

        {/* Help Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💬</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Need Help?</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Not sure which material or hook suits your event? Our team is happy to assist.
        </p>
        <div className="flex flex-col gap-2">
            <a href="tel:+639XXXXXXXXX" className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
            📞 Call Us
            </a>
            <a href="https://m.me/" className="flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600 transition">
            💬 Chat on Messenger
            </a>
        </div>
        </div>

    </div>
    </div>

</div>
)
}