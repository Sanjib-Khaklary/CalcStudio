import { PlanetAge, ZodiacInfo } from '../types';

export interface AgeCalculationResult {
  birthDate: Date;
  currentDate: Date;
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthdayDays: number;
  nextBirthdayHours: number;
  nextBirthdayMinutes: number;
  nextBirthdaySeconds: number;
  nextBirthdayDayOfWeek: string;
  isTodayBirthday: boolean;
  birthDayOfWeek: string;
  isBirthYearLeapYear: boolean;
  leapYearsLived: number;
  zodiac: ZodiacInfo;
  planets: PlanetAge[];
  heartbeatsEstimate: number;
  breathsEstimate: number;
  sleepHoursEstimate: number;
}

export function calculateAgeDetails(dob: Date, targetDate: Date = new Date()): AgeCalculationResult {
  // Reset time for date calculations unless detailed
  const start = new Date(dob);
  const now = new Date(targetDate);

  if (start > now) {
    // If DOB is in future, adjust
    return calculateAgeDetails(now, now);
  }

  // Calculate Years, Months, Days
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    // Get days in previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Total elapsed time in MS
  const diffMs = now.getTime() - start.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  // Next Birthday Calculation
  const nextBday = new Date(now.getFullYear(), start.getMonth(), start.getDate());
  if (nextBday < now && !(nextBday.getDate() === now.getDate() && nextBday.getMonth() === now.getMonth())) {
    nextBday.setFullYear(now.getFullYear() + 1);
  }

  const isTodayBirthday = start.getMonth() === now.getMonth() && start.getDate() === now.getDate() && years > 0;

  const nextBdayDiffMs = nextBday.getTime() - now.getTime();
  const nextBdayTotalSec = Math.max(0, Math.floor(nextBdayDiffMs / 1000));
  const nextBirthdayDays = Math.floor(nextBdayTotalSec / 86400);
  const nextBirthdayHours = Math.floor((nextBdayTotalSec % 86400) / 3600);
  const nextBirthdayMinutes = Math.floor((nextBdayTotalSec % 3600) / 60);
  const nextBirthdaySeconds = nextBdayTotalSec % 60;

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const birthDayOfWeek = daysOfWeek[start.getDay()];
  const nextBirthdayDayOfWeek = daysOfWeek[nextBday.getDay()];

  // Leap Year checks
  const isBirthYearLeapYear = checkIsLeapYear(start.getFullYear());
  let leapYearsLived = 0;
  for (let y = start.getFullYear(); y <= now.getFullYear(); y++) {
    if (checkIsLeapYear(y)) leapYearsLived++;
  }

  // Zodiac Info
  const zodiac = getZodiacInfo(start);

  // Age on Planets
  const planets = getPlanetAges(totalDays);

  // Health estimates
  const heartbeatsEstimate = Math.round(totalMinutes * 72); // ~72 bpm
  const breathsEstimate = Math.round(totalMinutes * 16); // ~16 bpm
  const sleepHoursEstimate = Math.round(totalHours * (8 / 24)); // ~8 hours per day

  return {
    birthDate: start,
    currentDate: now,
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthdayDays,
    nextBirthdayHours,
    nextBirthdayMinutes,
    nextBirthdaySeconds,
    nextBirthdayDayOfWeek,
    isTodayBirthday,
    birthDayOfWeek,
    isBirthYearLeapYear,
    leapYearsLived,
    zodiac,
    planets,
    heartbeatsEstimate,
    breathsEstimate,
    sleepHoursEstimate,
  };
}

export function checkIsLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getZodiacInfo(dob: Date): ZodiacInfo {
  const month = dob.getMonth() + 1;
  const day = dob.getDate();
  const year = dob.getFullYear();

  let westernSign = '';
  let westernSymbol = '';
  let westernDates = '';
  let westernElement = '';
  let westernTraits = '';

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    westernSign = 'Aries';
    westernSymbol = '♈';
    westernDates = 'Mar 21 - Apr 19';
    westernElement = 'Fire';
    westernTraits = 'Courageous, Determined, Confident, Enthusiastic';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    westernSign = 'Taurus';
    westernSymbol = '♉';
    westernDates = 'Apr 20 - May 20';
    westernElement = 'Earth';
    westernTraits = 'Reliable, Patient, Practical, Devoted';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    westernSign = 'Gemini';
    westernSymbol = '♊';
    westernDates = 'May 21 - Jun 20';
    westernElement = 'Air';
    westernTraits = 'Gentle, Affectionate, Curious, Adaptable';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    westernSign = 'Cancer';
    westernSymbol = '♋';
    westernDates = 'Jun 21 - Jul 22';
    westernElement = 'Water';
    westernTraits = 'Tenacious, Highly Imaginative, Loyal, Sympathetic';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    westernSign = 'Leo';
    westernSymbol = '♌';
    westernDates = 'Jul 23 - Aug 22';
    westernElement = 'Fire';
    westernTraits = 'Creative, Passionate, Generous, Warm-hearted';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    westernSign = 'Virgo';
    westernSymbol = '♍';
    westernDates = 'Aug 23 - Sep 22';
    westernElement = 'Earth';
    westernTraits = 'Loyal, Analytical, Kind, Hardworking, Practical';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    westernSign = 'Libra';
    westernSymbol = '♎';
    westernDates = 'Sep 23 - Oct 22';
    westernElement = 'Air';
    westernTraits = 'Cooperative, Diplomatic, Gracious, Fair-minded';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    westernSign = 'Scorpio';
    westernSymbol = '♏';
    westernDates = 'Oct 23 - Nov 21';
    westernElement = 'Water';
    westernTraits = 'Resourceful, Powerful, Brave, Passionate, True Friend';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    westernSign = 'Sagittarius';
    westernSymbol = '♐';
    westernDates = 'Nov 22 - Dec 21';
    westernElement = 'Fire';
    westernTraits = 'Generous, Idealistic, Great sense of humor';
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    westernSign = 'Capricorn';
    westernSymbol = '♑';
    westernDates = 'Dec 22 - Jan 19';
    westernElement = 'Earth';
    westernTraits = 'Responsible, Disciplined, Self-control, Good managers';
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    westernSign = 'Aquarius';
    westernSymbol = '♒';
    westernDates = 'Jan 20 - Feb 18';
    westernElement = 'Air';
    westernTraits = 'Progressive, Original, Independent, Humanitarian';
  } else {
    westernSign = 'Pisces';
    westernSymbol = '♓';
    westernDates = 'Feb 19 - Mar 20';
    westernElement = 'Water';
    westernTraits = 'Compassionate, Artistic, Intuitive, Gentle, Wise';
  }

  // Chinese Zodiac Calculation (12-year cycle: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig)
  const animals = ['Rat 🐀', 'Ox 🐂', 'Tiger 🐅', 'Rabbit 🐇', 'Dragon 🐉', 'Snake 🐍', 'Horse 🐎', 'Goat 🐐', 'Monkey 🐒', 'Rooster 🐓', 'Dog 🐕', 'Pig 🐖'];
  const baseYear = 1900; // 1900 was Year of Rat
  const animalIdx = (year - baseYear) % 12;
  const chineseSign = animals[animalIdx >= 0 ? animalIdx : animalIdx + 12];

  // Chinese Element (Last digit of year)
  const lastDigit = year % 10;
  let chineseElement = 'Metal';
  if (lastDigit === 0 || lastDigit === 1) chineseElement = 'Metal 🪙';
  else if (lastDigit === 2 || lastDigit === 3) chineseElement = 'Water 💧';
  else if (lastDigit === 4 || lastDigit === 5) chineseElement = 'Wood 🪵';
  else if (lastDigit === 6 || lastDigit === 7) chineseElement = 'Fire 🔥';
  else chineseElement = 'Earth ⛰️';

  return {
    westernSign,
    westernSymbol,
    westernDates,
    westernElement,
    westernTraits,
    chineseSign,
    chineseElement,
    chineseYearAnimal: chineseSign,
  };
}

function getPlanetAges(totalDaysOnEarth: number): PlanetAge[] {
  const planetList = [
    { name: 'Mercury ☿', period: 87.97, icon: 'Zap' },
    { name: 'Venus ♀', period: 224.7, icon: 'Sparkles' },
    { name: 'Earth ♁', period: 365.256, icon: 'Globe' },
    { name: 'Mars ♂', period: 686.98, icon: 'Flame' },
    { name: 'Jupiter ♃', period: 4332.59, icon: 'Shield' },
    { name: 'Saturn ♄', period: 10759.22, icon: 'Disc' },
    { name: 'Uranus ♅', period: 30685.4, icon: 'Compass' },
    { name: 'Neptune ♆', period: 60189.0, icon: 'Waves' },
  ];

  return planetList.map((p) => {
    const ageInYears = +(totalDaysOnEarth / p.period).toFixed(2);
    const fraction = (totalDaysOnEarth / p.period) % 1;
    const daysUntilNext = Math.round((1 - fraction) * p.period);

    return {
      planet: p.name,
      orbitalPeriodDays: p.period,
      ageInYears,
      nextBirthdayDays: daysUntilNext,
      iconName: p.icon,
    };
  });
}
