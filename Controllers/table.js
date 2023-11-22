function Tablazat(){
    let tbody = document.querySelector('tbody');
    let sumOsszeg = document.querySelector('#sumOsszeg');

    axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
        let i = 0;
        let sum = 0;
        res.data.sort((a,b) => a.date.localeCompare(b.date));
        res.data.forEach(item => {

            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');

            i++;

            td1.innerHTML = i + '.';

            td2.innerHTML = item.date.split('T')[0];

            td3.innerHTML = item.type;

            td4.innerHTML = item.tag;

            if(item.type=="kiadás")
            {
                td5.innerHTML = -item.amount;
                sum += -item.amount;
            }
            else{
                td5.innerHTML = item.amount;
                sum += item.amount;
            }    
            td5.classList.add("text-end");

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tbody.appendChild(tr);
        });

        sumOsszeg.innerHTML = sum;
    })
}

function renderData(){
    setTimeout(()=>{Tablazat();}, 200);
}