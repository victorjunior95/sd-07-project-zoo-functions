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

const { prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals.filter(item => ids.includes(item.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  let { animals: myAnimals } = data;
  const getAnimal = myAnimals.find(item => item.name === animal).residents.every(old => old.age >= age);

  return getAnimal;
}

function employeeByName(employeeName) {
  // seu código aqui
  const { employees } = data;
  const getEmployee = item => item.firstName === employeeName || item.lastName === employeeName;
  const employee = employees.find(getEmployee);
  return (typeof employeeName !== 'undefined' ? employee : {});
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const { employees } = data;
  const manager = employees.some(item => item.managers.includes(id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  const { animals } = data;
  const getAllAnimals = {};
  animals.forEach((animal) => {
    getAllAnimals[animal.name] = animal.residents.length;
  });
  if (species !== undefined) {
    return animals.find(animal => species === animal.name).residents.length;
  }
  return getAllAnimals;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (typeof entrants !== 'object' || entrants.length === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const priceAdult = prices.Adult * Adult;
  const priceSenior = prices.Senior * Senior;
  const priceChild = prices.Child * Child;
  return priceAdult + priceSenior + priceChild;
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

function schedule(dayName) {
  // seu código aqui
  const dailySchedule = {};
  let wholeSchedule = {};
  const { hours } = data;

  wholeSchedule = { ...hours };
  const keys = Object.keys(wholeSchedule);

  keys.forEach((key) => {
    if (key === 'Monday') {
      wholeSchedule[key] = 'CLOSED';
    } else {
      wholeSchedule[key] = `Open from ${wholeSchedule[key].open}am until ${wholeSchedule[key].close - 12}pm`;
    }
  });

  dailySchedule[dayName] = wholeSchedule[dayName];

  return (dayName === undefined) ? wholeSchedule : dailySchedule;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const { animals, employees } = data;

  const firstAnimalId = employees.find(employee => employee.id === id).responsibleFor[0];

  const getAnimal = animals.find(animal => animal.id === firstAnimalId);
  const { residents } = getAnimal;
  const oldestAnimal = residents.sort((animal1, animal2) => animal2.age - animal1.age)[0];

  const name = oldestAnimal.name;
  const sex = oldestAnimal.sex;
  const age = oldestAnimal.age;

  return [name, sex, age];
}

function increasePrices(percentage) {
  // seu código aqui
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    const value = ((prices[key] * percentage) / 100) + prices[key];
    prices[key] = Math.round(value * 100) / 100;
  });
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
// console.log(employeeCoverage());

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
