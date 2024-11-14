//W3Schools bar chart
const xValues = ["Birthday", "Wedding", "Graduation", "Corporate", "Other"];
const yValues = [20, 24, 12, 35, 5];
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