import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  FolderOpen, 
  Download, 
  Menu,
  X,
  Facebook,
  Send,
  Instagram,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // Start with middle image (index 1)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(null);
  const [holdTimer, setHoldTimer] = useState(null);
  
  const navigate = useNavigate();

  // Sample gallery data - ganti dengan foto dan data sebenarnya
  const galleryData = [
   {
      id: 1,
      image: "g1.png",
      title: "SaQu - Sahabat Qur'an",
      description: "Website interaktif untuk belajar Al-Qur'an dengan fitur 30 juz Al-Qur'an, Asmaul Husna, dan masih banyak lagi.",
      link: "https://saqu.netlify.app/"
    },
    {
      id: 2,
      image: "g2.png",
      title: "FreshFood",
      description: "Website e-commerce untuk produk makanan segar dengan desain modern dan responsif. (untuk project ini masih dalam tahap pengembangan)",
    },
    {
      id: 3,
      image: "g3.png",
      title: "TIFPoint",
      description: "Website perhitungan poin kompetensi untuk mahasiswa Teknik Informatika Universitas Islam Negeri Sultan Syarif Kasim Riau.",
      link: "https://tif-point.netlify.app/"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'About Me', icon: User, path: '/about' },
    { name: 'Project', icon: FolderOpen, path: '/project' },
  ];

  // Handle CV download - replace with your actual CV file path
  const handleCVDownload = () => {
    // Option 1: Direct download link (replace with your actual CV URL)
    const cvUrl = 'https://drive.google.com/file/d/19e_fBLCjO3PpyryO3q5eTTiQjMtgFqW1/view?usp=sharing'; // Put your CV file in the public folder
    
    // Create a temporary link and click it to download
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV-Naufal-Hidayatul-Aulia.pdf'; // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
     window.open(cvUrl, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryData.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  const handleMouseDown = (e) => {
    // Only start dragging if not clicking on an image directly
    if (!e.target.closest('.gallery-image')) {
      setIsDragging(true);
      setStartX(e.clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setTranslateX(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (translateX > 100) {
      prevImage();
    } else if (translateX < -100) {
      nextImage();
    }
    
    setTranslateX(0);
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('.gallery-image')) {
      const imageIndex = parseInt(e.target.closest('.gallery-image').dataset.index);
      const timer = setTimeout(() => {
        setIsZoomed(true);
        setZoomedImageIndex(imageIndex);
      }, 800); // Hold for 800ms on mobile
      setHoldTimer(timer);
    }
    
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    // Clear hold timer if touch moves (swiping)
    if (holdTimer) {
      clearTimeout(holdTimer);
      setHoldTimer(null);
    }
    
    const deltaX = e.touches[0].clientX - startX;
    setTranslateX(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    // Clear hold timer
    if (holdTimer) {
      clearTimeout(holdTimer);
      setHoldTimer(null);
    }
    
    setIsDragging(false);
    
    if (translateX > 100) {
      prevImage();
    } else if (translateX < -100) {
      nextImage();
    }
    
    setTranslateX(0);
  };

  const handleImageMouseDown = (e, index) => {
    e.stopPropagation();
    // Start drag only if on desktop
    if (window.innerWidth >= 768) {
      setIsDragging(true);
      setStartX(e.clientX);
    }
  };

  const handleImageClick = (e, index) => {
    e.stopPropagation();
    // Only zoom on desktop and if not dragging
    if (window.innerWidth >= 768 && Math.abs(translateX) < 10) {
      setIsZoomed(true);
      setZoomedImageIndex(index);
    }
  };

  const closeZoom = () => {
    setIsZoomed(false);
    setZoomedImageIndex(null);
  };

  const getImagePosition = (index) => {
    const diff = index - currentImageIndex;
    let position = diff * 320; // Base spacing
    
    if (isDragging) {
      position += translateX;
    }
    
    return position;
  };

  const getImageScale = (index) => {
    const diff = Math.abs(index - currentImageIndex);
    if (diff === 0) return 1.2; // Center image is larger
    if (diff === 1) return 0.85; // Side images are smaller
    return 0.6; // Far images are smallest
  };

  const getImageOpacity = (index) => {
    const diff = Math.abs(index - currentImageIndex);
    if (diff === 0) return 1; // Center image fully visible
    if (diff === 1) return 0.7; // Side images semi-transparent
    return 0.3; // Far images very transparent
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <style jsx>{`
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-zoom-in {
          animation: zoom-in 0.3s ease-out;
        }
        
        .gallery-image {
          transition: all 0.3s ease;
        }
        
        .gallery-image:hover {
          transform: translateX(var(--translate-x, 0)) scale(var(--scale, 1)) !important;
        }
      `}</style>
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-4 border-cyan-400 rounded-full opacity-30"></div>
      <div className="absolute top-40 right-40 w-4 h-4 bg-cyan-400 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-red-500 rounded-full"></div>
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'w-80 h-16 mt-4' 
          : 'w-full h-20 bg-transparent'
      }`}>
        <div className={`h-full transition-all duration-700 ease-out ${
          isScrolled ? 'px-6 flex items-center justify-center gap-6' : 'px-8 max-w-7xl mx-auto flex items-center justify-between'
        }`}>
          
          {/* Logo */}
          <Link to="/" className={`transition-all duration-700 ease-out ${
            isScrolled ? 'w-10 h-10 md:w-12 md:h-12' : 'w-14 h-14'
          }`}>
            <img 
              src="yath.png" 
              alt="Naufal Logo" 
              className="w-full h-full object-contain filter brightness-100"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 transition-all duration-700 ease-out ${
            isScrolled ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'
          }`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CV Button / Desktop Icons / Mobile Menu */}
          <div className="flex items-center space-x-4">
            {!isScrolled ? (
              <>
                {/* CV Button for desktop and mobile when not scrolled */}
                <button 
                  onClick={handleCVDownload}
                  className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  <span>CV</span>
                  <Download size={16} />
                </button>
                
                {/* Mobile menu button - always visible on mobile */}
                <button
                  className="md:hidden text-white"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </>
            ) : (
              <>
                {/* Desktop: Show navigation icons when scrolled */}
                <div className="hidden md:flex items-center space-x-3 transition-all duration-700 ease-out">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-gray-400 hover:text-white transition-colors duration-300 p-1.5 hover:bg-gray-800 rounded-lg"
                    >
                      <item.icon size={20} />
                    </Link>
                  ))}
                  <button 
                    onClick={handleCVDownload}
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Download size={18} />
                  </button>
                </div>

                {/* Mobile: Only show hamburger and CV when scrolled */}
                <div className="md:hidden flex items-center space-x-3">
                  <button 
                    onClick={handleCVDownload}
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    className="text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`} onClick={() => setIsMobileMenuOpen(false)}>
          <div className={`absolute top-0 left-0 w-full bg-gray-900/95 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`} onClick={(e) => e.stopPropagation()}>
            
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8">
                  <img 
                    src="yath.png" 
                    alt="Naufal Logo" 
                    className="w-full h-full object-contain filter brightness-100"
                  />
                </div>
                <span className="text-white font-medium text-lg">Menu</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-gray-800 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="py-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 border-b border-gray-800/50 last:border-b-0 transform ${
                    isMobileMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 100 + 200}ms` : '0ms'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <item.icon size={20} />
                    </div>
                    <span className="font-medium text-lg">{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* CV Button */}
            <div className={`px-6 py-6 border-t border-gray-700 transform transition-all duration-500 ${
              isMobileMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            }`} style={{
              transitionDelay: isMobileMenuOpen ? '500ms' : '0ms'
            }}>
              <button 
                onClick={() => {
                  handleCVDownload();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-3 w-full justify-center hover:scale-105 shadow-lg"
              >
                <Download size={20} />
                <span className="text-lg">Download CV</span>
              </button>
            </div>

            {/* Footer */}
            <div className={`px-6 py-4 text-center border-t border-gray-700 transform transition-all duration-500 ${
              isMobileMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            }`} style={{
              transitionDelay: isMobileMenuOpen ? '600ms' : '0ms'
            }}>
              <p className="text-gray-400 text-sm">© 2025 Naufal. All rights reserved.</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center min-h-screen px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight">
                <span className="block">Hi,</span>
                <span className="block">
                  I'm <span className="text-red-500 font-medium">Naufal</span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light">
                Website Designer & Frontend Developer
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative flex justify-center lg:justify-end order-first lg:order-last">
            {/* Profile Image Container */}
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] mx-auto relative overflow-hidden rounded-2xl group">
                {/* Your photo with overlay effect and animations */}
                <div className="w-full h-full relative">
                  <img 
                    src="pp.png" 
                    alt="Naufal's Profile" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Animated overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 transition-opacity duration-500 group-hover:opacity-60"></div>
                  
                  {/* Floating animation elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse z-20"></div>
                  <div className="absolute bottom-8 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-bounce z-20" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-1/3 left-4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping z-20" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              My <span className="text-red-500 font-medium">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover some of my recent work and creative projects
            </p>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-12">
            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>

            {/* Images Container */}
            <div 
              className="relative h-80 flex items-center justify-center overflow-hidden select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ 
                userSelect: 'none',
                cursor: isDragging ? 'grabbing' : 'default'
              }}
            >
              {galleryData.map((item, index) => (
                <div
                  key={item.id}
                  className="gallery-image absolute transition-all duration-500 ease-out rounded-2xl overflow-hidden shadow-2xl group"
                  data-index={index}
                  style={{
                    transform: `translateX(${getImagePosition(index)}px) scale(${getImageScale(index)})`,
                    opacity: getImageOpacity(index),
                    zIndex: index === currentImageIndex ? 10 : 5,
                  }}
                  onMouseDown={(e) => handleImageMouseDown(e, index)}
                  onClick={(e) => handleImageClick(e, index)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-80 h-60 object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Zoom indicator - only show on desktop */}
                  <div className="hidden md:block absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>
                  
                  {/* Mobile hold indicator */}
                  <div className="md:hidden absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity duration-300 bg-black/20 pointer-events-none">
                    <div className="text-white text-sm font-medium bg-black/70 px-3 py-1 rounded-full">
                      Hold to zoom
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-3 mt-8">
              {galleryData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-red-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Current Image Info */}
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl font-bold text-white">
              {galleryData[currentImageIndex].title}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              {galleryData[currentImageIndex].description}
            </p>
            {galleryData[currentImageIndex].link && (
              <a
                href={galleryData[currentImageIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>Kunjungi Project</span>
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && zoomedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
          onClick={closeZoom}
        >
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <X size={24} />
            </button>
            
            {/* Zoomed image */}
            <div className="relative max-w-full max-h-full animate-zoom-in">
              <img
                src={galleryData[zoomedImageIndex].image}
                alt={galleryData[zoomedImageIndex].title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Image info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {galleryData[zoomedImageIndex].title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {galleryData[zoomedImageIndex].description}
                </p>
                {galleryData[zoomedImageIndex].link && (
                  <a
                    href={galleryData[zoomedImageIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Kunjungi</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
            
            {/* Navigation arrows in zoom mode */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = (zoomedImageIndex - 1 + galleryData.length) % galleryData.length;
                setZoomedImageIndex(newIndex);
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = (zoomedImageIndex + 1) % galleryData.length;
                setZoomedImageIndex(newIndex);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm text-center">
              <p className="hidden md:block">Klik di luar gambar untuk menutup • Gunakan panah untuk navigasi</p>
              <p className="md:hidden">Tap di luar gambar untuk menutup • Gunakan panah untuk navigasi</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                <span className="text-white">Naufal</span>
              </div>
              <p className="text-gray-400">
                User Interface Designer passionate about creating beautiful and functional digital experiences.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="text-center">
              <h3 className="text-lg font-medium mb-4 text-white">Follow Me</h3>
              <div className="flex justify-center space-x-6">
                <a href="https://www.facebook.com/share/1Ayhq5vgHE/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Facebook size={24} />
                </a>
                <a href="https://www.t.me/naufalhidayatul" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Send size={24} />
                </a>
                <a href="https://www.instagram.com/nhidayatul_a?igsh=MTM3ZWl3Zmo0Zjhraw==" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-medium mb-4 text-white">LinkedIn</h3>
              <div className="flex items-center justify-center md:justify-end space-x-2 text-pink-400">
                <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                <a 
                  href="https://www.linkedin.com/in/naufalhidayatulaulia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-pink-300 transition-colors duration-300 flex items-center space-x-1"
                >
                  <span>www.linkedin.com/in/naufalhidayatulaulia</span>
                  <ExternalLink size={14} className="opacity-70" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Naufal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}