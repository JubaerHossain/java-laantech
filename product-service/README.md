# Product Service API

A production-ready Spring Boot application for bulk product upload with image management.

## Features

- Bulk product upload with multiple images
- Individual product folder creation
- JSON metadata storage
- Image serving with proper content types
- Pagination support
- CORS configuration for frontend integration
- Global exception handling
- Health check endpoint

## API Endpoints

### Health Check
```
GET /api/health
```

### Bulk Product Upload
```
POST /api/products/bulk-upload
Content-Type: multipart/form-data

Form Data:
- images: MultipartFile[] (product images)
- productData: JSON string (array of product information)
```

Example productData JSON:
```json
[
  {
    "name": "Product 1",
    "description": "Description for product 1",
    "price": 29.99,
    "category": "Electronics"
  },
  {
    "name": "Product 2", 
    "description": "Description for product 2",
    "price": 49.99,
    "category": "Clothing"
  }
]
```

### Get All Products (Paginated)
```
GET /api/products?page=0&size=10
```

### Get Product by ID
```
GET /api/products/{id}
```

### Get Product Image
```
GET /api/products/{id}/image
```

## Running the Application

1. Ensure Java 21 is installed
2. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
3. The API will be available at `http://localhost:8080`

## File Structure

- Products are stored in `uploads/{productId}/` folders
- Each folder contains:
  - `image.{ext}` - The product image
  - `product.json` - Product metadata

## Configuration

Key application properties:
- `server.port=8080`
- `spring.servlet.multipart.max-file-size=10MB`
- `spring.servlet.multipart.max-request-size=100MB`
- `app.upload.dir=uploads`