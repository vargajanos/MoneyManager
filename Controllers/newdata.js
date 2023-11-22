function setMaxDate(){
    let date = document.querySelector('#date');
    date.max =  new Date().toISOString().split("T")[0];
}

function getToday(){
    setTimeout(()=>{setMaxDate()}, 500);
}

function addSteps(){

    let date = document.querySelector('#date');
    let type = document.querySelector('#type');
    let osszeg = document.querySelector('#osszeg');
    let tag = document.querySelector('#tag');

    if (date.value == "" || type.value == "" || osszeg==0|| tag =="" ){
        showMessage("Nem adtál meg minden adatot!");
    }
    else{
        axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
            let vane = false;
            let upID = -1;
            res.data.forEach(item => {
                if (item.date.split('T')[0] == date.value){
                    vane = true;
                    upID = item.ID;
                    return;
                }
            });
            if(vane){
                let data = {
                    type : type.value,
                    amount : osszeg.value,
                    tag : tag.value	
                }
                axios.patch(`${serverURL}/items/ID/eq/${upID}`, data).then((res)=>{
                    alert('Az összeg módosítva!');
                    date.value = null;
                    type.value = null;
                    amount.value =0;
                    tag.value = null;
                });
            }
            else{
                let data = {
                    userID : loggedUser.ID,	
                    date : date.value,	
                    type : type.value,
                    amount : osszeg.value,
                    tag : tag.value	
                }

                axios.post(`${serverURL}/items`, data).then((res)=>{
                    alert('Az összeg rögzítve!');
                    date.value = null;
                    date.value = null;
                    type.value = null;
                    amount.value =0;
                    tag.value = null;
                });
            }
        })
    }
}

getToday();
