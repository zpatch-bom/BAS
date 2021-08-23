sap.ui.define([
    'sap/ui/base/Object'
], function(BaseObject) {

    return BaseObject.extend("student19.com.sap.training.ux402.masterdetail.ux402masterdetail.controller.ListSelector", {
        contructor: function () {
            this._oWhenListHasBeenSet = new Promise( function (fnResolveSet) {
                this._fnResolveSet = fnResolveSet;
            }.bind(this));
            this.oWhenListLoadingIsDone = new Promise(function(fnResolve,fnReject) {
                
                this._oWhenListHasBeenSet.then(function(oList) {
                    oList.getBinding("items").attachEventOnce("dataReceived",
                        function (oData) {
                            if (!oData.getParameter("data")) {
                                fnReject({
                                    list: oList,
                                    error: true
                                });
                            }

                            var oFirst = oList.getItems()[0];
                            if (oFirst) {
                                fnResolve({
                                    list: oList,
                                    firstListitem: oFirst
                                });
                            } else {
                                fnReject({
                                    list: oList,
                                    error: false
                                });
                            }
                        }
                    )
                });
            }.bind(this));
        },
        selectAListItem: function (sBindingPath) {
            this.oWhenListLoadingIsDone.then(
                function () {
                    var oList = this._oList, oSelect;

                    if (oList.getMode() === "None") {
                        return;
                    }
                    oSelect = oList.getSelectedItem();

                    if (oSelect && oSelect.getBindingContext().getPath() == sBindingPath) {
                        return;
                    }
                    oList.getItems().some(function (oItem) {
                        
                    });
                }
            );
        }
    });
}); 