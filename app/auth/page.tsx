"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { useApp } from "@/app/providers"

export default function AuthPage() {
  const router = useRouter()
  const { dispatch } = useApp()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Họ tên là bắt buộc"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock successful authentication
      const user = {
        id: "1",
        name: formData.name || "Nguyễn Văn A",
        email: formData.email,
        avatar: "",
      }

      dispatch({ type: "LOGIN", payload: user })
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    // Mock social login
    setTimeout(() => {
      const user = {
        id: "1",
        name: "Nguyễn Văn A",
        email: "user@example.com",
        avatar: "",
      }
      dispatch({ type: "LOGIN", payload: user })
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="flex items-center justify-center lg:justify-start space-x-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">Ra Trường Làm Gì</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Bắt đầu hành trình{" "}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              nghề nghiệp
            </span>{" "}
            của bạn
          </h1>

          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Tham gia cùng hàng nghìn sinh viên đã thành công trong việc tìm kiếm cơ hội nghề nghiệp lý tưởng
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/70">Người dùng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-white/70">Tỷ lệ thành công</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/70">Miễn phí</div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-white">{isLogin ? "Đăng nhập" : "Tạo tài khoản"}</CardTitle>
              <p className="text-white/70">
                {isLogin ? "Chào mừng bạn trở lại!" : "Tạo tài khoản miễn phí để bắt đầu"}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 py-6 bg-transparent"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {isLoading ? "Đang xử lý..." : "Tiếp tục với Google"}
                </Button>

                <Button
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 py-6 bg-transparent"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  {isLoading ? "Đang xử lý..." : "Tiếp tục với Facebook"}
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-white/60">Hoặc</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Họ và tên *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên"
                        className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10 py-6 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email của bạn"
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10 py-6 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Mật khẩu *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu"
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10 pr-10 py-6 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Xác nhận mật khẩu *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <Input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Nhập lại mật khẩu"
                        className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10 py-6 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                      />
                      {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                )}

                {/* Terms & Conditions */}
                {!isLogin && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="border-white/30" />
                    <label htmlFor="terms" className="text-sm text-white/70">
                      Tôi đồng ý với{" "}
                      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                        Điều khoản sử dụng
                      </a>{" "}
                      và{" "}
                      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                        Chính sách bảo mật
                      </a>
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 py-6 text-lg font-semibold"
                >
                  {isLoading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Tạo tài khoản"}
                </Button>
              </form>

              {/* Toggle Form */}
              <div className="text-center">
                <p className="text-white/70">
                  {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-400 hover:text-blue-300 font-medium underline"
                  >
                    {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                  </button>
                </p>
              </div>

              {isLogin && (
                <div className="text-center">
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-sm underline">
                    Quên mật khẩu?
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
