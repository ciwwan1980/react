sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/demo/fiori2/model/dataFactory"
], function (Controller, DataFactory) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.Detail", {
		
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();
            this.oView.setModel(DataFactory.getCarsData(), 'CarsModel')

			this.oRouter.getRoute("master").attachPatternMatched(this._onCarMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onCarMatched, this);
		},

		_onCarMatched: function (oEvent) {
        
			this._car = oEvent.getParameter("arguments").car || this._car|| "1";
           
			this.getView().bindElement({
				path: "/carsCollection/" + this._car,
				model: "CarsModel"
			});
		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onCarMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onCarMatched, this);
		}
	});
});
