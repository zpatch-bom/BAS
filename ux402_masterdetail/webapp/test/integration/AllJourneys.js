sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "student19.com.sap.training.ux402.masterdetail.ux402masterdetail.view.",
		autoWait: true
	});
});
