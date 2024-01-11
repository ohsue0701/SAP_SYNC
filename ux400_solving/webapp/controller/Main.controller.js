sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";
        var temp = 1;
        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel({
                    history : []
                });
                this.getView().setModel(oModel, "list")

            },
            onRandomPress: function () {
                var randNum = Math.floor(Math.random() * 100) + 1;
                this.byId("idInput").setValue(randNum);

                var oModel0 = this.getView().getModel("list"); 
                var aHistory = oModel0.getProperty("/history");

                aHistory.push({
                    num : randNum
                })

                oModel0.setProperty("/history", aHistory);

            },
            onOpenDialog: function () {
                this.byId("idDialogf").open();
            },
            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
            },

            transformDiscontinued: function (bValue) {
                if (bValue == true) {
                    return "YES";
                } else {
                    return "NO";
                }
            },
            onValueChange: function () {
                var oModel0 = this.getView().getModel("list"); 
                var aHistory = oModel0.getProperty("/history");

                var inputValue = this.byId("idInput").getValue()
                if (inputValue >= 1 && inputValue <= 100) {
                    this.byId("idInput").setValueState(sap.ui.core.ValueState.None);
                    this.byId("idInput").setValueStateText("");
                    aHistory.push({
                        num : inputValue
                    })
    
                    oModel0.setProperty("/history", aHistory);
                } else {
                    this.byId("idInput").setValueState(sap.ui.core.ValueState.Error);
                    this.byId("idInput").setValueStateText("1 이상 100 이하의 숫자를 입력하세요.");

                }
            }
        });
    });
