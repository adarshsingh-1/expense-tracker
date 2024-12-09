// Function to display the current date
function displayDate() {
    const dateElement = document.getElementById("date");
    
    const today = new Date();  // Get current date
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    }; 
    
    const currentDate = today.toLocaleDateString('en-US', options);  // Format the date

    // Set the date in the HTML
    dateElement.innerText = currentDate;
}

// Function to add expense
function addExpense(event) {
    event.preventDefault();  // Prevent form submission

    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);

    if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    // Get current date for the expense
    const today = new Date();
    const expenseDate = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // Create new list item for the expense
    const expenseList = document.getElementById("expense-list");
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${expenseName}</strong> - $${expenseAmount.toFixed(2)} 
        <span class="expense-date">(${expenseDate})</span>
        <button onclick="removeExpense(this)">Remove</button>
    `;

    // Append the new item to the list
    expenseList.appendChild(li);

    // Update the total expense
    updateTotalExpense();
    
    // Clear the input fields after adding the expense
    document.getElementById("expense-name").value = '';
    document.getElementById("expense-amount").value = '';
}

// Function to remove an expense
function removeExpense(button) {
    // Remove the list item
    const li = button.parentElement;
    li.remove();

    // Update the total expense
    updateTotalExpense();
}

// Function to update the total expense
function updateTotalExpense() {
    const expenseItems = document.querySelectorAll("#expense-list li");
    let total = 0;

    // Loop through all expense items and add their amounts
    expenseItems.forEach(item => {
        const amountText = item.innerText.split(" - $")[1].split(" ")[0];
        total += parseFloat(amountText);
    });

    // Update the total expense on the page
    document.getElementById("total-expense").innerText = total.toFixed(2);
}

// Call the function to display the date when the page loads
window.onload = function() {
    displayDate();

    // Attach the form submit event to the addExpense function
    document.getElementById("expense-form").addEventListener("submit", addExpense);
};
