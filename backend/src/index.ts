import app from './server';

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Express server started on port: ' + port);
});