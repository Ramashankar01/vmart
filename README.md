# 🎫 VMart Ticket System

A comprehensive, modern support ticket management system built with **Node.js**, **Express**, **MongoDB**, and **EJS**. This system provides a beautiful, intuitive interface for managing customer support tickets with complete CRUD operations, filtering, and analytics.

## ✨ Features

### 🎯 Core Functionality
- **Create Tickets**: Beautiful form with customer information and ticket details
- **View Tickets**: Comprehensive list view with filtering options
- **Update Tickets**: Edit ticket details and update status/priority
- **Delete Tickets**: Remove tickets with confirmation
- **Dashboard**: Overview with statistics and recent tickets
- **Analytics**: Visual charts showing ticket distribution by status, priority, and category

### 🎨 Design Highlights
- **Modern UI**: Gradient backgrounds, smooth animations, and glassmorphism effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Color-Coded Status**: Visual indicators for different ticket statuses and priorities
- **Interactive Elements**: Hover effects, smooth transitions, and micro-animations
- **Professional Typography**: Inter font for modern, clean aesthetics

### 📊 Ticket Management
- **Auto-generated Ticket IDs**: Format: VMT-XXXXXX
- **Status Tracking**: Open → In Progress → Resolved → Closed
- **Priority Levels**: Low, Medium, High, Critical
- **Categories**: Technical, Billing, Product, Service, Complaint, Other
- **Department Assignment**: IT Support, Customer Service, Sales, Accounts, Operations
- **Timeline Tracking**: Created, Updated, Resolved, and Closed timestamps

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)

### Installation

1. **Install Dependencies**
   ```bash
   cd "c:\Users\Admin\Desktop\RT sytem2\RT system\MainRTystem"
   npm install
   ```

2. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # Windows
   mongod

   # Linux/Mac
   sudo systemctl start mongod
   ```

3. **Initialize Database with Sample Data** (Optional)
   ```bash
   node init/seed.js
   ```
   This will create 10 sample tickets for testing.

4. **Start the Application**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to: `http://localhost:3001`

## 📁 Project Structure

```
MainRTystem/
├── models/
│   └── ticket.js           # Mongoose ticket schema
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Main layout template
│   ├── includes/
│   │   ├── navbar.ejs      # Navigation bar
│   │   └── footer.ejs      # Footer
│   ├── tickets/
│   │   ├── index.ejs       # All tickets list
│   │   ├── new.ejs         # Create new ticket
│   │   ├── show.ejs        # View ticket details
│   │   └── edit.ejs        # Edit ticket
│   ├── dashboard.ejs       # Main dashboard
│   └── analytics.ejs       # Analytics page
├── public/
│   ├── css/
│   │   └── style.css       # Global styles
│   └── js/
│       └── script.js       # Client-side JavaScript
├── init/
│   └── seed.js             # Database initialization
├── app.js                  # Express application
├── package.json            # Dependencies
└── README.md               # This file
```

## 🎨 Color Scheme

- **Primary Gradient**: #667eea → #764ba2 (Purple gradient)
- **Success**: #4CAF50 (Green)
- **Warning**: #FF9800 (Orange)
- **Danger**: #F44336 (Red)
- **Info**: #2196F3 (Blue)

## 📱 Pages & Routes

### Dashboard (`/`)
- Overview statistics (Total, Open, In Progress, Resolved, Closed)
- Recent tickets table
- Quick action buttons

### All Tickets (`/tickets`)
- Filterable list of all tickets
- Filter by Status, Priority, and Category
- Sortable columns
- Quick view actions

### Raise Ticket (`/tickets/new`)
- Comprehensive form with validation
- Customer information section
- Ticket details section
- Category, Priority, and Department selection

### Ticket Details (`/tickets/:id`)
- Full ticket information
- Customer contact details
- Timeline of events
- Edit and Delete actions

### Edit Ticket (`/tickets/:id/edit`)
- Update all ticket fields
- Change status and assignment
- Add notes and updates

### Analytics (`/analytics`)
- Status distribution chart
- Priority distribution chart
- Category distribution chart
- Visual progress bars with percentages

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS with EJS-Mate
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter)

## 📝 Database Schema

```javascript
{
  ticketNumber: String (unique, auto-generated),
  customerName: String (required),
  customerEmail: String (required),
  customerPhone: String (required),
  subject: String (required),
  description: String (required),
  category: String (enum),
  priority: String (enum),
  status: String (enum),
  assignedTo: String,
  department: String (enum),
  notes: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  resolvedAt: Date,
  closedAt: Date
}
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Dashboard |
| GET | `/tickets` | List all tickets (with filters) |
| GET | `/tickets/new` | New ticket form |
| POST | `/tickets` | Create new ticket |
| GET | `/tickets/:id` | View ticket details |
| GET | `/tickets/:id/edit` | Edit ticket form |
| PUT | `/tickets/:id` | Update ticket |
| DELETE | `/tickets/:id` | Delete ticket |
| GET | `/analytics` | Analytics dashboard |

## 🌟 Key Features Explained

### Auto-generated Ticket Numbers
Each ticket gets a unique ID in the format `VMT-XXXXXX` (e.g., VMT-000001, VMT-000002)

### Color-coded Priority System
- 🟢 **Low**: Green
- 🟡 **Medium**: Yellow/Orange
- 🔴 **High**: Red
- ⚠️ **Critical**: Dark Red with pulse animation

### Status Workflow
1. **Open** (Green) - New ticket
2. **In Progress** (Orange) - Being worked on
3. **Resolved** (Blue) - Issue fixed
4. **Closed** (Grey) - Ticket completed

### Advanced Filtering
Filter tickets by:
- Status (Open, In Progress, Resolved, Closed)
- Priority (Low, Medium, High, Critical)
- Category (Technical, Billing, Product, Service, Complaint, Other)

## 🔧 Customization

### Change Color Scheme
Edit `/public/css/style.css` and modify the CSS variables:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... other colors */
}
```

### Add New Categories
Edit `/models/ticket.js`:
```javascript
category: {
    type: String,
    enum: ['Technical', 'Billing', 'YourNewCategory'],
    default: 'Other',
}
```

### Change Port
Edit `/app.js`:
```javascript
const PORT = 3001; // Change to your desired port
```

## 📊 Sample Data

The system comes with 10 pre-configured sample tickets covering:
- Different priorities (Low, Medium, High, Critical)
- All status types (Open, In Progress, Resolved, Closed)
- Various categories (Technical, Billing, Product, etc.)
- Multiple departments

## 🚨 Troubleshooting

### MongoDB Connection Error
```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
mongod
```

### Port Already in Use
```bash
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution**: Kill the process or change the port in `app.js`

### Module Not Found
```bash
Error: Cannot find module 'express'
```
**Solution**: Install dependencies
```bash
npm install
```

## 📄 License

This project is open-source and available for educational and commercial use.

## 👥 Support

For issues or questions:
- Email: support@vmart.com
- Phone: +91 1800-VMART-00

## 🎉 Acknowledgments

Built with modern web technologies and best practices for customer support excellence.

---

**Made with ❤️ for VMart Customer Excellence**
