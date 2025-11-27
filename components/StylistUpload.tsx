'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import { GlassCard } from '@/components/ui/glass-card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

interface AnalysisResult {
  face_shape: string;
  skin_undertone: string;
  recommended_style: string;
  confidence: number;
  styling_tips: {
    hairstyle_dos: string[];
    hairstyle_donts: string[];
    color_recommendations: string[];
  };
}

interface StylistUploadProps {
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

export default function StylistUpload({ onAnalysisComplete }: StylistUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
        setError('Please select a valid image file (JPEG, PNG, or WEBP)');
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
      setError('');
      setResult(null);
      setMessage('');

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { apiClient } = await import('@/lib/api-client');
      const data = await apiClient.analyzeFace(file);

      setMessage(data.message);
      setResult(data.data);

      if (onAnalysisComplete && data.data) {
        onAnalysisComplete(data.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <GlassCard>
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-rhea-gold" />
            Face Shape Analysis
          </h2>
          <p className="text-gray-300">
            Upload a clear selfie to receive AI-powered hairstyle recommendations
          </p>
        </div>
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-rhea-purple transition-colors bg-white/5"
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={loading}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              {preview ? (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-64 rounded-lg object-contain"
                />
              ) : (
                <>
                  <Upload className="h-12 w-12 text-rhea-purple" />
                  <p className="text-sm text-gray-200">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    JPEG, PNG, or WEBP (max 10MB)
                  </p>
                </>
              )}
            </label>
          </motion.div>

          {file && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 glass-card"
            >
              <span className="text-sm text-gray-200 truncate">{file.name}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setResult(null);
                  setMessage('');
                }}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Remove
              </motion.button>
            </motion.div>
          )}

          <AnimatedButton
            onClick={handleUpload}
            disabled={!file}
            loading={loading}
            className="w-full"
          >
            {loading ? 'Analyzing Your Features...' : (
              <>
                <Sparkles className="h-5 w-5" />
                Analyze Face Shape
              </>
            )}
          </AnimatedButton>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Alert variant="destructive" className="bg-red-500/20 border-red-500/50 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Alert className="bg-green-500/20 border-green-500/50 text-green-200">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </div>
      </GlassCard>

      {result && (
        <GlassCard>
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl font-bold text-white">Your Personalized Results</h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Confidence Score:</span>
              <span className="text-rhea-gold font-bold text-xl">
                {(result.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-6 glass-card border-2 border-rhea-purple"
              >
                <h3 className="font-semibold text-gray-300 mb-2">Face Shape</h3>
                <p className="text-3xl font-bold text-rhea-purple capitalize">
                  {result.face_shape}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 glass-card border-2 border-rhea-gold"
              >
                <h3 className="font-semibold text-gray-300 mb-2">Skin Undertone</h3>
                <p className="text-3xl font-bold text-rhea-gold capitalize">
                  {result.skin_undertone}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 glass-card"
            >
              <h3 className="font-semibold text-gray-300 mb-2">Recommended Style</h3>
              <p className="text-xl text-white font-medium">{result.recommended_style}</p>
            </motion.div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-3">Styling Do&apos;s</h3>
                <ul className="space-y-2">
                  {result.styling_tips.hairstyle_dos.map((tip, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <span className="text-green-400 mt-1">✓</span>
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Styling Don&apos;ts</h3>
                <ul className="space-y-2">
                  {result.styling_tips.hairstyle_donts.map((tip, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <span className="text-red-400 mt-1">✗</span>
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Color Recommendations</h3>
                <div className="flex flex-wrap gap-2">
                  {result.styling_tips.color_recommendations.map((color, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 glass-card text-white rounded-full text-sm font-medium"
                    >
                      {color}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
