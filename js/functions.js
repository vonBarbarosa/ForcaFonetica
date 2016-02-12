var currentWord = {
			index: -1,
			ortography: "",
			phonology: [],
			alternative: [],
			answered: []
	};

var app = {
	/*
	currentWord: {
		ortography: "",
		phonology: ""
	},*/

	init: function() {
		//alert("foi");
		this.bindEvents();
		app.newGame();
	},

	bindEvents: function() {
		//listener for the buttons
		$(".btn-phon").on("click", function(){

			$(this).addClass("disabled");

			var letter = $(this).text();
			app.putLetter(letter);
		});

	},
	/*
	btnphonButtonEvent: function(){
		alert("");
	},
	*/

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

	array2phon: function(arr){
		var newArr = new Array();
		for (var i = 0; i < arr.length; i++) {
			newArr.push(app.str2phon(arr[i]));
		};
		return newArr;
	},

	getNewWord: function(){
		currentWord.index++;
		switch(currentWord.index){
			case 0:
				//agora a.ˈgɔ.rə
				currentWord.ortography = "agora";
				currentWord.phonology = ["a.'gɔ.ɾə"];
				break;
			case 1:
				//chamado ʃa.ˈma.dʊ
				currentWord.ortography = "chamado";
				currentWord.phonology = ["ʃa.ˈma.dʊ"];
				break;
			case 2:
				//desde ˈdez.dʒɪ
				currentWord.ortography = "desde";
				currentWord.phonology = ["ˈdez.dʒɪ", "ˈdez.dɪ"];
				break;
			case 3:
				//colocar koloˈkah
				currentWord.ortography = "colocar";
				currentWord.phonology = ["ko.lo.ˈkah", "ko.lo.ˈkax", "ko.lo.ˈkaɾ", "ko.lo.ˈkaɹ"];
				break;
			case 4:
				//contra ˈkõ.tɾə
				currentWord.ortography = "contra";
				currentWord.phonology = ["ˈkõ.tɾə"];
				break;
			case 5:
				//deus ˈdeʊ̯s
				currentWord.ortography = "deus";
				currentWord.phonology = ["ˈdeʊ̯s","ˈdeʊ̯ʃ"];
				break;
		}

		currentWord.phonology = app.array2phon(currentWord.phonology);

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

	//tests new symbol input and refreshes guessing word
	putLetter: function(letter){
		var newWordState = new Array();

		//loop for each different phonetic form
		for(var j=0; j<currentWord.phonology.length; j++){
			//loop for each phonetic char
			for (var i = 0; i < currentWord.phonology[j].length; i++) {
				//testing if a blank space for letter is found
				if (currentWord.answered[i] == "_"){
					if (letter == currentWord.phonology[j][i]) {
						newWordState.push(letter);
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

		//tests victory and acts accordingly
		if (app.victory(currentWord.answered)){
			alert("Parabéns, você acertou!");
			app.newGame()
		}
	},

	//tests victory, returns true or false
	victory: function(newWordState){
		//if no more blank spaces
		if (newWordState.indexOf("_") === -1){
			return true;
		}
		else{
			return false;
		}
	},

	//functions for seting a new game
	newGame: function(){
		app.resetbuttons();
		app.getNewWord();
		app.writeWord();
	},

	//enable buttons again
	resetbuttons: function(){
		$(".btn-phon").removeClass("disabled");
	}
}
