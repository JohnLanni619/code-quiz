var resetButton = document.querySelector("#clear-storage");
var highScoreEl = document.querySelector("#score-container")


function clearStorage() {
    localStorage.clear();
    window.location.reload();
}

resetButton.addEventListener("click", clearStorage)

let initials = [];
let scores = [];

for (let index = 0; index < localStorage.length; index++) {
    let initial = localStorage.key(index);
    initials.push(initial);

    let score = localStorage.getItem(initial);
    scores.push(score);
}

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

function getWidth() {
    if (window.innerWidth > 1600) {
        let width = .65
        return width;
    } else if (window.innerWidth < 768) {
        let width = .85
        return width;
    } else {
        let width = .75
        return width;
    }
}

function setChartWidth() {
    const chart = document.querySelector('#chart-container');
    chart.style.width = (window.innerWidth * getWidth()) + "px"
}

window.addEventListener("resize", setChartWidth)
