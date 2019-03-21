Vue.component('character-card', {
    props: ['image', 'name', 'status', 'species', 'gender', 'origin', 'colsConfig'],
    template: "<div class='col' :class='colsConfig'><div class='card'><div class='card-image'><img :src='image'></div><div class='card-content'><h5 class='center' v-html='name'></h5><p><b>Status : </b>{{status}}</p><p><b>Species : </b>{{species}}</p><p><b>Gender : </b>{{gender}}</p><p><b>Origin : </b>{{origin}}</p></div></div></div>",
});

new Vue({
    el: '#app',
    
    data:{
        state: 'welcome',
        image: '',
        name: '',
        status: '',
        species: '',
        gender: '',
        origin: '',
        nextResponse: {
            image:'',
            name:'',
            status:'',
            species:'',
            gender:'',
            origin:{
                name:''
            }
        },
        allChars:[],
        page:1
    },

    methods:{
        fetchChar: function(){

            this.image = this.nextResponse.image;
            this.name = this.nextResponse.name;
            this.status = this.nextResponse.status;
            this.species = this.nextResponse.species;
            this.gender = this.nextResponse.gender;
            this.origin = this.nextResponse.origin.name;

            var self = this;
            axios.get('https://rickandmortyapi.com/api/character/' + Math.floor((Math.random() * 493) + 1))
                .then(function(response){
                    self.nextResponse = response.data;
                })
        },

        getPage: function(){

            var self = this;
            axios.get('https://rickandmortyapi.com/api/character/?page='+this.page)
                .then(function(response){
                    self.allChars = response.data.results
                })
        },

        nextPage: function(){
            this.page = this.page + 1;
            this.getPage();
        },

        prevPage: function(){
            this.page = this.page - 1;
            this.getPage();
        }
    },

    mounted: function(){
        this.fetchChar();
        this.getPage();
    }
});