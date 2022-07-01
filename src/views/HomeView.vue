<template>
  <div class="container">
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <FilterTransaction/>
     
    <div class="onHover box mb-1 is-flex is-justify-content-space-between is-align-items-center"
       v-for="(transaction,i) in transactions" :key="i" @click="actionShowDetail(transaction)"> 
      <p class="">{{transaction.concept}}</p>
      <b-button type="is-danger" @click.stop="deleteConfirmation(transaction.id)" outlined>Delete</b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import FilterTransaction from '@/components/TransactionFilter.vue'
import axios from "axios"
import {mapState, mapActions} from 'vuex'

export default {
  name: 'HomeView',
  data(){
    return{
      
      
    }
  },
  methods:{
    ...mapActions(['actionGetTransaction','actionIncrementar','actionShowDetail']),            
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
                    message: "something has gone wrong: " + e.message,
                    type: 'is-danger',
                    duration:5000
                })
      })

    }
    
  },
  computed:{
    ...mapState(['transactions', 'baseUrl', 'userId'])
     
  },
  components: {
    HelloWorld, FilterTransaction
  },
  created(){
    this.actionGetTransaction()
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
