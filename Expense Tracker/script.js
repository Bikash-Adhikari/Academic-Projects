
document.addEventListener('DOMContentLoaded', () => {

  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");

  const expenseListDisplay = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");



  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let totalAmount = calculateTotal();

  displayList();
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());

    if (expenseAmount.value !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      };

      expenses.push(newExpense);
      saveExpensesToLocal();
      displayTotal();
      displayList();
    }



    //clear Input
    expenseName.value = "";
    expenseAmount.value = "";
    console.log(expenses);
  })




  function saveExpensesToLocal() {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }



  function calculateTotal() {
    return expenses.reduce((sum, eachExpenses) => (sum + eachExpenses.amount), 0)
  }




  function displayTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }





  function displayList() {
    expenseListDisplay.innerHTML = "";
    expenses.forEach((exp) => {
      const li = document.createElement('li');
      li.innerHTML = `
      ${exp.name}: $${exp.amount.toFixed(2)}
      <button data-id="${exp.id}">Delete</button>
      `;
      expenseListDisplay.appendChild(li);


    });

  }




  //delete items ==> define click event on 'Delete' 
  expenseListDisplay.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const clickedId = parseInt(e.target.getAttribute('data-id')); // get & store id of clicked item
      expenses = expenses.filter(ex => ex.id !== clickedId);
    }

    saveExpensesToLocal();
    displayList();
    displayTotal();

  })



})