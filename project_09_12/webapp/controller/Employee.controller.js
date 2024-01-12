sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0912.controller.Employee", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteEmployee").attachPatternMatched(this._onPatternMatched, this); 
                // 여기서 얘네 두줄을 주석처리하면 메인으로 안돌아가짐.

            },
            _onPatternMatched: function (oEvent) {
                var oArgu = oEvent.getParameters().arguments;
                console.log("Employee : ", oArgu); // 메인컨에서 보낸 애를 잘 받아오는지!
            },

            onNavBack: function () {
                this.oRouter.navTo('RouteMain', {
                    "query" : {
                        employee_tab : 'From_Employee',
                        employee_test : 10000
                    }// 값 두개이상이면 tab=okok&test=10 이런식으로 뜸
                });
            }

        });
    });
