//classes
class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }
    substractFromBudget(amount) {
        return this.budgetLeft -= amount;
    }
}

class HTML {
    insertBudget(amount) {

        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }
    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        setTimeout(function () {
            //messageWrapper.remove();
            //or
            document.querySelector('.primary .alert').remove();
            //removes all
            //document.querySelector('.primary', 'alert').remove();
            //or reset
            addExpenseForm.reset();

        }, 3000)
    }
    addExpenseToList(expenseName, amount) {
        const expensesList = document.querySelector('#expenses ul');

        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${expenseName}
            <span class="badge badge-primary badge-pill">$ ${amount}</span>
        `;
        expensesList.appendChild(li);
    }
    trackBudget(amount) {

        const budgetLeftDollars = budget.substractFromBudget(amount);

        budgetLeft.innerHTML = `${budgetLeftDollars}`;

        if ((budget.budget / 4) > budgetLeftDollars) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        } if ((budget.budget / 2) > budgetLeftDollars) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success'); //, 'alert-danger' no
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}

//variables
const addExpenseForm = document.getElementById('add-expense'),
    //mine
    //const valuesForms = document.getElementById('form-group'),

    budgetTotal = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left'),
    html = new HTML();
//also possible and better separated? for html    ?

let budget, userBudget;



//event listeners


eventListeners();



function eventListeners() {

    document.addEventListener('DOMContentLoaded', function (e) {
        userBudget = prompt('What\'s your budget for this week?');

        if (userBudget === '' || userBudget === null || userBudget === 0) {
            window.location.reload();
        } else {
            budget = new Budget(userBudget);
            html.insertBudget(budget.budget);
        }
    })

    addExpenseForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if (expenseName === '' || amount === '') {
            // console.log('invalid');
            html.printMessage('There was an error, all the fields are mandatory', 'alert-danger');
        } else {
            //            html.printMessage
            html.addExpenseToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Added...', 'alert-success');
        }


    })
}