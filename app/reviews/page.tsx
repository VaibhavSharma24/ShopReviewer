"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Star,
  StarHalf,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  X,
  ChevronDown,
  ShoppingBag,
  Heart,
  TrendingUp,
  Award,
  Zap,
  Menu,
  User,
  Bell,
  Settings,
  LogOut,
  FileText,
  Bookmark,
  Check,
} from "lucide-react"

// Sample e-commerce website data
const websites = [
  {
    id: 1,
    name: "Myntra",
    category: "Fashion",
    rating: 4.5,
    reviews: 1283,
    image: "/myntra-logo.svg",
    description: "Online fashion and lifestyle shopping platform with a wide range of brands",
    pros: ["Huge variety of brands", "Regular discounts", "Easy returns", "Quality products"],
    cons: ["Occasional shipping delays", "Limited international brands"],
    yearFounded: 2007,
    headquarters: "Bangalore, India",
    shippingTime: "2-5 days",
    returnPolicy: "30 days",
    paymentOptions: ["Credit/Debit Card", "UPI", "COD", "EMI"],
    color: "bg-gradient-to-r from-pink-500 to-purple-500",
    trending: true,
    newReview: false,
    deal: "Up to 60% off on summer collection",
  },
  {
    id: 2,
    name: "Amazon",
    category: "General",
    rating: 4.7,
    reviews: 9876,
    image: "/amazon-logo.svg",
    description: "Global e-commerce giant offering everything from books to electronics",
    pros: ["Massive product selection", "Fast delivery with Prime", "Reliable customer service", "Easy returns"],
    cons: ["Quality varies by seller", "Counterfeit products sometimes slip through"],
    yearFounded: 1994,
    headquarters: "Seattle, USA",
    shippingTime: "1-3 days with Prime",
    returnPolicy: "7-30 days depending on category",
    paymentOptions: ["Credit/Debit Card", "UPI", "COD", "EMI", "Amazon Pay"],
    color: "bg-gradient-to-r from-orange-400 to-amber-500",
    trending: true,
    newReview: true,
    deal: "Prime Day: Up to 70% off on electronics",
  },
  {
    id: 3,
    name: "Flipkart",
    category: "General",
    rating: 4.3,
    reviews: 7654,
    image: "/flipkart-logo.svg",
    description: "One of India's largest online marketplaces for various products",
    pros: ["Competitive pricing", "Wide product range", "Flipkart assured quality", "Quick delivery"],
    cons: ["Customer service can be improved", "Return process sometimes complicated"],
    yearFounded: 2007,
    headquarters: "Bangalore, India",
    shippingTime: "2-7 days",
    returnPolicy: "7-10 days",
    paymentOptions: ["Credit/Debit Card", "UPI", "COD", "EMI", "Flipkart Pay Later"],
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    trending: true,
    newReview: false,
    deal: "Big Billion Days: Discounts across all categories",
  },
  {
    id: 4,
    name: "Ajio",
    category: "Fashion",
    rating: 4.2,
    reviews: 3421,
    image: "/ajio-logo.svg",
    description: "Fashion and lifestyle e-commerce platform with curated collections",
    pros: ["Unique product selection", "Good quality", "Trendy designs", "Regular sales"],
    cons: ["Higher price point", "Limited size availability for some items"],
    yearFounded: 2016,
    headquarters: "Mumbai, India",
    shippingTime: "3-7 days",
    returnPolicy: "15 days",
    paymentOptions: ["Credit/Debit Card", "UPI", "COD", "Wallet"],
    color: "bg-gradient-to-r from-cyan-500 to-blue-500",
    trending: false,
    newReview: true,
    deal: "Buy 2 Get 1 Free on all footwear",
  },
  {
    id: 5,
    name: "Nykaa",
    category: "Beauty",
    rating: 4.6,
    reviews: 5432,
    image: "/nykaa-logo.svg",
    description: "India's leading beauty and cosmetics e-commerce platform",
    pros: ["Authentic products", "Wide range of brands", "Detailed product information", "Beauty advice"],
    cons: ["Occasional shipping delays", "Limited international shipping"],
    yearFounded: 2012,
    headquarters: "Mumbai, India",
    shippingTime: "2-6 days",
    returnPolicy: "7-14 days",
    paymentOptions: ["Credit/Debit Card", "UPI", "COD", "EMI"],
    color: "bg-gradient-to-r from-pink-400 to-pink-600",
    trending: true,
    newReview: true,
    deal: "Pink Sale: Up to 40% off on luxury beauty brands",
  },
  {
    id: 6,
    name: "Meesho",
    category: "Fashion",
    rating: 3.9,
    reviews: 2876,
    image: "/meesho-logo.svg",
    description: "Social commerce platform focusing on affordable fashion and home products",
    pros: ["Very affordable prices", "Reseller opportunities", "Wide variety", "Cash on delivery"],
    cons: ["Quality can be inconsistent", "Longer delivery times", "Limited premium options"],
    yearFounded: 2015,
    headquarters: "Bangalore, India",
    shippingTime: "4-10 days",
    returnPolicy: "7 days",
    paymentOptions: ["Credit/Debit Card", "UPI", "COD"],
    color: "bg-gradient-to-r from-fuchsia-500 to-purple-600",
    trending: false,
    newReview: false,
    deal: "First order: Flat 50% off up to ₹200",
  },
  {
    id: 7,
    name: "Tata CLiQ",
    category: "General",
    rating: 4.1,
    reviews: 1987,
    image: "/tata-logo.svg",
    description: "Multi-category e-commerce platform by the Tata Group",
    pros: ["Authentic products", "Brand assurance", "Quality focus", "Good customer service"],
    cons: ["Limited product range compared to competitors", "Higher price points"],
    yearFounded: 2016,
    headquarters: "Mumbai, India",
    shippingTime: "3-7 days",
    returnPolicy: "30 days",
    paymentOptions: ["Credit/Debit Card", "UPI", "COD", "EMI"],
    color: "bg-gradient-to-r from-indigo-500 to-indigo-700",
    trending: false,
    newReview: true,
    deal: "CLiQ Day: Up to 80% off on premium brands",
  },
  {
    id: 8,
    name: "Snapdeal",
    category: "General",
    rating: 3.7,
    reviews: 4321,
    image: "/snapdeal-logo.svg",
    description: "Value-focused e-commerce marketplace with a wide range of products",
    pros: ["Budget-friendly options", "Wide product selection", "Regular deals", "Easy navigation"],
    cons: ["Quality varies significantly", "Customer service issues reported", "Longer delivery times"],
    yearFounded: 2010,
    headquarters: "New Delhi, India",
    shippingTime: "4-10 days",
    returnPolicy: "7-15 days depending on category",
    paymentOptions: ["Credit/Debit Card", "UPI", "COD", "EMI"],
    color: "bg-gradient-to-r from-red-500 to-red-600",
    trending: false,
    newReview: false,
    deal: "Mega Savings: Products starting at ₹99",
  },
]

// Sample user reviews for websites
const sampleReviews = [
  {
    id: 1,
    websiteId: 1, // Myntra
    username: "FashionEnthusiast",
    rating: 5,
    date: "2023-12-15",
    title: "Best Fashion Shopping Experience",
    comment:
      "I've been shopping on Myntra for years and it's consistently reliable. The app is user-friendly, deliveries are prompt, and their collection is always on trend. Their Myntra Insider program offers great benefits too!",
    helpful: 24,
    notHelpful: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    websiteId: 1, // Myntra
    username: "StyleGuru",
    rating: 4,
    date: "2023-11-30",
    title: "Great Selection but Occasional Delivery Issues",
    comment:
      "Myntra has an amazing collection of brands and styles. I love their exclusive labels like Roadster and HRX. The only issue I've faced is with delivery delays during sale periods. Otherwise, it's my go-to fashion destination.",
    helpful: 12,
    notHelpful: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    websiteId: 2, // Amazon
    username: "TechShopper",
    rating: 5,
    date: "2023-12-05",
    title: "One-Stop Shop for Everything",
    comment:
      "Amazon is simply unbeatable when it comes to variety and convenience. Prime delivery is lightning fast, and their customer service always resolves issues promptly. I've purchased everything from electronics to groceries with consistently good experiences.",
    helpful: 38,
    notHelpful: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    websiteId: 3, // Flipkart
    username: "BudgetBuyer",
    rating: 4,
    date: "2023-10-22",
    title: "Great Deals but Customer Service Needs Improvement",
    comment:
      "Flipkart offers amazing deals, especially during Big Billion Days. I've found prices to be better than most competitors. However, their customer service can be frustrating to deal with when there are issues. The Flipkart Assured tag helps in finding reliable products.",
    helpful: 19,
    notHelpful: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    websiteId: 4, // Ajio
    username: "FashionForward",
    rating: 4,
    date: "2023-11-15",
    title: "Unique Collections but Premium Pricing",
    comment:
      "Ajio stands out with its unique and trendy collections that you won't find elsewhere. Their private labels like AJIO Life offer great quality. Prices are on the higher side, but the quality justifies it. Their sales offer good value though!",
    helpful: 15,
    notHelpful: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    websiteId: 5, // Nykaa
    username: "BeautyEnthusiast",
    rating: 5,
    date: "2023-11-05",
    title: "Best Platform for Beauty Products",
    comment:
      "Nykaa has transformed how I shop for beauty products. Their range is unmatched, from drugstore to luxury brands. The detailed product information and genuine reviews help make informed decisions. Their Nykaa Pink Sale offers amazing discounts too!",
    helpful: 31,
    notHelpful: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    websiteId: 7, // Tata CLiQ
    username: "QualitySeeker",
    rating: 4,
    date: "2023-10-12",
    title: "Premium Experience with Authentic Products",
    comment:
      "Tata CLiQ stands out for its focus on quality and authenticity. While their prices might be slightly higher, the peace of mind knowing you're getting genuine products is worth it. Their CLiQ Luxury section has some amazing premium brands that are hard to find elsewhere.",
    helpful: 22,
    notHelpful: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    websiteId: 8, // Snapdeal
    username: "BargainHunter",
    rating: 3,
    date: "2023-09-18",
    title: "Great Deals but Quality Varies",
    comment:
      "Snapdeal is my go-to for budget shopping. You can find amazing deals that are much cheaper than other platforms. However, you need to be careful about product quality and check seller ratings. Their Snapdeal Plus program has improved delivery times for me.",
    helpful: 14,
    notHelpful: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    websiteId: 6, // Meesho
    username: "BudgetFashionista",
    rating: 4,
    date: "2023-10-05",
    title: "Incredible Prices for Decent Quality",
    comment:
      "Meesho has revolutionized how I shop for affordable fashion. The prices are unbelievably low, and while the quality isn't luxury, it's perfectly fine for everyday wear. I've bought everything from dresses to home decor, and their reseller program is a great way to earn extra income.",
    helpful: 27,
    notHelpful: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 10,
    websiteId: 4, // Ajio
    username: "TrendWatcher",
    rating: 5,
    date: "2023-12-01",
    title: "Best Curated Collections in Fashion",
    comment:
      "Ajio has the most unique and fashion-forward collections I've seen. Their exclusive brands like Ajio Life and Indie are amazing for statement pieces. The website is beautifully designed and makes shopping a pleasure. Their Big Bold Sale offers incredible discounts that make premium fashion accessible.",
    helpful: 19,
    notHelpful: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Featured websites for the hero section
const featuredWebsites = [2, 1, 3] // Amazon, Myntra, Flipkart

// User saved websites
const savedWebsites = [1, 2, 5] // Myntra, Amazon, Nykaa

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedWebsite, setSelectedWebsite] = useState<number | null>(null)
  const [sortOption, setSortOption] = useState<"popularity" | "rating">("popularity")
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    rating: 0,
  })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  // Add these state variables for the new functionality
  const [activeSection, setActiveSection] = useState<"all" | "trending" | "new-reviews" | "deals">("all")
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  // Add a new state variable for the write review modal
  const [showWriteReviewModal, setShowWriteReviewModal] = useState(false)
  const [reviewFormData, setReviewFormData] = useState({
    rating: 5,
    title: "",
    comment: "",
  })

  // Add a new state variable to store user's reviews
  const [userReviews, setUserReviews] = useState<typeof sampleReviews>([
    {
      id: 101,
      websiteId: 2, // Amazon
      username: "John Doe",
      rating: 5,
      date: "2023-11-10",
      title: "Great Shopping Experience",
      comment: "Amazon has been my go-to for almost everything. The Prime delivery is incredibly fast and reliable.",
      helpful: 15,
      notHelpful: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 102,
      websiteId: 1, // Myntra
      username: "John Doe",
      rating: 4,
      date: "2023-10-22",
      title: "Good Fashion Selection",
      comment:
        "Myntra has a great collection of fashion items. The quality is good and prices are reasonable during sales.",
      helpful: 8,
      notHelpful: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  // Handle click outside to close sort dropdown and modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Close sort dropdown if clicked outside
      if (!target.closest(".sort-dropdown")) {
        setShowSortOptions(false)
      }

      // Close modal if clicked outside
      if (modalRef.current && !modalRef.current.contains(target) && target.id === "modal-backdrop") {
        setSelectedWebsite(null)
      }

      // Close profile menu if clicked outside
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setShowProfileMenu(false)
      }

      // Close notifications if clicked outside
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    // Prevent scrolling when modal is open
    if (
      selectedWebsite !== null ||
      showProfileModal ||
      showSettingsModal ||
      showReviewsModal ||
      showSavedModal ||
      showLogoutModal ||
      showWriteReviewModal
    ) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [
    selectedWebsite,
    showProfileModal,
    showSettingsModal,
    showReviewsModal,
    showSavedModal,
    showLogoutModal,
    showWriteReviewModal,
  ])

  // Update the handleReviewSubmit function to add the new review to both sampleReviews and userReviews
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new review object
    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`

    const newReview = {
      id: Math.max(...sampleReviews.map((r) => r.id), ...userReviews.map((r) => r.id)) + 1,
      websiteId: selectedWebsite as number,
      username: "John Doe", // Current user's name
      rating: reviewFormData.rating,
      date: formattedDate,
      title: reviewFormData.title,
      comment: reviewFormData.comment,
      helpful: 0,
      notHelpful: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    // Add the new review to both arrays
    sampleReviews.unshift(newReview)
    setUserReviews((prev) => [newReview, ...prev])

    // Show a success message or update the UI
    setShowWriteReviewModal(false)

    // Reset the form
    setReviewFormData({
      rating: 5,
      title: "",
      comment: "",
    })
  }

  // Filter and sort websites based on search query, filters, and sort option
  const filteredWebsites = websites
    .filter((website) => {
      // Section filter
      if (activeSection === "trending" && !website.trending) {
        return false
      }
      if (activeSection === "new-reviews" && !website.newReview) {
        return false
      }
      if (activeSection === "deals" && !website.deal) {
        return false
      }

      // Search filter
      if (
        searchQuery &&
        !website.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !website.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Category filter from quick filters
      if (activeCategory && website.category !== activeCategory) {
        return false
      }

      // Category filter from sidebar
      if (filters.categories.length > 0 && !filters.categories.includes(website.category)) {
        return false
      }

      // Rating filter
      if (filters.rating > 0 && website.rating < filters.rating) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected option
      if (sortOption === "popularity") {
        return b.reviews - a.reviews // Sort by number of reviews (descending)
      } else {
        return b.rating - a.rating // Sort by rating (descending)
      }
    })

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const setRatingFilter = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      rating: rating,
    }))
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return stars
  }

  // Update the getWebsiteReviews function to include both sample reviews and user reviews
  const getWebsiteReviews = (websiteId: number) => {
    return [...sampleReviews.filter((review) => review.websiteId === websiteId)]
  }

  // Get website by ID
  const getWebsiteById = (id: number) => {
    return websites.find((website) => website.id === id)
  }

  // Get selected website details
  const selectedWebsiteDetails = selectedWebsite ? getWebsiteById(selectedWebsite) : null

  // Handle profile menu actions
  const handleViewProfile = () => {
    setShowProfileMenu(false)
    setShowProfileModal(true)
  }

  const handleAccountSettings = () => {
    setShowProfileMenu(false)
    setShowSettingsModal(true)
  }

  const handleMyReviews = () => {
    setShowProfileMenu(false)
    setShowReviewsModal(true)
  }

  const handleSavedWebsites = () => {
    setShowProfileMenu(false)
    setShowSavedModal(true)
  }

  const handleSignOut = () => {
    setShowProfileMenu(false)
    setShowLogoutModal(true)
  }

  const confirmSignOut = () => {
    setShowLogoutModal(false)
    setIsLoggedOut(true)
    // In a real app, you would clear auth tokens, cookies, etc.
    setTimeout(() => {
      setIsLoggedOut(false)
    }, 3000)
  }

  // Get section title based on active section
  const getSectionTitle = () => {
    switch (activeSection) {
      case "trending":
        return "Trending Shopping Websites"
      case "new-reviews":
        return "Recently Reviewed Websites"
      case "deals":
        return "Websites with Active Deals"
      default:
        return "Shopping Website Reviews"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-6 flex items-center">
                <ShoppingBag className="mr-2 h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopReviewer
                </span>
              </Link>

              <nav className="hidden space-x-6 md:flex">
                <button
                  className={`flex items-center text-sm font-medium ${
                    activeSection === "trending" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  } transition-colors`}
                  onClick={() => setActiveSection(activeSection === "trending" ? "all" : "trending")}
                >
                  <TrendingUp className="mr-1 h-4 w-4" /> Top Websites
                </button>
                <button
                  className={`flex items-center text-sm font-medium ${
                    activeSection === "new-reviews" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  } transition-colors`}
                  onClick={() => setActiveSection(activeSection === "new-reviews" ? "all" : "new-reviews")}
                >
                  <Award className="mr-1 h-4 w-4" /> New Reviews
                </button>
                <button
                  className={`flex items-center text-sm font-medium ${
                    activeSection === "deals" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  } transition-colors`}
                  onClick={() => setActiveSection(activeSection === "deals" ? "all" : "deals")}
                >
                  <Zap className="mr-1 h-4 w-4" /> Deals
                </button>
              </nav>
            </div>

            <div className="relative mx-4 hidden flex-1 max-w-md md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for shopping websites..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <button
                  className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  onClick={() => {
                    setShowNotifications(!showNotifications)
                    if (showProfileMenu) setShowProfileMenu(false)
                  }}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    3
                  </span>
                </button>

                {showNotifications && (
                  <div
                    ref={notificationsRef}
                    className="absolute right-0 top-full mt-2 w-80 rounded-lg border bg-white shadow-lg z-50 animate-in fade-in slide-in-from-top-5 duration-200"
                  >
                    <div className="p-3 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Notifications</h3>
                        <button className="text-xs text-blue-600 hover:underline">Mark all as read</button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Star className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">New review for Amazon</p>
                            <p className="text-xs text-gray-500">TechShopper gave Amazon 5 stars</p>
                            <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <ThumbsUp className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Your review was liked</p>
                            <p className="text-xs text-gray-500">5 people found your Myntra review helpful</p>
                            <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Zap className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Special offer from Nykaa</p>
                            <p className="text-xs text-gray-500">Get 20% off on your next purchase</p>
                            <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t text-center">
                      <button className="text-sm text-blue-600 hover:underline">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative hidden md:block">
                <button
                  className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu)
                    if (showNotifications) setShowNotifications(false)
                  }}
                >
                  <User className="h-5 w-5" />
                </button>

                {showProfileMenu && (
                  <div
                    ref={profileMenuRef}
                    className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-white shadow-lg z-50 animate-in fade-in slide-in-from-top-5 duration-200"
                  >
                    <div className="p-3 border-b">
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-gray-500">john.doe@example.com</p>
                    </div>
                    <div className="py-1">
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleViewProfile}
                      >
                        <User className="mr-2 h-4 w-4" /> View Profile
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleAccountSettings}
                      >
                        <Settings className="mr-2 h-4 w-4" /> Account Settings
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleMyReviews}
                      >
                        <FileText className="mr-2 h-4 w-4" /> My Reviews
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleSavedWebsites}
                      >
                        <Bookmark className="mr-2 h-4 w-4" /> Saved Websites
                      </button>
                    </div>
                    <div className="border-t py-1">
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-gray-100 p-2 md:hidden" onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="mt-4 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search websites..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:border-blue-500 focus:bg-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Featured Websites */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Find the Best Shopping Websites</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Discover honest reviews, ratings, and insights about your favorite e-commerce platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredWebsites.map((id) => {
              const website = getWebsiteById(id)
              if (!website) return null

              return (
                <div
                  key={id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-14 w-14 rounded-lg bg-white p-2 mr-4 flex items-center justify-center">
                      <Image
                        src={website.image || "/placeholder.svg"}
                        alt={website.name}
                        width={48}
                        height={48}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{website.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex mr-2">{renderStars(website.rating)}</div>
                        <span className="text-sm text-blue-200">{website.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-blue-100 mb-4 line-clamp-2">{website.description}</p>
                  <button
                    className="w-full py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium"
                    onClick={() => setSelectedWebsite(website.id)}
                  >
                    View Details
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Category Filters */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(null)}
            >
              All Categories
            </button>
            {["Fashion", "General", "Beauty", "Electronics", "Grocery"].map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Filters Sidebar - Mobile */}
          {showFilters && (
            <div className="fixed inset-0 z-40 bg-white p-4 md:hidden">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="rounded-full p-2 hover:bg-gray-100">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-4 space-y-6 overflow-y-auto pb-20">
                {/* Categories */}
                <div>
                  <h3 className="mb-3 font-semibold">Website Categories</h3>
                  <div className="space-y-2">
                    {["Fashion", "General", "Beauty", "Electronics", "Grocery"].map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                          checked={filters.categories.includes(category)}
                          onChange={() => toggleCategory(category)}
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="mb-3 font-semibold">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          className="mr-2 h-4 w-4 rounded-full text-blue-600 focus:ring-blue-500"
                          checked={filters.rating === rating}
                          onChange={() => setRatingFilter(rating)}
                        />
                        <div className="flex items-center">
                          {rating}+ {renderStars(rating)}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  className="fixed bottom-4 left-4 right-4 rounded-full bg-blue-600 py-3 text-center font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Filters Sidebar - Desktop */}
          <div className="hidden w-72 shrink-0 md:block">
            <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-bold">Refine Results</h2>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-gray-700">Website Categories</h3>
                <div className="space-y-2">
                  {["Fashion", "General", "Beauty", "Electronics", "Grocery"].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span className="text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-700">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        className="mr-2 h-4 w-4 rounded-full text-blue-600 focus:ring-blue-500"
                        checked={filters.rating === rating}
                        onChange={() => setRatingFilter(rating)}
                      />
                      <div className="flex items-center">
                        <span className="mr-2 text-gray-600">{rating}+</span>
                        {renderStars(rating)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Filters */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="mb-3 font-semibold text-gray-700">Payment Options</h3>
                <div className="space-y-2">
                  {["Credit/Debit Card", "UPI", "COD", "EMI", "Wallet"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input type="checkbox" className="mr-2 h-4 w-4 rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-gray-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="mb-3 font-semibold text-gray-700">Shipping Time</h3>
                <div className="space-y-2">
                  {["1-3 days", "3-7 days", "7+ days"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input type="checkbox" className="mr-2 h-4 w-4 rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-gray-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Website Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">{getSectionTitle()}</h1>
              <div className="flex items-center gap-2 sort-dropdown relative">
                <span className="text-sm text-gray-500">Sort by:</span>
                <button
                  className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors"
                  onClick={() => setShowSortOptions(!showSortOptions)}
                >
                  {sortOption === "popularity" ? "Popularity" : "Rating"} <ChevronDown className="h-4 w-4" />
                </button>

                {showSortOptions && (
                  <div className="absolute right-0 top-full mt-1 w-32 rounded-md border bg-white shadow-lg z-10">
                    <button
                      className={`w-full px-3 py-2 text-left text-sm ${sortOption === "popularity" ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setSortOption("popularity")
                        setShowSortOptions(false)
                      }}
                    >
                      Popularity
                    </button>
                    <button
                      className={`w-full px-3 py-2 text-left text-sm ${sortOption === "rating" ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setSortOption("rating")
                        setShowSortOptions(false)
                      }}
                    >
                      Rating
                    </button>
                  </div>
                )}
              </div>
            </div>

            {filteredWebsites.length === 0 ? (
              <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
                <h3 className="text-lg font-semibold">No websites found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredWebsites.map((website) => (
                  <div
                    key={website.id}
                    className="group cursor-pointer overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    <div className={`h-3 w-full ${website.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 overflow-hidden rounded-lg border bg-gray-100 p-2 flex items-center justify-center">
                            <Image
                              src={website.image || "/placeholder.svg"}
                              alt={website.name}
                              width={60}
                              height={60}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{website.name}</h3>
                            <p className="text-sm text-gray-500">{website.category}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1">{renderStars(website.rating)}</div>
                          <p className="text-sm text-gray-500">{website.reviews} reviews</p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-gray-600 line-clamp-2">{website.description}</p>

                      {/* Show deal badge if in deals section or if the website has a deal */}
                      {website.deal && (
                        <div className="mt-3 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-xs font-medium flex items-center">
                          <Zap className="h-3.5 w-3.5 mr-1" /> {website.deal}
                        </div>
                      )}

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-green-600 flex items-center">
                            <ThumbsUp className="mr-1 h-3.5 w-3.5" /> Pros
                          </h4>
                          <ul className="mt-1 list-inside list-disc text-xs text-gray-600">
                            {website.pros.slice(0, 3).map((pro, index) => (
                              <li key={index}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-red-600 flex items-center">
                            <ThumbsDown className="mr-1 h-3.5 w-3.5" /> Cons
                          </h4>
                          <ul className="mt-1 list-inside list-disc text-xs text-gray-600">
                            {website.cons.slice(0, 2).map((con, index) => (
                              <li key={index}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between text-xs text-gray-500">
                        <span>Founded: {website.yearFounded}</span>
                        <span>Shipping: {website.shippingTime}</span>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex items-center">
                          <Heart
                            className={`h-4 w-4 mr-1 ${savedWebsites.includes(website.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                          />
                          <span className="text-xs text-gray-500">Save</span>
                        </div>
                        <button
                          className="text-xs font-medium text-blue-600 group-hover:underline"
                          onClick={() => setSelectedWebsite(website.id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center space-x-1">
                <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white">1</button>
                <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  2
                </button>
                <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  10
                </button>
                <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Website Details */}
      {selectedWebsiteDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
          id="modal-backdrop"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300"
          >
            <div className={`h-3 w-full ${selectedWebsiteDetails.color}`}></div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-lg border bg-gray-100 p-2 flex items-center justify-center">
                    <Image
                      src={selectedWebsiteDetails.image || "/placeholder.svg"}
                      alt={selectedWebsiteDetails.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedWebsiteDetails.name}</h2>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-2">{renderStars(selectedWebsiteDetails.rating)}</div>
                      <span className="text-sm text-gray-500">{selectedWebsiteDetails.reviews} reviews</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{selectedWebsiteDetails.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedWebsite(null)}
                  className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <p className="text-gray-700 mb-6">{selectedWebsiteDetails.description}</p>

              {/* Show deal if available */}
              {selectedWebsiteDetails.deal && (
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                  <Zap className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800">Current Deal</h3>
                    <p className="text-blue-700">{selectedWebsiteDetails.deal}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h3 className="font-semibold text-gray-800 mb-3">Company Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Founded:</span>
                      <span className="font-medium">{selectedWebsiteDetails.yearFounded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Headquarters:</span>
                      <span className="font-medium">{selectedWebsiteDetails.headquarters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{selectedWebsiteDetails.category}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h3 className="font-semibold text-gray-800 mb-3">Shipping & Returns</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping Time:</span>
                      <span className="font-medium">{selectedWebsiteDetails.shippingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Return Policy:</span>
                      <span className="font-medium">{selectedWebsiteDetails.returnPolicy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating:</span>
                      <span className="font-medium flex items-center">
                        {selectedWebsiteDetails.rating}{" "}
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Payment Options</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWebsiteDetails.paymentOptions.map((option, index) => (
                    <span key={index} className="px-3 py-1 bg-white border rounded-full text-xs text-gray-700">
                      {option}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h3 className="font-semibold text-green-600 flex items-center mb-3">
                    <ThumbsUp className="mr-2 h-4 w-4" /> Pros
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedWebsiteDetails.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h3 className="font-semibold text-red-600 flex items-center mb-3">
                    <ThumbsDown className="mr-2 h-4 w-4" /> Cons
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedWebsiteDetails.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-400 fill-yellow-400" />
                  User Reviews
                </h3>

                <div className="space-y-4 mb-6">
                  {getWebsiteReviews(selectedWebsiteDetails.id).length > 0 ? (
                    getWebsiteReviews(selectedWebsiteDetails.id).map((review) => (
                      <div
                        key={review.id}
                        className="rounded-lg border bg-gray-50 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <Image
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.username}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-medium">{review.username}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <h4 className="mt-3 font-medium">{review.title}</h4>
                        <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <ThumbsUp className="h-3 w-3" /> Helpful ({review.helpful})
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <ThumbsDown className="h-3 w-3" /> Not helpful ({review.notHelpful})
                          </button>
                          <button className="hover:text-blue-600 transition-colors">Report</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm text-gray-500 py-4">No reviews yet for this website.</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowWriteReviewModal(true)}
                  >
                    Write a Review
                  </button>
                  <button className="rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors flex items-center justify-center">
                    Visit Website <ExternalLink className="ml-1 inline h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Profile</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-blue-100 mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-gray-500">john.doe@example.com</p>
                <p className="text-sm text-gray-500 mt-1">Member since January 2023</p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h4 className="font-medium text-gray-700 mb-2">Activity Summary</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-xs text-gray-500">Reviews</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">48</p>
                      <p className="text-xs text-gray-500">Helpful Votes</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                      <p className="text-xs text-gray-500">Saved Sites</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h4 className="font-medium text-gray-700 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Fashion</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Electronics</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Beauty</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-6 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                onClick={() => setShowProfileModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Account Settings</h2>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                    defaultValue="••••••••"
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-700 mb-2">Notification Preferences</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 mr-2"
                        defaultChecked
                      />
                      <span className="text-sm text-gray-700">Email notifications for new reviews</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 mr-2"
                        defaultChecked
                      />
                      <span className="text-sm text-gray-700">Deal alerts for saved websites</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm text-gray-700">Weekly newsletter</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowSettingsModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    setShowSettingsModal(false)
                    // Show success message in a real app
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* My Reviews Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">My Reviews</h2>
              <button
                onClick={() => setShowReviewsModal(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              {userReviews.length > 0 ? (
                userReviews.map((review) => {
                  const website = getWebsiteById(review.websiteId)
                  if (!website) return null

                  return (
                    <div key={review.id} className="rounded-lg border bg-gray-50 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg overflow-hidden">
                            <Image
                              src={website.image || "/placeholder.svg"}
                              alt={website.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div>
                            <span className="font-medium">{website.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <h4 className="font-medium">{review.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" /> {review.helpful} helpful
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-xs text-blue-600 hover:underline">Edit</button>
                          <button className="text-xs text-red-600 hover:underline">Delete</button>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-center text-sm text-gray-500 py-4">You haven't written any reviews yet.</p>
              )}
            </div>

            <button
              className="w-full mt-6 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              onClick={() => setShowReviewsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Saved Websites Modal */}
      {showSavedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">Saved Websites</h2>
              <button
                onClick={() => setShowSavedModal(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {savedWebsites.map((id) => {
                  const website = getWebsiteById(id)
                  if (!website) return null

                  return (
                    <div
                      key={id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-gray-50"
                    >
                      <div className="h-16 w-16 overflow-hidden rounded-lg border bg-white p-2 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={website.image || "/placeholder.svg"}
                          alt={website.name}
                          width={60}
                          height={60}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{website.name}</h3>
                          <div className="flex">{renderStars(website.rating)}</div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{website.category}</p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{website.description}</p>

                        {website.deal && (
                          <div className="mt-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-xs font-medium inline-flex items-center">
                            <Zap className="h-3.5 w-3.5 mr-1" /> {website.deal}
                          </div>
                        )}

                        <div className="mt-3 flex justify-between items-center">
                          <button
                            className="text-xs text-blue-600 hover:underline"
                            onClick={() => {
                              setShowSavedModal(false)
                              setSelectedWebsite(website.id)
                            }}
                          >
                            View Details
                          </button>
                          <button className="text-xs text-red-600 hover:underline flex items-center">
                            <X className="h-3 w-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button
                className="w-full mt-6 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                onClick={() => setShowSavedModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-300">
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-red-100 mb-4 flex items-center justify-center">
                  <LogOut className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-center">Sign Out</h3>
                <p className="text-gray-500 text-center mt-2">Are you sure you want to sign out of your account?</p>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors"
                  onClick={confirmSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast for Sign Out */}
      {isLoggedOut && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-100 border border-green-200 text-green-800 rounded-lg p-4 shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center">
          <Check className="h-5 w-5 text-green-600 mr-2" />
          <p>Successfully signed out!</p>
        </div>
      )}

      {/* Write Review Modal */}
      {showWriteReviewModal && selectedWebsiteDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Write a Review for {selectedWebsiteDetails.name}</h2>
              <button
                onClick={() => setShowWriteReviewModal(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleReviewSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= reviewFormData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                    placeholder="Summarize your experience"
                    value={reviewFormData.title}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors min-h-[120px]"
                    placeholder="Share your experience with this website. What did you like or dislike? Would you recommend it to others?"
                    value={reviewFormData.comment}
                    onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Review Guidelines:</p>
                  <ul className="text-xs text-gray-500 space-y-1 list-disc pl-5">
                    <li>Be honest and specific about your experience</li>
                    <li>Focus on the website's features, services, and user experience</li>
                    <li>Avoid using offensive language or making personal attacks</li>
                    <li>Your review will be visible to other users after moderation</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowWriteReviewModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated with the Latest Reviews</h2>
            <p className="text-blue-100 mb-6">
              Subscribe to our newsletter and never miss new website reviews, shopping tips, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-4">
                <ShoppingBag className="mr-2 h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">ShopReviewer</span>
              </div>
              <p className="text-sm text-gray-400">
                Your trusted platform for honest reviews of shopping websites and e-commerce platforms.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.772 1.153 4.902 4.902 0 01-1.153 1.772c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-gray-200">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Fashion Websites</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Electronics Stores</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">General Marketplaces</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Beauty & Cosmetics</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Grocery Delivery</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-gray-200">Help</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">FAQs</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Contact Us</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Review Guidelines</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Report a Problem</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-gray-200">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Instagram</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Twitter</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">Facebook</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">LinkedIn</a>
                </li>
                <li className="hover:text-blue-400 transition-colors">
                  <a href="#">YouTube</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            <p>© 2024 ShopReviewer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

