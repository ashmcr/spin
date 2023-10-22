/* Include the Tally widget script */ const formId = "wQREq1";
/* --------------- Spin Wheel --------------------- */ const spinWheel =
  document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value --------------------- */ const spinValues =
  [
    { minDegree: 61, maxDegree: 90, value: "Marcs Bussy" },
    { minDegree: 31, maxDegree: 60, value: "Marcs Bussy" },
    { minDegree: 0, maxDegree: 30, value: "Marcs Bussy" },
    { minDegree: 331, maxDegree: 360, value: "Marcs Bussy" },
    { minDegree: 301, maxDegree: 330, value: "Marcs Bussy" },
    { minDegree: 271, maxDegree: 300, value: "Marcs Bussy" },
    { minDegree: 241, maxDegree: 270, value: "Marcs Bussy" },
    { minDegree: 211, maxDegree: 240, value: "Marcs Bussy" },
    { minDegree: 181, maxDegree: 210, value: "Marcs Bussy" },
    { minDegree: 151, maxDegree: 180, value: "Marcs Bussy" },
    { minDegree: 121, maxDegree: 150, value: "Marcs Bussy" },
    { minDegree: 91, maxDegree: 120, value: "Marcs Bussy" },
  ];
/* --------------- Size Of Each Piece --------------------- */ const size = [
  29, 28, 24, 26, 32, 25, 33, 23, 32, 31, 26, 51,
];
/* --------------- Background Colors --------------------- */ var spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#138D75",
  "#F1C40F",
  "#b163da",
  "#E74C3C",
  "#7D3C98",
  "#138D75",
];
/* --------------- Chart --------------------- */ /* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */ let prizeValue =
  "";
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [{ backgroundColor: spinColors, data: size }],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */ const generateValue =
  (angleValue) => {
    for (let i of spinValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        prizeValue = i.value;
        text.innerHTML = `
Congratulations, You Have Won ${i.value} !

`;
        setTimeout(() => {
          Tally.openPopup(formId, {
            layout: "modal",
            width: 400,
            hiddenFields: { prize: i.value },
          });
        }, 1000);
        spinBtn.disabled = false;
        break;
      }
    }
  };
/* --------------- Spinning Code --------------------- */ let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `
Good Luck!

`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      setTimeout(() => {
        Tally.openPopup(formId, {
          layout: "modal",
          width: 400,
          hiddenFields: { prize: i.value },
        });
      }, 1000);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
}); /* --------------- End Spin Wheel --------------------- */
