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

const { animals, prices, hours, employees } = require('./data');
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
  // Retorna 0 se nenhum argumento for passado
  // Retorna 0 se um objeto vazio for passado
  // Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
  if (!entrants) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // Sem parâmetros, retorna um cronograma legível para humanos
  // Se um único dia for passado, retorna somente este dia em um formato legível para humanos
  const arrayOfHours = Object.entries(hours);
  const daysOpened = arrayOfHours.reduce((acc, daysWeek) => {
    if (daysWeek[1].open !== 0) {
      acc[daysWeek[0]] = `Open from ${daysWeek[1].open}am until ${daysWeek[1].close - 12}pm`;
    }
    return acc;
  }, {});

  daysOpened.Monday = 'CLOSED';

  if (!dayName) return daysOpened;

  const oneDay = {};
  oneDay[dayName] = daysOpened[dayName];
  return oneDay;

  /** Consultei o repositório do colega Andre F Pires para resolver essa parte.
    https://github.com/tryber/sd-07-project-zoo-functions/blob/andrefpires-zoo-functions/src/zoo.js
  */
}

function oldestFromFirstSpecies(id) {
  // - Passado o id de um funcionário, encontra a primeira espécie de animal
  // gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do
  // animal mais velho dessa espécie
  const employeeZoo = employees.find(employee => employee.id === id);
  const animalForEmployee = animals.find(animal =>
    animal.id === employeeZoo.responsibleFor[0]).residents;

  const oldestAnimal = animalForEmployee.reduce((acc, ageOfAnimal) => {
    if (acc < ageOfAnimal.age) acc = ageOfAnimal.age;
    return acc;
  }, 0);

  const oldestAnimalFound = animalForEmployee.filter(animal => animal.age === oldestAnimal);
  return Object.values(oldestAnimalFound[0]);
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
