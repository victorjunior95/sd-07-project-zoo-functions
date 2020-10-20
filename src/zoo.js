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

const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // Caso receba nenhum parâmetro, necessário retornar um array vazio
  // Ao receber como parâmetro um único id, retorna os animais com este id
  // Ao receber mais de um id, retorna os animais que têm um desses ids
  return ids.map(animalsId => animals.find(animalsById => animalsById.id === animalsId));
}
function animalsOlderThan(animal, age) {
  // Ao passar o nome de uma espécie e uma idade, testa se todos os animais
  // desta espécie possuem a idade mínima especificada
  return data.animals.find(({ name }) => name === animal)
  .residents.every(animalAge => animalAge.age > age);
}

function employeeByName(employeeName) {
  // Sem parâmetros, retorna um objeto vazio
  // Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  // Quando provido o último nome do funcionário, retorna o objeto do funcionário
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
  (firstName === employeeName || lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  // Cria um novo colaborador a partir de objetos contendo:
  // informações pessoais e gerentes e animais gerenciados
  const newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
  // source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
}

function isManager(id) {
  // Testa se o id passado é de um gerente
  return data.employees.some((managerId, index) => managerId.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // Adiciona um funcionário no fim da lista
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // Sem parâmetros, retorna animais e suas quantidades
  // Com o nome de uma espécie de animal, retorna somente a quantidade
  if (!species) {
    return animals.reduce((acc, animalBySpecie) => {
      acc[animalBySpecie.name] = animalBySpecie.residents.length;
      return acc;
    }, {});
  }

  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

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
