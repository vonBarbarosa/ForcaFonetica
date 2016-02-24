var currentWord = {
	index: -1,
	ortography: "",
	phonology: [],
	alternative: [],
	answered: []
};

var app = {

chances: {
	//MAX: const value
	MAX: 6,
	current: 0
},

init: function() {
	app.ptCreateButtons();
	app.bindEvents();
	app.newGame();
},

//function for creating buttons for portuguese game
ptCreateButtons: function(){
	//creating consonants
	var ptConson = [["p", "b", "t", "d", "k", "g", "tʃ", "dʒ"],
					["f", "v", "s", "z", "ʃ", "ʒ"],
					["w", "ɫ", "l", "ʎ", "lʲ"],
					["m", "n", "ɲ", "ỹ"],
					["x", "ɣ", "h", "ɦ"],
					["ɾ", "ɹ", "ř"]];

	$("#button-container").append($('<div id="cons-container" align="center"></div>'));
	ptConson.forEach(function(row){
		var newRow = $('<div align="right"></div>');

		row.forEach(function(symbol){
			var newButton = $('<button class="btn-phon btn btn-primary" type="button">' + symbol +'</button>');
			newRow.append(newButton);
		});
		$("#cons-container").append(newRow);
	});
	//creating vowels
	var ptVowels = [["i", "e", "ɛ", "a", "ɔ", "o", "u"],
				 ["ĩ", "ẽ", "ã", "õ", "ũ"],
				 ["ɪ", "ə", "ʊ"],
				 ["ɪ̯", "ʊ̯"]];

	$("#button-container").append($('<div id="vowel-container"></div>'));
	ptVowels.forEach(function(row){
		var newRow = $('<div align="left"></div>');
		row.forEach(function(symbol){
			var newButton = $('<button class="btn-phon btn btn-success" type="button">' + symbol +'</button>');
			newRow.append(newButton);
		});
		$("#vowel-container").append(newRow);
	});
},

//function for creating buttons for english game
enCreateButtons: function(){
	//creating consonants
	var enConson = [["p", "b", "t", "d", "k", "g", "tʃ", "dʒ"],
					["θ", "ð", "f", "v", "s", "z", "ʃ", "ʒ"],
					["h", "m", "n", "ɲ", "l", "ř", "j", "w"]];

	$("#button-container").append($('<div id="cons-container" align="center"></div>'));
	enConson.forEach(function(row){
		var newRow = $('<div align="right"></div>');

		row.forEach(function(symbol){
			var newButton = $('<button class="btn-phon btn btn-primary" type="button">' + symbol +'</button>');
			newRow.append(newButton);
		});
		$("#cons-container").append(newRow);
	});
	//creating vowels
	var enVowels = [["i", "ɛ", "æ", "ɔ", "ʌ", "ʊ", "ə"],
					["iː", "aː", "ɔː", "uː", "ɜː"],
					["aɪ", "eɪ", "ɔɪ", "aʊ", "oʊ"],
					["ɪə", "ɛə", "ʊə"]];

	$("#button-container").append($('<div id="vowel-container"></div>'));
	enVowels.forEach(function(row){
		var newRow = $('<div align="left"></div>');
		row.forEach(function(symbol){
			var newButton = $('<button class="btn-phon btn btn-success" type="button">' + symbol +'</button>');
			newRow.append(newButton);
		});
		$("#vowel-container").append(newRow);
	});
},

//listener for the buttons
bindEvents: function() {
	$("body").delegate(".btn-phon", "click", function(){
		$(this).addClass("disabled");
		var letter = $(this).text();
		//tries to fit letter, if no match, chances--
		if (!app.putLetter(letter)){
			app.loseOneChance();
		};

		//checks if game is over
		if (app.chancesAreOver()){
			app.gameOver();
		}
		//tests victory and acts accordingly
		else if (app.victory()){
			app.congratulate();
			app.newGame()
		}
	});
},

//turns string into array of phonetic chars
str2phon: function(string){
	var phonStr = new Array();

	for (var i = 0; i < string.length; i++) {
		switch (string[i]){
			//for testing 'dʒ'
			case 'd':
			if(string[i+1] == 'ʒ'){
				phonStr.push('dʒ');
				i++;
			}
			else
			phonStr.push(string[i]);
			break;
			//for testing 'tʃ'
			case 't':
			if(string[i+1] == 'ʃ'){
				phonStr.push('tʃ');
				i++;
			}
			else
			phonStr.push(string[i]);
			break;
			//for testing 'lʲ'
			case 'l':
			if(string[i+1] == 'ʲ'){
				phonStr.push('lʲ');
				i++;
			}
			else
			phonStr.push(string[i]);
			break;
			//for testing 'ɪ̯'
			case 'ɪ':
			if(string[i+1] == '̯'){
				phonStr.push('ɪ̯');
				i++;
			}
			else
			phonStr.push(string[i]);
			break;
			//for testing 'ʊ̯'
			case 'ʊ':
			if(string[i+1] == '̯'){
				phonStr.push('ʊ̯');
				i++;
			}
			else
			phonStr.push(string[i]);
			break;

			default:
			phonStr.push(string[i]);
			break;
		}
	};
	return phonStr;
},

//"str2phon"s a entire array of strings
array2phon: function(arr){
	var newArr = new Array();
	for (var i = 0; i < arr.length; i++) {
		newArr.push(app.str2phon(arr[i]));
	};
	return newArr;
},

//turns phonetic array into string, for printing purposes
phon2str: function(phon_arr){
	var str = "";
	phon_arr.forEach(function(phon_sym){
		str += phon_sym;
	});
	return str;
},

//get a new word from DB and sets currentWord object
getNewWord: function(){
	currentWord.index++;

	currentWord.ortography = wordsDB[currentWord.index].ortography;
	currentWord.phonology = app.array2phon(wordsDB[currentWord.index].phonology);

	//INSIGHT: this part might better be in a separated function for reusability
	currentWord.answered = new Array();
	for (var i = 0; i < currentWord.phonology[0].length; i++) {
		//detail: there are 2 different chars for apostrophe
		if ((currentWord.phonology[0][i]) == "." ||
		(currentWord.phonology[0][i]) == "'" ||
		(currentWord.phonology[0][i]) == "ˈ"){
			currentWord.answered.push(currentWord.phonology[0][i]);
		}
		else {
			currentWord.answered.push("_");
		}
	};
},

//puts currentWord ortography and phonologic transcription on designed places
writeWord: function(){
	$("#campo-foco1").text(currentWord.ortography);
	app.writePhon();
},

//prints what's already answered on #campo-foco2, plus spaces
writePhon: function(){
	$("#campo-foco2").text("");
	for (var i = 0; i < currentWord.answered.length; i++) {
		$("#campo-foco2").append(currentWord.answered[i] + " ");

	};
},

//tests new symbol input and refreshes guessing word; returns true if there is any match
putLetter: function(letter){
	var match = false;
	var newWordState = new Array();

	//loop for each different phonetic form
	for(var j=0; j<currentWord.phonology.length; j++){
		//loop for each phonetic char
		for (var i = 0; i < currentWord.phonology[j].length; i++) {
			//testing if a blank space for letter is found
			if (currentWord.answered[i] == "_"){
				if (letter == currentWord.phonology[j][i]) {
					newWordState.push(letter);
					match = true;
				}
				else{
					newWordState.push("_");
				}
			}
			else {
				newWordState.push(currentWord.answered[i]);
			}
		};
		//refreshes guessing word and resets newWordState for next phonology
		currentWord.answered = newWordState;
		newWordState = new Array();
	};
	//prints on proper place #campo-foco2
	app.writePhon();

	return match;
},

//shows congratulations message
congratulate: function(){
	var message = "Parabéns, você acertou!";

	//checks for multiple phonetic writings and print them together
	if (currentWord.phonology.length > 1){
		message += "\nEsta palavra possui várias transcrições fonéticas:\n";
		currentWord.phonology.forEach(function(phon_form){
			message += app.phon2str(phon_form) + "\n";
		});
	};
	alert(message);
},

//returns true if chances are already over
chancesAreOver: function(){
	return (this.chances.current<= 0);
},

//game over procedure
gameOver: function(){

	alert("Tente novamente")
	app.newGame();
},

//decrement chances and shows it
loseOneChance: function(){
	this.chances.current--;
	app.refreshHangman();
},

//refreshes hangman picture
refreshHangman: function(){
	$("#chances").attr("src", "img/forca-" + this.chances.current + ".png");
	$("#chances").attr("alt", this.chances.current + " chance(s) restante(s)");
},

//tests victory, returns true or false
victory: function(){
	//if no more blank spaces
	if (currentWord.answered.indexOf("_") === -1){
		return true;
	}
	else{
		return false;
	}
},

//functions for setting a new game
newGame: function(){
	//resets chances
	this.chances.current = this.chances.MAX;
	app.refreshHangman();
	app.resetbuttons();
	app.getNewWord();
	app.writeWord();
},

//enable buttons again
resetbuttons: function(){
	$(".btn-phon").removeClass("disabled");
}
}
