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
                    <th>ID</th> <th>Nome do partido</th> <th></th> <th></th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="p in this.partidos">
                        <td>{{p.id}}</td>
                        <td>{{p.nome}}</td>
                        <td @click="alterar(p.id)">alterar</td>
                        <td @click="apagar(p.id)">apagar</td>
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