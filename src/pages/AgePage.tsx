import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  Cake, 
  Globe, 
  Sparkles, 
  Copy, 
  RotateCcw, 
  Printer, 
  Download, 
  Share2, 
  Star, 
  Heart, 
  Wind, 
  Moon, 
  Compass, 
  Zap, 
  Shield, 
  Flame, 
  Disc, 
  Waves
} from 'lucide-react';
import { calculateAgeDetails } from '../utils/ageCalculations';
import { exportElementToPdf, printElement } from '../utils/pdfExport';
import { saveHistoryItem, toggleFavorite, getFavorites } from '../utils/storage';
import { AdBanner } from '../components/AdBanner';

interface AgePageProps {
  onShowToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
}

export const AgePage: React.FC<AgePageProps> = ({ onShowToast }) => {
  const [dobString, setDobString] = useState<string>('1998-05-15');
  const [targetString, setTargetString] = useState<string>(new Date().toISOString().split('T')[0]);
  const [liveNow, setLiveNow] = useState<Date>(new Date());
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(getFavorites());

  // Live timer for exact seconds ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dobDate = new Date(dobString + 'T00:00:00');
  const targetDate = targetString === new Date().toISOString().split('T')[0] ? liveNow : new Date(targetString + 'T23:59:59');

  const ageDetails = calculateAgeDetails(dobDate, targetDate);

  // Trigger confetti if today is birthday!
  useEffect(() => {
    if (ageDetails.isTodayBirthday) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
      onShowToast('🎉 Happy Birthday!', 'Wishing you a fantastic year ahead!');
    }
  }, [ageDetails.isTodayBirthday]);

  // Record history
  useEffect(() => {
    saveHistoryItem({
      category: 'Age',
      title: `Age for DOB ${dobString}`,
      summary: `${ageDetails.years} Yrs, ${ageDetails.months} Mos, ${ageDetails.days} Days (${ageDetails.totalDays.toLocaleString()} Days Total)`,
      details: { DOB: dobString, Years: ageDetails.years, DaysTotal: ageDetails.totalDays },
    });
  }, [dobString]);

  const handleToggleFav = () => {
    const updated = toggleFavorite('age');
    setFavorites(updated);
    onShowToast('Favorites Updated', 'Age Calculator saved to your favorites bar.');
  };

  const handleCopyResult = () => {
    const text = `Exact Age Summary:\nDate of Birth: ${dobString}\nAge: ${ageDetails.years} Years, ${ageDetails.months} Months, ${ageDetails.days} Days\nTotal Days Alive: ${ageDetails.totalDays.toLocaleString()} Days\nNext Birthday in: ${ageDetails.nextBirthdayDays} Days (${ageDetails.nextBirthdayDayOfWeek})\nWestern Zodiac: ${ageDetails.zodiac.westernSign} ${ageDetails.zodiac.westernSymbol}\nChinese Zodiac: ${ageDetails.zodiac.chineseSign}`;
    navigator.clipboard.writeText(text);
    onShowToast('Age Summary Copied!', 'Copied to clipboard.');
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    onShowToast('Creating Age Report PDF...', 'Formatting document.');
    const success = await exportElementToPdf('age-report-card', `Age_Report_${dobString}.pdf`);
    setIsExportingPdf(false);
    if (success) {
      onShowToast('PDF Report Downloaded!', 'Document saved to your downloads folder.');
    }
  };

  const handlePrint = () => {
    printElement('age-report-card');
  };

  const planetIconMap: Record<string, React.ReactNode> = {
    Zap: <Zap className="w-4 h-4 text-amber-500" />,
    Sparkles: <Sparkles className="w-4 h-4 text-yellow-500" />,
    Globe: <Globe className="w-4 h-4 text-sky-500" />,
    Flame: <Flame className="w-4 h-4 text-rose-500" />,
    Shield: <Shield className="w-4 h-4 text-amber-600" />,
    Disc: <Disc className="w-4 h-4 text-indigo-400" />,
    Compass: <Compass className="w-4 h-4 text-teal-400" />,
    Waves: <Waves className="w-4 h-4 text-sky-600" />,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      
      {/* Top Banner Ad */}
      <AdBanner type="top" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 rounded-md">
              Chronological & Space Age
            </span>
            <button
              onClick={handleToggleFav}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-500 transition-colors"
              title="Favorite Age Calculator"
            >
              <Star className={`w-4 h-4 ${favorites.includes('age') ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Exact Age Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Calculate exact age in years, months, days, hours, and seconds. Discover next birthday countdown, planet ages, and zodiac insights.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Date Controls & Result Workspace */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Date of Birth (DOB)
                </label>
                <input
                  type="date"
                  value={dobString}
                  onChange={(e) => setDobString(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Age On / Target Date
                </label>
                <input
                  type="date"
                  value={targetString}
                  onChange={(e) => setTargetString(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            {/* Main Primary Age Breakdown Card */}
            <div id="age-report-card" className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-50 dark:to-slate-950 border border-amber-500/20 space-y-6">
              
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Cake className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Chronological Age Output</span>
                </div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 rounded-full">
                  Born on {ageDetails.birthDayOfWeek}
                </span>
              </div>

              {/* Large Years, Months, Days Metric Display */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">{ageDetails.years}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Years</div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">{ageDetails.months}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Months</div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">{ageDetails.days}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Days</div>
                </div>
              </div>

              {/* Next Birthday Countdown Block */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Next Birthday Countdown ({ageDetails.nextBirthdayDayOfWeek})</span>
                  </span>
                  <span>Turn {ageDetails.years + 1} Yrs</span>
                </div>

                <div className="grid grid-cols-4 gap-2 font-mono text-center pt-1">
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100">
                    <span className="text-lg font-extrabold text-amber-500 block">{ageDetails.nextBirthdayDays}</span>
                    <span className="text-[10px] text-slate-400 font-sans">Days</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100">
                    <span className="text-lg font-extrabold text-amber-500 block">{ageDetails.nextBirthdayHours}</span>
                    <span className="text-[10px] text-slate-400 font-sans">Hours</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100">
                    <span className="text-lg font-extrabold text-amber-500 block">{ageDetails.nextBirthdayMinutes}</span>
                    <span className="text-[10px] text-slate-400 font-sans">Mins</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100">
                    <span className="text-lg font-extrabold text-amber-500 block">{ageDetails.nextBirthdaySeconds}</span>
                    <span className="text-[10px] text-slate-400 font-sans">Secs</span>
                  </div>
                </div>
              </div>

              {/* Total Life Statistics Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Life Statistics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Total Months</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{ageDetails.totalMonths.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Total Weeks</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{ageDetails.totalWeeks.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Total Days</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{ageDetails.totalDays.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Total Hours</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{ageDetails.totalHours.toLocaleString()}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 no-print">
              <button
                onClick={() => {
                  setDobString('1998-05-15');
                  setTargetString(new Date().toISOString().split('T')[0]);
                  onShowToast('Reset Complete', 'DOB reset to default.');
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyResult}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExportingPdf ? 'Exporting...' : 'PDF Report'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar: Zodiac & Planet Ages */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Western & Chinese Zodiac Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Zodiac & Astrological Profile</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/60 space-y-1">
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">Western Zodiac</span>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">
                  {ageDetails.zodiac.westernSign} {ageDetails.zodiac.westernSymbol}
                </div>
                <div className="text-[11px] text-slate-500">{ageDetails.zodiac.westernElement} Element</div>
                <div className="text-[10px] text-slate-400 italic mt-1">{ageDetails.zodiac.westernTraits}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/60 space-y-1">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">Chinese Zodiac</span>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">
                  {ageDetails.zodiac.chineseSign}
                </div>
                <div className="text-[11px] text-slate-500">Element: {ageDetails.zodiac.chineseElement}</div>
                <div className="text-[10px] text-slate-400 italic mt-1">12-Year Lunar Cycle</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Leap Year Status:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {ageDetails.isBirthYearLeapYear ? 'Born in a Leap Year' : 'Regular Year'} ({ageDetails.leapYearsLived} Leap Years Lived)
              </span>
            </div>
          </div>

          {/* Age on Different Planets */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-500" />
              <span>Age on Other Planets (Space Age)</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {ageDetails.planets.map((planet) => (
                <div
                  key={planet.planet}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {planetIconMap[planet.iconName] || <Globe className="w-4 h-4 text-sky-500" />}
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">{planet.planet}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{planet.orbitalPeriodDays}d orbit</span>
                    </div>
                  </div>
                  <div className="text-right font-mono font-extrabold text-sky-600 dark:text-sky-400 text-sm">
                    {planet.ageInYears} <span className="text-[10px] font-normal text-slate-400">yrs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Banner Ad */}
      <AdBanner type="bottom" />
    </div>
  );
};
