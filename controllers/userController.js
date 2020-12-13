const User = require('../models/userModel');

module.exports.renderRegister = (req, res) => {
    res.render('register');
}

module.exports.register = async (req, res, next) => {
    try{
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'welcome!');
            res.redirect('/');
        })  
    } catch(e) {
        if(e.code===11000) req.flash('error','User email already  exists');
        else req.flash('error',e.message);
    
        res.redirect('register');
    }

}

module.exports.renderLogin = (req, res) => {
    res.render('login');
}
module.exports.login = async (req, res, next) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}
module.exports.logout = (req, res) => {
    req.logout();
    // req.session.destroy();
    req.flash('success', 'Good Bye');
    res.redirect('/');
}