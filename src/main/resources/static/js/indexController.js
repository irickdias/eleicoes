const indexApp = {
    data(){
        return {eleicoes: "", candidato:"", candidatos:"", tipoID: "", caEleicao: [], eleicao: ""}
    },
    mounted() {
        axios.get(`http://localhost:8080/apis/eleicao/buscar-todos?filtro=`)
        .then(response => {this.eleicoes = response.data});

        axios.get(`http://localhost:8080/apis/candidato/buscar-todos?filtro=`)
        .then(response => {this.candidatos = response.data});
        //console.log(tipo);
    },
    methods: {
        carregarCandidatos()
        {
            axios.get(`http://localhost:8080/apis/candidato/buscar-todos?filtro=`)
            .then(response => {this.candidatos = response.data})
        },

        async addCandidatoEleicao(id){
            var achou = false;
            var pos = 0;

            await axios.get(`http://localhost:8080/apis/candidato/buscar-um/${id}`)
            .then(response => {this.candidato = response.data});

            //console.log(this.candidato);
            if(this.caEleicao.length == 0)
            {
                //console.log("entrou 1");
                this.caEleicao.push(this.candidato);
            }  
            else
            {
                //console.log("entrou 2");
                
                // procura id de candidato na lista
                for(let i=0; i<this.caEleicao.length; i++)
                {
                    if(this.caEleicao[i].id == id)
                    {
                        achou = true;
                        pos = i;
                    }
                        
                }

                if(achou) // se tiver achado, irá retirar
                {
                    this.caEleicao.splice(pos, 1);
                    //this.caEleicao = aux;
                }
                else // senão, adiciona
                {
                    this.caEleicao.push(this.candidato);
                }
                
            }

            
        },
        async confirmarSelecionados(){
            let apiurl = 'http://localhost:8080/apis/votos/incluir';
            var dados;

            if(this.caEleicao.length != 0)
            {
                await axios.get(`http://localhost:8080/apis/eleicao/buscar-um/${this.tipoID}`)
                .then(response => {this.eleicao = response.data});


                swal({
                    title: "Corfimar estes candidatos?",
                    icon: "warning",
                    buttons: ["Cancelar", "Sim"]
                  })
                  .then(async (sim) => {
                    if (sim) {
                        for(let i=0; i<this.caEleicao.length; i++)
                        {
                            
                            dados = {id: 0, total: 0, candidato: this.caEleicao[i], eleicao: this.eleicao};
                            
                            
                            await axios({
                                method: 'post',
                                url: apiurl,
                                timeout: 8000, // 8 segundos timeout
                                data: dados
                            })
                            .then(response => {})
                            .catch(error => console.error('timeout excedido'))
                                
                        }

                        swal({
                            title: "Sucesso!",
                            text: "Os candidatos foram adicionados!",
                            icon: "success",
                            timer: 1200,
                            buttons: false
                          });

                    }
                  });
                
                
            }
            else
            {
                swal({
                    title: "Erro!",
                    text: "Nenhum candidato selecionado!",
                    icon: "error",
                  });
            }
            

            
        }
    },

    template:
    `
    <h1 class="text-center">Adicionar candidatos a eleição</h1>
    <br/>
    
    <h2>Selecione a categoria de eleição</h2>
    <select class="form-select mt-3" id="cbEleicao" v-model="tipoID">
        <option value="" disabled selected>-- Selecione um --</option>
        <option v-for="e in this.eleicoes" :value="e.id">{{e.tipo}}</option>
    </select>

    <br/><br/>
    <h2>Selecione os candidatos</h2>
    <table class="table table-striped table-bordered table-hover mt-3">
        <thead>
        <tr>
            <th>Nome</th> <th>Numero do Candidato</th> <th>Partido</th>  <th>Selecionar</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="c in this.candidatos">
                <td>{{c.nome}}</td>
                <td>{{c.num}}</td>
                <td>{{c.partido.nome}}</td>
                <td>
                    <svg @click="addCandidatoEleicao(c.id)" class="tableIconAdd" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                    </svg>
                </td>
            </tr>
        
        </tbody>
    </table>

    <p class="candSeleST">Candidatos Selecionados:</p><br/>
    <p class="candSele" v-for="c in this.caEleicao">{{c.nome}}</p>

    <button type="button" @click="confirmarSelecionados()" class="btn btn-primary">Confirmar</button>

    `
}

Vue.createApp(indexApp).mount('#indexapp');