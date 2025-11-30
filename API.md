# API Reference

Quick reference for the backend API.

Base URL: `http://localhost:8080`

## Endpoints

### Health Check

```
GET /health
```

Just returns `{"status": "UP"}` if everything's working.

---

### Upload Products

This is the main endpoint - uploads multiple products with their images.

```http
POST /api/products/bulk-upload
Content-Type: multipart/form-data
```

Send as multipart form data:
- `images`: The image files (JPG, PNG, WebP)
- `productData`: JSON string with product info

Product data format:
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

JavaScript example:
```javascript
const formData = new FormData();
formData.append('images', file1);
formData.append('images', file2);
formData.append('productData', JSON.stringify([
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones",
    price: 99.99,
    category: "Electronics"
  }
]));

fetch('/api/products/bulk-upload', {
  method: 'POST',
  body: formData
});
```

Success response:
```json
{
  "success": true,
  "message": "Products uploaded successfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Wireless Headphones",
      "price": 99.99,
      "category": "Electronics",
      "imageUrl": "/api/products/550e8400-e29b-41d4-a716-446655440000/image",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ]
}
```

---

### Get Products

Returns paginated list of products.

```http
GET /api/products?page=0&size=6
```

Query params:
- `page`: Page number (starts at 0)
- `size`: Items per page (default 10)

Response:
```json
{
  "success": true,
  "data": {
    "content": [...],
    "page": 0,
    "size": 6,
    "totalElements": 25,
    "totalPages": 5,
    "first": true,
    "last": false
  }
}
```

---

### Get Single Product

```http
GET /api/products/{id}
```

Just pass the product ID in the URL.

---

### Get Product Image

Returns the actual image file.

```http
GET /api/products/{id}/image
```

Returns the image file directly. 404 if not found.

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

Common issues:
- File too large (max 10MB per file)
- Wrong file type (only JPG, PNG, WebP)
- Missing required fields (name, price)
- Mismatched image/data counts

## Notes

- CORS is enabled for all origins in development
- File uploads are stored in the `uploads/` directory
- Product IDs are UUIDs
- All timestamps are in ISO format