import React, { useState, useEffect, useRef } from 'react';
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
  ExternalLink,
  Github,
  Eye,
  Code2,
  Star,
  Calendar,
  Award,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Project() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [certificatesVisible, setCertificatesVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const certificatesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Certificates scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCertificatesVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (certificatesRef.current) {
      observer.observe(certificatesRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  // Project data
  const projects = [
    {
      id: 1,
      title: "SaQu - Sahabat Quran",
      description: "Website interaktif untuk belajar Al-Qur'an dengan fitur 30 juz Al-Qur'an, Asmaul Husna, dan masih banyak lagi.",
      image: "g1.png",
      technologies: ["React.js", "Node.js", "Tailwind CSS"],
      githubUrl: "https://github.com/Naufalha05/APIQuran.git",
      liveUrl: "https://saqu.netlify.app",
      category: "Website",
      date: "2025",
      status: "Completed",
      features: ["30 Juz Al-Qur'an", "Asmaul Husna", "Terjemahan", "Glossarium"]
    },
    {
      id: 2,
      title: "FreshFood",
      description: "Website e-commerce untuk produk makanan segar dengan desain modern dan responsif serta dapat dengan mudah digunakan oleh khalayak ramai",
      image: "g2.png",
      technologies: ["React.js", "Node.js", "Tailwind CSS", "PostgreSQL"],
      category: "Website",
      date: "2025",
      status: "On Progress",
      features: ["Kategori Makanan", "Produk Makanan", "Pesanan", "Pembayaran"],
    },
    {
      id: 3,
      title: "TIFPoint",
      description: "Website perhitungan poin kompetensi untuk mahasiswa Teknik Informatika Universitas Islam Negeri Sultan Syarif Kasim Riau.",
      image: "g3.png",
      technologies: ["React.js", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
      githubUrl: "https://github.com/Naufalha05/tifpoint.git",
      liveUrl: "https://tif-point.netlify.app/",
      category: "Website",
      date: "2025",
      status: "Completed",
      features: ["Ajukan Poin", "Riwayat Pengajuan", "Info Kursus", "Info Kompetensi"]
    }
  ];

  // Certificates data
  const certificates = [
    {
      id: 1,
      title: "Introduction to Java",
      issuer: "Sololearn",
      date: "2023",
      image: "s3.jpg",
      credential: "CC-STPBMNCV"
    },
    {
      id: 2,
      title: "Database Foundations",
      issuer: "Oracle",
      date: "2024",
      image: "s1.jpg",
      credential: "-"
    },
    {
      id: 3,
      title: "Database Programming with SQL",
      issuer: "Oracle",
      date: "2024",
      image: "s2.jpg",
      credential: "-"
    },
    {
      id: 4,
      title: "Sertifikat Kepengurusan HIMATIF",
      issuer: "HIMATIF UIN Suska Riau",
      date: "2024",
      image: "s4.jpg",
      credential: "-"
    },
    {
      id: 5,
      title: "Sertifikat Panitia ASOMATIF",
      issuer: "ASOMATIF UIN Suska Riau",
      date: "2024",
      image: "s5.jpg",
      credential: "-"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-4 border-cyan-400 rounded-full opacity-30"></div>
      <div className="absolute top-40 right-40 w-4 h-4 bg-cyan-400 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-red-500 rounded-full"></div>
      
      {/* Floating cursor effect */}
      <div 
        className="fixed pointer-events-none z-50 w-6 h-6 bg-red-500/20 rounded-full blur-sm transition-all duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      ></div>

      {/* Navbar - Same as AboutMe.jsx */}
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
                  item.path === '/project' ? 'text-red-500 font-medium' : 'text-gray-300 hover:text-white'
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
                        item.path === '/project' ? 'text-red-500' : 'text-gray-400 hover:text-white'
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
                  } ${item.path === '/project' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
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

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 mb-6">
            <Sparkles size={16} className="text-red-400" />
            <span className="text-red-400 text-sm font-medium">Featured Projects</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            My <span className="text-red-500 font-medium">Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Koleksi karya terbaik yang mencerminkan passion dan keahlian saya dalam pengembangan web modern
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-500 hover:transform hover:scale-105"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-green-500/30">
                  <span className="text-green-400 text-xs font-medium">{project.status}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-red-500/30">
                  <span className="text-red-400 text-xs font-medium">{project.category}</span>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center space-x-4 transition-all duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <Github size={20} className="text-white" />
                  </a>
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-500 hover:bg-red-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <Eye size={20} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Calendar size={14} />
                    <span className="text-sm">{project.date}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-gray-800/50 text-gray-300 px-2 py-1 rounded-md text-xs hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white flex items-center space-x-2">
                    <Star size={14} className="text-yellow-400" />
                    <span>Key Features</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-800">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
                  >
                    <Code2 size={16} />
                    <span>Code</span>
                  </a>
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates Section */}
      <div 
        ref={certificatesRef}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 px-4 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20 mb-6">
              <Award size={16} className="text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">Achievements</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
              My <span className="text-yellow-500 font-medium">Certificates</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Sertifikat dan pencapaian yang membuktikan dedikasi saya dalam terus belajar dan berkembang
            </p>
          </div>

          {/* Certificates Container */}
          <div className="relative h-96 flex items-center justify-center">
            {certificates.map((certificate, index) => {
              const angle = certificatesVisible ? (360 / certificates.length) * index : 0;
              const radius = certificatesVisible ? 200 : 0;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={certificate.id}
                  className="absolute transition-all duration-1000 ease-out hover:scale-110 hover:z-10 cursor-pointer group"
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${certificatesVisible ? angle + 90 : 0}deg)`,
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  <div className="w-48 h-36 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-2xl overflow-hidden border-4 border-yellow-400 relative group-hover:border-yellow-300 transition-all duration-300">
                    {/* Certificate Image */}
                    <img 
                      src={certificate.image} 
                      alt={certificate.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Certificate Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <h4 className="text-xs font-bold truncate">{certificate.title}</h4>
                        <p className="text-xs text-gray-300 truncate">{certificate.issuer}</p>
                        <p className="text-xs text-yellow-400">{certificate.date}</p>
                      </div>
                    </div>

                    {/* Gold Seal */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <Award size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Certificate Details Tooltip */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-yellow-500/30 min-w-max">
                    <h4 className="text-white text-sm font-bold">{certificate.title}</h4>
                    <p className="text-gray-300 text-xs">{certificate.issuer} • {certificate.date}</p>
                    <p className="text-yellow-400 text-xs">ID: {certificate.credential}</p>
                  </div>
                </div>
              );
            })}

            {/* Center Animation */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
              certificatesVisible ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl">
                  <Award size={32} className="text-white" />
                </div>
                <p className="text-gray-400 text-lg">Certificates Loading...</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 size={24} className="text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{projects.length}+</h3>
              <p className="text-gray-400">Completed Projects</p>
            </div>
            <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{certificates.length}+</h3>
              <p className="text-gray-400">Certificates Earned</p>
            </div>
            <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">2+</h3>
              <p className="text-gray-400">Years Experience</p>
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
                Frontend Developer passionate about creating beautiful and functional digital experiences.
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