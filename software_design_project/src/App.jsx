  import { useState, useEffect, useRef } from "react"
  import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
  import ScrollToTop from "./ScrollToTop"
  import SignIn from "./pages/signin"
  import AccountLogin from "./pages/AccountLogin"
  import ProductPage from "./pages/productPages/ProductPage"
  import { useCarouselMemory } from "./useCarouselMemory"
  import { useNavigate } from "react-router-dom"  

  const products1 = [
    { name: "T-shirt", img: "/images/1/t-shirt.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Mug", img: "/images/1/mug.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Tarpaulin", img: "/images/1/tarpaulin.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Sticker", img: "/images/1/sticker.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Sintra Board", img: "/images/1/sintra.jpg", label: "-", papers: "-", delivery: "-" },
  ]
  const products2 = [
    { name: "PVC ID", img: "/images/2/pvc.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Lanyard", img: "/images/2/lanyard.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Pull-up Banner", img: "/images/2/banner.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Transparent Sticker", img: "/images/2/transparent.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Frosted Sticker", img: "/images/2/frosted.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Photocopy", img: "/images/2/photocopy.jpg", label: "-", papers: "-", delivery: "-" },
  ]
  const products3 = [
    { name: "Button Pin", img: "/images/3/button.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Mousepad", img: "/images/3/mousepad.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Cap", img: "/images/3/cap.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Poster", img: "/images/3/poster.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Panaflex", img: "/images/3/panaflex.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "X-Banner", img: "/images/3/x-banner.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Label", img: "/images/3/label.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Flyers", img: "/images/3/flyers.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Leaflets", img: "/images/3/leaflets.jpg", label: "-", papers: "-", delivery: "-" },
  ]
  const products4 = [
    { name: "Tumblr", img: "/images/4/tumblr.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Bagtag", img: "/images/4/bagtag.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Ref Magnet", img: "/images/4/magnet.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Wallclock", img: "/images/4/wallclock.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Keychain", img: "/images/4/keychain.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Eco Bag", img: "/images/4/ecobag.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Round Fan", img: "/images/4/roundfan.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Portabooth", img: "/images/4/portabooth.jpg", label: "-", papers: "-", delivery: "-" },
  ]
  const products5 = [
    { name: "Umbrella", img: "/images/5/umbrella.jpg", label: "-", papers: "-", delivery: "-" },
    { name: "Backlit", img: "/images/5/backlit.jpg", label: "-", papers: "-", delivery: "-" },
  ]


  function ProductCard({ product }) {
    const navigate = useNavigate()
    return (
      <div
        onClick={() => navigate(`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`)}
        className="flex flex-col w-80 cursor-pointer hover:shadow-xl overflow-hidden bg-white"
      >
        <h2 className="text-red-500 font-bold mb-2 text-xl">{product.name}</h2>
        <img src={product.img} alt={product.name} className="w-80 h-56 object-cover" />
        <div className="p-3 border-b-black border-b-2">
          <p className="text-blue-500 font-bold mt-2 text-lg">{product.label}</p>
          <p><span className="font-bold text-sm">Papers: </span>{product.papers}</p>
          <p><span className="font-bold text-sm">Delivery: </span>{product.delivery}</p>
        </div>
      </div>
    )
  }

  function Carousel({ products, id }) {
    const [startIndex, setStartIndex] = useCarouselMemory(id) 
    const [slideClass, setSlideClass] = useState("")
    const visibleCount = 3

    const slide = (direction) => {
      const newIndex =
        direction === "left"
          ? Math.max(startIndex - 1, 0)
          : Math.min(startIndex + 1, products.length - visibleCount)

      if (newIndex === startIndex) return

      const outClass = direction === "left" ? "carousel-slide-out-right" : "carousel-slide-out-left"
      const inClass = direction === "left" ? "carousel-slide-in-right" : "carousel-slide-in-left"

      setSlideClass(outClass)
      setTimeout(() => {
        setStartIndex(newIndex)
        setSlideClass(inClass)
        setTimeout(() => setSlideClass(""), 300)
      }, 200)
    }

    const visibleProducts = products.slice(startIndex, startIndex + visibleCount)

    return (
      <div className="flex items-center justify-center gap-4 my-6">
        <button
          onClick={() => slide("left")}
          disabled={startIndex === 0}
          className="text-2xl px-3 py-1 bg-white rounded-full shadow border border-gray-500 disabled:opacity-30 hover:bg-gray-100 hover:shadow-md transition-all duration-150 active:scale-90"
        >
          ‹
        </button>

        <div className={`flex gap-6 ${slideClass}`} style={{ minWidth: 0 }}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        <button
          onClick={() => slide("right")}
          disabled={startIndex >= products.length - visibleCount}
          className="text-2xl px-3 py-1 bg-white rounded-full shadow border border-gray-500 disabled:opacity-30 hover:bg-gray-100 hover:shadow-md transition-all duration-150 active:scale-90"
        >
          ›
        </button>
      </div>
    )
  }

  function Home() {
    return (
      <div className="flex-1 pt-10">
        <p className="flex items-center justify-center"><img src="/banner/poster.jpg" /></p>
        <h1 className="text-center text-3xl font-bold text-gray-500 pt-10">Best-Selling Products</h1>
        <Carousel id="group-1" products={products1} />
        <Carousel id="group-2" products={products2} />
        <Carousel id="group-3" products={products3} />
        <h1 className="text-center text-3xl font-bold pt-10 text-gray-500">Other Print Products</h1>
        <Carousel id="group-4" products={products4} />
        <h1 className="text-center text-3xl font-bold pt-10 text-gray-500">We Also Do</h1>
        <Carousel id="group-5" products={products5} />
      </div>
    )
  }


  function Footer() {
    return (
      <div className="h-auto mx-50">
        <div className="flex flex-wrap justify-evenly items-start gap-5 bg-white m-5 border-2 p-5 border-gray-500">
          <div className="flex flex-col">
            <h3 className="font-bold pb-3">About us</h3>
            <a href="#" className="text-gray-500 hover:text-red-500">Why Choose Us</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Who We are</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Terms of Services</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Privacy Policy</a>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold pb-3">Getting Started</h3>
            <a href="#" className="text-gray-500 hover:text-red-500">How to order Online</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Earn Points</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Paper Guide</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Delivery and Turnaround</a>
            <a href="#" className="text-gray-500 hover:text-red-500">All Products</a>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold pb-3">Help & Support</h3>
            <a href="#" className="text-gray-500 hover:text-red-500">FAQ</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Ways to Pay</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Download Templates</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Yearly Calendar</a>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold pb-3">Contact Us</h3>
            <a href="#" className="text-gray-500 hover:text-red-500">Track and Trace</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Contact Us</a>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold pb-3">Ways to Pay</h3>
            <div className="grid grid-cols-3 gap-1">
              <img src="https://www.metroprint.ph/img/footer/gcash.png" alt="gcash" className="w-8 h-3" />
              <img src="https://www.metroprint.ph/img/footer/maya.png" alt="maya" className="w-auto h-2.5" />
              <img src="https://www.metroprint.ph/img/footer/bpi.png" alt="bpi" className="w-auto h-3" />
              <img src="https://www.metroprint.ph/img/footer/coinsph.png" alt="coinsph" className="w-8 h-3" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="paypal" className="w-8 h-5" />
              <img src="https://edge.pse.com.ph/clogo/634/cl52f89319r675.jpg" alt="eastwest" className="w-8 h-5" />
            </div>
            <a href="#" className="text-gray-500 hover:text-red-500">Bank Transfer</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Cheques</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Credit Credit</a>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold pb-3">Connect with Us</h3>
            <p className="flex flex-row mb-1 gap-2 items-center">
              <a href="https://www.facebook.com/p2printing" target="_blank" rel="noreferrer">
                <img src="/icons/fb.ico" alt="facebook icon" className="w-7" />
              </a>
              <a href="https://www.instagram.com/pick2printph/" target="_blank" rel="noreferrer">
                <img src="/icons/ig.ico" alt="instagram icon" className="w-7" />
              </a>
            </p>
            <p className="flex flex-row gap-2 items-center mb-1">
              <img src="/icons/gmail.ico" alt="gmail icon" className="w-auto h-4" />
              <a href="mailto:picktwoprint@gmail.com" className="text-gray-500 hover:text-red-500">picktwoprint@gmail.com</a>
            </p>
            <p className="flex flex-row gap-2 items-center mb-1">
              <img src="/icons/yahoo.ico" alt="yahoo icon" className="w-auto h-5" />
              <a href="mailto:picktwoprint@yahoo.com" className="text-gray-500 hover:text-red-500">picktwoprint@yahoo.com</a>
            </p>
            <p className="flex flex-row gap-2 mb-1">
              <img src="/icons/tel.ico" alt="telephone icon" className="w-auto h-5" />
              <a href="tel:09474631561" className="text-gray-500 hover:text-red-500">0947-463-1561</a>
            </p>
            <p className="flex flex-row gap-2">
              <img src="/icons/tel.ico" alt="telephone icon" className="w-auto h-5" />
              <a href="tel:09213895171" className="text-gray-500 hover:text-red-500">0921-389-5171</a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Page transition wrapper ──────────────────────────────────────────────────
  function AnimatedRoutes() {
    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location)
    const [transitionStage, setTransitionStage] = useState("page-enter")

    useEffect(() => {
      if (location.pathname !== displayLocation.pathname) {
        setTransitionStage("page-exit")
      }
    }, [location, displayLocation])

    const handleAnimationEnd = () => {
      if (transitionStage === "page-exit") {
        setDisplayLocation(location)
        setTransitionStage("page-enter")
      }
    }

    return (
      <div
        className={`flex-1 ${transitionStage}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:name" element={<ProductPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/account" element={<AccountLogin />} />
        </Routes>
      </div>
    )
  }

  function Layout() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">

        {/* Title bar */}
        <div className="h-25 py-5 sticky top-0 z-50 border-b-5 border-red-500 bg-white">
          <div className="grid grid-cols-4 h-full items-center mx-10">
            <Link
              to="/"
              className="col-span-1"
              onClick={() => { window.__scrollToTop = true }}
            >
              <img src="/images/Logo.png" alt="Pick2Print Logo" className="w-auto h-15" />
            </Link>
            <div className="flex flex-wrap justify-end gap-5 col-span-3">
              <Link to="/account" className="flex rounded-sm flex-row items-center gap-1 bg-green-500">
                <img src="/icons/account.ico" alt="account icon" className="w-10 h-10" />
                <p className="text-black pr-2 font-bold">Account</p>
              </Link>
              <Link to="/signin" className="flex rounded-sm flex-row items-center gap-1 bg-red-500 pl-2">
                <img src="/icons/sign.ico" alt="sign in icon" className="w-6 h-6" />
                <p className="font-bold text-white pr-2">Sign in</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation spacer */}
        <div className="flex flex-row items-center bg-gray-300 h-10 sticky top-25 z-50" />

        {/* Page content with transitions */}
        <AnimatedRoutes />

        {/* Footer */}
        <Footer />

      </div>
    )
  }

  function App() {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    )
  }

  export default App