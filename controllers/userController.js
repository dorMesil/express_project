const User = require('../models/userModel');

module.exports.renderRegister = (req, res) => {
    res.render('register');
}

module.exports.register = async (req, res, next) => {
    
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        console.log('success');
        res.redirect('/');
    })

}

module.exports.renderLogin = (req, res) => {
    res.render('login');
}
module.exports.login = async (req, res, next) => {
    console.log('success to login');
    res.redirect('/');
}
module.exports.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
}