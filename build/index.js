"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config/config"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = _config.default.PORT || 4001;

_mongoose.default.set('useNewUrlParser', true);

_mongoose.default.connect(_config.default.DATABASE, {
  useNewUrlParser: true
});

const db = _mongoose.default.connection;
db.on('error', () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Failed to establish connection');
  }
});
db.once('open', () => {
  if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    console.log('Connection established');
  }
}); // Parses the text as JSON and exposes the resulting object on req.body

app.use(_bodyParser.default.json()); // Parses the text as URL encoded data (which is how browsers tend to send
// form data from regular forms set to POST) and exposes the resulting object
// (containing the keys and values) on req.body.

app.use(_bodyParser.default.urlencoded({
  extended: true
}));

if (process.env.NODE_ENV === 'development') {
  app.use((0, _morgan.default)('combined'));
}

app.use('/api/v1', _routes.default);
var _default = app;
exports.default = _default;