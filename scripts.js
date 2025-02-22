// Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

// Seleciona os elementos da lista de despesas
const expensesList = document.querySelector('ul');
const expensesTotal = document.querySelector('aside header h2')
const expensesQuantity = document.querySelector('aside header p span')

// Captura o evento de input no campo de valor para formatar o valor
amount.oninput = () => {

  // Obtem o valor atual do imput e remover todos os caracteres não numéricos
  let value = amount.value.replace(/\D/g, '');

  // Converte o valor para um número e centavos
  value = Number(value) / 100;

  // O valor tratado sem letras e caracteres especiais é retornado para o campo de valor
  amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
  // Formata o valor para o formato de moeda BRL
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Captura o evento de envio do formulário
form.onsubmit = (event) => {
  // Previne o comportamento padrão do formulário de recarregar a página
  event.preventDefault();
  // Cria um novo objeto com os dados do formulário com detalhes do novo gasto
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  }
  // Chama a função que irá adiconar o novo gasto a lista de despesas
  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
  try {
    // Cria o elemento de (li) para adiconar a lista de despesas (ul)
    const expenseItem = document.createElement('li');
    // Adiciona a classe ao elemento
    expenseItem.classList.add('expense');

    // Cria o icone da categoria
    const expenseIcon = document.createElement('img');
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute('alt', newExpense.category_name);

    // Cria o info da despesa
    const expenseInfo = document.createElement('div');
    expenseInfo.classList.add('expense-info');

    // Cria o nome da despesa
    const expenseName = document.createElement('strong');
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expenseCategory = document.createElement('span');
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona nome e categoria na div de info
    expenseInfo.append(expenseName, expenseCategory);

    // Cria valor da dispesa
    const expenseAmount = document.createElement('span');
    expenseAmount.classList.add('expense-amount');
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount
      .toUpperCase()
      .replace('R$', '')}`;

    // Cria o ícone de excluir
    const removeIcon = document.createElement('img');
    removeIcon.classList.add('remove-icon');
    removeIcon.setAttribute('src', 'img/remove.svg');
    removeIcon.setAttribute('alt', 'remover');

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    // Adiciona o item na lista de despesas
    expensesList.append(expenseItem);

    // Limpa os campos
    clearForm();

    // Atualiza os totais
    updateTotals();
  } catch (error) {
    alert('Não foi possível adicionar o novo gasto a lista de despesas');
    console.error(error);
  }
}

function updateTotals() {
  try {
    // Recupera todos os itens da lista
    const items = expensesList.children;

    // Atualiza a quantidade de despesas
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`;

    // Variável para armazenar o valor total	
    let total = 0;

    // Itera sobre cada item da lista
    for (let item of items) {
      // Obtem o valor do item
      const itemAmount = item.querySelector('.expense-amount');

      // Remove caracteres não numéricos e substitui a vírgula por ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(',', '.');

      // Converte o valor para float
      value = parseFloat(value);

      // Verifica se é número válido
      if (isNaN(value)) {
        return alert(
          'Não foi possível calcular o totais. Valor não parece ser um número válido'
        );
      }
      // Incrementa o valor total
      total += Number(value);
    }
    // Cria o span para R$ formatado
    const symbolBrl = document.createElement('small');
    symbolBrl.textContent = 'R$';

    // Formata o valor total e remove R$ que será exibido pela small com estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace('R$', '');

    // Limpa o conteúdo atual do elemento de totais
    expensesTotal.innerHTML = '';
    
    // Adiciona o símbolo e o valor total no elemento de totais
    expensesTotal.append(symbolBrl, total);

  } catch (error) {
    alert('Não foi possível atualizar os totais');
    console.error(error);
  }
}

// Evento que captura o clique no ícone de excluir
expensesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-icon')) {

    // Obtem o li pai do elemento clicado
    const item = event.target.closest('.expense');

    // Remove o item da lista
    item.remove();
  }
  // Atualiza os totais
  updateTotals();
});

function clearForm() {
  // Limpa os campos do formulário
  expense.value = '';
  amount.value = '';
  category.value = '';

  expense.focus();
}