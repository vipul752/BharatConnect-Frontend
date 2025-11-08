# LinkedIn Clone - Frontend

A full-featured LinkedIn clone frontend built with React, Redux Toolkit, and Tailwind CSS.

## Features

- ✅ User Authentication (Sign Up / Sign In)
- ✅ Protected Routes with Redux state management
- ✅ Create, Read, Update, Delete Posts
- ✅ User Profile with personal posts
- ✅ Home Feed with all posts
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive Design
- ✅ Redux Toolkit for state management
- ✅ React Router for navigation

## Tech Stack

- **React 19** - UI Library
- **Redux Toolkit** - State Management
- **React Router** - Routing
- **Axios** - API calls
- **Tailwind CSS 4** - Styling
- **Vite 7** - Build tool
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Backend server running on http://localhost:8080

### Installation & Running

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── CreatePost.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── PostCard.jsx
│   └── ProtectedRoute.jsx
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Profile.jsx
│   ├── SignIn.jsx
│   └── SignUp.jsx
├── store/            # Redux store
│   ├── authSlice.js
│   ├── postsSlice.js
│   └── store.js
├── utils/            # Utilities
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```

## API Integration

The frontend connects to the backend API at `http://localhost:8080/api/v1`

### Endpoints Used:
- **Auth**: `/users/sign-up`, `/users/sign-in`, `/users/:id`
- **Posts**: `/posts`, `/posts/my-posts`, `/posts/:id`

## Environment

Update API URL in `src/utils/api.js` if needed:
```javascript
baseURL: 'http://localhost:8080/api/v1'
```
