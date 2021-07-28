import app from './express/server.js';
import db from './database/connection.js';

db.authenticate().then(() => {
  app.listen(5000, () => {
    console.log(`Server running on port: ${5000}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
