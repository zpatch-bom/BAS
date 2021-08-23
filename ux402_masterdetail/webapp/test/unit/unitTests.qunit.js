/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student19com.sap.training.ux402.masterdetail./ux402_masterdetail/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
