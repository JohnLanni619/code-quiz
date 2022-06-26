let initials = [];
let scores = [];
for (let index = 0; index < localStorage.length; index++) {
  let initial = localStorage.key(index);
  initials.push(initial);

  let score = localStorage.getItem(initial);
  scores.push(score);
}

console.log(initials);
console.log(scores);

const data = {
  labels: initials,
  datasets: [{
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: scores,
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
      indexAxis: 'y',
      scales: {
        x: {
          ticks: {
            color: "white",
            size: 24
          }
        },
        y: {
          ticks: {
            color: "white",
            size: 24
          }
        },
      },
      plugins: {
        legend: {
          display: false
        }
      }
  }
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);