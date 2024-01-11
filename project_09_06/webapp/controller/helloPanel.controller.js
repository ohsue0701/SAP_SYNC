sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0906.controller.helloPanel", {
            onInit: function () {

            },

            onShowHello: function () {
                // alert("Hello!");
                sap.m.MessageToast.show("Hello!")

            }

        });
    });
