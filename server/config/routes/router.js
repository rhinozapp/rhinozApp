module.exports = function (app) {
    let path = require('path'),
        appDir = path.dirname(require.main.filename),
        multipart = require('connect-multiparty'),
        multiparty = require('multiparty'),
        expressJwt = require('express-jwt'),
        authenticate = expressJwt({
            secret: 'rhinoz'
        });

    //region WEB Routes
    //region ZipCode
    let zipCodeWeb = require('./web/app/helpers/zipCode');
    app.post('/web/zipCode', authenticate, zipCodeWeb.zipCode);
    //endregion

    //region SignUp / doLogin
    let signUpWeb = require('./web/modules/login/signUp');
    app.post('/web/signUp', signUpWeb.signup);

    let doLoginWeb = require('./web/modules/login/doLogin');
    app.post('/web/doLogin', doLoginWeb.doLogin);
    //endregion

    //region Recovery Password
    let recoveryPasswordSendWeb = require('./web/modules/recoveryPassword/recoveryPasswordSend');
    app.post('/web/recoveryPasswordSend', recoveryPasswordSendWeb.recoveryPasswordSend);

    let recoveryPasswordGetHashWeb = require('./web/modules/recoveryPassword/recoveryPasswordGetHash');
    app.post('/web/recoveryPasswordGetHash', recoveryPasswordGetHashWeb.recoveryPasswordGetHash);

    let recoveryPasswordWeb = require('./web/modules/recoveryPassword/recoveryPassword');
    app.post('/web/recoveryPassword', recoveryPasswordWeb.recoveryPassword);
    //endregion

    //region Profile
    let updateProfileWeb = require('./web/modules/profile/updateProfile');
    app.post('/web/updateProfile', multipart({uploadDir: './public/files/logoProfile/'}), updateProfileWeb.updateProfile);

    let getProfileWeb = require('./web/modules/profile/getProfile');
    app.post('/web/getProfile', authenticate, getProfileWeb.getProfile);
    //endregion

    //region Products
    let saveProductsWeb = require('./web/modules/products/saveProducts');
    app.post('/web/saveProducts', multipart({uploadDir: './public/files/imgProducts/'}), saveProductsWeb.saveProducts);

    let getProductsWeb = require('./web/modules/products/getProducts');
    app.post('/web/getProducts', authenticate, getProductsWeb.getProducts);

    let deleteProductsWeb = require('./web/modules/products/deleteProducts');
    app.post('/web/deleteProducts', authenticate, deleteProductsWeb.deleteProducts);

    let saveCategoryWeb = require('./web/modules/products/saveCategory');
    app.post('/web/saveCategory', authenticate, saveCategoryWeb.saveCategory);

    let getCategoryWeb = require('./web/modules/products/getCategory');
    app.post('/web/getCategory', authenticate, getCategoryWeb.getCategory);

    let deleteCategoryWeb = require('./web/modules/products/deleteCategory');
    app.post('/web/deleteCategory', authenticate, deleteCategoryWeb.deleteCategory);
    //endregion

    //region Menu
    let updateMenuWeb = require('./web/modules/menu/updateMenu');
    app.post('/web/updateMenu', authenticate, updateMenuWeb.updateMenu);

    let getMenuWeb = require('./web/modules/menu/getMenu');
    app.post('/web/getMenu', authenticate, getMenuWeb.getMenu);

    let deleteMenuWeb = require('./web/modules/menu/deleteMenu');
    app.post('/web/deleteMenu', authenticate, deleteMenuWeb.deleteMenu);
    //endregion

    //region Tables
    let updateTablesWeb = require('./web/modules/tables/updateTables');
    app.post('/web/updateTables', authenticate, updateTablesWeb.updateTables);

    let getTablesWeb = require('./web/modules/tables/getTables');
    app.post('/web/getTables', authenticate, getTablesWeb.getTables);

    let deleteTablesWeb = require('./web/modules/tables/deleteTables');
    app.post('/web/deleteTables', authenticate, deleteTablesWeb.deleteTables);
    //endregion
    //endregion

    //region APP Routes
    //region doLogin
    let doLoginApp = require('./app/modules/login/doLogin');
    app.post('/app/doLogin', doLoginApp.doLogin);

    let doLoginHack = require('./app/modules/login/doLoginHack');
    app.post('/app/doLoginHack', doLoginHack.doLoginHack);
    //endregion

    //region List Pubs
    let getListPubs = require('./app/modules/mainList/getListPubs');
    app.post('/app/getListPubs', getListPubs.getListPubs);
    //endregion
    //endregion

    //region Response
    app.get('*', function (req, res) {
        res.sendFile(appDir + '/www/index.html');
    });
    //endregion
};