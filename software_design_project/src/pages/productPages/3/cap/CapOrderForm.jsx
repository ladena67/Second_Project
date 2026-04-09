import { useState, useRef } from "react"

// ── Primitives ─────────────────────────────────────────────────────────────────
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
    className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold border transition-all ${
    active
        ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-200"
        : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500"
    }`}
>
    {children}
</button>
)
}

function OptionCard({ active, onClick, icon, label, sublabel, badge }) {
return (
<button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left w-full transition-all ${
    active
        ? "border-red-500 bg-red-50 text-red-700"
        : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
    }`}
>
    {icon && <span className="text-lg shrink-0">{icon}</span>}
    <div className="flex-1 min-w-0">
    <p className={`text-sm font-bold ${active ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    {sublabel && <p className="text-[11px] text-gray-400 mt-0.5">{sublabel}</p>}
    </div>
    {badge && (
    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${active ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
        {badge}
    </span>
    )}
    {active && !badge && (
    <span className="ml-auto text-red-500 shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
        <circle cx="8" cy="8" r="4" fill="currentColor" />
        </svg>
    </span>
    )}
</button>
)
}

function AddOnToggle({ label, sublabel, icon, price, checked, onChange }) {
return (
<button
    type="button"
    onClick={onChange}
    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left w-full transition-all ${
    checked ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <span className="text-2xl">{icon}</span>
    <div className="flex-1 min-w-0">
    <p className={`text-sm font-bold ${checked ? "text-red-700" : "text-gray-700"}`}>{label}</p>
    <p className="text-[11px] text-gray-400 truncate">{sublabel}</p>
    </div>
    <span className={`text-xs font-black px-2 py-1 rounded-lg shrink-0 ${checked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
    +₱{price}
    </span>
    <div className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${checked ? "bg-red-500 border-red-500" : "border-gray-300"}`}>
    {checked && <span className="text-white text-[10px] font-black">✓</span>}
    </div>
</button>
)
}

function PlacementCheck({ label, checked, onChange, price }) {
return (
<button
    type="button"
    onClick={onChange}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 text-left w-full transition-all ${
    checked ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-red-300"
    }`}
>
    <div className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${checked ? "bg-red-500 border-red-500" : "border-gray-300"}`}>
    {checked && <span className="text-white text-[9px] font-black">✓</span>}
    </div>
    <span className={`text-sm font-bold flex-1 ${checked ? "text-red-700" : "text-gray-700"}`}>{label}</span>
    {price && <span className={`text-[10px] font-black ${checked ? "text-red-500" : "text-gray-400"}`}>{price}</span>}
</button>
)
}

// ── Cap Preview ────────────────────────────────────────────────────────────────
function CapPreview({ capColor, capType, designMode, mainText, subText, designFile, placement }) {
const colorMap = {
Black: "#1a1a1a", White: "#f8f8f8", Red: "#dc2626",
Blue: "#2563eb", Navy: "#1e3a5f", Green: "#16a34a",
}
const fill = colorMap[capColor] || capColor || "#1a1a1a"
const isLight = capColor === "White"
const textColor = isLight ? "#1a1a1a" : "#ffffff"
const hasFront = placement.includes("Front")

return (
<div className="flex flex-col items-center gap-2">
    <div className="relative flex items-end justify-center" style={{ width: 160, height: 110 }}>
    {/* Cap brim */}
    <div
        className="absolute bottom-0 left-0 right-0"
        style={{
        height: 28,
        background: fill,
        borderRadius: "0 0 60px 60px",
        border: `2px solid ${isLight ? "#d1d5db" : "rgba(255,255,255,0.12)"}`,
        }}
    />
    {/* Cap dome */}
    <div
        className="absolute"
        style={{
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: 140,
        height: 88,
        background: fill,
        borderRadius: "50% 50% 0 0 / 80% 80% 0 0",
        border: `2px solid ${isLight ? "#d1d5db" : "rgba(255,255,255,0.12)"}`,
        borderBottom: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        }}
    >
        {/* Crown seam line */}
        <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "40%", background: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.15)" }} />
        {/* Design area */}
        {hasFront && (
        <div className="absolute flex flex-col items-center justify-center" style={{ bottom: 16, left: "50%", transform: "translateX(-50%)", width: 80, textAlign: "center" }}>
            {designMode === "text" && mainText ? (
            <>
                <p style={{ color: textColor, fontSize: 11, fontWeight: 900, lineHeight: 1.2, wordBreak: "break-word", textShadow: isLight ? "none" : "0 1px 2px rgba(0,0,0,0.4)" }}>
                {mainText}
                </p>
                {subText && (
                <p style={{ color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)", fontSize: 8, marginTop: 2, wordBreak: "break-word" }}>
                    {subText}
                </p>
                )}
            </>
            ) : designFile ? (
            <p style={{ color: textColor, fontSize: 8, opacity: 0.7 }}>🖼 Design</p>
            ) : (
            <div style={{ width: 36, height: 24, border: `1.5px dashed ${isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)"}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)", fontSize: 8 }}>art</span>
            </div>
            )}
        </div>
        )}
    </div>
    {/* Button top */}
    <div style={{ position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)", width: 10, height: 10, borderRadius: "50%", background: fill, border: `1.5px solid ${isLight ? "#d1d5db" : "rgba(255,255,255,0.2)"}` }} />
    </div>
    <p className="text-[10px] text-gray-400 italic">{capType} — {capColor} preview</p>
</div>
)
}

// ── Pricing ────────────────────────────────────────────────────────────────────
const PLACEMENTS = ["Front", "Back", "Left Side", "Right Side"]

function computePrice({ qty, designType, placement, innerLabel, customPkg, multiEmb, sweatband }) {
let base = 120
if (designType === "Embroidery") base += 30
else if (designType === "Printed") base += 20
else if (designType === "Patch") base += 25

const extraPlacements = Math.max(0, placement.length - 1)
base += extraPlacements * 15
if (innerLabel) base += 10
if (customPkg) base += 15
if (multiEmb) base += 10
if (sweatband) base += 10

return { unitPrice: base, total: base * Math.max(1, qty) }
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function CapOrderForm() {
// A. Cap Details
const [capType, setCapType]     = useState("Baseball Cap")
const [panel, setPanel]         = useState("6-Panel")
const [sizeMode, setSizeMode]   = useState("Adjustable")
const [fittedSize, setFittedSize] = useState("")
const [qty, setQty]             = useState(10)

// B. Material & Color
const [material, setMaterial]   = useState("Cotton")
const [capColor, setCapColor]   = useState("Black")
const [customColor, setCustomColor] = useState("#000000")

// C. Customization
const [designType, setDesignType]   = useState("Embroidery")
const [designMode, setDesignMode]   = useState("upload") // "upload" | "text"
const [designFile, setDesignFile]   = useState(null)
const [mainText, setMainText]       = useState("")
const [subText, setSubText]         = useState("")
const [fontStyle, setFontStyle]     = useState("Sans-Serif Bold")
const [threadColor, setThreadColor] = useState("#ffffff")
const [placement, setPlacement]     = useState(["Front"])
const designRef = useRef()

// D. Bulk
const [isBulk, setIsBulk] = useState(false)
const [csvFile, setCsvFile] = useState(null)
const csvRef = useRef()

// E. Add-ons
const [innerLabel, setInnerLabel]   = useState(false)
const [customPkg, setCustomPkg]     = useState(false)
const [multiEmb, setMultiEmb]       = useState(false)
const [sweatband, setSweatband]     = useState(false)

// F. Delivery
const [delivery, setDelivery]   = useState("Pickup")
const [address, setAddress]     = useState("")

// Errors
const [errors, setErrors] = useState({})

const togglePlacement = (p) => {
setPlacement((prev) =>
    prev.includes(p) ? (prev.length > 1 ? prev.filter((x) => x !== p) : prev) : [...prev, p]
)
}

const validate = () => {
const e = {}
if (!qty || qty < 1) e.qty = "Quantity must be at least 1"
if (sizeMode === "Fitted" && !fittedSize.trim()) e.fittedSize = "Please enter fitted size"
if (designMode === "upload" && !designFile) e.design = "Please upload a design file"
if (designMode === "text" && !mainText.trim()) e.mainText = "Please enter main text"
if (isBulk && !csvFile) e.csv = "Please upload a CSV/Excel file"
if (delivery === "Delivery" && !address.trim()) e.address = "Please enter delivery address"
setErrors(e)
return Object.keys(e).length === 0
}

const handleSubmit = () => {
if (!validate()) return
alert(`✅ Order submitted!\n\n${capType} – ${material}\nDesign: ${designType}\nQty: ${qty} pcs\nTotal: ₱${pricing.total.toLocaleString()}`)
}

const pricing = computePrice({ qty, designType, placement, innerLabel, customPkg, multiEmb, sweatband })

const effectiveColor = capColor === "Custom" ? customColor : capColor

const CAP_TYPES    = ["Baseball Cap", "Snapback", "Trucker Cap", "Dad Hat", "Visor"]
const MATERIALS    = ["Cotton", "Polyester", "Cotton-Poly Blend", "Mesh"]
const CAP_COLORS   = ["Black", "White", "Red", "Blue", "Navy", "Green", "Custom"]
const DESIGN_TYPES = [
{ val: "Embroidery", icon: "🧵", note: "+₱30", desc: "Stitched thread — premium & durable" },
{ val: "Printed",    icon: "🖨️", note: "+₱20", desc: "Heat press or sublimation print" },
{ val: "Patch",      icon: "🪡", note: "+₱25", desc: "Sewn-on woven or embroidered patch" },
]

const summaryRows = [
{ label: "Cap Type",    value: capType },
{ label: "Panel",       value: panel },
{ label: "Size",        value: sizeMode === "Adjustable" ? "Adjustable / Free Size" : `Fitted – ${fittedSize || "—"}` },
{ label: "Material",    value: material },
{ label: "Color",       value: capColor === "Custom" ? `Custom (${customColor})` : capColor },
{ label: "Design Type", value: designType },
{ label: "Placement",   value: placement.join(", ") },
{ label: "Quantity",    value: `${qty} pc${qty !== 1 ? "s" : ""}` },
...(placement.length > 1 ? [{ label: "Extra Placements", value: `+₱${(placement.length - 1) * 15}/pc` }] : []),
...(innerLabel  ? [{ label: "Inner Label",       value: "+₱10/pc" }] : []),
...(customPkg   ? [{ label: "Custom Packaging",  value: "+₱15/pc" }] : []),
...(multiEmb    ? [{ label: "Multi-Area Emb.",   value: "+₱10/pc" }] : []),
...(sweatband   ? [{ label: "Sweatband Upgrade", value: "+₱10/pc" }] : []),
{ label: "Delivery",    value: delivery },
]

return (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {/* ── LEFT ────────────────────────────────────────── */}
    <div className="xl:col-span-2 flex flex-col gap-6">

    {/* Cap Details */}
    <SectionCard title="Cap Details" icon="🧢">
        <div className="flex flex-col gap-5">
        <Field label="Cap Type" required>
            <select value={capType} onChange={(e) => setCapType(e.target.value)} className={selectCls}>
            {CAP_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
        </Field>

        <Field label="Panel Type">
            <div className="flex gap-3">
            {["5-Panel", "6-Panel"].map((p) => (
                <ToggleBtn key={p} active={panel === p} onClick={() => setPanel(p)}>
                {p}
                </ToggleBtn>
            ))}
            </div>
        </Field>

        <Field label="Size">
            <div className="flex gap-3 mb-2">
            <ToggleBtn active={sizeMode === "Adjustable"} onClick={() => setSizeMode("Adjustable")}>
                📏 Adjustable (Free Size)
            </ToggleBtn>
            <ToggleBtn active={sizeMode === "Fitted"} onClick={() => setSizeMode("Fitted")}>
                📐 Fitted
            </ToggleBtn>
            </div>
            {sizeMode === "Fitted" && (
            <div>
                <input
                type="text"
                value={fittedSize}
                onChange={(e) => setFittedSize(e.target.value)}
                placeholder="e.g. 7 1/4, 58cm, M/L"
                className={inputCls + (errors.fittedSize ? " border-red-400 ring-1 ring-red-300" : "")}
                />
                {errors.fittedSize && <p className="text-[11px] text-red-500 mt-1">{errors.fittedSize}</p>}
            </div>
            )}
            {sizeMode === "Adjustable" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                <span>ℹ️</span>
                <p>Adjustable caps fit most head sizes. Closure type will match the selected cap style.</p>
            </div>
            )}
        </Field>

        <Field label="Quantity" required>
            <input
            type="number" min={1} value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className={inputCls + (errors.qty ? " border-red-400 ring-1 ring-red-300" : "")}
            />
            {errors.qty && <p className="text-[11px] text-red-500 mt-1">{errors.qty}</p>}
        </Field>
        </div>
    </SectionCard>

    {/* Material & Color */}
    <SectionCard title="Material & Color" icon="🎨">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Material">
            <div className="flex flex-col gap-2">
            {MATERIALS.map((m) => (
                <OptionCard
                key={m}
                active={material === m}
                onClick={() => setMaterial(m)}
                label={m}
                sublabel={m === "Mesh" ? "Best for Trucker Caps" : m === "Cotton-Poly Blend" ? "Durable & breathable" : ""}
                />
            ))}
            </div>
        </Field>

        <div className="flex flex-col gap-4">
            <Field label="Cap Color">
            <div className="grid grid-cols-2 gap-2">
                {CAP_COLORS.map((c) => {
                const colorDot = { Black: "#1a1a1a", White: "#f3f4f6", Red: "#dc2626", Blue: "#2563eb", Navy: "#1e3a5f", Green: "#16a34a", Custom: null }
                return (
                    <button
                    key={c}
                    type="button"
                    onClick={() => setCapColor(c)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                        capColor === c
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-red-300"
                    }`}
                    >
                    {colorDot[c] ? (
                        <span
                        className="w-4 h-4 rounded-full shrink-0 border border-gray-300"
                        style={{ background: colorDot[c] }}
                        />
                    ) : (
                        <span className="text-sm">🎨</span>
                    )}
                    {c}
                    </button>
                )
                })}
            </div>
            </Field>

            {capColor === "Custom" && (
            <Field label="Pick Custom Color">
                <div className="flex items-center gap-3">
                <input
                    type="color" value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-12 h-10 rounded-xl border border-gray-200 cursor-pointer p-1 bg-white"
                />
                <span className="text-sm text-gray-600 font-mono">{customColor}</span>
                </div>
            </Field>
            )}

            {/* Cap Preview */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex justify-center">
            <CapPreview
                capColor={effectiveColor}
                capType={capType}
                designMode={designMode}
                mainText={mainText}
                subText={subText}
                designFile={designFile}
                placement={placement}
            />
            </div>
        </div>
        </div>
    </SectionCard>

    {/* Customization */}
    <SectionCard title="Customization" icon="✏️">
        <div className="flex flex-col gap-5">

        {/* Design Type */}
        <Field label="Design / Decoration Type">
            <div className="flex flex-col gap-2">
            {DESIGN_TYPES.map(({ val, icon, note, desc }) => (
                <OptionCard
                key={val}
                active={designType === val}
                onClick={() => setDesignType(val)}
                icon={icon}
                label={val}
                sublabel={desc}
                badge={note}
                />
            ))}
            </div>
        </Field>

        {/* Placement */}
        <Field label="Placement" hint="Select all areas to customize. Front is included in base price.">
            <div className="grid grid-cols-2 gap-2">
            {PLACEMENTS.map((p, i) => (
                <PlacementCheck
                key={p}
                label={p}
                checked={placement.includes(p)}
                onChange={() => togglePlacement(p)}
                price={i > 0 ? "+₱15" : "Included"}
                />
            ))}
            </div>
            {placement.length > 1 && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 text-xs text-amber-700 mt-1">
                <span>📌</span>
                <span className="font-semibold">{placement.length - 1} extra placement{placement.length > 2 ? "s" : ""} — +₱{(placement.length - 1) * 15}/pc added</span>
            </div>
            )}
        </Field>

        {/* Design Mode Toggle */}
        <Field label="Artwork / Design">
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-3">
            <button
                type="button"
                onClick={() => setDesignMode("upload")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${designMode === "upload" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
                📁 Upload Design
            </button>
            <button
                type="button"
                onClick={() => setDesignMode("text")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${designMode === "text" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
                ✏️ Text Design
            </button>
            </div>

            {designMode === "upload" ? (
            <div>
                <div
                onClick={() => designRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group ${
                    errors.design ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                }`}
                >
                <span className="text-3xl group-hover:scale-110 transition-transform">{designFile ? "✅" : "🖼️"}</span>
                {designFile
                    ? <p className="text-xs text-center text-green-700 font-semibold break-all">{designFile.name}</p>
                    : <p className="text-xs text-gray-400 text-center">Click to upload PNG, JPG, PDF, or AI file</p>
                }
                <input ref={designRef} type="file" accept="image/*,.pdf,.ai,.eps" className="hidden"
                    onChange={(e) => setDesignFile(e.target.files[0] || null)} />
                </div>
                {errors.design && <p className="text-[11px] text-red-500 mt-1">{errors.design}</p>}
            </div>
            ) : (
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Main Text" required>
                    <input
                    type="text" value={mainText}
                    onChange={(e) => setMainText(e.target.value)}
                    placeholder="e.g. TEAM ALPHA"
                    className={inputCls + (errors.mainText ? " border-red-400 ring-1 ring-red-300" : "")}
                    />
                    {errors.mainText && <p className="text-[11px] text-red-500 mt-1">{errors.mainText}</p>}
                </Field>
                <Field label="Subtext">
                    <input type="text" value={subText} onChange={(e) => setSubText(e.target.value)}
                    placeholder="e.g. Class of 2025" className={inputCls} />
                </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Font Style">
                    <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} className={selectCls}>
                    {["Sans-Serif Bold", "Serif Classic", "Script / Cursive", "Collegiate Block", "Condensed", "Rounded"].map((f) => (
                        <option key={f}>{f}</option>
                    ))}
                    </select>
                </Field>
                <Field label="Thread / Print Color">
                    <div className="flex items-center gap-3">
                    <input type="color" value={threadColor}
                        onChange={(e) => setThreadColor(e.target.value)}
                        className="w-12 h-10 rounded-xl border border-gray-200 cursor-pointer p-1 bg-white"
                    />
                    <span className="text-sm text-gray-600 font-mono">{threadColor}</span>
                    </div>
                </Field>
                </div>
            </div>
            )}
        </Field>
        </div>
    </SectionCard>

    {/* Bulk Order */}
    <SectionCard title="Order Type" icon="📦">
        <div className="flex flex-col gap-4">
        <div className="flex gap-3">
            <ToggleBtn active={!isBulk} onClick={() => setIsBulk(false)}>🔹 Single Design</ToggleBtn>
            <ToggleBtn active={isBulk} onClick={() => setIsBulk(true)}>📊 Bulk Order (CSV)</ToggleBtn>
        </div>

        {isBulk ? (
            <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <span className="text-lg">📋</span>
                <div>
                <p className="font-bold mb-1">Bulk CSV Upload</p>
                <p className="text-xs leading-relaxed">
                    Upload a CSV or Excel file with columns:{" "}
                    <code className="bg-blue-100 px-1 rounded">Name</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">Number</code>,{" "}
                    <code className="bg-blue-100 px-1 rounded">Variation</code> (optional).
                    Each row = one cap with unique customization.
                </p>
                </div>
            </div>
            <Field label="Upload CSV / Excel File" required>
                <div
                onClick={() => csvRef.current.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition group ${errors.csv ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-300 hover:bg-red-50"}`}
                >
                <span className="text-3xl group-hover:scale-110 transition-transform">{csvFile ? "✅" : "📊"}</span>
                {csvFile
                    ? <p className="text-xs text-center text-green-700 font-semibold">{csvFile.name}</p>
                    : <p className="text-xs text-gray-400 text-center">Click to upload .csv or .xlsx file</p>
                }
                <input ref={csvRef} type="file" accept=".csv,.xlsx,.xls" className="hidden"
                    onChange={(e) => setCsvFile(e.target.files[0] || null)} />
                </div>
                {errors.csv && <p className="text-[11px] text-red-500 mt-1">{errors.csv}</p>}
            </Field>
            </div>
        ) : (
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-700">
            <span>🔹</span>
            <p><strong>Single design</strong> — all {qty} cap{qty !== 1 ? "s" : ""} will share the same design and customization.</p>
            </div>
        )}
        </div>
    </SectionCard>

    {/* Add-ons */}
    <SectionCard title="Add-ons" icon="⭐">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AddOnToggle label="Inner Label Printing" sublabel="Custom brand label inside the cap" icon="🏷️" price={10} checked={innerLabel} onChange={() => setInnerLabel(!innerLabel)} />
        <AddOnToggle label="Custom Packaging" sublabel="Individual branded box or bag" icon="📦" price={15} checked={customPkg} onChange={() => setCustomPkg(!customPkg)} />
        <AddOnToggle label="Multi-Area Embroidery" sublabel="Stitch design on multiple areas" icon="🧵" price={10} checked={multiEmb} onChange={() => setMultiEmb(!multiEmb)} />
        <AddOnToggle label="Sweatband Upgrade" sublabel="Premium moisture-wicking inner band" icon="💧" price={10} checked={sweatband} onChange={() => setSweatband(!sweatband)} />
        </div>
    </SectionCard>

    {/* Delivery */}
    <SectionCard title="Delivery" icon="🚚">
        <div className="flex flex-col gap-4">
        <Field label="Fulfillment Method">
            <div className="flex gap-3">
            <ToggleBtn active={delivery === "Pickup"} onClick={() => setDelivery("Pickup")}>🏪 Pickup</ToggleBtn>
            <ToggleBtn active={delivery === "Delivery"} onClick={() => setDelivery("Delivery")}>📦 Delivery</ToggleBtn>
            </div>
        </Field>
        {delivery === "Pickup" && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            <span>📍</span>
            <p>You'll receive an SMS when your order is ready for pickup at our store.</p>
            </div>
        )}
        {delivery === "Delivery" && (
            <Field label="Delivery Address" hint="Include barangay, city, and province" required>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2}
                placeholder="e.g. 45 Rizal Ave., Brgy. Poblacion, Makati City, Metro Manila"
                className={inputCls + " resize-none" + (errors.address ? " border-red-400 ring-1 ring-red-300" : "")} />
            {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
            </Field>
        )}
        </div>
    </SectionCard>
    </div>

    {/* ── RIGHT: Sidebar ──────────────────────────────── */}
    <div className="xl:col-span-1">
    <div className="sticky top-6 flex flex-col gap-4">

        {/* Cap Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
            <span className="text-xl">🧢</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-600">Cap Preview</h2>
        </div>
        <div className="px-6 py-5 flex justify-center bg-gray-50">
            <CapPreview
            capColor={effectiveColor}
            capType={capType}
            designMode={designMode}
            mainText={mainText}
            subText={subText}
            designFile={designFile}
            placement={placement}
            />
        </div>
        </div>

        {/* Order Summary */}
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

        <div className="px-6 py-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price / pc</span>
            <span className="font-semibold text-gray-700">₱{pricing.unitPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-400">Quantity</span>
            <span className="font-semibold text-gray-700">× {qty}</span>
            </div>
            <div className="mt-2 flex items-center justify-between py-3 px-4 bg-red-50 rounded-xl border border-red-100">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wide">Total</span>
            <span className="text-2xl font-black text-red-600">₱{pricing.total.toLocaleString()}</span>
            </div>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-3">
            <button type="button" onClick={handleSubmit}
            className="w-full py-4 bg-red-500 hover:bg-red-600 active:scale-[.98] text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-200 transition-all">
            Place Order →
            </button>
            <p className="text-[11px] text-gray-400 text-center">
            We'll confirm and send a payment link within 24 hours.
            </p>
        </div>
        </div>

        {/* Help Card */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5">
        <p className="text-xs font-black uppercase tracking-widest text-yellow-700 mb-2">Need Help?</p>
        <p className="text-xs text-yellow-700 leading-relaxed">
            Not sure which design type suits your cap? Message us on Facebook or email{" "}
            <a href="mailto:picktwoprint@gmail.com" className="underline font-semibold">
            picktwoprint@gmail.com
            </a>
        </p>
        </div>

    </div>
    </div>

</div>
)
}