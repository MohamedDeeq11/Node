const calculateSalesByDay = (data, yearlySales, fromDate, toDate, salesPersonId) => {
  if (!data[salesPersonId]) {
    throw new Error(`Sales person not found: ${salesPersonId}`);
  }

  const monthlyAmount = yearlySales / 12;
  const filteredSales = data[salesPersonId].sales.filter(sale => {
    const saleDate = new Date(sale);
    return saleDate >= new Date(fromDate) && saleDate <= new Date(toDate);
  });

  const monthlyTargets = [];
  const workingDaysExcludedFridays = [];

  for (let currentDate = new Date(fromDate); currentDate <= new Date(toDate); currentDate.setMonth(currentDate.getMonth() + 1, 1)) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    let workingDaysCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = new Date(year, month - 1, day).getDay();
      if (dayOfWeek !== 5) {
        workingDaysCount++;
      }
    }

    if (workingDaysCount > 0) {
      monthlyTargets.push(monthlyAmount / workingDaysCount);
      workingDaysExcludedFridays.push(workingDaysCount);
    }
  }

  const countDaysWorkedExcludingFridays = (from, to) => {
    let workingDaysCount = 0;
    let currentDate = new Date(from);

    while (currentDate <= new Date(to)) {
      if (currentDate.getDay() !== 5) {
        workingDaysCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return workingDaysCount;
  };

  return {
    monthlyTargets,
    totalTarget: filteredSales.length * monthlyAmount,
    workingDaysExcludedFridays,
    daysWorkedExcludingFridays: countDaysWorkedExcludingFridays(fromDate, toDate),
  };
};

const Data = {
  "1": {
    id: 1,
    name: "Mohamed Ahmed Ali",
    sales: [
      "2023-01-01",
      "2023-02-01",
      "2023-03-01",
      "2023-04-01",
      "2023-05-01",
      "2023-06-01",
      "2023-07-01",
      "2023-08-01",
      "2023-09-01",
      "2023-10-01",
      "2023-11-01",
      "2023-12-01",
    ],
  },
};
console.log(calculateSalesByDay(Data, 5220, "2023-01-01", "2023-01-30", 1));