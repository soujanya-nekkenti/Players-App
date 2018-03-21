import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
	selector: 'app-manage-player',
	templateUrl: './manage-player.component.html',
	styleUrls: ['./manage-player.component.css']
})
export class ManagePlayerComponent implements OnInit {
	api_url: any;
	playerId:any;
	title:any;
	btnTitle:any;
	playerForm:any='';
	isSuccess:boolean;
	isFormSubmitted:boolean=false;
	message:any='';
	constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
		this.api_url = 'http://localhost:9000/';
	}

	ngOnInit() {
		this.playerForm = new FormGroup({
			name: new FormControl("", Validators.compose([
				Validators.required
			])),
		});

		this.route.params.subscribe(params => {
			if(params.player_id){
				this.title = 'Update Player';
				this.btnTitle = 'Update';
				this.playerId = params.player_id;
				this.http.get(this.api_url + 'player/'+params.player_id, this.getHeaderOption()).map(res => res.json()).subscribe(data=>{
					this.playerForm.controls['name'].setValue(data.name);
				});
			}
			else{
				this.playerId = '';
				this.title = 'Add Player';
				this.btnTitle = 'Add';
			}
		});
	}

	// Get Headers
	getHeaderOption() {
		let headers = new Headers();
		headers.set('content-type', 'application/json');
		headers.set('Accept', 'application/json');
		let option = new RequestOptions({ headers: headers });
		return option
	}

	// Submit player data
	onSubmit = function(data){
		if(this.playerForm.valid){
			this.isFormSubmitted = true;
			if(this.playerId!=''){
				this.http.put(this.api_url + 'player/'+this.playerId, JSON.stringify(data), this.getHeaderOption()).map(res => res.json()).subscribe(response=>{
					if(response.id){
						this.isSuccess = true;
						this.message = 'Player Update Successfully!'
						this.playerForm.reset();
					}
					else{
						this.isSuccess = false;
						this.message = 'Failed to update player.'
					}
				});
			}
			else{
				this.http.post(this.api_url + 'player', JSON.stringify(data), this.getHeaderOption()).map(res => res.json()).subscribe(response=>{
					if(response.id){
						this.isSuccess = true;
						this.message = 'Player Added Successfully!'
						this.playerForm.reset();
					}
					else{
						this.isSuccess = false;
						this.message = 'Failed to add player.'
					}
				});
			}
		}
		else{

		}
	}
}
