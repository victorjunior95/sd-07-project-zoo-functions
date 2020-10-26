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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
  .find(animalSpecie => animalSpecie.name === animal)
  .residents.every(animalAge => animalAge.age >= age);
}

function employeeByName(employeeName) {
  let result = {};
  if (employeeName === undefined) {
    return result;
  }
  employees.filter((employeeData) => {
    if (employeeData.firstName === employeeName ||
      employeeData.lastName === employeeName) {
      result = employeeData;
    }
    return result;
  });
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  const employee = employees.find(element => element.managers.includes(id));
  return employee !== undefined;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const amountOfAnimals = {};
    animals.forEach((animal) => {
      amountOfAnimals[animal.name] = animal.residents.length;
    });
    return amountOfAnimals;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Child = 0, Adult = 0, Senior = 0 } = entrants;
  const totalPriceOfChildren = data.prices.Child * Child;
  const totalPriceOfAdults = data.prices.Adult * Adult;
  const totalPriceOfSeniors = data.prices.Senior * Senior;
  return totalPriceOfChildren + totalPriceOfAdults + totalPriceOfSeniors;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const workingDay = {};
  if (dayName === undefined) {
    const filteredDays = Object.keys(data.hours).filter(day => day !== 'Monday');
    filteredDays.forEach((day) => {
      const workingDayInfo = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
      workingDay[day] = workingDayInfo;
    });
    workingDay.Monday = 'CLOSED';
  } else if (dayName === 'Monday') {
    workingDay[dayName] = 'CLOSED';
  } else if (dayName !== 'Monday') {
    workingDay[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
  }
  return workingDay;
}

function oldestFromFirstSpecies(id) {
  // procura a primeira espécie que o funcionário cuida
  const specieId = employees.find(employee => employee.id === id).responsibleFor[0];
  // procura os animais residentes daquela espécie
  const animalsOfSpecie = animals.find(specie => specie.id === specieId);
  // armazena o animal mais velho daquela espécie
  let oldestAnimal = animalsOfSpecie.residents[0];
  animalsOfSpecie.residents.forEach((animal, index) => {
    if (animal.age > oldestAnimal.age) {
      oldestAnimal = animalsOfSpecie.residents[index];
    }
  });
  // retorna o nome, sexo e idade do animal mais velho
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}


function increasePrices(percentage) {
  // recupera o preço de cada ingresso
  const ticketsValues = Object.values(data.prices);
  // calcula o novo preço de cada ingresso
  ticketsValues.forEach((value, index) => {
    const multiplier = (percentage / 100) + 1;
    const newPercentage = Math.round((value * multiplier) * 100) / 100;
    ticketsValues[index] = newPercentage;
  });
  // atualiza o banco de dados com os novos preços
  data.prices.Adult = ticketsValues[0];
  data.prices.Senior = ticketsValues[1];
  data.prices.Child = ticketsValues[2];
  return data.prices;
}
// função que mapeia a espécie dos animais que são cuidados pelo funcionário
function animalName(employee) {
  const name = employee.responsibleFor.map(animalId => data.animals
    .find(animal => animal.id === animalId)
    .name);
  return name;
}

function employeeCoverage(idOrName) {
  const employeeInfo = {};
  const employeesList = data.employees;
  /* caso não receba nenhum parâmetro, retorna o nome de todos os funcionários
  e as espécies de animais que eles cuidam respectivamente */
  if (idOrName === undefined) {
    data.employees.forEach((employee) => {
      const employeeFullName = `${employee.firstName} ${employee.lastName}`;
      employeeInfo[employeeFullName] = animalName(employee);
    });
    return employeeInfo;
  }
  // procura o funcionário pelo id, nome ou sobrenome
  const employeeData = employeesList.find(employee => employee.id === idOrName) ||
    employeesList.find(employee => employee.firstName === idOrName) ||
    employeesList.find(employee => employee.lastName === idOrName);
  // armazena o nome completo do funcionário pesquisado
  const employeeFullName = `${employeeData.firstName} ${employeeData.lastName}`;
  // retorna o nome do funcionário e as espécies de animais que ele cuida
  employeeInfo[employeeFullName] = animalName(employeeData);
  return employeeInfo;
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
