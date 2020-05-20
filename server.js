//Não sera mais usado o Live server ,nessa etapa estamos criando nosso proprio sevidor 
// Com a temple engine podemos pegar conteudos do backend para o front
// require e um comando do node para pegar arquivos externos javascript e dependência nesse caso express
//express (que pode ser considerada um programa) e colocar em uma variavél .
const express = require("express");

//usando require denovo na dependência nunjucks.
const nunjucks = require("nunjucks");


const videos = require("./data.js")
// ./ se referencia a raiz do projeto

//o server vai executar o express se tornado uma função
const server = express()

//server vai usar arquivos estáticos na pasta public através do express.static que vai observar essa pagina
server.use(express.static('public'))

//configurando  os arquivos html e njk.
//setar "pasta de view engine para(sem certeza)" uso da template por enquanto tudo que for html  
server.set("view engine","njk")
 //configura templetes que estão na pasta views
nunjucks.configure("views",{
  //usar o express 
  express:server,
  autoescape:false,
  //noCache vai desativar o cache automatioco do nunjucks que salva configurações
  noCache:true
})

//req:requisição ouvir oque o cliente esta mandando
//response:responder oque é ouvido ,manda resposta para o cliente
//res é um objeto e send uma função chamada metodo 
//reder : para rederenzar ao arquivo index.html com a configuração do nunjucks não precisa do .html
server.get("/",function(req,res){
    const data_about = {
        avatar_url:"https://avatars3.githubusercontent.com/u/54680650?s=400&u=516c52f2cc31b3388aac4471d7a39423194f4b41&v=4",       name:"Savio Picanço" ,
        role:"Student FullStack",
        description:'Estudante de ADS ,buscando ser melhor do que no dia anterior Estudante do curso <a href="https://rocketseat.com.br/launchbase" target="_blank">LaunchBase</a> ',
        links:[
            {name:"Github" ,url:"https://github.com/Saviopb"},
            {name:"Twitter" ,url:"https://twitter.com/dev_savio"},
            {name:"Likendln" ,url:"https://www.linkedin.com/in/savio-pican%C3%A7o-b739a518a/"}
        ]


    }



//retornando rederização
    return res.render("about" ,{ about : data_about});

} );

//trazendo arquivo portfolio.html para o server
server.get("/portfolio", function(req,res){

//criando uma propriedade items com o conteúdo de videos e atribuindo ela ao portfolio pelo render
//sendo possivél usasr dados de videos que é o arquivo data.js em portfolio
    return res.render("portfolio",{items : videos});

})

//criar uma rota para substituir o modal 
server.get("/video"  , function (req,res) {

const id = req.query.id ;


  //criando uma variavél video para pecorrer o array videos com a função find( que vai encontrar )
  //e se o video com propriedade id for igual a const id retorna true
  const video = videos.find(function(video){
    if(video.id == id ) {

return true 
}
  })




if (!video){


  return res.send("Video not found")

}

return res.render("video",{ item : video  })




})



server.listen(5000 , function(){


console.log("servidor is running");

})
