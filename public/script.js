const cards = document.querySelectorAll(".card"); //pega todos com classe card



for(let card of cards){
card.addEventListener("click" , function(){ //adicionado um evento de click ,como paramêtro e a função para executar o evento.
const video = card.getAttribute("id");//pegando o atributo
 //através de uma variavél
  window.location.href =`/video?id=${video}`
})
}

