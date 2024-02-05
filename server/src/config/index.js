const config = require("./config.json");

module.exports = {
    port: config.PORT,
    origin: config.ORIGIN,
    databaseURL: config.DATABASE_URL,
    nodeEnv: config.NODE_ENV,
    jwt: {
        jwtSecret: config.SECRET_CODE,
        jwtRefreshSecret: config.REFRESH_SECRET_CODE,
        isu: config.ISSUER,
        aud: config.AUDIENCE,
    },
};
