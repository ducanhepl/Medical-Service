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
};

let handleGetUserInfor = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'no user id found',
            users: []
        });
    }
    let users = await userService.getUserInfor(id);
    return res.status(200).json({
        errCode: 0,
        massage: 'OK',
        users
    });
};

let handleCreateUser = async (req, res) => {
    let response = await userService.createUser(req.body);
    return res.status(200).json(response);
};

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'missing required parameter'
        });
    }
    let response = await userService.deleteUser(req.body.id);
    return res.status(200).json(response);
};

let handleEditUser = async (req, res) => {
    let response = await userService.updateUser(req.body);
    return res.status(200).json(response);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetUserInfor: handleGetUserInfor,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
}