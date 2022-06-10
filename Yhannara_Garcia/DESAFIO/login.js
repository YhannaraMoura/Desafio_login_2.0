document.querySelector('#logar').addEventListener('click', (e)=>{
    e.preventDefault();
    entrar()
})

function entrar(){
    //capturando os dados do login e senha 
    let usuario = document.querySelector('#login');
    let senha = document.querySelector('#senha');

    //vetor vazio
    let listaUser = [];

//crio um objeto vazio
    let usuarioValido = {
        login: '',
        senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem('usuarios'));

    //vai varrer todos os itens 
    listaUser.forEach(item=> {
        //capturar o usuario
        if(usuario.value === item.login && senha.value === item.senha){
            usuarioValido = {
                id: item.id,
                login: item.login,
                senha: item.senha
            }
        }
        
    })

    if(usuarioValido.login != '' && usuarioValido.senha != ''){
            alert('Deu certo')
            saveSession(usuarioValido.id)
            window.location.href ="tabela.html";
        }else if(login === '' || senha === ''){
            alert('Deu errado')
        }


    function saveSession(data){
        if(saveSession){
            localStorage.setItem("session", JSON.stringify(data));
        }

        sessionStorage.setItem("logado", JSON.stringify(data));
    }

}