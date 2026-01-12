# TODO App - Full Stack Application

A complete full-stack TODO application built with modern web technologies: React, Express, Node.js, and MongoDB.

## Features

- Create, read, update, and delete TODOs
- Set priorities (Low, Medium, High) for tasks
- Add due dates to tasks
- Mark tasks as completed
- Real-time updates
- Responsive design (desktop and mobile)
- Modern UI with smooth animations

## Project Structure

```
todo/
├── server/                 # Backend (Express + Node.js + MongoDB)
│   ├── src/
│   │   ├── models/        # MongoDB schemas
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── index.js       # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── styles/        # CSS files
│   │   └── index.js       # React entry point
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml     # Docker Compose configuration
└── README.md
## Quick Folder Summary

- `client/`: Frontend React app. Holds UI state (the `todos` array, loading/error flags, `editingTodo`) and components (`App.js` is the main state manager; `TodoForm.js` handles form inputs; `services/todoService.js` performs HTTP requests).
- `server/`: Backend Express app. Persists todo documents in MongoDB via Mongoose (`models/Todo.js`) and exposes CRUD API endpoints through controllers and routes.
- Root files: `docker-compose.yml`, `README.md`, and Dockerfiles — orchestration and documentation for running the full stack.

```

## Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or cloud)
- Docker & Docker Compose (optional)

### Option 1: Local Development

#### 1. Start MongoDB
```bash
# Using local MongoDB
mongod

# OR using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### 2. Setup Backend
```bash
cd server
cp .env.example .env

# Update .env with your MongoDB URI if needed
npm install
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Setup Frontend (in a new terminal)
```bash
cd client
npm install
npm start
```

Frontend will run on `http://localhost:3000`

### Option 2: Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Services will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

## API Endpoints

### Base URL: `/api/todos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all todos |
| GET | `/:id` | Get a specific todo |
| POST | `/` | Create a new todo |
| PUT | `/:id` | Update a todo |
| PATCH | `/:id/toggle` | Toggle todo completion status |
| DELETE | `/:id` | Delete a todo |

### Example Request
```json
POST /api/todos
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "dueDate": "2024-01-15"
}
```

## Environment Variables

### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/todo-app
PORT=5000
NODE_ENV=development
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **cors**: Cross-origin resource sharing
- **body-parser**: Parse incoming request bodies
- **dotenv**: Environment variables management
- **nodemon**: Development auto-reload (dev)

### Frontend
- **react**: UI library
- **axios**: HTTP client
- **react-scripts**: Build configuration

## Features Implementation

### Backend Features
- RESTful API with Express
- MongoDB integration with Mongoose
- Error handling middleware
- Request validation
- CORS support

### Frontend Features
- React hooks (useState, useEffect)
- Axios for API calls
- Component-based architecture
- Responsive CSS Grid layout
- Priority color coding
- Task filtering (Pending/Completed)

## TODO Model

```javascript
{
  title: String (required, max 100),
  description: String (max 500),
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Development Workflow

1. **Create todos** with title, description, priority, and due date
2. **View todos** organized by completion status
3. **Toggle completion** with checkbox
4. **Edit todos** (can be extended in components)
5. **Delete todos** with confirmation
6. **Filter/Sort** by priority, due date, or status

## Running Tests

```bash
# Backend (setup needed)
cd server
npm test

# Frontend
cd client
npm test
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or `docker run -d -p 27017:27017 mongo`
- Check `MONGODB_URI` in `.env`

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### CORS Issues
- Ensure backend runs on port 5000
- Frontend proxy is set to `http://localhost:5000` in `package.json`

### Docker Issues
```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild
docker-compose up --build
```

## Deployment

### Deploy to Heroku
```bash
# Backend
cd server
heroku create your-app-name
git push heroku main

# Frontend
cd client
# Use Vercel, Netlify, or similar services
```

### Deploy with Docker
```bash
docker build -t todo-app .
docker run -p 5000:5000 -p 3000:3000 todo-app
```

## Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

Happy coding! 🎉
