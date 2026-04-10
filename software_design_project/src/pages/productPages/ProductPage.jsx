import { useParams } from "react-router-dom"
import TShirtOrderForm      from "./1/t-shirt/TShirtOrderForm"
import MugOrderForm         from "./1/mug/MugOrderForm"
import TarpaulinOrderForm   from "./1/tarpaulin/TarpaulinOrderForm"
import StickerOrderForm     from "./1/sticker/StickerOrderForm"
import SintraBoardOrderForm from "./1/sintra/SintraBoardOrderForm.jsx"
import PullUpBannerOrderForm from "./2/banner/PullUpBannerOrderForm"
import FrostedStickerOrderForm from "./2/frosted/FrostedStickerOrderForm"
import LanyardOrderForm from "./2/lanyard/LanyardOrderForm"
import PhotocopyOrderForm from "./2/photocopy/PhotocopyOrderForm"
import PVCOrderForm from "./2/pvc/PVCOrderForm"
import FlyersOrderForm from "./3/flyers/FlyersOrderForm"
import MousePadOrderForm from "./3/mousepad/MousepadOrderForm"
import TransparentStickerOrderForm from "./2/transparent/TransparentStickerOrderForm"
import ButtonOrderForm from "./3/button/ButtonOrderForm"
import CapOrderForm from "./3/cap/CapOrderForm"
import LabelOrderForm from "./3/label/LabelOrderForm"
import LeafletsOrderForm from "./3/leaflets/LeafletsOrderForm"
import PanaFlexOrderForm from "./3/panaflex/PanaflexOrderForm"
import PosterOrderForm from "./3/poster/PosterOrderForm"
import XBannerOrderForm from "./3/x-banner/X-BannerOrderForm"
import BagTagOrderForm from "./4/bagtag/BagTagOrderForm"
import EcoBagOrderForm from "./4/ecobag/EcoBagOrderForm"
import KeyChainOrderForm from "./4/keychain/KeyChainOrderForm"
import BacklitOrderForm from "./5/backlit/BackLitOrderForm"
import UmbrellaOrderForm from "./5/umbrella/UmbrellaOrderForm"

// ── Helper ─────────────────────────────────────────────────────────────────────
function toReadable(slug) {
return slug
.split("-")
.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
.join(" ")
}

// ── Product registry ───────────────────────────────────────────────────────────
// To add a new product: create its folder + form component, then add one entry here.
const PRODUCTS = {
"t-shirt": {
label:    "T-Shirt Printing",
subtitle: "Customize and place your T-shirt printing order below.",
Form:     TShirtOrderForm,
},
"mug": {
label:    "Mug Printing",
subtitle: "Customize and place your mug printing order below.",
Form:     MugOrderForm,
},
"tarpaulin": {
label:    "Tarpaulin Printing",
subtitle: "Enter your size, design, and accessories to get an instant price estimate.",
Form:     TarpaulinOrderForm,
},
"sticker": {
label:    "Sticker Printing",
subtitle: "Customize shape, finish, and quantity — get an instant price estimate.",
Form:     StickerOrderForm,
},
"sintra-board": {
label:    "Sintra Board Printing",
subtitle: "Professional PVC signage boards — customize size, thickness, and mounting options.",
Form:     SintraBoardOrderForm,
},
"pull-up-banner": {
label: "Pull-Up Banner Printing",
subtitle: "Professional roll-up banners — customize size, material, and stand type.",
Form: PullUpBannerOrderForm,
},
"frosted-sticker": {
label: "Frosted Sticker Printing",
subtitle: "Custom frosted vinyl for glass, windows, and office partitions.",
Form: FrostedStickerOrderForm,
},
"button-pin": {
label: "Button Pin Printing",
subtitle: "Custom pin buttons — design your own or upload artwork.",
Form: ButtonOrderForm,
},
"lanyard": {
label: "Lanyard Printing",
subtitle: "Customize width, material, hooks, and design for your lanyards.",
Form: LanyardOrderForm,
},
"cap": {
label: "Cap Printing",
subtitle: "Custom embroidered and printed caps — single or bulk orders.",
Form: CapOrderForm,
},
"photocopy": {
label: "Photocopy Services",
subtitle: "Fast, affordable, and high-quality photocopying for all your document needs.",
Form: PhotocopyOrderForm,
},
"pvc-id": {
label:    "PVC ID Printing",
subtitle: "Professional PVC ID cards — single or bulk production.",
Form:     PVCOrderForm,
},
"transparent-sticker": {
label: "Transparent Sticker Printing",
subtitle: "Clear vinyl stickers with white ink options for glass, plastic, and packaging.",
Form: TransparentStickerOrderForm,
},
"flyers": {
label: "Flyers Printing",
subtitle: "Bulk flyer printing with customizable paper, size, and finishing options.",
Form: FlyersOrderForm,
},
"mousepad": {
label: "Mousepad Printing",
subtitle: "Customize your mousepad with size, material, and design.",
Form: MousePadOrderForm,
},
"leaflets": {
label: "Leaflets Printing",
subtitle: "Folded marketing leaflets with customizable paper, size, and finishing options.",
Form: LeafletsOrderForm,
},
"panaflex": {
label: "Panaflex Printing",
subtitle: "Large-format outdoor banners with customizable size, material, and installation options.",
Form: PanaFlexOrderForm,
},
"label": {
label: "Label Printing",
subtitle: "Custom sticker labels for packaging, branding, and products.",
Form: LabelOrderForm,
},
"poster": {
label:    "Poster Printing",
subtitle: "High-quality poster printing for events, displays, and more.",
Form:     PosterOrderForm,
},
"x-banner": {
label:    "X-Banner Printing",
subtitle: "Custom X-stand banners with optional stand hardware — perfect for events and promotions.",
Form:     XBannerOrderForm,
},
"backlit": {
label:    "Backlit Printing",
subtitle: "Premium illuminated signage for lightboxes, advertising boards, and display panels.",
Form:     BacklitOrderForm,
},
"umbrella": {
label:    "Umbrella Printing",
subtitle: "Custom printed umbrellas — folding, stick, or golf style with full canopy options.",
Form:     UmbrellaOrderForm,
},
"bagtag": {
label:    "Bag Tag Printing",
subtitle: "Custom luggage tags, ID tags, and identification labels — PVC, acrylic, and laminated.",
Form:     BagTagOrderForm,
},
"eco-bag": {
label:    "Eco Bag Printing",
subtitle: "Custom tote, canvas, and drawstring bags — screen print, embroidery, and bulk orders supported.",
Form:     EcoBagOrderForm,
},
"keychain": {
label:    "Keychain Printing",
subtitle: "Custom acrylic, PVC, metal, and wooden keychains — with glitter, holographic, and bulk options.",
Form:     KeyChainOrderForm,
},
}

// ── Shared page shell ──────────────────────────────────────────────────────────
function PageHeader({ readable, config }) {
return (
<div className="bg-white border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 py-6">
    {/* Breadcrumb */}
    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
        <a href="/" className="hover:text-red-500 transition">Home</a>
        <span>›</span>
        <a href="/" className="hover:text-red-500 transition">Products</a>
        <span>›</span>
        <span className="text-gray-700 font-semibold">{readable}</span>
    </div>

    {/* Title */}
    <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
        {config ? config.label : readable}
        </h1>
        {config && (
        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider">
            Custom Order
        </span>
        )}
    </div>

    {config && (
        <p className="text-sm text-gray-500 mt-1">{config.subtitle}</p>
    )}
    </div>
</div>
)
}

function ComingSoon({ readable }) {
return (
<div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
    <span className="text-6xl">🖨️</span>
    <h2 className="text-2xl font-black text-gray-800">{readable}</h2>
    <p className="text-gray-400 text-sm max-w-sm">
    The order form for <strong>{readable}</strong> is coming soon.
    Contact us directly to place an order.
    </p>
    <a href="/"
    className="mt-2 px-6 py-3 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition">
    ← Back to Products
    </a>
</div>
)
}

// ── Exported component ─────────────────────────────────────────────────────────
export default function ProductPage() {
const { name } = useParams()
const readable = toReadable(name || "")
const config   = PRODUCTS[name]

return (
<div className="flex-1 bg-gray-50 min-h-screen">
    <PageHeader readable={readable} config={config} />
    <div className="max-w-7xl mx-auto px-6 py-8">
    {config ? <config.Form /> : <ComingSoon readable={readable} />}
    </div>
</div>
)
}