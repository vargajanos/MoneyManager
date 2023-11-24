function egyenleg() {
  let dataMap = new Map();

  axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a, b) => a.date.localeCompare(b.date));

    res.data.forEach((item) => {
      const datum = item.date.toString().split("T")[0];

      if (!dataMap.has(datum)) {
        dataMap.set(datum, { date: datum, balance: 0 });
      }

      if (item.type === "bevétel") {
        dataMap.get(datum).balance += item.amount;
      } else if (item.type === "kiadás") {
        dataMap.get(datum).balance -= item.amount;
      }
    });
  });

  setTimeout(() => {
    const ctx = document.getElementById("egyenleg");

    const chartData = Array.from(dataMap.values());



    new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.map((data) => data.date),
        datasets: [
          {
            label: "Egyenleg:",
            data: chartData.map((data) => data.balance),
            borderWidth: 2,
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.2)", 
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }, 500);
}
