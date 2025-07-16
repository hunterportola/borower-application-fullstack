// In backend/controllers/loanController.js
const store = require('../database');

exports.submitApplication = async (req, res) => {
    // We expect the entire Redux state to be sent in the request body
    const applicationData = req.body;

    // You would get the userId from your authentication token in a real app
    // For now, we'll use a placeholder
    const userId = req.user ? req.user.userId : 'placeholder-user-id';

    if (!applicationData) {
        return res.status(400).json({ message: 'No application data received.' });
    }

    const session = store.openSession();
    try {
        const newApplication = {
            ...applicationData,
            userId: userId,           // Link the application to the user
            submittedAt: new Date(),  // Add a timestamp
            status: 'pending',        // Set an initial status
            '@metadata': {
                '@collection': 'Applications' // Explicitly save to the 'Applications' collection
            }
        };

        await session.store(newApplication);
        await session.saveChanges();

        res.status(201).json({ 
            message: 'Application submitted successfully!', 
            applicationId: newApplication.id 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error while submitting application.', error: error.message });
    }
};