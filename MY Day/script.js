// ========================================
// GET HTML ELEMENTS
// ========================================

const activityForm = document.getElementById("activityForm");

const activityInput = document.getElementById("activity");

const timeInput = document.getElementById("time");

const activityList = document.getElementById("activityList");

const progress = document.getElementById("progress");

const progressText = document.getElementById("progressText");

const themeButton = document.getElementById("themeButton");


// ========================================
// DARK MODE
// ========================================

// Check if dark mode was previously selected
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀️";
}


// When the theme button is clicked
themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    // Check current mode
    if (document.body.classList.contains("dark")) {

        themeButton.textContent = "☀️";

        // Save dark mode
        localStorage.setItem("theme", "dark");

    } else {

        themeButton.textContent = "🌙";

        // Save light mode
        localStorage.setItem("theme", "light");
    }

});


// ========================================
// ADD ACTIVITY
// ========================================

activityForm.addEventListener("submit", function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    const activityName = activityInput.value.trim();

    const activityTime = timeInput.value;


    // Make sure both fields have values
    if (activityName === "" || activityTime === "") {
        alert("Please enter an activity and time.");
        return;
    }


    // Format the time
    const formattedTime = formatTime(activityTime);


    // Create activity card
    const activityCard = document.createElement("div");

    activityCard.classList.add("activity-card");


    activityCard.innerHTML = `

        <div class="activity-time">
            ${formattedTime}
        </div>

        <div class="activity-info">

            <h3>${activityName}</h3>

            <p>
                New activity added to your day.
            </p>

        </div>

        <button
            class="complete-button"
            type="button"
            aria-label="Mark activity as complete"
        >
            ✓
        </button>

    `;


    // Add activity to page
    activityList.appendChild(activityCard);


    // Clear inputs
    activityInput.value = "";

    timeInput.value = "";


    // Update progress
    updateProgress();

});


// ========================================
// FORMAT TIME
// ========================================

function formatTime(time) {

    const [hours, minutes] = time.split(":");

    let hour = parseInt(hours);

    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;

    if (hour === 0) {
        hour = 12;
    }

    return `${hour}:${minutes} ${ampm}`;
}


// ========================================
// COMPLETE ACTIVITY
// ========================================

activityList.addEventListener("click", function (event) {

    if (
        event.target.classList.contains("complete-button")
    ) {

        const card =
            event.target.closest(".activity-card");

        card.classList.toggle("completed");

        updateProgress();
    }

});


// ========================================
// UPDATE PROGRESS
// ========================================

function updateProgress() {

    const activities =
        document.querySelectorAll(".activity-card");

    const completed =
        document.querySelectorAll(
            ".activity-card.completed"
        );


    if (activities.length === 0) {

        progress.style.width = "0%";

        progressText.textContent = "0%";

        return;
    }


    const percentage = Math.round(
        (completed.length / activities.length) * 100
    );


    progress.style.width = percentage + "%";

    progressText.textContent =
        percentage + "%";
}