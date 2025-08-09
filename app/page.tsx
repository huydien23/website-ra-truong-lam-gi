"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Target, Users, Zap, CheckCircle, Star, Play } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  // 🎭 USER PERSPECTIVE: "Wow, trang này load nhanh quá! Animation mượt mà"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation đã được render ở layout.tsx, tránh chồng header */}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* 🎭 USER: "Badge này nhìn premium quá!" */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-600/20 border border-blue-500/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-blue-300 text-sm font-medium">Nền tảng hỗ trợ nghề nghiệp thông minh</span>
            </motion.div>

            {/* 🎭 USER: "Headline này catchy và clear!" */}
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Sinh viên ra trường làm gì?{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Chúng tôi có câu trả lời!
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Từ CV đến phỏng vấn, từ định hướng đến tìm việc. Hoàn toàn miễn phí cho sinh viên Việt Nam. Hơn 50,000+
              sinh viên đã thành công với chúng tôi.
            </motion.p>

            {/* 🎭 USER: "CTA buttons này design đẹp, hover effect mượt!" */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Sử dụng hoàn toàn miễn phí
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  // Scroll to features section
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl backdrop-blur-sm bg-transparent"
              >
                <Play className="mr-2 w-5 h-5" />
                Xem demo
              </Button>
            </motion.div>

            {/* 🎭 USER: "Social proof này tạo trust ngay!" */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex items-center justify-center space-x-8 text-white/60"
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-teal-500 border-2 border-white/20"
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm">50,000+ người dùng</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm">4.9/5 đánh giá</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tính năng{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">đột phá</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Công nghệ AI tiên tiến giúp bạn chuẩn bị hoàn hảo cho sự nghiệp mơ ước
            </p>
          </motion.div>

          {/* 🎭 USER: "Grid layout này responsive tốt, cards có depth!" */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "CV Builder cho sinh viên mới ra trường",
                description: "Tạo CV chuyên nghiệp với AI suggestions theo từng ngành nghề",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Users,
                title: "Luyện phỏng vấn với AI - Không còn lo lắng",
                description: "Luyện phỏng vấn với AI đóng vai nhà tuyển dụng thực tế",
                color: "from-cyan-500 to-pink-500",
              },
              {
                icon: Zap,
                title: "Phân tích CV - Tăng cơ hội được tuyển",
                description: "AI đánh giá và đưa ra gợi ý cải thiện CV của bạn",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: CheckCircle,
                title: "Tư vấn nghề nghiệp - Tìm đúng con đường",
                description: "Roadmap cá nhân hóa dựa trên skills và mục tiêu",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Star,
                title: "Tìm việc phù hợp - Match với dream job",
                description: "Tìm việc phù hợp với AI matching algorithm",
                color: "from-indigo-500 to-cyan-500",
              },
              {
                icon: Sparkles,
                title: "Đánh giá kỹ năng - Biết mình thiếu gì",
                description: "Đánh giá kỹ năng và đề xuất khóa học phù hợp",
                color: "from-teal-500 to-blue-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="bg-gradient-to-r from-blue-500/20 to-teal-600/20 backdrop-blur-lg border-white/20 p-12">
            <CardContent className="p-0">
              <h2 className="text-4xl font-bold text-white mb-6">Sẵn sàng bước vào thế giới nghề nghiệp?</h2>
              <p className="text-xl text-white/80 mb-8">Hoàn toàn miễn phí - Không ẩn phí - Không giới hạn sử dụng</p>
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Bắt đầu ngay - 100% Miễn phí
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-lg border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Ra Trường Làm Gì</span>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Platform miễn phí giúp sinh viên Việt Nam định hướng nghề nghiệp và tìm kiếm cơ hội việc làm phù hợp.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                >
                  <span className="text-white text-sm font-bold">FB</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                >
                  <span className="text-white text-sm font-bold">IG</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                >
                  <span className="text-white text-sm font-bold">YT</span>
                </motion.a>
              </div>
            </div>

            {/* Tính năng chính */}
            <div>
              <h3 className="text-white font-semibold mb-4">Tính năng chính</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/cv-builder" className="text-white/70 hover:text-white transition-colors">
                    Tạo CV
                  </Link>
                </li>
                <li>
                  <Link href="/interview" className="text-white/70 hover:text-white transition-colors">
                    Luyện phỏng vấn AI
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-white/70 hover:text-white transition-colors">
                    Tìm việc làm
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="text-white/70 hover:text-white transition-colors">
                    Hướng dẫn nghề nghiệp
                  </Link>
                </li>
              </ul>
            </div>

            {/* Công cụ */}
            <div>
              <h3 className="text-white font-semibold mb-4">Công cụ</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/cv-analysis" className="text-white/70 hover:text-white transition-colors">
                    Phân tích CV
                  </Link>
                </li>
                <li>
                  <Link href="/career-consulting" className="text-white/70 hover:text-white transition-colors">
                    Tư vấn nghề nghiệp
                  </Link>
                </li>
                <li>
                  <Link href="/cv-builder/templates" className="text-white/70 hover:text-white transition-colors">
                    Mẫu CV
                  </Link>
                </li>
              </ul>
            </div>

            {/* Về chúng tôi */}
            <div>
              <h3 className="text-white font-semibold mb-4">Về chúng tôi</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                    Câu chuyện
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="text-white/70 hover:text-white transition-colors">
                    Hướng dẫn sử dụng
                  </Link>
                </li>
                <li>
                  <a href="mailto:hello@ratrunglamgi.com" className="text-white/70 hover:text-white transition-colors">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Góp ý
                  </a>
                </li>
              </ul>
            </div>

            {/* Liên hệ */}
            <div>
              <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-3">
                <li className="text-white/70">
                  <span className="block">Email:</span>
                  <a href="mailto:hello@ratrunglamgi.com" className="text-blue-400 hover:text-blue-300">
                    hello@ratrunglamgi.com
                  </a>
                </li>
                <li className="text-white/70">
                  <span className="block">Hotline:</span>
                  <a href="tel:+84123456789" className="text-blue-400 hover:text-blue-300">
                    +84 123 456 789
                  </a>
                </li>
                <li className="text-white/70">
                  <span className="block">Địa chỉ:</span>
                  <span>Hà Nội, Việt Nam</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © 2024 Ra Trường Làm Gì. Hoàn toàn miễn phí cho sinh viên Việt Nam.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

