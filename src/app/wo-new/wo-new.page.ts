import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
	selector: 'app-wo-new',
	templateUrl: './wo-new.page.html',
	styleUrls: ['./wo-new.page.scss'],
})
export class WONEWPage implements OnInit {

	myFormGroup: FormGroup;
	form_template: any[];
	req_array: any[] = [];

	constructor(
		private api: ApiService,
		public loadingController: LoadingController,
		public alertController: AlertController
	) { }

	async loadingWithOptions() {
		const loading = await this.loadingController.create({
			spinner: 'bubbles',
			duration: 50000,
			message: 'Please wait...',
			translucent: true
		});
		return await loading;
	}

	async presentAlert(header:string, subHeader:string, msg:string ) {
		const alert = await this.alertController.create({
			header: header,
			subHeader: subHeader,
			message: msg,
			animated: true,
			cssClass: 'alert-css-class',
			buttons: ['OK']
		});
		return await alert;
	}

	ngOnInit() {
		let form = {};
		let load = this.loadingWithOptions();
		load.then(spinner => spinner.present());
		this.api.getElement('init').subscribe(results => {
			for (let i = 0; i < results.length; i++) {
				const element = results[i];
				var temp = element.POS_DICT_NAME;
				temp = temp[0] == "#" ? temp.slice(1, temp.length) : temp;

				// Clean up the object
				element.POS_CONTROL_DISABLED = element.POS_CONTROL_DISABLED == '1' ? true : false
				element.POS_REQUIRED = element.POS_REQUIRED == '1' ? true : false
				element.POS_LABEL = element.POS_REQUIRED ? '*' + element.POS_LABEL : element.POS_LABEL;
				element.POS_DICT_NAME = temp;
				if (element.POS_CONTROL_TYPE == "CHECKBOX" && element.POS_DEFAULT_CODE == '') element.POS_DEFAULT_CODE = false;
				results[i] = element;


				// Set Validation and DEFAULT CODE
				if (element.POS_REQUIRED) {
					this.req_array.push(temp);
					form[temp] = new FormControl({
						value: element.POS_DEFAULT_CODE,
						disabled: element.POS_CONTROL_DISABLED
					}, Validators.required);
				} else {
					form[temp] = new FormControl({
						value: element.POS_DEFAULT_CODE,
						disabled: element.POS_CONTROL_DISABLED
					});
				}

			}
			this.myFormGroup = new FormGroup(form);
			this.form_template = results;
			this.myFormGroup.updateValueAndValidity();
			load.then(spinner => spinner.dismiss());
		})
	}

	onSubmit() {
		let results = this.myFormGroup.getRawValue();
		var skipped = [];
		// Check Required Fields
		if (this.req_array.length) {
			for (let i = 0; i < this.req_array.length; i++) {
				if (results[this.req_array[i]] == '') skipped.push(this.req_array[i]);
			}
			// if either BUILDING_ID or EQP_NO filled 
			if (results.EQP_NO.length || results.BUILDING_ID.length) {
				var x = skipped.indexOf('EQP_NO');
				if (x > -1) skipped.splice(x,1);
				x = skipped.indexOf('BUILDING_ID');
				if (x > -1) skipped.splice(x,1);
			}
		}
		if (skipped.length) {
			let header = "Required Fields";
			let subHeader = '';
			var message = "<p>Please fill the following fields: </p><ul>";
			skipped.forEach(element => {
				message += "<li>"+element+"</li>";
			})
			message += '</ul>'
			let popup = this.presentAlert(header, subHeader, message);
			popup.then(alert => alert.present());
			return;
		}
	}

}
