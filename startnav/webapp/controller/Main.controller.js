sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("student19.sap.training.startnav.controller.Main", {
			onInit: function () {
                console.log("Start onInit");
                this._fnGetService = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
                this._crossAppNavigation = this._fnGetService && this._fnGetService("CrossApplicationNavigation");

                if (this._crossAppNavigation) {
                    console.log("CrossAppNav");
                    var oHref = this._crossAppNavigation.hrefForExternal({
                        target:{
                            semanticObject : "UX410Nav19",
                            action : "end"                            
                        },
                        params:{
                            "helloText":"Hi"
                        }
                    });
                }

                var oLink = this.byId("idNavLink");
                oLink.setHref(oHref);
            },
            onPress: function (oEvent) {

                var oTextIn = this.byId("idTextIn");
                var sText = oTextIn.getValueLiveUpdate();
                if (this._crossAppNavigation) {
                    var oHref = this._crossAppNavigation.toExternal({
                        target:{
                            semanticObject : "UX410Nav19",
                            action : "end"                            
                        },
                        params:{
                            "helloText":sText
                        }
                    });
                }
			}
		});
	});
