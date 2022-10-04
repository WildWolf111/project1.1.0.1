<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import GTDDataService from "/src/services/GTDDataService";
import CountryDataService from "/src/services/CountryDataService";
import Select2 from 'vue3-select2-component';

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
   return {
    PageRequest: {
                        Fields: [{
                        Name :'',
                        Value:'',
                        Operation:'',
                        Order:'',
                        }],
                        PageNumber:0,
                        PageLenght:0,
                        TotalRecords:0,
                        TotalPage:0,
                    },
                page: 1,
                perPage: 7,
                pages: [],
                jsonPages: {
                            PageNumber: 0,
                            TotalRecords:0,
                },
                jsonFields: [{
                            name:'',
                            value: ''
                }],

                search:"",


      GTD:{
          id:-1,
          NumId:"",
         Country:{
            id:-1,
            name:""
         },
      },
      message: '',
      Countries:[{
        id:-1,
        name:""
      }]
    };
    
  },
  components: {
    Layout,
    PageHeader,
    Select2
  },
    methods: {
    getGTD(id) {
       
       GTDDataService.get(id)
        .then(response => {
         
            console.log(response.data)
            if (response.status == 200){
              this.GTD = response.data;
            }else{
              this.$router.push({path: "/GTDs"});
              
            }
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateGTD() {
        
        this.GTD.Country.Id = parseInt(this.GTD.Country.Id);
       GTDDataService.update(this.GTD.id, this.GTD)
       
        .then(response => {
         
          this.message = 'The GTD was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/GTDs"})}
        else{
        return response.data.message}
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },

    deleteGTD() {
      
      GTDDataService.delete(this.GTD.Id)
        .then(response => {
         
          this.$router.push({ name: "GTD" });
        if (response.status == 202){
        this.$router.push({path: "/GTDs"})}
        else{
        return response.data.message}
        
        })
        .catch(e => {
          console.log(e);
        });
        
    },
    
       retrieveCountries(){
        
      this. jsonPages = {
               pg_number:1,
                  pg_length: 1000
            };
         
            if (this.search!=""){
            this.jsonFields = [{
                field:"name",
                value: this.search
            }];
            }else{
                this.jsonFields = [];
            }


       CountryDataService.getAll(this.jsonPages)
       .then(response => {
     
         
     let i=0;
      for(i=0; i<response.data.pg_length;i++){
           let currentCountry = response.data.List[i];
          
           this.Countries[i]={
    
            id:currentCountry.id,
            text:currentCountry.name  

          };
      }


     
    })
    .catch(e => {
      console.log(e);
    });
},

  },
  mounted() {
    this.message = '';
    
    this.getGTD(this.$route.params.id);
     this.retrieveCountries();
     
    
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="text" class="form-control" id="labelInput" required  v-model.number="GTD.num_id" >
          </div>                     
     </div> 

  

<div class="col-xxl-3 col-md-6">
    <label for="exampleDataList" class="form-label">{{ $t("t-countries") }}</label>
    <Select2 v-model.number="GTD.Country.id" :options="this.Countries" @select="mySelectEvent($event)"/>
</div>

      
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateGTD" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
