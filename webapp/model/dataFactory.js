
    sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";

	return {

		getCarsData: function () {

			var oModel = new JSONModel("model/cars.json");
			//oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}

	};
});