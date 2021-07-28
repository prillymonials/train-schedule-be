import bcrypt from 'bcrypt';
import { addUser, getUserByUsername } from '../models/users.js';

export const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const users = await getUserByUsername(username);

    if (users.length === 0) {
      throw new Error('Invalid Username and Password.');
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Invalid Username and Password.');
    }

    delete user.password;

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await addUser(username, hashedPassword);

    res.status(200).json({id: users[0]});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
