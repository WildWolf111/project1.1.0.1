<style>
    .select2 {
        width: 200px !important;
    }
    </style>
    <script>
    import Layout from "../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import appConfig from "../../../app.config";
    import Select2 from 'vue3-select2-component';
    import RolesDataServise from "/src/services/RolesDataServise";
  
    
    export default {
      jsonpage: {
        title: "Basic Elements",
        meta: [{ name: "description", content: appConfig.description }],
      },
      data() {
        
        return {
          fields: [{ first: '',last: '' }],
          title: "Изменение польователя",

        
            Role:{
              id:'',
              name:''
            },
          
   
        

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
                perPage: 1000,
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

                list_items:[],

                selected: [],

                allSelected: false,
                
                Roles:[{
                    id:'',
                    name:''

                }]
        }
      },
      components: {
        Layout,
        PageHeader,
        Select2
      },


        
        methods: {
            
          
          async selectAll() {
        if (this.allSelected) {
          const selected = this.list_items.map((li) => li.id);
          this.selected = selected;
        } else {
          this.selected = [];
        }
      },
    
    
            getRole(id) {
       
       RolesDataServise.get(id)
        .then(response => {
          console.log('!!!!!!!!!!!!!!!!')
            console.log(response.data)
          console.log('!!!!!!!!!!!!!!!!')
            if (response.status == 200){
              this.Role = response.data;
            }else{
              this.$router.push({path: "/roles"});
              
            }
          
        })
        .catch(e => {
          console.log(e);
        });
    },
          //добавление новой строки
           AddField: function () {
    
              this.submitted = false;
     
              
          this.Permission.push({
            Permission:{
                id:0,
                path:"",
                method:""
            }
            
            
            });
          
        }, //добавление новой строки(конец)
          
          
                //удаление строки
          RemoveField: function(index){
    
            this.items.splice(index,1);
    
        },//удаление строки конец
          
    
       


//полцчение списка endpoints
        setPage(numPage){
         this.page = numPage;
         this.getPermissions();
         console.log(numPage)
        
    },

    getPermissions() {
       
       this.jsonPages = {
         pg_number:this.page,
         pg_length: this.perPage
     };

     if (this.search!=""){
      this.jsonPages = [{
         field:"name",
         value: this.search
      }];
      }else{
          this.jsonFields = [];
      };
      
      
           
            RolesDataServise.listPerms( this.jsonPages)
            .then(response => {

                  //dispatch('notification/success', 'Получение списка прошло успешно', { root: true });
                  this.list_items = response.data.List;

                  console.log(this.list_items)

                  this.perPage = response.data.pg_length;

                  this.page = response.data.pg_number;
                  console.log(response.data.pg_number,response.data.pg_length)
                  let i=0;
                  for(i=0; i<response.data.total_pg;i++){
                  this.pages[i]=i+1;}
                  })
                  .catch(error => {
                  //dispatch('notification/error', error, { root: true });
                  console.log(error);
                  });


        },


                    updateUser(){

                      RolesDataServise.updateUser(data)
  




}
    
      },
    
       mounted() {
     
        this.getRole(this.$route.params.id);
        this.getPermissions()
        this.selectAll
      },
        
    };
    </script>
    
    <template>
      <Layout>
        <PageHeader/>
        
          <div class="live-preview">
                               
                            <form class="row g-3 needs-validation" novalidate>
                                    
                                
                                <div class="col-md-6 position-relative">
                                    <label for="validationTooltip03" class="form-label">role</label>
                                    <input type="text" class="form-control" id="validationTooltip03" v-model="Role.name" >                                       
                                </div>

                               
                                  
    <p>
     
        </p>
  
    
     <div>
    
       <table class="table table-primary table-striped align-middle table-nowrap mb-0">
        <thead>
            <tr>
                  <!-- items -->
                  
                
             
                <th>Endpoint path</th>
                <th>Endpoint method</th>
                <th>all</th>
                <th>
                  <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="formCheck2" v-model="allSelected" @change="selectAll" />                                                            
                        <label class="form-check-label" for="formCheck2"></label>
                  </div>
                </th>
              
                
                
                
            
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in list_items" :key="item.id">
        
               
                
               
                <td >{{item.path}}</td>

                <td >{{item.method}}</td>
                
               <td></td>
               
                  <!-- delete Button -->
                <td>
                  <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="formCheck2" unchecked v-model="selected" :value="item.id" number />                                                            
                        <label class="form-check-label" for="formCheck2"></label>
                  </div>
                    
                </td>
            
            </tr>
           
        </tbody>
        <p></p>
        
    </table>
    
     </div>
    
        <p>
     
        </p>
      
        <div class="col-12">
                      <button class="btn btn-success" type="button" @click="updateUser">Update</button>
                     
        </div>
             <p>
     
        </p>
      
                        
                               
                               
                               
                               
                               
                                </form>
                            </div>
    
    
    
    
    
        </Layout>
    </template>
    