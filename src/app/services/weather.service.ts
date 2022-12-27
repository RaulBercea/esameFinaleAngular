import { dataseries } from '../shared/resultsComponent/results.component';

export const convertTimePoint = (data: dataseries) => {
  if (data.timepoint >= 24) {
    data.timepoint %= 24;
  }
};

export const addWeatherIcons = (data: dataseries) => {
  if (data.cloudcover <= '2') {
    data.icon = 'bi bi-sun';
  }

  if (data.cloudcover <= '6') {
    data.icon = 'bi bi-cloud-sun';
  }

  if (data.cloudcover == '7' && data.rh2m < 90) {
    data.icon = 'bi bi-cloud';
  }

  if (data.cloudcover >= '8') {
    data.icon = 'bi bi-clouds';
  }

  if (data.cloudcover >= '7' && data.rh2m > 90) {
    data.icon = 'bi bi-cloud-fog';
  }

  if (data.prec_type == 'rain') {
    data.icon = 'bi bi-cloud-rain';
  }

  if (data.prec_type == 'snow') {
    data.icon = 'bi bi-snow';
  }
};

export const cloudCoverToPercentage = (data: dataseries) => {
  switch (data.cloudcover.toString()) {
    case '1':
      data.cloudcover = '0%-6%';
      break;
    case '2':
      data.cloudcover = '6%-19%';
      break;
    case '3':
      data.cloudcover = '19%-31%';
      break;
    case '4':
      data.cloudcover = '31%-44%';
      break;
    case '5':
      data.cloudcover = '44%-56%';
      break;
    case '6':
      data.cloudcover = '56%-69%';
      break;
    case '7':
      data.cloudcover = '69%-81%';
      break;
    case '8':
      data.cloudcover = '81%-94%';
      break;
    case '9':
      data.cloudcover = '94%-100%';
      break;
    default:
      break;
  }
};
