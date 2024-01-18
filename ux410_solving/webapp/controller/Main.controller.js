sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/json/JSONModel", "sap/viz/ui5/controls/VizFrame"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel, VizFrame) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel({
                    list : [
                        { type : "bar" },
                        { type : "column" },
                        { type : "line" },
                        { type : "donut" }
                    ]
                });
                this.getView().setModel(oModel, 'typeList');
                this.byId("idComboBox2").setSelectedKey("bar");

                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteMain").attachPatternMatched(this._onPatternMatched, this);
                // 이 줄은 얘는 없어도 구동은 되는데 다른 페이지에서 뒤로가기 할때 대조하려고...???
                // 메인으로 navback하는 함수를 디테일에서 구현하려면 이게 필요하다.

            },
            _onPatternMatched: function (oEvent) { 
                var oArgu = oEvent.getParameter('arguments');
                // var oArgu = oEvent.getParameters.arguments; // 위와 동일
            },
            onSearch: function () {
            // - **검색 조건의 OrderID 로 필터가 적용된 차트를 조회**
            // - **sap.ui.model.Filter 활용**
            // - **FlattenedDataset 객체를 가져와서, data 프로퍼티 바인딩 정보를 얻음**
            // - **해당 바인딩 정보에 sap.ui.model.Filter 적용**
                var aFilter = []
                var oSelected = this.byId("idComboBox").getSelectedItem().getText();
                var oFilter = new Filter({
                    path: "OrderID",
                    operator: 'EQ',
                    value1: oSelected
                });
                aFilter.push(oFilter);
                this.byId("idDataSet").getBinding("data").filter(aFilter);
                // 이 필터를 적용할 객체의 속성을 가져와서 바인딩하기!!!!!!!!
                // FlattenedDataset 객체를 가져와서, data 프로퍼티 바인딩 정보를 얻음
            },
            onValueChange: function () {
                var oSelected = this.byId("idComboBox2").getSelectedItem();
                if (oSelected) {
                    this.byId("idComboBox2").setValueState(sap.ui.core.ValueState.None);
                    this.byId("idComboBox2").setValueStateText("");

                } else {
                    this.byId("idComboBox2").setValueState(sap.ui.core.ValueState.Error);
                    this.byId("idComboBox2").setValueStateText("반드시 선택해야 합니다.");

                }

                var sSelected = oSelected.getText();
                var oChart = this.byId("idChart")
                if (sSelected == "bar") { 
                    oChart.setVizType("bar");
                }
                else if (sSelected == "column") { 
                    oChart.setVizType("column");
                }
                else if (sSelected == "line") { 
                    oChart.setVizType("line");
                }
                else if (sSelected == "donut") { 
                    oChart.setVizType("donut");
                }
            },
            onSelectData: function (oEvent) {
                var sPath = oEvent.getParameters().data[0].data;

                // var oSelectData = this.getView().getModel().getProperty(sPath);
                console.log(sPath);
                this.oRouter.navTo('RouteDetail', {
                    OrderID : sPath.x1,
                    ProductID : sPath.x2
                }, true);
            }
        });
    });
