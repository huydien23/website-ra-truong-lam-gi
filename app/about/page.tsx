"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Target,
  Award,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  CheckCircle,
  Rocket,
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { number: "50K+", label: "Người dùng tin tưởng", icon: Users },
    { number: "95%", label: "Tỷ lệ thành công", icon: Target },
    { number: "1M+", label: "CV được tạo", icon: Award },
    { number: "24/7", label: "Hỗ trợ AI", icon: Heart },
  ]

  const values = [
    {
      icon: Heart,
      title: "Miễn phí cho mọi người",
      description: "Chúng tôi tin rằng cơ hội nghề nghiệp không nên bị giới hạn bởi tài chính",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "AI tiên tiến",
      description: "Sử dụng công nghệ AI mới nhất để cá nhân hóa trải nghiệm của từng người dùng",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Bảo mật tuyệt đối",
      description: "Thông tin cá nhân của bạn được bảo vệ với tiêu chuẩn bảo mật cao nhất",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Cải tiến liên tục",
      description: "Luôn cập nhật xu hướng tuyển dụng và phát triển tính năng mới",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  const timeline = [
    {
      year: "2023",
      title: "Ra mắt Ra Trường Làm Gì",
      description: "Khởi đầu với mục tiêu hỗ trợ sinh viên mới ra trường",
      achievements: ["1000+ người dùng đầu tiên", "CV Builder cơ bản"],
    },
    {
      year: "2024 Q1",
      title: "Tích hợp AI",
      description: "Phát triển hệ thống AI để cá nhân hóa trải nghiệm",
      achievements: ["AI Interview Simulator", "CV Analysis", "10K+ người dùng"],
    },
    {
      year: "2024 Q2",
      title: "Mở rộng tính năng",
      description: "Thêm nhiều công cụ hỗ trợ tìm việc",
      achievements: ["Job Matching", "Career Guidance", "25K+ người dùng"],
    },
    {
      year: "2024 Q3",
      title: "Cộng đồng phát triển",
      description: "Xây dựng cộng đồng chia sẻ kinh nghiệm",
      achievements: ["Community Forum", "Mentor Network", "50K+ người dùng"],
    },
  ]

  const team = [
    {
      name: "Nguyễn Văn A",
      role: "Founder & CEO",
      description: "10+ năm kinh nghiệm trong HR và tuyển dụng",
      avatar: "/placeholder.svg?height=100&width=100",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Trần Thị B",
      role: "CTO",
      description: "Chuyên gia AI và Machine Learning",
      avatar: "/placeholder.svg?height=100&width=100",
      social: { linkedin: "#", github: "#" },
    },
    {
      name: "Lê Văn C",
      role: "Head of Product",
      description: "Chuyên gia UX/UI và phát triển sản phẩm",
      avatar: "/placeholder.svg?height=100&width=100",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Phạm Thị D",
      role: "Head of Content",
      description: "Chuyên gia nội dung và career coaching",
      avatar: "/placeholder.svg?height=100&width=100",
      social: { linkedin: "#" },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Về{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                chúng tôi
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Ra Trường Làm Gì được sinh ra từ mong muốn giúp đỡ hàng triệu sinh viên Việt Nam tự tin bước vào thế giới
              nghề nghiệp với những công cụ AI tiên tiến và hoàn toàn miễn phí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cv-builder">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                >
                  Bắt đầu ngay
                </Button>
              </Link>
              <Link href="/guide">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Tìm hiểu thêm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/70">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission & Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Sứ mệnh & Giá trị</h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Chúng tôi tin rằng mọi sinh viên đều xứng đáng có cơ hội phát triển sự nghiệp tốt nhất. Đó là lý do tại
              sao chúng tôi tạo ra Ra Trường Làm Gì.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-full">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-white/70">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Hành trình phát triển</h2>
            <p className="text-white/70">Từ ý tưởng đến hiện thực</p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="flex-shrink-0">
                        <Badge className="bg-gradient-to-r from-blue-500 to-teal-600 text-white text-lg px-4 py-2">
                          {item.year}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/70 mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="flex items-center text-green-400 text-sm">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Đội ngũ của chúng tôi</h2>
            <p className="text-white/70">Những người đam mê công nghệ và giáo dục</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                    <p className="text-white/70 text-sm mb-4">{member.description}</p>
                    <div className="flex justify-center space-x-2">
                      {member.social.linkedin && (
                        <Button size="sm" variant="ghost" className="text-white/60 hover:text-white p-2">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      )}
                      {member.social.github && (
                        <Button size="sm" variant="ghost" className="text-white/60 hover:text-white p-2">
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button size="sm" variant="ghost" className="text-white/60 hover:text-white p-2">
                          <Twitter className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">Liên hệ với chúng tôi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mb-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <p className="text-white/70">contact@ratruonglamgi.com</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Hotline</h4>
                  <p className="text-white/70">1900 1234</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-1">Địa chỉ</h4>
                  <p className="text-white/70">Hà Nội, Việt Nam</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
