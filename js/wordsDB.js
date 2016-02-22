/*
 *  This file creates the words DataBase and shuffles it
 */

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
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
	},
    {
		//ainda a.ˈi͂.də
		id: 6,
		ortography : "ainda",
		phonology : ["a.ˈi͂.də"]
	},
    {
		//amar
		id: 7,
		ortography : "amar",
		phonology : ["a.ˈmah","a.ˈmax", "a.ˈmaɾ","a.ˈmaɹ" ]
	},
    {
		id: 8,
		ortography : "apenas",
		phonology : ["a.ˈpe.nəs", "a.ˈpe.nəʃ"]
	},
    {
		id: 9,
		ortography : "aqueles",
		phonology : ["aˈke.lɪs", "aˈke.lɪʃ"]
	},
    {
		id: 10,
		ortography : "aqui",
		phonology : ["a.ˈki"]
	},
    {
		id: 11,
		ortography : "assim",
		phonology : ["a.ˈsi͂"]
	},
    {
		id: 12,
		ortography : "até",
		phonology : ["a.ˈtɛ"]
	},
    {
		id: 13,
		ortography : "bem",
		phonology : ["ˈbẽɪ̯"]
	},
    {
		id: 14,
		ortography : "bom",
		phonology : ["ˈbõ"]
	},
    {
		id: 15,
		ortography : "braços",
		phonology : ["ˈbɾa.sʊs", "ˈbɾa.sʊʃ"]
	},
    {
		id: 16,
		ortography : "braços",
		phonology : ["ˈbɾa.sʊs"]
	},
    {
		id: 17,
		ortography : "cabeça",
		phonology : ["ka.ˈbe.sə"]
	},
    {
        id: 18,
        ortography : "cada",
        phonology : ["ˈka.də"]
    },
    {
        id: 19,
        ortography : "casa",
        phonology : ["ˈka.zə"]
    },
    {
        id: 20,
        ortography : "caso",
        phonology : ["ˈka.zʊ"]
    },
    {
        id: 21,
        ortography : "cem, sem",
        phonology : ["ˈsẽɪ̯"]
    },
    {
        id: 22,
        ortography : "cidade",
        phonology : ["si.ˈda.dʒɪ", "si.ˈda.dɪ"]
    },
    {
        id: 23,
        ortography : "cinco",
        phonology : ["ˈsĩ.kʊ"]
    },
    {
        id: 24,
        ortography : "coisas",
        phonology : ["ˈkoɪ̯.zəs", "ˈkoɪ̯.zəʃ"]
    },
    {
        id: 25,
        ortography : "como",
        phonology : ["ˈkõ.mʊ"]
    },
    {
        id: 26,
        ortography : "contudo",
        phonology : ["ˈkõ.tu.dʊ"]
    },
    {
        id: 27,
        ortography : "coraçao",
        phonology : ["ko.ɾa.ˈsãʊ̯"]
    },
    {
        id: 28,
        ortography : "corpo",
        phonology : ["ˈkoh.pʊ", "ˈkox.pʊ", "ˈkoɾ.pʊ", "ˈkoɹ.pʊ"]
    },
    {
        id: 29,
        ortography : "cuja",
        phonology : ["ˈku.ʒə"]
    },
    {
        id: 30,
        ortography : "dar",
        phonology : ["ˈdah", "ˈdax", "ˈdaɾ", "ˈdaɹ"]
    },
    {
        id: 31,
        ortography : "deixar",
        phonology : ["deɪ̯.ˈʃah", "deɪ̯.ˈʃax", "deɪ̯.ˈʃaɾ", "deɪ̯.ˈʃaɹ"]
    },
    {
        id: 32,
        ortography : "depois",
        phonology : ["ˈde.poɪ̯s", "ˈde.poɪ̯ʃ", "ˈdʒi.poɪ̯s", "ˈdʒi.poɪ̯ʃ"]
    },
    {
        id: 33,
        ortography : "deve",
        phonology : ["ˈdɛ.vɪ"]
    }


];

shuffleArray(wordsDB);
