<template>
  <div class="container">
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
       
    <div class="onHover" v-for="(transaction,i) in transactions" :key="i" @click="showDetail(transaction)"> 
      <p class="box mb-1">{{transaction.concept}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios"

export default {
  name: 'HomeView',
  data(){
    return{
      transactions:[],
      baseUrl:"http://63.135.170.173:5000/",
      userId:"799acffc-79be-4e6a-bb72-3865c5c91abe",
      
    }
  },
  methods:{
    getTransaction:function () {
      axios.get(this.baseUrl + "transactions",{
        headers:{"Authorization": this.userId}
      }).then(response => {
        this.transactions = response.data.data        
      }).catch(e => console.log(e))
    },
    showDetail:function (transaction) {
      this.$router.push({
        name:"detail",
        params:{
          transaction
        }
      })
    },
    
  },
  computed:{
     
  },
  components: {
    HelloWorld
  },
  created(){
    this.getTransaction();
  }

}
</script>

<style scoped>
  p{
    cursor: pointer;

  }

  .red{
    color:red
  }

  p:hover{
    background-color: lightgray;
  }
  
  
</style>
