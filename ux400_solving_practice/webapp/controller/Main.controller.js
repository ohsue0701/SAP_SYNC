sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux400solvingpractice.controller.Main", {
            onInit: function () {
                
                this.getView().setModel(new JSONModel({
                    history : []
                }), "list");

            },
            onRandomPress: function () {
                var randNum = Math.floor(Math.random()*100) + 1;
                this.byId("idInput").setValue(randNum);

                var oModel = this.getView().getModel("list");
                var aHistory = oModel.getProperty("/history");

                aHistory.push({ value : randNum });
                oModel.setProperty("/history", aHistory);
                
            },
            onOpenDialog: function () {
                this.byId("idDialog").open();
            },
            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
            },
            transformDiscontinued: function (bValue) {
                if (bValue == true) {
                    return 'YES!';
                }
                
                else if (bValue == false) {
                    return 'NO!';
                }
            },
            onValueChange: function (oEvent) {
                var oModel = this.getView().getModel("list");
                var aHistory = oModel.getProperty("/history");

                var iInput = oEvent.getParameters().value;
                if (iInput >= 1 && iInput <= 100) {
                    this.byId("idInput").setValueState(sap.ui.core.ValueState.None);
                    this.byId("idInput").setValueStateText("");
                    aHistory.push({ value : iInput });
                    oModel.setProperty("/history", aHistory);
                }
                else {
                    this.byId("idInput").setValueState(sap.ui.core.ValueState.Error);
                    this.byId("idInput").setValueStateText("1 이상 100 이하 수를 입력하세요!");
                }
            }
        });
    });