const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Ticket = require("./models/ticket");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/vmart_tickets";
app.use(express.static(path.join(__dirname, "/public")));

// MongoDB connection
main()
    .then(() => console.log("✅ Connected to VMart Ticket DB"))
    .catch((err) => console.log("❌ DB Connection Error:", err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==================== ROUTES ====================

// Home route - Dashboard
app.get("/", async (req, res) => {
    const tickets = await Ticket.find({}).sort({ createdAt: -1 });

    // Calculate statistics
    const stats = {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'Open').length,
        inProgress: tickets.filter(t => t.status === 'In Progress').length,
        resolved: tickets.filter(t => t.status === 'Resolved').length,
        closed: tickets.filter(t => t.status === 'Closed').length,
        high: tickets.filter(t => t.priority === 'High').length,
        medium: tickets.filter(t => t.priority === 'Medium').length,
        low: tickets.filter(t => t.priority === 'Low').length
    };

    res.render("dashboard", { tickets, stats });
});

// All tickets route
app.get("/tickets", async (req, res) => {
    const { status, priority, category } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    res.render("tickets/index", { tickets, filter });
});

// New ticket form
app.get("/tickets/new", (req, res) => {
    res.render("tickets/new");
});

// Create ticket
app.post("/tickets", async (req, res) => {
    const newTicket = new Ticket(req.body.ticket);
    await newTicket.save();
    res.redirect("/tickets");
});

// View single ticket
app.get("/tickets/:id", async (req, res) => {
    let { id } = req.params;
    const ticket = await Ticket.findById(id);
    res.render("tickets/show", { ticket });
});

// Edit ticket form
app.get("/tickets/:id/edit", async (req, res) => {
    let { id } = req.params;
    const ticket = await Ticket.findById(id);
    res.render("tickets/edit", { ticket });
});

// Update ticket
app.put("/tickets/:id", async (req, res) => {
    let { id } = req.params;
    await Ticket.findByIdAndUpdate(id, req.body.ticket);
    res.redirect(`/tickets/${id}`);
});

// Delete ticket
app.delete("/tickets/:id", async (req, res) => {
    let { id } = req.params;
    await Ticket.findByIdAndDelete(id);
    res.redirect("/tickets");
});

// Analytics page
app.get("/analytics", async (req, res) => {
    const tickets = await Ticket.find({});
    res.render("analytics", { tickets });
});

// Server - Only start if not in Vercel environment
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🎫 VMart Ticket System running on http://localhost:${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
