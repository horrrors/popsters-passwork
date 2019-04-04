<template>
<div>
<div class="datepicker">
      <datepicker placeholder="Выберите дату" @input="onInput" :value="date" :language="languages[language]"/>
      
</div>
<div class="graph">
    <graph :propData="date"></graph>
</div>
</div>

</template>


<script>
import Datepicker from 'vuejs-datepicker'
import * as lang from 'vuejs-datepicker/src/locale'
import Graph from './Graph.vue'

export default {
  name: 'mainPage',
  components: {
    Datepicker,
    Graph
  },
 data() {
      return {
        date: '',
        language: 'ru',
        languages: lang
      }
  },
  methods: {
    onInput(obj) {
      console.log(obj)
      this.date = obj
    }
  }
}
</script>

