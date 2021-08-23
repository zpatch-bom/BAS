/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student19sap.training./diagram/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
