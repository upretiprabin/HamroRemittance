"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeUserPassword = exports.updateUserData = exports.saveUserData = exports.verifyUserCode = exports.sendVerificationCodeToEmail = exports.userRegistration = exports.registerUser = void 0;

var _Middleware = _interopRequireDefault(require("Middleware"));

var _AuthenticationManager = require("../sagas/AuthenticationManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var registerUser = function registerUser(data) {
  return _Middleware["default"].User.registerUser(data);
};

exports.registerUser = registerUser;

var userRegistration = function userRegistration(data) {
  return _Middleware["default"].User.userRegistration(data);
};

exports.userRegistration = userRegistration;

var sendVerificationCodeToEmail = function sendVerificationCodeToEmail(data) {
  return _Middleware["default"].User.sendVerificationCode(data);
};

exports.sendVerificationCodeToEmail = sendVerificationCodeToEmail;

var verifyUserCode = function verifyUserCode(data) {
  return _Middleware["default"].User.verifyUser(data);
};

exports.verifyUserCode = verifyUserCode;

var saveUserData = function saveUserData(data) {
  return _Middleware["default"].User.saveUserDetails(data);
};

exports.saveUserData = saveUserData;

var updateUserData = function updateUserData(data) {
  data.emailAddress = (0, _AuthenticationManager.userFromLocalStorage)().username;
  data.sender = true;
  return _Middleware["default"].User.updateUserDetails(data);
};

exports.updateUserData = updateUserData;

var changeUserPassword = function changeUserPassword(data) {
  data.emailAddress = (0, _AuthenticationManager.userFromLocalStorage)().username;
  return _Middleware["default"].User.updateUserPassword(data);
};

exports.changeUserPassword = changeUserPassword;