const tabelacan = {
    data(){
        return { candidatos: '', filtro: '' } 
    },
    mounted(){
        this.carregarTabela();
    },
    methods: {
        carregarTabela() {
            axios.get(`http://localhost:8080/apis/candidato/buscar-todos?filtro=${this.filtro}`)
            .then(response => {this.candidatos = response.data})
            .catch(err => {this.candidatos = err} )

        },
        apagar(id) { 
            
            swal({
                title: "Deletar este candidato?",
                text: "Isto terá efeito permanente!",
                icon: "warning",
                buttons: ["Cancelar", "Deletar"],
                dangerMode: true,
              })
              .then(async (deletar) => {
                if (deletar) {
                    await axios.delete(`http://localhost:8080/apis/candidato/excluir/${id}`)
                    
                    swal("Deletado com sucesso!", {icon: "success",});

                    this.carregarTabela();
                }
              });
        },
        alterar(id) {
            myModal.toggle();
            axios.get(`http://localhost:8080/apis/candidato/buscar-um/${id}`)
            .then(response => {
                let candidato = response.data;
                vformCan.id = candidato.id;
                vformCan.num = candidato.num;
                vformCan.nome = candidato.nome;
                vformCan.partidoCod = candidato.partido.id;
                console.log(candidato.partido.id);
            })
            .catch(err => {this.candidatos = err} )
        }
    },
    template:
    `
    <input type="text" @keyup="carregarTabela()" class="form-control" placeholder="Informe o filtro" v-model="filtro">
    <table class="table table-striped table-bordered table-hover mt-5">
        <thead>
            <tr>
                <th>ID</th> <th>Nome do candidato</th> <th>Número</th> <th>Partido</th> <th>Alterar</th> <th>Deletar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c in this.candidatos">
                <td>{{c.id}}</td>
                <td>{{c.nome}}</td>
                <td>{{c.num}}</td>
                <td>{{c.partido.nome}}</td>
                <td>
                    <svg @click="alterar(c.id)" class="tableIconUpdate" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </td>
                <td>
                    <svg @click="apagar(c.id)" class="tableIconDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </td>
            </tr>
        
        </tbody>
    </table>
    `
}

const formcan = {
    data(){
        return {id: "", nome: "", num: "", partidoCod:"", partidos:""}
    },
    mounted(){
        axios.get(`http://localhost:8080/apis/partido/buscar-todos?filtro=`)
        .then(response => {this.partidos = response.data})
        .catch(err => {this.partidos = err} )
        //console.log(this.id);
        //console.log(this.nome);
        //console.log(this.num);
        //console.log(this.partidoCod);
        //document.getElementById("cbPartido").value = this.partidoCod;
    },
    methods: {
        gravarCandidato()
        {
            let apiurl = 'http://localhost:8080/apis/candidato/incluir';
            var e = document.getElementById("cbPartidos");
            let partidoNome = e.options[e.selectedIndex].text;
            //console.log(partidoNome);
            const dados = {id: this.id, nome: this.nome, num: this.num, partido:{id: this.partidoCod, nome: partidoNome} };
            //console.log(dados);
            if(this.id != 0)
                apiurl = 'http://localhost:8080/apis/candidato/alterar';
            
            
            axios({
                method: 'post',
                url: apiurl,
                timeout: 8000, // 8 segundos timeout
                data: dados
              })
              .then(response => {
                myModal.toggle();
                vtabelaCan.carregarTabela();

            })
              .catch(error => console.error('timeout excedido'))


            
        },
        apagarForm(){
            this.id=0;
            this.nome="";
            this.num="";
            this.partidoCod="";
        }
    },
    template:
    `
    <!-- The Modal -->
    <div class="modal" id="myModal">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
    
            <!-- Modal Header -->
            <div class="modal-header">
            <h4 class="modal-title">Candidato</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
    
            <!-- Modal body -->
            <div class="modal-body">
                <div class="container mt-3">
                    
                    <form action="">
                      <div class="mb-3 mt-3">
                        <label for="id">ID:</label>
                        <input type="text" class="form-control" id="id" v-model="id" readonly>
                      </div>

                      <div class="mb-3">
                        <label for="nome">Nome do candidato:</label>
                        <input type="text" class="form-control" id="nome" v-model="nome">
                      </div>

                      <div class="mb-3">
                        <label for="num">Número do candidato:</label>
                        <input type="text" class="form-control" id="num" v-model="num">
                      </div>

                      <div class="mb-3">
                        <label for="cbPartidos">Partido:</label>
                        <select class="form-select" id="cbPartidos" v-model="partidoCod" >
                            <option disabled selected value="">-- Selecione o partido --</option>
                            <option v-for="p in this.partidos" :value="p.id">{{p.nome}}</option>
                        </select>
                      </div>
                      
                      
                    </form>
                    <button @click="gravarCandidato()" class="btn btn-primary">Gravar</button>
                  </div>
            </div>
    
            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
    
        </div>
        </div>
    </div> 
    `
}

const vtabelaCan = Vue.createApp(tabelacan).mount("#appcandidatos");
const vformCan = Vue.createApp(formcan).mount("#modalcandidatos");
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
});