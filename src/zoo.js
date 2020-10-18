const { animals, employees, prices } = require('./data');
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

function animalsByIds(ids, ...rest) {
  // seu código aqui
  const selectedAnimals =
  animals.filter((animal = []) => animal.id === ids || animal.id === rest[0]);
  return selectedAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const selected = animals.filter(species => species.name === animal);
  const result = selected[0].residents.every(iterator => iterator.age >= age);
  return result;
}

function employeeByName(employeeName) {
  // seu código aqui
  let result = employees.find(employ => employ.firstName === employeeName
  || employ.lastName === employeeName);
  if (result === undefined) {
    result = {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // seu código aqui
  const result = data.employees.map(iterator =>
  iterator.managers.some(element => element === id));
  return result.includes(true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = ' ') {
  // seu código aqui
  if (species === ' ') {
    const result = {};
    animals.forEach((animal) => {
      result[animal.name] = animal.residents.length;
      return result;
    });
    return result;
  }
  const dataAnimal = animals.find(animal => animal.name === species);
  return dataAnimal.residents.length;
}

function entryCalculator(...entrants) {
  // seu código aqui
  if (entrants.length === 0) {
    return 0;
  }
  const input = Object.entries(entrants[0]);
  if (input.length === 0) {
    return 0;
  }
  let result = 0;
  entrants.forEach(entries => Object.keys(entries).forEach(item =>
  (result += prices[item] * entries[item])));
  return result;
}

function animalMap(options) {
  // seu código aqui
  const getDirections = () => {const directions = animals.map((specie) => specie.location)
  .filter((current, index, self) => index === self.indexOf(current));
  return directions;
};
const sizeInput = Object.keys(options).length;

  if (options === undefined) {
    let allAnimals = {};
    getDirections().forEach((direction) => {
      let inputItem = [];
       animals.forEach((itens) => {
         if(itens.location === direction) {
           inputItem.push(itens.name)
           allAnimals[direction] = inputItem;
        }});
    });
    return allAnimals;
  };
  if (options.includeNames === true && sizeInput === 1) {
    let allAnimals = {};
    getDirections().forEach((direction, indexD) => {
      let inputItem = [];
      let animalName;
       animals.forEach((itens) => {
         if(itens.location === direction) {
          const listAnimal = {}
           animalName = itens.residents.map(animal => animal.name);
          listAnimal[itens.name] = animalName;
          inputItem.push(listAnimal)
           allAnimals[direction] = inputItem;
        }});
        //Falta corrigir a amostragem do array
    });
    return allAnimals;
  };
  if (options.includeNames === true && options.sorted === true && sizeInput === 2) {
    let allAnimals = {};
    getDirections().forEach((direction) => {
      let inputItem = [];
      let animalName;
       animals.forEach((itens) => {
         if(itens.location === direction) {
          const listAnimal = {}
           animalName = itens.residents.map(animal => animal.name);
           animalName.sort();
           listAnimal[itens.name] = animalName;
           inputItem.push(listAnimal)
           allAnimals[direction] = inputItem;
        }});
    });
    return allAnimals;
  };
  if (options.sex && options.includeNames && sizeInput === 2) {
    let allAnimals = {};
    getDirections().forEach((direction) => {
      let inputItem = [];
      let animalName;
       animals.forEach((itens) => {
         if(itens.location === direction) {
          const listAnimal = {};
           animalName = itens.residents.filter(animal => animal.sex === options.sex);
           animalName = animalName.map(currentAnimal => currentAnimal.name);
           listAnimal[itens.name] = animalName;
           inputItem.push(listAnimal)
           allAnimals[direction] = inputItem;
        }});
    });
    return allAnimals;
  };
  if (options.sex && options.sorted === true && sizeInput === 3) {
    let allAnimals = {};
    getDirections().forEach((direction) => {
      let inputItem = [];
      let animalName;
       animals.forEach((itens) => {
         if(itens.location === direction) {
          const listAnimal = {};
           animalName = itens.residents.filter(animal => animal.sex === options.sex);
           animalName = animalName.map(currentAnimal => currentAnimal.name).sort();
           listAnimal[itens.name] = animalName;
           inputItem.push(listAnimal);
           allAnimals[direction] = inputItem;
        }});
    });
    return allAnimals;
  };
  if (options.includeNames === undefined) {
    let allAnimals = {};
    getDirections().forEach((direction) => {
      let inputItem = [];
       animals.forEach((itens) => {
         if(itens.location === direction) {
           inputItem.push(itens.name)
           allAnimals[direction] = inputItem;
        }});
    });
    return allAnimals;
    return result;
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
