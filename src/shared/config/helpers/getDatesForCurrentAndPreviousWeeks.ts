export function getDatesForCurrentAndPreviousWeeks() {
  const today = new Date();
  const currentDay = today.getDay(); // Получаем текущий день недели (0 - воскресенье, 1 - понедельник, и так далее)

  // Вычисляем даты для текущей недели (пн-вс)
  const currentWeek = [];
  const firstDayOfWeek = new Date(today); // Создаем копию текущей даты
  firstDayOfWeek.setDate(today.getDate() - currentDay + 1); // Перемещаемся на понедельник текущей недели
  firstDayOfWeek.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    currentWeek.push(new Date(firstDayOfWeek)); // Добавляем каждый день текущей недели
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1); // Переходим к следующему дню
  }

  // Вычисляем даты для предыдущей недели (пн-вс)
  const previousWeek = [];
  const firstDayOfPreviousWeek = new Date(today);
  firstDayOfPreviousWeek.setDate(
    today.getDate() - currentDay - 6
  );
  firstDayOfPreviousWeek.setHours(0, 0, 0, 0);
    
  for (let i = 0; i < 7; i++) {
    previousWeek.push(new Date(firstDayOfPreviousWeek)); // Добавляем каждый день предыдущей недели
    firstDayOfPreviousWeek.setDate(firstDayOfPreviousWeek.getDate() + 1); // Переходим к следующему дню
  }


  return { currentWeek, previousWeek };
}
