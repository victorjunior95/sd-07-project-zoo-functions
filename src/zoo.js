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

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(name, minimalAge) {
  return data.animals
    .find(animal => animal.name === name)
    .residents.reduce(
      (allIsOlder, { age }) => allIsOlder && age > minimalAge,
      true,
    );
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(
    ({ firstName, lastName }) =>
      firstName === employeeName || lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  if (data.employees
    .find(({ managers }) =>
      managers
      .find(managersId => managersId === id) !== undefined)) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) managers = [];
  if (responsibleFor === undefined) responsibleFor = [];
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const animalQtds = data.animals.map(({ name, residents }) => {
      const animal = {};
      animal[name] = residents.reduce(sum => sum + 1, 0);
      return animal;
    });
    return Object.assign({}, ...animalQtds);
  }
  return data.animals
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
  const { animals } = data;
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
  const { animals } = data;
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
  const { animals } = data;
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
  const { hours } = data;
  const weekDaysAndHours = Object.entries(hours);
  if (dayName === undefined) {
    const arrayHours = weekDaysAndHours.map(toHumanReadable);
    return Object.assign({}, ...arrayHours);
  }
  const robotReadable = weekDaysAndHours.find(([weekDay]) => weekDay === dayName);
  return toHumanReadable(robotReadable);
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
