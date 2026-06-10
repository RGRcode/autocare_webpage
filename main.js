document.addEventListener("DOMContentLoaded", function(){
    const daysContainer = document.getElementById("calendar-days");
    const slotsGrid = document.getElementById("slots-grid");
    const statusText = document.getElementById("selected-date-status");
    
    const monthYearDisplay = document.getElementById("month-year-display");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    const availableHours = ["08:00","10:00","12:00","14:00","16:00"];
    const monthNames = ["STYCZEŃ", "LUTY", "MARZEC", "KWIECIEŃ", "MAJ", "CZERWIEC", "LIPIEC", "SIERPIEŃ", "WRZESIEŃ", "PAŹDZIERNIK", "LISTOPAD", "GRUDZIEŃ"];
    let currentCalendarDate = new Date(2026, 5, 1);

    let selectedService = "Nie wybrano (wybierz usługę powyżej)";
    let selectedDate = null;
    let selectedMonth = null;
    let selectedYear = null;
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
        
        if (selectedDate !== null && selectedMonth !== null && selectedYear !== null && selectedTime) {
            text += `<strong>Termin:</strong> ${selectedDate} ${monthNames[selectedMonth].toLowerCase()} ${selectedYear}, godz. ${selectedTime}<br><br>`;
            text += `<button id="confirm-booking-btn">Umów wizytę</button>`;
        } else if (selectedDate !== null && selectedMonth !== null && selectedYear !== null) {
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

        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();

        if (monthYearDisplay) {
            monthYearDisplay.innerText = `${monthNames[month]} ${year}`;
        }

        const firstDayOfMonth = new Date(year, month, 1);
        let startDayOfWeek = firstDayOfMonth.getDay();
        startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < startDayOfWeek; i++) {
            const emptyElement = document.createElement("div");
            emptyElement.classList.add("calendar-day", "empty");
            daysContainer.appendChild(emptyElement);
        }

        for(let i=1; i<=daysInMonth; i++){
            const dayElement = document.createElement("div");
            dayElement.classList.add("calendar-day");
            dayElement.innerText = i;

            if (selectedDate === i && selectedMonth === month && selectedYear === year) {
                dayElement.classList.add("selected");
            }

            dayElement.addEventListener("click", function(){
               document.querySelectorAll(".calendar-day").forEach(day => {
                   day.classList.remove("selected");
                });
                dayElement.classList.add("selected");
                
                selectedDate = i;
                selectedMonth = month;
                selectedYear = year;
                selectedTime = null; 
                
                updateStatusText();
                showTimeSlots(i);
            });
            daysContainer.appendChild(dayElement);
        }
    }

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener("click", function() {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            generateCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener("click", function() {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            generateCalendar();
        });
    }

    function showTimeSlots(dayNumber){
        slotsGrid.innerHTML = "";
        
        availableHours.forEach(hour =>{
            const slot = document.createElement("div");
            slot.classList.add("time-slot");
            slot.innerText = hour;

            if (selectedTime === hour) {
                slot.classList.add("selected-time");
            }

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