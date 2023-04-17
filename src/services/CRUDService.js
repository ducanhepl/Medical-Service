import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPassWordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('create new user succeed');

        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);

            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}

module.exports = {
    createNewUser: createNewUser,
}