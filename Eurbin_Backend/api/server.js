const app = require('./index');

module.exports = async (req, res) => {
  try {
    await app(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).send('Internal Server Error');
  }
};
