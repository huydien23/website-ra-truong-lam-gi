"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  Mic,
  MicOff,
  Play,
  RotateCcw,
  CheckCircle,
  Clock,
  Star,
  Sparkles,
  User,
  Bot,
  Code,
  DollarSign,
  Plane,
  Building,
  Users,
  TrendingUp,
  Heart,
  Palette,
  Truck,
  ShoppingCart,
  GraduationCap,
  Shield,
  Filter,
} from "lucide-react"
import { useApp } from "@/app/providers"

interface Question {
  id: number
  text: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  tips: string[]
}

interface InterviewSession {
  id: string
  type: string
  questions: Question[]
  answers: string[]
  score: number
  feedback: string[]
  startTime: Date
  endTime?: Date
}

export default function InterviewPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes per question
  const [sessionType, setSessionType] = useState<string | null>(null)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/auth")
    }
  }, [state.isAuthenticated, router])

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSessionActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleNextQuestion()
    }
    return () => clearInterval(interval)
  }, [isSessionActive, timeLeft])

  const industries = [
    { value: "technology", label: "Công nghệ", icon: Code },
    { value: "finance", label: "Tài chính - Ngân hàng", icon: DollarSign },
    { value: "tourism", label: "Du lịch - Lữ hành", icon: Plane },
    { value: "hospitality", label: "Khách sạn - Nhà hàng", icon: Building },
    { value: "marketing", label: "Marketing - Truyền thông", icon: TrendingUp },
    { value: "hr", label: "Nhân sự - Tuyển dụng", icon: Users },
    { value: "healthcare", label: "Y tế - Chăm sóc sức khỏe", icon: Heart },
    { value: "design", label: "Thiết kế - Sáng tạo", icon: Palette },
    { value: "logistics", label: "Logistics - Vận tải", icon: Truck },
    { value: "sales", label: "Kinh doanh - Bán hàng", icon: ShoppingCart },
    { value: "education", label: "Giáo dục - Đào tạo", icon: GraduationCap },
    { value: "legal", label: "Pháp lý - Luật sư", icon: Shield },
    { value: "general", label: "Phỏng vấn chung", icon: MessageSquare },
  ]

  const jobLevels = [
    { value: "entry", label: "Sinh viên mới ra trường", description: "0-1 năm kinh nghiệm" },
    { value: "junior", label: "Junior Level", description: "1-3 năm kinh nghiệm" },
    { value: "mid", label: "Mid Level", description: "3-5 năm kinh nghiệm" },
    { value: "senior", label: "Senior Level", description: "5+ năm kinh nghiệm" },
  ]

  const interviewTypes = [
    {
      id: "frontend",
      title: "Frontend Developer",
      description: "React, JavaScript, HTML/CSS",
      difficulty: "medium",
      duration: "30 phút",
      questions: 8,
      color: "from-blue-500 to-cyan-500",
      icon: Code,
      industry: "technology",
    },
    {
      id: "backend",
      title: "Backend Developer",
      description: "Node.js, Database, API",
      difficulty: "medium",
      duration: "35 phút",
      questions: 10,
      color: "from-green-500 to-emerald-500",
      icon: Code,
      industry: "technology",
    },
    {
      id: "fullstack",
      title: "Full-stack Developer",
      description: "Frontend + Backend",
      difficulty: "hard",
      duration: "45 phút",
      questions: 12,
      color: "from-purple-500 to-pink-500",
      icon: Code,
      industry: "technology",
    },
    {
      id: "finance",
      title: "Chuyên viên Tài chính",
      description: "Phân tích tài chính, Tín dụng",
      difficulty: "medium",
      duration: "40 phút",
      questions: 10,
      color: "from-yellow-500 to-orange-500",
      icon: DollarSign,
      industry: "finance",
    },
    {
      id: "banking",
      title: "Nhân viên Ngân hàng",
      description: "Tư vấn khách hàng, Sản phẩm",
      difficulty: "easy",
      duration: "30 phút",
      questions: 8,
      color: "from-emerald-500 to-teal-500",
      icon: DollarSign,
      industry: "finance",
    },
    {
      id: "tourism",
      title: "Hướng dẫn viên Du lịch",
      description: "Tour guide, Tư vấn du lịch",
      difficulty: "easy",
      duration: "25 phút",
      questions: 8,
      color: "from-teal-500 to-blue-500",
      icon: Plane,
      industry: "tourism",
    },
    {
      id: "hotel",
      title: "Nhân viên Khách sạn",
      description: "Quản lý khách sạn, F&B",
      difficulty: "medium",
      duration: "30 phút",
      questions: 9,
      color: "from-indigo-500 to-purple-500",
      icon: Building,
      industry: "hospitality",
    },
    {
      id: "marketing",
      title: "Marketing Specialist",
      description: "Digital Marketing, Content",
      difficulty: "medium",
      duration: "35 phút",
      questions: 10,
      color: "from-pink-500 to-rose-500",
      icon: TrendingUp,
      industry: "marketing",
    },
    {
      id: "hr",
      title: "HR Specialist",
      description: "HR Management, Recruitment",
      difficulty: "medium",
      duration: "30 phút",
      questions: 8,
      color: "from-emerald-500 to-teal-500",
      icon: Users,
      industry: "hr",
    },
    {
      id: "healthcare",
      title: "Điều dưỡng viên",
      description: "Điều dưỡng, Y tá, Bác sĩ",
      difficulty: "hard",
      duration: "40 phút",
      questions: 12,
      color: "from-red-500 to-pink-500",
      icon: Heart,
      industry: "healthcare",
    },
    {
      id: "design",
      title: "UI/UX Designer",
      description: "UI/UX, Graphic Design",
      difficulty: "medium",
      duration: "30 phút",
      questions: 8,
      color: "from-violet-500 to-purple-500",
      icon: Palette,
      industry: "design",
    },
    {
      id: "logistics",
      title: "Logistics Coordinator",
      description: "Quản lý chuỗi cung ứng",
      difficulty: "medium",
      duration: "35 phút",
      questions: 9,
      color: "from-orange-500 to-red-500",
      icon: Truck,
      industry: "logistics",
    },
    {
      id: "sales",
      title: "Sales Executive",
      description: "Sales, Business Development",
      difficulty: "easy",
      duration: "25 phút",
      questions: 7,
      color: "from-cyan-500 to-blue-500",
      icon: ShoppingCart,
      industry: "sales",
    },
    {
      id: "education",
      title: "Giảng viên",
      description: "Giảng viên, Giáo viên",
      difficulty: "medium",
      duration: "30 phút",
      questions: 8,
      color: "from-blue-500 to-indigo-500",
      icon: GraduationCap,
      industry: "education",
    },
    {
      id: "legal",
      title: "Luật sư",
      description: "Tư vấn pháp lý, Hợp đồng",
      difficulty: "hard",
      duration: "45 phút",
      questions: 12,
      color: "from-gray-500 to-slate-500",
      icon: Shield,
      industry: "legal",
    },
    {
      id: "general",
      title: "Phỏng vấn chung",
      description: "Soft skills, kinh nghiệm",
      difficulty: "easy",
      duration: "20 phút",
      questions: 6,
      color: "from-slate-500 to-gray-500",
      icon: MessageSquare,
      industry: "general",
    },
  ]

  const sampleQuestions: Record<string, Question[]> = {
    frontend: [
      {
        id: 1,
        text: "Hãy giải thích sự khác biệt giữa var, let và const trong JavaScript?",
        category: "Technical",
        difficulty: "medium",
        tips: ["Nói về scope", "Hoisting behavior", "Reassignment"],
      },
      {
        id: 2,
        text: "React hooks là gì và tại sao chúng ta sử dụng chúng?",
        category: "Framework",
        difficulty: "medium",
        tips: ["useState, useEffect", "Functional components", "State management"],
      },
      {
        id: 3,
        text: "Làm thế nào để optimize performance của một React app?",
        category: "Performance",
        difficulty: "hard",
        tips: ["Memoization", "Code splitting", "Bundle optimization"],
      },
    ],
    backend: [
      {
        id: 1,
        text: "RESTful API là gì và các HTTP methods chính?",
        category: "API",
        difficulty: "medium",
        tips: ["GET, POST, PUT, DELETE", "Stateless", "Resource-based"],
      },
      {
        id: 2,
        text: "Giải thích về database indexing và tại sao nó quan trọng?",
        category: "Database",
        difficulty: "hard",
        tips: ["Query performance", "B-tree structure", "Trade-offs"],
      },
    ],
    finance: [
      {
        id: 1,
        text: "Hãy giải thích về các chỉ số tài chính cơ bản để đánh giá một công ty?",
        category: "Financial Analysis",
        difficulty: "medium",
        tips: ["ROE, ROA, P/E ratio", "Liquidity ratios", "Debt ratios"],
      },
      {
        id: 2,
        text: "Quy trình thẩm định tín dụng cá nhân tại ngân hàng như thế nào?",
        category: "Credit Assessment",
        difficulty: "medium",
        tips: ["Thu nhập, tài sản", "Lịch sử tín dụng", "Khả năng trả nợ"],
      },
      {
        id: 3,
        text: "Làm thế nào để quản lý rủi ro trong đầu tư tài chính?",
        category: "Risk Management",
        difficulty: "hard",
        tips: ["Diversification", "Risk assessment", "Portfolio management"],
      },
    ],
    general: [
      {
        id: 1,
        text: "Hãy giới thiệu về bản thân và lý do bạn quan tâm đến vị trí này?",
        category: "Personal",
        difficulty: "easy",
        tips: ["Highlight relevant experience", "Show enthusiasm", "Connect to role"],
      },
      {
        id: 2,
        text: "Điểm mạnh và điểm yếu của bạn là gì?",
        category: "Self-assessment",
        difficulty: "easy",
        tips: ["Be honest but strategic", "Show self-awareness", "Improvement mindset"],
      },
      {
        id: 3,
        text: "Làm thế nào bạn xử lý stress và pressure trong công việc?",
        category: "Stress Management",
        difficulty: "medium",
        tips: ["Specific examples", "Coping strategies", "Positive outcomes"],
      },
    ],
  }

  // Filter interview types based on selected filters
  const filteredInterviewTypes = interviewTypes.filter((type) => {
    if (selectedIndustry !== "all" && type.industry !== selectedIndustry) return false
    if (selectedLevel !== "all") {
      // Filter by difficulty based on level
      if (selectedLevel === "entry" && type.difficulty === "hard") return false
      if (selectedLevel === "senior" && type.difficulty === "easy") return false
    }
    return true
  })

  const startInterview = (type: string) => {
    const questions = sampleQuestions[type] || sampleQuestions.general
    const newSession: InterviewSession = {
      id: Date.now().toString(),
      type,
      questions,
      answers: [],
      score: 0,
      feedback: [],
      startTime: new Date(),
    }

    setCurrentSession(newSession)
    setSessionType(type)
    setCurrentQuestionIndex(0)
    setTimeLeft(120)
    setIsSessionActive(true)
  }

  const handleNextQuestion = () => {
    if (!currentSession) return

    // Save current answer
    const updatedAnswers = [...currentSession.answers]
    updatedAnswers[currentQuestionIndex] = currentAnswer

    if (currentQuestionIndex < currentSession.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setCurrentAnswer("")
      setTimeLeft(120)
      setCurrentSession({
        ...currentSession,
        answers: updatedAnswers,
      })
    } else {
      // End interview
      finishInterview({
        ...currentSession,
        answers: updatedAnswers,
        endTime: new Date(),
      })
    }
  }

  const finishInterview = (session: InterviewSession) => {
    // Calculate score (mock AI scoring)
    const score = Math.floor(Math.random() * 30) + 70 // 70-100 range

    // Generate feedback (mock AI feedback)
    const feedback = [
      "Câu trả lời của bạn thể hiện kiến thức tốt về chuyên môn",
      "Nên cải thiện cách trình bày để rõ ràng hơn",
      "Thể hiện được passion và enthusiasm tốt",
      "Có thể bổ sung thêm ví dụ thực tế",
    ]

    const completedSession = {
      ...session,
      score,
      feedback,
      endTime: new Date(),
    }

    // Save to global state
    dispatch({
      type: "ADD_INTERVIEW_SESSION",
      payload: {
        id: completedSession.id,
        type: completedSession.type,
        score: completedSession.score,
        date: completedSession.startTime.toISOString(),
        feedback: completedSession.feedback,
      },
    })

    setCurrentSession(completedSession)
    setIsSessionActive(false)
  }

  const resetInterview = () => {
    setCurrentSession(null)
    setSessionType(null)
    setCurrentQuestionIndex(0)
    setCurrentAnswer("")
    setTimeLeft(120)
    setIsSessionActive(false)
    setIsRecording(false)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Mock voice recording - in real app would use Web Speech API
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setCurrentAnswer("Đây là câu trả lời mẫu được ghi âm từ microphone...")
      }, 2000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!state.isAuthenticated) {
    return null
  }

  // Show results after interview
  if (currentSession && !isSessionActive && currentSession.endTime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Hoàn thành phỏng vấn!</h1>
            <p className="text-white/70">
              Bạn đã hoàn thành phỏng vấn {interviewTypes.find((t) => t.id === sessionType)?.title}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Score Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Kết quả của bạn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">{currentSession.score}/100</div>
                    <Badge
                      className={`${
                        currentSession.score >= 90
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : currentSession.score >= 80
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : currentSession.score >= 70
                              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                              : "bg-red-500/20 text-red-300 border-red-500/30"
                      }`}
                    >
                      {currentSession.score >= 90
                        ? "Xuất sắc"
                        : currentSession.score >= 80
                          ? "Tốt"
                          : currentSession.score >= 70
                            ? "Khá"
                            : "Cần cải thiện"}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/80">Kiến thức chuyên môn</span>
                        <span className="text-white">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/80">Kỹ năng giao tiếp</span>
                        <span className="text-white">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/80">Giải quyết vấn đề</span>
                        <span className="text-white">82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feedback Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Phản hồi từ AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentSession.feedback.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <p className="text-white/80 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button
              onClick={resetInterview}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              Luyện tập lại
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
            >
              Về Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Show interview session
  if (currentSession && isSessionActive) {
    const currentQuestion = currentSession.questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / currentSession.questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Phỏng vấn {interviewTypes.find((t) => t.id === sessionType)?.title}
                </h1>
                <p className="text-white/70">
                  Câu hỏi {currentQuestionIndex + 1} / {currentSession.questions.length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{formatTime(timeLeft)}</div>
                <p className="text-white/70 text-sm">Thời gian còn lại</p>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-teal-600/20 text-blue-300 border-blue-500/30">
                    {currentQuestion.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-white/20 ${
                      currentQuestion.difficulty === "easy"
                        ? "text-green-400"
                        : currentQuestion.difficulty === "medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  >
                    {currentQuestion.difficulty === "easy"
                      ? "Dễ"
                      : currentQuestion.difficulty === "medium"
                        ? "Trung bình"
                        : "Khó"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-4">{currentQuestion.text}</h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-white/70 text-sm mb-2">💡 Gợi ý trả lời:</p>
                      <ul className="text-white/60 text-sm space-y-1">
                        {currentQuestion.tips.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Answer Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Câu trả lời của bạn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Button
                    onClick={toggleRecording}
                    className={`${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                    {isRecording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
                  </Button>
                  {isRecording && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-400 text-sm">Đang ghi âm...</span>
                    </div>
                  )}
                </div>

                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Nhập câu trả lời của bạn hoặc sử dụng ghi âm..."
                  className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-between">
                  <Button
                    onClick={resetInterview}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Bắt đầu lại
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!currentAnswer.trim()}
                    className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                  >
                    {currentQuestionIndex < currentSession.questions.length - 1 ? "Câu tiếp theo" : "Hoàn thành"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  // Show interview type selection
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Luyện phỏng vấn với AI</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Thực hành phỏng vấn với AI interviewer thông minh cho nhiều ngành nghề khác nhau. Nhận feedback chi tiết và
            cải thiện kỹ năng của bạn.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Lọc theo ngành nghề và cấp độ
                </CardTitle>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
                </Button>
              </div>
            </CardHeader>
            {showFilters && (
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Ngành nghề</label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Chọn ngành nghề" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-white hover:bg-slate-700">
                        Tất cả ngành nghề
                      </SelectItem>
                      {industries.map((industry) => (
                        <SelectItem
                          key={industry.value}
                          value={industry.value}
                          className="text-white hover:bg-slate-700"
                        >
                          <div className="flex items-center">
                            <industry.icon className="w-4 h-4 mr-2" />
                            {industry.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Cấp độ kinh nghiệm</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Chọn cấp độ" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-white hover:bg-slate-700">
                        Tất cả cấp độ
                      </SelectItem>
                      {jobLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value} className="text-white hover:bg-slate-700">
                          <div>
                            <div className="font-medium">{level.label}</div>
                            <div className="text-xs text-white/60">{level.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>

        {/* Interview Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredInterviewTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${type.color} flex items-center justify-center mb-4`}
                  >
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{type.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Thời gian:</span>
                      <span className="text-white">{type.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Câu hỏi:</span>
                      <span className="text-white">{type.questions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Độ khó:</span>
                      <Badge
                        variant="outline"
                        className={`text-xs border-white/20 ${
                          type.difficulty === "easy"
                            ? "text-green-400"
                            : type.difficulty === "medium"
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {type.difficulty === "easy" ? "Dễ" : type.difficulty === "medium" ? "Trung bình" : "Khó"}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => startInterview(type.id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Bắt đầu
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredInterviewTypes.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-12">
                <MessageSquare className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Không tìm thấy phỏng vấn phù hợp</h3>
                <p className="text-white/70">Thử điều chỉnh bộ lọc để xem thêm tùy chọn</p>
                <Button
                  onClick={() => {
                    setSelectedIndustry("all")
                    setSelectedLevel("all")
                  }}
                  variant="outline"
                  className="mt-4 border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Xóa bộ lọc
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recent Sessions */}
        {state.interviewSessions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Lịch sử luyện tập
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {state.interviewSessions.slice(0, 6).map((session, index) => (
                    <div key={session.id} className="p-4 rounded-lg bg-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">
                          {interviewTypes.find((t) => t.id === session.type)?.title || session.type}
                        </h4>
                        <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30">
                          {session.score}/100
                        </Badge>
                      </div>
                      <p className="text-white/60 text-sm">{new Date(session.date).toLocaleDateString("vi-VN")}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
