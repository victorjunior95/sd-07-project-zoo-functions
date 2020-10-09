/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals.filter(item => ids.includes(item.id));
}

// Ao passar o nome de uma espécie e uma idade,
// testa se todos os animais desta espécie possuem a
// idade mínima especificada
function animalsOlderThan(animal, age) {
  // seu código aqui
}

// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário,
// retorna o objeto do funcionário
// Quando provido o último nome do funcionário,
// retorna o objeto do funcionário
function employeeByName(employeeName) {
  // seu código aqui
  const { employees } = data;
  const employee = employees.find((item) => item.firstName === employeeName || item.lastName === employeeName);
  return (typeof employeeName !== 'undefined' ? employee : {});
}
console.log(employeeByName());

// Cria um novo colaborador a partir de objetos
// contendo 'informações pessoais' e 'gerentes
// e animais gerenciados'.
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

// Testa se o id passado é de um gerente
function isManager(id) {
  // seu código aqui
}

// Adiciona um funcionário no fim da lista
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade
function animalCount(species) {
  // seu código aqui
}

// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos,
// crianças e idosos
function entryCalculator(entrants) {
  // seu código aqui
}

// Sem parâmetros, retorna animais categorizados por localização
// Com a opção 'includeNames: true' especificada,
// retorna nomes de animais
// Com a opção 'sorted: true' especificada, retorna nomes
// de animais ordenados
// Com a opção 'sex: 'female'' ou 'sex: 'male'' especificada,
// retorna somente nomes de animais macho/fêmea
// Com a opção 'sex: 'female'' ou 'sex: 'male'' especificada e
// a opção 'sort: true' especificada, retorna somente nomes de
// animais macho/fêmea com os nomes dos animais ordenados
// Só retorna informações ordenadas e com sexo se a opção
// 'includeNames: true' for especificada
function animalMap(options) {
  // seu código aqui
}

// Sem parâmetros, retorna um cronograma legível para humanos
// Se um único dia for passado, retorna somente este dia
// em um formato legível para humanos
function schedule(dayName) {
  // seu código aqui
}

// Passado o id de um funcionário, encontra a primeira espécie
// de animal gerenciado pelo funcionário, e retorna um array
// com nome, sexo e idade do animal mais velho dessa espécie
function oldestFromFirstSpecies(id) {
  // seu código aqui
}

// Ao passar uma porcentagem, incrementa todos os preços,
// arrendondados em duas casas decimais
function increasePrices(percentage) {
  // seu código aqui
}

// Sem parâmetros, retorna uma lista de funcionários e os
// animais pelos quais eles são responsáveis
// Com o id de um funcionário, retorna os animais pelos quais
// o funcionário é responsável
// Com o primeiro nome de um funcionário, retorna os animais
// pelos quais o funcionário é responsável
// Com o último nome de um funcionário, retorna os animais
// pelos quais o funcionário é responsável
function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
