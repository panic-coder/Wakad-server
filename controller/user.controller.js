const userService = require('../services/user.service');
const constantsParam = require('../constants/static.js');

exports.registration = (req, res, next) => {
    var responseResult = {};
    try {
        var mobRegex = /^\d{10}$/;
        req.checkBody('firstName', 'first name is required').notEmpty();
        req.checkBody('lastName', 'last name is required').notEmpty();
        req.checkBody('email', 'email is required').notEmpty();
        req.checkBody('mobileNumber', 'mobile number is required').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            responseResult.status = false;
            responseResult.message = errors[0].msg;
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else if (isNaN(req.body.mobileNumber)) {
            responseResult.status = false;
            responseResult.message = 'Please provide valid mobile number';
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else if (parseInt(req.body.mobileNumber.length) < 10 || parseInt(req.body.mobileNumber.length) > 10) {
            responseResult.status = false;
            responseResult.message = 'Provided mobile number has invalid length';
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else if (!mobRegex.test(req.body.mobileNumber)) {
            responseResult.status = false;
            responseResult.message = 'Mobile number is Invalid';
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            userService.registration(req.body, (error, result) => {
                if (error) {
                    if (error.code == 11000) {
                        responseResult.status = false;
                        responseResult.message = "Email id already exists";
                        return res.status(constantsParam.staticHTTPErrorMessages.CONFLICT.errorResponseCode).send(responseResult);
                    }
                    else if (error) {
                        responseResult.status = false;
                        responseResult.message = "Something went wrong";
                        return res.status(constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
                    } else {
                        responseResult.status = true;
                        responseResult.message = "Registered Successfully";
                        responseResult.data = result;
                        return res.status(constantsParam.staticHTTPSuccessMessages.CREATED.successResponseCode).send(responseResult);
                    }
                }
                else {
                    responseResult.status = true;
                    responseResult.message = "Registered Successfully";
                    responseResult.data = result;
                    return res.status(constantsParam.staticHTTPSuccessMessages.CREATED.successResponseCode).send(responseResult);
                }

            });
        }
    } catch (error) {
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    var responseResult = {};
    try {
        var getUsers = await userService.getUsers();
        responseResult.status = true;
        responseResult.message = "Fetched Successfully";
        responseResult.data = getUsers;
        return res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
    } catch (error) {
        next(error);
    }
}

exports.editUsers = async (req, res, next) => {
    var responseResult = {};
    try {
        var editUsers = await userService.editUsers(req.body);
        responseResult.status = true;
        responseResult.message = "Updated Successfully";
        responseResult.data = editUsers;
        return res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    var responseResult = {};
    try {
        console.log(req.body);
        
        var deleteUser = await userService.deleteUser(req.body);
        console.log(deleteUser);
        
        responseResult.status = true;
        responseResult.message = "Deleted Successfully";
        responseResult.data = deleteUser;
        return res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
    } catch (error) {
        next(error);
    }
}

exports.details = async (req, res, next) => {
    var responseResult = {};
    try {
        var details = await userService.details(req.params.id);
        responseResult.status = true;
        responseResult.message = "Details fetched Successfully";
        responseResult.data = details;
        return res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
    } catch (error) {
        next(error);
    }
}