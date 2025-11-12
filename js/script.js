document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("transactionForm");
  const table = document.getElementById("transactionTable");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const type = document.getElementById("type").value;
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value;
      const amount = parseFloat(document.getElementById("amount").value);

      const transaction = {
        date: new Date().toLocaleDateString(),
        type,
        category,
        description,
        amount,
      };

      localStorage.setItem(Date.now(), JSON.stringify(transaction));
      alert("Transaction added successfully!");
      form.reset();
    });
  }

  if (table) {
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) continue;
      const t = JSON.parse(localStorage.getItem(key));
      if (!t) continue;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${t.date}</td>
        <td>${t.category}</td>
        <td>${t.description}</td>
        <td class="${t.type === "expense" ? "text-danger" : "text-success"}">₹${
        t.amount
      }</td>
      `;
      table.appendChild(row);
    }
  }
});
