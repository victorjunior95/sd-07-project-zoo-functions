const { animals } = require('./data');
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
  const animalObj = animals;
  const arrOfIds = ids;

  const animalsById = arrOfIds.map((id) => {
    const getAnimal = animal => animal.id === id;
    const animalSearch = animalObj.find(getAnimal);
    return animalSearch;
  });
  return animalsById;
}

function animalsOlderThan(animal, age) {
  const getAnimal = specie => specie.name === animal;
  const findAnimal = data.animals.find((getAnimal));
  const analyzeAge = findAnimal.residents.every(resident => resident.age > age);
  return analyzeAge;
}

function employeeByName(employeeName) {
  const personName = employeeName;
  if (typeof employeeName === 'undefined') { return {}; }
  const getPerson = person => (personName === person.firstName || personName === person.lastName);
  const findPerson = data.employees.find(getPerson);
  return findPerson;
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, id, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { firstName, id, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  const allManagersIds = data.employees.reduce((acc, employee) => (
    [...acc, ...employee.managers]
  ), []);
  const verifyId = managerId => managerId === id;
  return allManagersIds.some((verifyId));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees = [...data.employees, newEmployee];
  return data.employees;
}

function animalCount(species) {
  const allAnimals = data.animals;
  const allAnimalsCount = () => {
    const getAnimal = (acc, animal) => {
      const name = animal.name;
      const count = animal.residents.length;
      acc[name] = count;
      return acc;
    };
    return allAnimals.reduce(getAnimal, {});
  };
  if (typeof species === 'undefined') {
    return allAnimalsCount();
  }
  const findAnimal = allAnimals.filter(animal => animal.name === species);
  return findAnimal[0].residents.length;
}

function entryCalculator(entrants = 0) {
  const allPrices = data.prices;
  const entrantsKeys = Object.keys(entrants);
  const getEntrantDemand = (acc, entrant) => acc + (allPrices[entrant] * entrants[entrant]);
  const calculatePrice = entrantsKeys.reduce(getEntrantDemand, 0);
  return calculatePrice;
}

function animalMap(options = { includeNames: false, sorted: true, sex: '' }) {
  // const locations = data.animals
  //   .reduce((acc, { location }) => ({...acc, [location] : []}), {})
  // if (options.includeNames === false) {
  //   data.animals
  //     .forEach(animal => locations[animal.location].push(animal.name))
  //   return locations
  // } else {
  //   data.animals
  //   .forEach((animal) => {
  //     let { residents } = animal;
  //     const { name, location } = animal;
  //     if(options.sex) { residents = residents.filter(resident =>resident.sex === options.sex) };
  //     let arrayOfResidentsNames = []
  //     residents.forEach(resident => {
  //       arrayOfResidentsNames.push(resident.name)
  //     });
  //     if(options.sorted === true) { arrayOfResidentsNames = arrOfResidentsNames.sort() };
  //     console.log(arrayOfResidentsNames.sort())
  //     const speciesInLocation = locations[location]
  //     const residentsReduce = residents.reduce((acc, resident) => {
  //       const arrayOfResidentsNames = [...acc, resident]
  //       locations[location][name] = arrayOfResidentsNames
  //       return arrayOfResidentsNames
  //     }, {})
  //      locations[location].push(Object.fromEntries([[name, arrayOfResidentsNames.]]))

  //   })
  //   }
  // return locations
}

function schedule(dayName = '') {
  const hours = data.hours;
  const hoursKeys = Object.keys(hours);
  const scheduleObj = {};
  hoursKeys
    .forEach((element) => {
      scheduleObj[element] = `Open from ${data.hours[element].open}am until ${data.hours[element].close - 12}pm`;
      if (element === 'Monday') {
        scheduleObj[element] = 'CLOSED';
      }
    });
  if (dayName !== '') {
    return { [dayName]: scheduleObj[dayName] };
  }
  return scheduleObj;
}


function oldestFromFirstSpecies(id) {
  const employees = data.employees;
  const findEmployee = employees.filter(employee => employee.id === id);
  const responsibleFor = data.animals.filter(animal => animal.id === findEmployee[0].responsibleFor[0]);
  const animalResidents  = responsibleFor[0].residents
  const findOldestAnimal = animalResidents.reduce((acc, resident) => 
  (resident.age > acc.age ? acc = resident : acc));
  return Object.values(findOldestAnimal)
}

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'))

function increasePrices(percentage) {
  const percent = (percentage / 100) + 1;
  Object.keys(data.prices).forEach(
    key => (data.prices[key] = Math.round(data.prices[key] * percent * 100) / 100));
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
