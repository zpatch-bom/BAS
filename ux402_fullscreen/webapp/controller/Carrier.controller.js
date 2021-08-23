sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("student19.com.sap.training.ux402.fullscreen.ux402fullscreen.controller.Carrier", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onPress: function (oEvent) {
                var oItem = oEvent.getSource();
                var oCtx = oItem.getBindingContext();
                var sCarrid = oCtx.getProperty("AirLineID");

                this.getRouter().navTo("flights",{
                    carrierId: sCarrid
                }, false);
            }
		});
	});
