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

/*

1- Implemente a função animalsByIds:

  Caso receba nenhum parâmetro, necessário retornar um array vazio
  Ao receber como parâmetro um único id, retorna os animais com este id
  Ao receber mais de um id, retorna os animais que têm um desses ids

*/

// HoF includes = (Murilo Wolf);
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

function animalsByIds(...rest) {
  return animals.filter(objects => rest.includes(objects.id));
}

/*

2- Implemente a função animalsOlderThan:

Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie
possuem a idade mínima especificada

*/

function animalsOlderThan(animal, age) {
  const currentAnimal = animals.find(animalsObject => animalsObject.name === animal);
  const { residents } = currentAnimal;
  return residents.every(item => item.age > age);
}

/*

3- Implemente a função employeeByName:

Sem parâmetros, retorna um objeto vazio

Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário

Quando provido o último nome do funcionário, retorna o objeto do funcionário

*/

function employeeByName(employeeName) {
  const { employees } = data;
  const [expectedObject = {}] = employees.filter(item => item
    .firstName === employeeName || item.lastName === employeeName);
  return expectedObject;
}

/*

4- Implemente a função createEmployee:

Cria um novo colaborador a partir de objetos contendo informações pessoais
e gerentes e animais gerenciados.

*/

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const expectedObject = { id, firstName, lastName, managers, responsibleFor };
  return expectedObject;
}

/*

5- Implemente a função isManager:

Testa se o id passado é de um gerente

*/

function isManager(id) {
  const { employees } = data;
  return employees.some(item => item.managers.includes(id));
}

/*

6- Implemente a função addEmployee:

Adiciona um funcionário no fim da lista

*/

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

/*

7- Implemente a função animalCount:

Sem parâmetros, retorna animais e suas quantidades

Com o nome de uma espécie de animal, retorna somente a quantidade

*/
  // resident.length
function animalCount(species) {
  if (species) {
    const expectedObject = animals.find(item => item.name === species);
    return expectedObject.residents.length;
  }
  return animals.reduce((result, item) => {
    const currentName = item.name;
    const currentLength = item.residents.length;
    result[currentName] = currentLength;
    return result;
  }, {});
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
