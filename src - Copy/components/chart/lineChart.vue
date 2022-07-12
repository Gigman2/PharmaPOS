 <template>
    <chart :chart-data="datacollection" :height="280"></chart>
</template>

<script>
    import Chart from "./line.js";
    export default {
      components: {
        Chart
      },
      props: [
        'dataset',
        'label'
      ],
      data() {
        return {
          datacollection: null
        };
      },
      computed: {
        chartData: function() {
          return this.data;
        }
      },
      mounted() {
        this.fillData();
      },
      watch(){
         this.fillData();
      },
      methods: {
        fillData() {
            var gradient = this.$children[0].$refs.canvas
            this.datacollection = {
              labels: this.label,
              datasets: [
              this.dataset
            ]
          };
        },
      }
    };
</script>
<style>
</style>

