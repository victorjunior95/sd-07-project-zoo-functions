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

const data = require('./data');

const { animals, employees, hours } = data;

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(name, minimalAge) {
  return animals
    .find(animal => animal.name === name)
    .residents.every(({ age }) => age > minimalAge);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(
    ({ firstName, lastName }) =>
      firstName === employeeName || lastName === employeeName,
  );
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const animalQtds = animals.map(({ name, residents }) => {
      const animal = {};
      animal[name] = residents.reduce(sum => sum + 1, 0);
      return animal;
    });
    return Object.assign({}, ...animalQtds);
  }
  return animals
    .find(({ name }) => name === species)
    .residents.reduce(sum => sum + 1, 0);
}

function entryCalculator(entrants) {
  const { prices } = data;
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const keys = Object.keys(entrants);
  return keys.reduce((total, key) => {
    const number = entrants[key];
    return total + (number * prices[key]);
  }, 0);
}

const createEmptyAnimalMap = () => {
  const emptyAnimalMap = {};
  animals
    .map(({ location }) => location)
    .forEach((location) => {
      if (!{}.hasOwnProperty.call(emptyAnimalMap, location)) {
        emptyAnimalMap[location] = [];
      }
    });
  return emptyAnimalMap;
};

const listWithoutNames = ({ name }) => name;
const listWithNames = ({ name: species, residents }) => {
  const object = {};
  object[species] = residents.map(({ name }) => name);
  return object;
};

const generateMapWithoutOptions = (directions, func) => {
  const arrayAnimalMap = directions.map((direction) => {
    const object = {};
    object[direction] = animals
      .filter(({ location }) => location === direction)
      .map(func);
    return object;
  });
  return arrayAnimalMap;
};

const sortAnimalMap = (arrayAnimalMap) => {
  const species = arrayAnimalMap.map(animal => Object.keys(animal));
  for (let index = 0; index < arrayAnimalMap.length; index += 1) {
    arrayAnimalMap[index][species[index]].sort();
  }
  return arrayAnimalMap;
};
const generateMapWithOptions = (directions, func, sex, sorted) => {
  const arrayAnimalMap = directions.map((direction) => {
    const object = {};
    let animalsInThisLocation = animals
      .filter(({ location }) => location === direction);
    if (sex === 'female' || sex === 'male') {
      animalsInThisLocation = animalsInThisLocation.map(({ name, residents }) => ({
        name,
        residents: residents.filter(resident => resident.sex === sex),
      }));
    }
    object[direction] = animalsInThisLocation.map(func);

    if (sorted) {
      object[direction] = sortAnimalMap(object[direction]);
    }
    return object;
  });
  return arrayAnimalMap;
};
function animalMap(options) {
  const animalsPerLocation = createEmptyAnimalMap();
  const directions = Object.keys(animalsPerLocation);
  let arrayAnimalMap = [];
  let func = () => {};
  if (options === undefined) {
    func = listWithoutNames;
    arrayAnimalMap = generateMapWithoutOptions(directions, func);
  } else {
    const { includeNames = false, sex = 'both', sorted = false } = options;
    if (!includeNames) {
      func = listWithoutNames;
      arrayAnimalMap = generateMapWithoutOptions(directions, func);
    } else {
      func = listWithNames;
      arrayAnimalMap = generateMapWithOptions(directions, func, sex, sorted);
    }
  }
  return Object.assign({}, ...arrayAnimalMap);
}

const convert24to12 = (hour) => {
  if (hour <= 12) {
    return `${hour}am`;
  }
  return `${hour - 12}pm`;
};

const toHumanReadable = ([weekDay, { open, close }]) => {
  const weekDayHumanReadable = {};
  if (open === close) {
    weekDayHumanReadable[weekDay] = 'CLOSED';
  } else {
    weekDayHumanReadable[weekDay] = `Open from ${convert24to12(open)} until ${convert24to12(close)}`;
  }
  return weekDayHumanReadable;
};
function schedule(dayName) {
  const weekDaysAndHours = Object.entries(hours);
  if (dayName === undefined) {
    const arrayHours = weekDaysAndHours.map(toHumanReadable);
    return Object.assign({}, ...arrayHours);
  }
  const robotReadable = weekDaysAndHours.find(([weekDay]) => weekDay === dayName);
  return toHumanReadable(robotReadable);
}

function oldestFromFirstSpecies(id) {
  const { responsibleFor } = employees
    .find(({ id: employeeId }) => employeeId === id);
  const { residents } = animals
    .find(({ id: animalId }) => responsibleFor[0] === animalId);
  const oldest = residents.reduce((olderResident, resident) => {
    if (resident.age > olderResident.age) {
      return resident;
    }
    return olderResident;
  });
  return Object.values(oldest);
}

function increasePrices(percentage) {
  const { prices } = data;
  const arrayPrices = Object.entries(prices).map(([key, price]) => {
    const object = {};
    const newPrice = (price * (1 + (percentage / 100))) + 0.005;
    object[key] = parseFloat(newPrice.toFixed(2));
    return object;
  });
  data.prices = Object.assign({}, ...arrayPrices);
}

const idToAnimalName = idArray => idArray.map(idAnimal => animals
    .find(({ id }) => id === idAnimal))
    .map(({ name }) => name);

const responsibleForAssign = (employee) => {
  const { firstName, lastName } = employee;
  const animalsNames = idToAnimalName(employee.responsibleFor);
  const object = {};
  object[`${firstName} ${lastName}`] = animalsNames;
  return object;
};

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const arrayEmployee = employees.map(employee => responsibleForAssign(employee));
    return Object.assign({}, ...arrayEmployee);
  }
  const findEmployee = ({
    id,
    firstName,
    lastName,
  }) => idOrName === id || idOrName === firstName || idOrName === lastName;
  const employee = employees.find(findEmployee);
  return responsibleForAssign(employee);
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
