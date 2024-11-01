//W3Schools bar chart
const xValues = ["Google", "Social Media", "Magazine", "Recommendation ", "Other"];
const yValues = [10, 14, 5, 9, 7];
const barColors = ["red", "green","blue","orange","brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {}
});