'use strict';

let output = document.getElementById('output');
let age_1;
let age_2;
let gender_1;
let gender_2
let race_1;
let race_2;
let race_1_rate;
let race_2_rate;
let eyeDis_1;
let eyeDis_2;
let glasses_1;
let glasses_2;
let lips_1
let lips_2;
let total_score;
init();

function init() {
	document.getElementById('button1').addEventListener('click',image1_input,false);
	document.getElementById('button2').addEventListener('click',image2_input,false);
	document.getElementById('submitButton').addEventListener('click',clickHandler,false);
}

function image1_input(){ //textboxに追加されたテキストを取得し、image1を表示
	var img1_url = image1_form.image1.value;
	console.log(img1_url);
	var image = new Image(300);
	let count=1
	// URL を指定して画像を読み込み
	image.src = img1_url;
	
	// 画像を表示
	document.body.appendChild(image);
	research(img1_url,count);
	research_3(img1_url,count);

}

function image2_input(){ //textboxに追加されたテキストを取得し、image1を表示
	//textboxに追加されたテキストを取得し、image1を表示
	var img2_url = image2_form.image2.value;
	console.log(img2_url);
	var image = new Image(300);
	let count=2;
	// URL を指定して画像を読み込み
	image.src = img2_url;
	
	//画像を表示
	document.body.appendChild(image);

	research(img2_url,count)
	research_3(img2_url,count);

}

function research(img_url,count){
console.log("reseach",img_url,"を調査");
let imgUrl = encodeURIComponent(img_url);
let url = 'https://api.kairos.com/v2/media?source='+imgUrl;
let request = new XMLHttpRequest();

request.open('POST', url);
request.setRequestHeader('app_id', '624780e5');
request.setRequestHeader('app_key', '4b36597428611a1181d76bef3fc68839');


request.onreadystatechange = function () {
  if (this.readyState === 4) {
	let json = JSON.parse(this.responseText);
	console.log( "画像ID",JSON.parse(this.responseText) );
	let img_id = json.id;
	console.log( img_id);
	research_2(img_id,count)
  }  
};
request.send();

}

function research_2(img_id,count){
	let url_re = 'https://api.kairos.com/v2/analytics/'+ img_id ;
	let request = new XMLHttpRequest();
	console.log("research2",img_id,"を調査");
	request.open('GET',url_re);
	request.setRequestHeader('app_id', '624780e5');
	request.setRequestHeader('app_key', '4b36597428611a1181d76bef3fc68839');
	
	
	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log("感情", JSON.parse(this.responseText) );
	  }  
	};
	
	request.send();
}

function research_3(img_url,count){
	let url_3= 'https://api.kairos.com/detect?image='+encodeURIComponent(img_url);
	let request = new XMLHttpRequest();
	console.log("research3",img_url,"を調査");
	request.open('POST',url_3);
	request.setRequestHeader('app_id', '624780e5');
	request.setRequestHeader('app_key', '4b36597428611a1181d76bef3fc68839');
		
		
	request.onreadystatechange = function () {
	  if (this.readyState === 4) {
		console.log( "特徴",JSON.parse(this.responseText) );
		if(count==1){
			let json_3 = JSON.parse(this.responseText);
			//年齢判定
			age_1 =json_3.images[0].faces[0].attributes.age;
			console.log("年齢",age_1);
			
			//性別判定
			if(json_3.images[0].faces[0].attributes.gender.femaleConfidence > json_3.images[0].faces[0].attributes.gender.maleConfidence){ 
				gender_1 ='woman';
			}else{
				gender_1 ='man'
			}
			console.log(gender_1);

			//人種判定
			var raceArray_1=[json_3.images[0].faces[0].attributes.asian,json_3.images[0].faces[0].attributes.black,json_3.images[0].faces[0].attributes.white,json_3.images[0].faces[0].attributes.hispanic];
			race_1 = 0;
			race_1_rate;
			for(let i = 0; i < 4; i++){
			if (raceArray_1[i] > race_1) {
				race_1 = raceArray_1[i];
			}
		}
			switch(race_1){
				case raceArray_1[0]:
				race_1 = 'asian';
				race_1_rate = raceArray_1[0];
				break;

				case raceArray_1[1]:
				race_1 = 'black';
				race_1_rate = raceArray_1[1];
				break;

				case raceArray_1[2]:
				race_1 = 'white';
				race_1_rate = raceArray_1[2];
				break;

				case raceArray_1[3]:
				race_1 = 'hispanic';
				race_1_rate = raceArray_1[3];
				break;
			}
			console.log(race_1);
			console.log(race_1_rate);
			
			//両目間隔
			eyeDis_1 =json_3.images[0].faces[0].eyeDistance;
			console.log("eye distance",eyeDis_1);

			if(json_3.images[0].faces[0].attributes.glasses=='None'){
				glasses_1 = 'メガネかけとらん';
			}else{
				glasses_1 = 'メガネかけとる';
			}
			console.log(glasses_1);
			
			if(json_3.images[0].faces[0].attributes.lips=='Together'){
				lips_1 = '口閉じてとる';
			}else{
				lips_1 = '口あいとる';
			}
			console.log(lips_1);
	  }  
	  if(count==2){
		let json_3 = JSON.parse(this.responseText);
		//年齢判定
		age_2 =json_3.images[0].faces[0].attributes.age;
		console.log("年齢",age_2);
		
		//性別判定
		if(json_3.images[0].faces[0].attributes.gender.femaleConfidence > json_3.images[0].faces[0].attributes.gender.maleConfidence){ 
			gender_2 ='woman';
		}else{
			gender_2 ='man'
		}
		console.log(gender_2);

		//人種判定
		var raceArray_2=[json_3.images[0].faces[0].attributes.asian,json_3.images[0].faces[0].attributes.black,json_3.images[0].faces[0].attributes.white,json_3.images[0].faces[0].attributes.hispanic];
		race_2 = 0;
		race_2_rate;
		for(let i = 0; i < 4; i++){
		if (raceArray_2[i] > race_2) {
			race_2 = raceArray_2[i];
		}
	}
		switch(race_2){
			case raceArray_2[0]:
			race_2 = 'asian';
			race_2_rate = raceArray_2[0];
			break;

			case raceArray_2[1]:
			race_2 = 'black';
			race_2_rate = raceArray_2[1];
			break;

			case raceArray_2[2]:
			race_2 = 'white';
			race_2_rate = raceArray_2[2];
			break;

			case raceArray_2[3]:
			race_2 = 'hispanic';
			race_2_rate = raceArray_2[3];
			break;
		}
		console.log(race_2);
		console.log(race_2_rate);
		
		//両目間隔
		eyeDis_2 =json_3.images[0].faces[0].eyeDistance;
		console.log("eye distance",eyeDis_2);
		//メガネ
		if(json_3.images[0].faces[0].attributes.glasses=='None'){
				glasses_2 = 'メガネかけとらん';
			}else{
				glasses_2 = 'メガネかけとる';
			}
		console.log(glasses_2);
		//口が開いているか
		
		if(json_3.images[0].faces[0].attributes.lips=='Together'){
			lips_2 = '口閉じてとる';
		}else{
			lips_2 = '口あいとる';
		}

		console.log(lips_2);
  }  
	}
	};

	let body ={
		'image':img_url,
		'selector':'ROLL'
	};
	
	request.send(JSON.stringify(body));
}

function analysis(){
	if(race_1_rate>race_2_rate){
		var race_ana = race_2_rate/race_1_rate;
	}else{
		var race_ana = race_1_rate/race_1_rate;
	}

	if(eyeDis_1>eyeDis_2){
		var eye_ana  = eyeDis_2/eyeDis_1;
	}else{
		var eye_ana = eyeDis_1/eyeDis_2;
	}
	total_score = (race_ana+eye_ana)/2*100;
	if(race_1 != race_2){
		total_score = total_score*0.3;
	}
	if(gender_1 = gender_2)
	console.log("人種の合致度",race_ana);
	console.log("目の間隔合致度",eye_ana);
	console.log("合致度",total_score);

}





function clickHandler(ev){
	console.log('click!');
	analysis();
	let p = document.getElementById('description');
	p.textContent = "合致度"+total_score+'%';
}

/*
function addMessage(message,isAI){
	let p = document.createElement('p');
	if(isAI){
		p.className = 'ai'
	}
	p.textContent = message;
	output.appendChild(p);
}
*/

function onSuccess(data){
	let json = JSON.parse(data);
	console.log(json.results[0].reply);
	addMessage(json.results[0].reply,true);
}

function onError(error){
	console.log('error');
}


// POSTメソッドで呼び出し、JSONで結果が返ってくる
function callAPI(url, data) {
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();

		req.open('POST',url);
		req.setRequestHeader('app_id', '624780e5');
		req.setRequestHeader('app_key', '4b36597428611a1181d76bef3fc68839');

		
		req.onload = () => {
			if (req.readyState === 4) {
				if (req.status === 200) {
					resolve(req.response);
				} else {
					reject(req.statusText);
				}
			}
		};
 
		req.onerror = () => {
			reject(req.statusText);
		};

		req.send(data);
	});
}
