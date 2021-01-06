
const currentTab = 'dashboard'
class DashboardController{
    //[GET/DASHBOARD]
    index(req, res){
        res.render('dashboard', {currentTab});
    }
}

module.exports = new DashboardController;