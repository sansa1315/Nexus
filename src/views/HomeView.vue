<template>
  <div class="container">
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
       
    <div class="onHover box mb-1 is-flex is-justify-content-space-between"
       v-for="(transaction,i) in transactions" :key="i" @click="showDetail(transaction)"> 
      <p class="">{{transaction.concept}}</p>
      <b-button type="is-danger" @click.stop="deleteConfirmation(transaction.id)" outlined>Delete</b-button>
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
    clickOnTransaction:function (transaction) {
      console.log(transaction)
    },
    showDetail:function (transaction) {
      this.$router.push({
        name:"detail",
        params:{
          transaction
        }
      })
    },
    deleteConfirmation(id){
      this.$buefy.dialog.confirm({
            title: 'Delete transaction',
            message: 'Are you sure you want to <b>Delete</b> this transaction?.',
            confirmText: 'Delete transaction',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => this.deleteTransaction(id)
        })
    },
    deleteTransaction:function (id) {     
      axios.delete(this.baseUrl + "transactions/" + id, {
        headers:{"Authorization": this.userId}
      }).then(response => {
        this.$buefy.toast.open({
                    message: 'Transaction Deleted',
                    type: 'is-success'
                })
      }).catch(e => {        
        this.$buefy.toast.open({
                    message: e.message,
                    type: 'is-danger',
                    duration:5000
                })
      })

    }
    
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
    

  }

  .red{
    color:red
  }

  .onHover:hover{
    background-color: lightgray;
    cursor: pointer;
  }
  
  
</style>
