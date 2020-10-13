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
const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
} // Requisito feito com ajuda do instrutor Murilo Wolf em aula

function animalsOlderThan(names, age) {
  const nomeEIdade = animals.filter(animal => animal.name === names);
  const ageAll = nomeEIdade[0].residents.every(animal => animal.age >= age);
  return ageAll;
}

function employeeByName(employeeName) {
  const employers =
    employeeName === undefined
      ? {}
      : employees.find(
          funcionario =>
            funcionario.firstName === employeeName || funcionario.lastName === employeeName,
        );
  return employers;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}
function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  employees.push(addNewEmployee);
}

const secondReturn = animals.reduce((acc, item) => {
  acc[item.name] = item.residents.length;
  return acc;
}, {});
function animalCount(species) {
  return species !== undefined
    ? animals.find(({ name }) => name === species).residents.length
    : secondReturn;
}
// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

function entryCalculator(entrants = 0) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const total = (prices.Adult * Adult) + (prices.Senior * Senior) + (prices.Child * Child);
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const speciesResponsable = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalsResidents = animals.find(animal => animal.id === speciesResponsable).residents;
  const oldAnimal = animalsResidents.sort(
    (animalAge, animalAge2) => animalAge2.age - animalAge.age,
  );
  return [oldAnimal[0].name, oldAnimal[0].sex, oldAnimal[0].age];
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
