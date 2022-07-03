<template>
  <div class="container">
    <h1>This is an detail page</h1>    
    <br>
    <div class="columns p-1">
                <div class="column has-text-left">                                                            
                    <b-field label="Description"
                        :type="form?.description && form?.description.length > 4 ? 'is-success' : 'is-danger'"
                        :message="form?.description && form?.description.length > 4 ? 'success' : 'This field cannot be empty'">
                        <b-input v-model="form.description" minlength="4"></b-input>
                    </b-field>

                    <b-field label="Date"
                        :type="form?.date ? 'is-success' : 'is-danger'"
                        :message="form?.ammount ? 'success' : 'Select a date'">
                        <b-datepicker
                            ref="datepicker"
                            expanded
                            :min-date="minDate"
                            v-model="form.date"
                            placeholder="Select a date">
                        </b-datepicker>
                        <b-button
                            @click="$refs.datepicker.toggle()"
                            icon-left="calendar-today"
                            :type="form.date ? 'is-success' : 'is-danger'" />
                    </b-field>
                </div>

                <div class="column has-text-left">
                    <b-field label="Concept"
                        :type="form?.concept && form?.concept.length > 4 ? 'is-success' : 'is-danger'"
                        :message="form?.concept && form?.concept.length > 4 ? 'success' : 'This field cannot be empty'">
                        <b-input v-model="form.concept" minlength="4"></b-input>
                    </b-field>                    

                    <b-field label="Ammount"
                    :message="parseInt(form?.ammount) > 0 ? 'success' : 'This field cannot be empty'">                    
                      <b-numberinput :type="parseInt(form.ammount) > 0 ? 'is-success' : 'is-danger'" min="0" v-model="form.ammount"></b-numberinput>
                    </b-field>
                   
                      <b-button  type="is-success" 
                        :disabled="!isDisabled" 
                        @click="updateConfirmation(form)">Update transaction</b-button>                                        
                </div>                
            </div>            
    
    
  </div>
</template>

<script>
import axios from "axios"
import {mapState, mapActions} from 'vuex'



export default {
  data(){
    return {
      form:{},
      test:"hola mundo",
      accounts:[],
      minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 4),
      
    }
  },
  methods:{
    ...mapActions(['actionGetTransaction']),   
    updateConfirmation(form){
      this.$buefy.dialog.confirm({
            title: 'Update transaction',
            message: 'Are you sure you want to <b>Update</b> this transaction?.',
            confirmText: 'Update transaction',
            type: 'is-warning',
            hasIcon: true,
            onConfirm: () => this.updateTransaction(form)
        })
    },
    updateTransaction:function (form) {                          
      fetch(this.baseUrl + "transactions/", {
                method: "PUT",
                headers: {
                    Authorization: this.userId,
                    'Content-Type': 'application/json'                     
                },
                body: JSON.stringify(form),
                mode:'cors'
                })
                .then((response) => response.json())
                .then((data) => {
                        this.$buefy.toast.open({
                        message: "Transacction updated",
                        type: 'is-success',
                        duration:5000
                        })
                      this.actionGetTransaction();
                      this.form = {}
                    })
                .catch((e) => {
                  this.$buefy.toast.open({
                      message: "something has gone wrong: " + e.response.data.errorMessage,
                      type: 'is-danger',
                      duration:5000
                  })
                  console.log(e)
                });

    }

  },
  computed:{
    ...mapState(['transactions', 'baseUrl', 'userId']),
    isDisabled(){
      return this.form?.concept.length > 4 && this.form?.description.length > 4 && this.form?.date && parseInt(this.form?.ammount) > 0 
    }
  },
  created(){
    this.$route.params.transaction ? 
      this.form = {
        id: this.$route.params.transaction.id,
        concept: this.$route.params.transaction.concept,
        description: this.$route.params.transaction.description,
        ammount: this.$route.params.transaction.ammount,
        date: this.$route.params.transaction.date
        } : 
      this.form = {
        concept:'',
        description:'',
        ammount:0,
        date:null,
      }
   
  }
}
</script>

<style scoped>
  
</style>
