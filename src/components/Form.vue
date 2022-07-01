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
                        <b-select placeholder="Select a fruit" v-model="form.accountId">
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
                        :type="form.concept && form.concept.length > 4 ? 'is-success' : 'is-danger'"
                        :message="form.concept ? '' : 'This field cannot be empty'">
                        <b-input v-model="form.concept" minlength="4"></b-input>
                    </b-field>

                    <b-field label="Ammount"
                        :type="form.ammount && form.ammount.length > 4 ? 'is-success' : 'is-danger'"
                        :message="form.ammount ? '' : 'This field cannot be empty'">
                        <b-input v-model="form.ammount" minlength="4"></b-input>
                    </b-field>
                </div>                
            </div>            
        </section>
        <footer class="modal-card-foot">
            <b-button
                label="Close"
                @click="$parent.close()" />
            <b-button
                @click="createTransaction"
                label="Login"
                type="is-primary" />
        </footer>
      </div>
    </div>
</template>
<script>
import axios from "axios"
import {mapState} from 'vuex'

export default {
    name:"transactionForm",
    
    data(){                
        return{
            form:{},
            accounts:[],                        
            
        }
    },
    methods:{                
        getAccount:function(){
            axios.get(this.baseUrl + "accounts",{
                headers:{"Authorization": this.userId}
            }).then(response => {
                console.log(response.data)
                this.accounts = response.data.data
            }).catch(e => {
                console.log(e)
            })
        },
        createTransaction: function () {
            this.form.candidateId = this.userId
            let newDate = new Date(this.form.date)
            this.form.date = newDate.toISOString().split("T")[0]
            
            axios.post(this.baseUrl+"transactions",{
                body: JSON.stringify(this.form),
                headers:{"Authorization": this.userId}
            }).then(response => {
                response.success ? console.log("si") : console.log("nope")
                
            }).catch(e => {
                console.log(e)
                this.$buefy.toast.open({
                    message: "something has gone wrong: " + e.response.data.errorMessage,
                    type: 'is-danger',
                    duration:5000
                })
            })
        },
        minDateFunction(){
            let today = new Date()
           this.minDate = new Date(today.setDate(today.getDate() - 1))
        },       
    },
    computed:{
        
        ...mapState(['baseUrl', 'userId'])
        
  },
  created(){
    this.getAccount()
    this.minDateFunction()
  }
 
}

</script>