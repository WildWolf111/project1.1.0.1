<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import CategoriesDataService from "/src/services/CategoriesDataService";


export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
   return {
      currentCategory:{
       id:-1,
        Name:"",
        Slug:"",
        parent_id:1,
      },
      message: '',

    };
    
  },
  components: {
    Layout,
    PageHeader,

  },
    methods: {
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
       
        this.currentCategory.slug = this.translit(this.currentCategory.name);

      },
     
    getCategory(id) {
 
       CategoriesDataService.get(id)
        .then(response => {
                  if (response.status === 200){
              this.currentCategory = response.data;
            }else{
              this.$router.push({path: "/categories"});
              
            }
            console.log('---------------------------------')
           console.log(response)
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCategory() {
       
       CategoriesDataService.update(this.currentCategory.id, this.currentCategory)
       
        .then(response => {
          console.log('_____________________________')
           console.log(response)
          this.message = 'The Category was updated successfully!';
        if (response.data.status_code == 200){
        this.$router.push({path: "/categories"})}
        else{
        return response.data.message}
        })
        
        .catch(e => {
          console.log(e);
        });
        
    },

    deleteCategory() {
      
      CategoriesDataService.delete(this.currentCategory.id)
        .then(response => {
      
          this.$router.push({ name: "category" });
        if (response.status == 202){
        this.$router.push({path: "/categories"})}
        else{
        return response.data.message}
        
        })
        .catch(e => {
          console.log(e);
        });
        
    }
  },
  mounted() {
    this.message = '';

    this.getCategory(this.$route.params.id);
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />



    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="Text" class="form-control" id="labelInput" required  v-model="currentCategory.name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentCategory.slug" >
          </div>                     
     </div>

      
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateCategory" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
