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
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-lg border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Chào mừng trở lại, {state.user?.name}!</h1>
              <p className="text-white/70 mt-1">Hôm nay là ngày tuyệt vời để phát triển sự nghiệp</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Profile hoàn thiện {calculateProfileCompletion()}%
              </Badge>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "CV đã tạo",
              value: stats.cvsCreated.toString(),
              icon: FileText,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Phỏng vấn luyện tập",
              value: stats.interviewsPracticed.toString(),
              icon: MessageSquare,
              color: "from-green-500 to-emerald-500",
            },
            {
              label: "Việc làm phù hợp",
              value: stats.jobsMatched.toString(),
              icon: Briefcase,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Điểm CV trung bình",
              value: stats.avgCvScore.toString(),
              icon: Award,
              color: "from-orange-500 to-red-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Hành động nhanh
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <Link key={index} href={action.link} className="block">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/10"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}
                            >
                              <action.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium">{action.title}</h4>
                              <p className="text-white/60 text-sm">{action.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/40" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Progress Section */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Tiến độ hoàn thiện hồ sơ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 text-sm">Thông tin cá nhân</span>
                      <span className="text-white text-sm font-medium">
                        {state.user?.name && state.user?.email ? "100%" : "50%"}
                      </span>
                    </div>
                    <Progress value={state.user?.name && state.user?.email ? 100 : 50} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 text-sm">CV chuyên nghiệp</span>
                      <span className="text-white text-sm font-medium">{state.cvs.length > 0 ? "100%" : "0%"}</span>
                    </div>
                    <Progress value={state.cvs.length > 0 ? 100 : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 text-sm">Kỹ năng phỏng vấn</span>
                      <span className="text-white text-sm font-medium">
                        {state.interviewSessions.length > 0 ? "80%" : "0%"}
                      </span>
                    </div>
                    <Progress value={state.interviewSessions.length > 0 ? 80 : 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 text-sm">Portfolio dự án</span>
                      <span className="text-white text-sm font-medium">
                        {state.cvs.some((cv) => cv.skills.length > 3) ? "60%" : "0%"}
                      </span>
                    </div>
                    <Progress value={state.cvs.some((cv) => cv.skills.length > 3) ? 60 : 0} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activities */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Hoạt động gần đây
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <Link key={index} href={activity.link}>
                        <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{activity.action}</p>
                            <p className="text-white/60 text-sm">{activity.time}</p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Job Recommendations */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Việc làm phù hợp
                    </div>
                    <Link href="/jobs">
                      <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                        Xem tất cả
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobRecommendations.map((job, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{job.title}</h4>
                        <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30">
                          {job.match}% match
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm">{job.company}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-white/60 text-xs">{job.location}</p>
                        <p className="text-blue-400 text-xs font-medium">{job.salary}</p>
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs border-white/20 text-white/60">
                        {job.type}
                      </Badge>
                    </motion.div>
                  ))}
                  <Link href="/jobs">
                    <Button
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      Xem tất cả việc làm
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-gradient-to-r from-blue-500/10 to-teal-600/10 backdrop-blur-lg border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Thông tin từ AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <p className="text-white/80">
                        {state.cvs.length > 0
                          ? "CV của bạn có điểm mạnh về kỹ năng technical"
                          : "Hãy tạo CV đầu tiên để nhận phân tích từ AI"}
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                      <p className="text-white/80">
                        {state.interviewSessions.length > 0
                          ? "Kỹ năng phỏng vấn đang cải thiện tốt"
                          : "Nên luyện phỏng vấn để tăng tự tin"}
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <p className="text-white/80">
                        {stats.avgCvScore > 70
                          ? "Profile của bạn rất ấn tượng với nhà tuyển dụng"
                          : "Hãy bổ sung thêm thông tin để tăng điểm CV"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Resources */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Tài liệu học tập
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/guide/cv-tips">
                    <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="text-white font-medium text-sm">10 Tips viết CV ấn tượng</h4>
                      <p className="text-white/60 text-xs mt-1">Cách làm nổi bật CV của bạn</p>
                    </div>
                  </Link>
                  <Link href="/guide/interview-tips">
                    <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="text-white font-medium text-sm">Chuẩn bị phỏng vấn hiệu quả</h4>
                      <p className="text-white/60 text-xs mt-1">Chiến lược trả lời câu hỏi khó</p>
                    </div>
                  </Link>
                  <Link href="/guide/salary-negotiation">
                    <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="text-white font-medium text-sm">Thương lượng lương hiệu quả</h4>
                      <p className="text-white/60 text-xs mt-1">Cách đàm phán lương thành công</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
