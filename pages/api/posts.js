// pages/api/posts.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('user-db');
  const collection = db.collection('users');

  if (req.method === 'GET') {
    const posts = await collection.find({}).toArray();
    res.json(posts);
  } else if (req.method === 'POST') {
    const post = req.body;
    await collection.insertOne(post);
    res.status(201).json(post);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
