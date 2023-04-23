import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Invalid email/password'
        });
    }

    let userData = await userService.handleUserLogin(email, password);
    //check if email is exist
    //check password
    //return user infor - email & roleId

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    });
}

module.exports = {
    handleLogin: handleLogin,
}