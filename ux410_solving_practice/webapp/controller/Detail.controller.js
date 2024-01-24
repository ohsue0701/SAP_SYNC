sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter) {
        "use strict";

        return Controller.extend("sap.btp.ux410solvingpractice.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter(); // 메니페스트 안의 모든 라우터 정보 가져오기
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function (oEvent) {
                var oArgu = oEvent.getParameter('arguments');
                console.log(oArgu);
                this.byId("idForm").bindElement(`/Order_Details(OrderID=${oArgu.OrderID},ProductID=${oArgu.ProductID})`);
            },
            onNavBack: function () {
                this.oRouter.navTo('RouteMain', {
                test: 'test!!!!!!!!!!!!!!!!!!'
                }, true);
            }
        });
    });
