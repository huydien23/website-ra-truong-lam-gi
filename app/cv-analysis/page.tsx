"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  FileText,
  Clipboard,
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Target,
  Award,
  Lightbulb,
  Download,
  RefreshCw,
} from "lucide-react"
import { useApp } from "@/app/providers"

export default function CVAnalysisPage() {
  const [analysisMethod, setAnalysisMethod] = useState<"upload" | "existing" | "paste">("upload")
  const [cvText, setCvText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const { state } = useApp()

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis result
    setAnalysisResult({
      overallScore: 78,
      atsScore: 85,
      sections: {
        personalInfo: { score: 90, status: "excellent" },
        summary: { score: 75, status: "good" },
        experience: { score: 80, status: "good" },
        education: { score: 85, status: "excellent" },
        skills: { score: 70, status: "average" },
        achievements: { score: 65, status: "average" },
      },
      strengths: [
        "Thông tin liên hệ đầy đủ và chuyên nghiệp",
        "Kinh nghiệm làm việc được trình bày rõ ràng",
        "Học vấn phù hợp với vị trí ứng tuyển",
      ],
      improvements: [
        "Cần bổ sung thêm kỹ năng mềm",
        "Thiếu số liệu cụ thể về thành tích",
        "Summary cần ngắn gọn và ấn tượng hơn",
      ],
      suggestions: [
        "Thêm 2-3 kỹ năng mềm quan trọng",
        "Sử dụng số liệu để minh họa thành tích",
        "Viết lại phần summary trong 3-4 câu",
        "Thêm portfolio hoặc dự án cá nhân",
      ],
    })
    setIsAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "good":
        return <CheckCircle className="w-5 h-5 text-blue-400" />
      case "average":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default:
        return <XCircle className="w-5 h-5 text-red-400" />
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
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Phân tích{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">CV AI</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Nhận phân tích chi tiết về CV của bạn từ AI. Khám phá điểm mạnh, điểm cần cải thiện và nhận gợi ý cụ thể
              để tối ưu hóa CV.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!analysisResult ? (
          <>
            {/* Upload Methods */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Chọn cách tải CV</h2>
                <p className="text-white/70">Chọn một trong ba cách để phân tích CV của bạn</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <motion.div whileHover={{ y: -5 }}>
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      analysisMethod === "upload"
                        ? "bg-blue-500/20 border-blue-500/50"
                        : "bg-white/10 border-white/20 hover:bg-white/15"
                    } backdrop-blur-lg`}
                    onClick={() => setAnalysisMethod("upload")}
                  >
                    <CardContent className="p-6 text-center">
                      <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">Tải file CV</h3>
                      <p className="text-white/70 text-sm">Upload file PDF, DOC, DOCX</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -5 }}>
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      analysisMethod === "existing"
                        ? "bg-blue-500/20 border-blue-500/50"
                        : "bg-white/10 border-white/20 hover:bg-white/15"
                    } backdrop-blur-lg`}
                    onClick={() => setAnalysisMethod("existing")}
                  >
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">CV có sẵn</h3>
                      <p className="text-white/70 text-sm">Chọn từ CV đã tạo trước đó</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -5 }}>
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      analysisMethod === "paste"
                        ? "bg-blue-500/20 border-blue-500/50"
                        : "bg-white/10 border-white/20 hover:bg-white/15"
                    } backdrop-blur-lg`}
                    onClick={() => setAnalysisMethod("paste")}
                  >
                    <CardContent className="p-6 text-center">
                      <Clipboard className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">Dán nội dung</h3>
                      <p className="text-white/70 text-sm">Copy & paste nội dung CV</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.section>

            {/* Upload Interface */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">
                    {analysisMethod === "upload" && "Tải file CV"}
                    {analysisMethod === "existing" && "Chọn CV có sẵn"}
                    {analysisMethod === "paste" && "Dán nội dung CV"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisMethod === "upload" && (
                    <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                      <Upload className="w-16 h-16 text-white/50 mx-auto mb-4" />
                      <p className="text-white mb-4">Kéo thả file hoặc click để chọn</p>
                      <Button className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700">
                        Chọn file
                      </Button>
                      <p className="text-white/60 text-sm mt-2">Hỗ trợ: PDF, DOC, DOCX (tối đa 5MB)</p>
                    </div>
                  )}

                  {analysisMethod === "existing" && (
                    <div className="space-y-4">
                      {state.isAuthenticated ? (
                        <div className="text-center py-8">
                          <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
                          <p className="text-white/70 mb-4">Bạn chưa có CV nào được lưu</p>
                          <Button className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700">
                            Tạo CV mới
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-white/70 mb-4">Vui lòng đăng nhập để xem CV đã lưu</p>
                          <Button className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700">
                            Đăng nhập
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {analysisMethod === "paste" && (
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Dán nội dung CV của bạn vào đây..."
                        value={cvText}
                        onChange={(e) => setCvText(e.target.value)}
                        className="min-h-[200px] bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      />
                      <div className="flex justify-between items-center">
                        <p className="text-white/60 text-sm">{cvText.length} ký tự</p>
                        <Button
                          onClick={handleAnalyze}
                          disabled={!cvText.trim() || isAnalyzing}
                          className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                        >
                          {isAnalyzing ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Đang phân tích...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Phân tích CV
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.section>
          </>
        ) : (
          /* Analysis Results */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Overall Score */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-6 h-6 mr-2" />
                  Kết quả phân tích tổng quan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">{analysisResult.overallScore}</div>
                    <div className="text-white/70 mb-4">Điểm tổng</div>
                    <Progress value={analysisResult.overallScore} className="w-full" />
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-400 mb-2">{analysisResult.atsScore}</div>
                    <div className="text-white/70 mb-4">ATS Score</div>
                    <Progress value={analysisResult.atsScore} className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section Analysis */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  Phân tích từng phần
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analysisResult.sections).map(([section, data]: [string, any]) => (
                    <div key={section} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center">
                        {getStatusIcon(data.status)}
                        <span className="text-white ml-3 capitalize">
                          {section === "personalInfo" && "Thông tin cá nhân"}
                          {section === "summary" && "Tóm tắt"}
                          {section === "experience" && "Kinh nghiệm"}
                          {section === "education" && "Học vấn"}
                          {section === "skills" && "Kỹ năng"}
                          {section === "achievements" && "Thành tích"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-2xl font-bold mr-4 ${getScoreColor(data.score)}`}>{data.score}</span>
                        <Progress value={data.score} className="w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Improvements */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-green-500/10 backdrop-blur-lg border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
                    Điểm mạnh
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisResult.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start text-white/80">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-yellow-500/10 backdrop-blur-lg border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
                    Cần cải thiện
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisResult.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="flex items-start text-white/80">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Suggestions */}
            <Card className="bg-blue-500/10 backdrop-blur-lg border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2 text-blue-400" />
                  Gợi ý cải thiện
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysisResult.suggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="flex items-start p-4 bg-white/5 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-white/80">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setAnalysisResult(null)}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Phân tích CV khác
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700">
                <Download className="w-4 h-4 mr-2" />
                Tải báo cáo
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <FileText className="w-4 h-4 mr-2" />
                Cải thiện CV
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
