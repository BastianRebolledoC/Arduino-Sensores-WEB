// const url = "https://brebolledo.indecsur.cl/api/";
const url = "https://api.jsonbin.io/b/619d3eda0ddbee6f8b10e2d3";
const fullData = {
  ldr: [],
  temperatura: [],
  humedad: [],
};
const myChart = new Chart(document.getElementById("chartLdr"), {
  type: "line",
  data: {
    datasets: [
      {
        label: "Valores promedio por dia LDR",
        backgroundColor: ["#8338ec"],
        borderColor: ["#8338ec"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          afterTitle: (context) => {
            const { dataIndex } = context[0];
            return `Valores totales captados en el dia ${fullData["ldr"][dataIndex]}`;
          },
        },
      },
    },
  },
});
const myChartTemperatura = new Chart(
  document.getElementById("chartTemperatura"),
  {
    type: "line",
    data: {
      datasets: [
        {
          label: "Valores promedio por dia Temperatura",
          backgroundColor: ["#06d6a0"],
          borderColor: ["#06d6a0"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            afterTitle: (context) => {
              const { dataIndex } = context[0];
              return `Valores totales captados en el dia ${fullData["temperatura"][dataIndex]}`;
            },
          },
        },
      },
    },
  }
);
const myChartHumedad = new Chart(document.getElementById("chartHumedad"), {
  type: "line",
  data: {
    datasets: [
      {
        label: "Valores promedio por dia Humedad",
        backgroundColor: ["#00b4d8"],
        borderColor: ["#00b4d8"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          afterTitle: (context) => {
            const { dataIndex } = context[0];
            return `Valores totales captados en el dia ${fullData["humedad"][dataIndex]}`;
          },
        },
      },
    },
  },
});

const promedio = (sensor, valores) => {
  const valoresArray = [];
  valores.forEach((x) => {
    valoresArray.push(parseInt(x[sensor]));
  });
  fullData[sensor].push(valoresArray);
  const sum = valoresArray.reduce((a, b) => a + b, 0);
  const avg = sum / valoresArray.length || 0;
  return avg;
};
const mostrarLdr = (data) => {
  data.forEach((objeto) => {
    const { dia, hora_y_valores } = objeto;

    //agregar los dias a los labels
    myChart.data["labels"].push(dia.trim());

    //mostrar en la grafica el promedio del dia
    myChart.data["datasets"][0].data.push(promedio("ldr", hora_y_valores));
    myChart.update();
    // console.log(valores);
  });
};

const mostrarTemperatura = (data) => {
  data.forEach((objeto) => {
    const { dia, hora_y_valores } = objeto;

    //agregar los dias a los labels
    myChartTemperatura.data["labels"].push(dia.trim());

    //mostrar en la grafica el promedio del dia
    myChartTemperatura.data["datasets"][0].data.push(
      promedio("temperatura", hora_y_valores)
    );
    myChartTemperatura.update();
    // console.log(valores);
  });
};

const mostrarHumedad = (data) => {
  data.forEach((objeto) => {
    const { dia, hora_y_valores } = objeto;

    //agregar los dias a los labels
    myChartHumedad.data["labels"].push(dia.trim());

    //mostrar en la grafica el promedio del dia
    myChartHumedad.data["datasets"][0].data.push(
      promedio("humedad", hora_y_valores)
    );
    myChartHumedad.update();
    // console.log(valores);
  });
};

//hacer una funcion async await
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    mostrarLdr(data);
    mostrarTemperatura(data);
    mostrarHumedad(data);
  })
  .catch((error) => console.log(error));
