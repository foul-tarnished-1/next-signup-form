import { connectMongoDB } from '../../../lib/mongodb';
import User from '../../../models/userModel';

export default async function handler(req, res) {
  try {
    await connectMongoDB(); // Connect to MongoDB

    if (req.method === 'GET') {
      console.log('Fetching users...');
      const users = await User.find({});
      console.log('Users fetched:', users); // Debugging log
      res.setHeader('Cache-Control', 'no-cache'); // Disable caching for debugging
      res.status(200).json(users);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in API route:', error); // Debugging log
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
