<template>
  <div class="container">
    <h1>This is an detail page</h1>
    <div>
      <p v-if="$route.params.transaction.concept"><b>Concept</b>:  -- {{$route.params.transaction.concept}}</p>
      <p v-if="$route.params.transaction.ammount"><b>Ammount</b>: {{$route.params.transaction.ammount}}</p>
      <p v-if="$route.params.transaction.date"><b>Date</b>: {{$route.params.transaction.date}}</p>
      <p v-if="$route.params.transaction.description"><b>Description</b>: {{$route.params.transaction.description}} </p>
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
    
  },
 
}
