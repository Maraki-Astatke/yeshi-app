export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (err.code === '23505') { // PostgreSQL unique violation
    return res.status(409).json({ message: 'Duplicate entry found' });
  }

  // Default error
  res.status(500).json({ 
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message 
  });
};