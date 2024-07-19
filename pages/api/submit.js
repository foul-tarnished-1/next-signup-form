import connectToDatabase from '../../lib/mongodb';
import Form from '../../models/Form';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'POST':
      try {
        const { name, email } = req.body;
        const newForm = new Form({ name, email });
        await newForm.save();
        res.status(201).json({ success: true, data: newForm });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false });
      break;
  }
}
