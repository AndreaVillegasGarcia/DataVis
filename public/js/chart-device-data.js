$(document).ready(() => {

  //--------- CONEXION BACKEND------

  //-----------------------------------

  const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
  const webSocket = new WebSocket(protocol + location.host);
  
  var maxLen = 50;
  var count = 0;
  
  function addData(concept, value) {
    if(concept == "5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
      //Pulse
      chartData.datasets[0].data.push(value)
      chartData.datasets[1].data.push(100)
      chartData.datasets[2].data.push(60)
      chartData.labels.push(new Date().toLocaleTimeString())
    } else if (concept == "5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
      //Temperature
      chartData2.datasets[0].data.push(value)
      chartData2.datasets[1].data.push(37.3)
      chartData2.datasets[2].data.push(35.5)
      chartData2.labels.push(new Date().toLocaleTimeString())
    } else if (concept == "5092AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
      //SpO2
      chartData3.datasets[0].data.push(value)
      chartData3.datasets[1].data.push(100)
      chartData3.datasets[2].data.push(95)
      chartData3.labels.push(new Date().toLocaleTimeString())
    } else if (concept == "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
      //Systolic Blood Pressure
      chartData4.datasets[0].data.push(value)
      chartData4.datasets[1].data.push(120)
      chartData4.datasets[2].data.push(90)
      chartData4.labels.push(new Date().toLocaleTimeString())
    } else if (concept == "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
      //Diastolic Blood Pressure
      chartData5.datasets[0].data.push(value)
      chartData5.datasets[1].data.push(80)
      chartData5.datasets[2].data.push(60)
      chartData5.labels.push(new Date().toLocaleTimeString())
    } else if (concept == "5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"){
      //Respiratory Frequency
      chartData6.datasets[0].data.push(value)
      chartData6.datasets[1].data.push(12)
      chartData6.datasets[2].data.push(18)
      chartData6.labels.push(new Date().toLocaleTimeString())
    } else{
      //Not Found
    }
 
    if (chartData.datasets[0].data.length > maxLen ||
        chartData2.datasets[0].data.length > maxLen ||
        chartData3.datasets[0].data.length > maxLen ||
        chartData4.datasets[0].data.length > maxLen ||
        chartData5.datasets[0].data.length > maxLen ||
        chartData6.datasets[0].data.length > maxLen) {
      chartData.datasets[0].data.shift();
      chartData2.datasets[0].data.shift();
      chartData3.datasets[0].data.shift();
      chartData4.datasets[0].data.shift();
      chartData5.datasets[0].data.shift();
      chartData6.datasets[0].data.shift();
      //chartData2.datasets[device].data.shift();
    }
  }

  function format(message){
    //console.log(message.IotData.concept)
    let concept = message.IotData.concept;
    let value = message.IotData.value;

    addData(concept, value)
    myLineChart.update();
    myLineChart2.update();
    myLineChart3.update();
    myLineChart4.update();
    myLineChart5.update();
    myLineChart6.update();
  }

  // -------------------- CHART 1 ----------------------
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        fill: true,
        label: 'Patient Pulse',
        yAxisID: 'Pulse',
        borderColor: '#2A416D',
        pointBoarderColor: '#2A416D',
        backgroundColor: 'rgba(89, 176, 248, 0.4)',
        pointHoverBackgroundColor: '#2A416D',
        pointHoverBorderColor: '#2A416D',
        spanGaps: false,
      },
      {
        fill: false,
        label: 'Max',
        data: [],
        yAxisID: 'Pulse',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        spanGaps: false,
      },
      {
        fill: false,
        label: 'Min',
        data: [],
        yAxisID: 'Pulse',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        spanGaps: false,
      }
    ]
  };

  const chartOptions = {
    scales: {
      xAxes: [{}],
      yAxes: [{
        id: 'Pulse',
        type: 'linear',
        scaleLabel: {
          labelString: 'Pulse (bpm)',
          display: true,
        },
        position: 'left',
      }]
    }
  };

  const ctx = document.getElementById('iotChart').getContext('2d');
  const myLineChart = new Chart(
    ctx,
    {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });

  // -------------------- CHART 2 ----------------------
  const chartData2 = {
    labels: [],
    datasets: [
      {
        data: [],
        fill: true,
        label: 'Patient Temperature',
        yAxisID: 'Temperature',
        borderColor: '#2A416D',
        pointBoarderColor: '#2A416D',
        backgroundColor: 'rgba(89, 176, 248, 0.4)',
        pointHoverBackgroundColor: '#2A416D',
        pointHoverBorderColor: '#2A416D',
        spanGaps: false,
      },
      {
        fill: false,
        label: 'Max',
        data: [],
        yAxisID: 'Temperature',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        spanGaps: false,
      },
      {
        fill: false,
        label: 'Min',
        data: [],
        yAxisID: 'Temperature',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        spanGaps: false,
      }
    ]
  };

  const chartOptions2 = {
    scales: {
      xAxes: [{}],
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temperature (ºC)',
          display: true,
        },
        position: 'left',
      }]
    }
  };

  const ctx2 = document.getElementById('iotChart2').getContext('2d');
  const myLineChart2 = new Chart(
    ctx2,
    {
      type: 'line',
      data: chartData2,
      options: chartOptions2,
    });

  // -------------------- CHART 3 -----------------------------------
const chartData3 = {
  labels: [],
  datasets: [
    {
      data: [],
      fill: true,
      label: 'Patient SpO2',
      yAxisID: 'SpO2',
      borderColor: '#2A416D',
      pointBoarderColor: '#2A416D',
      backgroundColor: 'rgba(89, 176, 248, 0.4)',
      pointHoverBackgroundColor: '#2A416D',
      pointHoverBorderColor: '#2A416D',
      spanGaps: false,
    },
    {
      fill: false,
      label: 'Max',
      data: [],
      yAxisID: 'SpO2',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      spanGaps: false,
    },
    {
      fill: false,
      label: 'Min',
      data: [],
      yAxisID: 'SpO2',
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      spanGaps: false,
    }
  ]
};

const chartOptions3 = {
  scales: {
    xAxes: [{}],
    yAxes: [{
      id: 'SpO2',
      type: 'linear',
      scaleLabel: {
        labelString: 'SpO2 (%)',
        display: true,
      },
      position: 'left',
    }]
  }
};

const ctx3 = document.getElementById('iotChart3').getContext('2d');
const myLineChart3 = new Chart(
  ctx3,
  {
    type: 'line',
    data: chartData3,
    options: chartOptions3,
  });

  // -------------------- CHART 4 -----------------------------------
const chartData4 = {
  labels: [],
  datasets: [
    {
      data: [],
      fill: true,
      label: 'Patient Systolic BP',
      yAxisID: 'SBP',
      borderColor: '#2A416D',
      pointBoarderColor: '#2A416D',
      backgroundColor: 'rgba(89, 176, 248, 0.4)',
      pointHoverBackgroundColor: '#2A416D',
      pointHoverBorderColor: '#2A416D',
      spanGaps: false,
    },
    {
      fill: false,
      label: 'Max',
      data: [],
      yAxisID: 'SBP',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      spanGaps: false,
    },
    {
      fill: false,
      label: 'Min',
      data: [],
      yAxisID: 'SBP',
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      spanGaps: false,
    }
  ]
};

const chartOptions4 = {
  scales: {
    xAxes: [{}],
    yAxes: [{
      id: 'SBP',
      type: 'linear',
      scaleLabel: {
        labelString: 'SBP',
        display: true,
      },
      position: 'left',
    }]
  }
};

const ctx4 = document.getElementById('iotChart4').getContext('2d');
const myLineChart4 = new Chart(
  ctx4,
  {
    type: 'line',
    data: chartData4,
    options: chartOptions4,
  });

  // -------------------- CHART 5 -----------------------------------
const chartData5 = {
  labels: [],
  datasets: [
    {
      data: [],
      fill: true,
      label: 'Patient Diastolic BP',
      yAxisID: 'DBP',
      borderColor: '#2A416D',
      pointBoarderColor: '#2A416D',
      backgroundColor: 'rgba(89, 176, 248, 0.4)',
      pointHoverBackgroundColor: '#2A416D',
      pointHoverBorderColor: '#2A416D',
      spanGaps: false,
    },
    {
      fill: false,
      label: 'Max',
      data: [],
      yAxisID: 'DBP',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      spanGaps: false,
    },
    {
      fill: false,
      label: 'Min',
      data: [],
      yAxisID: 'DBP',
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      spanGaps: false,
    }
  ]
};

const chartOptions5 = {
  scales: {
    xAxes: [{}],
    yAxes: [{
      id: 'DBP',
      type: 'linear',
      scaleLabel: {
        labelString: 'DBP',
        display: true,
      },
      position: 'left',
    }]
  }
};

const ctx5 = document.getElementById('iotChart5').getContext('2d');
const myLineChart5 = new Chart(
  ctx5,
  {
    type: 'line',
    data: chartData5,
    options: chartOptions5,
  });

    // -------------------- CHART 6 -----------------------------------
const chartData6 = {
  labels: [],
  datasets: [
    {
      data: [],
      fill: true,
      label: 'Patient Respiratory Frec.',
      yAxisID: 'Resp',
      borderColor: '#2A416D',
      pointBoarderColor: '#2A416D',
      backgroundColor: 'rgba(89, 176, 248, 0.4)',
      pointHoverBackgroundColor: '#2A416D',
      pointHoverBorderColor: '#2A416D',
      spanGaps: true,
    },
    {
      fill: false,
      label: 'Max',
      data: [],
      yAxisID: 'Resp',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      spanGaps: false,
    },
    {
      fill: false,
      label: 'Min',
      data: [],
      yAxisID: 'Resp',
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      spanGaps: false,
    }
  ]
};

const chartOptions6 = {
  scales: {
    xAxes: [{}],
    yAxes: [{
      id: 'Resp',
      type: 'linear',
      scaleLabel: {
        labelString: 'Respiratory Frec.',
        display: true,
      },
      position: 'left',
    }]
  }
};

const ctx6 = document.getElementById('iotChart6').getContext('2d');
const myLineChart6 = new Chart(
  ctx6,
  {
    type: 'line',
    data: chartData6,
    options: chartOptions6,
  });



  webSocket.onmessage = function onMessage(message) {
    try {
      const messageData = JSON.parse(message.data);
      console.log(messageData);
      format(messageData);

      //if(count == 0 || count == 1){
        //chartData.labels.push(new Date().getTime("HH:mm:ss"));
       // count ++;
      //} else if (count == 2) {
        //chartData.labels.push(new Date().toLocaleTimeString())
        //chartData2.labels.push(new Date().toLocaleTimeString())
       // count = 0;
      //}
    } catch (err) {
      console.error(err);
    }
  };
});