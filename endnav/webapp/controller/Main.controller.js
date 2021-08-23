sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("student19.sap.training.endnav.controller.Main", {
			onInit: function () {
                var oCompData = this.getOwnerComponent().getComponentData();
                if (oCompData && oCompData.startupParameters && oCompData.startupParameters.helloText ) {
                    var sHello = oCompData.startupParameters.helloText[0];
                    var oLabel = this.byId("idInfo");
                    oLabel.setText(sHello);
                }
                
			}
		});
	});
