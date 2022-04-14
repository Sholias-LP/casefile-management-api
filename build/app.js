"use strict";
/* -------------------------------------------------------------------------- */
/*                              External imports                              */
/* -------------------------------------------------------------------------- */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
/* -------------------------------------------------------------------------- */
/*                              Internal imports                              */
/* -------------------------------------------------------------------------- */
const index_1 = __importDefault(require("./routes/index"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const casefile_route_1 = __importDefault(require("./routes/casefile.route"));
const swaggerJsDocs = yamljs_1.default.load(__dirname + '/spec/api.yaml');
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api/v1/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJsDocs));
app.use('/api/v1/', index_1.default);
app.use('/api/v1/users', users_route_1.default);
app.use('/api/v1/', casefile_route_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
});
exports.default = app;
