"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNewComms = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../database");

var _sendNotification = require("./sendNotification");

var checkNewComms = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ms) {
    var lastId, newId, query, _query, diff, i;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _database.executeQuery)('SELECT max(idcomunicaciondestino) as ID FROM comunicaciones_destinos');

          case 2:
            query = _context.sent;
            lastId = query[0].ID;

          case 4:
            if (!true) {
              _context.next = 14;
              break;
            }

            _context.next = 7;
            return (0, _database.executeQuery)('SELECT max(idcomunicaciondestino) as ID FROM comunicaciones_destinos');

          case 7:
            _query = _context.sent;
            newId = _query[0].ID;

            if (newId != lastId) {
              diff = newId - lastId;

              if (diff > 1) {
                for (i = 0; i < diff; i++) {
                  (0, _sendNotification.sendNotification)(newId - i);
                }
              } else {
                (0, _sendNotification.sendNotification)(_query[0].ID);
              }

              lastId = newId;
            }

            _context.next = 12;
            return sleep(ms);

          case 12:
            _context.next = 4;
            break;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkNewComms(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkNewComms = checkNewComms;

function sleep(_x2) {
  return _sleep.apply(this, arguments);
}

function _sleep() {
  _sleep = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(msec) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve) {
              return setTimeout(resolve, msec);
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _sleep.apply(this, arguments);
}