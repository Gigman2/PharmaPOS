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
      ],
      data() {
        return {
          datacollection: null
        };
      },
      mounted() {
        this.fillData();
      },
      methods: {
        fillData() {
            var gradient = this.$children[0].$refs.canvas
            this.datacollection = {
              labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
              ],
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

