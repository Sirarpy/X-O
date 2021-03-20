
var number = 3;
var gameBlock = document.getElementById('game');
// var default_tip = prevTip = prompt('Please select default Tip');
var default_tip = prevTip = 'X';
var click_count = 0;

var autoClick = false;
var timeout = null;


// function submitNumber(event) {
// 	if(event.which === 13) {
// 		number = event.target.value;
// 		drawGame();
// 	}
// }	

drawGame();

function drawGame() {
	gameBlock.innerHTML = '';
	for(i = 0; i < (number * number); i++) {
		var div = document.createElement('div');
		
		div.setAttribute('class', 'game-box');
		div.setAttribute('data-id', i);
		
		div.style.width = gameBlock.offsetWidth / number;
		div.style.height = gameBlock.offsetWidth / number;
		div.style.fontSize = (gameBlock.offsetWidth / number) / 1.5;
		div.style.lineHeight = gameBlock.offsetWidth / number  + 'px';
		div.style.textAlign = 'center';
		
		
		div.addEventListener('click', drawClick);
		
		gameBlock.appendChild(div);
	}
}


function drawClick(event) {
	if(!autoClick) {
		var target_block = event.target;
		var data_id = target_block.getAttribute('data-id');
		
		if(click_count === 0){
			target_block.innerHTML = default_tip;
		} else {
			if(target_block.innerHTML === '') {
				if(prevTip === 'X') {
					target_block.innerHTML = 'O';
					prevTip = 'O';
				} else if(prevTip === 'O') {
					target_block.innerHTML = 'X';
					prevTip = 'X';
				}
			}
		}
		
		checkGame();
		click_count++;
		
		autoClick = true;
		timeout = setTimeout(drawAutoClick, 300);
	}
}


function drawAutoClick() {
	var blocks = document.getElementsByClassName('game-box');
	
	for(i = 0; i < blocks.length; i++) {
		
		if(blocks[i].innerHTML === ''){
			
			if(prevTip === 'X') {
				blocks[i].innerHTML = 'O';
				prevTip = 'O';
			} else if(prevTip === 'O') {
				blocks[i].innerHTML = 'X';
				prevTip = 'X';
			}
			
			break;
		}
	}
	
	checkGame();
	autoClick = false;
	click_count++;
}


function checkDraw() {
	if(click_count === (number * number)) {
		alert('Draw');
		resetGame();
	}
}


function checkGame() {
	var winCombinations = [
		'0,1,2',
		'3,4,5',
		'6,7,8',
		
		'0,3,6',
		'1,4,7',
		'2,5,8',
		
		'2,4,6',
		'0,4,8',
	];
	
	var blocks = document.getElementsByClassName('game-box');
	
	var x_array = [];
	var o_array = [];
	
	
	for(i = 0; i < blocks.length; i++) {
		if(blocks[i].innerHTML === 'O') {
			o_array.push(i);
		} else if(blocks[i].innerHTML === 'X') {
			x_array.push(i);
		}
	}
	
	x_array = x_array.join(',');
	o_array = o_array.join(',');
	
	if(winCombinations.indexOf(x_array) !== -1) {
		alert('Win X');
		resetGame();
	} else if(winCombinations.indexOf(o_array) !== -1) {
		alert('Win O');
		resetGame();
	}
	
	checkDraw();
}


function resetGame(){
	var blocks = document.getElementsByClassName('game-box');
	
	for(i = 0; i < blocks.length; i++) {
		blocks[i].innerHTML = '';
	}
	
	click_count = 0;
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



$(document).ready(function(){
	document.getElementById('hello');
	
	$('.showHello:last-child').click(function(event){
		
	})
/*	
	$('.hideHello').click(function(){
		$('#hello').fadeOut(800);
	})
*/
})