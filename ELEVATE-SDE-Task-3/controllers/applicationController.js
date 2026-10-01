const Application = require("../models/Application");
const Certificate = require("../models/Certificate");


// ===============================
// CREATE APPLICATION
// ===============================
const createApplication = async (req, res) => {
    try {
        const { name, phone, gender, city, state } = req.body;

        if (!name || !phone || !gender || !city || !state) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const applicationId = `APP-${Date.now()}`;

        const application = await Application.create({
            applicationId,
            name,
            phone,
            gender,
            city,
            state,
            status: "Pending"
        });

        res.status(201).json({
            success: true,
            message: "Certificate request submitted successfully",
            applicationId: application.applicationId,
            status: application.status
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create application",
            error: error.message
        });
    }
};


// ===============================
// TRACK APPLICATION
// ===============================
const trackApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await Application.findOne({
            applicationId: applicationId
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        res.status(200).json({
            success: true,
            applicationId: application.applicationId,
            name: application.name,
            status: application.status,
            submittedAt: application.submittedAt
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to track application",
            error: error.message
        });
    }
};


// ===============================
// APPROVE APPLICATION
// ===============================
const approveApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await Application.findOne({
            applicationId: applicationId
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        if (application.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: `Application is already ${application.status}`
            });
        }

        // Change application status
        application.status = "Approved";
        await application.save();

        // Generate unique certificate ID
        const certificateId = `CERT-${Date.now()}`;

        // Create certificate
        const certificate = await Certificate.create({
            certificateId: certificateId,
            applicationId: application.applicationId,
            status: "Valid"
        });

        res.status(200).json({
            success: true,
            message: "Application approved and certificate issued",
            applicationId: application.applicationId,
            status: application.status,
            certificateId: certificate.certificateId
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to approve application",
            error: error.message
        });
    }
};


// ===============================
// REJECT APPLICATION
// ===============================
const rejectApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await Application.findOne({
            applicationId: applicationId
        });

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        if (application.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: `Application is already ${application.status}`
            });
        }

        // Change application status
        application.status = "Rejected";
        await application.save();

        res.status(200).json({
            success: true,
            message: "Application rejected",
            applicationId: application.applicationId,
            status: application.status
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to reject application",
            error: error.message
        });
    }
};


// ===============================
// EXPORT FUNCTIONS
// ===============================
module.exports = {
    createApplication,
    trackApplication,
    approveApplication,
    rejectApplication
};