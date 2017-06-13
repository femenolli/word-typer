$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
	var corpoTabela = $(".placar").find("tbody");
	var usuario = $("#usuarios").val();
	var numPalavras = $("#contador-palavras").text();

	var linha = novaLinha(usuario, numPalavras);
	linha.find(".botao-remover").click(removeLinha);

	corpoTabela.append(linha);
	$(".placar").slideDown(500);
	scrollPlacar();
}

function scrollPlacar() {
	var posicaoPlacar = $(".placar").offset().top;
	$("body").animate({
		scrollTop: posicaoPlacar + "px"
	}, 1000);
}

function novaLinha(usuario, numPalavras) {
	var linha = $("<tr class='linha-de-pontuacao'>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(numPalavras);
	var colunaRemover = $("<td>");
	var link = $("<a>").addClass("botao-remover").attr("href", "#");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	link.append(icone);
	colunaRemover.append(link);
	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha;
}

function removeLinha(event) {
	event.preventDefault();
	linha = $(this).closest("tr");
	linha.fadeOut(1000);
	setTimeout(function(){
		linha.remove();
	}, 1000);

}

function mostraPlacar() {
	$(".placar").stop().slideToggle(600);
}

function sincronizaPlacar(){
	var placar = [];
	var linhas = $("body tr.linha-de-pontuacao");
	linhas.each(function(){
		var usuario = $(this).find("td:nth-child(1)").text();
		var numero = $(this).find("td:nth-child(2)").text();

		var score = {
			usuario: usuario,
			pontos: numero
		}	

		placar.push(score);
	});

	var dados = {
		placar: placar
	};
	
	$.post("http://localhost:3000/placar", dados, function(){
		$(".tooltip").tooltipster("open").tooltipster("content", "Sucesso ao sincronizar!");	;
	}).fail(function(){
		$(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar!");	
	}).always(function(){
		setTimeout(function(){
			$(".tooltip").tooltipster("close");			
		}, 1500);
	});

}

function atualizaPlacar(){
	$.get("http://localhost:3000/placar", function(data){
		$(data).each(function(){
			var linha = novaLinha(this.usuario, this.pontos);
			linha.find(".botao-remover").click(removeLinha);
			$(".placar").find("tbody").append(linha);;
		});
	});
}
































