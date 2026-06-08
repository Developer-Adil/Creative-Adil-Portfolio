const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
})
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB connection error:", error));

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["New Lead", "Contacted", "In Progress", "Completed", "Rejected"],
      default: "New Lead",
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
  res.send("Creative Adil Portfolio Backend Running");
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, phone, service, message } = req.body;

    if (!name || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = await Contact.create({
      name,
      phone,
      service,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been saved successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while saving contact",
      error: error.message,
    });
  }
});

app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching leads",
      error: error.message,
    });
  }
});

app.patch("/api/leads/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "New Lead",
      "Contacted",
      "In Progress",
      "Completed",
      "Rejected",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updatedLead = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating status",
      error: error.message,
    });
  }
});

app.delete("/api/leads/:id", async (req, res) => {
  try {
    const deletedLead = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting lead",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});