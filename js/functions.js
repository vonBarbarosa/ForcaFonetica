var app = {

	init: function() {
		//alert("foi");
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('onClick', this.btnphonButtonEvent, false);

		$(".btn-phon").on("click", function(){
			//$(this).addClass("btn-danger");
			//$(this).removeClass("btn-primary");
			var texto = $(this).text();
			$("#campo-foco").text(texto);
			//alert("jQuery foi" + texto);
		});

	},

	btnphonButtonEvent: function(){
		alert("foi");
	}
}