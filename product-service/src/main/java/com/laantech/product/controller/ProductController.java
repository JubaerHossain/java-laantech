package com.laantech.product.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.laantech.product.dto.ApiResponse;
import com.laantech.product.dto.PagedResponse;
import com.laantech.product.dto.ProductUploadRequest;
import com.laantech.product.model.Product;
import com.laantech.product.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Main upload endpoint - handles multiple files + JSON data
    @PostMapping(value = "/bulk-upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<List<Product>>> bulkUpload(
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam("productData") String productDataJson) {
        
        try {
            List<ProductUploadRequest> productData = objectMapper.readValue(
                productDataJson, new TypeReference<List<ProductUploadRequest>>() {});
            
            // Make sure we have the same number of images and product data
            if (images.size() != productData.size()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Number of images must match number of product data entries"));
            }
            
            List<Product> uploadedProducts = productService.uploadProducts(images, productData);
            
            return ResponseEntity.ok(
                ApiResponse.success("Products uploaded successfully", uploadedProducts)
            );
            
        } catch (IOException e) {
            // File system issues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Failed to upload products: " + e.getMessage()));
        } catch (Exception e) {
            // Validation or other errors
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Invalid request: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<Product>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PagedResponse<Product> products = productService.getProductsPaginated(page, size);
        return ResponseEntity.ok(ApiResponse.success("Products retrieved successfully", products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable String id) {
        return productService.getProductById(id)
            .map(product -> ResponseEntity.ok(ApiResponse.success("Product found", product)))
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Product not found")));
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable String id) {
        try {
            byte[] imageData = productService.getProductImage(id);
            if (imageData == null) {
                return ResponseEntity.notFound().build();
            }
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            headers.setContentLength(imageData.length);
            
            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}