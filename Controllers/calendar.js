
function showCalendar(){
    let myEvents = [];
    axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
        res.data.forEach(item => {

            if (item.type=="kiadás") {
                myEvents.push({
                    title: item.tag +": "+ -item.amount,
                    start: item.date,
                    allDay: true,
                    backgroundColor: '#FF0000',
                    borderColor: '#FF0000',
                })
            }
            else{
                myEvents.push({
                    title: item.tag +": "+ item.amount,
                    start: item.date,
                    allDay: true,
                    backgroundColor: '#336c56',
                    borderColor: '#336c56',
                })
            }
           
        });
    });

   
    setTimeout(()=>{

        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
        },
        initialDate: new Date(),
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        dayMaxEvents: true, // allow "more" link when too many events
        events: myEvents
        });
        
        calendar.render();
    }, 100);
}
