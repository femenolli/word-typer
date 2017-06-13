var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
	atualizaFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").on("click", reniciaJogo);
	atualizaPlacar();

	$('#usuarios').selectize({
	    create: true,
	    sortField: 'text'
	});

	$('.tooltip').tooltipster({
		trigger: "custom"
	});
});

function atualizaFrase() {
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
	tempoInicial = tempo;
	$("#tempo-digitacao").text(tempo); 
}

function inicializaContadores() {
	campo.on("input", function(){
		var conteudo = campo.val();

		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		var qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaCronometro() {
	campo.one("focus", function(){
		var tempoRestante = $("#tempo-digitacao").text();
		var idSetInverval = setInterval(function(){
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if (tempoRestante < 1){
				clearInterval(idSetInverval);
				finalizaJogo();
			};
		}, 1000);
	});
}

function inicializaMarcadores() {
	campo.on("input", function(){
		var frase = $(".frase").text();
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length);
		if(digitado == comparavel) {
			campo.addClass("campo-digitacao-correto");
			campo.removeClass("campo-digitacao-errado");
		} else {
			campo.addClass("campo-digitacao-errado");
			campo.removeClass("campo-digitacao-correto");
		}
	});
}

function finalizaJogo() {
	campo.attr("disabled", true);
	campo.addClass("campo-digitacao-desativado");
	inserePlacar();
}

function reniciaJogo(){
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	campo.removeClass("campo-digitacao-desativado");
	campo.removeClass("campo-digitacao-correto");
	campo.removeClass("campo-digitacao-errado");
};

