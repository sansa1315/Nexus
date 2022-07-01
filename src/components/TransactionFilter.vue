<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>

<template>
    <div>
        <b-field label=""
            :message="specialCharacter ? 'Dont use special Character' : ''"
            :type=" specialCharacter? 'is-danger' : ''"
        >
            <b-autocomplete
                rounded
                v-model="concept"
                :data="filteredDataArray"
                placeholder="Filter accounts"
                icon="magnify"
                field="concept"
                clearable
                @select="transaction => actionShowDetail(transaction)"
                @input="checkSpecialCharacter"
                >
                <template #empty>
                  <div class="red">                    
                        <span v-if="!specialCharacter">
                            No results found                    
                        </span>
                        <span v-if="specialCharacter">
                            Dont use special Character    
                        </span> 
                  </div>
                    </template>
            </b-autocomplete>
        </b-field>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
            concept:'',
            specialCharacter:false
            
        }
    },
    methods:{
        ...mapActions(['actionShowDetail'])
    },
    computed:{
        ...mapState(['transactions','selected']),
        checkSpecialCharacter(){
            if(this.concept == "") return this.specialCharacter = false
            if(this.concept.match(/\W/)?.length) return this.specialCharacter= true

        },
         filteredDataArray() {
            return this.transactions.filter((option) => {                
                return option.concept
                    .toString()
                    .toLowerCase()
                    .indexOf(this.concept.toLowerCase()) >= 0
            })
        }
    }
}
</script>

<style scoped>
    .red{
        color: red;
    }
</style>