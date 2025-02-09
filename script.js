document.addEventListener("DOMContentLoaded", function () {
    let balance = 0;
    const balanceDisplay = document.getElementById("balance");
    const lastTransaction = document.getElementById("last-transaction");
    const transactionList = document.getElementById("transaction-list");

    function updateBalanceDisplay() {
        balanceDisplay.textContent = Total Balance: ${balance} QAR;
        balanceDisplay.style.color = balance < 0 ? "#ff4c4c" : "#fff"; // Red if negative
    }

    function showPopup(message) {
        const popup = document.getElementById("popup");
        const popupText = document.getElementById("popup-text");
        popupText.textContent = message;
        popup.style.display = "block";
    }

    function closePopup() {
        document.getElementById("popup").style.display = "none";
    }

    document.getElementById("cash-in").addEventListener("click", function () {
        const name = document.getElementById("name").value.trim();
        const amount = parseFloat(document.getElementById("amount").value);

        if (name === "" || isNaN(amount) || amount <= 0) {
            showPopup("Please enter a valid name and amount.");
            return;
        }

        balance += amount;
        updateBalanceDisplay();
        lastTransaction.textContent = Last Transaction: +${amount} QAR (${name});

        const li = document.createElement("li");
        li.innerHTML = <b>+${amount} QAR</b> (${name}) <span style="color:lightgray;">(${new Date().toLocaleString()})</span>;
        transactionList.prepend(li);
    });

    document.getElementById("cash-out").addEventListener("click", function () {
        const name = document.getElementById("name").value.trim();
        const amount = parseFloat(document.getElementById("amount").value);

        if (name === "" || isNaN(amount) || amount <= 0) {
            showPopup("Please enter a valid name and amount.");
            return;
        }

        balance -= amount; // Now allows negative balance
        updateBalanceDisplay();
        lastTransaction.textContent = Last Transaction: -${amount} QAR (${name});

        const li = document.createElement("li");
        li.innerHTML = <b>-${amount} QAR</b> (${name}) <span style="color:lightgray;">(${new Date().toLocaleString()})</span>;
        transactionList.prepend(li);
    });

    document.getElementById("popup-close").addEventListener("click", closePopup);
});