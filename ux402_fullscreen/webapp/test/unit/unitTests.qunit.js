/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student19com.sap.training.ux402.fullscreen./ux402_fullscreen/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
