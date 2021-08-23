sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/Sorter"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, Filter, FilterOperator, Sorter) {
		"use strict";

		return Controller.extend("student19.sap.training.dynpage.controller.Overview", {
            onInit: function() {
			    this._oList = this.byId("idCarrierList");
			    this.getView().addEventDelegate({
					onBeforeFirstShow: function () {
						this.getOwnerComponent().oListSelector.setBoundMasterList(this._oList);
					}.bind(this)
				});
				this.getView().addEventDelegate({
					onBeforeFirstShow: function () {
						this.getOwnerComponent().oListSelector.setBoundMasterList(this._oList);
					}.bind(this)
				});
				
				this.getRouter().getRoute("Overview").attachPatternMatched(this._onMasterMatched, this);
                this.getRouter().attachBypassed(this.onBypassed, this);
                
                this.aKeys = ["Carrid", "Carrname"];
			    this.oFilterBar = this.byId("idFilterBar");
			    this.oCarIdIF = this.byId("idFilterCarrid");
                this.oCarNameIF = this.byId("idFilterCarrname");
                this.oFilterBar.registerGetFiltersWithValues(this.fGetFiltersWithValues);
		    },

            getRouter: function () {
			    return sap.ui.core.UIComponent.getRouterFor(this);
		    },

		    onPress: function (oEvent) {
			    var oItem, oCtx, sCarrid;
			    oItem = oEvent.getSource();
			    oCtx = oItem.getBindingContext();
			    sCarrid = oCtx.getProperty("Carrid");
			    this._showCarrierDetails(sCarrid);
            },
            
            onBypassed: function () {
				this._oList.removeSelections(true);
		    },
		
		    _onMasterMatched:  function() {
			    this.getOwnerComponent().getModel("appView").setProperty("/layout", "OneColumn");
            },
            
            onSelectionChange: function(oEvent)  {
			    var oItem, oCtx, sCarrid;
			    oItem = oEvent.getParameter("listItem");
			    oCtx = oItem.getBindingContext();
			    sCarrid = oCtx.getProperty("Carrid");
			    this._showCarrierDetails(sCarrid);
		    },
		
		    _showCarrierDetails: function(sCarrid) {
			    var oRouter = this.getRouter();
			    oRouter.navTo("Carrier", {
				    carrierId: sCarrid
			    }, false /*with history*/ );
            },
            
            getTable: function () {
			    return this.getView().byId("idCarrierList");
            },
            
		    getTableItems: function () {
			    return this.getTable().getBinding("items");
		    },
        
            getFilters: function (aCurrentFilterValues, bAnd) {
			    this.aFilters = [];
			    this.aFilters = this.aKeys.map(function (sCriteria, i) {
				    return new Filter(sCriteria, FilterOperator.Contains, aCurrentFilterValues[i]);
			    });
			    return new Filter({
				    filters: this.aFilters,
				    and: bAnd
			    });
		    },
        
            filterTable: function (aCurrentFilterValues, bAnd) {
			    this.getTableItems().filter(this.getFilters(aCurrentFilterValues,bAnd));
		    },
        
            onSearch: function (oEvent) {
			    var aCurrentFilterValues = [];
			    this.aKeys = [];
			    if(oEvent.getParameter("query")) {
				    var sQuery = oEvent.getParameter("query");
				    this.aKeys = ["Carrid", "Carrname"];
				    aCurrentFilterValues.push(sQuery);
				    //aCurrentFilterValues.push(sQuery);
				    this.filterTable(aCurrentFilterValues,false);
			    } else if(oEvent.getParameter("selectionSet")) {
				    if(this.oCarIdIF.getValue() !== "") {
					    this.aKeys.push("Carrid");
					    aCurrentFilterValues.push(this.oCarIdIF.getValue());
				    }
				    if(this.oCarNameIF.getValue() !== "") {
					    this.aKeys.push("Carrname");
					    aCurrentFilterValues.push(this.oCarNameIF.getValue());
				    }
				    this.filterTable(aCurrentFilterValues, true);	
			    }
            },
            
            onClear: function (oEvent) {
			    var oItems = this.oFilterBar.getAllFilterItems(true);
			    for (var i = 0; i < oItems.length; i++) {
				    var oControl = this.oFilterBar.determineControlByFilterItem(oItems[i]);
				    if (oControl) {
					    oControl.setValue("");
				    }
			    }
		    },
        
            onFilterChange: function (oEvent) {
			    this.oFilterBar.fireFilterChange(oEvent);
		    },
        
            onReset: function(oEvent) {
			    this.getTableItems().filter([]);
		    },
        
            fGetFiltersWithValues: function () {
			    var i;
			    var oControl;
			    var aFilters = this.getFilterGroupItems();
			    var aFiltersWithValue = [];
			    for (i = 0; i < aFilters.length; i++) {
				    oControl = this.determineControlByFilterItem(aFilters[i]);
				    if (oControl && oControl.getValue && oControl.getValue()) {
					    aFiltersWithValue.push(aFilters[i]);
				    }
			    }
			    return aFiltersWithValue;
            },
            
            onUpdateFinished: function(oEvent) {
				if(this.getTableItems().isLengthFinal()) {
					var iCount = oEvent.getParameter("total");
					var oJSONModel = this.getOwnerComponent().getModel("appView");
					oJSONModel.setProperty("/count", iCount);
					this.getOwnerComponent().setModel(oJSONModel,"appView");
				}	
            },
            
            onOpenViewSettings: function(oEvent) {
			    if (!this._oViewSettingsDialog) {
				    this._oViewSettingsDialog = sap.ui.xmlfragment(
                        "student19.sap.training.dynpage.view.ViewSettingsDialog", 
                        this
                    );
				    this.getView().addDependent(this._oViewSettingsDialog);
				    jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oViewSettingsDialog);
				}
				var sDialogTab = "sort";
				if (oEvent.getSource() instanceof sap.m.Button) {
					var sButtonId = oEvent.getSource().getId();
					if (sButtonId.match("group")) {
						sDialogTab = "group";
					}
				}
				this._oViewSettingsDialog.open(sDialogTab);
            },
            
		    onConfirmViewSettingsDialog: function (oEvent) {
			    var mParams = oEvent.getParameters(),
					sPath,
					bDescending,
					aSorters = [];
				if (mParams.groupItem) {
					sPath = mParams.groupItem.getKey();
					bDescending = mParams.groupDescending;
					aSorters.push(new Sorter(sPath, bDescending, true));
				}
				if(mParams.sortItem) {
					sPath = mParams.sortItem.getKey();
					bDescending = mParams.sortDescending;
					aSorters.push(new Sorter(sPath, bDescending));
				}
				this.getTableItems().sort(aSorters);
		    }
		});
	});