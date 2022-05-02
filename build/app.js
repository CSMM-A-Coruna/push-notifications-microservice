"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeMicroService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _checkNewComms = require("./service/checkNewComms");

var initializeMicroService = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _checkNewComms.checkNewComms)(5000);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initializeMicroService() {
    return _ref.apply(this, arguments);
  };
}();

exports.initializeMicroService = initializeMicroService;