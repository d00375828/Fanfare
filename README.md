# Fanfare - Stadium to Your Seat Delivery

Fanfare is a stadium delivery service that brings food and merchandise directly to fans' seats, enhancing the stadium experience by eliminating the need to miss any of the action.

### App Demo: https://youtu.be/p7fair9B1kc
### Figma Mockups: https://www.figma.com/design/dvcYxIBvOTaJjTIaI4QjDf/Fanfare?node-id=0-1&p=f&t=VOBV33czYhVW0HD2-0


## Project Overview

This project consists of two web applications:
1. **Client App** - For customers to place and manage orders
2. **Admin App** - For staff to manage items and fulfill orders

## Features

### Client Application
- Browse available food and merchandise
- Place orders for in-seat delivery
- Track order status in real-time
- Confirm orders upon delivery
- Cancel orders if needed

### Admin Application
- Create, edit, and delete menu items
- View incoming orders
- Mark orders as delivered
- Manage inventory

## Technology Stack

- **Frontend**: Vue.js
- **Backend**: Express.js
- **Database**: MongoDB

## Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- MongoDB

### Backend Setup
1. Clone the repository
2. Navigate to the server directory
3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=your_preferred_port
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Start the server:
   ```
   node server.js
   ```

### Client App Setup
1. Navigate to the client directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Access the client application at `http://localhost:3001`

### Admin App Setup
1. Navigate to the admin directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Access the admin application at `http://localhost:5173`

## Usage

### For Customers
1. Enter Section & Seat #
2. Browse the available items
3. Choose an item for delivery
4. Comfirm checkout
5. Track order status

### For Admins
1. Manage inventory (add/edit/remove items)
2. View new orders
3. Accept orders for delivery
4. Mark orders as delivered
5. Decline orders if needed

## Development

### Project Structure
```
fanfare/
├── server/           # Backend API
├── client/           # Customer-facing application
└── admin/            # Admin dashboard
```

# API Endpoints
## Item Endpoints

| Route | Method | Usage |
|-------|--------|-------|
| `/item` | GET | Get all items in inventory |
| `/item` | POST  | Create a new item with name, quantity, description |
| `/item/:id` | PUT  | Update only the quantity of an existing item |
| `/item/update/:id` | PUT | Update all details (name, quantity, description) of an item |
| `/item/:id` | DELETE | Remove an item from inventory |

## Order Endpoints

| Route | Method | Usage |
|-------|--------|-------|
| `/order` | GET  | Get all orders in the system |
| `/order` | POST  | Create a new order with section, seat, and item info |
| `/order/accept/:id` | PUT  | Mark an order as accepted by admin |
| `/order/complete/:id` | PUT  | Mark an order as completed with updated status |

# Database Schema

## Item Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | String | Yes | - | Name of the item |
| `quantity` | Number | Yes | - | Available quantity in inventory |
| `description` | String | Yes | - | Description of the item |

## Order Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `section` | String | Yes | - | Stadium section number/code |
| `seat` | String | Yes | - | Seat number/location |
| `item` | String | Yes | - | Item being ordered |
| `date` | Date | No | Current date | When the order was placed |
| `isAccepted` | Boolean | No | `false` | Whether admin has accepted the order |
| `isCompleted` | Boolean | No | `false` | Whether order has been delivered |
| `status` | String | No | - | Current status of the order |