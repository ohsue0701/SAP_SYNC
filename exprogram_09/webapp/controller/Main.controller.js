sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("exam.exprogram09.controller.Main", {
            onInit: function () {
                this.getView().setModel(new JSONModel({
                    history : []
                }), "search")

                this.getView().setModel(new JSONModel({
                    history : []
                }), "data")

                this.byId("idUiTable").setVisible(false);
                this.byId("idChart").setVisible(false);

                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteMain").attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function (oEvent) { 
                this.byId("idTable").removeSelections();

                this.getView().getModel("search").setData({history : []});
                this.getView().getModel("search").refresh();
                
                var aFilter = []
                var oFilter = new Filter({
                    path: "CategoryID",
                    operator: 'EQ',
                    value1: '0'
                });
                aFilter.push(oFilter);
                this.byId("idUiTable").getBinding("rows").filter(aFilter);
                this.byId("idDataSet").getBinding("data").filter(aFilter);

            },
            onSearch: function () {
                var oSearchData = this.getView().getModel("search").getData(); 
                var aFilter = [];
                if (oSearchData.inpId) {
                    var oFilter = new Filter({
                        path : 'CategoryID',
                        operator : FilterOperator.GE, 
                        value1 : oSearchData.inpId,
                        value2 : ''
                    }); 

                    aFilter.push(oFilter);
                }
                
                if (oSearchData.inpValue) {
                    var oFilter = new Filter({
                        path : 'CategoryName',
                        operator : FilterOperator.Contains,
                        value1 : oSearchData.inpValue,
                        value2 : ''
                        
                    }); 

                    aFilter.push(oFilter);
                }


                if (aFilter.length >= 1) {
                    
                    this.byId("idTable").getBinding("items").filter(new Filter({
                        filters : aFilter, 
                        and : true
                    }));
                } else {
                    
                    this.byId("idTable").getBinding("items").filter();
                }
            },
            onSelectionChange: function (oEvent) {

                if(!oEvent.getParameters().listItem.getBindingContextPath())  return; 
                this.byId("idUiTable").setVisible(true);
                this.byId("idChart").setVisible(true);
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                var oSelectData = this.getView().getModel().getProperty(sPath);

                var aFilter = []
                var oSelected = oSelectData.CategoryID
                var oFilter = new Filter({
                    path: "CategoryID",
                    operator: 'EQ',
                    value1: oSelected
                });
                aFilter.push(oFilter);
                this.byId("idUiTable").getBinding("rows").filter(aFilter);
                this.byId("idDataSet").getBinding("data").filter(aFilter);

                // read 구문으로 가져온 값을 console에 출력하기
                var oDataModel = this.getView().getModel();
                oDataModel.read("/Products", {
                    urlParameters : {
                        "$select" : "CategoryID,ProductName,UnitsInStock,UnitsOnOrder" 
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
            onSelectData: function (oEvent) {
                var sPath = oEvent.getParameters().data[0].data;
                this.oRouter.navTo('RouteDetail', {
                    ProductName : sPath.x1
                }, true);
            },

            onShowHeart: function () { // (추가) 관심 상품 등록 기능 - 관심 상품 리스트 팝업 여는 함수
                this.byId("idDialog").open();
            },
            onClose: function(oEvent) { // (추가) 관심 상품 등록 기능 - 관심 상품 리스트 팝업 닫는 함수
                oEvent.getSource().getParent().close(); 
            }
        });
    });
