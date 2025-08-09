"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Eye, Download, Star, Search, Briefcase, Code, Palette, Users, TrendingUp, Award } from "lucide-react"
import { useApp } from "@/app/providers"

interface CVTemplate {
  id: string
  name: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  rating: number
  downloads: number
  preview: string
  color: string
  features: string[]
  bestFor: string[]
}

export default function CVTemplatesPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [templates, setTemplates] = useState<CVTemplate[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<CVTemplate[]>([])

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/auth")
    }
  }, [state.isAuthenticated, router])

  // Mock templates data
  useEffect(() => {
    const mockTemplates: CVTemplate[] = [
      {
        id: "modern-tech",
        name: "Modern Tech",
        description: "Template hiện đại dành cho ngành công nghệ với layout sạch sẽ và professional",
        category: "technology",
        difficulty: "intermediate",
        rating: 4.8,
        downloads: 15420,
        preview: "/placeholder.svg?height=400&width=300",
        color: "from-blue-500 to-cyan-500",
        features: ["ATS-friendly", "2 pages", "Skills chart", "Project showcase"],
        bestFor: ["Frontend Developer", "Backend Developer", "Full-stack Developer"],
      },
      {
        id: "creative-design",
        name: "Creative Design",
        description: "Template sáng tạo với màu sắc nổi bật, phù hợp cho designer và creative roles",
        category: "design",
        difficulty: "advanced",
        rating: 4.9,
        downloads: 12350,
        preview: "/placeholder.svg?height=400&width=300",
        color: "from-purple-500 to-pink-500",
        features: ["Portfolio section", "Color customizable", "Creative layout", "Visual elements"],
        bestFor: ["UI/UX Designer", "Graphic Designer", "Creative Director"],
      },
      {
        id: "business-professional",
        name: "Business Professional",
        description: "Template chuyên nghiệp cho các vị trí business, management và consulting",
        category: "business",
        difficulty: "beginner",
        rating: 4.7,
        downloads: 18900,
        preview: "/placeholder.svg?height=400&width=300",
        color: "from-gray-600 to-gray-800",
        features: ["Conservative design", "Achievement focus", "Leadership emphasis", "Clean format"],
        bestFor: ["Business Analyst", "Project Manager", "Consultant"],
      },
      {
        id: "fresh-graduate",
        name: "Fresh Graduate",
        description: "Template đặc biệt dành cho sinh viên mới ra trường, tối ưu cho ít kinh nghiệm",
        category: "student",
        difficulty: "beginner",
        rating: 4.6,
        downloads: 25600,
        preview: "/placeholder.svg?height=400&width=300",
        color: "from-green-500 to-emerald-500",
        features: ["Education focus", "Skills highlight", "Project section", "Internship friendly"],
        bestFor: ["New Graduate", "Intern", "Entry Level"],
      },
      {
        id: "marketing-creative",
        name: "Marketing Creative",
        description: "Template năng động cho marketing, sales và communication roles",
        category: "marketing",
        difficulty: "intermediate",
        rating: 4.8,
        downloads: 11200,
        preview: "/placeholder.svg?height=400&width=300",
        color: "from-orange-500 to-red-500",
        features: ["Campaign showcase", "Metrics highlight", "Social proof", "Brand colors"],
        bestFor: ["Marketing Specialist", "Sales Executive", "Content Creator"],
      },
      {
        id: "finance-banking",
        name: "Finance & Banking",
        description: "Template chuyên nghiệp cho ngành tài chính ngân hàng với focus vào số liệu",
        category: "finance",
        difficulty: "intermediate",
        rating: 4.7,
        downloads: 9800,
        preview: "/placeholder.svg?height=400&width=300",
        color: "from-blue-600 to-indigo-600",
        features: ["Numbers focus", "Certification highlight", "Conservative style", "Achievement metrics"],
        bestFor: ["Financial Analyst", "Banking Officer", "Investment Advisor"],
      },
      {
        id: "healthcare-medical",
        name: "Healthcare & Medical",
        description: "Template chuyên biệt cho ngành y tế với emphasis về certification và experience",
        category: "healthcare",
        difficulty: "advanced",
        rating: 4.9,
        downloads: 7650,
        preview: "/placeholder.svg?height=400&width=300",
        color: "from-red-500 to-pink-500",
        features: ["License showcase", "Medical experience", "Certification focus", "Professional tone"],
        bestFor: ["Doctor", "Nurse", "Medical Technician"],
      },
      {
        id: "education-teacher",
        name: "Education & Teaching",
        description: "Template dành cho giáo viên, giảng viên với focus về education và achievements",
        category: "education",
        difficulty: "beginner",
        rating: 4.5,
        downloads: 8900,
        preview: "/placeholder.svg?height=400&width=300",
        color: "from-teal-500 to-blue-500",
        features: ["Teaching experience", "Education focus", "Student outcomes", "Research highlight"],
        bestFor: ["Teacher", "Professor", "Education Coordinator"],
      },
      {
        id: "minimalist-clean",
        name: "Minimalist Clean",
        description: "Template tối giản, sạch sẽ phù hợp cho mọi ngành nghề",
        category: "general",
        difficulty: "beginner",
        rating: 4.4,
        downloads: 32100,
        preview: "/placeholder.svg?height=400&width=300",
        color: "from-slate-500 to-gray-600",
        features: ["Universal design", "Easy to customize", "ATS optimized", "Print friendly"],
        bestFor: ["Any Industry", "Career Change", "Multiple Applications"],
      },
    ]

    setTemplates(mockTemplates)
    setFilteredTemplates(mockTemplates)
  }, [])

  // Filter templates
  useEffect(() => {
    let filtered = templates

    if (searchTerm) {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.bestFor.some((role) => role.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((template) => template.category === selectedCategory)
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((template) => template.difficulty === selectedDifficulty)
    }

    // Sort by popularity (downloads)
    filtered.sort((a, b) => b.downloads - a.downloads)

    setFilteredTemplates(filtered)
  }, [searchTerm, selectedCategory, selectedDifficulty, templates])

  const categories = [
    { value: "technology", label: "Công nghệ", icon: Code },
    { value: "design", label: "Thiết kế", icon: Palette },
    { value: "business", label: "Kinh doanh", icon: Briefcase },
    { value: "marketing", label: "Marketing", icon: TrendingUp },
    { value: "finance", label: "Tài chính", icon: Award },
    { value: "healthcare", label: "Y tế", icon: Users },
    { value: "education", label: "Giáo dục", icon: Users },
    { value: "student", label: "Sinh viên", icon: Users },
    { value: "general", label: "Tổng quát", icon: FileText },
  ]

  const useTemplate = (template: CVTemplate) => {
    // Create a new CV based on template
    const newCV = {
      id: Date.now().toString(),
      name: `CV - ${template.name}`,
      personal: {
        fullName: state.user?.name || "",
        email: state.user?.email || "",
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
      skills: [],
      createdAt: new Date().toISOString(),
      score: 0,
    }

    dispatch({ type: "SAVE_CV", payload: newCV })
    router.push("/cv-builder")
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
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Mẫu CV chuyên nghiệp</h1>
            <p className="text-white/70">Chọn template phù hợp với ngành nghề và phong cách của bạn</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm template theo tên, mô tả hoặc vị trí..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Chọn ngành nghề" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-white hover:bg-slate-700">
                        Tất cả ngành nghề
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                          className="text-white hover:bg-slate-700"
                        >
                          <div className="flex items-center">
                            <category.icon className="w-4 h-4 mr-2" />
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Độ khó" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-white hover:bg-slate-700">
                        Tất cả mức độ
                      </SelectItem>
                      <SelectItem value="beginner" className="text-white hover:bg-slate-700">
                        Dễ sử dụng
                      </SelectItem>
                      <SelectItem value="intermediate" className="text-white hover:bg-slate-700">
                        Trung bình
                      </SelectItem>
                      <SelectItem value="advanced" className="text-white hover:bg-slate-700">
                        Nâng cao
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{filteredTemplates.length}</div>
              <div className="text-white/70 text-sm">Templates phù hợp</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(
                  filteredTemplates.reduce((acc, template) => acc + template.rating, 0) / filteredTemplates.length,
                ) || 0}
                ⭐
              </div>
              <div className="text-white/70 text-sm">Đánh giá TB</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {(filteredTemplates.reduce((acc, template) => acc + template.downloads, 0) / 1000).toFixed(0)}K+
              </div>
              <div className="text-white/70 text-sm">Lượt tải</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-white/70 text-sm">Miễn phí</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  {/* Preview */}
                  <div className="relative mb-4 group">
                    <div
                      className={`w-full h-48 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center mb-4 overflow-hidden`}
                    >
                      <div className="text-white/20 text-6xl font-bold">CV</div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Xem trước
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <Badge
                        className={`${
                          template.difficulty === "beginner"
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : template.difficulty === "intermediate"
                              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                              : "bg-red-500/20 text-red-300 border-red-500/30"
                        }`}
                      >
                        {template.difficulty === "beginner"
                          ? "Dễ"
                          : template.difficulty === "intermediate"
                            ? "Trung bình"
                            : "Nâng cao"}
                      </Badge>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm">{template.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{template.description}</p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-white/20 text-white/60">
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                          +{template.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mb-4">
                    <p className="text-white/60 text-xs mb-2">Phù hợp cho:</p>
                    <div className="text-white/80 text-sm">
                      {template.bestFor.slice(0, 2).join(", ")}
                      {template.bestFor.length > 2 && "..."}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center text-white/60 text-sm mb-4">
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {(template.downloads / 1000).toFixed(1)}K
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {categories.find((cat) => cat.value === template.category)?.label}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => useTemplate(template)}
                      className="w-full bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                    >
                      Sử dụng template
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-12">
                <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Không tìm thấy template phù hợp</h3>
                <p className="text-white/70 mb-4">Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSelectedDifficulty("all")
                  }}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Xóa bộ lọc
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-teal-600/10 backdrop-blur-lg border-blue-500/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Không tìm được template ưng ý?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Tạo CV từ đầu với CV Builder thông minh hoặc liên hệ với chúng tôi để request template mới
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push("/cv-builder")}
                  className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Tạo CV từ đầu
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  Request template mới
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
