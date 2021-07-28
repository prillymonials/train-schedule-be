const app = require('./express/server.js');
const db = require('./database/connection.js');

db.authenticate().then(() => {
  app.listen(5000, () => {
    console.log(`Server running on port: ${5000}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
