const { error } = require('jquery');
const formidable = require('formidable');
const adminAccountService = require('../../models/modelServices/adminAccountService');
const userAccountService = require('../../models/modelServices/userAccountService');
const cloudinary = require('../../config/Cloudinary/index');

const ITEM_PER_PAGE = 7;

class AccountsController{
    //[GET] /
    async isExist(req, res, next) {
        const isExist = await adminAccountService.checkExist(req.query.username);
        res.json({isExist});
    }

    //[GET] /api/accounts/edit-my-profile
    async editMyProfile(req, res, next) {
        try {
            await adminAccountService.editMyProfile(req.user._id, req.query);
            res.json(req.query);
        } catch(err) { 
            res.json({name: 'Error'});
        };
    }

    //[GET] /api/accounts/edit-my-password
    async editMyPassword(req, res, next) {
        try {
            var values = req.query.formValues;
           
            var admin = await adminAccountService.checkCredential(req.user.username, values.current_password);
            if(admin) {
                await adminAccountService.updatePassword(req.user._id, values.new_password);
                res.json({isSuccess: true});

            } else {
                res.json({
                    isSuccess: false,
                    message: 'Current password is incorrect!',        
                });
            }
            
        } catch(err) { 
            console.log(err);
            res.json({
                isSuccess: false,
                message: 'Update Fail! System error', 
            });
        };
    }

    //[GET] /api/accounts/edit-my-avatar
    async editMyAvatar(req, res, next) {
        const form = formidable({multiples: true});
        const user = req.user;
        form.parse(req, async (err, fields, files) => {
            try{
                if(err) {
                    res.json({isSuccess: false});
                    return;
                }
                const img = files.avt_img;
                if(img && img.size>0) {
                    //Save old img avt
                    var old_public_id_avt = user.public_id_avt;

                    const result = await cloudinary.uploadToCloudinary(img.path, 'admin-img');
                    
                    await adminAccountService.updateAvatar(user._id, result.secure_url, result.public_id);

                    res.status(200).json({isSuccess: true});

                    //If success, delete old img avt
                    if(old_public_id_avt) {
                        var public_ids = [old_public_id_avt];
                        await cloudinary.delete_resources(public_ids, {});
                    }
                } else {
                    res.json({isSuccess: false});
                };
             
            } catch(err) { 
                console.log(err);
                res.json({isSuccess: false}); };
            
        });

    }

    // [GET] api/accounts
    async list(req, res, next) {
        const page = req.query.page || 1;
        var paginate = undefined;
        if(req.query.type == "user") {
            paginate = await userAccountService.list({}, page, ITEM_PER_PAGE);
        } else if(req.query.type == "admin") {
            paginate = await adminAccountService.list({}, page, ITEM_PER_PAGE);
        }
        if(paginate) {
            res.json({
                docs: paginate.docs,
                currentPage: paginate.page,
                hasPrevPage: paginate.hasPrevPage,
                hasNextPage: paginate.hasNextPage,
                totalPages: paginate.totalPages,
            });
        } else {
            res.send('ERROR');
        }

    }

    // [GET] api/accounts/edit-status
    async editStatus(req, res, next) {
       try {
            var type = req.query.type;
            var behavior = req.query.behavior;
            var id = req.query.id;
            var newStatus, currentStatus;
            var result;
            if(behavior == "Block") {
                newStatus = "BLOCK";
                currentStatus = "ACTIVE";
            } else if (behavior == "UnBlock") {
                newStatus = "ACTIVE";
                currentStatus = "BLOCK";
            }
            
            if(type == "user"){
                result = await userAccountService.editStatus(id, newStatus);
            } else if(type == "admin" && req.user._id != id){
                result = await adminAccountService.editStatus(id, newStatus);
            }
            
            if(!result.nModified){
                throw("ERROR");
            }
            res.json({newStatus});
        }catch(err) {
            res.json({newStatus: currentStatus});
        }
    
}
}

module.exports = new AccountsController;