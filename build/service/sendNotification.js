"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNotification = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../database");

var admin = require('firebase-admin');

var serviceAccount = require('../../gestorescolar-b6bd9-firebase-adminsdk-z9dbs-851726f54b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var tiposUsuarios = {
  1: 'alumnos',
  2: 'familias',
  3: 'profesores'
};

var sendNotification = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(idComunicacionDestino) {
    var com, tokenQuery, token, queryPayload, tablaUsuario, queryNombreRemite, payload, options;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _database.executeQuery)("SELECT * FROM comunicaciones_destinos WHERE idcomunicaciondestino = ".concat(idComunicacionDestino));

          case 3:
            com = _context.sent;

            if (!(com[0].tipodestino == 2)) {
              _context.next = 31;
              break;
            }

            _context.next = 7;
            return (0, _database.executeQuery)("SELECT * FROM familias WHERE id = ".concat(com[0].iddestino));

          case 7:
            tokenQuery = _context.sent;
            token = tokenQuery[0].fcm_token;

            if (!token) {
              _context.next = 30;
              break;
            }

            _context.next = 12;
            return (0, _database.executeQuery)("SELECT asunto, tiporemite, idremite FROM comunicaciones WHERE idcomunicacion = ".concat(com[0].idcomunicacion));

          case 12:
            queryPayload = _context.sent;
            _context.t0 = queryPayload[0].tiporemite;
            _context.next = _context.t0 === 1 ? 16 : _context.t0 === 2 ? 18 : _context.t0 === 3 ? 20 : 22;
            break;

          case 16:
            tablaUsuario = 'alumnos';
            return _context.abrupt("break", 22);

          case 18:
            tablaUsuario = 'familias';
            return _context.abrupt("break", 22);

          case 20:
            tablaUsuario = 'profesores';
            return _context.abrupt("break", 22);

          case 22:
            _context.next = 24;
            return (0, _database.executeQuery)("SELECT CONCAT(nombre, ' ', apellido1) AS nombre FROM ".concat(tablaUsuario, " WHERE id = ").concat(queryPayload[0].idremite));

          case 24:
            queryNombreRemite = _context.sent;
            payload = {
              notification: {
                title: 'Nueva comunicación: ' + queryPayload[0].asunto,
                body: 'De: ' + queryNombreRemite[0].nombre
              }
            };
            options = {
              priority: 'high',
              timeToLive: 60 * 60 * 24
            };
            admin.messaging().sendToDevice(token, payload, options).then(function (response) {
              if (response.failureCount == 0) {
                console.log('Notificación enviada');
              } else {
                console.log('Notificación no-enviada, error');
                console.log(response.results[0].error);
              }
            });
            _context.next = 31;
            break;

          case 30:
            console.log('no tipo destino correcto');

          case 31:
            _context.next = 36;
            break;

          case 33:
            _context.prev = 33;
            _context.t1 = _context["catch"](0);
            console.log(_context.t1);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 33]]);
  }));

  return function sendNotification(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendNotification = sendNotification;