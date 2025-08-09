"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  MessageSquare,
  Target,
  TrendingUp,
  Award,
  Briefcase,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  BarChart3,
} from "lucide-react"
import { useApp } from "@/app/providers"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [stats, setStats] = useState({
    cvsCreated: 0,
    interviewsPracticed: 0,
    jobsMatched: 0,
    avgCvScore: 0,
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/auth")
    }
  }, [state.isAuthenticated, router])

  // Calculate stats from state
  useEffect(() => {
    if (state.isAuthenticated) {
      setStats({
        cvsCreated: state.cvs.length,
        interviewsPracticed: state.interviewSessions.length,
        jobsMatched: 8, // Mock data
        avgCvScore:
          state.cvs.length > 0 ? Math.round(state.cvs.reduce((acc, cv) => acc + cv.score, 0) / state.cvs.length) : 0,
      })
    }
  }, [state])

  const recentActivities = [
    { action: "Tạo CV mới", time: "2 giờ trước", status: "completed", link: "/cv-builder" },
    { action: "Luyện phỏng vấn Frontend", time: "1 ngày trước", status: "completed", link: "/interview" },
    { action: "Phân tích CV", time: "2 ngày trước", status: "completed", link: "/cv-analysis" },
    { action: "Cập nhật profile", time: "3 ngày trước", status: "completed", link: "/profile" },
  ]

  const jobRecommendations = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Startup ABC",
      match: 92,
      location: "Hà Nội",
      salary: "15-20 triệu",
      type: "Full-time",
    },
    {
      id: 2,
      title: "React Developer",
      company: "Digital Agency XYZ",
      match: 88,
      location: "TP.HCM",
      salary: "12-18 triệu",
      type: "Remote",
    },
    {
      id: 3,
      title: "Full-stack Developer",
      company: "E-commerce Platform",
      match: 85,
      location: "Remote",
      salary: "18-25 triệu",
      type: "Contract",
    },
  ]

  const quickActions = [
    {
      title: "Tạo CV mới",
      description: "Tạo CV chuyên nghiệp với AI",
      icon: FileText,
      link: "/cv-builder",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Luyện phỏng vấn",
      description: "Thực hành với AI interviewer",
      icon: MessageSquare,
      link: "/interview",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Phân tích CV",
      description: "Nhận feedback từ AI",
      icon: BarChart3,
      link: "/cv-analysis",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Tìm việc làm",
      description: "Khám phá cơ hội nghề nghiệp",
      icon: Briefcase,
      link: "/jobs",
      color: "from-orange-500 to-red-500",
    },
  ]

  const calculateProfileCompletion = () => {
    let completion = 0

    // Basic info (25%)
    if (state.user?.name && state.user?.email) completion += 25

    // CV created (35%)
    if (state.cvs.length > 0) completion += 35

    // Interview practice (25%)
    if (state.interviewSessions.length > 0) completion += 25

    // Skills assessment (15%)
    if (state.cvs.some((cv) => cv.skills.length > 3)) completion += 15

    return Math.min(completion, 100)
  }

  if (!state.isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      {/* Modern Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/5 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-white mb-2"
              >
                Chào mừng trở lại, {state.user?.name}! 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/70 text-lg"
              >
                Hôm nay là ngày tuyệt vời để phát triển sự nghiệp
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-full border border-green-500/30">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-300 font-medium">Profile hoàn thiện {calculateProfileCompletion()}%</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Main Layout - Content Left, Sidebar Right */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Modern Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "CV đã tạo",
                  value: stats.cvsCreated.toString(),
                  icon: FileText,
                  color: "from-blue-500 to-cyan-500",
                  description: "CV chuyên nghiệp"
                },
                {
                  label: "Phỏng vấn luyện tập",
                  value: stats.interviewsPracticed.toString(),
                  icon: MessageSquare,
                  color: "from-green-500 to-emerald-500",
                  description: "Lần thực hành"
                },
                {
                  label: "Việc làm phù hợp",
                  value: stats.jobsMatched.toString(),
                  icon: Briefcase,
                  color: "from-purple-500 to-pink-500",
                  description: "Cơ hội nghề nghiệp"
                },
                {
                  label: "Điểm CV trung bình",
                  value: stats.avgCvScore.toString(),
                  icon: Award,
                  color: "from-orange-500 to-red-500",
                  description: "Điểm AI đánh giá"
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <stat.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-white/70 text-sm font-medium mb-1">{stat.label}</div>
                        <div className="text-white/50 text-xs">{stat.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {/* Modern Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <Sparkles className="w-6 h-6 mr-3 text-blue-400" />
                  Hành động nhanh
                </h2>
                <p className="text-white/60">Công cụ thiết yếu để phát triển sự nghiệp</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.link} className="block">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group"
                    >
                      <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              <action.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {action.title}
                              </h3>
                              <p className="text-white/70 mb-4">{action.description}</p>
                              <div className="flex items-center text-blue-400 font-medium">
                                <span className="mr-2">Bắt đầu ngay</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Modern Progress Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-green-400" />
                  Tiến độ hoàn thiện hồ sơ
                </h2>
                <p className="text-white/60">Hoàn thiện profile để tăng cơ hội được tuyển dụng</p>
              </div>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {[
                      {
                        label: "Thông tin cá nhân",
                        value: state.user?.name && state.user?.email ? 100 : 50,
                        color: "from-blue-500 to-cyan-500"
                      },
                      {
                        label: "CV chuyên nghiệp",
                        value: state.cvs.length > 0 ? 100 : 0,
                        color: "from-green-500 to-emerald-500"
                      },
                      {
                        label: "Kỹ năng phỏng vấn",
                        value: state.interviewSessions.length > 0 ? 80 : 0,
                        color: "from-purple-500 to-pink-500"
                      },
                      {
                        label: "Portfolio dự án",
                        value: state.cvs.some((cv) => cv.skills.length > 3) ? 60 : 0,
                        color: "from-orange-500 to-red-500"
                      }
                    ].map((item, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{item.label}</span>
                          <span className="text-white/80 text-sm font-bold">{item.value}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
                            className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Modern Recent Activities */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-purple-400" />
                  Hoạt động gần đây
                </h2>
                <p className="text-white/60">Theo dõi tiến trình phát triển của bạn</p>
              </div>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <Link key={index} href={activity.link}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.3 + index * 0.1 }}
                          whileHover={{ x: 4 }}
                          className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-white font-medium group-hover:text-blue-300 transition-colors">{activity.action}</p>
                            <p className="text-white/60 text-sm">{activity.time}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Modern Right Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI-Powered Job Recommendations */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-1 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-400" />
                  Việc làm phù hợp
                </h2>
                <p className="text-white/60 text-sm">AI gợi ý dựa trên CV của bạn</p>
              </div>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {jobRecommendations.map((job, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/5 hover:border-white/20"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-white font-semibold group-hover:text-blue-300 transition-colors">{job.title}</h4>
                          <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 text-xs px-2 py-1">
                            {job.match}% match
                          </Badge>
                        </div>
                        <p className="text-white/70 font-medium mb-2">{job.company}</p>
                        <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                          <span className="flex items-center">
                            📍 {job.location}
                          </span>
                          <span className="text-blue-400 font-semibold">{job.salary}</span>
                        </div>
                        <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                          {job.type}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  <Link href="/jobs">
                    <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium">
                      Xem tất cả việc làm
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights Dashboard */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-1 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                  Thông tin từ AI
                </h2>
                <p className="text-white/60 text-sm">Phân tích thông minh về profile của bạn</p>
              </div>
              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border-blue-500/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        icon: "🎯",
                        text: state.cvs.length > 0
                          ? "CV của bạn có điểm mạnh về kỹ năng technical"
                          : "Hãy tạo CV đầu tiên để nhận phân tích từ AI",
                        color: "from-blue-400 to-cyan-400"
                      },
                      {
                        icon: "💪",
                        text: state.interviewSessions.length > 0
                          ? "Kỹ năng phỏng vấn đang cải thiện tốt"
                          : "Nên luyện phỏng vấn để tăng tự tin",
                        color: "from-green-400 to-emerald-400"
                      },
                      {
                        icon: "⭐",
                        text: stats.avgCvScore > 70
                          ? "Profile của bạn rất ấn tượng với nhà tuyển dụng"
                          : "Hãy bổ sung thêm thông tin để tăng điểm CV",
                        color: "from-purple-400 to-pink-400"
                      }
                    ].map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="text-lg">{insight.icon}</div>
                        <p className="text-white/90 text-sm leading-relaxed">{insight.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Hub */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-1 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Tài liệu học tập
                </h2>
                <p className="text-white/60 text-sm">Nâng cao kỹ năng với các hướng dẫn chuyên sâu</p>
              </div>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {[
                      {
                        title: "10 Tips viết CV ấn tượng",
                        description: "Cách làm nổi bật CV của bạn",
                        link: "/guide/cv-tips",
                        icon: "📝",
                        readTime: "5 phút"
                      },
                      {
                        title: "Chuẩn bị phỏng vấn hiệu quả",
                        description: "Chiến lược trả lời câu hỏi khó",
                        link: "/guide/interview-tips",
                        icon: "🎤",
                        readTime: "8 phút"
                      },
                      {
                        title: "Thương lượng lương hiệu quả",
                        description: "Cách đàm phán lương thành công",
                        link: "/guide/salary-negotiation",
                        icon: "💰",
                        readTime: "6 phút"
                      }
                    ].map((resource, index) => (
                      <Link key={index} href={resource.link}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          whileHover={{ x: 4 }}
                          className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/5 hover:border-white/20"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-xl">{resource.icon}</div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium group-hover:text-yellow-300 transition-colors">{resource.title}</h4>
                              <p className="text-white/60 text-xs mt-1">{resource.description}</p>
                              <div className="flex items-center mt-2 text-yellow-400 text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {resource.readTime}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
