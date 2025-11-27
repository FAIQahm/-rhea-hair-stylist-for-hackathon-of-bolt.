'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import BottomNav from '@/components/BottomNav';
import OutfitCarousel from '@/components/OutfitCarousel';
import OutfitSkeleton from '@/components/OutfitSkeleton';
import ShoppableCarousel from '@/components/ShoppableCarousel';
import { Upload, Sparkles, User, TrendingUp, Award } from 'lucide-react';

export default function FitsPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<any>(null);
  const [shoppableItems, setShoppableItems] = useState<any[]>([]);
  const [outfits, setOutfits] = useState([
    {
      id: '1',
      imageUrl: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Casual Chic',
      category: 'Everyday',
      items: [
        { name: 'White Tee', price: 29.99, link: '#' },
        { name: 'Blue Jeans', price: 79.99, link: '#' },
        { name: 'Sneakers', price: 89.99, link: '#' },
      ],
    },
    {
      id: '2',
      imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Business Pro',
      category: 'Professional',
      items: [
        { name: 'Navy Blazer', price: 189.99, link: '#' },
        { name: 'White Shirt', price: 59.99, link: '#' },
        { name: 'Black Trousers', price: 99.99, link: '#' },
      ],
    },
    {
      id: '3',
      imageUrl: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Evening Elegance',
      category: 'Night Out',
      items: [
        { name: 'Black Dress', price: 149.99, link: '#' },
        { name: 'Heels', price: 119.99, link: '#' },
        { name: 'Clutch', price: 79.99, link: '#' },
      ],
    },
  ]);

  const handleUploadSelfie = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasProfile(true);
      fetchShoppableItems();
    }, 2000);
  };

  const fetchShoppableItems = async () => {
    try {
      const mockItems = [
        {
          title: 'Classic White Cotton T-Shirt',
          price: 29.99,
          link: 'https://example.com/white-tee',
          category: 'Tops',
          brand: 'Essential Basics',
          imageUrl: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Premium Slim Fit Blue Jeans',
          price: 79.99,
          link: 'https://example.com/blue-jeans',
          category: 'Bottoms',
          brand: 'Denim Co.',
          imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Minimalist White Sneakers',
          price: 89.99,
          link: 'https://example.com/sneakers',
          category: 'Footwear',
          brand: 'Urban Kicks',
          imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Leather Crossbody Bag',
          price: 119.99,
          link: 'https://example.com/bag',
          category: 'Accessories',
          brand: 'Style & Co',
          imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ];
      setShoppableItems(mockItems);
    } catch (error) {
      console.error('Error fetching shoppable items:', error);
    }
  };

  const handleShopNow = (outfit: any) => {
    setSelectedOutfit(outfit);
    const items = outfit.items.map((item: any, index: number) => ({
      title: item.name,
      price: item.price,
      link: item.link,
      category: index === 0 ? 'Tops' : index === 1 ? 'Bottoms' : 'Footwear',
    }));
    setShoppableItems(items);
  };

  const renderHomeTab = () => (
    <div className="space-y-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6 pt-12"
      >
        <h1 className="text-5xl font-normal text-gray-800 mb-6">
          <span className="text-[#4285f4]">R</span>
          <span className="text-[#ea4335]">h</span>
          <span className="text-[#fbbc04]">e</span>
          <span className="text-[#4285f4]">a</span>
          <span className="text-gray-800 ml-2">Stylist</span>
        </h1>
        <p className="text-gray-600 text-base">
          Upload a selfie to get personalized outfit recommendations
        </p>
      </motion.div>

      {!hasProfile ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-6"
        >
          <Card className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-normal text-gray-900 mb-2">
                Get Started
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Upload your selfie and let AI create perfect outfits for you
              </p>
              <Button
                onClick={handleUploadSelfie}
                disabled={loading}
                className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium shadow-sm h-10 px-6 rounded-md"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Selfie
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-6"
        >
          <div className="mb-6 flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-gray-200">
              <AvatarFallback className="bg-[#1a73e8] text-white text-lg">
                <User className="h-7 w-7" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-normal text-gray-900">Welcome back!</h2>
              <p className="text-sm text-gray-600">Here are your latest outfits</p>
            </div>
          </div>

          {loading ? <OutfitSkeleton /> : <OutfitCarousel outfits={outfits} onShopNow={handleShopNow} />}

          {shoppableItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <ShoppableCarousel items={shoppableItems} />
            </motion.div>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="px-6"
      >
        <h3 className="text-lg font-normal text-gray-900 mb-4">
          How it works
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              icon: Upload,
              title: 'Upload Your Selfie',
              description: 'Take or upload a clear photo of yourself',
            },
            {
              icon: Sparkles,
              title: 'AI Analysis',
              description: 'Our AI analyzes your features and style',
            },
            {
              icon: TrendingUp,
              title: 'Get Recommendations',
              description: 'Receive personalized outfit suggestions',
            },
          ].map((step, index) => (
            <Card key={index} className="border border-gray-300 shadow-sm rounded-lg hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <step.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1 text-sm">{step.title}</h4>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderOutfitsTab = () => (
    <div className="px-6 pt-8 pb-24 space-y-8">
      <h2 className="text-2xl font-normal text-gray-900 mb-6">Your Outfits</h2>
      {loading ? <OutfitSkeleton /> : <OutfitCarousel outfits={outfits} onShopNow={handleShopNow} />}

      {shoppableItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppableCarousel items={shoppableItems} />
        </motion.div>
      )}
    </div>
  );

  const renderClosetTab = () => (
    <div className="px-6 pt-8 pb-24">
      <h2 className="text-2xl font-normal text-gray-900 mb-6">My Closet</h2>
      <Card className="border border-gray-300 rounded-lg shadow-sm">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-normal text-gray-900 mb-2">
            Build Your Digital Closet
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Upload photos of your clothes to get better recommendations
          </p>
          <Button
            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium rounded-md"
            size="default"
          >
            Add Items
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfileTab = () => (
    <div className="px-6 pt-8 pb-24">
      <div className="text-center mb-8">
        <Avatar className="h-20 w-20 mx-auto mb-4 border-2 border-gray-200">
          <AvatarFallback className="bg-[#1a73e8] text-white text-xl">
            <User className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-normal text-gray-900">Your Profile</h2>
        <p className="text-sm text-gray-600">Manage your style preferences</p>
      </div>

      <div className="space-y-3">
        <Card className="border border-gray-300 shadow-sm rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900 text-sm">Style Stats</h3>
              <Award className="h-5 w-5 text-gray-600" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-normal text-[#1a73e8]">12</p>
                <p className="text-xs text-gray-600">Outfits</p>
              </div>
              <div>
                <p className="text-2xl font-normal text-[#1a73e8]">48</p>
                <p className="text-xs text-gray-600">Items</p>
              </div>
              <div>
                <p className="text-2xl font-normal text-[#1a73e8]">5</p>
                <p className="text-xs text-gray-600">Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-300 shadow-sm rounded-lg">
          <CardContent className="p-6">
            <h3 className="font-medium text-gray-900 mb-4 text-sm">Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {['Casual', 'Business', 'Formal', 'Athletic'].map((style) => (
                <Badge
                  key={style}
                  variant="secondary"
                  className="py-1.5 px-3 rounded-full bg-gray-100 text-gray-700 text-xs font-normal hover:bg-gray-200"
                >
                  {style}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeTab();
      case 'outfits':
        return renderOutfitsTab();
      case 'closet':
        return renderClosetTab();
      case 'profile':
        return renderProfileTab();
      default:
        return renderHomeTab();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-lg mx-auto"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
