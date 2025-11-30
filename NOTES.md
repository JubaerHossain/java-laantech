# Development Notes

## What I Built

This is a product upload system I created for handling bulk product uploads. The main challenge was getting the file upload to work smoothly with progress tracking.

## Architecture Decisions

### Frontend
- Went with Next.js because it's what I'm most comfortable with
- Used TypeScript to catch errors early (learned this the hard way on previous projects)
- Tailwind for styling - much faster than writing custom CSS
- Custom hooks to keep components clean

### Backend  
- Spring Boot because it handles file uploads well out of the box
- Kept it simple with file system storage (would use S3 in production)
- Added CORS config after running into issues during development
- Used UUID for file names to avoid conflicts

## Challenges I Faced

1. **CORS Issues**: Spent way too much time debugging CORS. Finally got it working by removing the credentials requirement.

2. **File Upload Progress**: Getting the progress bar to work was tricky. Had to use XMLHttpRequest instead of fetch to get upload progress events.

3. **Form Validation**: Implemented validation on both sides. Frontend for UX, backend for security.

4. **Docker Setup**: Getting both services to talk to each other in Docker took some trial and error.

## Things That Could Be Better

- Error handling could be more robust
- Should add image compression/resizing
- File storage should be cloud-based for production
- Need more comprehensive tests
- Could use a proper database instead of in-memory storage

## Time Spent

- Backend API: ~4 hours
- Frontend UI: ~6 hours  
- Docker setup: ~2 hours
- Debugging CORS: ~2 hours (ugh)
- Documentation: ~1 hour

Total: About 15 hours over 3 days

## Running Locally

The Docker setup should work out of the box. If not, try:

```bash
# Clean everything and start fresh
docker-compose down -v
docker system prune -f
docker-compose build --no-cache
docker-compose up
```

## Production Considerations

- Need proper error logging
- Should add rate limiting
- File upload size limits need tuning
- Need proper backup strategy for uploaded files
- Should add health checks and monitoring