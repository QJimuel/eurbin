const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 
const bcrypt = require('bcryptjs');

const crypto = require('crypto'); // For generating random OTPs

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // or your provider's host
    port: 465,
    secure: true, // You can use other email services
    auth: {
        user: "eurbinmmq@gmail.com",
        pass: "mwqy dmwx myrn ngny",
    },
});


exports.getAllAdmins = async (req, res) => {
    try {
        const admin = await Admin.find();
        res.status(200).json({ message: 'Successfully retrieved data',admin  });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        
          
        const newAdmin = new Admin({ username, email, password });
        await newAdmin.save();

        const verificationToken = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1d' });

         // Send verification email
         const verificationLink = `https://eurbinadmin.vercel.app/verify-email?token=${verificationToken}` || `https://localhost:5173/verify-email?token=${verificationToken}`;

         try {
            await transporter.sendMail({
                from: "Eurbin Admin",
                to: email,
                subject: 'Email Verification',
                html: `<h4>Hello, ${username}</h4><p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`,
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            return res.status(500).json({ error: 'Failed to send verification email' });
        }

      
         res.status(201).json({ message: 'Admin registered successfully. Please verify your email to activate your account.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password} = req.body;

    try {
        const admin = await Admin.findOne({ email });

     
       
        
        // Check if admin with the provided email exists
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!admin.isVerified) {
            return res.status(403).json({ message: 'Your account is not verified. Please check your email for the verification link.' });
        }

      

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log(password)
        console.log(admin.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
           
        }
        
       

        // If valid, generate JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '15m' });
        
        // Send token to the client
      
        res.json({
             token,
            email: admin.email, 
            userId: admin._id,
            username: admin.username

         });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to handle email verification
exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Activate the account
        admin.isVerified = true;
        await admin.save();

        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





exports.updateProfile = async (req, res) => {
    const { username, email } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const admin = await Admin.findById(decoded.id);
    
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (email && email !== admin.email) {
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({ message: 'Email is already registered' });
            }
        }
    
        // Update the admin's username and email
        admin.username = username || admin.username;
        admin.email = email || admin.email;
    
        await admin.save(); 
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error updating profile:', err); // Add this line for debugging
        res.status(500).json({ error: err.message });
    }
};


exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare the old password with the hashed password in the database
        const isMatch = await admin.comparePassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Hash the new password and save it
        admin.password = newPassword
        await admin.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ error: err.message });
    }
};


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Generate new password
        const newPassword = crypto.randomBytes(4).toString('hex'); // Generate a 4-byte random password
   

        // Update user's password
        admin.password = newPassword;
        await admin.save();

        // Send email with the username and new password
        await sendForgotPasswordEmail(email, admin.username, newPassword);

        res.status(200).json({ message: 'New password sent to your email.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const sendForgotPasswordEmail = async (email, userName, newPassword) => {
    const mailOptions = {
        from: '"Eurbin Team" <eurbinmmq@gmail.com>',
        to: email,
        subject: 'Your New Password for Eurbin',
        html: `
            <h1>Hello ${userName},</h1>
            <p>Your password has been reset. Here are your new login details:</p>
            <p><strong>Username:</strong> ${userName}</p>
            <p><strong>New Password:</strong> ${newPassword}</p>
            <p>Please log in and change this password as soon as possible.</p>
            <p>Best Regards,<br/>Eurbin Team</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};