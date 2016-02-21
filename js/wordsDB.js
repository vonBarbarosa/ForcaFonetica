function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


var wordsDB = [
	{
		//agora a.ˈgɔ.rə
		id: 0,
		ortography : "agora",
		phonology : ["a.'gɔ.ɾə"]
	},
	{
		//chamado ʃa.ˈma.dʊ
		id: 1,
		ortography : "chamado",
		phonology : ["ʃa.ˈma.dʊ"]
	},
	{
		//desde ˈdez.dʒɪ
		id: 2,
		ortography : "desde",
		phonology : ["ˈdez.dʒɪ", "ˈdez.dɪ"]
	},
	{
		//colocar koloˈkah
		id: 3,
		ortography : "colocar",
		phonology : ["ko.lo.ˈkah", "ko.lo.ˈkax", "ko.lo.ˈkaɾ", "ko.lo.ˈkaɹ"]
	},
	{
		//contra ˈkõ.tɾə
		id: 4,
		ortography : "contra",
		phonology : ["ˈkõ.tɾə"]
	},
	{
		//deus ˈdeʊ̯s
		id: 5,
		ortography : "deus",
		phonology : ["ˈdeʊ̯s","ˈdeʊ̯ʃ"]
	}
];

shuffleArray(wordsDB);
