# Backend-Frontend Integration Guide

This document explains how the Django backend is connected to the Next.js frontend in this portfolio project.

## Overview

The integration allows the Next.js frontend to communicate with the Django backend through RESTful API endpoints. The main integration point is the contact form, which sends data from the frontend to be stored in the Django database.

## Architecture

```
┌─────────────────────┐         HTTP POST          ┌─────────────────────┐
│   Next.js Frontend  │ ─────────────────────────> │   Django Backend    │
│   (Port 3000)       │    JSON Data               │   (Port 8000)       │
│                     │ <───────────────────────── │                     │
│  Contact Component  │    JSON Response           │  Contact API View   │
└─────────────────────┘                            └─────────────────────┘
                                                             │
                                                             ▼
                                                    ┌─────────────────┐
                                                    │  SQLite Database│
                                                    │  Contact Model  │
                                                    └─────────────────┘
```

## Backend Setup (Django)

### 1. Contact Model (`backend/contact/models.py`)

The model defines the data structure for storing contact form submissions:

```python
from django.db import models
from django.core.validators import EmailValidator

class Contact(models.Model):
    email = models.EmailField(
        max_length=254,
        validators=[EmailValidator(message="Please provide a valid email address")]
    )
    name = models.CharField(max_length=100)
    message = models.TextField(max_length=100)
```

**Fields:**
- `email`: Stores visitor's email with validation
- `name`: Stores visitor's name (max 100 characters)
- `message`: Stores the contact message (max 100 characters)

### 2. Serializer (`backend/contact/serializers.py`)

Converts Django model instances to JSON and validates incoming data:

```python
from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'message']
        read_only_fields = ['id']
```

**Purpose:**
- Converts Contact model to JSON format
- Validates incoming data from frontend
- Ensures data integrity before saving to database

### 3. API View (`backend/contact/views.py`)

Handles HTTP POST requests from the frontend:

```python
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Contact
from .serializers import ContactSerializer

@api_view(['POST'])
def contact_create(request):
    serializer = ContactSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                'message': 'Contact message received successfully!',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        {
            'message': 'Invalid data',
            'errors': serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )
```

**Flow:**
1. Receives POST request with JSON data
2. Validates data using ContactSerializer
3. If valid: saves to database and returns success response
4. If invalid: returns error response with validation errors

### 4. URL Configuration

**Contact URLs** (`backend/contact/urls.py`):
```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.contact_create, name='contact_create'),
]
```

**Main URLs** (`backend/backend/urls.py`):
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contact/', include('contact.urls')),
]
```

**Result:** API endpoint available at `http://localhost:8000/api/contact/`

### 5. CORS Configuration (`backend/backend/settings.py`)

Enables cross-origin requests from the Next.js frontend:

```python
INSTALLED_APPS = [
    # ... other apps
    'rest_framework',
    'corsheaders',
    'contact',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Must be before CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",      # Next.js dev server
    "http://127.0.0.1:3000",      # Alternative localhost
]

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],
}
```

**Why CORS is needed:**
- Frontend runs on `localhost:3000`
- Backend runs on `localhost:8000`
- Different ports = different origins
- Browsers block cross-origin requests by default
- `django-cors-headers` allows specific origins

## Frontend Setup (Next.js)

### Contact Component (`frontend/components/Contact.tsx`)

The contact form that sends data to Django:

```typescript
"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // Send POST request to Django API
      const response = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        setStatus({
          type: "error",
          message: errorData.message || "Failed to send message.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of component
}
```

## Data Flow: Step-by-Step

### When User Submits Contact Form:

1. **User fills form** in `Contact.tsx` component
   - Name: "John Doe"
   - Email: "john@example.com"
   - Message: "Great portfolio!"

2. **Form submission** triggers `handleSubmit` function
   - Prevents default form behavior
   - Sets loading state (`isSubmitting = true`)

3. **Frontend sends HTTP POST request**
   ```javascript
   fetch("http://localhost:8000/api/contact/", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       name: "John Doe",
       email: "john@example.com",
       message: "Great portfolio!"
     })
   })
   ```

4. **Request crosses origins**
   - Browser checks CORS headers
   - Django's CORS middleware allows request from `localhost:3000`

5. **Django receives request** at `/api/contact/`
   - Routes to `contact_create` view
   - Extracts JSON data from request body

6. **Data validation**
   - `ContactSerializer` validates the data:
     - Email format is correct
     - Name and message within length limits
     - All required fields present

7. **Save to database** (if valid)
   - Serializer creates Contact model instance
   - Django saves to SQLite database

8. **Django sends response**
   ```json
   {
     "message": "Contact message received successfully!",
     "data": {
       "id": 1,
       "name": "John Doe",
       "email": "john@example.com",
       "message": "Great portfolio!"
     }
   }
   ```
   Status code: 201 Created

9. **Frontend receives response**
   - Parses JSON response
   - Updates UI with success message
   - Clears form fields
   - Sets `isSubmitting = false`

10. **User sees confirmation**
    - Green success message appears
    - Form is reset and ready for next submission

## Error Handling

### Backend Validation Errors

If data is invalid (e.g., invalid email):

```json
{
  "message": "Invalid data",
  "errors": {
    "email": ["Enter a valid email address."]
  }
}
```
Status: 400 Bad Request

### Network Errors

If backend is not running or network fails:
- Frontend catches error in `catch` block
- Shows user-friendly error message
- Form remains filled so user can retry

## Security Considerations

### 1. CSRF Protection
- REST API uses token-based authentication (not session-based)
- CSRF middleware can be bypassed for API endpoints
- Consider adding authentication tokens for production

### 2. Data Validation
- Backend validates all data through serializer
- Django's EmailValidator ensures valid email format
- Max length limits prevent database overflow

### 3. CORS Restrictions
- Only `localhost:3000` allowed in development
- Must update `CORS_ALLOWED_ORIGINS` for production
- Add your production frontend domain before deploying

## Testing the Integration

### 1. Start Backend
```bash
cd backend
python3 manage.py runserver
```
You should see: `Starting development server at http://127.0.0.1:8000/`

### 2. Start Frontend
```bash
cd frontend
npm run dev
```
You should see: `- Local: http://localhost:3000`

### 3. Test Contact Form
1. Visit http://localhost:3000
2. Scroll to Contact section
3. Fill in name, email, and message
4. Click "Send Message"
5. Should see success message

### 4. Verify in Database
```bash
cd backend
python3 manage.py shell
```

```python
from contact.models import Contact
Contact.objects.all()  # Should show your submission
Contact.objects.first().name  # Should show the name you entered
```

### 5. View in Django Admin
```bash
python3 manage.py createsuperuser  # Create admin account
python3 manage.py runserver
```
Visit http://localhost:8000/admin and login to see contact submissions

## Extending the Integration

### Add More API Endpoints

1. **Create Portfolio API** to fetch projects:
   ```python
   # backend/portfolio/models.py
   class Project(models.Model):
       title = models.CharField(max_length=200)
       description = models.TextField()
       technologies = models.JSONField()
       github_url = models.URLField()
   ```

2. **Create serializer and view**
3. **Add to URLs**: `path('api/projects/', ...)`
4. **Fetch in Frontend**:
   ```typescript
   useEffect(() => {
     fetch('http://localhost:8000/api/projects/')
       .then(res => res.json())
       .then(data => setProjects(data))
   }, [])
   ```

### Add Authentication

1. Install `djangorestframework-simplejwt`
2. Add token endpoints
3. Send token with requests from frontend

## Troubleshooting

### "Network error" in frontend
- ✓ Check if Django server is running on port 8000
- ✓ Check CORS settings in Django
- ✓ Check browser console for CORS errors

### "CSRF token missing"
- ✓ Ensure `corsheaders.middleware.CorsMiddleware` is added
- ✓ Check that endpoint uses `@api_view` decorator

### Form submits but no data in database
- ✓ Check Django terminal for errors
- ✓ Verify migrations are applied: `python3 manage.py migrate`
- ✓ Check serializer validation in Django logs

## Production Deployment

### Frontend (Vercel)
1. Update API URL in `Contact.tsx`:
   ```typescript
   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
   fetch(`${API_URL}/api/contact/`, ...)
   ```

2. Add environment variable in Vercel:
   - `NEXT_PUBLIC_API_URL=https://your-backend.com`

### Backend (Railway/Heroku)
1. Update `CORS_ALLOWED_ORIGINS`:
   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://your-frontend.vercel.app",
   ]
   ```

2. Update `ALLOWED_HOSTS`:
   ```python
   ALLOWED_HOSTS = ['your-backend.com']
   ```

3. Set `DEBUG = False` in production

## Summary

The backend-frontend integration works through:
- **Django REST Framework** providing JSON API endpoints
- **django-cors-headers** allowing cross-origin requests
- **Fetch API** in Next.js sending HTTP requests
- **Serializers** validating and transforming data
- **Models** storing data in the database

The key is that both servers run independently and communicate via HTTP requests, with CORS allowing them to work together despite being on different ports.
