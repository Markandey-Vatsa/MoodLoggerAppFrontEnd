# MoodLogger Frontend - Setup & Development Guide

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Your Spring Boot backend running on port 8080

### Installation & Setup

1. **Navigate to the Frontend directory:**

   ```bash
   cd d:\MoodLogApp\Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (not recommended)
npm run eject
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the Frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_NAME=MoodLogger
```

### Backend Integration

The frontend expects your Spring Boot backend to be running on `http://localhost:8080` with the following endpoints available:

#### Authentication Endpoints:

- `POST /public/create-user` - User registration
- Basic Auth for login verification

#### Journal Endpoints:

- `GET /journal` - Get all journal entries
- `POST /journal` - Create new journal entry
- `GET /journal/get-by-id{id}` - Get specific journal entry
- `PUT /journal/id/{id}` - Update journal entry
- `DELETE /journal/delete{id}` - Delete journal entry

#### User Endpoints:

- `GET /user` - Get user greeting with weather/quote
- `PUT /user` - Update user profile
- `DELETE /user` - Delete user account

## 🎨 Features Overview

### ✅ Implemented Features:

- **User Authentication** - Login, registration, logout
- **Journal Management** - CRUD operations for journal entries
- **Dashboard** - Welcome screen with weather and quotes
- **Profile Management** - Update user information
- **Responsive Design** - Mobile-friendly interface
- **Search & Filter** - Find journal entries easily
- **Mood Tracking** - Sentiment analysis integration

### 🎯 Key Components:

1. **Authentication Flow**

   - Login/Register forms with validation
   - Protected routes
   - Session management

2. **Dashboard**

   - Personalized greeting
   - Weather integration
   - Daily quotes
   - Recent journal entries overview

3. **Journal Management**

   - Create/Edit journal entries
   - Rich text editor
   - Mood selection
   - Search and filter functionality

4. **User Profile**
   - Update personal information
   - Change password
   - Account deletion

## 🛠 Development Notes

### Authentication Implementation

The frontend uses Basic Authentication to match your Spring Boot backend:

- Credentials are base64 encoded
- Stored in localStorage
- Automatically added to API requests

### API Integration

- Axios interceptors handle authentication
- Error handling for 401 responses
- Automatic logout on authentication failure

### UI/UX Design

- Material-UI for consistent design
- Responsive grid system
- Custom theming
- Loading states and error handling

## 📁 Project Structure Explained

```
src/
├── components/
│   ├── auth/              # Login, Register components
│   ├── common/            # Navbar, LoadingSpinner
│   ├── dashboard/         # Main dashboard view
│   ├── journal/           # Journal list and form
│   └── profile/           # User profile management
├── context/
│   └── AuthContext.tsx    # Authentication state management
├── services/
│   └── api.ts             # API service layer
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx                # Main app with routing
├── index.tsx              # React app entry point
└── index.css              # Global styles
```

## 🔍 Troubleshooting

### Common Issues:

1. **Backend not running:**

   - Ensure your Spring Boot app is running on port 8080
   - Check if CORS is properly configured

2. **Authentication errors:**

   - Verify your Spring Security configuration
   - Check if Basic Auth is enabled

3. **API endpoints not found:**
   - Confirm all controller endpoints match the API service
   - Check request/response formats

### Development Tips:

1. **Testing without backend:**

   - You can mock API responses in `services/api.ts`
   - Use browser dev tools to inspect network requests

2. **Styling customization:**

   - Modify the MUI theme in `App.tsx`
   - Add custom CSS in `index.css`

3. **Adding new features:**
   - Follow the existing component structure
   - Add new types to `types/index.ts`
   - Update API service for new endpoints

## 🚀 Deployment

### Development Build:

```bash
npm run build
```

### Production Deployment:

1. Build the project: `npm run build`
2. Serve the `build` folder using a web server
3. Configure environment variables for production
4. Ensure backend CORS allows your production domain

### Docker Deployment (Optional):

Create a `Dockerfile` in the Frontend directory:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify backend logs for API errors
3. Ensure all dependencies are installed correctly
4. Check network requests in browser dev tools

---

Happy coding! 🎉
