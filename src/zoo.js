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
  const coleted = [];
  const check = (idResearched) => {
    coleted.push((data.animals.find(animals => animals.id === idResearched)));
  };
  ids.forEach(check);
  return coleted;
}

function animalsOlderThan(animal, age) {
  const search = data.animals.find(species => animal === species.name).residents;
  return search.every(ages => ages.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const result = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return result;
}

function isManager(id) {
  return data.employees.some(person => person.managers.includes(id));
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees[data.employees.length] = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}


function animalCount(species) {
  if (species === undefined) {
    const result = {};
    const check = (item, index) => {
      const animals = data.animals;
      result[animals[index].name] = item.residents.length;
    };
    data.animals.forEach(check);
    return result;
  }
  let count;
  const checkAnimals = (item) => {
    if (item.name === species) {
      count = item.residents.length;
    }
  };
  data.animals.forEach(checkAnimals);

  return count;
}


function entryCalculator(entrants) {
  if (entrants === undefined || entrants === []) {
    return 0;
  }
  let sum = 0;
  const checkEntrants = (item) => {
    const checkPrices = (people) => {
      if (people === item) {
        sum += entrants[item] * data.prices[item];
      }
    };
    Object.keys(data.prices).forEach(checkPrices);
  };
  Object.keys(entrants).forEach(checkEntrants);
  return sum;
}
const animals = data.animals;
const everyLocations = () => {
  const locationsAnimals = {};
  const every = (animal, index) => {
    locationsAnimals[animals[index].location] = data.animals.filter(item =>
      item.location === animal.location).map(item => item.name);
  };
  data.animals.forEach(every);
  return locationsAnimals;
};
const everyLocationsEmpty = () => {
  const locationEmpty = {};
  const everyEmpty = (animal, index) => {
    locationEmpty[animals[index].location] = [];
  };
  animals.forEach(everyEmpty);
  return locationEmpty;
};
const locationAndNames = (sorted, sex) => {
  const names = data.animals.reduce((acc, species) => {
    let residents = species.residents.map(item => item.name);
    if (sex !== '') residents = species.residents.filter(item => item.sex === sex).map(item => item.name);
    if (sorted) residents.sort();
    return {
      ...acc,
      [species.location]: [
        ...acc[species.location],
        { [species.name]: residents },
      ],
    };
  }, everyLocationsEmpty());
  return names;
};
function animalMap(options) {
  if (!options) {
    return everyLocations();
  }
  const { includeNames = false, sorted = false, sex = '' } = options;
  if (includeNames) {
    return locationAndNames(sorted, sex);
  }
  return everyLocations();
}

function schedule(dayName) {
  const day = {};
  const everyDays = {};
  const dates = (item, index) => {
    const datesZoo = Object.keys(data.hours);
    if (item.open === 0) {
      everyDays[datesZoo[index]] = 'CLOSED';
    } else {
      everyDays[datesZoo[index]] = `Open from ${item.open}am until ${item.close - 12}pm`;
    }
  };
  const infoHours = Object.values(data.hours);
  infoHours.forEach(dates);
  if (dayName === undefined) {
    return everyDays;
  }
  day[dayName] = everyDays[dayName];
  return day;
}

function oldestFromFirstSpecies(id) {
  const searchingEmployee = data.employees.find(employee => employee.id === id);
  const searchingSpecies = data.animals.find(item =>
    item.id === searchingEmployee.responsibleFor[0]);
  let result = 0;
  const checkAge = (age) => {
    if (age.age > result) {
      result = age.age;
    }
  };
  searchingSpecies.residents.forEach(checkAge);
  const searchingAlderAnimal = searchingSpecies.residents.find(age => age.age === result);
  return [searchingAlderAnimal.name, searchingAlderAnimal.sex, searchingAlderAnimal.age];
}

function increasePrices(percentage) {
  const adult = Object.values(data.prices)[0] * Number(`0.${percentage}`);
  const resultAdult = Object.values(data.prices)[0] + adult + 0.001;
  const senior = Object.values(data.prices)[1] * Number(`0.${percentage}`);
  const resultSenior = Object.values(data.prices)[1] + senior + 0.001;
  const child = Object.values(data.prices)[2] * Number(`0.${percentage}`);
  const resultChild = Object.values(data.prices)[2] + child + 0.001;
  data.prices.Adult = parseFloat(resultAdult.toFixed(2));
  data.prices.Senior = parseFloat(resultSenior.toFixed(2));
  data.prices.Child = parseFloat(resultChild.toFixed(2));
}

const listComplete = {};
const employee = data.employees;
const complete = () => {
  const every = (employe, index) => {
    const fullName = `${employee[index].firstName} ${employee[index].lastName}`;
    listComplete[fullName] = [];
    employe.responsibleFor.forEach((item) => {
      data.animals.forEach((item1) => {
        if (item === item1.id) {
          listComplete[fullName].push(item1.name);
        }
      });
    });
  };
  data.employees.forEach(every);
  return listComplete;
};

const oneEmployee = (idOrName) => {
  const one = {};
  const checkOneEmployee = (employe, index) => {
    const employeeName = employe.responsibleFor;
    const fullName = `${employee[index].firstName} ${employee[index].lastName}`;
    if (fullName.includes(idOrName) || employe.id === idOrName) {
      one[fullName] = [];
      employeeName.forEach((item1) => {
        animals.forEach((item2) => {
          if (item1 === item2.id) {
            one[fullName].push(item2.name);
          }
        });
      });
    }
  };
  data.employees.forEach(checkOneEmployee);
  return one;
};

function employeeCoverage(idOrName) {
  if (!idOrName) {
    return complete();
  }
  return oneEmployee(idOrName);
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
