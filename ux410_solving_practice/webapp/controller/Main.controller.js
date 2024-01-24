sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter) {
        "use strict";

        return Controller.extend("sap.btp.ux410solvingpractice.controller.Main", {
            onInit: function () {

                this.oRouter = this.getOwnerComponent().getRouter(); // 메니페스트 안의 모든 라우터 정보 가져오기
                this.oRouter.getRoute("RouteMain").attachPatternMatched(this._onPatternMatched, this);

                this.getView().setModel(new JSONModel({
                    list : [
                        { type : 'bar' },
                        { type : 'column' },
                        { type : 'line' },
                        { type : 'donut' }
                    ]
                }), 'typeList');
                this.byId("idComboBox2").setValue('bar');
                this.byId("idComboBox2").setSelectedItem('bar');
            },
            _onPatternMatched: function (oEvent) {
                var oArgu = oEvent.getParameter('arguments');
            },
            onSearch: function () {

                    if (this.byId("idComboBox2").getSelectedItem()) {
                    this.byId("idComboBox2").setValueState(sap.ui.core.ValueState.None);
                    this.byId("idComboBox2").setValueStateText("");
                    this.byId("idChart").setVizType(this.byId("idComboBox2").getSelectedItem().getText());
                    
                } else {
                    this.byId("idComboBox2").setValueState(sap.ui.core.ValueState.Error);
                    this.byId("idComboBox2").setValueStateText("뭐라도 선택하세요!");
                    return;
                }


                var aFilter = [];
                var oSelected = this.byId("idComboBox1").getSelectedItem().getText();
                var oFilter = new Filter({
                    path : 'OrderID',
                    operator : 'EQ',
                    value1 : oSelected
                });
                aFilter.push(oFilter);
                this.byId("idDataset").getBinding("data").filter(aFilter);
            },
            onSelectData : function (oEvent) {
                var oSelectedOrderID = oEvent.getParameters().data[0].data.OrderID;
                var oSelectedProductID = oEvent.getParameters().data[0].data.ProductID;
                this.oRouter.navTo('RouteDetail', {
                    OrderID : oSelectedOrderID, // 디테일 페이지의 패턴에 맞추어 전달할 값 기재
                    ProductID : oSelectedProductID
                    }, true);
            }
        });
    });
