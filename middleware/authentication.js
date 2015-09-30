module.exports.authenticated = function authenticated(req, res, next) {
    
    res.locals.isAuthenticated	=	req.session.isAuthenticated;
    
    if	(req.session.isAuthenticated)	{
        res.locals.user	=	req.session.user;
    }
    
    next();
};

module.exports.requireAuthentication = function	requireAuthentication(req, res,	next) {
    
    if	(req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }    
};

var users = {
    'ventas': { 2430801 : 'sales'},
    'supervisor': { 2358152 : 'supervisor'}
};

module.exports.auth	= function auth(username, password, session) {
    
    var tryToLogin = users[username];
    
    var profile = tryToLogin[password];
    
    var	isAuth = profile === 'sales' || profile === 'supervisor';
    
    if	(isAuth) {
        session.isAuthenticated	= isAuth;
        session.user = { username : username, profile: profile };
    }
    
    return isAuth;
};