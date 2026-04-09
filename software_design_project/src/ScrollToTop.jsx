import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

const scrollPositions = {}

export default function ScrollToTop() {
const { pathname } = useLocation()
const prevPathname = useRef(pathname)

useEffect(() => {
const handleScroll = () => {
    scrollPositions[prevPathname.current] = window.scrollY
}
window.addEventListener("scroll", handleScroll, { passive: true })
return () => window.removeEventListener("scroll", handleScroll)
}, [])

useEffect(() => {
if (window.__scrollToTop === true) {
    window.scrollTo(0, 0)
    window.__scrollToTop = false
    prevPathname.current = pathname
    return
}

const savedY = scrollPositions[pathname]

// Lock scroll during transition so the jump is invisible
document.documentElement.classList.add("navigating")

if (savedY !== undefined) {
    setTimeout(() => {
    window.scrollTo({ top: savedY, behavior: "instant" })
    document.documentElement.classList.remove("navigating")
    }, 400)
} else {
    window.scrollTo(0, 0)
    setTimeout(() => {
    document.documentElement.classList.remove("navigating")
    }, 400)
}

prevPathname.current = pathname
}, [pathname])

return null
}