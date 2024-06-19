require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const VERSION = process.env.VERSION;
const SERVICE = process.env.SERVICE;
const PASSMAILER = process.env.PASSMAILER;
const MAIL_FROM = process.env.MAIL_FROM;
const JWT_SECRET = process.env.JWT_SECRET;


module.exports = {
    PORT,
    MONGODB_URI,
    VERSION,
    SERVICE,
    PASSMAILER,
    MAIL_FROM,
    JWT_SECRET
}