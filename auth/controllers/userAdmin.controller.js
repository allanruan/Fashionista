

const User = require('../models/User.js');


exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findByUsername = (req, res) => {
    User.findOne(req.body, (err, user) => {
        if (err) throw err;
        res.send(user);
    })
};

exports.addUser = (req, res) => {
    const {username, email, password,role } = req.body;

    User.findOne({ username }, function (err, existingUser) {
        if (err) {
          return res.status(422).json({ 'error': 'Oops! Something went Wrong' });
        }
        if (existingUser) {
          return res.status(422).json({ 'error': 'User already exists' });
        }
        else {
        User.create(req.body, (err, data) => {
            if (err) { throw err; }
            res.send(data);
            });
        }
    })
}

exports.removeById = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) throw err;
        res.send(user);
    })
}

exports.updateById = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) throw err;
        res.send(user);
    })
}
