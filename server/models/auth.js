module.exports = {
  requireAuth(req, res, next) {
    if (!req.user) {
      next({ statusCode: 401, message: "Unauthorized" });
    } else {
      next();
    }
  },
};
