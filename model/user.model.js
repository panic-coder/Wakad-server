const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        useCreateIndex: true
    },
    mobileNumber: {
        type: String
    },
    image: {
        type: String
    },
    creatorStamp: {
        type: Date,
        default: Date.now
    },
    updateStamp: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', UserSchema);

function UserSchemaModel() {

}

UserSchemaModel.prototype.save = (data, callback) => {
    var newUserData = new User(data);
    newUserData.save((error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
};

UserSchemaModel.prototype.getUsers = (callback) => {
    User.find({}, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

UserSchemaModel.prototype.editUsers = (data, callback) => {
    data.updateStamp = Date.now();
    User.updateOne({_id: data._id}, data, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

UserSchemaModel.prototype.deleteUser = (data, callback) => {
    data.updateStamp = Date.now();
    User.deleteOne({_id: data._id}, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

UserSchemaModel.prototype.details = (id, callback) => {
    User.findOne({_id: id}, (error, result) => {
        if (error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

module.exports = new UserSchemaModel();
