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
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutMe() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [lanyardRotation, setLanyardRotation] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Teks untuk efek typewriter
  const typewriterTexts = [
    "Hi! I'm Naufal Hidayatul Aulia",
    "I'm a Frontend Developer",
    "I love creating beautiful UI/UX",
    "Welcome to my portfolio!"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentText = typewriterTexts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 150;

    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < currentText.length) {
        setDisplayedText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (!isDeleting && currentIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, currentTextIndex]);

  // Mouse movement effect for lanyard
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / 10;
    const deltaY = (e.clientY - centerY) / 10;
    
    setLanyardRotation({ x: deltaY, y: deltaX });
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setLanyardRotation({ x: 0, y: 0 });
  };

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'About Me', icon: User, path: '/about' },
    { name: 'Project', icon: FolderOpen, path: '/project' },
  ];

  // Handle CV download
  const handleCVDownload = () => {
    const cvUrl = 'https://drive.google.com/file/d/19e_fBLCjO3PpyryO3q5eTTiQjMtgFqW1/view?usp=sharing';
    
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV-Naufal-Hidayatul-Aulia.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.open(cvUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
                className={`transition-colors duration-300 ${
                  item.path === '/about' ? 'text-red-500 font-medium' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CV Button / Desktop Icons / Mobile Menu */}
          <div className="flex items-center space-x-4">
            {!isScrolled ? (
              <>
                <button 
                  onClick={handleCVDownload}
                  className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  <span>CV</span>
                  <Download size={16} />
                </button>
                
                <button
                  className="md:hidden text-white"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center space-x-3 transition-all duration-700 ease-out">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`transition-colors duration-300 p-1.5 hover:bg-gray-800 rounded-lg ${
                        item.path === '/about' ? 'text-red-500' : 'text-gray-400 hover:text-white'
                      }`}
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

            <div className="py-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-6 py-4 hover:bg-gray-800/50 transition-all duration-300 border-b border-gray-800/50 last:border-b-0 transform ${
                    isMobileMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 opacity-0'
                  } ${item.path === '/about' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
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
          
          {/* Left Content - Typewriter Text */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-6">
              {/* Typewriter Text */}
              <div className="h-20 flex items-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                  <span className="text-white">
                    {displayedText}
                    <span className="animate-pulse text-red-500">|</span>
                  </span>
                </h1>
              </div>
              
              {/* Static Description */}
              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
                 Seseorang yang sangat antusias menciptakan pengalaman digital yang indah dan fungsional.
Saya spesialis dalam pengembangan front-end dengan teknologi modern seperti React, JavaScript, dan desain responsif
                </p>
                
                <div className="space-y-2 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-300">Frontend Developer</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">UI/UX Enthusiast</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span className="text-gray-300">Problem Solver</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Lanyard */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div 
              className="relative cursor-pointer select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: '1000px' }}
            >
              {/* Lanyard String */}
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full transition-all duration-300 ease-out"
                style={{
                  height: '100px',
                  transform: `translateX(-50%) rotateY(${lanyardRotation.y}deg) rotateX(${lanyardRotation.x}deg)`,
                  transformOrigin: 'top center'
                }}
              ></div>
              
              {/* Lanyard Clip */}
              <div 
                className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-gray-500 to-gray-700 rounded-sm transition-all duration-300 ease-out shadow-lg"
                style={{
                  transform: `translateX(-50%) rotateY(${lanyardRotation.y}deg) rotateX(${lanyardRotation.x}deg)`,
                  transformOrigin: 'top center'
                }}
              >
                <div className="absolute inset-1 bg-gray-600 rounded-sm"></div>
              </div>

              {/* ID Card Container */}
              <div 
                className="relative mt-24 transition-all duration-300 ease-out hover:shadow-2xl"
                style={{
                  transform: `rotateY(${lanyardRotation.y}deg) rotateX(${lanyardRotation.x}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* ID Card */}
                <div className="w-80 h-96 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300">
                  {/* Card Header */}
                  <div className="h-24 bg-gradient-to-r from-red-500 via-red-600 to-red-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4 right-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-bold text-lg">DEVELOPER</h3>
                          <p className="text-red-100 text-sm">ID CARD</p>
                        </div>
                        <div className="w-8 h-8">
                          <img 
                            src="yath.png" 
                            alt="Logo" 
                            className="w-full h-full object-contain filter brightness-0 invert"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 border-4 border-white/20 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Profile Photo */}
                  <div className="flex justify-center -mt-12 relative z-10">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-800">
                      <img 
                        src="pp.png" 
                        alt="Profile" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-6 py-4 text-center space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">Naufal Hidayatul Aulia</h2>
                      <p className="text-red-400 font-medium">Frontend Developer</p>
                    </div>

                    {/* Skills/Technologies */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-800/50 px-3 py-1 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300">
                          React.js
                        </div>
                        <div className="bg-gray-800/50 px-3 py-1 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300">
                          JavaScript
                        </div>
                        <div className="bg-gray-800/50 px-3 py-1 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300">
                          Tailwind
                        </div>
                        <div className="bg-gray-800/50 px-3 py-1 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300">
                          UI/UX
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-gray-700">
                      <p>📧 nhidayatulaulia@gmail.com</p>
                      <p>📍 Pekanbaru, Indonesia</p>
                      <p>🎓 UIN Suska Riau</p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
                </div>

                {/* Floating particles around the card */}
                <div className="absolute -top-4 -left-4 w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div className="absolute -top-2 -right-6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-6 w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              </div>

              {/* Mouse follow effect */}
              <div 
                className="absolute pointer-events-none z-20 w-4 h-4 bg-red-500/30 rounded-full blur-sm transition-all duration-100"
                style={{
                  left: mousePosition.x - 8,
                  top: mousePosition.y - 8,
                  opacity: lanyardRotation.x !== 0 || lanyardRotation.y !== 0 ? 1 : 0
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              About <span className="text-red-500 font-medium">Me</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Yuk, kenalan lebih banyak tentang perjalanan, keterampilan, dan hobi saya!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">My Journey</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                 Saat ini saya sedang menempuh pendidikan pada jurusan Teknik Informatika di UIN Sultan Syarif Kasim Riau.
Kecintaan saya terhadap teknologi dan desain mendorong saya untuk berspesialisasi dalam pengembangan front-end,
di mana saya menciptakan pengalaman web yang menarik dan ramah pengguna.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
Tujuan saya adalah menjembatani antara desain dan fungsionalitas, menciptakan aplikasi
yang tidak hanya indah tetapi juga sangat fungsional dan mudah diakses.
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-white">Skills</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { skill: 'React.js', level: '90%' },
                    { skill: 'JavaScript', level: '85%' },
                    { skill: 'HTML/CSS', level: '95%' },
                    { skill: 'Tailwind CSS', level: '90%' },
                    { skill: 'Node.js', level: '75%' },
                    { skill: 'UI/UX Design', level: '80%' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{item.skill}</span>
                        <span className="text-red-400 text-sm">{item.level}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: item.level }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Personal Info */}
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-red-500/30 transition-all duration-300">
                <h4 className="text-2xl font-bold text-white mb-6">Personal Info</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Nama Lengkap', value: 'Naufal Hidayatul Aulia' },
                    { label: 'Usia', value: '21 Years Old' },
                    { label: 'Lokasi', value: 'Pekanbaru, Indonesia' },
                    { label: 'Universitas', value: 'UIN Sultan Syarif Kasim Riau' },
                    { label: 'Jurusan', value: 'Informatics Engineering' },
                    { label: 'Email', value: 'nhidayatulaulia@gmail.com' },
                    { label: 'Bahasa', value: 'Indonesian, English' },
                    { label: 'Keahlian', value: 'Web Dev, UI/UX' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700/50 last:border-b-0">
                      <span className="text-gray-400 font-medium">{item.label}:</span>
                      <span className="text-white text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl p-8 border border-red-500/20">
                <h4 className="text-2xl font-bold text-white mb-6">Fun Facts</h4>
                <div className="space-y-3">
                  {[
                    '😻 Saya merupakan seorang cat lovers!',
                    '🎮 Kalau bosan, saya lebih suka bermain game',
                    '💡 Selalu penasaran sama hal baru',
                    '🎵 Musik? Selalu menemani saya ngoding',
                    '🌙 Malam hari biasanya inspirasi bermunculan'
                  ].map((fact, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                <span className="text-white">Naufal</span>
              </div>
              <p className="text-gray-400">
                User Interface Designer passionate about creating beautiful and functional digital experiences.
              </p>
            </div>

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