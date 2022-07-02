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
                            :min-date="minDateFunction()"
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

export default {
  data(){
    return{
      transaction : {}
    }
  },
  methods:{    
    minDateFunction(){
      let today = new Date()
      this.minDate = new Date(today.setDate(today.getDate() - 1))
    }, 
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
      form.candidateId = this.userId; 
      console.log("form: ", form)    
      console.log("userId: ", this.userId)    
      axios.put(this.baseUrl + "transactions/", {
        body:form,
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
    ...mapState(['transactions', 'baseUrl', 'userId']),
    isDisabled(){
      return this.form?.concept.length > 4 && this.form?.description.length > 4 && this.form?.date && parseInt(this.form?.ammount) > 0 
    }
  },
 
}
