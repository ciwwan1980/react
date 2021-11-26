sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library',
	"sap/ui/demo/fiori2/model/dataFactory"
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary,DataFactory) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.Master", {
		onInit: function () {
			this.oView = this.getView();
			//this.oDataFactory = DataFactory;
			this.oView.setModel(DataFactory.getCarsData(), 'CarsModel')
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("productsTable");
			this.oRouter = this.getOwnerComponent().getRouter();
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");
		if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("model", FilterOperator.Contains, sQuery)];
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function () {
			MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("id", this._bDescendingSort);
			oBinding.sort(oSorter);
		},
		

		onListItemPress: function (oEvent) {
			var carPath = oEvent.getSource().getBindingContextPath(),
				car = carPath.split("/").slice(-1).pop();
				// jQuery.sap.log.debug(car, "car is here--------")
	
			this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, car: car});
		}
	});
});
