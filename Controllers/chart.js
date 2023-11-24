function showChart() {
  let dataMap = new Map();

  axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a, b) => a.date.localeCompare(b.date));

    res.data.forEach((item) => {
      const datum = item.date.toString().split("T")[0];

      if (!dataMap.has(datum)) {
        dataMap.set(datum, { date: datum, bevetel: 0, kiadas: 0 });
      }

      if (item.type === "bevétel") {
        dataMap.get(datum).bevetel += item.amount;
      } else if (item.type === "kiadás") {
        dataMap.get(datum).kiadas += item.amount;
      }
    });
  });

  setTimeout(() => {
    const ctx = document.getElementById("myChart");

    const chartData = Array.from(dataMap.values());

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.map((data) => data.date),
        datasets: [
          {
            label: "Bevétel",
            data: chartData.map((data) => data.bevetel),
            borderWidth: 1,
            borderColor: "#336c56",
            backgroundColor: "#336c56",
          },
          {
            label: "Kiadás",
            data: chartData.map((data) => -data.kiadas),
            borderWidth: 1,
            borderColor: "#FF0000",
            backgroundColor: "#FF0000",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: false,
          },
        },
      },
    });
  }, 500);
}
