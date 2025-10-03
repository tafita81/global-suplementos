import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import corporateHqImage from "@/assets/corporate-headquarters-4k.jpg";
import beautySupplementsImage from "@/assets/beauty-supplements-4k.jpg";
import quantumProcessingImage from "@/assets/quantum-processing-4k.jpg";
import medicalGradeImage from "@/assets/medical-grade-4k.jpg";
import smartGadgetsImage from "@/assets/smart-health-gadgets-4k.jpg";
import traditionalWellnessImage from "@/assets/traditional-wellness-4k.jpg";

const videoSources = [
  {
    categoryKey: "beautyEnhancement",
    video: "/videos/beauty-supplements-4k.mp4",
    poster: beautySupplementsImage,
    icon: "✨",
    descriptionKey: "beautyEnhancement"
  },
  {
    categoryKey: "quantumProcessing",
    video: "/videos/quantum-processing-4k.mp4", 
    poster: quantumProcessingImage,
    icon: "🔬",
    descriptionKey: "quantumProcessing"
  },
  {
    categoryKey: "medicalGrade",
    video: "/videos/medical-grade-4k.mp4",
    poster: medicalGradeImage,
    icon: "🛡️",
    descriptionKey: "medicalGrade"
  },
  {
    categoryKey: "smartHealthGadgets",
    video: "/videos/smart-gadgets-4k.mp4",
    poster: smartGadgetsImage,
    icon: "📱",
    descriptionKey: "smartHealthGadgets"
  },
  {
    categoryKey: "traditionalWellness",
    video: "/videos/traditional-wellness-4k.mp4",
    poster: traditionalWellnessImage,
    icon: "💚",
    descriptionKey: "traditionalWellness"
  }
];

export function PremiumVideoHeroPublic() {
  const { t } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = videoSources[currentVideoIndex];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoSources.length);
  };

  const selectVideo = (index: number) => {
    setCurrentVideoIndex(index);
    // Auto-play when user selects a category
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    let timer: NodeJS.Timeout;
    if (showControls) {
      timer = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showControls]);

  useEffect(() => {
    // Auto-advance video when playing - faster rotation
    if (isPlaying) {
      const interval = setInterval(() => {
        nextVideo();
      }, 4000); // Change every 4 seconds when playing
      
      return () => clearInterval(interval);
    } else {
      // Slower rotation when paused
      const interval = setInterval(() => {
        nextVideo();
      }, 8000); // Change every 8 seconds when paused
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div 
        className="absolute inset-0 premium-video-container"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Fallback Background Image with smooth transition */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${currentVideo.poster})` }}
        />
        
        {/* Additional overlay for smooth transitions */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/40" />
        
        {/* Video Element */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          loop
          muted={isMuted}
          playsInline
          poster={currentVideo.poster}
          key={currentVideo.video}
        >
          <source src={currentVideo.video} type="video/mp4" />
          <source src={currentVideo.video.replace('.mp4', '.webm')} type="video/webm" />
        </video>

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
        {/* Video Controls */}
        <div className={`absolute bottom-6 right-6 flex gap-2 transition-all duration-300 ${
          showControls ? 'opacity-100 transform-none' : 'opacity-0 translate-y-2'
        }`}>
          <Button
            variant="outline"
            size="icon"
            className="premium-glass hover:bg-white/20"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="premium-glass hover:bg-white/20"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="premium-glass hover:bg-white/20"
            onClick={toggleFullscreen}
          >
            <Maximize className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="premium-glass hover:bg-white/20"
            onClick={nextVideo}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Selector with progress indicators */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2">
          {videoSources.map((video, index) => (
            <button
              key={index}
              onClick={() => selectVideo(index)}
              className={`px-4 py-2 rounded-lg premium-glass text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden ${
                index === currentVideoIndex ? 'bg-white/30 border-white/50' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {/* Progress bar for active video */}
              {index === currentVideoIndex && (
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary animate-pulse" 
                     style={{
                       width: '100%',
                       animation: isPlaying ? 'progress 4s linear infinite' : 'progress 8s linear infinite'
                     }} />
              )}
              <span className="text-lg">{video.icon}</span>
              <span>{t(`hero.videoCategories.${video.categoryKey}`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Button - Top Left with auto-play indicator */}
      <div className="absolute top-6 left-6 z-20">
        <Badge className="text-lg px-6 py-3 gold-accent text-primary font-bold clean-fade-in relative">
          <span className="text-xl mr-2">{currentVideo.icon}</span>
          {t(`hero.videoCategories.${currentVideo.categoryKey}`)} Solutions
          {isPlaying && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
            </div>
          )}
        </Badge>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-start justify-center pt-28 min-h-[115vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Brand Name - Centered */}
            <h1 className="text-6xl md:text-8xl font-bold mb-12 text-white clean-fade-in">
              <span className="block">{t('site.title').split(' ')[0]}</span>
              <span className="block subtle-gold">
                {t('site.title').split(' ')[1]}
              </span>
            </h1>
            
            {/* Centered Text Content */}
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed clean-fade-in">
              {t(`hero.videoCategories.descriptions.${currentVideo.descriptionKey}`)}
            </p>
            
            <p className="text-lg text-white/80 mb-16 leading-relaxed clean-fade-in max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex justify-center mb-22 clean-fade-in">
              <a 
                href="mailto:contact@globalsupplements.site"
                className="inline-block"
              >
                <Button 
                  size="lg" 
                  className="text-xl px-10 py-6 gold-accent hover:opacity-90 text-primary font-bold"
                >
                  🚀 {t('navigation.partnerWithUs')}
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 clean-fade-in">
              <div className="text-center">
                <div className="text-4xl font-bold subtle-gold mb-2">52</div>
                <div className="text-white/80 text-sm uppercase tracking-wide">{t('hero.stats.countries')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold subtle-gold mb-2">$2.8B</div>
                <div className="text-white/80 text-sm uppercase tracking-wide">{t('hero.stats.annualVolume')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold subtle-gold mb-2">10K+</div>
                <div className="text-white/80 text-sm uppercase tracking-wide">{t('hero.stats.globalSuppliers')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold subtle-gold mb-2">2,400+</div>
                <div className="text-white/80 text-sm uppercase tracking-wide">{t('hero.stats.enterpriseClients')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/60">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mb-2">
            <div className="w-1 h-3 bg-white/60 rounded-full mx-auto mt-2 premium-float" />
          </div>
          <span className="text-xs uppercase tracking-wide">{t('hero.scroll')}</span>
          {isPlaying && (
            <div className="mt-2 text-xs text-green-400 animate-pulse">
              🔄 Auto-changing images
            </div>
          )}
        </div>
      </div>
    </div>
  );
}