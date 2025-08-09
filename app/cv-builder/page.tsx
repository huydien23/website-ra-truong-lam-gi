"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Download,
  Eye,
  Sparkles,
  Plus,
  X,
  Save,
  FileText,
} from "lucide-react"
import { useApp } from "@/app/providers"
import Link from "next/link"

export default function CVBuilderPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [activeSection, setActiveSection] = useState("personal")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [cvData, setCvData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      objective: "",
    },
    education: [
      {
        school: "",
        major: "",
        degree: "",
        gpa: "",
        startYear: "",
        endYear: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/auth")
    }
  }, [state.isAuthenticated, router])

  // Load current CV if exists
  useEffect(() => {
    if (state.currentCV) {
      setCvData({
        personal: state.currentCV.personal,
        education: state.currentCV.education,
        experience: state.currentCV.experience,
      })
      setSkills(state.currentCV.skills)
    }
  }, [state.currentCV])

  const handleInputChange = (section: string, field: string, value: string, index?: number) => {
    setCvData((prev) => {
      if (section === "personal") {
        return {
          ...prev,
          personal: {
            ...prev.personal,
            [field]: value,
          },
        }
      } else if (section === "education" && typeof index === "number") {
        const newEducation = [...prev.education]
        newEducation[index] = {
          ...newEducation[index],
          [field]: value,
        }
        return {
          ...prev,
          education: newEducation,
        }
      } else if (section === "experience" && typeof index === "number") {
        const newExperience = [...prev.experience]
        newExperience[index] = {
          ...newExperience[index],
          [field]: value,
        }
        return {
          ...prev,
          experience: newExperience,
        }
      }
      return prev
    })
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const calculateCVScore = () => {
    let score = 0

    // Personal info (30 points)
    if (cvData.personal.fullName) score += 10
    if (cvData.personal.email) score += 10
    if (cvData.personal.objective) score += 10

    // Education (25 points)
    if (cvData.education[0].school) score += 15
    if (cvData.education[0].major) score += 10

    // Skills (25 points)
    score += Math.min(skills.length * 5, 25)

    // Experience (20 points)
    if (cvData.experience[0].company) score += 10
    if (cvData.experience[0].description) score += 10

    return Math.min(score, 100)
  }

  const generateAISuggestions = () => {
    const suggestions = []

    if (!cvData.personal.objective) {
      suggestions.push("Thêm mục tiêu nghề nghiệp để CV nổi bật hơn")
    }

    if (skills.length < 5) {
      suggestions.push("Bổ sung thêm kỹ năng liên quan đến ngành")
    }

    if (!cvData.experience[0].company) {
      suggestions.push("Thêm kinh nghiệm thực tập hoặc dự án cá nhân")
    }

    if (!cvData.education[0].gpa) {
      suggestions.push("Thêm GPA nếu điểm tốt (>= 3.0/4.0)")
    }

    return suggestions
  }

  const saveCV = async () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const newCV = {
        id: state.currentCV?.id || Date.now().toString(),
        name: `CV - ${cvData.personal.fullName || "Chưa đặt tên"}`,
        personal: cvData.personal,
        education: cvData.education,
        experience: cvData.experience,
        skills,
        createdAt: new Date().toISOString(),
        score: calculateCVScore(),
      }

      dispatch({ type: "SAVE_CV", payload: newCV })
      setIsSaving(false)

      // Show success message (you can add a toast here)
      alert("CV đã được lưu thành công!")
    }, 1000)
  }

  const downloadCV = () => {
    // Mock download functionality
    alert("Tính năng tải xuống CV sẽ được cập nhật sớm!")
  }

  const sections = [
    { id: "personal", label: "Thông tin cá nhân", icon: User },
    { id: "education", label: "Học vấn", icon: GraduationCap },
    { id: "experience", label: "Kinh nghiệm", icon: Briefcase },
    { id: "skills", label: "Kỹ năng", icon: Award },
  ]

  if (!state.isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-16 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CV Builder</h1>
                <p className="text-white/70 text-sm">Tạo CV chuyên nghiệp với AI</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/cv-builder/templates">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Mẫu CV chuyên nghiệp
                </Button>
              </Link>
              <Button
                onClick={saveCV}
                disabled={isSaving}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Đang lưu..." : "Lưu CV"}
              </Button>
              <Button
                onClick={downloadCV}
                className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Tải xuống
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Form */}
          <div className="lg:col-span-2">
            {/* Section Navigation */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  onClick={() => setActiveSection(section.id)}
                  className={`${activeSection === section.id
                      ? "bg-gradient-to-r from-blue-500 to-teal-600"
                      : "border-white/30 text-white hover:bg-white/10 bg-transparent"
                    }`}
                >
                  <section.icon className="w-4 h-4 mr-2" />
                  {section.label}
                </Button>
              ))}
            </motion.div>

            {/* Form Sections */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    {(() => {
                      const currentSection = sections.find((s) => s.id === activeSection)
                      const IconComponent = currentSection?.icon
                      return IconComponent ? <IconComponent className="w-5 h-5 mr-2 text-white" /> : null
                    })()}
                    {sections.find((s) => s.id === activeSection)?.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Info Section */}
                  {activeSection === "personal" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Họ và tên *</label>
                        <Input
                          value={cvData.personal.fullName}
                          onChange={(e) => handleInputChange("personal", "fullName", e.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          value={cvData.personal.email}
                          onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                          placeholder="email@example.com"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Số điện thoại *</label>
                        <Input
                          value={cvData.personal.phone}
                          onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                          placeholder="0123456789"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Địa chỉ</label>
                        <Input
                          value={cvData.personal.address}
                          onChange={(e) => handleInputChange("personal", "address", e.target.value)}
                          placeholder="Hà Nội, Việt Nam"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-white/80 text-sm font-medium mb-2">Mục tiêu nghề nghiệp</label>
                        <Textarea
                          value={cvData.personal.objective}
                          onChange={(e) => handleInputChange("personal", "objective", e.target.value)}
                          placeholder="Mô tả ngắn gọn về mục tiêu nghề nghiệp của bạn..."
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Education Section */}
                  {activeSection === "education" && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Trường/Đại học *</label>
                          <Input
                            value={cvData.education[0].school}
                            onChange={(e) => handleInputChange("education", "school", e.target.value, 0)}
                            placeholder="Đại học Bách Khoa Hà Nội"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Chuyên ngành *</label>
                          <Input
                            value={cvData.education[0].major}
                            onChange={(e) => handleInputChange("education", "major", e.target.value, 0)}
                            placeholder="Công nghệ thông tin"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Bằng cấp</label>
                          <Input
                            value={cvData.education[0].degree}
                            onChange={(e) => handleInputChange("education", "degree", e.target.value, 0)}
                            placeholder="Cử nhân"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">GPA/Điểm</label>
                          <Input
                            value={cvData.education[0].gpa}
                            onChange={(e) => handleInputChange("education", "gpa", e.target.value, 0)}
                            placeholder="3.5/4.0"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Năm bắt đầu</label>
                          <Input
                            value={cvData.education[0].startYear}
                            onChange={(e) => handleInputChange("education", "startYear", e.target.value, 0)}
                            placeholder="2020"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Năm tốt nghiệp</label>
                          <Input
                            value={cvData.education[0].endYear}
                            onChange={(e) => handleInputChange("education", "endYear", e.target.value, 0)}
                            placeholder="2024"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Experience Section */}
                  {activeSection === "experience" && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Công ty/Tổ chức</label>
                          <Input
                            value={cvData.experience[0].company}
                            onChange={(e) => handleInputChange("experience", "company", e.target.value, 0)}
                            placeholder="Công ty ABC"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Vị trí</label>
                          <Input
                            value={cvData.experience[0].position}
                            onChange={(e) => handleInputChange("experience", "position", e.target.value, 0)}
                            placeholder="Thực tập sinh IT"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Từ tháng/năm</label>
                          <Input
                            value={cvData.experience[0].startDate}
                            onChange={(e) => handleInputChange("experience", "startDate", e.target.value, 0)}
                            placeholder="01/2023"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Đến tháng/năm</label>
                          <Input
                            value={cvData.experience[0].endDate}
                            onChange={(e) => handleInputChange("experience", "endDate", e.target.value, 0)}
                            placeholder="06/2023"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Mô tả công việc</label>
                        <Textarea
                          value={cvData.experience[0].description}
                          onChange={(e) => handleInputChange("experience", "description", e.target.value, 0)}
                          placeholder="Mô tả chi tiết về công việc và thành tích..."
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Skills Section */}
                  {activeSection === "skills" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Thêm kỹ năng</label>
                        <div className="flex gap-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Nhập kỹ năng (VD: JavaScript, React...)"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            onKeyPress={(e) => e.key === "Enter" && addSkill()}
                          />
                          <Button
                            onClick={addSkill}
                            className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {skills.length > 0 && (
                        <div>
                          <label className="block text-white/80 text-sm font-medium mb-2">Kỹ năng của bạn</label>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                              <Badge
                                key={index}
                                className="bg-gradient-to-r from-blue-500/20 to-teal-600/20 text-white border-blue-500/30 px-3 py-1"
                              >
                                {skill}
                                <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-400">
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Sidebar - Preview */}
          <div className="lg:col-span-1">
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="sticky top-32">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Xem trước CV
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30">
                      {calculateCVScore()}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* CV Preview */}
                  <div className="bg-white rounded-lg p-6 text-gray-800 min-h-[600px] shadow-xl">
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{cvData.personal.fullName || "Họ và tên"}</h2>
                      <p className="text-gray-600">Sinh viên IT</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                        {cvData.personal.email && (
                          <span className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {cvData.personal.email}
                          </span>
                        )}
                        {cvData.personal.phone && (
                          <span className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {cvData.personal.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {cvData.personal.objective && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">MỤC TIÊU NGHỀ NGHIỆP</h3>
                          <p className="text-sm text-gray-600">{cvData.personal.objective}</p>
                        </div>
                      )}

                      {cvData.education[0].school && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">HỌC VẤN</h3>
                          <div className="text-sm">
                            <p className="font-medium">{cvData.education[0].school}</p>
                            <p className="text-gray-600">
                              {cvData.education[0].major} • {cvData.education[0].startYear}-
                              {cvData.education[0].endYear}
                            </p>
                            {cvData.education[0].gpa && <p className="text-gray-600">GPA: {cvData.education[0].gpa}</p>}
                          </div>
                        </div>
                      )}

                      {cvData.experience[0].company && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">KINH NGHIỆM</h3>
                          <div className="text-sm">
                            <p className="font-medium">{cvData.experience[0].position}</p>
                            <p className="text-gray-600">{cvData.experience[0].company}</p>
                            <p className="text-gray-500 text-xs">
                              {cvData.experience[0].startDate} - {cvData.experience[0].endDate}
                            </p>
                            {cvData.experience[0].description && (
                              <p className="text-gray-600 mt-1">{cvData.experience[0].description}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {skills.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">KỸ NĂNG</h3>
                          <div className="flex flex-wrap gap-1">
                            {skills.map((skill, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-teal-600/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="text-white font-medium text-sm">Gợi ý từ AI</span>
                    </div>
                    <div className="text-white/70 text-sm space-y-1">
                      {generateAISuggestions().map((suggestion, index) => (
                        <p key={index}>• {suggestion}</p>
                      ))}
                      {generateAISuggestions().length === 0 && <p>🎉 CV của bạn đã khá hoàn thiện!</p>}
                    </div>
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
