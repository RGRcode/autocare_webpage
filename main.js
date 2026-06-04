document.addEventListener("DOMContentLoaded",function(){
    const daysContainer = document.getElementById("calendar-days");
    const slotsGrid = document.getElementById("slots-grid");
    const statusText = document.getElementById("selected-date-status");

    const availableHours = ["08:00","10:00","12:00","14:00","16:00"];
    const totalDaysInMonth = 30;

    function generateCalendar(){
        daysContainer.innerHTML="";

        for(let i=1; i<=totalDaysInMonth; i++){
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            dayElement.innerText = i;

            dayElement.addEventListener("click",function(){
               document.querySelectorAll(".calendar-day").forEach(day => {
                day.classList.remove("selected");
                });
                dayElement.classList.add("selected");
                statusText.innerText= `Wybrany termin: ${i} Czerwca 2026`;
                showTimeSlots(i);
            });
            daysContainer.appendChild(dayElement);
        }
    }

    function showTimeSlots(dayNumber){
        slotsGrid.innerHTML = "";
        
        availableHours.forEach(hour =>{
            const slot = document.createElement("div");
            slot.classList.add("time-slot");
            slot.innerText=hour;

            slot.addEventListener("click",function(){
                document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected-time"));
                slot.classList.add("selected-time");
                statusText.innerText=`Wybrany termin: ${dayNumber} Czerwca 2026 o godzinie ${hour}`;
            });
            slotsGrid.appendChild(slot);
        });
    }
    generateCalendar();
});