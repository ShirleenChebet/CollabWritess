# CollabWritess
CollabWrites is a collaborative book-writing platform that allows multiple authors to contribute chapters, vote on submissions, and provide feedback. It features a structured API built with Flask-RESTful and a React frontend.

## Features
- 📚 **Book Management**: Authors can create and manage books.
- ✍️ **Chapter Submission**: Users can submit chapters to books.
- 👍 **Voting System**: Users can upvote/downvote chapters, with the highest-voted chapter being recommended.
- 📝 **Feedback System**: Users can provide feedback on books with ratings.
- 🌐 **Seamless Frontend-Backend Interaction**: Built with Flask-RESTful and React, ensuring smooth communication via Axios.
- 🚀 **Deployment-Ready**: Configured for deployment on Render.

## Tech Stack
### Backend:
- Flask & Flask-RESTful
- SQLAlchemy & Flask-Migrate
- Marshmallow (for validation)
- Flask-CORS

### Frontend:
- React (with Axios for API calls)
- Formik (for forms & validation)
- Tailwind CSS (for styling)

---

## Getting Started
### **1️⃣ Clone the Repository**
```bash
# Clone the repo
git clone https://github.com/ShirleenChebet/CollabWrites.git
cd CollabWrites
```

### **2️⃣ Backend Setup**
#### Install Dependencies
```bash
cd server  # Navigate to the backend directory
pipenv install  # Install dependencies using Pipenv
pipenv shell  # Activate virtual environment
```

#### Initialize the Database
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

#### Run the Backend
```bash
flask run  # Starts the Flask server on http://127.0.0.1:5000
```

---

### **3️⃣ Frontend Setup**
#### Install Dependencies
```bash
cd ../client  # Navigate to the frontend directory
npm install  # Install dependencies
```

#### Run the Frontend
```bash
npm start  # Starts React on http://localhost:3002
```

---

## API Endpoints
### **Books**
| Method | Endpoint          | Description          |
|--------|------------------|----------------------|
| GET    | `/books`         | Get all books       |
| POST   | `/books`         | Create a new book   |
| GET    | `/books/:id`     | Get a single book   |

### **Chapters**
| Method | Endpoint                          | Description                 |
|--------|----------------------------------|-----------------------------|
| GET    | `/books/:book_id/chapters`      | Get all chapters of a book |
| POST   | `/books/:book_id/chapters`      | Add a new chapter          |

### **Voting**
| Method | Endpoint    | Description         |
|--------|------------|---------------------|
| POST   | `/vote`    | Vote on a chapter   |

---

## Deployment on Render
### **1️⃣ Backend Deployment**
1. Create a new Flask app on Render.
2. Add `requirements.txt` and `start command`: `gunicorn app:app`
3. Set environment variables for the database.

### **2️⃣ Frontend Deployment**
1. Deploy React on Vercel or Netlify.
2. Update API URLs in `.env`.

---

## 🛠 Troubleshooting
### **Common Issues & Fixes**
1. **404 Errors on API Requests**
   - Ensure Flask is running on `http://127.0.0.1:5000`
   - Use `cors` to allow frontend requests
   - Check if API routes are correctly set up

2. **Database Issues**
   - Run `flask db upgrade` to apply migrations
   - Ensure `db.create_all()` is executed in `app.py`

3. **Frontend Not Fetching Data**
   - Ensure Axios requests point to the correct backend URL
   - Restart the frontend with `npm start`

---

## 👨‍💻 Contributors
- SHIRLEEN CHEBET

## 📜 License
This project is licensed under the MIT License.

---

Happy Coding! 🎉
