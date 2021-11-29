import './sass/main.scss';
import axios from "axios";

// =========BACK-TOP-BUTTON=============

const backTopBtn = document.getElementById('back-top');
const refs = {
  anchor: document.querySelector('.anchor'),
};

function handleButtonClick(event) {
  event.preventDefault();
  refs.anchor.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

backTopBtn.addEventListener('click', handleButtonClick);


// =========CHART-NAVIGATION-BUTTONS================

const chartNavBtns = document.getElementById('chart-navigation-buttons');
const chartBtn = document.getElementById('chart-btn');
const pieChartBtn = document.getElementById('pie-chart-btn');

function selectTabClick(event) {

  const chart1 = document.getElementById('chart');
  const chart2 = document.getElementById('pie-chart');

  if (event.target.id === 'pie-chart-btn') {
    chartBtn.classList.remove('isActive');
    pieChartBtn.classList.add('isActive');
    chart2.classList.remove('chartNotActive');
    chart1.classList.add('chartNotActive');
    }
  if (event.target.id === 'chart-btn') {
    pieChartBtn.classList.remove('isActive');
    chartBtn.classList.add('isActive');
    chart2.classList.add('chartNotActive');
    chart1.classList.remove('chartNotActive');
  }
}

chartNavBtns.addEventListener('click', selectTabClick);

// =========CHART-DEFAULT-RENDER==============
jQuery(function () {
  const defaultGraphDataPoints = [
    { label: 'Jan', y: 20 },
    { label: 'Feb', y: 40 },
    { label: 'Mar', y: 60 },
    { label: 'Apr', y: 80 },
    { label: 'May', y: 90 },
    { label: 'Jun', y: 100 },
    { label: 'Jul', y: 80 },
    { label: 'Aug', y: 60 },
    { label: 'Sep', y: 70 },
    { label: 'Oct', y: 50 },
    { label: 'Nov', y: 30 },
    { label: 'Dec', y: 10 },
  ];
  const defaultPieDataPoints = [
    { label: 'Data1', y: 50, color: '#186AA5' },
    { label: 'Data2', y: 35, color: '#98E3FE' },
    { label: 'Data3', y: 15, color: '#0FA8E2' },
  ];

  // =========RANDOMIZE-BUTTON===========

  const randomizeBtn = document.getElementById('randomize-btn');

  function randomNumbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randomizeData() {
    const dataArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 12];
    let randomArray = [];
    dataArray.map(item => {
      randomArray.push(randomNumbers(item, 120 - item));
    });
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let randomDataPoints = [];
    for (let i = 0; i < randomArray.length; i++) {
      randomDataPoints.push({ label: months[i], y: randomArray[i] });
    }
    createChart(randomDataPoints).render();
  }
  randomizeBtn.addEventListener('click', randomizeData);

  // =========GET-DATA-FROM-SERVER-BUTTON================

  const getServerDataBtn = document.getElementById('getServerData-btn');

  const fetchDataForChart = async () => {
    try {
      const data = await axios.post('https://api.demoleap.com/exercise');

      if (data.data.bars) {
        let serverChartDataPoints = [];
        Object.entries(data.data.bars).map(item =>
          serverChartDataPoints.push({ label: item[0], y: item[1] }),
        );
        createChart(serverChartDataPoints).render();
      } else createChart(defaultGraphDataPoints).render();

      if (data.data.pie) {
        let serverPieDataPoints = [];
        Object.entries(data.data.bars).map(item =>
          serverPieDataPoints.push({ label: item[0], y: item[1] }),
        );
        createPieChart(serverPieDataPoints).render();
      } else createPieChart(defaultPieDataPoints).render();
    } catch (error) {
      console.log(error.message);
    }
  };

  getServerDataBtn.addEventListener('click', fetchDataForChart);

  // =========GRAPH-CHART================
  let graphChart = createChart(defaultGraphDataPoints);
  graphChart.render();

  function createChart(dataPoints) {
    const optionsChart = {
      animationEnabled: true,
      title: {
        text: '',
      },
      dataPointMaxWidth: 26,
      cornerRadius: 4,
      data: [
        {
          type: 'column',
          showInLegend: false,
          color: '#186AA5',
          dataPoints: dataPoints,
        },
      ],
    };

    let graphChart = new CanvasJS.Chart('chartContainer1', optionsChart);
    return graphChart;
  }

  // =========PIE-CHART================

  let pieChart = createPieChart(defaultPieDataPoints);
  pieChart.render();

  function createPieChart() {
    const optionsPieChart = {
      animationEnabled: true,
      title: {
        text: '',
      },
      data: [
        {
          type: 'pie',
          startAngle: 90,
          showInLegend: false,
          dataPoints: [
            { label: 'Data1', y: 50, color: '#186AA5' },
            { label: 'Data2', y: 35, color: '#98E3FE' },
            { label: 'Data3', y: 15, color: '#0FA8E2' },
          ],
        },
      ],
    };

    let pieChart = new CanvasJS.Chart('chartContainer2', optionsPieChart);
    return pieChart;
  }

});



