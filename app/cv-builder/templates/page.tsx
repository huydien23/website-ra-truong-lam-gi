"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Search,
  Eye,
  Download,
  Star,
  Palette,
  Briefcase,
  GraduationCap,
  Users,
  Code,
  DollarSign,
  Heart,
  Filter,
  ArrowLeft,
} from "lucide-react"
import { useApp } from "@/app/providers"
import Link from "next/link"

interface CVTemplate {
  id: string
  name: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  industry: string[]
  features: string[]
  preview: string
  color: string
  isPopular: boolean
  isPremium: boolean
  downloads: number
  rating: number
}

export default function CVTemplatesPage() {
  const router = useRouter()
  const { state } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/auth")
    }
  }, [state.isAuthenticated, router])

  const templates: CVTemplate[] = [
    {
      id: "modern-tech",
      name: "Modern Tech",
      description: "Template hiện đại cho ngành công nghệ với layout sạch sẽ",
      category: "Modern",
      difficulty: "Beginner",
      industry: ["Technology", "Startup"],
      features: ["Clean layout", "Icon skills", "Project showcase", "Dark theme"],
      preview: "/templates/modern-tech.jpg",
      color: "from-blue-500 to-cyan-500",
      isPopular: true,
      isPremium: false,
      downloads: 15420,
      rating: 4.8,
    },
    {
      id: "professional-business",
      name: "Professional Business",
      description: "Template chuyên nghiệp cho các vị trí business và finance",
      category: "Professional",
      difficulty: "Intermediate",
      industry: ["Finance", "Business", "Consulting"],
      features: ["Executive style", "Achievement focus", "Clean typography", "Conservative design"],
      preview: "/templates/professional-business.jpg",
      color: "from-slate-600 to-slate-800",
      isPopular: true,
      isPremium: false,
      downloads: 12850,
      rating: 4.9,
    },
    {
      id: "creative-designer",
      name: "Creative Designer",
      description: "Template sáng tạo cho designer và nghề nghệ thuật",
      category: "Creative",
      difficulty: "Advanced",
      industry: ["Design", "Marketing", "Media"],
      features: ["Visual portfolio", "Color showcase", "Creative layout", "Image gallery"],
      preview: "/templates/creative-designer.jpg",
      color: "from-purple-500 to-pink-500",
      isPopular: false,
      isPremium: true,
      downloads: 8650,
      rating: 4.7,
    },
    {
      id: "minimalist-clean",
      name: "Minimalist Clean",
      description: "Template tối giản, phù hợp mọi ngành nghề",
      category: "Minimalist",
      difficulty: "Beginner",
      industry: ["All"],
      features: ["Simple design", "Easy to read", "ATS friendly", "Universal"],
      preview: "/templates/minimalist-clean.jpg",
      color: "from-gray-400 to-gray-600",
      isPopular: true,
      isPremium: false,
      downloads: 20150,
      rating: 4.6,
    },
    {
      id: "healthcare-medical",
      name: "Healthcare Professional",
      description: "Template chuyên dụng cho ngành y tế",
      category: "Professional",
      difficulty: "Intermediate",
      industry: ["Healthcare", "Medical"],
      features: ["Medical focused", "Certification display", "Experience timeline", "Trust building"],
      preview: "/templates/healthcare-medical.jpg",
      color: "from-green-500 to-emerald-500",
      isPopular: false,
      isPremium: false,
      downloads: 5420,
      rating: 4.5,
    },
    {
      id: "student-graduate",
      name: "Fresh Graduate",
      description: "Template cho sinh viên mới ra trường",
      category: "Entry Level",
      difficulty: "Beginner",
      industry: ["All"],
      features: ["Education focus", "Project highlight", "Skill showcase", "Entry-level friendly"],
      preview: "/templates/student-graduate.jpg",
      color: "from-orange-500 to-red-500",
      isPopular: true,
      isPremium: false,
      downloads: 18200,
      rating: 4.7,
    },
    {
      id: "executive-senior",
      name: "Executive Leadership",
      description: "Template cao cấp cho các vị trí lãnh đạo",
      category: "Executive",
      difficulty: "Advanced",
      industry: ["Business", "Finance", "Consulting"],
      features: ["Leadership focus", "Achievement metrics", "Board experience", "Premium layout"],
      preview: "/templates/executive-senior.jpg",
      color: "from-indigo-600 to-purple-600",
      isPopular: false,
      isPremium: true,
      downloads: 3250,
      rating: 4.9,
    },
    {
      id: "tech-developer",
      name: "Software Developer",
      description: "Template chuyên dụng cho lập trình viên",
      category: "Technical",
      difficulty: "Intermediate",
      industry: ["Technology", "Software"],
      features: ["Code showcase", "GitHub integration", "Tech stack display", "Project portfolio"],
      preview: "/templates/tech-developer.jpg",
      color: "from-cyan-500 to-blue-500",
      isPopular: true,
      isPremium: false,
      downloads: 16800,
      rating: 4.8,
    },
  ]

  const categories = [
    { value: "Modern", label: "Hiện đại" },
    { value: "Professional", label: "Chuyên nghiệp" },
    { value: "Creative", label: "Sáng tạo" },
    { value: "Minimalist", label: "Tối giản" },
    { value: "Entry Level", label: "Sinh viên" },
    { value: "Executive", label: "Lãnh đạo" },
    { value: "Technical", label: "Kỹ thuật" },
  ]

  const industries = [
    { value: "Technology", label: "Công nghệ", icon: Code },
    { value: "Finance", label: "Tài chính", icon: DollarSign },
    { value: "Business", label: "Kinh doanh", icon: Briefcase },
    { value: "Design", label: "Thiết kế", icon: Palette },
    { value: "Healthcare", label: "Y tế", icon: Heart },
    { value: "Education", label: "Giáo dục", icon: GraduationCap },
    { value: "Marketing", label: "Marketing", icon: Users },
  ]

  const filteredTemplates = templates.filter((template) => {
    if (searchTerm && !template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !template.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    if (categoryFilter !== "all" && template.category !== categoryFilter) {
      return false
    }
    if (industryFilter !== "all" && !template.industry.includes(industryFilter) && !template.industry.includes("All")) {
      return false
    }
    return true
  })

  const useTemplate = (template: CVTemplate) => {
    // In real app, would load template into CV builder
    router.push(`/cv-builder?template=${template.id}`)
  }

  const previewTemplate = (template: CVTemplate) => {
    setSelectedTemplate(template)
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/cv-builder">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại CV Builder
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Mẫu CV chuyên nghiệp</h1>
                <p className="text-white/70">Chọn template phù hợp với ngành nghề của bạn</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
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
                      placeholder="Tìm kiếm template..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Loại template" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">Tất cả loại</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value} className="text-white hover:bg-slate-700">
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Ngành nghề" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">Tất cả ngành</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value} className="text-white hover:bg-slate-700">
                          <div className="flex items-center">
                            <industry.icon className="w-4 h-4 mr-2" />
                            {industry.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                        {template.isPopular && (
                          <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/30 text-xs">
                            Popular
                          </Badge>
                        )}
                        {template.isPremium && (
                          <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/70 text-sm mb-3">{template.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-white/60 mb-3">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-400" />
                          {template.rating}
                        </div>
                        <div className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {template.downloads.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Template Preview */}
                  <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${template.color} mb-4 flex items-center justify-center`}>
                    <FileText className="w-12 h-12 text-white/80" />
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
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

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => useTemplate(template)}
                      className="w-full bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                    >
                      Sử dụng template
                    </Button>
                    <Button
                      onClick={() => previewTemplate(template)}
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem trước
                    </Button>
                  </div>

                  {/* Category & Industry */}
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>{template.category}</span>
                      <span>{template.difficulty}</span>
                    </div>
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
                <p className="text-white/70">Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Preview Modal */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedTemplate.name}</h3>
                  <p className="text-white/70">{selectedTemplate.description}</p>
                </div>
                <Button
                  onClick={() => setSelectedTemplate(null)}
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  ✕
                </Button>
              </div>

              {/* Template Preview */}
              <div className={`w-full h-64 rounded-lg bg-gradient-to-br ${selectedTemplate.color} mb-6 flex items-center justify-center`}>
                <FileText className="w-24 h-24 text-white/80" />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Tính năng</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="border-white/20 text-white/60">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Phù hợp với</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.industry.map((industry, idx) => (
                      <Badge key={idx} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {industries.find(i => i.value === industry)?.label || industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-sm text-white/70">
                  <span>Độ khó: {selectedTemplate.difficulty}</span>
                  <span>Đã tải: {selectedTemplate.downloads.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <Button
                  onClick={() => useTemplate(selectedTemplate)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                >
                  Sử dụng template này
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải về
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}