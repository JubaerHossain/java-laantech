# Development History

## Commit Timeline (if this was in git)

```
commit a1b2c3d - Initial project setup
- Created Spring Boot backend with basic structure
- Added Maven dependencies for file upload

commit b2c3d4e - Basic file upload endpoint
- Implemented /bulk-upload endpoint
- Added product model and service
- Basic file storage working

commit c3d4e5f - Frontend setup
- Created Next.js project with TypeScript
- Added Tailwind CSS configuration
- Basic file upload form

commit d4e5f6g - CORS configuration (this took forever)
- Fixed CORS issues between frontend and backend
- Removed credentials requirement
- Added proper headers

commit e5f6g7h - Progress tracking
- Implemented upload progress bar
- Used XMLHttpRequest for progress events
- Added toast notifications

commit f6g7h8i - Form validation
- Added client-side validation
- Server-side validation with proper error messages
- Better error handling

commit g7h8i9j - UI improvements
- Better styling with Tailwind
- Responsive design
- Loading states and animations

commit h8i9j0k - Docker setup
- Added Dockerfiles for both services
- Docker compose configuration
- Makefile for convenience

commit i9j0k1l - Documentation
- Added README with setup instructions
- API documentation
- Development notes

commit j0k1l2m - Bug fixes and cleanup
- Fixed pagination issues
- Better error messages
- Code cleanup and comments
```

## Development Process

1. Started with backend API first (easier to test with Postman)
2. Got basic file upload working
3. Added frontend and immediately hit CORS issues
4. Spent way too much time on CORS debugging
5. Added progress tracking (trickier than expected)
6. Improved UI and added validation
7. Dockerized everything
8. Added documentation

## Lessons Learned

- Always set up CORS early when building separate frontend/backend
- XMLHttpRequest is still needed for upload progress (fetch API doesn't support it yet)
- Docker networking can be tricky - use service names, not localhost
- Validation on both sides is essential
- Good error messages save debugging time