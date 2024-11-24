# Bicycle Store API (B4A2V4)

This is a RESTful API for a Bicycle Store built using **Express** and **TypeScript**. The API allows for managing products (bicycles) and orders, providing a set of CRUD operations. MongoDB is used for data storage, with **Mongoose** for schema definition and data manipulation. The application includes features like inventory management and order processing.

## Features

- **Manage Bicycles**: Add, update, retrieve, and delete bicycle products.
- **Order Management**: Place orders, update inventory, and track orders.
- **Revenue Calculation**: Calculate total revenue from all orders using MongoDB aggregation.
- **Data Validation**: Mongoose schema validation to ensure data integrity.
- **Search**: Filter bicycles by name, brand, or type.

## Technology Stack

- **Backend**: Express.js (Node.js)
- **Database**: MongoDB
- **ODM**: Mongoose
- **Language**: TypeScript

## Project Setup

### Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud service like MongoDB Atlas)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:altaj1/bi-cycle-store.git
