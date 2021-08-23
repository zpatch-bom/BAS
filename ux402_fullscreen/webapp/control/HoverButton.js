sap.ui.define([
	"sap/m/Button"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Button) {
		"use strict";

		return Button.extend("student19.com.sap.training.ux402.fullscreen.ux402fullscreen.controller.HoverButton", {
			metadata:{
                properties:{
                    "allowHover":{
                        type: "boolean",
                        defaultValue: false
                    },
                    "hoverText":{
                        type: "String"
                    }
                },
                events:{
                    "hover":{}
                }
            },
            onmouseover: function (evt) {
                if (this.getAllowHover()) {
                    this.fireHover();
                }
            },
            renderer:{
                
            }
		});
	});
