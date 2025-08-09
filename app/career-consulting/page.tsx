"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  MessageSquare,
  Calendar,
  Star,
  Award,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Phone,
  Video,
  Mail,
  User,
} from "lucide-react"

export default function CareerConsultingPage() {
  const [selectedService, setSelectedService] = useState("")
  const [consultingForm, setConsultingForm] = useState({
    name: "",
    email: "",
    phone: "",
    field: "",
    experience: "",
    goals: "",
    challenges: "",
    preferredTime: "",
    consultingType: "",
  })

  const services = [
    {
      id: "career-guidance",
      title: "Định hướng nghề nghiệp",
      description: "Tìm hiểu bản thân, khám phá ngành nghề phù hợp",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      duration: "60 phút",
      price: "Miễn phí",
      features: ["Đánh giá năng lực", "Phân tích tính cách", "Gợi ý ngành nghề", "Lộ trình phát triển"],
    },
    {
      id: "cv-review",
      title: "Review CV chuyên sâu",
      description: "Chuyên gia HR review và tối ưu CV của bạn",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      duration: "45 phút",
      price: "199.000đ",
      features: ["Review chi tiết", "Tối ưu nội dung", "Thiết kế layout", "Tips phỏng vấn"],
    },
    {
      id: "interview-coaching",
      title: "Coaching phỏng vấn",
      description: "Luyện tập phỏng vấn 1-1 với chuyên gia",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-500",
      duration: "90 phút",
      price: "299.000đ",
      features: ["Mock interview", "Feedback chi tiết", "Cải thiện kỹ năng", "Tự tin phỏng vấn"],
    },
    {
      id: "career-switch",
      title: "Chuyển đổi nghề nghiệp",
      description: "Hỗ trợ chuyển sang ngành nghề mới",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      duration: "120 phút",
      price: "499.000đ",
      features: ["Phân tích gap skill", "Roadmap chuyển đổi", "Networking tips", "Theo dõi tiến độ"],
    },
  ]

  const consultants = [
    {
      id: 1,
      name: "Nguyễn Thị Hương",
      title: "Senior HR Manager",
      company: "FPT Software",
      experience: "8+ năm",
      specialties: ["IT", "Tuyển dụng", "Phát triển nhân sự"],
      rating: 4.9,
      reviews: 156,
      avatar: "/placeholder.svg?height=100&width=100",
      price: "300.000đ/buổi",
    },
    {
      id: 2,
      name: "Trần Văn Minh",
      title: "Career Coach",
      company: "VinGroup",
      experience: "10+ năm",
      specialties: ["Định hướng", "Leadership", "Chuyển đổi nghề nghiệp"],
      rating: 4.8,
      reviews: 203,
      avatar: "/placeholder.svg?height=100&width=100",
      price: "250.000đ/buổi",
    },
    {
      id: 3,
      name: "Lê Thị Mai",
      title: "Recruitment Director",
      company: "Shopee",
      experience: "12+ năm",
      specialties: ["E-commerce", "Marketing", "Sales"],
      rating: 4.9,
      reviews: 189,
      avatar: "/placeholder.svg?height=100&width=100",
      price: "350.000đ/buổi",
    },
  ]

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Software Engineer",
      content: "Nhờ tư vấn của chị Hương, em đã tìm được công việc mơ ước tại Google. CV được tối ưu rất tốt!",
      rating: 5,
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Trần Thị B",
      role: "Marketing Manager",
      content: "Buổi coaching phỏng vấn giúp em tự tin hơn rất nhiều. Đã pass 3/3 vòng phỏng vấn!",
      rating: 5,
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Lê Văn C",
      role: "Product Manager",
      content: "Định hướng nghề nghiệp rất chi tiết và thực tế. Giúp em có roadmap rõ ràng cho 5 năm tới.",
      rating: 5,
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Consulting form submitted:", consultingForm)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      {/* Header */}
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
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tư vấn{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                nghề nghiệp
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Kết nối với các chuyên gia HR hàng đầu. Nhận tư vấn 1-1 để định hướng sự nghiệp, tối ưu CV và chuẩn bị
              phỏng vấn thành công.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Dịch vụ tư vấn</h2>
            <p className="text-white/70">Chọn dịch vụ phù hợp với nhu cầu của bạn</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 text-center">{service.title}</h3>
                    <p className="text-white/70 text-sm mb-4 text-center">{service.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Thời gian:</span>
                        <span className="text-white">{service.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Giá:</span>
                        <span className="text-green-400 font-bold">{service.price}</span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-white/70">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                      onClick={() => setSelectedService(service.id)}
                    >
                      Đặt lịch tư vấn
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Consultants */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Chuyên gia tư vấn</h2>
            <p className="text-white/70">Đội ngũ chuyên gia giàu kinh nghiệm từ các công ty hàng đầu</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {consultants.map((consultant, index) => (
              <motion.div
                key={consultant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 mx-auto mb-4 flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{consultant.name}</h3>
                      <p className="text-blue-400 text-sm mb-1">{consultant.title}</p>
                      <p className="text-white/60 text-sm">{consultant.company}</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Kinh nghiệm:</span>
                        <span className="text-white">{consultant.experience}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Đánh giá:</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-white">{consultant.rating}</span>
                          <span className="text-white/60 ml-1">({consultant.reviews})</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Giá:</span>
                        <span className="text-green-400 font-bold">{consultant.price}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-white/60 text-sm mb-2">Chuyên môn:</p>
                      <div className="flex flex-wrap gap-1">
                        {consultant.specialties.map((specialty, specialtyIndex) => (
                          <Badge
                            key={specialtyIndex}
                            variant="outline"
                            className="text-xs border-white/20 text-white/70"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        Đặt lịch
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Booking Form */}
        {selectedService && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Đặt lịch tư vấn</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2">Họ và tên *</label>
                      <Input
                        value={consultingForm.name}
                        onChange={(e) => setConsultingForm({ ...consultingForm, name: e.target.value })}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Email *</label>
                      <Input
                        type="email"
                        value={consultingForm.email}
                        onChange={(e) => setConsultingForm({ ...consultingForm, email: e.target.value })}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2">Số điện thoại *</label>
                      <Input
                        value={consultingForm.phone}
                        onChange={(e) => setConsultingForm({ ...consultingForm, phone: e.target.value })}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">Lĩnh vực quan tâm</label>
                      <Select
                        value={consultingForm.field}
                        onValueChange={(value) => setConsultingForm({ ...consultingForm, field: value })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Chọn lĩnh vực" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">Công nghệ thông tin</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Kinh doanh</SelectItem>
                          <SelectItem value="finance">Tài chính</SelectItem>
                          <SelectItem value="hr">Nhân sự</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2">Kinh nghiệm làm việc</label>
                      <Select
                        value={consultingForm.experience}
                        onValueChange={(value) => setConsultingForm({ ...consultingForm, experience: value })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Chọn kinh nghiệm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fresh">Mới ra trường</SelectItem>
                          <SelectItem value="1-2">1-2 năm</SelectItem>
                          <SelectItem value="3-5">3-5 năm</SelectItem>
                          <SelectItem value="5+">Trên 5 năm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-white mb-2">Hình thức tư vấn</label>
                      <Select
                        value={consultingForm.consultingType}
                        onValueChange={(value) => setConsultingForm({ ...consultingForm, consultingType: value })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Chọn hình thức" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online (Zoom/Meet)</SelectItem>
                          <SelectItem value="phone">Điện thoại</SelectItem>
                          <SelectItem value="offline">Trực tiếp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Mục tiêu nghề nghiệp</label>
                    <Textarea
                      value={consultingForm.goals}
                      onChange={(e) => setConsultingForm({ ...consultingForm, goals: e.target.value })}
                      className="bg-white/5 border-white/20 text-white"
                      placeholder="Chia sẻ mục tiêu nghề nghiệp của bạn..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Thách thức hiện tại</label>
                    <Textarea
                      value={consultingForm.challenges}
                      onChange={(e) => setConsultingForm({ ...consultingForm, challenges: e.target.value })}
                      className="bg-white/5 border-white/20 text-white"
                      placeholder="Những khó khăn bạn đang gặp phải..."
                      rows={3}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                      onClick={() => setSelectedService("")}
                    >
                      Hủy
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                    >
                      Đặt lịch tư vấn
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Phản hồi từ khách hàng</h2>
            <p className="text-white/70">Những chia sẻ từ người đã sử dụng dịch vụ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-600 flex items-center justify-center mr-3">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{testimonial.name}</h4>
                        <p className="text-white/60 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/80 text-sm italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Methods */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">Liên hệ tư vấn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Hotline tư vấn</h4>
                  <p className="text-white/70 mb-4">1900 1234</p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                  >
                    Gọi ngay
                  </Button>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Tư vấn online</h4>
                  <p className="text-white/70 mb-4">Zoom/Google Meet</p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Đặt lịch
                  </Button>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Email tư vấn</h4>
                  <p className="text-white/70 mb-4">consulting@ratruonglamgi.com</p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    Gửi email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
