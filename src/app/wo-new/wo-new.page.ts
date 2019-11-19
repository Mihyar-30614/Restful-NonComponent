import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from "@ionic/angular";

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
		public loadingController: LoadingController
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
		if (this.req_array.length) {
			for (let i = 0; i < this.req_array.length; i++) {
				if (results[this.req_array[i]] == '') skipped.push(this.req_array[i]);
			}
		}
		if (skipped.length) {
			alert("Please fill the following fields: \n\t" + skipped.join("\n\t"));
			return;
		}
	}

}
