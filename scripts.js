// Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

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

function expenseAdd (newExpense) {
  try {
    
  } catch (error) {
    alert('Não foi possível adicionar o novo gasto a lista de despesas');
    console.error(error);
  }
}