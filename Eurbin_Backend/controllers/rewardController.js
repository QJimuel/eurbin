const Reward = require('../models/reward');
const multer = require('multer');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const User = require('../models/user');
const nodemailer = require('nodemailer'); 

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // or your provider's host
    port: 465,
    secure: true, // You can use other email services
    auth: {
        user: "eurbinmmq@gmail.com",
        pass: "mwqy dmwx myrn ngny",
    },
});

// Configure AWS S3 Client
// Configure AWS S3 Client
const s3 = new S3Client({
    region: 'ap-southeast-2',  // Load from environment variables
    credentials: {
        accessKeyId: 'AKIAWMFUPPJEGS5A25OL', // Load from environment variables
        secretAccessKey: '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', // Load from environment variables
    },
});

// Set up multer to upload images to S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'rurbin-reward-and-profile-images', // Your S3 bucket name
       
        key: (req, file, cb) => {
            const uniqueFilename = Date.now().toString() + path.extname(file.originalname); // Generate a unique filename
            cb(null, uniqueFilename);
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// Get all rewards
exports.getAllRewards = async (req, res) => {
    try {
        const rewards = await Reward.find();
        console.log("Retrieved all rewards");

        res.status(200).json({ message: 'Successfully retrieved data', rewards });
    } catch (err) {
        console.error("Error retrieving rewards:", err);
        res.status(500).json({ error: 'An error occurred while fetching rewards.' });
    }
};

// Get reward by ID
exports.getRewardById = async (req, res) => {
    try {
        const reward = await Reward.findById(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json(reward);
    } catch (err) {
        console.error("Error fetching reward by ID:", err);
        res.status(500).json({ error: 'An error occurred while fetching the reward.' });
    }
};

// Function to send notification emails
async function notifyAddedReward(reward) {
    try {
        const users = await User.find(); // Fetch all users
        const usersEmail = users.map(user => user.email);

        if (usersEmail.length > 0) {
            const mailOptions = {
                from: '"Eurbin Team" <eurbinmmq@gmail.com>',
                to: usersEmail.join(','), // Email all users
                subject: `New Reward Added: ${reward.RewardName}`,
                html: `
                    <h1>New Reward Available!</h1>
                    <p>We are excited to announce a new reward has been added to our collection.</p>
                    <ul>
                        <li><strong>Reward Name:</strong> ${reward.RewardName}</li>
                        <li><strong>Price:</strong> ${reward.Price}</li>
                        <li><strong>Quantity:</strong> ${reward.Quantity}</li>
                    </ul>
                    <p>Don't miss out! Check the app now to redeem this amazing reward.</p>
                    <p>Best Regards,<br/>Eurbin Team</p>
                `,
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Notification email sent to users:', info.response);
            } catch (error) {
                console.error('Error sending email to users:', error);
            }
        } else {
            console.log('No users available to notify.');
        }
    } catch (error) {
        console.error('Error fetching users or sending emails:', error);
    }
}

// Main function to create a reward
exports.createReward = async (req, res) => {
    try {
        const { RewardName, Category, Quantity, Price } = req.body;

        if (!RewardName || !Category || !Quantity || !Price) {
            return res.status(400).json({ error: 'All fields are required (RewardName, Category, Quantity, Price)' });
        }
        
        const imageUrl = req.file ? req.file.location : null;

        const newReward = new Reward({
            RewardName,
            Category,
            Quantity,
            Price,
            Image: imageUrl,
        });

        await newReward.save();

        // Notify users about the new reward
        await notifyAddedReward(newReward);

        res.status(201).json({
            message: 'Reward created successfully!',
            reward: newReward,
        });
    } catch (err) {
        console.error("Error creating reward:", err);
        res.status(500).json({ error: 'An error occurred while creating the reward.' });
    }
};


async function notifyAddedReward(reward) {
    try {
        const users = await User.find(); // Fetch all users
        const usersEmail = users.map(user => user.email);

        if (usersEmail.length > 0) {
            const mailOptions = {
                from: '"Eurbin Team" <eurbinmmq@gmail.com>',
                to: usersEmail.join(','), // Email all users
                subject: `New Reward Added: ${reward.RewardName}`,
                html: `
                    <h1>New Reward Available!</h1>
                    <p>We are excited to announce a new reward has been added to our collection.</p>
                    <ul>
                        <li><strong>Reward Name:</strong> ${reward.RewardName}</li>
                        <li><strong>Price:</strong> ${reward.Price}</li>
                        <li><strong>Quantity:</strong> ${reward.Quantity}</li>
                    </ul>
                    <p>Don't miss out! Check the app now to redeem this amazing reward.</p>
                    <p>Best Regards,<br/>Eurbin Team</p>
                `,
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Notification email sent to users:', info.response);
            } catch (error) {
                console.error('Error sending email to users:', error);
            }
        } else {
            console.log('No users available to notify.');
        }
    } catch (error) {
        console.error('Error fetching users or sending emails:', error);
    }
}

exports.updateReward = async (req, res) => {
    try {
        const { RewardName, Category, Quantity, Price } = req.body;


        const imageUrl = req.file ? req.file.location : null;

        const reward = await Reward.findByIdAndUpdate(
            req.params.id,
            { RewardName, Category, Quantity, Price, Image: imageUrl },
            { new: true }
        );
        
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }

        res.status(200).json(reward);
    } catch (err) {
        console.error("Error updating reward:", err);
        res.status(500).json({ error: 'An error occurred while updating the reward.' });
    }
};




exports.updateReward2 = async (req, res) => {
    try {
        const { RewardName, Category, Quantity, Price } = req.body;

      
       
        const reward = await Reward.findByIdAndUpdate(
            req.params.id,
            { RewardName, Category, Quantity, Price },
            { new: true }
        );
        
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }

        res.status(200).json(reward);
    } catch (err) {
        console.error("Error updating reward:", err);
        res.status(500).json({ error: 'An error occurred while updating the reward.' });
    }
};

// Delete a reward
exports.deleteReward = async (req, res) => {
    try {
        const reward = await Reward.findByIdAndDelete(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward deleted successfully' });
    } catch (err) {
        console.error("Error deleting reward:", err);
        res.status(500).json({ error: 'An error occurred while deleting the reward.' });
    }
};

// Export the upload middleware for routes
exports.upload = upload.single('Image'); // Ensure 'Image' matches the input field name in your form
