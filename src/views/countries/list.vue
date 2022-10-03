<script>
    import Layout from "../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import appConfig from "../../../app.config";

    import "prismjs";
    import "prismjs/themes/prism.css";

    import UniversalDataService from "../../services/UniversalDataService";
    import router from "../../router";

    export default {
        page: {
            title: "Сountries",
            meta: [{ name: "description", content: appConfig.description }],
        },
        data() {
            return {
                type_list:'countries/list',//(это часть URL)
                main_type:'countries',//(это часть URL)
                list_items:[],
                title: "Сountries",
                items: [
                    {
                        text: "Главная",
                        href: "/",
                    },
                    {
                        text: "Сountries",
                        active: true,
                    },
                ],
            };
        },
        components: {
            Layout,
            PageHeader,
        },
        methods: {
    setPage(numPage){
 console.log(this.setPage)
        this.page = numPage;
         this.retrieveCountries();
        
    },
    retrieveCountries() {
         console.log("*******************")
          console.log(this.page)
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

       UniversalDataService.setPath(this.type_list)
       UniversalDataService.list(this.jsonPages)
       .then(response => {

                    //dispatch('notification/success', 'Получение списка прошло успешно', { root: true });
                    this.list_items = response.data.List;

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

    edit(id){
                router.push('/'+this.main_type+'/'+id);

            },
  },
  mounted() {
    this.retrieveCountries();
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
                                            <th scope="col">Code</th>
                                            <th scope="col"></th>
                                           
                                            
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in list_items" :key="item.id">

                                    <td><a href="#" class="fw-medium">{{item.id}}</a></td>
                                      
                                       <td>{{item.name}}</td>
                                        <td>{{item.code}}</td>

                                        <td>
                                            <div class="hstack gap-3 flex-wrap">
                                                <a @click="edit(item.id)" href="javascript:void(0);" class="link-primary fs-15"><i class="ri-edit-2-line"></i></a> 
                                       
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
