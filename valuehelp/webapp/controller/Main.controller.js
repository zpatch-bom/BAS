sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
	    "sap/ui/model/FilterOperator"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, Filter, FilterOperator) {
		"use strict";

		return Controller.extend("student19.sap.training.valuehelp.controller.Main", {
            _oFormFragments: {},

            onInit: function () {
                this.oDynamicPage = this.byId("idHeaderLayout");
			    this.oDynamicPage.setVisible(false);
            },
            
            onValueHelpRequest: function (oEvent) {
			    var sInputValue = oEvent.getSource().getValue();
			    this._sInputId = oEvent.getSource().getId();
                if (!this._oValueHelpDialog) {
				    this._oValueHelpDialog = sap.ui.xmlfragment(
					    "student19.sap.training.valuehelp.view.CarrierSelectionDialog", this
				    );
				    this.getView().addDependent(this._oValueHelpDialog);
			    }
			    this._oValueHelpDialog.getBinding("items").filter([new Filter(
				    "Carrid", FilterOperator.Contains, sInputValue
			    )]);
			    this._oValueHelpDialog.open(sInputValue);
            },
            
            onValueHelpSearch: function (oEvent) {
			    var sValue = oEvent.getParameter("value");
			    var oFilter = new Filter(
				    "Carrid", FilterOperator.Contains, sValue
			    );
			    var oFilter2 = new Filter(
				    "Carrname", FilterOperator.StartsWith, sValue
			    );
			    var oFilter3 = new Filter({
				    filters: [oFilter, oFilter2],
				    and: false
			    });
			    oEvent.getSource().getBinding("items").filter([oFilter3]);
            },
            
            onValueHelpClose: function (oEvent) {
			    var oSelectedItem = oEvent.getParameter("selectedItem");
			    if (oSelectedItem) {
				    var oCarridInput = this.getView().byId(this._sInputId);
				    oCarridInput.setValue(oSelectedItem.getTitle());
			    }
			    oEvent.getSource().getBinding("items").filter([]);
			    this.oDynamicPage.setVisible(true);
			    var oFlightsFragment = this._createFlightsTable();
			    var sPath = oSelectedItem.getBindingContext().getPath();
			    oFlightsFragment.bindElement(sPath);
			    this.byId("idHeaderLayout").bindElement(sPath);
            },
            
            _createFlightsTable : function() {
			    var oFragment = this._oFormFragments["Flights"];
			    if (oFragment) {
				    return oFragment;
			    }
			    oFragment = sap.ui.xmlfragment(
                    this.getView().getId(), 
                    "student19.sap.training.valuehelp.view.Flights"
                );
			    var oDynPage = this.byId("idDynPage");
			    oDynPage.destroyContent();
			    oDynPage.setContent(oFragment);
			    this._oFormFragments["Flights"] = oFragment;
			    return oFragment;
		    }
		});
	});