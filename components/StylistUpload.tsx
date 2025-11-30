'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Sparkles, Shirt, Camera, Wand2, ArrowRight, Download, X } from 'lucide-react';
import OutfitCarousel from '@/components/OutfitCarousel';
import ShoppableCarousel from '@/components/ShoppableCarousel';

interface AnalysisResult {
  face_shape: string;
  skin_undertone: string;
  gender?: string;
  recommended_style: string;
  confidence: number;
  styling_tips: {
    hairstyle_dos: string[];
    hairstyle_donts: string[];
    color_recommendations: string[];
  };
  example_image: string;
  expert_name?: string;
  expert_reasoning?: string;
  image_search_query?: string;
}

// --- Expert System Data Structures ---

interface StyleOption {
  id: string;
  name: string;
  tags: string[]; // e.g., 'oval', 'round', 'high_forehead', 'timeless', 'trendy'
  image: string;
  description: string;
  dos: string[];
  donts: string[];
}

const STYLES_DB: StyleOption[] = [
  {
    id: 'classic_taper',
    name: 'Classic Taper with Textured Top',
    tags: ['oval', 'square', 'timeless', 'professional', 'balanced'],
    image: '/images/haircuts/classic-taper.png',
    description: 'A timeless cut that balances professionalism with modern texture.',
    dos: ['Keep the sides tight', 'Use matte pomade'],
    donts: ['Let the top get too long', 'Use heavy gels'],
  },
  {
    id: 'undercut',
    name: 'High Volume Undercut',
    tags: ['round', 'diamond', 'trendy', 'volume', 'bold'],
    image: '/images/haircuts/undercut.png',
    description: 'A bold, high-contrast style that adds verticality to the face.',
    dos: ['Blow dry for volume', 'Use texturizing powder'],
    donts: ['Flatten the top', 'Ignore side maintenance'],
  },
  {
    id: 'textured_crop',
    name: 'Textured Crop with Soft Edges',
    tags: ['square', 'oblong', 'low_maintenance', 'texture', 'modern'],
    image: '/images/haircuts/textured-crop.png',
    description: 'A modern, low-maintenance cut perfect for highlighting strong jawlines.',
    dos: ['Use sea salt spray', 'Mess it up slightly'],
    donts: ['Over-style', 'Cut fringe too short'],
  },
  {
    id: 'side_swept',
    name: 'Side-Swept Fringe with Length',
    tags: ['heart', 'diamond', 'balance', 'flow', 'romantic'],
    image: '/images/haircuts/side-swept.png',
    description: 'A softer style that balances the forehead and adds movement.',
    dos: ['Use light cream', 'Allow natural parting'],
    donts: ['Cut layers too short', 'Use heavy wax'],
  },
];

const EXPERTS = [
  {
    id: 'vidal',
    name: 'Vidal (Master Stylist, 35y Exp)',
    bias: ['timeless', 'balanced', 'professional'],
    voice: 'I prioritize structure and longevity. This cut stands the test of time.'
  },
  {
    id: 'toni',
    name: 'Toni (Creative Director)',
    bias: ['trendy', 'texture', 'bold', 'modern'],
    voice: 'It is all about movement and edge. This look defines the moment.'
  },
  {
    id: 'ava',
    name: 'Ava (Minimalist Specialist)',
    bias: ['low_maintenance', 'flow', 'natural'],
    voice: 'Style should be effortless. This cut works with your natural texture.'
  },
];

const UNDERTONES: Record<string, {
  color_recommendations: string[];
}> = {
  'Warm': { color_recommendations: ['Honey Blonde', 'Caramel', 'Warm Brown', 'Rich Chocolate', 'Auburn'] },
  'Cool': { color_recommendations: ['Ash Blonde', 'Platinum', 'Cool Brown', 'Jet Black', 'Burgundy'] },
  'Neutral': { color_recommendations: ['Golden Brown', 'Soft Copper', 'Beige Blonde', 'Espresso', 'Moka'] },
};

const analyzeImage = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Analysis failed');
    }

    const data = await response.json();

    // Simple fallback mapping for demo purposes until we have a search API
    let fallbackImage = '';
    const lowerStyle = data.recommended_style ? data.recommended_style.toLowerCase() : 'classic taper';
    const gender = data.gender || 'Male'; // Default to Male if undefined for backward compat, but API should return it

    if (gender === 'Male') {
      fallbackImage = '/images/haircuts/classic-taper.png';
      if (lowerStyle.includes('undercut') || lowerStyle.includes('fade')) fallbackImage = '/images/haircuts/undercut.png';
      else if (lowerStyle.includes('crop') || lowerStyle.includes('texture')) fallbackImage = '/images/haircuts/textured-crop.png';
      else if (lowerStyle.includes('long') || lowerStyle.includes('swept')) fallbackImage = '/images/haircuts/side-swept.png';
    }

    return {
      ...data,
      example_image: fallbackImage,
      confidence: 0.95
    };

  } catch (error) {
    console.error("Analysis Error:", error);
    // Fallback to simulation if API fails
    return {
      face_shape: 'Oval',
      skin_undertone: 'Neutral',
      recommended_style: 'Classic Taper',
      confidence: 0.5,
      styling_tips: {
        hairstyle_dos: ['Keep it clean'],
        hairstyle_donts: ['Messy looks'],
        color_recommendations: ['Natural Brown']
      },
      example_image: '/images/haircuts/classic-taper.png',
      expert_name: 'System',
      expert_reasoning: 'API Connection Failed. Using offline backup.'
    };
  }
};

export default function StylistUpload({ initialQuery }: { initialQuery?: string }) {
  const [step, setStep] = useState<'demo' | 'upload' | 'analyzing' | 'results'>('demo');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialQuery) {
      setStep('upload');
    }
  }, [initialQuery]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
        setError('Please select a valid image file (JPEG, PNG, or WEBP)');
        return;
      }
      setFile(selectedFile);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setIsCameraOpen(true);
      setError('');
    } catch (err) {
      setError('Unable to access camera. Please ensure you have granted permission.');
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPreview(dataUrl);

        // Convert data URL to file
        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            setFile(file);
          });

        stopCamera();
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStep('analyzing');

    // Call the real API
    try {
      const analysisResult = await analyzeImage(file);
      setResult(analysisResult);
      setStep('results');
    } catch (e) {
      setError("Analysis failed. Please try again.");
      setStep('upload');
    }
  };

  const renderDemo = () => (
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">
          How <span className="text-gradient-purple">Rhea</span> Works
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Get personalized style advice in 3 simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Camera, title: '1. Upload', desc: 'Take a clear selfie' },
          { icon: Wand2, title: '2. Analyze', desc: 'AI scans your features' },
          { icon: Shirt, title: '3. Style', desc: 'Get custom outfits' },
        ].map((item, idx) => (
          <GlassCard key={idx} className="p-6 flex flex-col items-center gap-4 hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <item.icon className="h-6 w-6 text-rhea-purple" />
            </div>
            <h3 className="font-bold text-white">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </GlassCard>
        ))}
      </div>

      <AnimatedButton onClick={() => setStep('upload')} className="px-8 py-6 text-lg">
        Start Consultation <ArrowRight className="ml-2 h-5 w-5" />
      </AnimatedButton>
    </div>
  );

  const renderUpload = () => (
    <GlassCard className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Your Selfie</h2>
        {initialQuery ? (
          <p className="text-rhea-gold mb-2">Let's analyze your features for: "{initialQuery}"</p>
        ) : (
          <p className="text-gray-400">For best results, ensure good lighting and face forward</p>
        )}
      </div>

      <div className="space-y-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-rhea-purple transition-colors bg-white/[0.02]"
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-64 rounded-lg object-contain" />
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-rhea-purple" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">Click to upload</p>
                  <p className="text-sm text-gray-400">or drag and drop</p>
                </div>
              </>
            )}
          </label>
          {preview && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFile(null);
                setPreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg z-20"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        <div className="flex justify-center">
          <p className="text-gray-400 mb-2">or</p>
        </div>

        {isCameraOpen ? (
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <AnimatedButton onClick={capturePhoto} className="bg-white text-black hover:bg-gray-200">
                <Camera className="mr-2 h-5 w-5" /> Capture
              </AnimatedButton>
              <AnimatedButton onClick={stopCamera} variant="secondary" className="bg-red-500/80 hover:bg-red-500 text-white border-none">
                Cancel
              </AnimatedButton>
            </div>
          </div>
        ) : (
          <AnimatedButton onClick={startCamera} variant="secondary" className="w-full py-4">
            <Camera className="mr-2 h-5 w-5" /> Use Camera
          </AnimatedButton>
        )}

        {file && (
          <AnimatedButton onClick={handleUpload} className="w-full py-6 text-lg">
            <Sparkles className="mr-2 h-5 w-5" /> Analyze My Style
          </AnimatedButton>
        )}

        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </GlassCard>
  );

  const renderAnalyzing = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative w-24 h-24 mb-8"
      >
        <div className="absolute inset-0 rounded-full border-t-4 border-rhea-purple" />
        <div className="absolute inset-2 rounded-full border-r-4 border-rhea-gold opacity-50" />
      </motion.div>
      <h2 className="text-2xl font-bold text-white mb-2">Analyzing Features...</h2>
      <p className="text-gray-400">Identifying face shape and skin undertone</p>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-12">
      {/* Analysis Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User's Photo Card */}
        <GlassCard className="p-6 flex flex-col items-center text-center h-full">
          <h3 className="text-lg font-bold text-white mb-4">Your Photo</h3>
          <div className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden border-2 border-white/10 mb-4">
            <img
              src={preview!}
              alt="Your Upload"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/20">
              Analyzed
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-rhea-purple/20 text-rhea-purple border border-rhea-purple/30">
              {result?.face_shape}
            </span>
            <span className="px-3 py-1 rounded-full bg-rhea-gold/20 text-rhea-gold border border-rhea-gold/30">
              {result?.skin_undertone}
            </span>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-4">
          {result?.expert_name && (
            <GlassCard className="col-span-2 p-6 bg-rhea-purple/10 border-rhea-purple/30">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-rhea-gold" />
                <span className="text-rhea-gold font-bold text-sm uppercase tracking-wider">Expert Insight</span>
              </div>
              <p className="text-white font-medium mb-1">{result.expert_name}</p>
              <p className="text-gray-300 text-sm italic">{result.expert_reasoning}</p>
            </GlassCard>
          )}
          <GlassCard className="p-6 flex flex-col justify-center">
            <span className="text-gray-400 text-sm mb-1">Face Shape</span>
            <span className="text-2xl font-bold text-rhea-purple">{result?.face_shape}</span>
          </GlassCard>
          <GlassCard className="p-6 flex flex-col justify-center">
            <span className="text-gray-400 text-sm mb-1">Undertone</span>
            <span className="text-2xl font-bold text-rhea-gold">{result?.skin_undertone}</span>
          </GlassCard>
          <GlassCard className="col-span-2 p-6 flex flex-col justify-center">
            <span className="text-gray-400 text-sm mb-1">Recommended Haircut</span>
            <span className="text-2xl font-bold text-white mb-4">{result?.recommended_style}</span>

            {result?.image_search_query && (
              <AnimatedButton
                onClick={() => window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(result.image_search_query!)}`, '_blank')}
                className="w-full mb-4 py-3 bg-rhea-gold text-black hover:bg-rhea-gold/90 font-semibold border-none"
              >
                <Sparkles className="mr-2 h-4 w-4" /> See Real-World Examples
              </AnimatedButton>
            )}

            {result?.example_image && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                <img
                  src={result.example_image}
                  alt={result.recommended_style}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                  <a
                    href={result.example_image}
                    download={`rhea-haircut-${result.recommended_style.toLowerCase().replace(/\s+/g, '-')}.png`}
                    className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 pointer-events-none">
                  <span className="text-white text-sm font-medium">Style Reference</span>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <AnimatedButton variant="secondary" onClick={() => {
          setStep('upload');
          setFile(null);
          setPreview(null);
          setResult(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}>
          Analyze Another Photo
        </AnimatedButton>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 'demo' && renderDemo()}
          {step === 'upload' && renderUpload()}
          {step === 'analyzing' && renderAnalyzing()}
          {step === 'results' && renderResults()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
