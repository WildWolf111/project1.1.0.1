<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import CategoriesDataService from "/src/services/CategoriesDataService";
import Select2 from 'vue3-select2-component';
export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      title: "Добавление новой категории",
        Category:{
        Id:'',
        Name:"",
        Slug:"",
        parent:
        {id:''
      },
    },
      Categories:[{      
        id:-1,
        text:""
    }]



       
    };
    
  },
  components: {
    Layout,
    PageHeader, 
    Select2
  },
    methods: {
      retrieveCategories() {
     
     this.jsonPages = {
       pg_number:this.page,
       pg_length: this.perPage
   };

   if (this.search!=""){
    this.jsonFields = [{
       field:"name",
       value: this.search
    }];
    }else{
        this.jsonFields = [];
    }


    CategoriesDataService.getAll(this.jsonPages)
    .then(response => {
        
    
        console.log(response.data)

       this.perPage = response.data.pg_length;
       
       this.page = response.data.pg_number;
             
             
            
        for(let i = 0; i < response.data.length; i++){
     console.log(response)
           let Category = response.data[i];
        
           this.Categories[i]={
             
             id:Category.id,

             text:Category.name

           };

        


       }

      
     })
     .catch(e => {
       console.log(e);
     });
 },
       translit(word){
      var answer = '';
      var converter = {
        'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
        'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
        'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
        'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
        'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
        'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
        'э': 'e',    'ю': 'yu',   'я': 'ya',
    
        'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
        'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
        'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
        'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
        'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
        'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
        'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya',   ' ': '-'
      };
    
      for (var i = 0; i < word.length; ++i ) {
        if (converter[word[i]] == undefined){
          answer += word[i];
        } else {
          answer += converter[word[i]];
        }
      }
    
      return answer;
    },
     Transliteration(){
       
        this.Category.Slug = this.translit(this.Category.Name);

      },










 
    addedCategory() {
      var data = {
        "name":this.Category.Name,
        "slug":this.Category.Slug,
        "parent":
        {"id":this.Category.id
        }
      };
  
      CategoriesDataService.create(data)
        .then(response => {
          this.Category.Id = response.data.id;
         
          this.submitted = true;
console.log(response.data)
         if (response.data.message = 202){
        this.Category.Name = ""
        this.Category.Slug = ""
        this.Category.id = ""
        }
        else{
        return response.data.message}

        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCategory() {
      this.submitted = false;
      this.Category = {};
    }
  },

  mounted() {
   this.retrieveCategories()

  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
    <div class="col-xxl-3 col-md-6" :style="{'margin-left':Category.level*25+'px'}">
      
        <label for="exampleDataList" class="form-label">{{ $t("t-brands") }}</label>
        <Select2 v-model.number="Category.id" :options="this.Categories" />
      
    </div>



     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="Category.Name" @keyup="Transliteration">
          </div>                     
     </div> 

      <div class="row">
          <div> 
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="Category.Slug" >
          </div>                     
      </div> 
      
<p>
 
    </p>
  
     <div class="row">
     <div>
        <b-button @click="addedCategory" variant="success" class="waves-effect waves-light" >{{ $t("t-Added") }}</b-button>       
        </div>             
     </div>
      




    </Layout>
</template>
