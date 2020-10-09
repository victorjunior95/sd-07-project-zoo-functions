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

const { animals, employees, hours, prices } = require('./data');

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(anim, age) {
  return animals.find(({ name }) => name === anim).residents.every(e => e.age > age);
}

function employeeByName(name) {
  if (name === undefined) return {};

  return (
    employees.find(({ firstName, lastName }) => firstName === name || lastName === name)
  );
}

function createEmployee(info, association) {
  return { ...info, ...association };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.some(man => man === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, { name, residents }) => {
      Object.assign(acc, { [name]: residents.length });
      return acc;
    }, {});
  }

  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;

  const { Adult = 0, Senior = 0, Child = 0 } = entrants;

  const adultPrice = prices.Adult * Adult;
  const seniorPrice = prices.Senior * Senior;
  const childPrice = prices.Child * Child;

  return adultPrice + seniorPrice + childPrice;
}

function animalMap(options) {
  return animals.reduce((acc2, { location }) => {
    const listAnimals = animals.reduce((acc, { name, location: location2, residents }) => {
      if (options === undefined || options.includeNames === undefined) {
        if (location2 === location) acc.push(name);
        return acc;
      }

      const animalNames = [];

      if (options.sex === 'female') {
        residents.forEach((animal) => {
          if (animal.sex === 'female') {
            animalNames.push(animal.name);
          }
        });
      } else {
        residents.forEach((animal) => {
          animalNames.push(animal.name);
        });
      }

      if (options.sorted) animalNames.sort();

      if (location2 === location) acc.push({ [name]: animalNames });
      return acc;
    }, []);

    if (acc2[location] === undefined) acc2 = { ...acc2, [location]: listAnimals };
    return acc2;
  }, {});
}

function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
  }

  let result = {};

  dayName.forEach((day) => {
    const open = hours[day].open;
    const close = hours[day].close;

    if (day === 'Monday') {
      result = { ...result, [day]: 'CLOSED' };
    } else {
      result = { ...result, [day]: `Open from ${open}am until ${close - 12}pm` };
    }
  });

  return result;
}

function oldestFromFirstSpecies(id) {
  const employee = employees.find(each => each.id === id);
  const specie = employee.responsibleFor[0];
  const { residents } = animals.find(name => name.id === specie);

  const {
    name,
    sex,
    age,
  } = residents.reduce((acc, animal) => (acc.age > animal.age ? acc : animal));

  return [name, sex, age];
}

function increasePrices(percentage) {
  const keys = Object.keys(prices);

  keys.forEach((person) => {
    const percentageCalc = prices[person] + (prices[person] * (percentage / 100));
    prices[person] = Math.round(percentageCalc * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  let employeeData = null;

  if (idOrName === undefined) {
    employeeData = employees;
  } else {
    employeeData = employees.filter(emp =>
      idOrName === emp.id || idOrName === emp.firstName || idOrName === emp.lastName);
  }

  return employeeData.reduce((acc, emp) => {
    const employeeName = `${emp.firstName} ${emp.lastName}`;

    const animalsToCare = emp.responsibleFor.map((id) => {
      const foundAnimals = animals.filter(animal => animal.id === id);
      const [{ name }] = foundAnimals;
      return name;
    });

    acc = { ...acc, [employeeName]: animalsToCare };
    return acc;
  }, {});
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
