<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../app.config";
import ProductsDataService from "/src/services/ProductsDataService";
import BrandsDataService from "/src/services/BrandsDataService";
import CategoriesDataService from "/src/services/CategoriesDataService";
import Select2 from 'vue3-select2-component';

export default {
  
  page: {
    title: "Basic Elements",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
   return {
    currentCategories:[
    {
            id:-1,
            text:""
          }
   ],
      currentProduct:{
          Id:-1,
          Name:"",
          Slug:"",
          SKU:"",
          short_description:"",
          full_description:"",
          Brand:{
            Id:-1,
            name:""
          },
      },
      message: '',
        Brands:[
          {
            id:-1,
            text:""
          }
        ],
        Categories:[
          {
            id:-1,
            text:""
          }
        ],
    };
    
  },
  components: {
    Layout,
    PageHeader,
    Select2
  },
    methods: {
    getProduct(id) {
       
       ProductsDataService.get(id)
        .then(response => {
          
          console.log(response.data)



          console.log('продукт')
            console.log(response.data.Prod)
            if (response.status == 200){
              this.currentProduct = response.data.Prod;
            }else{
              this.$router.push({path: "/products"});
            }

            console.log('категории')
              console.log(response.data.Cats)
              if (response.status == 200){
             
              for(let i = 0; i < response.data.Cats.length; i++){

                    let currentCategory = response.data.Cats[i];
                    
                    this.currentCategories[i]={
                      
                      id:currentCategory.id,

                      text:currentCategory.name 

                    };
                  
                    }
            }else{
              this.$router.push({path: "/products"});
              
            }
          
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateProduct() {
        
        this.currentProduct.Brand.Id = parseInt(this.currentProduct.Brand.Id);
       ProductsDataService.update(this.currentProduct.id, this.currentProduct)
       
        .then(response => {

          this.message = 'The Product was updated successfully!';
        if (response.status == 200){
        this.$router.push({path: "/products"})}
        else{
        return response.data.message}
        })

        .catch(e => {
          console.log(e);
        });
        
    },

    deleteProduct() {
      
      ProductsDataService.delete(this.currentProduct.Id)
        .then(response => {
         
          this.$router.push({ name: "product" });
        if (response.status == 202){
        this.$router.push({path: "/products"})}
        else{
        return response.data.message}
        
        })
        .catch(e => {
          console.log(e);
        });
        
    },
    
       retrieveBrands(){
        
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


       BrandsDataService.getAll(this.jsonPages)
       .then(response => {
                
                this.perPage = response.data.pg_length;
                  
                  this.page = response.data.pg_number;
           

                for(let i = 0; i < response.data.List.length; i++){

                  let currentBrand = response.data.List[i];
                
                  this.Brands[i]={
                    
                    id:currentBrand.Id,

                    text:currentBrand.name 

                  };

      }
      })
        .catch(e => {
          console.log(e);
        });
    },
       
    retrieveCategories(){
      CategoriesDataService.getAll(this.jsonPages)
       .then(response => {
                console.log(response)

                this.perPage = response.data.pg_length;
                  
                  this.page = response.data.pg_number;
           

                for(let i = 0; i < response.data.length; i++){

                  let currentCategory = response.data[i];
                  console.log(currentCategory)
                  this.Categories[i]={
                    
                    id:currentCategory.id,

                    text:currentCategory.name 

                  };
                  console.log(this.Categories)

      }
      })
        .catch(e => {
          console.log(e);
        });
    }




    
  },
  mounted() {
    this.message = '';
    this.retrieveBrands();
     this.retrieveCategories();
     console.log('111111111111111111111111111')
     console.log(this.Categories);
    this.getProduct(this.$route.params.id);
 
     
    
  }

    
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
     <div class="row">
          <div>
              <label for="labelInput" class="form-label">{{ $t("t-name") }}</label>
             <input type="text" class="form-control" id="labelInput" required  v-model="currentProduct.name" >
          </div>                     
     </div> 

      <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-slug") }}</label>
              <input type="text" class="form-control" id="labelInput" required v-model="currentProduct.slug" >
          </div>                     
     </div>
        <div class="row">
          <div>
              <label for="labelInput" class="form-label">   {{ $t("t-SKU") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentProduct.sku" >
          </div>                     
     </div>
           <div class="row">
          <div>
              <label for="labelInput" class="form-label"> {{ $t("t-short_description") }}</label>
             <input type="Text" class="form-control" id="labelInput" required v-model="currentProduct.short_desc" >
          </div>                     
     </div>  

 <div class="row">
          <div>
              <label for="labelInput" class="form-label">  {{ $t("t-full_description") }}</label>
              <input type="Text" class="form-control" id="labelInput" required v-model="currentProduct.full_desc" >
          </div>                     
  </div>

<div class="col-xxl-3 col-md-6">
    <label for="exampleBrands" class="form-label">{{ $t("t-brands") }}</label>
    <Select2 v-model="currentProduct.Brand.Id" :options="this.Brands"/>
</div>

<div class="col-xxl-3 col-md-6" v-for="cat  in currentCategories" :key="cat.id">
    <label for="exampleCats" class="form-label">{{ $t("t-categories") }}</label>
    <Select2  v-model="cat.id" :options="this.Categories" />
</div> 
<p>
 
    </p>
  
    
            <div class="row">
                <div>
                    <b-button @click="updateProduct" variant="success" class="waves-effect waves-light" >{{ $t("t-Save") }}</b-button> 
                              
                </div> 
            </div>




    </Layout>
</template>
