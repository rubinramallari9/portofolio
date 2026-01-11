# Django REST Framework - Complete Beginner's Guide

## What We Built: A Contact Form API

We created a complete API system that allows a frontend (like a React website) to submit and retrieve contact form messages. Think of it like building a mailbox system where people can drop messages and you can read them later.

---

## The 4 Building Blocks

### 1. Model (The Database Blueprint)
**File:** `contact/models.py`

```python
class Contacts(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    message = models.TextField(default='No description provided')
```

**What it does:**
- This is like creating a form template that defines what information you want to collect
- `name`: A text field that can hold up to 50 characters
- `email`: A special field that validates email format and ensures each email is unique
- `message`: A large text field for the actual message content

**Real-world analogy:**
Think of this as designing a physical contact form card. You decide it needs three boxes: Name, Email, and Message.

---

### 2. Serializer (The Translator)
**File:** `contact/serializers.py`

```python
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = ['id', 'name', 'email', 'message']
        read_only_fields = ['id']

    def validate_email(self, value):
        if Contacts.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email has already been used.")
        return value
```

**What it does:**
The serializer is a two-way translator:

**Direction 1: Python → JSON (Serialization)**
```python
# You have a Contact object in your database
contact = Contacts.objects.get(id=1)

# Serializer converts it to JSON
serializer = ContactSerializer(contact)
print(serializer.data)

# Output:
# {
#     "id": 1,
#     "name": "John Doe",
#     "email": "john@example.com",
#     "message": "Hello there!"
# }
```

**Direction 2: JSON → Python (Deserialization)**
```python
# Someone sends JSON data from a website form
incoming_data = {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "I need help!"
}

# Serializer validates and converts it to a Python object
serializer = ContactSerializer(data=incoming_data)

if serializer.is_valid():  # Checks: Is email valid? Is name too long?
    serializer.save()      # Saves to database
else:
    print(serializer.errors)  # Shows what went wrong
```

**Key Features:**
- `fields = ['id', 'name', 'email', 'message']`: Only these fields are included in the JSON
- `read_only_fields = ['id']`: The ID is auto-generated, users can't set it
- `validate_email()`: Custom rule that prevents duplicate emails

**Real-world analogy:**
Like a postal worker who:
1. Takes your handwritten letter and types it into a computer (incoming data → database)
2. Takes a computer file and prints it as a letter (database → outgoing response)
3. Checks if the address is valid before accepting the letter (validation)

---

### 3. ViewSet (The Traffic Controller)
**File:** `contact/views.py`

```python
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        # Handles POST requests to create new contacts
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        # Handles GET requests to list all contacts
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
```

**What it does:**
A ViewSet is like a receptionist at a hotel desk who handles different requests:

#### Action 1: `create()` - Someone Submits a Contact Form
**Step-by-step:**
```python
def create(self, request, *args, **kwargs):
    # 1. Get the data from the request (the form submission)
    serializer = self.get_serializer(data=request.data)

    # 2. Validate it (check if email is valid, name isn't too long, etc.)
    serializer.is_valid(raise_exception=True)

    # 3. Save it to the database
    self.perform_create(serializer)

    # 4. Send back a success response with the saved data
    return Response(serializer.data, status=status.HTTP_201_CREATED)
```

**Example Request:**
```bash
POST /api/contacts/
{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "message": "I love your work!"
}
```

**Example Response:**
```json
{
    "id": 5,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "message": "I love your work!"
}
```
**Status Code:** `201 Created` (means "successfully created new resource")

---

#### Action 2: `list()` - Someone Wants to See All Contacts
**Step-by-step:**
```python
def list(self, request, *args, **kwargs):
    # 1. Get all contact records from database
    queryset = self.get_queryset()  # Gets Contacts.objects.all()

    # 2. Convert them all to JSON (many=True means multiple objects)
    serializer = self.get_serializer(queryset, many=True)

    # 3. Send them back
    return Response(serializer.data)
```

**Example Request:**
```bash
GET /api/contacts/
```

**Example Response:**
```json
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "message": "Hello there!"
    },
    {
        "id": 5,
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "message": "I love your work!"
    }
]
```
**Status Code:** `200 OK` (means "success")

---

#### Other Actions (Automatic, You Don't Have to Write Them!)

Because we used `ModelViewSet`, you automatically get these actions:

**`retrieve()` - Get One Specific Contact**
```bash
GET /api/contacts/1/
# Returns just contact with ID 1
```

**`update()` - Replace Entire Contact**
```bash
PUT /api/contacts/1/
{
    "name": "John Updated",
    "email": "john@example.com",
    "message": "New message"
}
# Replaces all fields
```

**`partial_update()` - Update Just Some Fields**
```bash
PATCH /api/contacts/1/
{
    "message": "Updated message only"
}
# Only updates the message field
```

**`destroy()` - Delete a Contact**
```bash
DELETE /api/contacts/1/
# Deletes contact with ID 1
```

**Real-world analogy:**
Like a receptionist who:
- Takes new booking requests (create)
- Shows you a list of all rooms (list)
- Shows you details of a specific room (retrieve)
- Updates booking information (update/partial_update)
- Cancels bookings (destroy)

---

### 4. URLs (The Address System)
**Files:** `contact/urls.py` and `core/urls.py`

#### Contact URLs (`contact/urls.py`)
```python
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet

router = DefaultRouter()
router.register(r'contacts', ContactViewSet, basename='contact')

urlpatterns = [
    path('', include(router.urls)),
]
```

**What this does:**
The `DefaultRouter` automatically creates these URL patterns:

| URL | HTTP Method | ViewSet Action | Purpose |
|-----|-------------|----------------|---------|
| `/contacts/` | GET | `list()` | Get all contacts |
| `/contacts/` | POST | `create()` | Create new contact |
| `/contacts/1/` | GET | `retrieve()` | Get contact #1 |
| `/contacts/1/` | PUT | `update()` | Update contact #1 (full) |
| `/contacts/1/` | PATCH | `partial_update()` | Update contact #1 (partial) |
| `/contacts/1/` | DELETE | `destroy()` | Delete contact #1 |

---

#### Main URLs (`core/urls.py`)
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('contact.urls')),
]
```

**What this does:**
- `path('api/', ...)`: Adds `/api/` prefix to all contact URLs
- `include('contact.urls')`: Imports all the URLs from `contact/urls.py`

**Final URLs:**
- `/api/contacts/` → List/Create contacts
- `/api/contacts/1/` → Get/Update/Delete contact #1
- `/admin/` → Django admin panel

**Real-world analogy:**
Like a building address system:
- Building address: `api/` (the API building)
- Department: `contacts/` (the contacts department)
- Office number: `1/` (specific contact #1)

---

## The Complete Flow (How Everything Works Together)

### Example: User Submits a Contact Form

```
1. USER ACTION
   Website form: Name="Bob", Email="bob@example.com", Message="Hi!"
   ↓

2. FRONTEND SENDS REQUEST
   POST http://localhost:8000/api/contacts/
   Body: {"name": "Bob", "email": "bob@example.com", "message": "Hi!"}
   ↓

3. DJANGO URLs (core/urls.py)
   "This request is for /api/contacts/, let me check contact/urls.py"
   ↓

4. CONTACT URLS (contact/urls.py)
   "This is a POST to /contacts/, router says use ContactViewSet.create()"
   ↓

5. VIEWSET (views.py)
   create() method runs:
   - Takes the JSON data
   - Passes it to ContactSerializer
   ↓

6. SERIALIZER (serializers.py)
   - Validates: Is email format valid? Is email unique? Is name under 50 chars?
   - If valid: Convert JSON to Python Contacts object
   - If invalid: Return error messages
   ↓

7. MODEL (models.py)
   - Serializer calls contact.save()
   - Django saves the new contact to the database
   ↓

8. RESPONSE BACK
   Serializer converts the saved object back to JSON
   ViewSet sends it back with 201 Created status
   ↓

9. FRONTEND RECEIVES
   {
       "id": 10,
       "name": "Bob",
       "email": "bob@example.com",
       "message": "Hi!"
   }
   Website shows: "Thank you! Your message was sent."
```

---

## Testing Your API

### Using curl (Command Line)

**Create a new contact:**
```bash
curl -X POST http://localhost:8000/api/contacts/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

**Get all contacts:**
```bash
curl http://localhost:8000/api/contacts/
```

**Get one contact:**
```bash
curl http://localhost:8000/api/contacts/1/
```

**Update a contact:**
```bash
curl -X PATCH http://localhost:8000/api/contacts/1/ \
  -H "Content-Type: application/json" \
  -d '{"message":"Updated message"}'
```

**Delete a contact:**
```bash
curl -X DELETE http://localhost:8000/api/contacts/1/
```

---

### Using Django REST Framework Browsable API

1. Start your server: `python manage.py runserver`
2. Visit: `http://localhost:8000/api/contacts/`
3. You'll see a nice web interface where you can test all operations

---

## Common Customizations

### Making Some Fields Optional
```python
# In serializers.py
class ContactSerializer(serializers.ModelSerializer):
    message = serializers.CharField(required=False)  # Message is now optional
```

### Adding Custom Actions
```python
# In views.py
from rest_framework.decorators import action

class ContactViewSet(viewsets.ModelViewSet):
    # ... existing code ...

    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get the 10 most recent contacts"""
        recent_contacts = self.queryset.order_by('-id')[:10]
        serializer = self.get_serializer(recent_contacts, many=True)
        return Response(serializer.data)

# Now you can visit: /api/contacts/recent/
```

### Filtering Results
```python
# In views.py
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = ContactSerializer

    def get_queryset(self):
        """Filter contacts by email if provided in query params"""
        queryset = super().get_queryset()
        email = self.request.query_params.get('email', None)
        if email:
            queryset = queryset.filter(email__icontains=email)
        return queryset

# Now you can visit: /api/contacts/?email=john
```

---

## Key Concepts Summary

### 1. Model
- **What:** Defines your database structure
- **Think:** Blueprint for a form

### 2. Serializer
- **What:** Converts between JSON and Python objects
- **Think:** Translator + Validator

### 3. ViewSet
- **What:** Handles HTTP requests and business logic
- **Think:** Receptionist who processes requests

### 4. URLs & Router
- **What:** Maps web addresses to ViewSet actions
- **Think:** Building directory that guides visitors

---

## Next Steps

1. **Add Authentication:** Only let logged-in users create/delete contacts
2. **Add Permissions:** Only admins can delete, everyone can create
3. **Add Pagination:** Don't return all 10,000 contacts at once
4. **Add Filtering:** Let users search by name or date
5. **Add Ordering:** Let users sort by newest/oldest

---

## Quick Reference

```python
# Create
POST /api/contacts/
Body: {"name": "...", "email": "...", "message": "..."}

# List all
GET /api/contacts/

# Get one
GET /api/contacts/1/

# Update (partial)
PATCH /api/contacts/1/
Body: {"message": "..."}

# Update (full)
PUT /api/contacts/1/
Body: {"name": "...", "email": "...", "message": "..."}

# Delete
DELETE /api/contacts/1/
```

---

## Troubleshooting

**"DoesNotExist" error:**
- You're trying to access a contact ID that doesn't exist
- Check your database or use a valid ID

**"This field is required" error:**
- You're missing a required field in your POST/PUT request
- Make sure name, email are included

**"Unique constraint failed" error:**
- You're trying to create a contact with an email that already exists
- Use a different email or update the existing contact

**"Invalid email" error:**
- The email format is wrong
- Use format: user@example.com

---

This guide covers everything we built! The beauty of Django REST Framework is that once you understand these 4 components (Model, Serializer, ViewSet, URLs), you can build any API quickly.
