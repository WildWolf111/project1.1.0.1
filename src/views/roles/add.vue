<style>
    .select2 {
        width: 150px !important;
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
          title: "Добавление новой роли",
          
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

                Permissions:[],

                selected: [],

                allSelected: false,
                
         
          
          
          Role:{
          
            id:0,
            name:'',

          },  
          

        };
        
      },
      components: {
        Layout,
        PageHeader,
        Select2
      },
        methods: {
            selectAll() {
            let all_s = this.allSelected;
            this.Permissions.forEach( itm => itm.selected = !all_s );
            },
    
        AddRole() {


          var data = {
            
              'name':this.Role.name,
           

    
          };
          
    
          RolesDataServise.create(data)
            .then(response => {
                
                console.log(response)
                
              
              this.Role.id = response.data.id;
              
              this.submitted = true;
              if (response.status == 200){
                      this.AddPerms(response.data.id)
    }
        
        
        else{
        return response.data.message}
            })
            //.catch(e => {
             // console.log(e);
            //});
           
        },



        
        
        newRole() {
          this.submitted = false;
          this.Role = {};
        },
    
    
        retrieveRoles() {
       
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
                 this.Permissions = response.data.List;

                 console.log(response.data.List)

                 this.perPage = response.data.pg_length;

                 this.page = response.data.pg_number;
                 
                 let i=0;
                 for(i=0; i<response.data.total_pg;i++){
                 this.pages[i]=i+1;}
                 })
                 .catch(error => {
                 //dispatch('notification/error', error, { root: true });
                 console.log(error);
                 });


           },
              AddPerms(role_id) {

    console.log(this.selected)
    var data = {
        'role_id':role_id,
        'perm_id':this.selected,
        
    };

    RolesDataServise.addendpoints(data)
      .then(response => {
          
          console.log(response)
          
        
        this.Permission.id = response.data.id;
        
        this.submitted = true;
        if (response.status == 200){
                
    }


    else{
    return response.data.message}
      })
      .catch(e => {
      console.log(e);
      });

    },
        
      },
    
       mounted() {
       this.retrieveRoles();

      
    
      },
      computed: {
            allSelected() {
            return this.Permissions.every(itm => itm.selected);
            }
      },
      watch: {
    Permissions: {
      handler() {
        this.selected = this.Permissions
          .filter( itm => itm.selected )
          .map( itm => itm.id );
      },
      deep: true
    }
  }
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
                          <input class="form-check-input" type="checkbox" id="formCheck2" :checked="allSelected" @click="selectAll" />                                                            
                          <label class="form-check-label" for="formCheck2"></label>
                    </div>
                  </th>
                
                  
                  
                  
              
              </tr>
          </thead>
          <tbody>
              <tr v-for="(Permission) in Permissions" :key="Permission.id">
          
                 
                  
                 
                  <td >{{Permission.path}}</td>
  
                  <td >{{Permission.method}}</td>
                  
                 <td></td>
                 
                    <!-- delete Button -->
                  <td>
                    <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="formCheck2" unchecked  :value="Permission.id" number v-model="Permission.selected"/>                                                            
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
                        <button class="btn btn-success" type="button" @click="AddRole">add</button>
                       
          </div>
               <p>
       
          </p>
        
                          
                                 
                                 
                                 
                                 
                                 
                                  </form>
                              </div>
      
      
      
      
      
          </Layout>
      </template>
    