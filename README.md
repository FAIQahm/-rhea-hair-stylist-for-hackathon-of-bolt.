# Rhea Conversational Stylist

AI-powered conversational stylist with face shape analysis, wardrobe management, outfit generation, and shoppable affiliate links.

## Features

- **Face Shape Analysis**: Upload a selfie to receive personalized hairstyle recommendations
- **Style Consultation**: Get AI-powered fashion advice through conversational interface
- **Pro Outfit Generator**: Generate photorealistic outfit visualizations
- **Digital Wardrobe**: Upload and manage your clothing items
- **Shoppable Links**: Browse and purchase recommended items with affiliate integration

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+ and pip
- **Supabase Account** (for database)
- **Google AI Studio API Key** (for Gemini AI)

### Option 1: Automated Setup (Recommended)

**Linux/Mac:**
```bash
./start-dev.sh
```

**Windows:**
```bash
start-dev.bat
```

This will automatically:
- Install all dependencies
- Start the backend server on port 8000
- Start the frontend server on port 3000

### Option 2: Manual Setup

#### 1. Install Frontend Dependencies

```bash
npm install
```

#### 2. Configure Frontend Environment

The `.env` file is already configured with the Supabase connection:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=https://mdehlicsskutexfdeiqz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 3. Setup Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 4. Configure Backend Environment

Edit `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://mdehlicsskutexfdeiqz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Get your API keys:**
- **Gemini API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Supabase Service Role Key**: From your Supabase Dashboard > Settings > API

#### 5. Run Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python -m uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Database

The application uses Supabase for data persistence:

- **User Sessions**: Track user interactions and credits
- **Wardrobe Items**: Store uploaded clothing items
- **Style Profiles**: Save user preferences and analysis results

Database migrations are located in `supabase/migrations/`.

## Project Structure

```
rhea-stylist/
├── app/                    # Next.js pages
│   ├── page.tsx           # Main landing page (Google-style)
│   └── fits/              # Mobile outfit viewer
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── StylistUpload.tsx # Face analysis upload
│   ├── LookGenerator.tsx # Pro outfit generator
│   └── ShoppableCarousel.tsx # Product recommendations
├── backend/              # Python FastAPI backend
│   ├── main.py          # API endpoints
│   ├── services/        # Business logic
│   ├── middleware/      # Auth middleware
│   └── utils/           # Helper functions
├── supabase/            # Database migrations
└── start-dev.sh         # Development startup script
```

## Technologies

**Frontend:**
- Next.js 13 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Framer Motion

**Backend:**
- FastAPI (Python)
- Google Gemini AI
- Supabase (PostgreSQL)
- Pillow (Image Processing)

**Design:**
- Google Material Design inspired
- Minimalist aesthetic
- Responsive mobile-first layout

## API Endpoints

- `POST /api/style/analyze-face` - Face shape analysis
- `POST /api/consultation/start` - Begin style consultation
- `POST /api/pro/generate-look` - Generate outfit visualization
- `POST /api/wardrobe/upload` - Upload wardrobe item
- `GET /api/shoppable/get-links` - Get affiliate product links

See full documentation at http://localhost:8000/docs

## Troubleshooting

### "Failed to fetch" Error

This means the backend server is not running. Make sure:
1. Backend dependencies are installed
2. `backend/.env` is configured with valid API keys
3. Backend server is running on port 8000

### Port Already in Use

If port 3000 or 8000 is already in use:
```bash
# Change frontend port
npm run dev -- -p 3001

# Change backend port
uvicorn main:app --reload --port 8001
# Update NEXT_PUBLIC_BACKEND_URL in .env
```

### API Key Issues

Ensure your Gemini API key is valid and has quota available at [Google AI Studio](https://makersuite.google.com/app/apikey).

## Development

```bash
# Run frontend dev server
npm run dev

# Build frontend for production
npm run build

# Run backend with auto-reload
cd backend
uvicorn main:app --reload

# Type checking
npm run typecheck
```

## License

MIT

## Credits

Built with Google Gemini AI and Supabase.
