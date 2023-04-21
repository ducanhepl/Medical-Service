import userService from "../services/userService";

let handleLogin = (req, res) => {
    res.send('handling login page');
}

module.exports = {
    handleLogin: handleLogin,
}