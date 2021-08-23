sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"student19/com/sap/training/ux402/masterdetail/ux402masterdetail/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("student19.com.sap.training.ux402.masterdetail.ux402masterdetail.Component", {

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
});
