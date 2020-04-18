const userModel = require('../model/user.model');

exports.registration = (data, callback) => {
    userModel.save(data, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    });
};

exports.getUsers = () => {
    return new Promise(function (resolve, reject) {
        userModel.getUsers((error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

exports.editUsers = (data) => {
    return new Promise(function (resolve, reject) {
        userModel.editUsers(data, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

exports.deleteUser = (data) => {
    return new Promise(function (resolve, reject) {
        userModel.deleteUser(data, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
} 

exports.details = (data) => {
    return new Promise(function (resolve, reject) {
        userModel.details(data, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
} 
