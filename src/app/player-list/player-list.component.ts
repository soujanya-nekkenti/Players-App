import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
declare var $: any;

@Component({
	selector: 'app-player-list',
	templateUrl: './player-list.component.html',
	styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
	api_url: any;
	playersList:any[];
	seletecdPlayer:any;
	seletecdPlayerId:any;
	isSuccess:boolean=false;
	isFormSubmitted:boolean=false;
	message:any='';
	constructor(private http: Http, private router: Router) {
		this.api_url = 'http://localhost:9000/';
	}

	ngOnInit() {
		this.getPlayerList();
	}

	// Get Headers
	getHeaderOption() {
		let headers = new Headers();
		headers.set('content-type', 'application/json');
		headers.set('Accept', 'application/json');
		let option = new RequestOptions({ headers: headers });
		return option
	}

	// Get Player's List
	getPlayerList = function(){
		this.http.get(this.api_url + 'players', this.getHeaderOption()).map(res => res.json()).subscribe(data=>{
			this.playersList = data;
		});
	}

	// Get Selected player details to be deleted
	deletePlayer = function(player){
		this.seletecdPlayer = player.name;
		this.seletecdPlayerId = player.id;
	}

	// Delete selected player
	deleteSelectedPlayer = function(){
		this.http.delete(this.api_url + 'player/'+this.seletecdPlayerId, this.getHeaderOption()).map(res => res.json()).subscribe(data=>{
			this.isFormSubmitted = true;
			if(data.id){
				let newArr = [];
				this.playersList.forEach(element => {
					if(element.id !=this.seletecdPlayerId){
						newArr.push(element);
					}
				});
				this.playersList = newArr;
				this.isSuccess = true;
				this.message = 'Player deleted successfully!';
			}
			else{
				this.isSuccess = false;
				this.message = 'Failed to delete player!';
			}
			$('.btn_close').click();
		});
	}

}
