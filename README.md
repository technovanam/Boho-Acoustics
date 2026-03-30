# Boho Project

A modern full-stack application with React frontend and Node.js backend, featuring Firebase authentication and database integration.

## Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Lenis** for smooth scrolling
- **Framer Motion** for animations
- **Firebase** for authentication

### Backend
- **Node.js** with Express
- **Firebase Admin SDK** for server-side Firebase operations
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## Project Structure

```
Boho/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── firebase-config.js # Firebase configuration
│   │   ├── App.tsx          # Main App component
│   │   └── index.css        # Tailwind CSS imports
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/                  # Node.js backend API
│   ├── server.js            # Express server
│   ├── package.json
│   └── .env.example         # Environment variables template
└── README.md
```

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Copy your Firebase config and update `src/firebase-config.js`
   - Enable Authentication (Email/Password, Google, etc.)
   - Set up Firestore Database

4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase Admin SDK credentials
   - Generate a service account key from Firebase Console

4. Start the server:
   ```bash
   npm run dev  # For development with nodemon
   # or
   npm start     # For production
   ```

## Features

- **Authentication**: Firebase-based user authentication
- **Database**: Firestore for data storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging interactions
- **Smooth Scrolling**: Lenis for buttery-smooth page scrolling
- **Modern UI**: Clean, beautiful interface with Lucide icons

## API Endpoints

### Authentication
- `POST /api/auth/verify-token` - Verify Firebase ID tokens

### Database
- `GET /api/data/:collection` - Get all documents from a collection
- `POST /api/data/:collection` - Add a new document to a collection

## Development

The frontend runs on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
