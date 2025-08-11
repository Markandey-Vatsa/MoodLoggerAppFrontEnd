# MoodLogger Frontend

A modern React TypeScript frontend for the MoodLogger application - a personal journal and mood tracking app.

## Features

### 🔐 Authentication

- User registration and login
- Secure authentication with JWT tokens
- Protected routes and navigation

### 📝 Journal Management

- Create, read, update, and delete journal entries
- Rich text editor for content
- Mood/sentiment tracking (Happy, Sad, Angry, Anxious)
- Search and filter entries
- Responsive design for mobile and desktop

### 🏠 Dashboard

- Personalized greeting with weather information
- Daily quotes for motivation
- Overview of recent journal entries
- Quick action buttons for easy navigation

### 👤 User Profile

- Update user information
- Change password
- Account deletion option
- Profile settings management

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Elegant notifications

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── common/         # Shared/reusable components
│   ├── dashboard/      # Dashboard components
│   ├── journal/        # Journal-related components
│   └── profile/        # User profile components
├── context/            # React Context providers
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component
└── index.tsx           # App entry point
```

## Available Scripts

### Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Production

```bash
# Build for production
npm run build

# The build folder will contain optimized production files
```

## API Integration

The frontend is configured to work with your Spring Boot MoodLogger backend. It includes:

- **Authentication endpoints** - Login, register
- **Journal CRUD operations** - Full journal entry management
- **User management** - Profile updates, account deletion
- **Dashboard data** - Weather integration, quotes, user greeting

### Backend Endpoints Used

```
Authentication:
- POST /public/create-user (Register)
- Basic Auth for login

Journal Entries:
- GET /journal (Get all entries)
- POST /journal (Create entry)
- GET /journal/get-by-id{id} (Get specific entry)
- PUT /journal/id/{id} (Update entry)
- DELETE /journal/delete{id} (Delete entry)

User Management:
- GET /user (Get user greeting with weather/quote)
- PUT /user (Update user profile)
- DELETE /user (Delete account)
```

## Environment Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8080
```

## Features Overview

### 🎨 Modern UI Design

- Clean, intuitive interface
- Responsive design that works on all devices
- Material Design principles
- Dark and light theme support
- Smooth animations and transitions

### 📱 Mobile-First Approach

- Touch-friendly interface
- Optimized for mobile devices
- Progressive Web App capabilities
- Offline-first design principles

### 🔍 Advanced Search & Filter

- Search journal entries by title and content
- Filter by mood/sentiment
- Date range filtering
- Sort by various criteria

### 📊 Mood Analytics

- Visual representation of mood patterns
- Sentiment analysis integration
- Mood trends over time
- Insights and statistics

## Getting Started

1. **Prerequisites**

   - Node.js 16+ installed
   - Your Spring Boot backend running on port 8080

2. **Installation**

   ```bash
   cd Frontend
   npm install
   ```

3. **Configuration**

   - Ensure your backend is running
   - Update API URL in package.json proxy or .env file

4. **Start Development**

   ```bash
   npm start
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for all new components
3. Follow Material-UI design patterns
4. Write clean, documented code
5. Test thoroughly on mobile and desktop

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

Built with ❤️ using React and TypeScript
