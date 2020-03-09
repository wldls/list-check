// import './src/css/common.css';
import '../css/index.css';

import $ from "jquery";
import _ from 'lodash';

console.log('css loaded');

function component() {
	var element = document.createElement('div');
	
	/* lodash is required for the next line to work */
	element.innerHTML = _.join(['Hello','webpack'], ' ');	
  
	return element;
}

document.body.appendChild(component());

$(function(){
	console.log('jquery loaded');
});