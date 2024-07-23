// pages/api/users/login/index.js

import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/userModel';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await connectMongoDB();

    if (req.method === 'POST') {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        try {
            const user = await User.findOne({ name });

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
        } catch (error) {
            console.error('Server Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
