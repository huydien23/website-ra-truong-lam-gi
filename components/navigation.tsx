"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sparkles, Menu, X, User, LogOut, ChevronDown } from "lucide-react"
import { useApp } from "@/app/providers"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { state, dispatch } = useApp()

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/cv-builder", label: "Tạo CV" },
    { href: "/interview", label: "Luyện phỏng vấn" },
    { href: "/jobs", label: "Tìm việc" },
    { href: "/guide", label: "Hướng dẫn" },
  ]

  const dropdownItems = [
    { href: "/cv-analysis", label: "Phân tích CV", description: "AI đánh giá và cải thiện CV" },
    { href: "/career-consulting", label: "Tư vấn nghề nghiệp", description: "Định hướng sự nghiệp cá nhân" },
    { href: "/about", label: "Về chúng tôi", description: "Câu chuyện và sứ mệnh" },
  ]

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  // Don't show navigation on auth page
  if (pathname === "/auth") return null

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Ra Trường Làm Gì</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${pathname === item.href ? "text-white" : "text-white/80 hover:text-white"
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                  Thêm
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800/95 backdrop-blur-lg border-slate-700 min-w-[280px]">
                {dropdownItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild className="focus:bg-slate-700/50">
                    <Link href={item.href} className="block px-4 py-3 cursor-pointer">
                      <div className="text-white font-medium">{item.label}</div>
                      <div className="text-white/60 text-sm">{item.description}</div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {state.isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white hover:bg-white/10 pointer-events-auto cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    {state.user?.name || "Dashboard"}
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white hover:bg-white/10 pointer-events-auto cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="text-white hover:bg-white/10 pointer-events-auto cursor-pointer">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 pointer-events-auto cursor-pointer">
                    Dùng thử miễn phí
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-white/20"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors ${pathname === item.href ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile dropdown items */}
              <div className="border-t border-white/20 pt-4">
                <div className="text-white/60 text-sm font-medium mb-2 px-2">Khác</div>
                {dropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-2 text-white/80 hover:text-white transition-colors"
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-white/60">{item.description}</div>
                  </Link>
                ))}
              </div>

              {state.isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="text-white hover:bg-white/10 w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    variant="ghost"
                    className="text-white hover:bg-white/10 w-full justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 w-full pointer-events-auto cursor-pointer"
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link href="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 w-full">
                      Dùng thử miễn phí
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
