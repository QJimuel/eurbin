// utils/updateTotal.js
const User = require('../models/user');
const Total = require('../models/total');

const updateTotal = async () => {
    try {
        const totals = await User.aggregate([
            {
                $group: {
                    _id: null,
                    totalUser: { $sum: 1 },
                    totalSmartPoints: { $sum: "$smartPoints" },
                    totalBottle: { $sum: "$plasticBottle" },
                    totalCo2: { $sum: "$co2" }
                }
            }
        ]);

        if (totals.length > 0) {

            const now = new Date();
            // Add 8 hours to the current date

            now.setHours(now.getHours() + 8);
    


            const newTotal = new Total({
                totalUser: totals[0].totalUser,
                totalSmartPoints: totals[0].totalSmartPoints,
                totalBottle: totals[0].totalBottle,
                totalCo2: totals[0].totalCo2,
                date: now // Add a date field for the new record
            });

            await newTotal.save(); // Save a new record
        }
    } catch (err) {
        console.error('Error updating total:', err);
    }
};

module.exports = updateTotal;
