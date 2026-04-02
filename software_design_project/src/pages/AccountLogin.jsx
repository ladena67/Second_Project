import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function AccountLogin() {
const navigate = useNavigate()

const [form, setForm] = useState({ email: "", password: "" })
const [showPass, setShowPass] = useState(false)
const [loading, setLoading] = useState(false)
const [error, setError] = useState("")

useEffect(() => {
window.scrollTo(0, 0)
}, [])

const handleChange = (e) => {
setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
setError("")
}

const handleSubmit = (e) => {
e.preventDefault()

if (!form.email || !form.password) {
    setError("Please fill in all fields.")
    return
}

setLoading(true)

setTimeout(() => {
    setLoading(false)
    navigate("/") // change to dashboard later
}, 1200)
}

return (
<div className="flex bg-gray-100 font-serif">

    <div className="w-full max-w-md mx-auto py-8 px-6">

    {/* Account Header */}
    <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-3">
        <span className="text-red-600 text-xl font-bold">👤</span>
        </div>

        <h2 className="text-2xl font-black text-gray-900">
        My Account
        </h2>

        <p className="text-sm text-gray-500 mt-1">
        Sign in to manage your orders
        </p>
    </div>

    {/* Error */}
    {error && (
        <div className="mb-4 p-3 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm">
        {error}
        </div>
    )}

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Email */}
        <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 mb-1">
            Email Address
        </label>
        <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
        />
        </div>

        {/* Password */}
        <div>
        <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-700">
            Password
            </label>
            <Link to="/forgot-password" className="text-xs text-red-600">
            Forgot password?
            </Link>
        </div>

        <div className="relative">
            <input
            type={showPass ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 pr-11 text-sm border border-gray-300 rounded-lg focus:border-red-500 outline-none"
            />

            <button
            type="button"
            onClick={() => setShowPass(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
            {showPass ? <FaEye /> : <FaEyeSlash />}
            </button>
        </div>
        </div>

        {/* Remember */}
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input type="checkbox" className="accent-red-600 w-4 h-4" />
        Keep me signed in
        </label>

        {/* Submit */}
        <button
        type="submit"
        disabled={loading}
        className={`mt-1 py-3 rounded-lg font-bold text-white text-sm flex items-center justify-center gap-2 transition
        ${loading ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
        >
        {loading ? (
            <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
            Signing in…
            </>
        ) : "Access Account →"}
        </button>

    </form>

    {/* Divider */}
    <div className="flex items-center gap-3 my-6 text-xs text-gray-400">
        <div className="flex-1 h-px bg-gray-300" />
        or
        <div className="flex-1 h-px bg-gray-300" />
    </div>

    {/* Register */}
    <p className="text-center text-sm text-gray-500">
        No account yet?{" "}
        <Link to="/register" className="text-red-600 font-bold">
        Create one here
        </Link>
    </p>

    </div>
</div>
)
}