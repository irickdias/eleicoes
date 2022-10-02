const tabelae = {
    data(){
        return { eleicoes: '', filtro: '' } 
    },
    mounted(){
        this.carregarTabela();
    },
    methods: {
        carregarTabela() {
            axios.get(`http://localhost:8080/apis/eleicao/buscar-todos?filtro=${this.filtro}`)
            .then(response => {this.eleicoes = response.data})
            .catch(err => {this.eleicoes = err} )

        },
        apagar(id) { 
            
            if(confirm("Deseja excluir a eleicao?"))
                alert("apagando " + id); 
        },
        alterar(id) {
            myModal.toggle();
            axios.get(`http://localhost:8080/apis/eleicao/buscar-um/${id}`)
            .then(response => {
                let eleicao = response.data;
                vformE.id = eleicao.id;
                vformE.tipo = eleicao.tipo;
                vformE.ano = eleicao.ano;
            })
            .catch(err => {this.eleicoes = err} )
        }
    },
    template:
    `
    <input type="text" @keyup="carregarTabela()" class="form-control" placeholder="Informe o filtro" v-model="filtro">
    <table class="table table-striped table-bordered table-hover mt-5">
        <thead>
            <tr>
                <th>ID</th> <th>Categoria da eleição</th> <th>Ano</th> <th>Alterar</th> <th>Deletar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="e in this.eleicoes">
                <td>{{e.id}}</td>
                <td>{{e.tipo}}</td>
                <td>{{e.ano}}</td>
                <td>
                    <svg @click="alterar(e.id)" class="tableIconUpdate" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </td>
                <td>
                    <svg @click="apagar(e.id)" class="tableIconDelete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </td>
            </tr>
        
        </tbody>
    </table>
    `
}

const forme = {
    data(){
        return {id: "", tipo: "", ano:""}
    },
    methods: {
        gravarEleicao()
        {
            let apiurl = 'http://localhost:8080/apis/eleicao/incluir';
            const dados = {id: this.id, tipo: this.tipo, ano:this.ano};
            if(this.id != 0)
                apiurl = 'http://localhost:8080/apis/eleicao/alterar';
            
            
            axios({
                method: 'post',
                url: apiurl,
                timeout: 8000, // 8 segundos timeout
                data: dados
              })
              .then(response => {
                myModal.toggle();
                vtabelaE.carregarTabela();

            })
              .catch(error => console.error('timeout excedido'))


            
        },
        apagarForm(){
            this.id=0;
            this.tipo="";
            this.ano="";
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
            <h4 class="modal-title">Eleição</h4>
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
                        <label for="tipo">Tipo da eleição:</label>
                        <input type="text" class="form-control" id="tipo" v-model="tipo">
                      </div>

                      <div class="mb-3">
                        <label for="ano">Ano:</label>
                        <input type="text" class="form-control" id="ano" v-model="ano">
                      </div>
                      
                      
                    </form>
                    <button @click="gravarEleicao()" class="btn btn-primary">Gravar</button>
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

const vtabelaE = Vue.createApp(tabelae).mount("#appeleicoes");
const vformE = Vue.createApp(forme).mount("#modaleleicoes");
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
});