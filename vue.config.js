module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/marketplace-project/" // prod
      : "/", // dev
};
