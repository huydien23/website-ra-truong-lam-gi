"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  FileText,
  MessageSquare,
  Target,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Clock,
  Award,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function GuidePage() {
  const guideCategories = [
    {
      id: "cv-tips",
      title: "Viết CV hiệu quả",
      description: "Hướng dẫn chi tiết cách tạo CV ấn tượng",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      articles: 8,
      readTime: "15 phút",
    },
    {
      id: "interview-tips",
      title: "Kỹ năng phỏng vấn",
      description: "Chuẩn bị và thực hiện phỏng vấn thành công",
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
      articles: 12,
      readTime: "25 phút",
    },
    {
      id: "career-guidance",
      title: "Định hướng nghề nghiệp",
      description: "Tìm hiểu về các ngành nghề và lộ trình phát triển",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      articles: 15,
      readTime: "30 phút",
    },
    {
      id: "job-search",
      title: "Tìm kiếm việc làm",
      description: "Chiến lược tìm việc hiệu quả cho sinh viên mới ra trường",
      icon: Users,
      color: "from-orange-500 to-red-500",
      articles: 10,
      readTime: "20 phút",
    },
  ]

  const featuredArticles = [
    {
      id: 1,
      title: "10 Tips viết CV ấn tượng cho sinh viên mới ra trường",
      category: "CV Tips",
      readTime: "5 phút",
      views: "12.5K",
      rating: 4.8,
      description: "Hướng dẫn từng bước tạo CV chuyên nghiệp, nổi bật trong mắt nhà tuyển dụng",
      tags: ["CV", "Sinh viên", "Tuyển dụng"],
    },
    {
      id: 2,
      title: "Cách trả lời 15 câu hỏi phỏng vấn khó nhất",
      category: "Interview",
      readTime: "8 phút",
      views: "18.2K",
      rating: 4.9,
      description: "Chiến lược trả lời thông minh cho các câu hỏi phỏng vấn thử thách",
      tags: ["Phỏng vấn", "Kỹ năng", "Tự tin"],
    },
    {
      id: 3,
      title: "Roadmap nghề nghiệp IT cho người mới bắt đầu",
      category: "Career",
      readTime: "12 phút",
      views: "25.1K",
      rating: 4.7,
      description: "Lộ trình học tập và phát triển sự nghiệp trong ngành công nghệ thông tin",
      tags: ["IT", "Roadmap", "Lập trình"],
    },
    {
      id: 4,
      title: "Thương lượng lương hiệu quả - Bí quyết tăng thu nhập",
      category: "Salary",
      readTime: "6 phút",
      views: "9.8K",
      rating: 4.6,
      description: "Cách đàm phán lương thông minh và chuyên nghiệp",
      tags: ["Lương", "Đàm phán", "Thu nhập"],
    },
  ]

  const quickTips = [
    {
      icon: Lightbulb,
      title: "CV không nên quá 2 trang",
      description: "Tập trung vào thông tin quan trọng nhất",
    },
    {
      icon: Target,
      title: "Customize CV cho từng vị trí",
      description: "Điều chỉnh CV phù hợp với job description",
    },
    {
      icon: Star,
      title: "Sử dụng từ khóa ngành nghề",
      description: "Giúp CV dễ dàng được tìm thấy bởi ATS",
    },
    {
      icon: CheckCircle,
      title: "Kiểm tra chính tả kỹ lưỡng",
      description: "Lỗi chính tả có thể làm hỏng ấn tượng",
    },
  ]

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
              <BookOpen className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hướng dẫn{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                toàn diện
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Từ CV đến phỏng vấn, từ định hướng đến thành công. Tất cả kiến thức cần thiết để bạn tự tin bước vào thế
              giới nghề nghiệp.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Guide Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Chủ đề hướng dẫn</h2>
            <p className="text-white/70">Chọn chủ đề bạn quan tâm để bắt đầu học</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guideCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/guide/${category.id}`}>
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                      <p className="text-white/70 text-sm mb-4">{category.description}</p>
                      <div className="flex justify-between text-xs text-white/60 mb-4">
                        <span>{category.articles} bài viết</span>
                        <span>{category.readTime}</span>
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                      >
                        Khám phá
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Articles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Bài viết nổi bật</h2>
              <p className="text-white/70">Những hướng dẫn được đọc nhiều nhất</p>
            </div>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              Xem tất cả
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link href={`/guide/article/${article.id}`}>
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge className="bg-gradient-to-r from-blue-500/20 to-teal-600/20 text-blue-300 border-blue-500/30">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          <span className="text-sm">{article.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">{article.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs border-white/20 text-white/60">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-white/60 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {article.views} lượt xem
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-teal-600/10 backdrop-blur-lg border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Tips nhanh cho bạn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <tip.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-white font-medium mb-2">{tip.title}</h4>
                    <p className="text-white/70 text-sm">{tip.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng áp dụng kiến thức?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Bắt đầu tạo CV chuyên nghiệp và luyện phỏng vấn với AI ngay hôm nay
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cv-builder">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Tạo CV ngay
                  </Button>
                </Link>
                <Link href="/interview">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Luyện phỏng vấn
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
