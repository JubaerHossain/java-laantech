# Product Upload System

A full-stack web application that allows users to upload multiple products with images. Built this as a solution for managing product catalogs efficiently.

**Tech Stack:**
- Frontend: React + Next.js + TypeScript
- Backend: Spring Boot + Java 21
- Storage: File system based
- Deployment: Docker

## What's Inside

- [Features](#features)
- [How to Run](#how-to-run)
- [Development](#development)
- [API Docs](#api-docs)
- [Project Structure](#project-structure)
- [Docker Setup](#docker-setup)
- [Configuration](#configuration)
- [Common Issues](#common-issues)

## Features

What this app can do:

- Upload multiple products at once with their images
- Real-time progress bar during uploads
- Form validation on both frontend and backend
- Image preview and management
- Paginated product listing
- Responsive design that works on mobile

Technical stuff I implemented:
- TypeScript for better code quality
- Toast notifications for user feedback
- CORS configuration for API access
- File size and type validation
- Custom React hooks for state management
- Modern UI with Tailwind CSS

## Tech Choices

### Frontend
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom animations
- **State Management**: Custom React hooks
- **HTTP Client**: Fetch API with progress tracking
- **Notifications**: React Hot Toast
- **Testing**: Jest + React Testing Library

### Backend
- **Framework**: Spring Boot 4.0.0
- **Language**: Java 21
- **Build Tool**: Maven
- **File Upload**: Spring Multipart
- **Validation**: Jakarta Validation
- **CORS**: Custom configuration
- **Storage**: Local file system

### DevOps
- **Containerization**: Docker & Docker Compose
- **Build Automation**: Makefile
- **Development**: Hot reload for both frontend and backend

## How to Run

You'll need Docker installed on your machine.

```bash
# Get the code
git clone <repository-url>
cd assignments

# Start everything (this might take a few minutes first time)
docker-compose build
docker-compose up -d
```

Then open:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

To test it:
1. Go to the frontend
2. Drag some images or click to select them
3. Fill out the product info for each image
4. Hit upload and watch the progress bar
5. Your products should appear in the list below

## Development

### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Backend Development
```bash
cd product-service

# Run with Maven
./mvnw spring-boot:run

# Or build and run JAR
./mvnw clean package
java -jar target/product-service-0.0.1-SNAPSHOT.jar

# Run tests
./mvnw test
```

## API Docs

Base URL: `http://localhost:8080/api`

### Main Endpoints

#### 1. Upload Products (Bulk)
```http
POST /api/products/bulk-upload
Content-Type: multipart/form-data

Form Data:
- images: File[] (multiple image files)
- productData: JSON string (array of product objects)
```

**Product Data Format:**
```json
[
  {
    "name": "Product Name",
    "description": "Product description",
    "price": 29.99,
    "category": "Electronics"
  }
]
```

**Response:**
```json
{
  "success": true,
  "message": "Products uploaded successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "category": "Electronics",
      "imageUrl": "/api/products/{id}/image",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 2. Get Products (Paginated)
```http
GET /api/products?page=0&size=10
```

**Response:**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "content": [...],
    "page": 0,
    "size": 10,
    "totalElements": 25,
    "totalPages": 3,
    "first": true,
    "last": false
  }
}
```

#### 3. Get Product by ID
```http
GET /api/products/{id}
```

#### 4. Get Product Image
```http
GET /api/products/{id}/image
Content-Type: image/jpeg
```

#### 5. Health Check
```http
GET /health
```

## Project Structure

### Frontend Layout
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic components (Button, Input)
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   └── product/        # Product-specific components
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
├── api/                # API client and services
├── utils/              # Utility functions
└── __tests__/          # Test files
```

### Key Components
- **ProductUpload**: Complete upload workflow with drag-and-drop
- **ProductGrid**: Responsive product display with loading states
- **ProductCard**: Individual product cards with hover effects
- **Pagination**: Advanced pagination with page indicators

### Custom Hooks
- **useProducts**: Product data management with pagination
- **useUpload**: Upload functionality with progress tracking

### Backend Layout
```
com.laantech.product/
├── config/             # Configuration classes
├── controller/         # REST controllers
├── dto/               # Data Transfer Objects
├── exception/         # Exception handlers
├── model/             # Entity models
└── service/           # Business logic
```

### Key Classes
- **ProductController**: REST API endpoints
- **ProductService**: Business logic and file handling
- **WebConfig**: CORS and web configuration
- **GlobalExceptionHandler**: Centralized error handling

## Docker Setup

### Quick Commands (if you have make installed)
```bash
make build     # Build all Docker images
make up        # Start all services in background
make down      # Stop all services
make logs      # View logs from all services
make clean     # Remove containers and volumes
make restart   # Restart all services
make test      # Run backend tests
```

### Direct Docker Commands
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up
docker-compose down -v --remove-orphans
```

## Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

### Backend (application.properties)
```properties
server.port=8080
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=100MB
app.upload.dir=uploads
logging.level.com.laantech.product=INFO
```

## Common Issues

Stuff that might go wrong:

#### 1. CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: Ensure backend is running and CORS is properly configured

#### 2. File Upload Fails
**Problem**: Large files or unsupported formats
**Solution**: Check file size limits and supported formats (JPG, PNG, WebP)

#### 3. Port Conflicts
**Problem**: Ports 3000 or 8080 already in use
**Solution**: Stop conflicting services or change ports in docker-compose.yml

#### 4. Docker Build Issues
**Problem**: Build failures or dependency issues
**Solution**: 
```bash
make clean
docker system prune -f
make build
```

### Logs and Debugging
```bash
# View all logs
make logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f backend
```

### Performance Tips
- Use appropriate image sizes (< 5MB recommended)
- Upload in smaller batches for better performance
- Monitor disk space for uploaded files
- Use production builds for better performance

## Development Notes

### Adding Features
1. Frontend: Add components in the right folders, create types, write tests
2. Backend: New endpoints go in controllers, business logic in services
3. Don't forget to update the API docs

### Code Quality
I've set up:
- ESLint and Prettier for the frontend
- Maven for Java builds
- Basic tests (could use more)

### Things I'd improve
- Add a proper database instead of file storage
- Better error handling
- More comprehensive tests
- Image optimization
- User authentication Prettier, TypeScript strict mode
- **Backend**: Maven checkstyle, SpotBugs (can be added)
- **Testing**: Unit tests for critical functionality

### Security Considerations
- File type validation on both client and server
- File size limits to prevent abuse
- Input sanitization and validation
- CORS properly configured for production

---

**Built with ❤️ using modern web technologies**