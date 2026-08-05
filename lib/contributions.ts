import type { ContributionDay, Language } from "./github";

/**
 * Pure shaping of the raw GitHub payload into what the section draws.
 *
 * Everything here is deterministic and locale-free on purpose. Intl and
 * toLocaleDateString resolve differently under Node's ICU build than in a
 * browser, which turns every formatted number and date into a hydration
 * mismatch. The tables below are the whole of the localisation.
 */

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const MONTHS_LONG = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const WEEKDAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

/** Parsed as UTC. The API hands back plain calendar dates with no zone, and
 *  letting the local zone shift them moves days across week boundaries. */
function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d, weekday: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
}

/** "14 Jan 2026" */
export function shortDate(iso: string): string {
  const { y, m, d } = parts(iso);
  return `${d} ${MONTHS_SHORT[m]} ${y}`;
}

/** "Rabu" */
export function weekday(iso: string): string {
  return WEEKDAYS[parts(iso).weekday];
}

/** "26 Juli 2026", from an ISO timestamp. */
export function longDate(isoTimestamp: string): string {
  const at = new Date(isoTimestamp);
  return `${at.getUTCDate()} ${MONTHS_LONG[at.getUTCMonth()]} ${at.getUTCFullYear()}`;
}

/** Indonesian decimal comma, fixed to one place: 49.6 -> "49,6". */
export function percent(share: number): string {
  return (share * 100).toFixed(1).replace(".", ",");
}

/** Indonesian thousands separator: 4875001 -> "4.875.001". */
export function thousands(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** 4875001 -> "4,9 MB". */
export function megabytes(bytes: number): string {
  return `${(bytes / 1e6).toFixed(1).replace(".", ",")} MB`;
}

/**
 * Ink density step for one day, 0-4.
 *
 * Four inked steps plus paper. The top step is open-ended but the legend
 * prints the real ceiling from the data rather than a rounded one, so the
 * scale can never imply headroom that was never reached.
 */
export function level(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

export type PlateCell = ContributionDay & {
  /** Index into the flat day list, for hover lookup. */
  i: number;
  /** Index into the month list, so the bracket can find its span. */
  month: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type MonthBand = {
  key: string;
  /** "Jan" */
  short: string;
  /** "Januari 2026" */
  long: string;
  total: number;
  /** 1-based grid column of this month's first week, for the 53-column strip. */
  column: number;
  /** How many week columns this month covers. */
  span: number;
};

export type Plate = {
  cells: PlateCell[];
  months: MonthBand[];
  /** Number of week columns, normally 53. */
  columns: number;
  /** Leading blanks before the first day, when the range starts mid-week. */
  offset: number;
  /** Highest single-day count, for the legend ceiling. */
  ceiling: number;
  /** Highest monthly total, for scaling the bars. */
  monthPeak: number;
};

/**
 * Lays the flat day list out as printer's columns: one column per week, seven
 * rows, Sunday at the top, exactly as the source calendar is drawn.
 */
export function buildPlate(days: ContributionDay[]): Plate {
  const offset = parts(days[0].date).weekday;

  const months: MonthBand[] = [];
  const cells: PlateCell[] = days.map((day, i) => {
    const { y, m } = parts(day.date);
    const key = `${y}-${m}`;
    const column = Math.floor((i + offset) / 7) + 1;

    let band = months[months.length - 1];
    if (!band || band.key !== key) {
      band = { key, short: MONTHS_SHORT[m], long: `${MONTHS_LONG[m]} ${y}`, total: 0, column, span: 0 };
      months.push(band);
    }
    band.total += day.count;
    band.span = column - band.column + 1;

    return { ...day, i, month: months.length - 1, level: level(day.count) };
  });

  return {
    cells,
    months,
    columns: Math.ceil((days.length + offset) / 7),
    offset,
    ceiling: days.reduce((max, d) => Math.max(max, d.count), 0),
    monthPeak: months.reduce((max, m) => Math.max(max, m.total), 0),
  };
}

/**
 * Top languages by bytes, with the tail folded into one honest remainder.
 *
 * The remainder is never dropped: a list of shares that silently sums to less
 * than a hundred is the most common way a truthful chart tells a lie.
 */
export function topLanguages(languages: Language[], keep = 6) {
  const head = languages.slice(0, keep);
  const tail = languages.slice(keep);
  const rest = tail.reduce((sum, l) => sum + l.bytes, 0);
  const total = languages.reduce((sum, l) => sum + l.bytes, 0);

  return {
    head,
    rest:
      tail.length > 0
        ? { name: `Lainnya (${tail.length} bahasa)`, bytes: rest, share: rest / total }
        : null,
  };
}
