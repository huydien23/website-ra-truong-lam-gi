"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, DollarSign, Clock, Briefcase, Heart, ExternalLink, Building } from "lucide-react"
import { useApp } from "@/app/providers"

interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  level: "Entry" | "Mid" | "Senior"
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  matchScore: number
  isBookmarked: boolean
  companyLogo?: string
  industry: string
}

export default function JobsPage() {
  const router = useRouter()
  const { state } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/auth")
    }
  }, [state.isAuthenticated, router])

  // Mock job data with diverse industries
  useEffect(() => {
    const mockJobs: Job[] = [
      // Technology
      {
        id: 1,
        title: "Frontend Developer",
        company: "TechViet Solutions",
        location: "Hà Nội",
        salary: "15-20 triệu",
        type: "Full-time",
        level: "Entry",
        industry: "Technology",
        description: "Chúng tôi đang tìm kiếm Frontend Developer tài năng để tham gia đội ngũ phát triển sản phẩm.",
        requirements: ["React.js", "JavaScript ES6+", "HTML/CSS", "Git"],
        benefits: ["Lương 13-15 tháng", "Bảo hiểm sức khỏe", "Flexible working time"],
        postedDate: "2024-01-15",
        matchScore: 92,
        isBookmarked: false,
      },
      {
        id: 2,
        title: "React Developer",
        company: "Digital Agency ABC",
        location: "TP.HCM",
        salary: "18-25 triệu",
        type: "Remote",
        level: "Mid",
        industry: "Technology",
        description: "Vị trí React Developer cho dự án e-commerce lớn với công nghệ hiện đại.",
        requirements: ["React.js", "TypeScript", "Next.js", "Redux"],
        benefits: ["Remote 100%", "Laptop provided", "Training budget"],
        postedDate: "2024-01-14",
        matchScore: 88,
        isBookmarked: true,
      },
      // Finance & Banking
      {
        id: 3,
        title: "Chuyên viên Phân tích Tín dụng",
        company: "Ngân hàng Techcombank",
        location: "Hà Nội",
        salary: "12-18 triệu",
        type: "Full-time",
        level: "Entry",
        industry: "Finance",
        description: "Thẩm định và phân tích hồ sơ tín dụng cá nhân và doanh nghiệp.",
        requirements: ["Tài chính ngân hàng", "Excel nâng cao", "Phân tích dữ liệu", "Tiếng Anh"],
        benefits: ["Thưởng KPI", "Đào tạo chuyên sâu", "Cơ hội thăng tiến"],
        postedDate: "2024-01-13",
        matchScore: 85,
        isBookmarked: false,
      },
      {
        id: 4,
        title: "Investment Analyst",
        company: "VietCapital Securities",
        location: "TP.HCM",
        salary: "20-30 triệu",
        type: "Full-time",
        level: "Mid",
        industry: "Finance",
        description: "Phân tích thị trường chứng khoán và tư vấn đầu tư cho khách hàng.",
        requirements: ["CFA/FRM", "Financial modeling", "Bloomberg", "Research skills"],
        benefits: ["Bonus performance", "Professional training", "International exposure"],
        postedDate: "2024-01-12",
        matchScore: 78,
        isBookmarked: false,
      },
      // Tourism & Hospitality
      {
        id: 5,
        title: "Tour Guide",
        company: "Saigon Tourist",
        location: "TP.HCM",
        salary: "8-15 triệu",
        type: "Full-time",
        level: "Entry",
        industry: "Tourism",
        description: "Hướng dẫn viên du lịch cho các tour trong nước và quốc tế.",
        requirements: ["Tiếng Anh giao tiếp", "Kiến thức lịch sử văn hóa", "Kỹ năng thuyết trình", "Bằng lái xe"],
        benefits: ["Du lịch miễn phí", "Hoa hồng tour", "Đào tạo nghiệp vụ"],
        postedDate: "2024-01-11",
        matchScore: 72,
        isBookmarked: false,
      },
      {
        id: 6,
        title: "Hotel Manager",
        company: "Lotte Hotel Hanoi",
        location: "Hà Nội",
        salary: "25-35 triệu",
        type: "Full-time",
        level: "Senior",
        industry: "Hospitality",
        description: "Quản lý vận hành khách sạn 5 sao, đảm bảo chất lượng dịch vụ.",
        requirements: ["Hotel Management", "Leadership", "English fluent", "5+ years experience"],
        benefits: ["High salary", "International environment", "Career development"],
        postedDate: "2024-01-10",
        matchScore: 68,
        isBookmarked: true,
      },
      // Marketing & Communications
      {
        id: 7,
        title: "Digital Marketing Specialist",
        company: "Unilever Vietnam",
        location: "TP.HCM",
        salary: "15-22 triệu",
        type: "Full-time",
        level: "Mid",
        industry: "Marketing",
        description: "Phát triển và thực hiện chiến lược marketing digital cho các thương hiệu FMCG.",
        requirements: ["Google Ads", "Facebook Ads", "SEO/SEM", "Analytics", "Content creation"],
        benefits: ["Multinational environment", "Training programs", "Performance bonus"],
        postedDate: "2024-01-09",
        matchScore: 82,
        isBookmarked: false,
      },
      // Healthcare
      {
        id: 8,
        title: "Điều dưỡng viên",
        company: "Bệnh viện Chợ Rẫy",
        location: "TP.HCM",
        salary: "10-15 triệu",
        type: "Full-time",
        level: "Entry",
        industry: "Healthcare",
        description: "Chăm sóc bệnh nhân tại khoa Nội tim mạch.",
        requirements: ["Bằng Điều dưỡng", "Kinh nghiệm 1-2 năm", "Kỹ năng giao tiếp", "Chịu được áp lực"],
        benefits: ["Ổn định công việc", "Bảo hiểm y tế", "Phụ cấp ca đêm"],
        postedDate: "2024-01-08",
        matchScore: 75,
        isBookmarked: false,
      },
      // Education
      {
        id: 9,
        title: "Giảng viên Tiếng Anh",
        company: "Đại học FPT",
        location: "Hà Nội",
        salary: "12-20 triệu",
        type: "Part-time",
        level: "Mid",
        industry: "Education",
        description: "Giảng dạy tiếng Anh cho sinh viên đại học và sau đại học.",
        requirements: ["TESOL/CELTA", "Bachelor degree", "Teaching experience", "Native/Near-native English"],
        benefits: ["Flexible schedule", "Academic environment", "Professional development"],
        postedDate: "2024-01-07",
        matchScore: 79,
        isBookmarked: false,
      },
      // Sales & Business
      {
        id: 10,
        title: "Sales Executive",
        company: "Vinamilk",
        location: "Đà Nẵng",
        salary: "10-18 triệu + Commission",
        type: "Full-time",
        level: "Entry",
        industry: "Sales",
        description: "Phát triển thị trường và bán hàng cho các sản phẩm sữa tại khu vực miền Trung.",
        requirements: ["Kinh nghiệm bán hàng", "Kỹ năng đàm phán", "Có xe máy", "Chịu được áp lực"],
        benefits: ["High commission", "Company car", "Travel allowance"],
        postedDate: "2024-01-06",
        matchScore: 71,
        isBookmarked: false,
      },
      // Design
      {
        id: 11,
        title: "UI/UX Designer",
        company: "Sendo",
        location: "TP.HCM",
        salary: "15-25 triệu",
        type: "Full-time",
        level: "Mid",
        industry: "Design",
        description: "Thiết kế giao diện và trải nghiệm người dùng cho ứng dụng e-commerce.",
        requirements: ["Figma", "Adobe Creative Suite", "User research", "Prototyping", "Portfolio"],
        benefits: ["Creative environment", "Latest tools", "Design conferences"],
        postedDate: "2024-01-05",
        matchScore: 86,
        isBookmarked: false,
      },
      // Logistics
      {
        id: 12,
        title: "Supply Chain Coordinator",
        company: "Giao Hàng Nhanh",
        location: "Hà Nội",
        salary: "12-18 triệu",
        type: "Full-time",
        level: "Entry",
        industry: "Logistics",
        description: "Điều phối và tối ưu hóa chuỗi cung ứng cho dịch vụ giao hàng.",
        requirements: ["Logistics knowledge", "Excel", "Problem solving", "Communication"],
        benefits: ["Fast-growing company", "Learning opportunities", "Performance bonus"],
        postedDate: "2024-01-04",
        matchScore: 73,
        isBookmarked: false,
      },
    ]

    setJobs(mockJobs)
    setFilteredJobs(mockJobs)
  }, [])

  // Filter jobs based on search criteria
  useEffect(() => {
    let filtered = jobs

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requirements.some((req) => req.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (locationFilter) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    if (typeFilter && typeFilter !== "all") {
      filtered = filtered.filter((job) => job.type === typeFilter)
    }

    if (levelFilter && levelFilter !== "all") {
      filtered = filtered.filter((job) => job.level === levelFilter)
    }

    if (industryFilter && industryFilter !== "all") {
      filtered = filtered.filter((job) => job.industry === industryFilter)
    }

    // Sort by match score
    filtered.sort((a, b) => b.matchScore - a.matchScore)

    setFilteredJobs(filtered)
  }, [searchTerm, locationFilter, typeFilter, levelFilter, industryFilter, jobs])

  const toggleBookmark = (jobId: number) => {
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job)))
  }

  const applyToJob = (job: Job) => {
    // Mock apply functionality
    alert(`Đã apply vào vị trí ${job.title} tại ${job.company}!`)
  }

  const industries = [
    { value: "Technology", label: "Công nghệ" },
    { value: "Finance", label: "Tài chính" },
    { value: "Tourism", label: "Du lịch" },
    { value: "Hospitality", label: "Khách sạn" },
    { value: "Marketing", label: "Marketing" },
    { value: "Healthcare", label: "Y tế" },
    { value: "Education", label: "Giáo dục" },
    { value: "Sales", label: "Kinh doanh" },
    { value: "Design", label: "Thiết kế" },
    { value: "Logistics", label: "Logistics" },
  ]

  const jobTypes = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Remote", label: "Remote" },
  ]

  const jobLevels = [
    { value: "Entry", label: "Entry Level" },
    { value: "Mid", label: "Mid Level" },
    { value: "Senior", label: "Senior Level" },
  ]

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
            <h1 className="text-3xl font-bold text-white mb-2">Tìm việc làm phù hợp</h1>
            <p className="text-white/70">Khám phá hàng nghìn cơ hội nghề nghiệp được AI gợi ý dành riêng cho bạn</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm theo vị trí, công ty, kỹ năng..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      placeholder="Địa điểm"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Ngành nghề" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">Tất cả ngành nghề</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem
                          key={industry.value}
                          value={industry.value}
                          className="text-white hover:bg-slate-700"
                        >
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Loại hình" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">Tất cả loại hình</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white hover:bg-slate-700">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Cấp độ" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">Tất cả cấp độ</SelectItem>
                      {jobLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value} className="text-white hover:bg-slate-700">
                          {level.label}
                        </SelectItem>
                      ))}
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
              <div className="text-2xl font-bold text-white">{filteredJobs.length}</div>
              <div className="text-white/70 text-sm">Việc làm phù hợp</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(filteredJobs.reduce((acc, job) => acc + job.matchScore, 0) / filteredJobs.length) || 0}%
              </div>
              <div className="text-white/70 text-sm">Độ phù hợp TB</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{jobs.filter((job) => job.isBookmarked).length}</div>
              <div className="text-white/70 text-sm">Đã lưu</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-white/70 text-sm">Đã apply</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job List */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedJob(job)}
                  className="cursor-pointer"
                >
                  <Card
                    className={`bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 ${selectedJob?.id === job.id ? "ring-2 ring-blue-500" : ""
                      }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-bold text-white">{job.title}</h3>
                            <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30">
                              {job.matchScore}% match
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-white/70 text-sm mb-3">
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              {job.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </div>
                          </div>
                          <p className="text-white/80 text-sm mb-4 line-clamp-2">{job.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.requirements.slice(0, 4).map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-white/20 text-white/60">
                                {req}
                              </Badge>
                            ))}
                            {job.requirements.length > 4 && (
                              <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                                +{job.requirements.length - 4} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Badge
                                className={`${job.type === "Remote"
                                    ? "bg-green-500/20 text-green-300 border-green-500/30"
                                    : job.type === "Full-time"
                                      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                      : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                  }`}
                              >
                                {job.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                                {job.level}
                              </Badge>
                              <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                                {industries.find((ind) => ind.value === job.industry)?.label || job.industry}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-white/60 text-sm">
                              <Clock className="w-4 h-4" />
                              {new Date(job.postedDate).toLocaleDateString("vi-VN")}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(job.id)
                          }}
                          variant="ghost"
                          size="sm"
                          className={`ml-4 ${job.isBookmarked ? "text-red-400 hover:text-red-300" : "text-white/60 hover:text-white"
                            }`}
                        >
                          <Heart className={`w-5 h-5 ${job.isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {filteredJobs.length === 0 && (
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-12 text-center">
                    <Briefcase className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">Không tìm thấy việc làm phù hợp</h3>
                    <p className="text-white/70">Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Job Detail */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              {selectedJob ? (
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{selectedJob.title}</CardTitle>
                        <p className="text-white/70">{selectedJob.company}</p>
                        <Badge variant="outline" className="mt-2 text-xs border-white/20 text-white/60">
                          {industries.find((ind) => ind.value === selectedJob.industry)?.label || selectedJob.industry}
                        </Badge>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30">
                        {selectedJob.matchScore}% match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Mô tả công việc</h4>
                      <p className="text-white/80 text-sm">{selectedJob.description}</p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Yêu cầu</h4>
                      <div className="space-y-1">
                        {selectedJob.requirements.map((req, index) => (
                          <div key={index} className="flex items-center text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Quyền lợi</h4>
                      <div className="space-y-1">
                        {selectedJob.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center text-white/80 text-sm">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Mức lương:</span>
                        <p className="text-white font-medium">{selectedJob.salary}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Địa điểm:</span>
                        <p className="text-white font-medium">{selectedJob.location}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Loại hình:</span>
                        <p className="text-white font-medium">{selectedJob.type}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Cấp độ:</span>
                        <p className="text-white font-medium">{selectedJob.level}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={() => applyToJob(selectedJob)}
                        className="w-full bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700"
                      >
                        Apply ngay
                      </Button>
                      <Button
                        onClick={() => toggleBookmark(selectedJob.id)}
                        variant="outline"
                        className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Heart
                          className={`w-4 h-4 mr-2 ${selectedJob.isBookmarked ? "fill-current text-red-400" : ""}`}
                        />
                        {selectedJob.isBookmarked ? "Đã lưu" : "Lưu việc làm"}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Xem chi tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-12 text-center">
                    <Briefcase className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Chọn một việc làm</h3>
                    <p className="text-white/70 text-sm">Click vào việc làm để xem chi tiết</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
