const UserAccount = require("../userAccount");

module.exports.list = async (query, page, itemPerPage) => {
    const paginate = await UserAccount.paginate(query, {
        page: page,
        limit: itemPerPage,
        lean: true,
    });
    return paginate;
}

module.exports.findbyId = (id) => {
    return UserAccount.findOne({_id: id}).lean();
}

module.exports.editStatus = async (id, newStatus) => {
    return UserAccount.updateOne({_id: id}, {status: newStatus});
} 