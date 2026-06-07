document.addEventListener("DOMContentLoaded", function(){
    const daysContainer = document.getElementById("calendar-days");
    const slotsGrid = document.getElementById("slots-grid");
    const statusText = document.getElementById("selected-date-status");

    const availableHours = ["08:00","10:00","12:00","14:00","16:00"];
    const totalDaysInMonth = 30;

    let selectedService = "Nie wybrano (wybierz usługę powyżej)";
    let selectedDate = null;
    let selectedTime = null;

    const serviceButtons = document.querySelectorAll(".services-rectangle article a");
    
    serviceButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault(); 
            
            const serviceName = this.parentElement.querySelector("h3").innerText;
            selectedService = serviceName;
            
            serviceButtons.forEach(btn => {
                btn.innerText = "Wybieram";
                btn.style.backgroundColor = ""; 
            });
            this.innerText = "Wybrano";
            this.style.backgroundColor = "#fff"; 
            
            updateStatusText();
            document.getElementById("booking").scrollIntoView({ behavior: 'smooth' });
        });
    });

    function updateStatusText() {
        let text = `<strong style="color: #d4af37;">Usługa:</strong> ${selectedService}<br>`;
        if (selectedDate && selectedTime) {
            text += `<strong>Termin:</strong> ${selectedDate} ${monthNames[selectedMonth].toLowerCase()} ${selectedYear}, godz. ${selectedTime}<br><br>`;
            text += `<button id="confirm-booking-btn">Umów wizytę</button>`;
        } else if (selectedDate) {
            text += `<strong>Termin:</strong> ${selectedDate} ${monthNames[selectedMonth].toLowerCase()} ${selectedYear} (wybierz godzinę)`;
        } else {
            text += `<strong>Termin:</strong> Wybierz dzień z kalendarza`;
        }
        
        statusText.innerHTML = text;

        const confirmBtn = document.getElementById("confirm-booking-btn");
        if (confirmBtn) {
            confirmBtn.addEventListener("click", function() {
                alert(`Pomyślnie zarezerwowano!\n\nUsługa: ${selectedService}\nData: ${selectedDate} ${monthNames[selectedMonth]} ${selectedYear}\nGodzina: ${selectedTime}`);
            });
        }
    }

    function generateCalendar(){
        daysContainer.innerHTML="";

        for(let i=1; i<=totalDaysInMonth; i++){
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            dayElement.innerText = i;

            dayElement.addEventListener("click", function(){
               document.querySelectorAll(".calendar-day").forEach(day => {
                   day.classList.remove("selected");
                });
                dayElement.classList.add("selected");
                
                selectedDate = i;
                selectedTime = null; 
                
                updateStatusText();
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
            slot.innerText = hour;

            slot.addEventListener("click", function(){
                document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected-time"));
                slot.classList.add("selected-time");
                
                selectedTime = hour;
                updateStatusText();
            });
            slotsGrid.appendChild(slot);
        });
    }

    function createScrollTopButton() {
            const btn = document.createElement("button");
            btn.innerHTML = "&#8593;"; 
            btn.classList.add("scroll-top-btn");

            btn.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
            document.body.appendChild(btn);
            window.addEventListener("scroll", () => {
                if (window.scrollY > 300) {
                    btn.classList.add("show");
                } else {
                    btn.classList.remove("show");
                }
            });
        }
    updateStatusText();
    generateCalendar();
    createScrollTopButton();
});