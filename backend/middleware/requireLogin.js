/**
 * Ensure user is logged in.
 *
 * @param excludedPaths list of routes without login check
 */
const getRequireLogin = excludedPaths => (req, res, next) => {

    const loggedIn = req.session && req.session.userId;


    if (!loggedIn && !excludedPaths.includes(req.path.toLowerCase())) {
        console.info("Unauthorized request:", req.method, req.originalUrl);
        res.sendStatus(401);
        return;
    }
    next();
};

module.exports = getRequireLogin;
