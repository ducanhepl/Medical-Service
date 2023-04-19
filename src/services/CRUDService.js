import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassWordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll();
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInforById = (userId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId},
                // raw: true,
            });

            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch(e) {
            reject(e);
        }
    });
}

let updateUserInfor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                // raw: true,   sai: khong dung raw hoac doi raw thanh false 
            });
            if (user) {
                // user.firstName = data.firstName;
                // user.lastName = data.lastName;
                // user.address = data.address;
                await user.set({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                });

                await user.save();
                resolve();
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInforById: getUserInforById,
    updateUserInfor: updateUserInfor,
}