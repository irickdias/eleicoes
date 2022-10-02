const vform = {
    data(){
        return {id: "", nome: ""}
    },
    methods:{
        gravarPartido()
        {
            let apiurl = 'http://localhost:8080/apis/partido/incluir';
            const dados = {id: this.id, nome: this.nome};
            if(this.id != 0)
                apiurl = 'http://localhost:8080/apis/partido/alterar';
            
            
            axios({
                method: 'post',
                url: apiurl,
                timeout: 8000, // 8 segundos timeout
                data: dados
              })
              .then(response => {
                myModal.toggle();
                otabela.carregarTabela();

            })
              .catch(error => console.error('timeout excedido'))


            
        },
        
        apagarForm(){
            this.id=0;
            this.nome="";
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
            <h4 class="modal-title">Partido</h4>
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
                        <label for="nome">Nome do partido:</label>
                        <input type="text" class="form-control" id="nome" v-model="nome">
                      </div>
                      
                      
                    </form>
                    <button @click="gravarPartido()" class="btn btn-primary">Gravar</button>
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
};


const vtabela = {
    data() { 
        return { partidos: '', filtro: '' } 
    },
    mounted(){
        this.carregarTabela();
    },
    methods: {
        carregarTabela() {
            axios.get(`http://localhost:8080/apis/partido/buscar-todos?filtro=${this.filtro}`)
            .then(response => {this.partidos = response.data})
            .catch(err => {this.partidos = err} )

        },
        apagar(id) { 
            
            if(confirm("Deseja excluir o partido?"))
                alert("apagando " + id); 
        },
        alterar(id) {
            myModal.toggle();
            axios.get(`http://localhost:8080/apis/partido/buscar-um/${id}`)
            .then(response => {
                let partido = response.data;
                oform.id = partido.id;
                oform.nome = partido.nome;
            })
            .catch(err => {this.partidos = err} )
        }
    },
    template:
    `
        <input type="text" @keyup="carregarTabela()" class="form-control" placeholder="Informe o filtro" v-model="filtro">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>ID</th> <th>Nome do partido</th> <th>Alterar</th> <th>Deletar</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="p in this.partidos">
                        <td>{{p.id}}</td>
                        <td>{{p.nome}}</td>
                        <td  @click="alterar(p.id)">
                            <svg class="tableIconUpdate" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </td>
                        <td @click="apagar(p.id)">
                            <svg class="tableIconDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </td>
                    </tr>
                
                </tbody>
            </table>
    
    `
};
const oform = Vue.createApp(vform).mount('#appmodal');
const otabela = Vue.createApp(vtabela).mount('#app');
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
});