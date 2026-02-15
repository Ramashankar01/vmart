const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
    // Ticket ID (auto-generated)
    ticketNumber: {
        type: String,
        unique: true
    },

    // Customer Information
    customerName: {
        type: String,
        required: true,
    },

    customerEmail: {
        type: String,
        required: true,
    },

    customerPhone: {
        type: String,
        required: true,
    },

    // Ticket Details
    subject: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        enum: ['Technical', 'Billing', 'Product', 'Service', 'Complaint', 'Other'],
        default: 'Other',
    },

    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium',
    },

    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open',
    },

    // Assignment
    assignedTo: {
        type: String,
        default: 'Unassigned',
    },

    department: {
        type: String,
        enum: ['IT Support', 'Customer Service', 'Sales', 'Accounts', 'Operations'],
        default: 'Customer Service',
    },

    // Additional Information
    attachments: {
        type: [String],
        default: [],
    },

    notes: {
        type: String,
        default: '',
    },

    tags: {
        type: [String],
        default: [],
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },

    resolvedAt: {
        type: Date,
    },

    closedAt: {
        type: Date,
    },
});

// Generate ticket number before saving
ticketSchema.pre('save', async function (next) {
    if (!this.ticketNumber) {
        const count = await mongoose.model('Ticket').countDocuments();
        this.ticketNumber = `VMT-${String(count + 1).padStart(6, '0')}`;
    }
    next();
});

// Update timestamp on save
ticketSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Ticket", ticketSchema);
