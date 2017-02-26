console.log('init.js enter');

function pad2(num){
	if (num<10) return '0' + num.toString();
	return num.toString();
}

function getTimeStamp(){
	var date = new Date(),
		dateStr = date.getFullYear().toString() +
					pad2(date.getMonth()) +
					pad2(date.getDate()) +
					"-" +
					pad2(date.getHours()) +
					pad2(date.getMinutes()) +
					pad2(date.getSeconds());
	return dateStr;
}

function makeElem(type,txt){
	var el = document.createElement(type);
	el.appendChild(document.createTextNode(txt));
	return el;
}
	
function getServerMsg(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){  // event handler
		if(this.readyState===4&&this.status===200){
			console.log('getAllResponseHeaders', xhttp.getAllResponseHeaders());
			console.log('response',xhttp.response);
			console.log('status',xhttp.status, xhttp.statusText, xhttp.responseType, xhttp.responseURL);
			for (x in this){
				if (typeof this[x] !== 'function')
				console.log(typeof this[x] , x,this[x]);
			}
		}
	};
	xhttp.onerror = function(err){
		console.log('xhttp err', err);
	}
	xhttp.onload = function(){
		console.log('onload');
	}

	xhttp.open('GET','timestamp',true); // method, url, async, user, passwd 
//	xhttp.setRequestHeader(header,value);`
	xhttp.send(); // async
}


function init(){
	var ul = document.getElementById('ulist'),
		ct = document.getElementById('controls');
	ul.appendChild(makeElem('li',getTimeStamp()));
	var datebtn = makeElem('button','Press Me');		
		ajaxbtn = makeElem('button','ajax call');		
	ct.appendChild(datebtn);
	ct.appendChild(ajaxbtn);		
	datebtn.addEventListener('click', function(){
		ul.appendChild(makeElem('li',getTimeStamp()));
	});
	ajaxbtn.addEventListener('click', function(){
		getServerMsg();
		ul.appendChild(makeElem('li',getTimeStamp()));
	});
}




console.log('init.js exit');
