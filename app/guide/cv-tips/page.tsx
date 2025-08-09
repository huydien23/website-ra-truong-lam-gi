"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  Star,
  Clock,
  Eye,
  Download,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function CVTipsPage() {
  const articles = [
    {
      id: 1,
      title: "10 Tips viết CV ấn tượng cho sinh viên mới ra trường",
      excerpt: "Hướng dẫn từng bước tạo CV chuyên nghiệp, nổi bật trong mắt nhà tuyển dụng",
      readTime: "5 phút",
      views: "12.5K",
      rating: 4.8,
      difficulty: "Cơ bản",
      tags: ["CV", "Sinh viên", "Tuyển dụng"],
    },
    {
      id: 2,
      title: "Cách viết CV không có kinh nghiệm làm việc",
      excerpt: "Làm thế nào để tạo CV ấn tượng khi chưa có kinh nghiệm thực tế",
      readTime: "7 phút",
      views: "8.9K",
      rating: 4.6,
      difficulty: "Cơ bản",
      tags: ["CV", "Fresher", "Kinh nghiệm"],
    },
    {
      id: 3,
      title: "Tối ưu CV để vượt qua hệ thống ATS",
      excerpt: "Bí quyết để CV của bạn được hệ thống tự động chấp nhận",
      readTime: "6 phút",
      views: "15.2K",
      rating: 4.9,
      difficulty: "Trung bình",
      tags: ["ATS", "Tối ưu", "Từ khóa"],
    },
    {
      id: 4,
      title: "CV cho ngành IT - Template và ví dụ cụ thể",
      excerpt: "Mẫu CV chuyên biệt cho lập trình viên và kỹ sư phần mềm",
      readTime: "8 phút",
      views: "22.1K",
      rating: 4.7,
      difficulty: "Trung bình",
      tags: ["IT", "Template", "Lập trình"],
    },
    {
      id: 5,
      title: "Những lỗi thường gặp khi viết CV và cách khắc phục",
      excerpt: "Top 15 lỗi phổ biến làm hỏng CV và cách tránh chúng",
      readTime: "10 phút",
      views: "18.7K",
      rating: 4.8,
      difficulty: "Cơ bản",
      tags: ["Lỗi CV", "Khắc phục", "Tips"],
    },
    {
      id: 6,
      title: "CV cho vị trí quản lý - Làm thế nào để nổi bật",
      excerpt: "Chiến lược viết CV cho các vị trí leadership và management",
      readTime: "9 phút",
      views: "11.3K",
      rating: 4.5,
      difficulty: "Nâng cao",
      tags: ["Quản lý", "Leadership", "Senior"],
    },
  ]

  const quickTips = [
    {
      icon: Target,
      title: "Tùy chỉnh cho từng vị trí",
      description: "Điều chỉnh CV phù hợp với job description cụ thể",
      color: "text-blue-400",
    },
    {
      icon: CheckCircle,
      title: "Sử dụng từ khóa ngành nghề",
      description: "Bao gồm các từ khóa quan trọng để vượt qua ATS",
      color: "text-green-400",
    },
    {
      icon: Star,
      title: "Làm nổi bật thành tích",
      description: "Sử dụng số liệu cụ thể để minh họa kết quả công việc",
      color: "text-yellow-400",
    },
    {
      icon: AlertTriangle,
      title: "Tránh thông tin không cần thiết",
      description: "Loại bỏ thông tin cá nhân không liên quan đến công việc",
      color: "text-orange-400",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Cơ bản":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Trung bình":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Nâng cao":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
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
          <div className="flex items-center mb-6">
            <Link href="/guide">
              <Button variant="ghost" className="text-white hover:bg-white/10 mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FileText className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Viết CV{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">hiệu quả</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Tổng hợp các bài viết hướng dẫn chi tiết về cách tạo CV chuyên nghiệp, ấn tượng và hiệu quả
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-600/10 backdrop-blur-lg border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Tips nhanh về CV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <tip.icon className={`w-6 h-6 ${tip.color}`} />
                    </div>
                    <h4 className="text-white font-medium mb-2">{tip.title}</h4>
                    <p className="text-white/70 text-sm">{tip.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Articles */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Bài viết hướng dẫn</h2>
              <p className="text-white/70">Tất cả về cách viết CV hiệu quả</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/guide/article/${article.id}`}>
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          <span className="text-sm">{article.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{article.title}</h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
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
                          <Eye className="w-4 h-4 mr-1" />
                          {article.views}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng tạo CV chuyên nghiệp?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Áp dụng ngay những kiến thức đã học để tạo CV ấn tượng với công cụ AI của chúng tôi
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cv-builder">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Tạo CV ngay
                  </Button>
                </Link>
                <Link href="/cv-analysis">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Phân tích CV
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
