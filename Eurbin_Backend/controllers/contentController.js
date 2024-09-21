const Content = require('../models/content');

// Get all plastic bottles
exports.getAllContents = async (req, res) => {
    try {
        const content = await Content.find();
        res.status(200).json({ message: 'Successfully retrieved data', content });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new plastic bottle entry
exports.createContent = async (req, res) => {
    const maxContent = await Content.findOne().sort({ contentId: -1 }).exec();
    const newContentId = maxContent ? maxContent.contentId + 1 : 1;

    const {  subject, description} = req.body;

    const now = new Date();
    const adjustedDate = new Date(now.getTime() + (8 * 60 * 60 * 1000));


    const newContent = new Content({ contentId: newContentId, subject, description, date: adjustedDate  });
    try {
        const content = await newContent.save();
        res.status(201).json(content);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
