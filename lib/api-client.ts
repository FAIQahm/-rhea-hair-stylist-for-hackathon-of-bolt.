import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const getAuthToken = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Auth session error:', error);
    throw new Error('Failed to get authentication session');
  }

  if (!session?.access_token) {
    console.error('No access token found. Session:', session);
    throw new Error('Not authenticated. Please refresh the page.');
  }

  return session.access_token;
};

export const apiClient = {
  analyzeFace: async (file: File) => {
    const token = await getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/analyze-face`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Analysis failed');
    }

    return response.json();
  },

  generateLook: async (file: File, hairstyle: string, outfitDescription?: string) => {
    const token = await getAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('hairstyle', hairstyle);
    if (outfitDescription) {
      formData.append('outfit_description', outfitDescription);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-look`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Image generation failed');
    }

    return response.json();
  },

  getShoppableLinks: async (imageUrl?: string, imageBase64?: string) => {
    const token = await getAuthToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/shoppable-links`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_url: imageUrl, image_base64: imageBase64 }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Shoppable analysis failed');
    }

    return response.json();
  },

  uploadWardrobeItem: async (
    file: File,
    itemCategory?: string,
    itemName?: string,
    itemDescription?: string
  ) => {
    const token = await getAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    if (itemCategory) formData.append('item_category', itemCategory);
    if (itemName) formData.append('item_name', itemName);
    if (itemDescription) formData.append('item_description', itemDescription);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/wardrobe/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    return response.json();
  },

  getWardrobeItems: async (category?: string) => {
    const token = await getAuthToken();
    const url = new URL(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/wardrobe/items`);
    if (category) {
      url.searchParams.append('category', category);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch wardrobe items');
    }

    return response.json();
  },

  getUserCredits: async () => {
    const token = await getAuthToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/wardrobe/credits`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch credits');
    }

    return response.json();
  },
};
