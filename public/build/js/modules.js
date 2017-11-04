(function(){
"use strict";
angular.module('modules', [
    'home',
    'login'
]);
})();
(function(){
"use strict";
angular.module('home', [])
    .controller('homeController', home);

function home() {
    var home = this;

    console.log(home);
}
})();
(function(){
"use strict";
/**
 * Created by guiga on 20/05/2017.
 */

angular.module('login', [])
    .controller('loginController', login);

function login(dialogAdvanced, loginService, dialogAlert) {
    var login = this;
    login.vars = {};

    login.functions = {
        core : function () {},

        loginAction : function () {
            loginService.doLogin.save(login.vars, function (data) {
                console.log(data.status === true);
                switch (true){
                    case data.status === true:
                        login.vars.alert = false;
                        break;
                        //TODO LOGIN Authenticator

                    case data.status === false:
                        login.vars.alert = true;
                        login.vars.message = 'Alguma coisa deu errado, tente novamente :(';
                        break;

                    default:
                        login.vars.alert = true;
                        login.vars.message = 'Alguma coisa deu errado, tente novamente :(';
                }

                if(login.vars.alert){
                    dialogAlert.show({
                        title : 'Atenção',
                        content : login.vars.message,
                        ok : 'Ok'
                    });
                }
            });
        },

        signUP : function () {
            dialogAdvanced.show({
                controller : signUPController,
                controllerAs : 'signUP',
                templateUrl : 'templates/modules/login/signUPDialog.html',
                clickOutsideToClose : false
                /*functionThen : function () {}*/
            });
        }
    };
}

function signUPController(dialogAdvanced, loginService, zipCodeSearch, $scope, dialogAlert) {
    var signUP = this;
    signUP.vars = {};

    signUP.functions = {
        core : function () {
            signUP.functions.defineVars();
            signUP.functions.watchMatch();
        },

        defineVars : function () {
            signUP.vars.listUF = [
                'SP',
                'AC',
                'AL',
                'AM',
                'AP',
                'BA',
                'CE',
                'DF',
                'ES',
                'GO',
                'MA',
                'MG',
                'MS',
                'MT',
                'PA',
                'PB',
                'PE',
                'PI',
                'PR',
                'RJ',
                'RN',
                'RO',
                'RR',
                'RS',
                'SC',
                'SE',
                'TO'
            ];
        },

        watchMatch : function () {
            $scope.$watchGroup(['signUP.vars.password', 'signUP.vars.repPassword'], function (value) {
                if(value[0] !== value[1]){
                    $scope.adminSignUp.password.$setValidity('notMatch', false);
                    $scope.adminSignUp.repPassword.$setValidity('notMatch', false);
                }else{
                    $scope.adminSignUp.password.$setValidity('notMatch', true);
                    $scope.adminSignUp.repPassword.$setValidity('notMatch', true);
                }
            });
        },

        zipCodeChange : function () {
            if(signUP.vars.zipCode.length >= 8){
                zipCodeSearch.getData(signUP.vars).then(function (data) {
                    signUP.vars.address = data.address.logradouro;
                    signUP.vars.complement = data.address.complemento;
                    signUP.vars.neighborhood = data.address.bairro;
                    signUP.vars.city = data.address.localidade;
                    signUP.vars.uf = data.address.uf;
                    signUP.vars.lat = data.latlong.lat;
                    signUP.vars.long = data.latlong.lng;
                });
            }
        },

        signUPAction : function () {
            loginService.signUP.save(signUP.vars, function (data) {
                switch (true){
                    case data.status === true:
                        signUP.vars.message = 'Você foi cadastrado com sucesso!';
                        //TODO LOGIN Authenticator
                        break;

                    case data.status === false:
                        signUP.vars.message = 'Alguma coisa deu errado, tente novamente :(!';
                        break;

                    default:
                        signUP.vars.message = 'Alguma coisa deu errado, tente novamente :(!';
                }

                dialogAlert.show({
                    title : 'Atenção',
                    content : signUP.vars.message,
                    ok : 'Ok'
                });
            });
        },

        cancel : function () {
            dialogAdvanced.cancel();
        }
    };

    signUP.functions.core();
}
})();
(function(){
"use strict";
/**
 * Created by guiga on 25/05/2017.
 */

angular.module('login')
    .service('loginService', loginService);

function loginService($window, dialogAlert, $resource) {
    return {
        signUP : $resource('web/signUp'),

        doLogin: $resource('web/doLogin'),

        doLogout : function () {}
    }
}
})();