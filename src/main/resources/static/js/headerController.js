const header = {
    data(){

    },
    methods: {

    },
    template:
    `
    <section>
            <header id="headerMainContainer">        
                <nav id="headerContainer">
                    
                    <div class="logoContainer">
                        <a to="/"><img class="topLogo" src="./images/eleicoes2022.png" alt="Logo"/></a>
                    </div>
                    
                        
                    <div class="box-titulo">
                        <h1 class="titulo">Eleições 2022</h1>
                        
                    </div>
                    
                    <!--<Link class="botao-voltar" to="/">Voltar</Link>
                    <div class="loginContainer">
                        <div class="login-userimg">
                            <img src="" alt="Foto de usuário"/>
                        </div>

                        <div>
                            <Link id="user" to={destiny} class="bold bt-login">Login</Link>
                        </div>
                        
                    </div>-->
                        
                </nav>  

                <nav id="Menu" class="bold">
                    <ul id="menuItens">
                        <li><a href="./index.html">Home</a></li>
                        
                        <li><a href="./partidos.html">Partidos</a></li>

                        <li><a href="./candidatos.html">Candidatos</a></li>

                        <li><a href="./cargos.html">Cargos</a></li>
                        
                        <li><a href="./eleicoes.html">Eleições</a></li>

                        <li><a href="./estatisticas.html">Estatísticas</a></li>
                    </ul>
                </nav>
            </header>
            
        </section>
    `
}
const vueheader = Vue.createApp(header).mount('#Header');