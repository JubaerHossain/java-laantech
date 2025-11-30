# 🚀 Deployment Guide

## 📋 Prerequisites

### System Requirements
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Memory**: Minimum 2GB RAM available
- **Storage**: At least 5GB free disk space
- **Ports**: 3000 and 8080 must be available

### Optional Tools
- **Make**: For convenient command execution
- **Git**: For version control and updates

## 🏗️ Production Deployment

### 1. Environment Setup

Create production environment files:

**Frontend (.env.production):**
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

**Backend (application-prod.properties):**
```properties
server.port=8080
spring.profiles.active=prod
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=100MB
app.upload.dir=/app/uploads
logging.level.com.laantech.product=WARN
logging.level.org.springframework.web=WARN
```

### 2. Docker Production Build

**Update docker-compose.prod.yml:**
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: production
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    depends_on:
      - backend

  backend:
    build:
      context: ./product-service
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    volumes:
      - uploads:/app/uploads
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  uploads:
    driver: local
```

### 3. Production Commands

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

## ☁️ Cloud Deployment Options

### AWS Deployment

#### Option 1: AWS ECS with Fargate
```bash
# 1. Build and push images to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# 2. Tag and push images
docker tag product-upload-frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/product-upload-frontend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/product-upload-frontend:latest

# 3. Create ECS task definition and service
# Use AWS Console or CLI to create ECS resources
```

#### Option 2: AWS Elastic Beanstalk
```bash
# 1. Install EB CLI
pip install awsebcli

# 2. Initialize and deploy
eb init
eb create production
eb deploy
```

### Google Cloud Platform

#### Cloud Run Deployment
```bash
# 1. Build and push to Container Registry
gcloud builds submit --tag gcr.io/PROJECT-ID/product-upload-frontend ./frontend
gcloud builds submit --tag gcr.io/PROJECT-ID/product-upload-backend ./product-service

# 2. Deploy to Cloud Run
gcloud run deploy frontend --image gcr.io/PROJECT-ID/product-upload-frontend --platform managed
gcloud run deploy backend --image gcr.io/PROJECT-ID/product-upload-backend --platform managed
```

### DigitalOcean App Platform

**app.yaml:**
```yaml
name: product-upload-system
services:
- name: frontend
  source_dir: /frontend
  github:
    repo: your-username/product-upload-system
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  
- name: backend
  source_dir: /product-service
  github:
    repo: your-username/product-upload-system
    branch: main
  run_command: java -jar target/product-service-0.0.1-SNAPSHOT.jar
  environment_slug: java
  instance_count: 1
  instance_size_slug: basic-xxs
```

## 🔧 Configuration Management

### Environment Variables

**Frontend Environment Variables:**
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_MAX_FILE_SIZE=5242880
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Backend Environment Variables:**
```env
# Server Configuration
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod

# File Upload Configuration
SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE=10MB
SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE=100MB
APP_UPLOAD_DIR=/app/uploads

# Logging Configuration
LOGGING_LEVEL_COM_LAANTECH_PRODUCT=INFO
LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_WEB=WARN

# CORS Configuration (if needed)
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Secrets Management

**Using Docker Secrets:**
```yaml
services:
  backend:
    secrets:
      - db_password
      - api_key
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    file: ./secrets/api_key.txt
```

## 🔒 Security Considerations

### Production Security Checklist

#### Frontend Security
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure Content Security Policy (CSP)
- [ ] Set secure HTTP headers
- [ ] Minimize bundle size and remove dev dependencies
- [ ] Configure proper CORS origins (no wildcards)

#### Backend Security
- [ ] Configure specific CORS origins
- [ ] Enable HTTPS/SSL
- [ ] Set up proper file upload validation
- [ ] Configure rate limiting
- [ ] Enable security headers
- [ ] Set up proper logging and monitoring

#### Infrastructure Security
- [ ] Use non-root users in containers
- [ ] Scan images for vulnerabilities
- [ ] Set up network security groups/firewalls
- [ ] Configure backup and disaster recovery
- [ ] Enable monitoring and alerting

### Security Headers Configuration

**Nginx Configuration (if using reverse proxy):**
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Frontend
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 100M;
    }
}
```

## 📊 Monitoring and Logging

### Health Checks

**Backend Health Check:**
```java
@RestController
public class HealthController {
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(status);
    }
}
```

**Docker Health Checks:**
```yaml
services:
  backend:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Logging Configuration

**Structured Logging (logback-spring.xml):**
```xml
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
            <providers>
                <timestamp/>
                <logLevel/>
                <loggerName/>
                <message/>
                <mdc/>
            </providers>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```

### Monitoring Setup

**Prometheus Metrics (optional):**
```yaml
# Add to docker-compose.yml
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Backend Tests
        run: |
          cd product-service
          ./mvnw test
          
      - name: Run Frontend Tests
        run: |
          cd frontend
          npm ci
          npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and Deploy
        run: |
          docker-compose -f docker-compose.prod.yml build
          docker-compose -f docker-compose.prod.yml up -d
```

## 🚨 Troubleshooting Production Issues

### Common Production Problems

#### 1. Memory Issues
```bash
# Check container memory usage
docker stats

# Increase memory limits
docker-compose -f docker-compose.prod.yml up -d --scale backend=1 --memory=2g
```

#### 2. Disk Space Issues
```bash
# Check disk usage
df -h

# Clean up Docker
docker system prune -f
docker volume prune -f
```

#### 3. Network Issues
```bash
# Check container networking
docker network ls
docker network inspect bridge

# Test connectivity
docker exec -it backend curl -f http://localhost:8080/health
```

#### 4. SSL/HTTPS Issues
```bash
# Test SSL certificate
openssl s_client -connect yourdomain.com:443

# Check certificate expiry
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Performance Optimization

#### Frontend Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement image optimization
- Enable browser caching
- Use service workers for caching

#### Backend Optimization
- Configure JVM heap size: `-Xmx1g -Xms512m`
- Enable connection pooling
- Implement caching for frequently accessed data
- Optimize file I/O operations
- Use async processing for heavy operations

### Backup and Recovery

#### Data Backup
```bash
# Backup uploaded files
docker run --rm -v product-upload_uploads:/data -v $(pwd):/backup alpine tar czf /backup/uploads-backup-$(date +%Y%m%d).tar.gz -C /data .

# Restore from backup
docker run --rm -v product-upload_uploads:/data -v $(pwd):/backup alpine tar xzf /backup/uploads-backup-20240101.tar.gz -C /data
```

#### Database Backup (if using database)
```bash
# PostgreSQL backup example
docker exec postgres-container pg_dump -U username dbname > backup.sql

# Restore
docker exec -i postgres-container psql -U username dbname < backup.sql
```

---

**🎉 Your Product Upload System is now ready for production deployment!**