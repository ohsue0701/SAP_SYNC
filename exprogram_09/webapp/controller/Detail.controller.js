sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/json/JSONModel", "sap/viz/ui5/controls/VizFrame"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
        "use strict";

        return Controller.extend("exam.exprogram09.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function (oEvent) {
                var oArgu = oEvent.getParameters().arguments;
                this.byId("pageId").setTitle(oArgu.ProductName + " 상품의 주문 조회");

                var aFilter = []
                var oSelected = oArgu.ProductName
                var oFilter = new Filter({
                    path: "ProductName",
                    operator: 'EQ',
                    value1: oSelected
                });
                aFilter.push(oFilter);
                this.byId("idDetailTable").getBinding("items").filter(aFilter);

                // read 구문으로 가져온 값을 console에 출력하기
                var oDataModel = this.getView().getModel();
                oDataModel.read("/Sales_by_Categories", {
                    urlParameters : {
                        "$select" : "ProductName,ProductSales" 
                    },
                    filters: [oFilter],
                    success: function(oReturn) {
                        console.log("전체조회 완료 ", oReturn);
                    },
                    error: function (oError) { 
                        console.log("전체조회 중 오류 발생 : ", oError);
                    }
                });
                
            },
            onNavBack: function () {
                var sTitle = this.byId("pageId").getTitle();
                this.oRouter.navTo('RouteMain', {
                    query: {
                        fromDetail : sTitle || "None"
                    }
                }
                , true);
                
            },
            onHeart: function () { // (추가) 관심 상품 등록 기능 - 새로 생성한 전역모델 heart에 관심 상품 객체 등록하는 함수
                var sTitle = this.byId("pageId").getTitle();
                sTitle = sTitle.substring(0, sTitle.length - 10);
                var newHeartList = {
                    heartProductName : sTitle
                };
                var oHeartModel = this.getView().getModel("heart");
                var aHeartList = oHeartModel.getProperty("/heartList");
                aHeartList.push(newHeartList);
                oHeartModel.setProperty("/heartList", aHeartList);
            }
            
        });
    });
