const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// Render the calendar UI
const renderCalendar = () => {
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // First day of the month
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // Last date of the month
    const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // Last day of the month
    const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate(); // Last date of the previous month

    let liTag = "";

    // Creating list items for the previous month's days
    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfPrevMonth - i + 1}</li>`;
    }

    // Creating list items for the current month's days
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                        && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    // Creating list items for the next month's first days
    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    // Update the current date in the header
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

// Update the month and year when prev/next icons are clicked
const updateMonth = (direction) => {
    currMonth += direction;

    if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth, new Date().getDate()); // Create new date object
        currYear = date.getFullYear();
        currMonth = date.getMonth();
    } else {
        date = new Date(); // Reset to current date
    }

    renderCalendar(); // Re-render the calendar
};

// Event listener for the previous and next icons
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        const direction = icon.id === "prev" ? -1 : 1;
        updateMonth(direction);
    });
});

// Initial render
renderCalendar();
