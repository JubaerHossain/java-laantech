package com.laantech.product.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.laantech.product.dto.PagedResponse;
import com.laantech.product.dto.ProductUploadRequest;
import com.laantech.product.model.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ProductService {
    
    @Value("${app.upload.dir:uploads}")
    private String uploadDir;
    
    @Value("${server.port:8080}")
    private String serverPort;
    
    private final Map<String, Product> products = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper()
            .findAndRegisterModules();

    public List<Product> uploadProducts(List<? extends MultipartFile> images, List<ProductUploadRequest> productData) throws IOException {
        List<Product> uploadedProducts = new ArrayList<>();
        
        for (int i = 0; i < images.size() && i < productData.size(); i++) {
            MultipartFile image = (MultipartFile) images.get(i);
            ProductUploadRequest request = productData.get(i);
            
            Product product = createProduct(image, request);
            products.put(product.getId(), product);
            uploadedProducts.add(product);
        }
        
        return uploadedProducts;
    }
    
    private Product createProduct(MultipartFile image, ProductUploadRequest request) throws IOException {
        String productId = UUID.randomUUID().toString();
        String productDir = uploadDir + "/" + productId;
        
        // Create product directory
        Files.createDirectories(Paths.get(productDir));
        
        // Save image
        String imageExtension = getFileExtension(image.getOriginalFilename());
        String imageName = "image" + imageExtension;
        Path imagePath = Paths.get(productDir, imageName);
        Files.write(imagePath, image.getBytes());
        
        // Create product
        Product product = new Product(request.getName(), request.getDescription(), 
                                    request.getPrice(), request.getCategory());
        product.setId(productId);
        product.setImagePath(imagePath.toString());
        product.setImageUrl("http://localhost:" + serverPort + "/api/products/" + productId + "/image");
        
        // Save product JSON
        Path jsonPath = Paths.get(productDir, "product.json");
        objectMapper.writeValue(jsonPath.toFile(), product);
        
        return product;
    }
    
    public List<Product> getAllProducts() {
        return new ArrayList<>(products.values());
    }
    
    public PagedResponse<Product> getProductsPaginated(int page, int size) {
        List<Product> allProducts = new ArrayList<>(products.values());
        int totalElements = allProducts.size();
        int startIndex = page * size;
        int endIndex = Math.min(startIndex + size, totalElements);
        
        List<Product> pageContent = startIndex < totalElements ? 
            allProducts.subList(startIndex, endIndex) : new ArrayList<>();
            
        return new PagedResponse<>(pageContent, page, size, totalElements);
    }
    
    public Optional<Product> getProductById(String id) {
        return Optional.ofNullable(products.get(id));
    }
    
    public byte[] getProductImage(String productId) throws IOException {
        Product product = products.get(productId);
        if (product == null || product.getImagePath() == null) {
            return null;
        }
        return Files.readAllBytes(Paths.get(product.getImagePath()));
    }
    
    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return ".jpg";
        }
        return filename.substring(filename.lastIndexOf("."));
    }
    
    public void loadExistingProducts() {
        try {
            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdirs();
                return;
            }
            
            File[] productDirs = uploadDirectory.listFiles(File::isDirectory);
            if (productDirs != null) {
                for (File dir : productDirs) {
                    File jsonFile = new File(dir, "product.json");
                    if (jsonFile.exists()) {
                        Product product = objectMapper.readValue(jsonFile, Product.class);
                        products.put(product.getId(), product);
                    }
                }
            }
        } catch (IOException e) {
            // Log error in production
        }
    }
}