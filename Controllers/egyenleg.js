function egyenleg(){

let fields =[];
let datas = [];

axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a,b) => a.date.localeCompare(b.date));
    res.data.forEach((item) => {
        let seged = item.amount;

        if (fields.includes(item.date.toString().split('T')[0])) 
        {
            if (item.type ==0 ) 
            {
             datas[datas.length-1] -= seged;    
            }
            else
            {
                datas[datas.length-1] += seged;  
            }    
        }
        else
        {
            fields.push(item.date.toString().split("T")[0]);
            if (item.type == 0) 
            {
                seged = seged * -1;
            }
            datas.push(seged);
        }


    });
  });

  setTimeout(() => {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Bevétel",
            data: bevetel,
            borderWidth: 3,
            borderColor: '#89DB57',
            backgroundColor: '#89DB57'
          },{
            label: "Kiadás",
            data: kiadas,
            borderWidth: 3,
            borderColor: '#F6795E',
            backgroundColor: '#F6795E'


          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          x:{
            stacked:true
          },
          y: {
            stacked: false,
          },
        },
      },
    });
  }, 500);



}