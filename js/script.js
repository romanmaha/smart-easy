const form = document.querySelector('#userForm');
let user = {};
saveForm(form);
function saveForm(el) {
  el.addEventListener('submit', function (e) {
    localStorage.setItem('userFormSubmit', true);
    user.name = document.getElementById('userName').value;
    localStorage.setItem('userName', user.name);
    user.city = document.getElementById('userCity').value;
    localStorage.setItem('userCity', user.city);
    user.temperature = document.getElementById('userTemperature').value;
    localStorage.setItem('userTemperature', user.temperature);
    user.goToWork = document.getElementById('goToWork').value;
    localStorage.setItem('goToWork', user.goToWork);
    user.comeBackFromWork = document.getElementById('comeBackFromWork').value;
    localStorage.setItem('comeBackFromWork', user.comeBackFromWork);
    document.querySelector('.loginbox').classList.add('hide');
    document.querySelector('.smarthome-wrapper').classList.remove('hide');
  });
}
let userName = localStorage.getItem('userName');
let userCity = localStorage.getItem('userCity');
let userTemperature = localStorage.getItem('userTemperature');
let goToWork = localStorage.getItem('goToWork');
let comeBackFromWork = localStorage.getItem('comeBackFromWork');
console.log(user);
console.log(userName);

// const userName = 'Роман';
// const userCity = 'Київ';
// const userTemperature = 22;
// const goToWork = 10;
// const comeBackFromWork = 18;
// console.log(user[0].name);
// console.log(userName.value, userCity.value, userTemperature.value, timeBackToWork.value, timeGoToWork.value);
if (localStorage.getItem('userFormSubmit') !== null) {
  document.querySelector('.loginbox').classList.toggle('hide');
  document.querySelector('.smarthome-wrapper').classList.toggle('hide');
}
// DragAndDrop
const tasksListElement = document.querySelector(`.main-screen-wrapper`);
const taskElements = tasksListElement.querySelectorAll(`.main-screen-item`);

// Перебираем все элементы списка и присваиваем нужное значение
for (const task of taskElements) {
  task.draggable = true;
}

tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});

tasksListElement.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
  // Получаем объект с размерами и координатами
  const currentElementCoord = currentElement.getBoundingClientRect();
  // Находим вертикальную координату центра текущего элемента
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  // Если курсор выше центра элемента, возвращаем текущий элемент
  // В ином случае — следующий DOM-элемент
  const nextElement = cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling;

  return nextElement;
};
tasksListElement.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();

  const activeElement = tasksListElement.querySelector(`.selected`);
  const currentElement = evt.target;
  const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`main-screen-item`);

  if (!isMoveable) {
    return;
  }

  // evt.clientY — вертикальная координата курсора в момент,
  // когда сработало событие
  const nextElement = getNextElement(evt.clientY, currentElement);

  // Проверяем, нужно ли менять элементы местами
  if ((nextElement && activeElement === nextElement.previousElementSibling) || activeElement === nextElement) {
    // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
    return;
  }

  tasksListElement.insertBefore(activeElement, nextElement);
});

//уведомления
const notification = document.getElementById('notification');

function createNotification(message) {
  const notif = document.createElement('div');
  notif.classList.add('notifications');

  notif.innerText = message;

  notification.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 7000);
}
//уведомления
//погода
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userCity},ua&appid=f47fb2a9d3f12b8600041082bccf9428&lang=ua`)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    document.querySelector('.city').textContent = data.name;
    document.querySelector('.weather-description').textContent = data.weather[0]['main'];
    let dateOfRequestWeather = new Date(data.dt * 1000);

    document.querySelector('.weather-date').textContent = dateOfRequestWeather.toDateString();
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
    let weatherIcon = document.querySelector('.icon');
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`);

    document.querySelector('.sunrise').textContent = 'Sunrise: ' + sunrise;
    document.querySelector('.sunset').textContent = 'Sunset: ' + sunset;
  });

//Початковий екран
const startSettings = document.querySelector('.title__confirm');
const firstScreen = document.querySelector('.first-screen');

startSettings.addEventListener('click', function () {
  localStorage.setItem('startSettings', true);
  firstScreen.classList.add('hide');
  document.querySelector('.start-settings').classList.remove('hide');
  document.querySelector('.start-menu').classList.remove('hide');
});
//local storage
if (localStorage.getItem('startSettings') !== null) {
  firstScreen.classList.add('hide');
  document.querySelector('.start-settings').classList.remove('hide');
  document.querySelector('.start-menu').classList.remove('hide');
}
document.querySelector('h2.title').textContent = `Привіт, ${userName}! Вас вітає система управління розумним будинком - SmartEasy!`;
// document.querySelectorAll("input[type='checkbox']").forEach((el) => {
//   el.onchange = () => localStorage.setItem(el.id, el.checked);
//   el.checked = localStorage.getItem(el.id) === 'true';
// });

// Панель кнопок
const lightButton = document.querySelector('#menuLightButton');
const lightSettings = document.querySelector('#light');
const airConditionButton = document.querySelector('#menuAirConditionButton');
const airConditionSettings = document.querySelector('#air-condition');
const garageButton = document.querySelector('#menuGarageButton');
const garageSettings = document.querySelector('#garage');
const heatingButton = document.querySelector('#menuGeatingButton');
const heatingSettings = document.querySelector('#heating');
const tvButton = document.querySelector('#menuTVButton');
const tvSettings = document.querySelector('#tv');
const jalouiseButton = document.querySelector('#menuJalouiseButton');
const jalouiseSettings = document.querySelector('#jalouise');
const mediaButton = document.querySelector('#menuMusicButton');
const mediaSettings = document.querySelector('#media');
const securityButton = document.querySelector('#menuSecurityButton');
const securitySettings = document.querySelector('#security');
const staticMenu = document.querySelector('.menu');
const weatherForecastButton = document.querySelector('#weatherForecast');
const weatherScreen = document.querySelector('.weather-container');
// lightButton.addEventListener("click", () => {
//   if (lightButton.checked) {
//     lightSettings.classList.remove("hide");
//     document.querySelector(".start-settings").classList.add("hide");
//     document.querySelector(".start-menu").classList.remove("start-menu");
//     staticMenu.classList.add("menu-static");
//   } else {
//     lightSettings.classList.add("hide");
//     document.querySelector(".start-settings").classList.add("hide");
//     document.querySelector(".start-menu").classList.remove("start-menu");
//     staticMenu.classList.add("menu-static");
//     localStorage.removeItem("menuLightButton");
//   }
// });

// if (localStorage.getItem("menuLightButton") !== null) {
//   lightSettings.classList.remove("hide");
//   document.querySelector(".start-settings").classList.add("hide");
//   document.querySelector(".start-menu").classList.remove("start-menu");
//   staticMenu.classList.add("menu-static");
// }
// if (localStorage.getItem("menuLightButton") === "false") {
//   lightSettings.classList.add("hide");
//   document.querySelector(".start-settings").classList.add("hide");
//   document.querySelector(".start-menu").classList.remove("start-menu");
//   staticMenu.classList.add("menu-static");
// }

function showSettings(button, panel) {
  button.addEventListener('click', () => {
    if (button.checked) {
      panel.classList.remove('hide');
      document.querySelector('.start-settings').classList.add('hide');
      document.querySelector('.start-menu').classList.remove('start-menu');
      staticMenu.classList.add('menu-static');
    } else {
      panel.classList.add('hide');
      document.querySelector('.start-settings').classList.add('hide');
      document.querySelector('.start-menu').classList.remove('start-menu');
      staticMenu.classList.add('menu-static');
    }
  });
}

showSettings(airConditionButton, airConditionSettings);
showSettings(lightButton, lightSettings);
showSettings(garageButton, garageSettings);
showSettings(heatingButton, heatingSettings);
showSettings(tvButton, tvSettings);
showSettings(jalouiseButton, jalouiseSettings);
showSettings(mediaButton, mediaSettings);
showSettings(securityButton, securitySettings);
showSettings(weatherForecastButton, weatherScreen);

/// Світло

function lightControl() {
  const switchLight = document.getElementById('switch-light');
  const switchExtraLight = document.querySelector('#switch-extralight');
  const switchRelaxMode = document.querySelector('#switch-relaxmode');
  const slider = document.getElementById('lightBrightnessRange');
  const output = document.getElementById('lightBrightnessValue');
  slider.value = 0;
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = this.value;
  };
  // включити виключити світло
  switchLight.addEventListener('change', function () {
    if (switchLight.checked && switchExtraLight.checked === false) {
      slider.disabled = false;
      slider.value = 70;
      output.innerHTML = slider.value;
      createNotification('Світло включено. Яскравість: 70%');
    } else if (switchLight.checked && switchExtraLight.checked) {
      slider.disabled = false;
      slider.value = 90;
      output.innerHTML = slider.value;
      createNotification('Основне і додаткове світло включено. Яскравість: 90%');
    } else if (switchLight.checked == false && switchExtraLight.checked) {
      slider.disabled = false;
      slider.value = 50;
      output.innerHTML = slider.value;
      createNotification('Основне світло виключено. Включено додаткове світло. Яскравість: 50%');
    } else if (switchLight.checked && switchRelaxMode.checked && switchExtraLight.checked) {
      switchRelaxMode.checked = false;
      slider.disabled = false;
      slider.value = 70;
      output.innerHTML = slider.value;
      createNotification('Основне і додаткове світло включено. Яскравість: 90%');
    } else {
      slider.disabled = true;
      slider.value = 0;
      output.innerHTML = slider.value;
      createNotification('Світло виключено.');
    }
  });
  /// Включити виключити додаткове світло
  switchExtraLight.addEventListener('change', function () {
    if (switchExtraLight.checked && switchLight.checked === false) {
      slider.disabled = false;
      slider.value = 50;
      output.innerHTML = slider.value;
      createNotification('Додаткове світло включено. Яскравість: 50%');
    }
    if (switchExtraLight.checked && switchLight.checked) {
      slider.disabled = false;
      slider.value = 90;
      output.innerHTML = slider.value;
      createNotification('Додаткове світло включено. Яскравість: 90%');
    } else if (switchExtraLight.checked === false && switchLight.checked) {
      slider.disabled = false;
      slider.value = 70;
      output.innerHTML = slider.value;
      createNotification('Додаткове світло виключено. Основне світло включено. Яскравість: 70%');
    } else {
      if (switchExtraLight.checked === false && switchLight.checked === false) {
        createNotification('Додаткове світло виключено');
      }
    }
  });
  /// Включити виключити релакс режим
  switchRelaxMode.addEventListener('change', function () {
    const isCloseMusic = mediaSettings.classList.contains('hide');
    if (switchRelaxMode.checked && switchLight.checked === false && switchExtraLight.checked === false) {
      switchExtraLight.checked = true;

      if (isCloseMusic) {
        mediaSettings.classList.remove('hide');
        playSong();
      }
      if (isCloseMusic === false) {
        playSong();
      }

      slider.disabled = true;
      slider.value = 30;
      output.innerHTML = slider.value;
      createNotification('Релакс режим включений. Яскравість 30%');
    } else if (switchRelaxMode.checked === false && switchLight.checked === false && switchExtraLight.checked === true) {
      switchExtraLight.checked = false;
      switchLight.checked = true;
      slider.disabled = true;
      slider.value = 70;
      output.innerHTML = slider.value;
      if (isCloseMusic) {
        mediaSettings.classList.remove('hide');
        playSong();
      }
      if (isCloseMusic === false) {
        playSong();
      }
      createNotification('Релакс режим виключений. Основне світло включено. Яскравість 70%');
      pauseSong();
    } else if (switchRelaxMode.checked && switchLight.checked === true && switchExtraLight.checked === false) {
      switchExtraLight.checked = true;
      switchLight.checked = false;
      slider.disabled = true;
      slider.value = 30;
      output.innerHTML = slider.value;
      if (isCloseMusic) {
        mediaSettings.classList.remove('hide');
        playSong();
      }
      if (isCloseMusic === false) {
        playSong();
      }
      createNotification('Релакс режим включений. Основне світло виключено. Яскравість 30%');
    } else if (switchRelaxMode.checked && switchLight.checked === false && switchExtraLight.checked === true) {
      slider.disabled = true;
      slider.value = 30;
      output.innerHTML = slider.value;
      if (isCloseMusic) {
        mediaSettings.classList.remove('hide');
        playSong();
      }
      if (isCloseMusic === false) {
        playSong();
      }
      createNotification('Релакс режим включений. Яскравість 30%');
    } else if (switchRelaxMode.checked && switchLight.checked && switchExtraLight.checked) {
      switchLight.checked = false;
      slider.disabled = true;
      slider.value = 30;
      output.innerHTML = slider.value;
      if (isCloseMusic) {
        mediaSettings.classList.remove('hide');
        playSong();
      }
      if (isCloseMusic === false) {
        playSong();
      }
      createNotification('Релакс режим включений. Яскравість 30%');
    } else {
      pauseSong();
      createNotification('Релакс режим виключений');
      mediaSettings.classList.add('hide');
    }
  });
}
lightControl();

/// Управління кондиціонером
function airCondionControl() {
  const switchAirCondion = document.querySelector('#switch-air-condion');
  const heatingMode = document.querySelector('.heating-mode');
  const coolingMode = document.querySelector('.cooling-mode');
  const decreaseTemperature = document.querySelector('.decrease-temperature');
  const addTemperature = document.querySelector('.add-temperature');
  const outputTemperature = document.querySelector('#temperature');

  switchAirCondion.addEventListener('change', function () {
    if (switchAirCondion.checked) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userCity},ua&appid=f47fb2a9d3f12b8600041082bccf9428&lang=ua`)
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          const weatherTemperature = Math.round(data.main.temp - 273);
          if (weatherTemperature < 20) {
            createNotification(
              `Кондиціонер включений. Температура повітря в місті ${userCity} сьогодні: ${weatherTemperature} градусів! Рекомендуємо обрати режим обігріву`
            );
            heatingMode.disabled = false;
            coolingMode.disabled = false;
            outputTemperature.disabled = false;
            weatherScreen.classList.remove('hide');
          } else {
            createNotification(`Кондиціонер виключений.`);
            heatingMode.disabled = false;
            coolingMode.disabled = false;
            outputTemperature.disabled = false;
            weatherScreen.classList.remove('hide');
          }
        });

      heatingMode.addEventListener('change', function () {
        if (heatingMode.checked) {
          coolingMode.checked = false;
          outputTemperature.value = userTemperature;
          createNotification('Кондиціонер включений і працює в режимі обігріву');
        }
      });
      coolingMode.addEventListener('change', function () {
        if (coolingMode.checked) {
          heatingMode.checked = false;
          outputTemperature.value = userTemperature;
          createNotification('Кондиціонер включений і працює в режимі охолодження');
        }
      });
      decreaseTemperature.addEventListener('click', function () {
        if (heatingMode.checked && outputTemperature.value > 20 && outputTemperature.value <= 30) {
          outputTemperature.value--;
          createNotification('Кондиціонер в режимі обігріву. Температура: ' + outputTemperature.value + ' градусів!');
        } else if (heatingMode.checked && outputTemperature.value <= 20) {
          createNotification('20 градусів це мінімальна температура для режиму обігрів');
        } else if (coolingMode.checked && outputTemperature.value > 16 && outputTemperature.value <= 26) {
          outputTemperature.value--;
          createNotification('Кондиціонер в режимі охолодження. Температура: ' + outputTemperature.value + ' градусів!');
        } else if (heatingMode.checked && outputTemperature.value <= 20) {
          createNotification('20 градусів це мінімальна температура для режиму обігрів');
        } else if (coolingMode.checked && outputTemperature.value <= 16) {
          createNotification('16 градусів це мінімальна температура для режиму охолодження!');
        }
      });
      addTemperature.addEventListener('click', function () {
        if (heatingMode.checked && outputTemperature.value >= 20 && outputTemperature.value < 30) {
          outputTemperature.value++;
          createNotification('Кондиціонер в режимі обігріву. Температура: ' + outputTemperature.value + ' градусів!');
        } else if (heatingMode.checked && outputTemperature.value >= 30) {
          createNotification('30 градусів це максимальна температура для режиму обігрів');
        } else if (coolingMode.checked && outputTemperature.value >= 16 && outputTemperature.value < 26) {
          outputTemperature.value++;
          createNotification('Кондиціонер в режимі охолодження. Температура: ' + outputTemperature.value + ' градусів!');
        } else if (coolingMode.checked && outputTemperature.value >= 26) {
          createNotification('26 градусів це максимальна температура для режиму охолодження');
        }
      });
    } else {
      createNotification('Кондиціонер виключений');
      heatingMode.checked = false;
      coolingMode.checked = false;
      heatingMode.disabled = true;
      coolingMode.disabled = true;
      outputTemperature.disabled = true;
      outputTemperature.value = 18;
    }
  });
}
airCondionControl();
// гараж

function garageControls() {
  const openCloseGarageDoors = document.getElementById('garageDoors');
  const garageVentilation = document.getElementById('garageVentilation');
  const smartModeCharging = document.getElementById('smartModeCharging');
  const autoCharging = document.getElementById('autoCharging');

  openCloseGarageDoors.addEventListener('change', function () {
    if (openCloseGarageDoors.checked) {
      createNotification('Ворота в гаражі відчинені');
    } else {
      createNotification('Ворота в гаражі зачинені');
    }
    setTimeout(() => {
      openCloseGarageDoors.checked = false;
      createNotification('Ви відчинили гаражні ворота і забули закрити. Система автоматично зачинила ворота через 6 секунд');
    }, 6000);
  });

  garageVentilation.addEventListener('change', function () {
    if (garageVentilation.checked) {
      createNotification('Вентиляція в гаражі включена');
    } else {
      createNotification('Вентиляція в гаражі вимкнена');
    }
  });
  autoCharging.addEventListener('change', function () {
    if (autoCharging.checked) {
      smartModeCharging.checked = false;
      createNotification('Заряджання електромобіля розпочато. До повної зарядки авто залишилось близько 7 годин');
    } else {
      createNotification('Заряджання електромобіля вимкнено');
    }
    setTimeout(() => {
      autoCharging.checked = false;
      createNotification('Автомобіль повністю заряджений! Режим зарядки вимкнений!');
    }, 10000);
  });
  smartModeCharging.addEventListener('change', function () {
    if (smartModeCharging.checked) {
      autoCharging.checked = false;
      const starTime = new Date();
      const smartChargingStart = 23;
      const hourLeft = smartChargingStart - starTime.getHours();
      const minuteLeft = 60 - starTime.getMinutes();
      createNotification('Smart режим підзярдки включений. Зарядка буде розпочата через: ' + hourLeft + ':' + minuteLeft + ' Рівно о 23:00! ');
    } else {
      createNotification('Смарт режим підзарядки автомобіля вимкнений');
    }
  });
}
garageControls();
// Отоплення

const openAccessToButton = (...button) => {
  for (let i = 0; i < button.length; i++) {
    button[i].disabled = false;
  }
};
const closeAccessToButton = (...button) => {
  for (let i = 0; i < button.length; i++) {
    button[i].disabled = true;
    button[i].checked = false;
  }
};

function heatingControl() {
  const switchBoiler = document.getElementById('switchBoiler');
  const warmFloor = document.getElementById('warmFloor');
  const smartHeatingMode = document.getElementById('smartHeatingMode');
  const outputHeatingTemperature = document.getElementById('heatingTemperature');
  const decreaseHeatingTemperature = document.querySelector('.decrease-heating-temperature');
  const addHeatingTemperature = document.querySelector('.add-heating-temperature');

  const setTemperature = (value) => (outputHeatingTemperature.value = value);
  switchBoiler.addEventListener('change', () => {
    if (switchBoiler.checked) {
      openAccessToButton(warmFloor, outputHeatingTemperature, decreaseHeatingTemperature, addHeatingTemperature);
      setTemperature(55);
      createNotification(`Котел включено. Температура котла: ${outputHeatingTemperature.value} градусів`);
    } else {
      closeAccessToButton(warmFloor, outputHeatingTemperature, decreaseHeatingTemperature, addHeatingTemperature);
      createNotification(`Котел вимкнено`);
    }
  });

  warmFloor.addEventListener('change', () => {
    if (warmFloor.checked) {
      createNotification('Підігрів теплої підлоги увімкнено');
    } else {
      createNotification('Підігрів теплої підлоги вимкнено');
    }
  });

  smartHeatingMode.addEventListener('change', () => {
    if (smartHeatingMode.checked) {
      openAccessToButton(decreaseHeatingTemperature, addHeatingTemperature);

      createNotification(
        `Cмарт режим увімкнено. В цьому режимі котел увімкнеться о ${comeBackFromWork - 1} годині вечора. І вимкнеться о ${goToWork} годині ранку.`
      );
    } else {
      createNotification('Підігрів теплої підлоги вимкнено');
      closeAccessToButton(decreaseHeatingTemperature, addHeatingTemperature);
    }
  });
  decreaseHeatingTemperature.addEventListener('click', function () {
    if (outputHeatingTemperature.value > 45 && outputHeatingTemperature.value <= 80) {
      outputHeatingTemperature.value--;
      createNotification(`Температура котла: ${outputHeatingTemperature.value} градусів`);
    } else if (outputHeatingTemperature.value == 45) {
      createNotification(`45 градусів це мінімальна температура для встановлення`);
    }
  });
  addHeatingTemperature.addEventListener('click', function () {
    if (outputHeatingTemperature.value >= 45 && outputHeatingTemperature.value < 80) {
      outputHeatingTemperature.value++;
      createNotification(`Температура котла: ${outputHeatingTemperature.value} градусів`);
    }
    if (outputHeatingTemperature.value == 60) {
      createNotification(`60 градусів це оптимальна температура для встановлення, яку рекомендує виробник котла`);
    } else if (outputHeatingTemperature.value == 80) {
      createNotification(`80 градусів це максимальна температура для встановлення`);
    }
  });
}
heatingControl();
// ТВ

function tvControl() {
  const powerTvButton = document.querySelector('#tv-power');
  const tvListButton = document.querySelector('#tv-list');
  const nextChanelButton = document.querySelector('#next-chanel');
  const previousChanelButton = document.querySelector('#previous-chanel');
  const muteTvButton = document.querySelector('#mute ');
  const volumeRange = document.getElementById('volumeRange');
  const outputVolumeValue = document.getElementById('volumeValue');
  const listWrapper = document.querySelector('.list-wrapper');
  const listSelect = document.querySelector('.select');
  const listChanel = document.querySelectorAll('.selectopt');
  // керування гучністю
  volumeRange.oninput = function () {
    console.log(volumeRange.value);
    outputVolumeValue.innerHTML = this.value;
  };

  powerTvButton.addEventListener('change', () => {
    if (powerTvButton.checked) {
      openAccessToButton(tvListButton, nextChanelButton, previousChanelButton, muteTvButton, volumeRange, outputVolumeValue);
      volumeRange.value = 15;
      outputVolumeValue.innerHTML = volumeRange.value;
      createNotification(`Телевізор увімкнено! Гучність: ${volumeRange.value}`);
    } else {
      createNotification(`Телевізор вимкнено`);
      closeAccessToButton(tvListButton, nextChanelButton, previousChanelButton, muteTvButton, volumeRange, outputVolumeValue);
      listSelect.classList.add('hide');
    }
  });
  tvListButton.addEventListener('change', () => {
    if (tvListButton.checked) {
      listWrapper.classList.toggle('hide');
      listSelect.focus();
    }
  });
  chanel = 0;
  nextChanelButton.addEventListener('click', () => {
    chanel++;
    listChanel[chanel].checked = true;
  });
  previousChanelButton.addEventListener('click', () => {
    chanel--;
    listChanel[chanel].checked = true;
  });
  muteTvButton.addEventListener('click', () => {
    if (muteTvButton.checked) {
      volumeRange.value = 0;
      outputVolumeValue.innerHTML = volumeRange.value;
      createNotification('Звук вимкнено');
    } else {
      volumeRange.value = 15;
      outputVolumeValue.innerHTML = volumeRange.value;
      createNotification('Звук увімкнуто');
    }
  });
}

tvControl();

function jalouiseControl() {
  const openJalouise = document.querySelector('#switchJalouise');
  const switchDayNightMode = document.querySelector('#switchDayNightMode');
  const switchJalouiseSmartMode = document.querySelector('#switchJalouiseSmartMode');

  openJalouise.addEventListener('change', () => {
    if (openJalouise.checked) {
      createNotification('Жалюзі піднято');
    } else {
      createNotification('Жалюзі опущено');
    }
  });
  switchDayNightMode.addEventListener('change', () => {
    if (switchDayNightMode.checked) {
      openJalouise.checked = false;
      createNotification('Режим День/Ніч увімкнений. ');
    } else {
      createNotification('Режим День/Ніч вимкнуто.');
    }
  });
  switchJalouiseSmartMode.addEventListener('change', () => {
    if (switchJalouiseSmartMode.checked) {
      fetch('http://api.openweathermap.org/data/2.5/weather?q=Киев,ua&appid=f47fb2a9d3f12b8600041082bccf9428&lang=ua')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
          const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
          createNotification(
            `Смартрежим роботи жалюзі увімкнений.  Жалюзі автоматично закриватимуться о ${sunset} вечору! І відчинятимуться о ${sunrise} ранку`
          );
        });
      switchDayNightMode.checked = false;
      openJalouise.checked = false;
    } else {
      createNotification('Смартрежим роботи жалюзі вимкнений');
    }
  });
}
jalouiseControl();

function safetyControl() {
  const alarmSystem = document.querySelector('#alarmSystem');
  const videoSurveillance = document.querySelector('#videoSurveillance');
  const smartSecurityMode = document.querySelector('#smartSecurityMode');
  const fireProtection = document.querySelector('#fireProtection');
  alarmSystem.addEventListener('change', () => {
    if (alarmSystem.checked) {
      createNotification('Сигналізація і датчики руху увімкнені');
    } else {
      createNotification('Сигналізація і датчики руху вимкнені');
    }
  });
  videoSurveillance.addEventListener('change', () => {
    if (videoSurveillance.checked) {
      createNotification('Відеонагляд увімкнений');
    } else {
      createNotification('Відеонагляд вимкнений');
    }
  });
  smartSecurityMode.addEventListener('change', () => {
    if (smartSecurityMode.checked) {
      createNotification('Датчики руху увімкнені');
    } else {
      createNotification('Сигналізація вимкнена');
    }
  });
  fireProtection.addEventListener('change', () => {
    if (fireProtection.checked) {
      createNotification('Пожежна охорона увімкнена');
    } else {
      createNotification('Пожежна охорона вимкнена');
    }
  });
}
safetyControl();

// music
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const muteMusicBtn = document.getElementById('muteMusic');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['Один В Каное - Мамма', 'Один В Каное - Небо', 'Один В Каное - Пообіцяй мені'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}
// Mute
function muteSong() {
  musicContainer.classList.add('mute');
  muteMusicBtn.querySelector('i.fas').classList.remove('fa-volume-up');
  muteMusicBtn.querySelector('i.fas').classList.add('fa-volume-mute');

  audio.muted = true;
}

//Unmute
function UnMuteSong() {
  musicContainer.classList.remove('mute');
  muteMusicBtn.querySelector('i.fas').classList.remove('fa-volume-mute');
  muteMusicBtn.querySelector('i.fas').classList.add('fa-volume-up');

  audio.muted = false;
}
// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  let sec;
  let sec_d;

  // define minutes currentTime
  let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? '0' + min : min;

  // define seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (let i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? '0' + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? '0' + sec : sec;
    }
  }

  get_sec(currentTime, sec);

  // define minutes duration
  let min_d = isNaN(duration) === true ? '0' : Math.floor(duration / 60);
  min_d = min_d < 10 ? '0' + min_d : min_d;

  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (let i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
      }
    } else {
      sec_d = isNaN(duration) === true ? '0' : Math.floor(x);
      sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
    }
  }

  // define seconds duration

  get_sec_d(duration);
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

muteMusicBtn.addEventListener('click', () => {
  const isMute = musicContainer.classList.contains('mute');

  if (isMute) {
    UnMuteSong();
  } else {
    muteSong();
  }
});
// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);
