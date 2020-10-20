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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal);
  return species.residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const x = employeeName;
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(employee => employee.firstName === x || employee.lastName === x);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const person = employees.find(employee => employee.id === id);
  if (person.managers.length === 1) {
    return true;
  }
  return false;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const counter = {};
    animals.forEach((animal) => {
      counter[animal.name] = animal.residents.length;
    });
    return counter;
  }
  const animal = animals.find(specie => specie.name === species);
  return animal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let price = 0;
  const keys = Object.keys(entrants);
  keys.forEach((key) => {
    price += entrants[key] * prices[key];
  });
  return price;
}


function animalsByRegion() {
  const initialObj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  return animals.reduce((acc, specie) => {
    return {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        specie.name,
      ],
    };
  }, initialObj);
}

function animalsByRegionWithName() {
  const initialObj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  return animals.reduce((acc, specie) => {
    return {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        { [specie.name]: specie.residents.map(resident => resident.name) },
      ],
    };
  }, initialObj);
}

function animalsByRegionWithNameSorted() {
  const initialObj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  return animals.reduce((acc, specie) => {
    return {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        { [specie.name]: specie.residents.map(resident => resident.name).sort() },
      ],
    };
  }, initialObj);
}

function malesByRegionWithName() {
  const initialObj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  return animals.reduce((acc, specie) => {
    return {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        { [specie.name]: specie.residents.filter((resident) => {
          return resident.sex === 'male';
        }).map(resident => resident.name) },
      ],
    };
  }, initialObj);
}

function malesByRegionWithNameSorted() {
  const initialObj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  return animals.reduce((acc, specie) => {
    return {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        { [specie.name]: specie.residents.filter((resident) => {
          return resident.sex === 'male';
        }).map(resident => resident.name).sort() },
      ],
    };
  }, initialObj);
}

function femalesByRegionWithName() {
  const initialObj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  return animals.reduce((acc, specie) => {
    return {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        { [specie.name]: specie.residents.filter((resident) => {
          return resident.sex === 'female';
        }).map(resident => resident.name) },
      ],
    };
  }, initialObj);
}

function femalesByRegionWithNameSorted() {
  const initialObj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  return animals.reduce((acc, specie) => {
    return {
      ...acc,
      [specie.location]: [
        ...acc[specie.location],
        { [specie.name]: specie.residents.filter((resident) => {
          return resident.sex === 'female';
        }).map(resident => resident.name).sort() },
      ],
    };
  }, initialObj);
}

function animalMap(options) {
  if (!options || !options.includeNames) {
    return animalsByRegion();
  }
  if (options.sorted && options.includeNames && !options.sex) {
    return animalsByRegionWithNameSorted();
  }
  if (!options.sorted && options.includeNames && options.sex === 'male') {
    return malesByRegionWithName();
  }
  if (!options.sorted && options.includeNames && options.sex === 'female') {
    return femalesByRegionWithName();
  }
  if (options.sorted && options.includeNames && options.sex === 'male') {
    return malesByRegionWithNameSorted();
  }
  if (options.sorted && options.includeNames && options.sex === 'female') {
    return femalesByRegionWithNameSorted();
  }
  if (options.includeNames) {
    return animalsByRegionWithName();
  }
  return null;
}

function schedule(dayName) {
  const calendar = {};
  Object.keys(hours).forEach((day) => {
    if (hours[day].open !== 0 && hours[day].close !== 0) {
      calendar[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      calendar[day] = 'CLOSED';
    }
  });
  if (dayName === undefined) {
    return calendar;
  }
  return { [dayName]: calendar[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employeePerId = employees.find(employee => employee.id === id);
  const animalResponsible = animals.find((animal) => {
    return animal.id === employeePerId.responsibleFor[0];
  });
  const oldestSpecie = animalResponsible.residents.reduce((previous, curr) => {
    return previous.age < curr.age ? curr : previous;
  });
  return [oldestSpecie.name, oldestSpecie.sex, oldestSpecie.age];
}

function increasePrices(percentage) {
  const factor = percentage / 100;
  prices.Adult = (prices.Adult + (prices.Adult * factor)).toFixed(3);
  prices.Senior = (prices.Senior + (prices.Senior * factor)).toPrecision(4);
  prices.Child = (prices.Child + (prices.Child * factor)).toPrecision(4);
}

function employeeCoverage(idOrName) {
  //  FUNCTION
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
