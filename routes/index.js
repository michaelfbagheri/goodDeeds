const path = require("path");
const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(express.static(path.join(__dirname, "../client/build")))

router.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  let msg = err.message
  // If we are in production, override the message we
  // expose to the client (for security reasons)
  if (process.env.NODE_ENV === "production") {
    msg = "Internal server error"
  }
  if (err.statusCode === 500) {
    console.error(err)
  }
  res.status(err.statusCode).json({
    error: msg
  })
});

module.exports = router;
