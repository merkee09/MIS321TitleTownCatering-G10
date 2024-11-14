//W3Schools bar chart
const xValues = ["Pecan Pie", "Birthday Cake", "Mashed Potatoes", "Peach Cobler", "Other"];
const yValues = [10, 4, 9, 14, 7];
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

document.getElementById("myChart").style.backgroundColor = "white";