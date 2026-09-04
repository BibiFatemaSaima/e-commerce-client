# E-Commerce Platform

A full-stack E-Commerce Platform built with the MERN stack. Users can browse products, search and filter products, add items to the cart, checkout using Stripe, place orders, and track order status. Admins can manage products and customer orders from the dashboard.

## Features

* User Registration and Login
* Customer and Admin role management
* Product catalog
* Product search
* Category filtering
* Price sorting
* Pagination
* Product details page
* Product image gallery
* Product reviews and ratings
* Shopping cart
* Increase/decrease cart quantity
* Remove products from cart
* Cart persistence using localStorage
* Stripe test payment integration
* Order creation
* Automatic stock decrease after successful order
* Customer order history
* Order status tracking
* Admin dashboard
* Add products
* Edit products
* Delete products
* Manage customer orders
* Update order status
* Responsive design

## Technologies Used

### Frontend

* React.js
* React Router
* Tailwind CSS
* DaisyUI
* Firebase Authentication
* Stripe.js
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js
* MongoDB
* Stripe
* CORS
* dotenv

### Deployment

* Client: Netlify
* Server: Vercel
* Database: MongoDB Atlas
* Authentication: Firebase

## Project Structure

```text
e-commerce-client/
├── src/
│   ├── component/
│   ├── context/
│   ├── firebase/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Home/
│   │   └── orders/
│   ├── router/
│   └── main.jsx
├── public/
├── .gitignore
├── package.json
└── README.md
```

## Admin Dashboard

The admin dashboard provides:

* Total products count
* Total orders count
* Total users count
* Add new products
* Manage products
* Edit products
* Delete products
* Manage customer orders
* Update order status

## Order Status

Admins can update order status using:

* Pending
* Processing
* Shipped
* Delivered
* Cancelled

## Stripe Test Payment

This project uses Stripe in test mode.

### Test Card

* Card Number: `4242 4242 4242 4242`
* Expiry Date: Any future date
* CVC: Any 3 digits
* ZIP: Any valid ZIP code

Do not use real card information while testing.

## Environment Variables

Create a `.env` file in the client project and add the Firebase and Stripe configuration.

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Never upload the real `.env` file or secret keys to GitHub.

## Live Website

YOUR_NETLIFY_LIVE_URL

## Server Repository

YOUR_SERVER_GITHUB_REPOSITORY_URL

## Server API

YOUR_VERCEL_SERVER_URL

## Admin Credentials

Admin Email: YOUR_ADMIN_EMAIL

Admin Password: YOUR_ADMIN_PASSWORD

## Installation

### Clone the Repository
git clone YOUR_CLIENT_GITHUB_REPOSITORY_URL
### Go to the Project Directory
cd e-commerce-client
### Install Dependencies
npm install
### Run the Development Server
npm run dev

The application will run locally using Vite.

## Author

**Bibi Fatema Saima**

MERN Stack Developer
