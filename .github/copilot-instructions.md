# TODO App - Full Stack Development Setup

This project is a complete full-stack TODO application using React, Express, Node.js, and MongoDB.

## Project Overview

**Tech Stack:**
- **Frontend:** React 18 with Axios
- **Backend:** Express.js with Node.js
- **Database:** MongoDB with Mongoose
- **Containerization:** Docker & Docker Compose
- **Styling:** CSS3 with CSS Grid and Flexbox

**Key Features:**
- CRUD operations for TODO items
- Priority levels (Low, Medium, High)
- Due date tracking
- Task completion toggle
- Responsive UI design
- RESTful API architecture

## Setup Instructions

### 1. Prerequisites
- Node.js v16 or higher
- MongoDB (local or MongoDB Atlas)
- Docker & Docker Compose (optional)
- npm or yarn

### 2. Backend Setup
```bash
cd server
cp .env.example .env
npm install
npm run dev  # Starts on port 5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm start  # Starts on port 3000
```

### 4. Docker Setup (Alternative)
```bash
docker-compose up --build
```

## API Documentation

**Base URL:** `http://localhost:5000/api/todos`

- `GET /` - Fetch all todos
- `POST /` - Create a new todo
- `GET /:id` - Get a specific todo
- `PUT /:id` - Update a todo
- `PATCH /:id/toggle` - Toggle completion
- `DELETE /:id` - Delete a todo

## File Structure

```
todo/
├── server/
│   ├── src/
│   │   ├── models/Todo.js
│   │   ├── controllers/todoController.js
│   │   ├── routes/todoRoutes.js
│   │   ├── middleware/errorHandler.js
│   │   └── index.js
│   ├── package.json
│   └── Dockerfile
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.js
│   │   │   ├── TodoForm.js
│   │   │   ├── TodoList.js
│   │   │   └── TodoItem.js
│   │   ├── services/todoService.js
│   │   ├── styles/
│   │   └── index.js
│   ├── public/index.html
│   └── Dockerfile
└── docker-compose.yml
```

## Environment Variables

**Server (.env):**
```
MONGODB_URI=mongodb://localhost:27017/todo-app
PORT=5000
NODE_ENV=development
```

**Client (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running and URI is correct in .env |
| Port 5000/3000 in use | Use `npx kill-port 5000` or `npx kill-port 3000` |
| CORS errors | Check backend is running on 5000 and proxy in client package.json |
| Docker build fails | Run `docker-compose down -v && docker-compose up --build` |

## Development Workflow

1. Start MongoDB service
2. Run backend: `cd server && npm run dev`
3. In new terminal, run frontend: `cd client && npm start`
4. Open browser to `http://localhost:3000`
5. Test API at `http://localhost:5000/api/health`

## Testing

```bash
# Backend health check
curl http://localhost:5000/api/health

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo", "priority":"high"}'
```

## Building for Production

```bash
# Backend
cd server
npm install --production

# Frontend
cd client
npm run build
```

## Deployment

The application can be deployed using:
- Heroku (backend)
- Vercel/Netlify (frontend)
- Docker Hub & AWS/GCP (containerized)

---

**Status:** Development Ready ✅
**Last Updated:** January 2024
