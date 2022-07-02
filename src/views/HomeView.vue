<template>
  <div class="container">
    
    <HelloWorld msg="Welcome to Nexus API App"/>
    <br>
    <div class="columns ">
      <div class="column m-auto">
        <FilterTransaction/>
      </div>
      <div class="column">
        <b-field label="Order alphabetically" 
            type="is-info">        
            <b-select placeholder="Select order" v-model="order" @input="actionSortTransaction(order)">
                <option value="up" >A-Z</option>
                <option value="" >Z-A</option>
            </b-select>                        
        </b-field>
      </div>
      <div class="column m-auto">
        <b-button type="is-info" @click="isModalActivated = true">Create transaction</b-button>
      </div>
    </div>
    <b-modal v-model="isModalActivated">
     <Form/>
    </b-modal>
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
import Form from '@/components/Form.vue'
import axios from "axios"
import {mapState, mapActions} from 'vuex'

export default {
  name: 'HomeView',
  data(){
    return{
      order:'',
      isModalActivated:false
      
    }
  },
  methods:{
    ...mapActions(['actionGetTransaction','actionIncrementar','actionShowDetail','actionSortTransaction']),            
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
                    message: "something has gone wrong: " + e.response.data.errorMessage,
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
    HelloWorld, FilterTransaction, Form
  },
  created(){
    this.actionGetTransaction()
  }

}
</script>

<style scoped>
  .red{
    color:red
  }

  .onHover:hover{
    background-color: lightgray;
    cursor: pointer;
  }
  
</style>
