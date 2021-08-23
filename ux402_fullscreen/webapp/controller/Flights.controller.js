sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "student19/com/sap/training/ux402/fullscreen/ux402fullscreen/control/HoverButton",
    "sap/m/MessageToast"    
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, HoverButton, MessageToast) {
		"use strict";

		return Controller.extend("student19.com.sap.training.ux402.fullscreen.ux402fullscreen.controller.Flights", {
            getRouter: function () {
                //return sap.ui.core.UIComponent.getRouterFor(this);
                return this.getOwnerComponent().getRouter();
            },
			onInit: function () {
                var oRouter = this.getRouter();
                oRouter.getRoute("flights").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function (oEvent) {
                var oArgs = oEvent.getParameter("arguments");
                this._sCarrierId = oArgs.carrierId;
                var oView = this.getView();

                oView.bindElement({
                    path: "/CarrierCollection('" + this._sCarrierId + "')",
                    events:{
                        change: this._onBindingChange.bind(this),
                        dateRequested: function() {
                            oView.setBusy(false);
                        }
                    }
                });
            },
            _onBindingChange: function() {
                var oElmBind;

                oElmBind = this.getView().getElementBinding();

                if (oElmBind && !oElmBind.getBoundContext()) {
                    this.getRouter().getTargets().display("notFound");
                }
            },
            onNavBack: function () {
                var oHist, sPrevHash;

                oHist = sap.ui.core.routing.History.getInstance();
                sPrevHash = oHist.getPreviousHash();

                if (sPrevHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("overview", true );
                }
            },
            onHover: function (evt) {
                //var sText = this.getOwnerComponent().getMo
                MessageToast.show(evt.getSource().getHoverText() + " Eiei",{duration:1000});
            }
		});
	});
