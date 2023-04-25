import db from "../models/index";
import bcrypt from 'bcryptjs';


let handleUserLogin = (email, password) => {
    return new Promise (async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmailExist(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {email: email},
                    raw: true,
                });
                if (user) {
                    let checkPassword = await bcrypt.compare(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.message = 'Ok';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'User not found';
                }
            } else {
                userData.errCode = 1;
                userData.message = 'this email does not exist, please try another one';
            }
            resolve(userData);
        } catch(e) {
            reject(e);
        }
    }) 

}

let checkEmailExist = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
                let user = await db.User.findOne({
                    where: {email: userEmail}
                });
                if (user) {
                    resolve(true);
                }
                else resolve(false);
        } catch(e) {
            reject(e);
        }
    })
}

let getUserInfor = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attribute: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attribute: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users);
        } catch(e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getUserInfor: getUserInfor,
}