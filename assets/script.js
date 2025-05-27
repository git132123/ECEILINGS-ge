
const descriptions = {
  econom: "HAILED Premium მატერია; ქართული პროფილი; კანტი; Klimas დუბელი.",
  standard: "MSD Premium მატერია; რუსული პროფილი; კანტი; Klimas დუბელი.",
  premium: "BAUF მატერია; ჩრდილივანი პროფილი; Klimas დუბელი.",
  exclusive: "ყველა მაღალტექნოლოგიური გადაწყვეტა."
};

const prices = {
  econom: { fixed: 350, max: 625, rate: 25, room: 30 },
  standard: { fixed: 400, max: 750, rate: 30, room: 40 },
  premium: { fixed: 450, max: 875, rate: 35, room: 50 }
};

const accessoryPrices = {
  led: 10, chandelier: 20, linear: 120,
  profile: 100, magnetic: 190, rail: 50, curtain: 100
};

document.getElementById("package").addEventListener("change", function () {
  const val = this.value;
  const det = document.getElementById("details");
  const inputSec = document.getElementById("basic-inputs");
  const accToggle = document.getElementById("accessory-toggle");
  const accSec = document.getElementById("accessories");
  const res = document.getElementById("result");

  if (val === "exclusive") {
    det.innerText = descriptions[val];
    inputSec.style.display = "none";
    accToggle.style.display = "none";
    accSec.style.display = "none";
    res.innerText = "ფასი განისაზღვრება კონსულტაციით.";
    res.style.display = "block";
  } else {
    det.innerText = descriptions[val];
    inputSec.style.display = "block";
    accToggle.style.display = "block";
    res.style.display = "none";
  }
});

document.getElementById("toggleAccessories").addEventListener("change", function () {
  document.getElementById("accessories").style.display = this.checked ? "block" : "none";
});

function calculate() {
  const pkg = document.getElementById("package").value;
  if (pkg === "exclusive") return;

  let area = parseFloat(document.getElementById("area").value);
  let rooms = parseInt(document.getElementById("rooms").value);
  if (isNaN(rooms) || rooms < 1) rooms = 1;
  if (isNaN(area) || area < 1) area = 1;

  const { fixed, max, rate, room } = prices[pkg];
  let total = area <= 5 ? fixed : (area <= 25 ? fixed + (area - 5) * rate : area * rate);
  total += (rooms - 1) * room;

  const accessories = ["led", "chandelier", "linear", "profile", "magnetic", "rail", "curtain"];
  let accessoryTotal = 0;

  accessories.forEach(id => {
    const val = parseFloat(document.getElementById(id).value) || 0;
    accessoryTotal += val * accessoryPrices[id];
  });

  total += accessoryTotal;

  const result = document.getElementById("result");
  result.innerText = `საბოლოო ფასი: ${total.toFixed(2)} ₾`;
  result.style.display = "block";

  const contactButtons = document.getElementById("contact-buttons");
  contactButtons.style.display = "flex";

  const text = encodeURIComponent(
    `Stretch Ceiling შეკვეთა:%0Aპაკეტი: ${pkg}%0Aფართობი: ${area} მ²%0Aოთახები: ${rooms}%0აფასი: ${total.toFixed(2)} ₾`
  );
  document.getElementById("wa").href = `https://wa.me/995511167665?text=${text}`;

  setTimeout(() => contactButtons.scrollIntoView({ behavior: "smooth" }), 300);
}

// Popup logic
document.querySelectorAll(".info").forEach(el => {
  el.addEventListener("click", () => {
    const img = el.dataset.img;
    document.getElementById("popup-img").src = "assets/popup-images/" + img;
    document.getElementById("popup").style.display = "flex";
  });
});

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
