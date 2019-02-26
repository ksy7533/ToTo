const jwt = require('jsonwebtoken');

const middlewares = {
    /* 헤더에 들어있는 토큰이 유효한지 알아보는 미들웨어 */
    ensureAuth() {
        return (req, res, next) => {
            const { authorization } = req.headers;
            if (!authorization) {
                res.status(401);
                throw Error('No Authorization headers');
            };
            try {
                req.user = jwt.verify(authorization.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
            } catch (e) {
                res.status(401);
                throw e;
            };
            next();
        }
    }
}

module.exports = middlewares;
