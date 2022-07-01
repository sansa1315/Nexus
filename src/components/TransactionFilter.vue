<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>

<template>
    <div>
        <b-field label="">
            <b-autocomplete
                rounded
                v-model="concept"
                :data="filteredDataArray"
                placeholder="Filter accounts"
                icon="magnify"
                field="concept"
                clearable
                @select="transaction => actionShowDetail(transaction)">
                <template #empty>
                  <div class="red">
                    No results found
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
            
        }
    },
    methods:{
        ...mapActions(['actionShowDetail'])
    },
    computed:{
        ...mapState(['transactions','selected']),
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

</style>