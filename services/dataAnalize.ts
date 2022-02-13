import { usersRepository } from '../repositories';

export async function analizedData(gender, age, job, alive, family) {
  const usersData = await usersRepository.dataAnalize(
    gender,
    age,
    job,
    alive,
    family
  );

  const goalMoney1Ratio = {
    zeroMillion: 0,
    tenMillion: 0,
    twentyMillion: 0,
    thirtyMillion: 0,
    fortyMillion: 0,
    fiftyMillion: 0,
    sixtyMillion: 0,
    seventyMillion: 0,
    eightyMillion: 0,
    ninetyMillion: 0,
  };
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].goalMoney1 < 10000000) {
      goalMoney1Ratio.zeroMillion += 1;
    } else if (usersData[i].goalMoney1 < 20000000) {
      goalMoney1Ratio.tenMillion += 1;
    } else if (usersData[i].goalMoney1 < 30000000) {
      goalMoney1Ratio.twentyMillion += 1;
    } else if (usersData[i].goalMoney1 < 40000000) {
      goalMoney1Ratio.thirtyMillion += 1;
    } else if (usersData[i].goalMoney1 < 50000000) {
      goalMoney1Ratio.fortyMillion += 1;
    } else if (usersData[i].goalMoney1 < 60000000) {
      goalMoney1Ratio.fiftyMillion += 1;
    } else if (usersData[i].goalMoney1 < 70000000) {
      goalMoney1Ratio.sixtyMillion += 1;
    } else if (usersData[i].goalMoney1 < 80000000) {
      goalMoney1Ratio.seventyMillion += 1;
    } else if (usersData[i].goalMoney1 < 90000000) {
      goalMoney1Ratio.eightyMillion += 1;
    } else if (usersData[i].goalMoney1 < 100000000) {
      goalMoney1Ratio.ninetyMillion += 1;
    }
  }
  const goalMoney2Ratio = {
    zeroMillion: 0,
    tenMillion: 0,
    twentyMillion: 0,
    thirtyMillion: 0,
    fortyMillion: 0,
    fiftyMillion: 0,
    sixtyMillion: 0,
    seventyMillion: 0,
    eightyMillion: 0,
    ninetyMillion: 0,
  };
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].goalMoney2 < 10000000) {
      goalMoney2Ratio.zeroMillion += 1;
    } else if (usersData[i].goalMoney2 < 20000000) {
      goalMoney2Ratio.tenMillion += 1;
    } else if (usersData[i].goalMoney2 < 30000000) {
      goalMoney2Ratio.twentyMillion += 1;
    } else if (usersData[i].goalMoney2 < 40000000) {
      goalMoney2Ratio.thirtyMillion += 1;
    } else if (usersData[i].goalMoney2 < 50000000) {
      goalMoney2Ratio.fortyMillion += 1;
    } else if (usersData[i].goalMoney2 < 60000000) {
      goalMoney2Ratio.fiftyMillion += 1;
    } else if (usersData[i].goalMoney2 < 70000000) {
      goalMoney2Ratio.sixtyMillion += 1;
    } else if (usersData[i].goalMoney2 < 80000000) {
      goalMoney2Ratio.seventyMillion += 1;
    } else if (usersData[i].goalMoney2 < 90000000) {
      goalMoney2Ratio.eightyMillion += 1;
    } else if (usersData[i].goalMoney2 < 100000000) {
      goalMoney2Ratio.ninetyMillion += 1;
    }
  }

  let sumGoalMoney1Percent = 0;
  for (let i = 0; i < usersData.length; i++) {
    sumGoalMoney1Percent += usersData[i].goalMoney1Percent;
  }
  const goalMoney1Percent = await Math.floor(
    sumGoalMoney1Percent / usersData.length
  );

  let sumGoalMoney2Percent = 0;
  for (let i = 0; i < usersData.length; i++) {
    sumGoalMoney2Percent += usersData[i].goalMoney2Percent;
  }
  const goalMoney2Percent = await Math.floor(
    sumGoalMoney2Percent / usersData.length
  );

  let sumAllPercent = 0;
  for (let i = 0; i < usersData.length; i++) {
    sumAllPercent += usersData[i].allPercent;
  }
  const allPercnet = await Math.floor(sumAllPercent / usersData.length);

  let sumPreparationPercent = 0;
  for (let i = 0; i < usersData.length; i++) {
    sumPreparationPercent += usersData[i].preparationPercent;
  }
  const preparationPercnet = await Math.floor(
    sumPreparationPercent / usersData.length
  );

  let sumMoneyPercent = 0;
  for (let i = 0; i < usersData.length; i++) {
    sumMoneyPercent += usersData[i].moneyPercent;
  }
  const moneyPercnet = await Math.floor(sumMoneyPercent / usersData.length);

  let sunTodoPercent = 0;
  for (let i = 0; i < usersData.length; i++) {
    sunTodoPercent += usersData[i].todoPercent;
  }
  const todoPercnet = await Math.floor(sunTodoPercent / usersData.length);

  const data = {
    goalMoeny1Ratio: goalMoney1Ratio,
    goalMoeny2Ratio: goalMoney2Ratio,
    goalMoney1Percent: goalMoney1Percent,
    goalMoney2Percent: goalMoney2Percent,
    allPercent: allPercnet,
    preparationPercent: preparationPercnet,
    moneyPercent: moneyPercnet,
    todoPercent: todoPercnet,
  };

  return data;
}
