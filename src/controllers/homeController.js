import db from "../models/index";    
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');

}

let readCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log('---------------');
    // console.log(data);
    // console.log('---------------');
    return res.render('readCRUD.ejs', {
        dataTable: data,
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId);
        return res.render('editCRUD', {
        user: userData,
    });
    } else {
        return res.send('User not found');
    }
}

let putCRUD = async (req, res) => {
    await CRUDService.updateUserInfor(req.body);
    return res.redirect('/read-crud');
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDService.deleteUserById(userId);
    } else {
        console.log('user not found');
    }
    return res.redirect('/read-crud');
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    readCRUD: readCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}