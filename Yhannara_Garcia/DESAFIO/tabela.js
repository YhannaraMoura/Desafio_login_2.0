const form = document.querySelector('#infos-prod');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;
const diverro = document.querySelector('#msg-erro');

let usuarioId = Number(sessionStorage.getItem('logado'));

const session = localStorage.getItem("session");

logadoOuNao();

function logadoOuNao(){

    if(session){
sessionStorage.setItem("log", session);
usuarioId = session;
    }
    if(!usuarioId){
        window.location.href = "index.html"
        return;
    }
}

console.log(usuarioId);

//SALVA TUDO NO LOCALSTORAGE
const atualizarLocalStorage = (produtos) => {localStorage.setItem('produtos', JSON.stringify(produtos))}

//PRODUTOS 
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos')|| '[]');

const salvarProduto = (e) =>{
    e.preventDefault()
    console.log("passou pelo evento");
    diverro.innerHTML;
    //PEGA TODOS OS DADOS DO FORMULARIO 
    const nome = form.nome.value;
    const preco = Number(form.preco.value);
    const prime = form.prime.checked;
    const erro = [];

    if(!nome || nome.length < 2) {
        erro.push("<p>Nome invalido</p>");
    }

    if(!preco || nome.length <=0) {
        erro.push("<p>preco invalido</p>");
    }

    
    if(erro.length >0) {
        diverro.innerHTML = erro.join(" ");
        return
    }

console.log(idx);

    if(idx == 'novo'){
        const produtos = recuperarLocalStorage();
        /*   produtos.push({id:produtos.length + 1, nome, preco, prime});*/
        let idp = 0;
        for(const pro of produtos){
         if(pro.usuarioId === usuarioId){
             idp = Number(pro.id);
         }
        };
        produtos.push({id:idp+= 1, nome, preco, prime, usuarioId});
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();
    }else{
        let produto = {id: idx, nome, preco, prime, usuarioId}
        editar(idx, produtos);
        preencherTabela();
        form.reset();
        idx = 'novo'; 
        console.log('editar', idx);
    }


}

const preencherTabela = () =>{
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const produto of produtos){ 
        if(produto.usuarioId === usuarioId){

        tabela.innerHTML += `
            <tr>
                <th scope="row">${produto.id}</th>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.prime ? "sim" : "Não"}</td>
                <td>
                    <img  type="button" width="40" src="delet.svg" onclick="removerProduto(${produto.id})" />
                    <img type="button" width="40" src="editar.png" onclick="editarProduto(${produto.id})" />
                </td>
            </tr>
        
        `;
        }
    }
}

const removerProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id)
    if(indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert('Produto removido')
    preencherTabela();
}


const atualizarProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produtos) => produtos.id === id);
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos);
    preencherTabela()
}

const editarProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id)
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.checked = produtos[indexProduto].prime;
    idx = id;
}


//EVENTOS
form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarProduto);
document.addEventListener('DOMContentLoaded', preencherTabela);

let sair = document.querySelector('#sair');

sair.addEventListener('click', function(){
    saindo()
});

function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");


    window.location.href = "index.html";

   
}
document.querySelector("#sair").addEventListener('click', (evento)=>{
    evento.preventDefault();
    location.href = "login.html";
    
})