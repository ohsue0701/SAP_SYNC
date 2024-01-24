/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */
// 완전 전역변수. 모든 페이지에서 쓸 수 있는.
var _rootPath = jQuery.sap.getModulePath("project0916").split('/~')[0];

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "project0916/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("project0916.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);