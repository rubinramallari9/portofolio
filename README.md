# Teen Developer Portfolio

A modern, full-stack portfolio website built with Next.js (frontend) and Django (backend).

## Features

- Responsive design with Tailwind CSS
- Hero section with call-to-action buttons
- About section
- Projects showcase
- Skills display
- Contact form with Django backend integration
- Smooth scrolling navigation

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Django 5.2
- Django REST Framework
- django-cors-headers
- SQLite database

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.x
- pip

### Running the Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### Running the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run migrations (if not already done):
```bash
python3 manage.py migrate
```

3. Start the Django server:
```bash
python3 manage.py runserver
```

The backend API will be available at [http://localhost:8000](http://localhost:8000)

## Customization

### Update Your Information

1. **Hero Section** (`frontend/components/Hero.tsx`):
   - Change "Your Name" to your actual name
   - Update the description

2. **About Section** (`frontend/components/About.tsx`):
   - Write your own bio

3. **Projects** (`frontend/components/Projects.tsx`):
   - Replace the placeholder projects with your actual projects
   - Add GitHub links and live demo links

4. **Skills** (`frontend/components/Skills.tsx`):
   - Update the skills to match your expertise

5. **Footer** (`frontend/components/Footer.tsx`):
   - Add your social media links (GitHub, LinkedIn, Twitter)

## Project Structure

```
portfolio/
├── frontend/               # Next.js frontend
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   └── public/            # Static assets
└── backend/               # Django backend
    ├── backend/           # Django project settings
    ├── contact/           # Contact app
    └── portfolio/         # Portfolio app
```

## API Endpoints

- `POST /api/contact/` - Submit contact form

## Development Tips

- Both servers need to be running for the contact form to work
- The frontend runs on port 3000
- The backend runs on port 8000
- CORS is configured to allow requests from localhost:3000

## Next Steps

1. Customize all placeholder content with your information
2. Add your actual projects
3. Replace social media links with your profiles
4. Consider adding more features like a blog or testimonials
5. Deploy to production (Vercel for frontend, Railway/Heroku for backend)

## License

MIT
