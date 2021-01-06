const AdminAccount = require("../adminAccount");
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.addAdmin = async (newAdmin) => {
    hash = await bcrypt.hash(newAdmin.password, saltRounds);
    newAdmin.password = hash;
    const adminAccount = new AdminAccount(newAdmin);
    adminAccount.save();
}

module.exports.getAdmin = (id) => {
    return AdminAccount.findOne({_id: id}).lean();
}

module.exports.checkCredential = async(username, password) => {
    try {
        const user = await AdminAccount.findOne({username}).lean();
        if(!user) {
            return false;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return false;
        }
        return user;
    } catch(err) { next(err) };
}

module.exports.checkExist = async (username) => {
    const isExist = await AdminAccount.exists({username});
    return isExist;

}

module.exports.editMyProfile = async (id,  doc) => {
    return await AdminAccount.updateOne({_id: id}, doc);
}

module.exports.updatePassword = async (id,  password) => {
    hash = await bcrypt.hash(password, saltRounds);
    return await AdminAccount.updateOne({_id: id}, {password: hash});
}

module.exports.updateAvatar = async (id,  avt_img, public_id_avt) => {
    return await AdminAccount.updateOne({_id: id}, {avt_img, public_id_avt});
}

module.exports.list = async (query, page, itemPerPage) => {
    const paginate = await AdminAccount.paginate(query, {
        page: page,
        limit: itemPerPage,
        lean: true,
    });
    return paginate;
}

module.exports.editStatus = async (id, newStatus) => {
    return AdminAccount.updateOne({_id: id}, {status: newStatus});
} 