"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loggerService = _interopRequireDefault(require("../services/loggerService"));

var _reactNotifications = require("react-notifications");

var _userService = require("../services/userService");

var _dashboardService = require("../services/dashboardService");

var _helpers = require("../helpers/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUserDetails = function getUserDetails(ctx) {
  ctx.changeState({
    loading: true
  });
  var userData = {};
  (0, _dashboardService.loadUserData)().then(function (data) {
    if (!data.data.hasOwnProperty("Error")) {
      userData = data.data.result;
      userData.userImage = '';
      localStorage.setItem("user-profile", JSON.stringify(userData));
    } else {
      _loggerService["default"].error(data.data.Error);

      _reactNotifications.NotificationManager.error(data.data.Error);
    }
  })["catch"](function (e) {
    _loggerService["default"].error(e);

    _reactNotifications.NotificationManager.error("Error Occurred!");
  })["finally"](function () {
    ctx.setValuesAndErrors(userData);
  });
};

var updateUser = function updateUser(ctx, data) {
  ctx.changeState({
    loading: true
  });
  data.dateOfBirth = (0, _helpers.getFormattedDate)(data.dateOfBirth.toString(), "MM/DD/YYYY"), (0, _userService.updateUserData)(data).then(function (data) {
    if (!data.data.hasOwnProperty("Error")) {
      _reactNotifications.NotificationManager.success('User Updated Successfully!');
    } else {
      _loggerService["default"].error(data.data.Error);

      _reactNotifications.NotificationManager.error(data.data.Error);
    }
  })["catch"](function (e) {
    _loggerService["default"].error(e);

    _reactNotifications.NotificationManager.error("Error Occurred!");
  })["finally"](function () {
    ctx.changeState({
      loading: false
    });
    getUserDetails(ctx);
  });
};

var updateUserPassword = function updateUserPassword(ctx, data) {
  ctx.changeState({
    loading: true
  });
  (0, _userService.changeUserPassword)(data).then(function (data) {
    if (!data.data.hasOwnProperty("Error")) {
      _reactNotifications.NotificationManager.success('Password Changed Successfully!');
    } else {
      _loggerService["default"].error(data.data.Error);

      _reactNotifications.NotificationManager.error(data.data.Error);
    }
  })["catch"](function (e) {
    _loggerService["default"].error(e);

    _reactNotifications.NotificationManager.error("Error Occurred!");
  })["finally"](function () {
    ctx.changeState({
      loading: false
    });
  });
};

var _default = {
  getUserDetails: getUserDetails,
  updateUser: updateUser,
  updateUserPassword: updateUserPassword
};
exports["default"] = _default;