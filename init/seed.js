const mongoose = require("mongoose");
const Ticket = require("./models/ticket");

const MONGO_URL = "mongodb://localhost:27017/vmart_tickets";

// Sample tickets data
const sampleTickets = [
    {
        customerName: "Rajesh Kumar",
        customerEmail: "rajesh.kumar@example.com",
        customerPhone: "+91 9876543210",
        subject: "Product delivery delayed",
        description: "I ordered a smartphone 5 days ago but haven't received any update on the delivery status. Order ID: VMT-12345. Please help me track my order.",
        category: "Product",
        priority: "High",
        status: "Open",
        department: "Customer Service",
        assignedTo: "Priya Sharma"
    },
    {
        customerName: "Sneha Patel",
        customerEmail: "sneha.patel@example.com",
        customerPhone: "+91 9876543211",
        subject: "Incorrect billing amount",
        description: "I was charged ₹15,000 instead of ₹12,000 for my recent purchase. I have attached the invoice and payment receipt. Please correct this error and process the refund.",
        category: "Billing",
        priority: "Critical",
        status: "In Progress",
        department: "Accounts",
        assignedTo: "Amit Singh",
        notes: "Refund processing initiated. Expected completion in 3-5 business days."
    },
    {
        customerName: "Mohammed Hussain",
        customerEmail: "mohammed.h@example.com",
        customerPhone: "+91 9876543212",
        subject: "Website login issue",
        description: "Unable to login to my VMart account. Getting 'Invalid credentials' error even though I'm using the correct password. Tried password reset but not receiving the email.",
        category: "Technical",
        priority: "Medium",
        status: "Resolved",
        department: "IT Support",
        assignedTo: "Rahul Verma",
        notes: "Issue was related to cached cookies. User was guided to clear browser cache and reset password successfully.",
        resolvedAt: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
        customerName: "Anita Desai",
        customerEmail: "anita.desai@example.com",
        customerPhone: "+91 9876543213",
        subject: "Product quality complaint",
        description: "The laptop I received has a defective keyboard. Some keys are not working properly. I would like to return this product and get a replacement.",
        category: "Complaint",
        priority: "High",
        status: "In Progress",
        department: "Customer Service",
        assignedTo: "Vikram Joshi"
    },
    {
        customerName: "Suresh Iyer",
        customerEmail: "suresh.iyer@example.com",
        customerPhone: "+91 9876543214",
        subject: "Inquiry about warranty extension",
        description: "I want to extend the warranty on my refrigerator purchased 2 years ago. Please let me know the process and cost for warranty extension.",
        category: "Service",
        priority: "Low",
        status: "Closed",
        department: "Customer Service",
        assignedTo: "Meera Nair",
        notes: "Customer was provided with warranty extension options and pricing. Customer decided to proceed with 1-year extension plan.",
        resolvedAt: new Date(Date.now() - 172800000), // 2 days ago
        closedAt: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
        customerName: "Pooja Reddy",
        customerEmail: "pooja.reddy@example.com",
        customerPhone: "+91 9876543215",
        subject: "Payment gateway error",
        description: "Transaction failed but amount was debited from my account. Transaction ID: TXN789456123. Please refund the amount or complete my order.",
        category: "Technical",
        priority: "Critical",
        status: "Open",
        department: "IT Support",
        assignedTo: "Unassigned"
    },
    {
        customerName: "Vikash Goel",
        customerEmail: "vikash.goel@example.com",
        customerPhone: "+91 9876543216",
        subject: "Request for invoice correction",
        description: "My company name is incorrectly mentioned in the invoice. Please update it to 'Goel Industries Pvt Ltd' for GST claim purposes.",
        category: "Billing",
        priority: "Medium",
        status: "Resolved",
        department: "Accounts",
        assignedTo: "Kavita Mehta",
        resolvedAt: new Date(Date.now() - 43200000) // 12 hours ago
    },
    {
        customerName: "Lakshmi Narayan",
        customerEmail: "lakshmi.n@example.com",
        customerPhone: "+91 9876543217",
        subject: "Product recommendation needed",
        description: "I need help choosing the right air conditioner for my 200 sq ft room. Please suggest suitable models within ₹30,000 budget.",
        category: "Other",
        priority: "Low",
        status: "Open",
        department: "Sales",
        assignedTo: "Rohan Kapoor"
    },
    {
        customerName: "Arjun Malhotra",
        customerEmail: "arjun.m@example.com",
        customerPhone: "+91 9876543218",
        subject: "Installation service delay",
        description: "Scheduled AC installation for today 10 AM but technician hasn't arrived yet. It's already 2 PM. Please provide status update urgently.",
        category: "Service",
        priority: "High",
        status: "In Progress",
        department: "Operations",
        assignedTo: "Sanjay Rao",
        notes: "Technician was delayed due to traffic. Rescheduled for tomorrow morning 9 AM."
    },
    {
        customerName: "Divya Krishnan",
        customerEmail: "divya.k@example.com",
        customerPhone: "+91 9876543219",
        subject: "Promotional code not working",
        description: "I'm trying to use the code 'VMART50' for 50% off but it shows 'Invalid coupon code'. The offer is valid till today according to your website.",
        category: "Technical",
        priority: "Medium",
        status: "Resolved",
        department: "IT Support",
        assignedTo: "Neha Gupta",
        notes: "Coupon was case-sensitive. User was guided to use correct code format 'vmart50'. Order placed successfully.",
        resolvedAt: new Date(Date.now() - 7200000) // 2 hours ago
    }
];

async function initializeDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URL);
        console.log("✅ Connected to MongoDB");

        // Clear existing tickets
        await Ticket.deleteMany({});
        console.log("🗑️  Cleared existing tickets");

        // Insert sample tickets
        const tickets = await Ticket.insertMany(sampleTickets);
        console.log(`✅ Added ${tickets.length} sample tickets`);

        console.log("\n📊 Sample Tickets Summary:");
        console.log("━".repeat(50));
        tickets.forEach(ticket => {
            console.log(`${ticket.ticketNumber} | ${ticket.customerName} | ${ticket.status} | ${ticket.priority}`);
        });
        console.log("━".repeat(50));

        console.log("\n✨ Database initialization complete!");
        console.log("🚀 You can now start the application with: npm start");

    } catch (err) {
        console.error("❌ Error initializing database:", err);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
    }
}

// Run initialization
initializeDatabase();
