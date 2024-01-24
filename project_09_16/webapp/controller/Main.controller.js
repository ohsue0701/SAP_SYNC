sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0916.controller.Main", {
            onInit: function () {
                // this.byId("idImage").setSrc(_rootPath + "/image/maru2.jpg")
                // this.byId("idFamilyImage").setSrc(_rootPath + `../image/maru2.jpg`)
            },
            setImageURL: function(sValue) {
                return `${_rootPath}/image/${sValue}.png`;
            }
        });
    });
