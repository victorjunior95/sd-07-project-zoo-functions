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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(name => name.firstName === employeeName ||
    name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((accAnimal, animal) => {
      accAnimal[animal.name] = animal.residents.length;
      return accAnimal;
    }, {});
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}


function entryCalculator(entrants) {
  if ((!entrants) || (Object.keys(entrants).length === 0)) {
    return 0;
  } else {
    const entrantKeys = Object.keys(entrants);
    const entrantValue = Object.values(entrants);
    const result = entrantKeys.reduce( (sumAcc, currentValue, index) => {
      const currentCalc = data.prices[currentValue] * entrantValue[index];
      return sumAcc + currentCalc;
    },0);
    return result;
  }
}

function retrieveAvailableLocations() {
  return data.animals
  .map( (animal) => animal.location )
  .reduce( (acc, currentValue) => {
    const currentValueAlreadyExistsInAcc = currentValue.includes(acc);
    return currentValueAlreadyExistsInAcc ? acc : [...acc, currentValue];
  });
}

function retrieveFilteredAnimalsByLocation(location) {
   return data.animals.filter( (animal) => animal.location === location )
}

function retrieveAnimalsPerLocation(locations) {
  //Sem parâmetros, retorna animais categorizados por localização
  const animalsPerLocation = {};
  
  locations.forEach( (location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
      .map( (animal) => animal.name);

      if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation; 
}

function retrieveAnimalsPerLocationsWithName(locations, sorted, sex){
  const animalsPerLocation = {};

  locations.forEach( (location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
    .map( (animal) => {
      const animalName = animal.name;
      const residents = animal.residents
      .filter( (resident) => {
        const needFiltering = sex !== undefined;
        //return needFiltering ? resident.sex === sex : true;
        if (needFiltering) {
          return resident.sex === sex;
        } else {
          return true;
        }
      })
      .map( (resident) => resident.name );

      if (sorted) residents.sort();

      return { [animalName]: residents };
    })

    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
      
  })
  return animalsPerLocation;
}

//Requisito resolvido em aula ao vivo c/ Oliva
function animalMap(options) {
  const locations = retrieveAvailableLocations();

  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return retrieveAnimalsPerLocationsWithName(locations, sorted, sex);
  } else {
    return retrieveAnimalsPerLocation(locations);
  }

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
