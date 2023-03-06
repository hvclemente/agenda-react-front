export function getToday(): string {
  return '2021-06-17';
}

export function formatMonth(isoMonth: string): string {
  const [year, month] = isoMonth.split('-');

  switch (month) {
    case '01':
      return `Janeiro de ${year}`;
    case '02':
      return `Fevereiro de ${year}`;
    case '03':
      return `Março de ${year}`;
    case '04':
      return `Abril de ${year}`;
    case '05':
      return `Maio de ${year}`;
    case '06':
      return `Junho de ${year}`;
    case '07':
      return `Julho de ${year}`;
    case '08':
      return `Agosto de ${year}`;
    case '09':
      return `Setembro de ${year}`;
    case '10':
      return `Outubro de ${year}`;
    case '11':
      return `Novembro de ${year}`;
    case '12':
      return `Dezembro de ${year}`;
    default:
      return 'Data inválida';
  }
}

export function addMonths(isoMonth: string, increment: number): string {
  const jsDate = new Date(isoMonth + '-01T12:00:00');
  jsDate.setMonth(jsDate.getMonth() + increment);
  return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
}
