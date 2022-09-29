const indexApp = {
    data(){
        return {eleicao: "", candidatos:"", tipo: "", caEleicao: ""}
    },
    mounted() {
        axios.get(`http://localhost:8080/apis/eleicao/buscar-todos?filtro=`)
        .then(response => {this.eleicao = response.data});

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

        addCandidatoEleicao(id){
            if(this.caEleicao == "")
                this.caEleicao = [];
            else
            {

            }
        }
    },

    template:
    `
    <select  id="cbEleicao">
        <option v-for="e in this.eleicao" value='e.id'>{{e.tipo}}</option>
    </select>

    <br/><br/>

    <table class="table table-striped">
        <thead>
        <tr>
            <th>Nome</th> <th>Numero do Candidato</th> <th>Partido</th>  <th></th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="c in this.candidatos">
                <td>{{c.nome}}</td>
                <td>{{c.num}}</td>
                <td>{{c.partido.nome}}</td>
                <td @click="addCandidatoEleicao(c.id)" style="color: blue; cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                    </svg>
                </td>
            </tr>
        
        </tbody>
    </table>

    `
}

Vue.createApp(indexApp).mount('#indexapp');