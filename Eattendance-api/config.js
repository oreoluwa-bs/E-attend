module.exports = {
    decrypt_me: process.env.JWT_KEY || 'WHO_IS_KING',
    dbConnectionString: process.env.DATABASE_URL || 'mongodb://localhost:27017/e-attendance-two',
    port: process.env.PORT || 5000,
};
