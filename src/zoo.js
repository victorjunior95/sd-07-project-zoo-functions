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

//-------------------------------------------------------------------------------------

function animalsByIds(...ids) {
  const array = [];
  ids.forEach(id => array.push(animals.find(element => element.id === id)));
  return array;
}

//-------------------------------------------------------------------------------------

function animalsOlderThan(animal, age) {
  const array = animals.find(element => element.name === animal);
  return array.residents.every(element => element.age > age);
}

//-------------------------------------------------------------------------------------

function employeeByName(employeeName) {
  let obj = {};
  if (employeeName !== undefined) {
    obj = employees.find(
      element =>
        element.firstName === employeeName || element.lastName === employeeName,
    );
  }
  return obj;
}

//-------------------------------------------------------------------------------------

function createEmployee(
  { id, firstName, lastName },
  { managers, responsibleFor },
) {
  const obj = {};
  obj.id = id;
  obj.firstName = firstName;
  obj.lastName = lastName;
  obj.managers = managers;
  obj.responsibleFor = responsibleFor;
  return obj;
}

//-------------------------------------------------------------------------------------

function isManager(id) {
  const array = [];
  employees.map(element =>
    element.managers.forEach(element2 => array.push(element2)),
  );

  return array.some(element => element === id);
}

//-------------------------------------------------------------------------------------

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const obj = {};
  obj.id = id;
  obj.firstName = firstName;
  obj.lastName = lastName;
  obj.managers = managers;
  obj.responsibleFor = responsibleFor;
  employees.push(obj);
}

//-------------------------------------------------------------------------------------

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach(element => (obj[element.name] = element.residents.length));
    return obj;
  }
  let obj = {};
  obj = animals.find(element => element.name === species);
  return obj.residents.length;
}

//-------------------------------------------------------------------------------------

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  let price = 0;
  price = Adult * prices.Adult;
  price += Senior * prices.Senior;
  price += Child * prices.Child;
  return price;
}

//-------------------------------------------------------------------------------------

const retrieveAvaiableLocation = () => {
  return ['NE', 'NW', 'SE', 'SW'];
};

const retrieveFilteredAnimalsByLocation = location =>
  animals.filter(animal => animal.location === location);

// prettier-ignore
const retrieveAnimalsByLocation = (locations) => {
  const animalsPerLocation = {};

  locations.forEach(location => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map(
      animal => animal.name,
    );

    animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
};

// prettier-ignore
const retrieveAnimalsByLocationWithName = (locations, sorted, sex) => {
  const animalsPerLocation = {};

  locations.forEach(location => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map(
      (animal) => {
        const animalName = animal.name;
        const residents = animal.residents
          .filter((resident) => {
            const needFiltering = sex !== undefined;
            if (needFiltering) return resident.sex === sex;
            return true;
          })
          .map(resident => resident.name);

        if (sorted) residents.sort();

        return { [animalName]: residents };
      },
    );

    animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
};

function animalMap(options) {
  const locations = retrieveAvaiableLocation();

  if (!options || !includeNames) return retrieveAnimalsByLocation(locations);

  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames)
    return retrieveAnimalsByLocationWithName(locations, sorted, sex);
}

//-------------------------------------------------------------------------------------

function schedule(dayName) {
  const obj = {};
  obj.Tuesday = `Open from ${hours.Tuesday.open}am until 6pm`;
  obj.Wednesday = `Open from ${hours.Wednesday.open}am until 6pm`;
  obj.Thursday = `Open from ${hours.Thursday.open}am until 8pm`;
  obj.Friday = `Open from ${hours.Friday.open}am until 8pm`;
  obj.Saturday = `Open from ${hours.Saturday.open}am until 10pm`;
  obj.Sunday = `Open from ${hours.Sunday.open}am until 8pm`;
  obj.Monday = 'CLOSED';
  if (dayName === undefined) {
    return obj;
  }
  const obj2 = {};
  obj2[dayName] = obj[dayName];
  return obj2;
}

//-------------------------------------------------------------------------------------

function oldestFromFirstSpecies(id) {
  const employee = employees.find(element => element.id === id);
  const employeeId = employee.responsibleFor[0];

  const animal = animals.find(element => element.id === employeeId);
  const resident = animal.residents.sort((a, b) => {
    if (a.age < b.age) {
      return +1;
    }
    if (a.age > b.age) {
      return -1;
    }
    return 0;
  });

  const { name, sex, age } = resident[0];
  const oldest = [];
  oldest.push(name, sex, age);
  return oldest;
}

//-------------------------------------------------------------------------------------

const format = (num, decimals) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function increasePrices(percentage) {
  percentage /= 100;

  const { Adult, Senior, Child } = prices;
  const adultPercentage = Adult * percentage;
  const seniorPercentage = Senior * percentage;
  const childPercentage = Child * percentage;
  prices.Adult = parseFloat(format(Adult + adultPercentage));
  prices.Senior = parseFloat(format(Senior + seniorPercentage));
  prices.Child = parseFloat(format(Child + childPercentage));
}

//-------------------------------------------------------------------------------------

// prettier-ignore
function employeeCoverage(idOrName) {
  const array = 'Nigel Burl Ola Wilburn Stephanie Sharonda Ardith Emery';
  const obj = {};
  let option;
  if (idOrName === undefined) {
    option = employees;
  } else if (idOrName.length === 36) {
    option = employees.filter(element => element.id === idOrName);
  } else if (array.includes(idOrName)) {
    option = employees.filter(element => element.firstName === idOrName);
  } else {
    option = employees.filter(element => element.lastName === idOrName);
  }
  option.forEach((empregado) => {
    obj[`${empregado.firstName} ${empregado.lastName}`] = empregado.responsibleFor.map((id) => {
      let string = '';
      animals.forEach((animal) => {
        if (id === animal.id) {
          string = `${animal.name}`;
        }
      });
      return string;
    });
  });
  return obj;
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
