/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(el => ids.includes(el.id));
}

function animalsOlderThan(animal, age) {
  const getAnimal = data.animals.filter(({ name }) => name === animal);
  const allAges = [];
  getAnimal[0].residents.forEach(eachResident => allAges.push(eachResident.age));
  return allAges.every(cur => cur >= age);
}

function employeeByName(name) {
  const findEmployee = data.employees.filter(el => el.firstName === name || el.lastName === name);
  return typeof name !== 'undefined' ? findEmployee[0] : {};
}

function createEmployee(personalInfo, associatedWith) {
  const newObj = { ...personalInfo, ...associatedWith };
  data.employees.push(newObj);
  return newObj;
}

function isManager(id) {
  const listOfManagers = [];
  data.employees.forEach((each) => {
    each.managers.forEach(inside => listOfManagers.push(inside));
  });
  return listOfManagers.some(item => item === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (typeof managers === 'undefined') {
    managers = [];
  }
  if (typeof responsibleFor === 'undefined') {
    responsibleFor = [];
  }
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
  return newEmployee;
}

const amoutOfAnimals = (species) => {
  let result;
  data.animals.forEach((animal) => {
    if (animal.name === species) {
      result = animal.residents.length;
    }
  });
  return result;
};

function animalCount(species) {
  let getAnimals = {};
  if (typeof species !== 'undefined') {
    getAnimals = amoutOfAnimals(species);
  } else {
    data.animals.forEach((eachAnimal) => {
      getAnimals[eachAnimal.name] = eachAnimal.residents.length;
    });
  }
  return getAnimals;
}

const sumPrice = (entrants) => {
  const prices = data.prices;
  const values = Object.values(entrants);
  const keys = Object.keys(entrants);

  const replaceKeys = [];

  keys.forEach((key) => {
    replaceKeys.push(key.replace(key, prices[key]));
  });

  const sum = replaceKeys.reduce((acc, cur, idx) => acc + (cur * values[idx]), 0);
  return sum;
};

function entryCalculator(entrants) {
  let result;
  if (
    typeof entrants === 'undefined' ||
    Object.entries(entrants).length === 0
  ) {
    result = 0;
  } else {
    result = sumPrice(entrants);
  }
  return result;
}

function retrieveAvailableLocations() {
  return ['NE', 'E', 'NW', 'SW', 'SE'];
}

function retriveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map( (animal) => animal.name);

      if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
}

function retrieveAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
      .filter((resident) => {
        const needFiltering = sex != undefined;
        return needFiltering ? resident.sex === sex : true;
      })
      .map((resident) => resident.name);

      if (sorted) residents.sort();

      return { [animalName]: residents};
    });

    if(filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  })

  return animalsPerLocation;
}

function retrieveFilteredAnimalsByLocation(location) {
  return animals
  .filter((animal) => animal.location === location);
}

function animalMap(options = {}) {
  const locations = retrieveAvailableLocations();

  const {includeNames = false, sorted = false, sex} = options;
  
  if (includeNames) {
    return retrieveAnimalsPerLocationWithName(locations, sorted, sex);
  } else {
    return retriveAnimalsPerLocation(locations);
  }
}

console.log(animalMap(true, true, 'male'));

const setHours = (open, close) => {
  let result;
  if (close > 12) {
    close -= 12;
  }
  if (open === 0 && close === 0) {
    result = 'CLOSED';
  } else {
    result = `Open from ${open}am until ${close}pm`;
  }
  return result;
};

function schedule(options) {
  const days = Object.keys(data.hours);
  const hours = Object.values(data.hours);

  const result = {};
  if (typeof options === 'undefined') {
    days.forEach((day, index) => {
      const hour = setHours(hours[index].open, hours[index].close);
      result[day] = hour;
      index += 1;
    });
  } else {
    const hour = setHours(data.hours[options].open, data.hours[options].close);
    result[options] = hour;
  }
  return result;
}

schedule('Monday');

const oldestAnimal = (listOfAnimals) => {
  const result = listOfAnimals.reduce((old, age) => {
    let returning;
    if (age.age > old.age) {
      returning = age;
    } else {
      returning = old;
    }
    return returning;
  });
  return result;
};

function oldestFromFirstSpecies(id) {
  let result;
  data.employees.forEach((employee) => {
    if (employee.id === id) {
      const specie = employee.responsibleFor[0];

      data.animals.forEach((animal) => {
        if (animal.id === specie) {
          result = Object.values(oldestAnimal(animal.residents));
        }
      });
    }
  });
  return result;
}

function increasePrices(percentage) {
  const keys = Object.keys(data.prices);
  const values = Object.values(data.prices);
  values.forEach((price, index) => {
    const percent = Math.round((price + ((percentage / 100) * (price + 0.01))) * 100) / 100;
    data.prices[keys[index]] = percent;
    index += 1;
  });
  return data.prices;
}

const getAnimals = (employee, animalsArr) => {
  employee.responsibleFor.forEach((animalsId) => {
    data.animals.forEach((animal) => {
      if (animal.id === animalsId) {
        animalsArr.push(animal.name);
      }
    });
  });
};

const getAllEmployees = (newObj) => {
  data.employees.forEach((employee) => {
    const animalsArr = [];
    getAnimals(employee, animalsArr);
    newObj[`${employee.firstName} ${employee.lastName}`] = animalsArr;
  });
  return newObj;
};

const getSpecificEmployees = (idOrName, newObj) => {
  data.employees.forEach((emp) => {
    const animalsArr = [];
    if (emp.id === idOrName || emp.firstName === idOrName || emp.lastName === idOrName) {
      getAnimals(emp, animalsArr);
      newObj[`${emp.firstName} ${emp.lastName}`] = animalsArr;
    }
  });
  return newObj;
};

function employeeCoverage(idOrName) {
  const newObj = {};
  if (typeof idOrName === 'undefined') {
    getAllEmployees(newObj);
  } else {
    getSpecificEmployees(idOrName, newObj);
  }
  // console.log(newObj);
  return newObj;
}

// employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad');

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
