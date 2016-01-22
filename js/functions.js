var currentWord = {
			index: -1,
			ortography: "",
			phonology: [],
			alternative: []
	};

//TODO phonologgy pra array

var app = {
	/*
	currentWord: {
		ortography: "",
		phonology: ""
	},*/

	init: function() {
		//alert("foi");
		this.bindEvents();
		this.getNewWord();
		this.writeWord();
	},

	bindEvents: function() {
		//???
		document.addEventListener('onClick', this.btnphonButtonEvent, false);

		//listener from the buttons
		$(".btn-phon").on("click", function(){
			//$(this).addClass("btn-danger");
			//$(this).removeClass("btn-primary");	
			$(this).addClass("disabled");

			var letter = $(this).text();
			app.putLetter(letter);
			//var texto = $(this).text();
			//$("#campo-foco2").text(texto);
			//alert("jQuery foi" + texto);
		});

	},
	/*
	btnphonButtonEvent: function(){
		alert("");
	},
	*/

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
				currentWord.phonology = ["koloˈkah", "koloˈkax", "koloˈkaɾ", "koloˈkaɹ"];
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
	},

	//puts currentWord ortography and phonologic transcription on designed places
	writeWord: function(){
		$("#campo-foco1").text(currentWord.ortography);
		app.writePhon();
	},

	//writes phonologic writing (plus spaces after every char), supressing the phonetic letters, leaving only "." and "'"
	writePhon: function(){
		$("#campo-foco2").text("");
		for (var i = 0; i < currentWord.phonology[0].length; i++) {
			if ((currentWord.phonology[0][i]) == "." ||
			    (currentWord.phonology[0][i]) == "'" || 
			    (currentWord.phonology[0][i]) == "ˈ"){
				$("#campo-foco2").append(currentWord.phonology[0][i] + " ");
			}
			else {
				$("#campo-foco2").append("_ ");
			}
		};
	},

	//tests new symbol input and refreshes guessing word
	putLetter:function(letter){
		var currentWordState = $("#campo-foco2").text();
		var newWordState = "";
		for (var i = 0; i < currentWord.phonology[0].length; i++) {
			//testing if a blank space for letter is found
			if (currentWordState[2*i] == "_"){
				if (letter == currentWord.phonology[0][i]) {
					newWordState += letter + " ";
				}
				else{
					newWordState += "_ ";
				}
			}
			else {
				newWordState += currentWordState[2*i] + currentWordState[1+2*i];
			}
		};
		$("#campo-foco2").text(newWordState);
		if (app.victory(newWordState)){
			alert("ganhou!");
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