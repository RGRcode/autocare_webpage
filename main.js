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
            text += `<strong>Termin:</strong> ${selectedDate} Czerwca 2026, godz. ${selectedTime}<br><br>`;
            text += `<button id="confirm-booking-btn" style="
                background-color: #d4af37; 
                color: #000; 
                border: none; 
                padding: 12px 30px; 
                font-size: 1rem; 
                font-weight: 700; 
                border-radius: 8px; 
                cursor: pointer; 
                width: 100%; 
                text-transform: uppercase; 
                letter-spacing: 1px;
                transition: all 0.3s ease;">Umów wizytę</button>`;
        } else if (selectedDate) {
            text += `<strong>Termin:</strong> ${selectedDate} Czerwca 2026 (wybierz godzinę)`;
        } else {
            text += `<strong>Termin:</strong> Wybierz dzień z kalendarza`;
        }
        
        statusText.innerHTML = text;

        const confirmBtn = document.getElementById("confirm-booking-btn");
        if (confirmBtn) {
            confirmBtn.addEventListener("click", function() {
                alert(`Pomyślnie zarezerwowano!\n\nUsługa: ${selectedService}\nData: ${selectedDate} Czerwca 2026\nGodzina: ${selectedTime}`);
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
        btn.setAttribute("style", `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: #d4af37;
            color: #000;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            z-index: 2000;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            transition: all 0.3s ease;
        `);

        btn.addEventListener("mouseenter", () => {
            btn.style.backgroundColor = "#fff";
            btn.style.transform = "translateY(-3px)";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.backgroundColor = "#d4af37";
            btn.style.transform = "translateY(0)";
        });

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        document.body.appendChild(btn);

        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                btn.style.display = "flex";
            } else {
                btn.style.display = "none";
            }
        });
    }
    
    updateStatusText();
    generateCalendar();
    createScrollTopButton();
});