import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function fTimeRange(date, range) {
  let fString = 'hh:mm:ss'; 
  if (60 * 60 * 12 > range && range > 45) fString = 'HH:mm';
  else if (range > 60 * 60 * 12) fString = 'dd/MM';
  return format(new Date(date), fString);
}
