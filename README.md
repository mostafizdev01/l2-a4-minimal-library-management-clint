# 📚 Minimal Library Management System

A clean and minimal Library Management System built with **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, and **Tailwind CSS**. Users can manage books, perform borrow operations, and view borrowing summaries — all without authentication or payment integration.

---

## 🚀 Project Overview

This system demonstrates a fully functional client-side app that communicates with a RESTful API using RTK Query. It supports:

- 📖 Viewing a book list
- 🛠️ Full book CRUD
- 📦 Borrowing books
- 📊 Borrow summary reports

All operations are public, lightweight, and optimized for speed and simplicity.

---

## 🧩 Features

### 1. Public Routes 🚪
- No login/authentication needed
- All features accessible publicly

### 2. Book Management 📚
- **List View**: Title, Author, Genre, ISBN, Copies, Availability
- **Actions**:
  - ✏️ Edit (with form pre-filled)
  - ❌ Delete (with confirmation)
  - 📥 Borrow Book (form modal)
- **Add Book**:
  - Form with title, author, genre, ISBN, description, copies
  - Redirects to book list and auto updates on submit
- **Business Logic**:
  - Copies set to 0 → auto marks book as unavailable

### 3. Borrow Book ✅
- **Form** with quantity and due date
- **Rules**:
  - Quantity ≤ available copies
  - When copies = 0, book becomes unavailable
- **Post-Submit**:
  - Success toast
  - Redirects to borrow summary

### 4. Borrow Summary 📊
- Aggregated list from backend
- Columns: Book Title, ISBN, Total Quantity Borrowed

---

## 📄 Page Routes

| Route                | Description                                  |
|----------------------|----------------------------------------------|
| `/books`             | View all books with actions                  |
| `/create-book`       | Form to create a new book                    |
| `/books/:id`         | View single book details                     |
| `/edit-book/:id`     | Edit existing book                           |
| `/borrow/:bookId`    | Borrow selected book                         |
| `/borrow-summary`    | View borrow summary from all users           |

---

## 🧠 Tech Stack

| Layer        | Technology                             |
|--------------|-----------------------------------------|
| Frontend     | React, TypeScript                      |
| Styling      | Tailwind CSS                           |
| State        | Redux Toolkit, RTK Query               |
| Backend      | Node.js, Express.js                    |
| Database     | MongoDB, Mongoose                      |

---

## 🔁 RTK Query Cache Management

Using `tagTypes` for smart cache updates:

```ts
tagTypes: ["book", "borrow"]
