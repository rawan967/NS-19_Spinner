const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const winnerScreen = document.getElementById("winnerScreen");
const winnerName = document.getElementById("winnerName");
const spinAgainBtn = document.getElementById("spinAgainBtn");
const confetti = document.getElementById("confetti");

let currentRotation = 0;
let isSpinning = false;


const names = [

    "Rawan Tarek",
    "Ahmed Mohamed",
    "Mariam Alaa",
    "Omar Ali",
    "Youssef Mohamed",
    "Nour Saleh",
    "Ali Hassan Mohamed",
    "Menna Ahmed Mohamed"
];

const colors = [
    "#a10b0b",
    "#142d6b",
    "#c08b2c",
    "#2458a6",
    "#7c1f1f",
    "#173d70"
];

function createWheel() {
    wheel.innerHTML = "";

    const sectionAngle = 360 / names.length;


    names.forEach((name, index) => {
        const nameElement = document.createElement("div");
        nameElement.classList.add("name");


        // Split name into words
        // TO Apear like 
        // rawan 
        // tarek 

        const words = name.split(" ");
        words.forEach(word => {
            const wordElement = document.createElement("span");
            wordElement.textContent = word;
            nameElement.appendChild(
                wordElement
            );

        });

        const angle = index * sectionAngle + sectionAngle / 2;
        nameElement.style.transform =`rotate(${angle}deg)`;
        wheel.appendChild(
            nameElement
        );

    });

    // =========================
    // COLORS
    // =========================

    const gradient = [];

    names.forEach((_, index) => {

        const start = index * sectionAngle;
        const end =(index + 1) * sectionAngle;
        gradient.push(
            `${colors[index % colors.length]}
             ${start}deg
             ${end}deg`
        );

    });

    wheel.style.background =
        `conic-gradient(${gradient.join(",")})`;
}


// Call fun
createWheel();


// =========================
// SPIN WHEEL
// =========================

function spinWheel() {

    // Don't allow another spin
    // while spinning

    if (isSpinning) {
        return;
    }

    isSpinning = true;
    spinBtn.disabled = true;
    const sectionAngle =  360 / names.length;

    const randomAngle = Math.random() * 360;
    const extraSpins =  5 * 360;

    currentRotation += extraSpins + randomAngle;
    wheel.style.transform =`rotate(${currentRotation}deg)`;


    // =========================
    // WAIT FOR ANIMATION
    // =========================

    setTimeout(() => {


        // =========================
        // FINAL ANGLE
        // =========================

        const finalAngle = currentRotation % 360;


        // =========================
        // POINTER ANGLE
        // =========================

        const pointerAngle = (360 - finalAngle) % 360;
        const selectedIndex = Math.floor(pointerAngle / sectionAngle );


        // =========================
        // SELECTED NAME
        // =========================

        const selectedName = names[selectedIndex];
        showWinner(selectedName);


        isSpinning = false;
        spinBtn.disabled = false;

    }, 5000);
}

spinBtn.addEventListener("click", spinWheel);


// =========================
// SHOW WINNER
// =========================

function showWinner(name) {
    // Put selected name
    // inside winner screen

    winnerName.textContent = name;
    winnerScreen.classList.add("show");

    // Create confetti
    createConfetti();
}


function createConfetti() {

    // Remove old confetti

    confetti.innerHTML = "";


    // Number of pieces

    for (let i = 0; i < 250; i++) {


        // Create piece
        const piece = document.createElement("div" );

        piece.classList.add( "confetti-piece");

        // Random horizontal position
        piece.style.left = Math.random() * 100 + "%";


        piece.style.animationDuration = (2 + Math.random() * 3) + "s";
        piece.style.animationDelay =
            Math.random() * 1.5 + "s";
        piece.style.width =
            (6 + Math.random() * 8) + "px";
        piece.style.height =
            (8 + Math.random() * 15) + "px";


        
        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        // Add piece

        confetti.appendChild(piece);

    }
}


// =========================
// SPIN AGAIN
// =========================

spinAgainBtn.addEventListener("click",
    () => {

        // Hide winner screen
        winnerScreen.classList.remove("show");

        // Remove confetti
        confetti.innerHTML = "";

    }
);