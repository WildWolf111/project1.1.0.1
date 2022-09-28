<script>
    import Layout from "../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import appConfig from "../../../app.config";

    import "prismjs";
    import "prismjs/themes/prism.css";

    import RolesDataServise from "../../services/RolesDataServise";
    import router from "../../router";

    export default {
        page: {
            title: "Сountries",
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
             

                
                type_list:'admin/listRoles',//(это часть URL-list)
                main_type:'users',//(это часть URL)
                list_items:[],
                title: "Roles",
                items: [
                    {
                        text: "Главная",
                        href: "/",
                    },
                    {
                        text: "roles",
                        active: true,
                    },
                ],
            };
        },
        components: {
            Layout,
            PageHeader,
        },
        methods:{

            setPage(numPage){
         this.page = numPage;
         this.retrieveRoles();
         console.log(numPage)
        
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
       

            RolesDataServise.setPath(this.type_list);
            RolesDataServise.list( this.jsonPages)
            .then(response => {

                  //dispatch('notification/success', 'Получение списка прошло успешно', { root: true });
                  this.list_items = response.data;

                  console.log(response.data)

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

            remove(id){
                RolesDataServise.setPath(this.main_type);
                RolesDataServise.delete(id)
                    .then(() => {
                        //dispatch('notification/success', 'Удаление прошло успешно', { root: true });
                        this.retrieveRoles();
                    })
                    .catch(error => {
                        //dispatch('notification/error', error, { root: true });
                        console.log(error);
                    });

            },
            edit(id){
                router.push('/'+this.main_type + '/'+id);

            }

        },

        mounted() {
            this.retrieveRoles();
           
        },
    };
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items"/>

        <div class="row">
            <div class="col-xl-12">


                        <div class="live-preview">
                            <div class="table-responsive">
                                <table class="table table-primary table-striped align-middle table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            
                                            <th scope="col"></th>
                                           
                                            
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in list_items" :key="item.id">

                                    <td><a href="#" class="fw-medium">{{item.id}}</a></td>
                                    
                                    <td>{{item.name}}</td>
                                    <td>
                                            <div class="hstack gap-3 flex-wrap">
                                                <router-link :to="{name: 'RolesEdit', params: { id: item.id }}"> <a href="javascript:void(0);" class="link-primary fs-15"><i class="ri-edit-2-line"></i></a></router-link> 
                                       
                                                <a href="javascript:void(0);" class="link-danger fs-15"><i class="ri-delete-bin-line" @click="remove(item.id)"></i></a>
                                            </div>
                                        </td>
                                    </tr>

                                    </tbody>

                                </table>
                                <!-- end table -->
                            </div>
                            <!-- end table responsive -->
                        </div>

            </div>
            <!-- end col -->
        </div>
        <!--end row-->
    </Layout>
</template>
