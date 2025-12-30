const validateUser = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role)
    return res.json({ success: false, message: "All fields are required" });

  next();
};

export default validateUser;
