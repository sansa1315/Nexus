<template >
    <div>
        <div class="modal-card" style="width: auto">
        
        <header class="modal-card-head">
            <p class="modal-card-title">New Transaction</p>           
        </header>
        <section class="modal-card-body"> 
            <div class="columns">
                <div class="column has-text-left">                    

                    <b-field label="Accounts" 
                        :type="form.accountId? 'is-success' : 'is-danger'"
                        :message="form.accountId? '' : 'Select an account'">
                        <b-select placeholder="Select an account" v-model="form.accountId">
                            <option v-for="(account,i) in accounts" :value="account.id" :key="i">{{ account.type }}</option>
                        </b-select>                        
                    </b-field>

                    <b-field label="Description"
                        :type="form.description && form.description.length > 4 ? 'is-success' : 'is-danger'"
                        :message="form.description ? '' : 'This field cannot be empty'">
                        <b-input v-model="form.description" minlength="4"></b-input>
                    </b-field>

                    <b-field label="Date"
                        :type="form.date ? 'is-success' : 'is-danger'"
                        :message="form.ammount ? '' : 'Select a date'">
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
                        :type="form?.concept && form.concept?.length > 4 ? 'is-success' : 'is-danger'"
                        :message="form?.concept ? '' : 'This field cannot be empty'">
                        <b-input v-model="form.concept" minlength="4"></b-input>
                    </b-field>                    

                    <b-field label="Ammount"
                        :message="parseInt(form?.ammount) > 0 ? 'success' : 'This field cannot be empty'">                    
                        <b-numberinput :type="parseInt(form.ammount) > 0 ? 'is-success' : 'is-danger'" min="0" v-model="form.ammount"></b-numberinput>
                    </b-field>

                </div>                
            </div>            
        </section>
        <footer class="modal-card-foot">
            <b-button
                label="Close"
                @click="$parent.close()" />
            <b-button
                :disabled="!isDisabled"
                @click="createTransaction"
                label="Create transaction"
                type="is-primary" />
        </footer>
      </div>
    </div>
</template>
<script>
import axios from "axios"
import {mapState, mapActions} from 'vuex'

export default {
    name:"transactionForm",
    
    data(){                
        return{
            form:{},
            accounts:[],                        
            
        }
    },
    methods:{
        ...mapActions(['actionGetTransaction']),                
        getAccount:function(){
            axios.get(this.baseUrl + "accounts",{
                headers:{"Authorization": this.userId}
            }).then(response => {                
                this.accounts = response.data.data
            }).catch(e => {
                this.$buefy.toast.open({
                        message: "something has gone wrong with accounts: " + e.response.data.errorMessage,
                        type: 'is-danger',
                        duration:5000
                    })
            })
        },
        createTransaction: function () {
            this.form.candidateId = this.userId
            let newDate = new Date(this.form.date)            
            this.form.date = newDate.toISOString().split("T")[0]

            fetch(this.baseUrl + "transactions/", {
                method: "POST",
                headers: {
                    Authorization: "799acffc-79be-4e6a-bb72-3865c5c91abe",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.form),
                mode:'cors'
                })
                .then((response) => response.json())
                .then((data) => {
                        this.$buefy.toast.open({
                        message: "Transacction created",
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
                });

        },
        minDateFunction(){
            let today = new Date()
           this.minDate = new Date(today.setDate(today.getDate() - 1))
        },
    },        
    computed:{        
        ...mapState(['baseUrl', 'userId']),
        isDisabled(){
            if (this.form) {
                return this.form?.concept.length > 4 && this.form?.description.length > 4 && this.form?.date && parseInt(this.form?.ammount) > 0  && this.form?.accountId
                
            }
        }
        
  },
  created(){
    this.getAccount()
    this.minDateFunction()
    this.form = {
        concept:'',
        description:'',
        ammount:0,
        date:null,
      }
    
  }
 
}

</script>