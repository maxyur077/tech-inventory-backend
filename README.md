# 🚀 Tech Inventory Backend API

A robust Node.js REST API for managing tech product inventory with JWT authentication, SQLite database support, and comprehensive CRUD operations.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Security Features](#security-features)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### 🔐 Authentication & Security

- **JWT-based Authentication** with secure token management
- **Password Hashing** using bcryptjs (12 rounds)
- **Input Validation** using Joi schemas
- **CORS Protection** with configurable origins
- **Request Rate Limiting** to prevent abuse
- **SQL Injection Prevention** via Sequelize ORM

### 📦 Product Management

- **CRUD Operations** - Create, Read, Update, Delete products
- **Advanced Filtering** - Search by name, category, price range
- **Pagination Support** - Efficient data retrieval
- **Stock Management** - Track inventory levels
- **Soft Delete** - Mark products as inactive instead of deletion
- **Category Management** - Organize products by categories

### 👥 User Management

- **User Registration** with validation
- **Secure Login** with credentials verification

### 🗄️ Database Features

- **MySQL Database** – Relational RDBMS with robust performance and scalability

## 🛠️ Technology Stack

| Component            | Technology | Version |
| -------------------- | ---------- | ------- |
| **Runtime**          | Node.js    | v24.2.0 |
| **Framework**        | Express.js | v4.18+  |
| **Database**         | SQLite     | Latest  |
| **ORM**              | Sequelize  | v6.32+  |
| **Authentication**   | JWT        | v9.0+   |
| **Validation**       | Joi        | v17.9+  |
| **Password Hashing** | bcryptjs   | v2.4+   |
| **Environment**      | dotenv     | v16.3+  |

## 🚀 Installation

### Prerequisites

- **Node.js** (v24.2.0 - Latest LTS recommended)
- **npm** or **yarn**
- **No database server required** (SQLite is file-based)

### Step 1: Clone Repository

git clone https://github.com/yourusername/tech-inventory-backend

cd tech-inventory-backend

### Step 2: Install Dependencies

npm install

### Step 3: Environment Setup

cp .env.example .env

Edit `.env` file with your configuration:

### Step 4: Database Setup

### step 5:Run the code

node server.js

### To Run The Test case

npm test
