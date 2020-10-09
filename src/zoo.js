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

function animalsByIds(ids) {
  //Caso receba nenhum parâmetro, necessário retornar um array vazio

  //Ao receber como parâmetro um único id, retorna os animais com este id
  
  //Ao receber mais de um id, retorna os animais que têm um desses ids
}

function animalsOlderThan(animal, age) {
  //Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie possuem a idade mínima especificada
}

function employeeByName(employeeName) {
//Sem parâmetros, retorna um objeto vazio

//Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário

//Quando provido o último nome do funcionário, retorna o objeto do funcionário
}

function createEmployee(personalInfo, associatedWith) {
  //Cria um novo colaborador a partir de objetos contendo informações pessoais e gerentes e animais gerenciados.
}

function isManager(id) {
  // Testa se o id passado é de um gerente
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // Adiciona um funcionário no fim da lista
}

function animalCount(species) {
  //Sem parâmetros, retorna animais e suas quantidades

  //Com o nome de uma espécie de animal, retorna somente a quantidade
}

function entryCalculator(entrants) {
//Retorna 0 se nenhum argumento for passado

//Retorna 0 se um objeto vazio for passado

//Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
}

function animalMap(options) {
//Sem parâmetros, retorna animais categorizados por localização

//Com a opção includeNames: true especificada, retorna nomes de animais

//Com a opção sorted: true especificada, retorna nomes de animais ordenados

//Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente nomes de animais macho/fêmea

//Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada, retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados

//Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada
}

function schedule(dayName) {
//Sem parâmetros, retorna um cronograma legível para humanos

//Se um único dia for passado, retorna somente este dia em um formato legível para humanos
}

function oldestFromFirstSpecies(id) {
  //Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie
}

function increasePrices(percentage) {
  // Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais
}

function employeeCoverage(idOrName) {
//Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são responsáveis

//Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável

//Com o primeiro nome de um funcionário, retorna os animais pelos quais o funcionário é responsável

//Com o último nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
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
