import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/userModel';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectMongoDB();
      const { name, email, password, age, phone } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        age,
        address: { phone },
        isActive: true,
      });
      await user.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
