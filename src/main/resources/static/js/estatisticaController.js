const grafico = {
    data(){
        return {votos:"", eleicoes:"", tipoID:"", candidatos:"", titulo:"", dados:[], rotulos:[]}
    },
    mounted(){
        axios.get(`http://localhost:8080/apis/eleicao/buscar-todos?filtro=`)
        .then(response => {this.eleicoes = response.data});

        axios.get(`http://localhost:8080/apis/candidato/buscar-todos?filtro=`)
        .then(response => {this.candidatos = response.data});
    },
    methods: {
        carregarGrafico(){
            this.dados = [];
            this.rotulos = [];
            console.log("entrou");
            //console.log(this.candidatos[0].votos);
            console.log(this.candidatos.length);
            for(let i=0; i <this.candidatos.length ; i++)
            {
                console.log("votos maior");
                //console.log(this.candidatos[i].votos.length);
                //console.log(this.candidatos[i].votos.eleicao.id);
                if(this.candidatos[i].votos.length > 0)
                {
                    console.log("votos maior");
                    for(let j=0; j<this.candidatos[i].votos.length; j++)
                    {
                        console.log(this.candidatos[i].votos[j].eleicao.id);
                        if(this.candidatos[i].votos[j].eleicao.id == this.tipoID)
                        {
                            console.log(this.candidatos[i].nome);
                            this.titulo = this.candidatos[i].votos[j].eleicao.tipo;
                            this.rotulos.push(this.candidatos[i].nome);
                            this.dados.push(this.candidatos[i].votos[j].total);
                        }
                        
                    }
                    
                }
            }
            console.log(this.titulo);
            console.log(JSON.stringify(this.rotulos));
            console.log(JSON.stringify(this.dados));

            const data = {
                labels: this.rotulos,
                datasets: [{
                  label: this.titulo,
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: this.dados,
                }]
            };

            const config = {
                type: 'bar',
                data: data,
                options: {}
            };
            
            const myChart = new Chart(document.getElementById('myChart'), config);
        }
    },
    template:
    `
        <h2>Selecione de qual categoria de eleição deseja ver as estatísticas:</h2>
        <select @change="carregarGrafico()" class="form-select mt-3" id="cbEleicao" v-model="tipoID">
            <option value="" disabled selected>-- Selecione um --</option>
            <option v-for="e in this.eleicoes" :value="e.id">{{e.tipo}}</option>
        </select>

        {{this.tipoID}}

        <div class="mt-5">
            <canvas id="myChart"></canvas>
        </div>
    `
}
const appGraphic = Vue.createApp(grafico).mount("#appGrafico");
/*const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {}
  };

  const myChart = new Chart(
      document.getElementById('myChart'),
      config
      );*/