const descriptions = {
    econom: "econom",
    standard: "standard",
    premium: "premium",
    exclusive: "exclusive"
  };

  const basePrices = {
    econom: { fixed: 350, max: 625, rate: 25, room: 30 },
    standard: { fixed: 400, max: 750, rate: 30, room: 40 },
    premium: { fixed: 450, max: 875, rate: 35, room: 50 }
  };

  document.getElementById("package").addEventListener("change", function () {
    const val = this.value;
    const detailsDiv = document.getElementById("details");
    const inputsDiv = document.getElementById("inputs");
    document.getElementById("result").style.display = "none";

    if (val === "exclusive") {
      detailsDiv.innerText = "ფასი განისაზღვრება კონსულტაციით.";
      inputsDiv.style.display = "none";
    } else {
      detailsDiv.innerText = descriptions[val];
      inputsDiv.style.display = "block";
    }
  });

  document.getElementById("toggleAccessories").addEventListener("change", function () {
    const acc = document.getElementById("accessories");
    acc.style.display = this.checked ? "block" : "none";
  });

  function calculate() {
    const pkg = document.getElementById("package").value;
    let area = parseFloat(document.getElementById("area").value);
    let rooms = parseInt(document.getElementById("rooms").value);
    const resultDiv = document.getElementById("result");

    if (!area || area <= 0) {
      resultDiv.innerText = "გთხოვთ შეიყვანოთ ფართობი სწორად.";
      resultDiv.style.display = "block";
      return;
    }

    if (!rooms || rooms <= 0) {
      rooms = 1;
      document.getElementById("rooms").value = "1";
    }

    if (pkg === "exclusive") {
      resultDiv.innerText = "Price will be determined after consultation.";
    contactButtons.style.display = "none";
      resultDiv.style.display = "block";
      return;
    }

    const data = basePrices[pkg];
    let basePrice = (area <= 5) ? data.fixed :
                    (area <= 25) ? data.fixed + (data.max - data.fixed) * ((area - 5) / 20) :
                    area * data.rate;

    const roomExtra = (rooms > 1) ? (rooms - 1) * data.room : 0;

    const accessories = {
      led: 10, chandelier: 20, linear: 120, profile: 100,
      magnetic: 190, rail: 50, curtain: 100
    };

    let accTotal = 0;
    for (let key in accessories) {
      const val = parseFloat(document.getElementById(key).value) || 0;
      accTotal += val * accessories[key];
    }

    const final = Math.round(basePrice + roomExtra + accTotal);
    const perM2 = Math.round(basePrice / area);

    resultDiv.innerHTML = `1მ²-ის ღირებულება: ${perM2} ₾<br/>ოთახების დანამატი: ${roomExtra} ₾<br/>სრული ღირებულება: ${final} ₾<br/><small style="color:#888;">(აქსესუარების ჩათვლით)</small>`;
    resultDiv.style.display = "block";
  }

  function showInfo(type) {
    const popup = document.getElementById("popup");
    const content = document.getElementById("popupContent");
    content.innerText = "ინფორმაცია აქსესუარზე: " + type;
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 4000);
  }

  function hidePopup() {
    document.getElementById("popup").style.display = "none";
  }

  window.onload = () => {
    document.getElementById("details").innerText = descriptions["econom"];
  };
