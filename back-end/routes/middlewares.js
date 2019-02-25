const jwt = require('jsonwebtoken');

module.exports = {
    /* 헤더에 들어있는 토큰이 유효한지 알아보는 미들웨어 */
    ensureAuth() {
        return (req, res, next) => {
            const { authorization } = req.headers;

            console.log(authorization)
            if (!authorization) {
                res.status(401);
                throw Error('No Authorization headers');
            };
            try {
                req.user = this.verify(authorization);
            } catch (e) {
                res.status(401);
                throw e;
            };
            next();
        }
    },

    verify(token) {
        return jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_SECRET);
    }
}
