const appRootPackage = require('app-root-path');
const path = require('path');

const appRoot = () => appRootPackage.path;
const appName = () => process.env['APP_NAME'] || 'PageSpeedy';
const dataRoot = () => process.env['DATA_DIR'] || path.join(appRoot(), appName(), 'data');
const contentRoot = () => process.env['CONTENT_DIR'] || path.join(appRoot(), appName(), 'content');
const logDir = () => process.env['LOG_DIR'] || path.join(appRoot(), 'logs');
const fileDateFormat = () => `yyyyLLdd't'HHmmss`;
const keyboardCat = () => process.env['KEYBOARD_CAT'] || 'keyboardcatgetoffyoubastard';
const sitePort = () => process.env['PORT'] || '4000';
const sitePortExternal = () => process.env['SITE_PORT_EXTERNAL'] || '80';
const siteProtocol = () => process.env['SITE_PROTOCOL'] || 'http://';
const siteDomain = () => process.env['SITE_DOMAIN'] || '127.0.0.1';
const siteUrl = () => `${siteProtocol()}${siteDomain()}:${sitePort()}`;
const siteLoginPath = () => process.env['SITE_LOGIN_PATH'] || '/login';
const mongoURI = () => process.env['MONGO_URI'] || '';
const mongoHost = () => process.env['MONGO_HOST'] || 'localhost';
const mongoDatabase = () => process.env['MONGO_DATABASE'] || 'pagespeedy';
const mongoUser = () => process.env['MONGO_USER'] || 'pagespeedy';
const mongoPassword = () => process.env['MONGO_PASSWORD'] || '';
const mongoPort = () => process.env['MONGO_PORT'] || '27017';
const jwtTokenSecret = () => process.env['JWT_TOKEN_SECRET'] || '';
const jwtTokenExpiry = () => process.env['JWT_TOKEN_EXPIRY'] || '';
const registrationTemplate = () => process.env['REGISTRATION_TEMPLATE'] || '';
const passwordResetValidity = () => process.env['PASSWORD_RESET_TOKEN_VALIDITY'] || '';
const passwordResetBaseUrl = () => process.env['PASSWORD_RESET_BASE_URL'] || '';
const passwordResetTemplate = () => process.env['PASSWORD_RESET_TEMPLATE'] || '';
const passwordResetConfirmationTemplate = () => process.env['PASSWORD_RESET_CONFIRMATION_TEMPLATE'] || '';
const supportTicketTemplate = () => process.env['SUPPORT_TICKET_TEMPLATE'] || '';
const serviceRequestTemplate = () => process.env['SERVICE_REQUEST_TEMPLATE'] || '';
const supportTicketMail = () => process.env['PAGESPEEDY_TICKETING_MAIL'] || '';

module.exports = {
  appRoot,
  dataRoot,
  contentRoot,
  logDir,
  fileDateFormat,
  keyboardCat,
  sitePort,
  sitePortExternal,
  siteProtocol,
  siteDomain,
  siteUrl,
  siteLoginPath,
  mongoURI,
  mongoHost,
  mongoDatabase,
  mongoUser,
  mongoPassword,
  mongoPort,
  jwtTokenSecret,
  jwtTokenExpiry,
  registrationTemplate,
  passwordResetValidity,
  passwordResetBaseUrl,
  passwordResetTemplate,
  passwordResetConfirmationTemplate,
  passwordResetConfirmationTemplate,
  supportTicketMail,
  supportTicketTemplate,
  serviceRequestTemplate,
};
