document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form')
  const expenseNameInput = document.getElementById('expense-name');
  const expenseAmountInput = document.getElementById('expense-amount');
  const expenseList = document.getElementById('expense-list');
  const totalAmountDisplay = document.getElementById('total-amount');



  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let totalAmount = calculateTotal();



  displayList();
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());


    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      };

      expenses.push(newExpense);
      saveExpensesToLocal();
      displayTotal();
      displayList();


      //clear Input--------------
      expenseNameInput.value = '';
      expenseAmountInput.value = '';
    };

  })





  function calculateTotal() {
    return expenses.reduce((sum, expense) => (sum + expense.amount), 0);
  }




  function saveExpensesToLocal() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }




  function displayTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }




  function displayList() {
    expenseList.innerHTML = '';
    expenses.forEach((exp) => {
      const li = document.createElement('li');
      li.innerHTML = `
      ${exp.name} : $${exp.amount.toFixed(2)}
      <button data-id="${exp.id}">Delete</button>
      `;

      expenseList.appendChild(li);
    })
  }



  //delete items
  expenseList.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute('data-id'));
      expenses = expenses.filter(ex => ex.id !== expenseId);

      saveExpensesToLocal();
      displayList();
      displayTotal();
    }
  })

})