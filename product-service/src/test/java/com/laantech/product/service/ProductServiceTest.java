package com.laantech.product.service;

import com.laantech.product.dto.ProductUploadRequest;
import com.laantech.product.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ProductServiceTest {

    private ProductService productService;

    @TempDir
    Path tempDir;

    @BeforeEach
    void setUp() {
        productService = new ProductService();
        ReflectionTestUtils.setField(productService, "uploadDir", tempDir.toString());
        ReflectionTestUtils.setField(productService, "serverPort", "8080");
    }

    @Test
    void uploadProducts_Success() throws IOException {
        MockMultipartFile image = new MockMultipartFile("image", "test.jpg", "image/jpeg", "test".getBytes());
        
        ProductUploadRequest request = new ProductUploadRequest();
        request.setName("Test Product");
        request.setDescription("Test Description");
        request.setPrice(new BigDecimal("29.99"));
        request.setCategory("Electronics");

        List<Product> result = productService.uploadProducts(Arrays.asList(image), Arrays.asList(request));

        assertEquals(1, result.size());
        assertEquals("Test Product", result.get(0).getName());
        assertNotNull(result.get(0).getId());
    }

    @Test
    void getAllProducts_ReturnsProducts() throws IOException {
        uploadTestProduct();
        
        List<Product> result = productService.getAllProducts();
        
        assertEquals(1, result.size());
    }

    private void uploadTestProduct() throws IOException {
        MockMultipartFile image = new MockMultipartFile("image", "test.jpg", "image/jpeg", "test".getBytes());
        ProductUploadRequest request = new ProductUploadRequest();
        request.setName("Test Product");
        request.setPrice(new BigDecimal("29.99"));
        
        productService.uploadProducts(Arrays.asList(image), Arrays.asList(request));
    }
}