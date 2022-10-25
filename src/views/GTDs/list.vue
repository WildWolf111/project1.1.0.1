<script>
    import Layout from "../../layouts/main.vue";
    import PageHeader from "@/components/page-header";
    import appConfig from "../../../app.config";

    import "prismjs";
    import "prismjs/themes/prism.css";

    import UniversalDataService from "../../services/UniversalDataService";
    import router from "../../router";
import GTDDataService from "../../services/GTDDataService";

    export default {
        page: {
            title: "Gtd",
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
                type_list:'gtd/list',
                main_type:'gtd',
                list_items:[],
                title: "Gtds",
                items: [
                    {
                        text: "Главная",
                        href: "/",
                    },
                    {
                        text: "Gtd",
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
 console.log(this.setPage)
        this.page = numPage;
         this.retrieveGTDs();
        
    },
    retrieveGTDs() {
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

                    console.log('______________')
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
    edit(id){
                router.push('/'+this.main_type+'/'+id);

            },
            remove(id){
                
                GTDDataService.delete(id)
                    .then(() => {
                        //dispatch('notification/success', 'Удаление прошло успешно', { root: true });
                        this.retrieveGTDs();
                    })
                    .catch(error => {
                        //dispatch('notification/error', error, { root: true });
                        console.log(error);
                    });

            },
  },

        mounted() {
            this.retrieveGTDs();
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
                                            <th scope="col">NumId</th>
                                            <th scope="col">Country</th>
                                            <th scope="col"></th>
                                           
                                            
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in list_items" :key="item.id">

                                    <td><a href="#" class="fw-medium">{{item.id}}</a></td>
                                      
                                       <td>{{item.num_id}}</td>
                                        <td>{{item.Country.name}}</td>

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
                                <div class="pagination-wrap hstack gap-2">
              <a
                class="page-item pagination-prev disabled"
                href="#"
                v-if="page != 1"
                @click="setPage((--page))"
              >
                Previous
              </a>
              <ul class="pagination listjs-pagination mb-0">
                <li
                 :class="{
                              active: pageNumber == page,
                              disabled: pageNumber == '...',
                            }"
                  v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
                  :key="index"
                  @click="setPage(page = pageNumber)"
                >
                  <a class="page" href="#"  @click="setPage(pageNumber)">{{ pageNumber }}</a>
                </li>
              </ul>
              <a
                class="page-item pagination-next"
                href="#"
                @click="setPage(++page)"
                v-if="page < pages.length"
              >
                Next
              </a>
            </div>
            <div class="pagination-wrap hstack gap-2">
              <a
                class="page-item pagination-prev disabled"
                href="#"
                v-if="page != 1"
                @click="setPage((--page))"
              >
                Previous
              </a>
              <ul class="pagination listjs-pagination mb-0">
                <li
                 :class="{
                              active: pageNumber == page,
                              disabled: pageNumber == '...',
                            }"
                  v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
                  :key="index"
                  @click="setPage(page = pageNumber)"
                >
                  <a class="page" href="#"  @click="setPage(pageNumber)">{{ pageNumber }}</a>
                </li>
              </ul>
              <a
                class="page-item pagination-next"
                href="#"
                @click="setPage(++page)"
                v-if="page < pages.length"
              >
                Next
              </a>
            </div>
                            </div>
                            <!-- end table responsive -->
                        </div>

            </div>
            <!-- end col -->
        </div>
        <!--end row-->
    </Layout>
</template>
