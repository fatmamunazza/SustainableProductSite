const admin = require('../firebase');
const User = require('../models/user.model');
exports.authCheck = async(req, res, next) => {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        // console.log('FIREBASE USER IN AUTHCHECK', firebaseUser);
        req.user = firebaseUser;
        next();
    } catch (err) {
        res.status(401).json({
            err: "Invalid or expired token",
        });
    }
}

exports.vendorCheck = async(req, res, next) => {
    const { email } = req.user

    const venodrUser = await User.findOne({email}).exec()

    if(venodrUser.role !== 'vendor') {
        res.status(403).json({
            err: "Vendor resource. Access denied",
        });
    } else {
        next();
    }
}
