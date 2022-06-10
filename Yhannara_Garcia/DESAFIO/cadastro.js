//criar fora do evento um vetor -  variavel composta - ela recebe mais de um valor
//let db = [];

document.querySelector('#cadastro').addEventListener('click', (w)=>{
    w.preventDefault();
    let email = document.querySelector('#login').value;
    let senha = document.querySelector('#senha').value;

    salvar(email, senha);
});

function salvar(e, s){
    //verificar se tem dados localStorge, senao, cria um vetor vazio
    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    //crio os objetos
    let usuario ={
        id: db.length +1,
        login: e,
        senha: s
    }

    //jogo o objeto usuario dentro do vetor
    db.push(usuario);
    if(login.usuario != '' || senha.usuario != ''){
    //salvo no localStorage agora um vetor que pode receber varios objetos
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'login.html';
}else{
    alert("Preencha corretamente")
}}