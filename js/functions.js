var currentWord = {
			ortography: "",
			phonology: ""
	};

var app = {

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
			$(this).addClass("btn-danger");
			$(this).removeClass("btn-primary");

			var letter = $(this).text();
			app.putLetter(letter);
			//var texto = $(this).text();
			//$("#campo-foco2").text(texto);
			//alert("jQuery foi" + texto);
		});

	},

	btnphonButtonEvent: function(){
		alert("");
	},

	getNewWord: function(){
		//agora a.ˈgɔ.rə
		currentWord.ortography = "agora";
		currentWord.phonology = "a.'gɔ.ɾə";
	},

	writeWord: function(){
		$("#campo-foco1").text(currentWord.ortography);
		app.writePhon();
	},

	//writes phonologic writing (plus spaces after every char), supressing the phonetic letters, leaving only "." and "'"
	writePhon: function(){
		$("#campo-foco2").text("");
		for (var i = 0; i < currentWord.phonology.length; i++) {
			if ((currentWord.phonology[i]) == "." || (currentWord.phonology[i]) == "'"){
				$("#campo-foco2").append(currentWord.phonology[i] + " ");
			}
			else {
				$("#campo-foco2").append("_ ");
			}
		};
	},

	putLetter:function(letter){
		var currentWordState = $("#campo-foco2").text();
		var newWordState = "";
		for (var i = 0; i < currentWord.phonology.length; i++) {
			//testing if a blank space for letter is found
			if (currentWordState[2*i] == "_"){
				if (letter == currentWord.phonology[i]) {
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
	}
}