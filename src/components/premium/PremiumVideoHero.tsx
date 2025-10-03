import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useTranslation } from "react-i18next";
import corporateHqImage from "@/assets/corporate-headquarters-4k.jpg";

export function PremiumVideoHero() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    // Auto-hide controls after 3 seconds
    let timer: NodeJS.Timeout;
    if (showControls) {
      timer = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showControls]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div 
        className="absolute inset-0 premium-video-container"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Fallback Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${corporateHqImage})` }}
        />
        
        {/* Video Element - Using placeholder for demonstration */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          poster={corporateHqImage}
        >
          {/* Video sources would go here - using placeholder for now */}
          <source src="/videos/corporate-intro-4k.mp4" type="video/mp4" />
          <source src="/videos/corporate-intro-4k.webm" type="video/webm" />
        </video>

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        
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
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <Badge className="mb-6 text-lg px-6 py-3 gold-accent text-primary font-bold clean-fade-in">
              🌟 {t("hero.premiumSupplements", "Premium Supplements")}
            </Badge>
            
            <h1 className="text-7xl md:text-9xl font-bold mb-8 text-white clean-fade-in">
              <span className="block">Global</span>
              <span className="block subtle-gold">
                Supplements
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 mb-12 leading-relaxed clean-fade-in">
              {t("hero.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 clean-fade-in">
              <Button 
                size="lg" 
                className="text-xl px-10 py-6 gold-accent hover:opacity-90 text-primary font-bold"
              >
                🚀 {t("navigation.partnerWithUs")}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-xl px-10 py-6 minimal-glass text-white border-white/30 hover:bg-white/10"
              >
                📊 {t("hero.executiveDashboard", "Executive Dashboard")}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 clean-fade-in">
              <div className="text-center">
                <div className="text-4xl font-bold subtle-gold mb-2">50+</div>
                <div className="text-white/80 text-sm uppercase tracking-wide">{t("hero.stats.countries", "Countries")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold subtle-gold mb-2">$100M+</div>
                <div className="text-white/80 text-sm uppercase tracking-wide">{t("hero.stats.annualRevenue", "Annual Revenue")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold subtle-gold mb-2">10K+</div>
                <div className="text-white/80 text-sm uppercase tracking-wide">{t("hero.stats.suppliers", "Suppliers")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold subtle-gold mb-2">500+</div>
                <div className="text-white/80 text-sm uppercase tracking-wide">{t("hero.stats.contracts", "Contracts")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/60">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mb-2">
            <div className="w-1 h-3 bg-white/60 rounded-full mx-auto mt-2 premium-float" />
          </div>
          <span className="text-xs uppercase tracking-wide">{t("hero.scroll", "Scroll")}</span>
        </div>
      </div>
    </div>
  );
}