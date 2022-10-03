const grafico = {
    data(){
        return {votos:"", eleicoes:"", tipoID:"", candidatos:"", titulo:"", dados:[], rotulos:[], myChart:"", config:""}
    },
    mounted(){
        axios.get(`http://localhost:8080/apis/eleicao/buscar-todos?filtro=`)
        .then(response => {this.eleicoes = response.data});

        axios.get(`http://localhost:8080/apis/candidato/buscar-todos?filtro=`)
        .then(response => {this.candidatos = response.data});

        this.myChart = new Chart(document.getElementById('myChart'), this.config); // inicializa o grafico
    },
    methods: {
        carregarGrafico(){
            this.dados = [];
            this.rotulos = [];
            //console.log("entrou");
            //console.log(this.candidatos[0].votos);
            //console.log(this.candidatos.length);
            for(let i=0; i <this.candidatos.length ; i++)
            {
                //console.log("votos maior");
                //console.log(this.candidatos[i].votos.length);
                //console.log(this.candidatos[i].votos.eleicao.id);
                if(this.candidatos[i].votos.length > 0)
                {
                    //console.log("votos maior");
                    for(let j=0; j<this.candidatos[i].votos.length; j++)
                    {
                        //console.log(this.candidatos[i].votos[j].eleicao.id);
                        if(this.candidatos[i].votos[j].eleicao.id == this.tipoID)
                        {
                            //console.log(this.candidatos[i].nome);
                            this.titulo = this.candidatos[i].votos[j].eleicao.tipo;
                            this.rotulos.push(this.candidatos[i].nome);
                            this.dados.push(this.candidatos[i].votos[j].total);
                        }
                        
                    }
                    
                }
            }
            //console.log(this.titulo);
            //console.log(JSON.stringify(this.rotulos));
            //console.log(JSON.stringify(this.dados));

            const data = {
                labels: this.rotulos,
                datasets: [{
                  label: this.titulo,
                  backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                  ],
                  borderWidth: 1,
                  data: this.dados,
                }]
            };

            this.config = {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        y: {
                            title:{
                                display: true,
                                text: "Votos",
                                font: {
                                    size: 18
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Candidatos",
                                font: {
                                    size: 18
                                }
                            }
                        }
                    }
                }
            };
            

            
            
            this.myChart.destroy(); // destroi o antigo
            this.myChart = new Chart(document.getElementById('myChart'), this.config); // constroi um novo do mesmo canvas
        }
    },
    template:
    `
        <h2>Selecione de qual categoria de eleição deseja ver as estatísticas:</h2>
        <select @change="carregarGrafico()" class="form-select mt-3" id="cbEleicao" v-model="tipoID">
            <option value="" disabled selected>-- Selecione um --</option>
            <option v-for="e in this.eleicoes" :value="e.id">{{e.tipo}}</option>
        </select>

        

        <div class="mt-5">
            <canvas id="myChart"></canvas>
        </div>
    `
}
const appGraphic = Vue.createApp(grafico).mount("#appGrafico");