const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve all files from project root (index.html, styles.css, etc.)
app.use(express.static(path.join(__dirname, '/')));

// Fallback to index.html for SPA-style routing (not strictly necessary here)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
