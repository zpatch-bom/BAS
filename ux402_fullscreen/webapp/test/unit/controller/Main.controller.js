/*global QUnit*/

sap.ui.define([
	"student19com.sap.training.ux402.fullscreen./ux402_fullscreen/controller/Main.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main Controller");

	QUnit.test("I should test the Main controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
