export const adminMiddleware = (req, res, next) => {
  // authMiddleware MUST run before this
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required"
    });
  }

  next();
};
