const app = require('./express/server.js');
const db = require('./database/connection.js');

const PORT = process.env.PORT || 5000;

db.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
