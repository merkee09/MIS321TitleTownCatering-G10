
let timeFrame = "Last Week";
let chartInstance = null; 
let startDate = new Date();  
let endDate = null;

async function handleOnLoad() {
  // displayTimeSelection();
  // await getTopFiveDishes()
  displayChart();
}



// function displayTimeSelection() {
//   const html = `
//     <label for="timeFrame">Select Time Frame:</label>
//     <select id="timeFrame" onchange="updateTimeFrame()">
//         <option value="Last Week">Last Week</option>
//         <option value="Last Month">Last Month</option>
//         <option value="Last Six Months">Last Six Months</option>
//         <option value="Last Year">Last Year</option>
//         <option value="All">All</option>
//     </select>
//   `;
//   document.getElementById("timeselection").innerHTML = html;
// }

async function displayChart() {
  // await getTopFiveDishes();

  // if (!topFiveDishes || topFiveDishes.length === 0) {
  //   console.warn("No dishes available to display.");
  //   return;
  // }

  const xValues = ["Sweet Tea", "Waffles", "Tacos", "Pecan Pie", "Mozzarella Sticks"]
  const yValues = [50, 20, 10, 7, 6]
  const barColors = ["red", "green", "blue", "orange", "brown"].slice(0, xValues.length);

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues,
      }],
    },
    options: {
      title: {
        display: true,
        text: `Top Dishes (${timeFrame || "No Timeframe Selected"})`,
      },
    },
  });
}

function updateTimeFrame() {
  timeFrame = document.getElementById("timeFrame").value;
  calculateEndDate(); 
  displayChart();
}

function calculateEndDate() {
  endDate = new Date(startDate);  
  switch (timeFrame) {
    case "Last Week":
      endDate.setDate(endDate.getDate() - 7);
      break;
    case "Last Month":
      endDate.setMonth(endDate.getMonth() - 1);
      break;
    case "Last Six Months":
      endDate.setMonth(endDate.getMonth() - 6);
      break;
    case "Last Year":
      endDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case "All":
      endDate = null;
      break;
    default:
      console.warn("Invalid timeframe selected");
      endDate = null;
      break;
  }
}

async function getTopFiveDishes() {
  console.log(timeFrame);

  const endDateString = endDate ? endDate.toISOString().split("T")[0] : null;
  const startDateString = startDate.toISOString().split("T")[0];

  try {
    let apiUrl = `http://localhost:5000/api/dish/top?startDate=${startDateString}&endDate=${endDateString}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching dishes: ${response.statusText}`);
    }

    topFiveDishes = await response.json();
    displayChart();

  } catch (error) {
    console.error("Error in getTopFiveDishes:", error);
  }
}

window.onload = handleOnLoad;