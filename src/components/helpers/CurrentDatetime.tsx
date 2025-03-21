import moment from 'moment';
import React, { useEffect, useState } from 'react';

moment.locale('es', {
  months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
  monthsShort: 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
  monthsParseExact: true,
  weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY HH:mm'
  },
  calendar: {
    sameDay: '[Hoy a las] LT',
    nextDay: '[Mañana a las] LT',
    nextWeek: 'dddd [a las] LT',
    lastDay: '[Ayer a las] LT',
    lastWeek: 'dddd [pasado a las] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|a)/,
  ordinal: function (number) {
    return number + (number === 1 ? 'er' : 'a');
  },
  meridiemParse: /AM|PM|a. m.|p. m./,
  isPM: function (input) {
    return input.startsWith('P');
  },
  // En caso de que las unidades meridiem no estén separadas alrededor de 12, 
  // implementa esta función (consulta locale/id.js para ver un ejemplo).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 horas, dado el token de meridiem y la hora 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? 'AM' : 'PM';
  },
  week: {
    dow: 1, // El lunes es el primer día de la semana.
    doy: 4  // Se utiliza para determinar la primera semana del año.
  }
});

type Props = {
  format?: string;
}

const CurrentDateTime: React.FC<Props> = ({ format = 'LLLL' }) => {
  const [dateTime, setDateTime] = useState(moment().locale("es").format(format));

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(moment().format(format));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='mt-1 ml-5 text-gray-700'>
      <p>{dateTime}</p>
    </div>
  );
};

export default CurrentDateTime;