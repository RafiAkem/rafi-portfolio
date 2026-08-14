"use client";

import { useMemo, useState } from "react";
import type { Plate } from "@/lib/contributions";
import { plateIndexAt, shortDate, weekday } from "@/lib/contributions";
import { useLang } from "@/components/lang-provider";

type ContributionPlateProps = {
  plate: Plate;
  totalContributions: number;
  activeDays: number;
  rangeStart: string;
  rangeEnd: string;
};

/**
 * Twelve months of activity, printed twice from one dataset.
 *
 * The plate is the fine reading: 53 week columns by 7 day rows, one halftone
 * dot per day. It is pointer-only and hidden from assistive tech, because
 * arrowing through 365 gridcells is a worse way to learn the shape of a year
 * than reading thirteen numbers.
 *
 * The month bars are the coarse reading, and they carry everything the plate
 * cannot: they are real buttons, they work on a 320px screen without a scroll
 * container, they take keyboard focus, and they are what a screen reader gets.
 *
 * Both feed one readout line instead of a tooltip. A tooltip is the single
 * most recognisable "embedded GitHub widget" tell, and a fixed readout can
 * hold its last value the way a straightedge stays where it was put.
 */
export function ContributionPlate({
  plate,
  totalContributions,
  activeDays,
  rangeStart,
  rangeEnd,
}: ContributionPlateProps) {
  const { lang, t } = useLang();
  const [reading, setReading] = useState<string | null>(null);
  const [month, setMonth] = useState<number | null>(null);

  // Rendered once. Nothing about a cell changes after mount, so the 365 nodes
  // never re-render: hover only moves the readout string and the bracket.
  const cells = useMemo(
    () => (
      <>
        {Array.from({ length: plate.offset }, (_, i) => (
          <span key={`pad-${i}`} data-pad />
        ))}
        {plate.cells.map((cell) => (
          <span key={cell.date} data-l={cell.level} data-i={cell.i} />
        ))}
      </>
    ),
    [plate],
  );

  function readDay(event: React.PointerEvent<HTMLDivElement>) {
    // Hit-test by position, not by event target: the plate's stretched tracks
    // are wider than the 17px cells, so the old dataset lookup left a dead
    // band on the right of every column where hovering did nothing.
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(el).rowGap) || 1;
    const i = plateIndexAt(
      event.clientX - rect.left,
      event.clientY - rect.top,
      rect,
      gap,
      plate.columns,
      plate.offset,
      plate.cells.length,
    );
    if (i < 0) return;
    const cell = plate.cells[i];
    setMonth(cell.month);
    // Terse and factual on every day, including the empty ones. "No activity"
    // repeated across 283 cells is a drumbeat, not a label.
    setReading(`${shortDate(cell.date, lang)} · ${weekday(cell.date, lang)} · ${cell.count} ${t.contribution.contributions}`);
  }

  function readMonth(index: number) {
    const band = plate.months[index];
    setMonth(index);
    setReading(`${band.long} · ${band.total} ${t.contribution.contributions}`);
  }

  const bracket = month === null ? null : plate.months[month];
  const peak = plate.months.reduce((max, m) => (m.total > max.total ? m : max), plate.months[0]);

  return (
    <div>
      <p className="folio text-muted">
        <span className="text-text">{totalContributions} {t.contribution.contributions}</span>
        {` · ${activeDays} ${t.contribution.activeDays} · ${shortDate(rangeStart, lang)} ${t.contribution.to} ${shortDate(rangeEnd, lang)}`}
      </p>

      {/* The fine plate. Pointer-only by design; the bars below are the
          keyboard and screen-reader path to the same numbers. */}
      <div
        className="plate-sheet mt-7 hidden sm:block"
        aria-hidden
        style={{ "--cols": plate.columns } as React.CSSProperties}
      >
        <div className="plate" onPointerOver={readDay}>
          {cells}
        </div>

        {/* Printer's bracket marking the month under the cursor. Position is
            expressed in the grid's own cell and gap variables, so it stays
            locked to the columns at every viewport width. */}
        <div className="relative mt-1.5 h-2">
          <div
            className="absolute top-0 border-t border-l border-r border-accent transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              height: "5px",
              opacity: bracket ? 1 : 0,
              left: `calc((var(--track) + var(--gap)) * ${(bracket?.column ?? 1) - 1})`,
              width: `calc(var(--track) * ${bracket?.span ?? 1} + var(--gap) * ${(bracket?.span ?? 1) - 1})`,
            }}
          />
        </div>
      </div>

      {/* The coarse reading. Thirteen slots, always all thirteen: a month with
          nothing in it keeps its full-width place on the baseline, because
          dropping it would quietly redraw the year as eleven months. */}
      <div className="mt-6 sm:mt-4">
        {/* No pointer-leave reset. Once a month has been read, the bracket and
            the readout stay where they were put; clearing them on exit would
            make the section blink back to nothing every time the cursor
            crosses it. */}
        <ul className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-x-px">
          {plate.months.map((band, i) => (
            <li key={band.key}>
              <button
                type="button"
                onPointerEnter={() => readMonth(i)}
                onFocus={() => readMonth(i)}
                onClick={() => readMonth(i)}
                aria-label={`${band.long}, ${band.total} ${t.contribution.contributions}`}
                className="group flex w-full flex-col items-center gap-1.5 pb-1 transition-colors duration-200"
              >
                <span
                  className={`folio text-[0.625rem] tabular-nums transition-colors duration-200 ${
                    month === i ? "text-accent" : "text-faint"
                  }`}
                >
                  {band.total}
                </span>
                <span className="flex h-14 w-full items-end justify-center sm:h-16">
                  <span
                    className="w-full max-w-[1.25rem] bg-accent transition-[height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
                    style={{
                      height: `${(band.total / plate.monthPeak) * 100}%`,
                      opacity: month === null || month === i ? 1 : 0.32,
                    }}
                  />
                </span>
                {/* Thirteen labels have to fit a 320px screen, so the caps
                    tracking that the folio class sets for standalone labels is
                    dialled back until the small breakpoint. */}
                <span
                  className={`folio-caps w-full border-t border-border pt-1.5 text-center text-[0.5rem] tracking-[0.02em] transition-colors duration-200 sm:text-[0.6875rem] sm:tracking-[0.11em] ${
                    month === i ? "border-accent text-accent" : "text-faint"
                  }`}
                >
                  {band.short}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* One readout instead of 365 tooltips. Its resting text is a statement
          rather than an invitation: an instruction to hover would be a lie on
          every touch screen, where the plate is not even rendered. */}
      <p className="folio mt-5 min-h-[1.5rem] border-t border-border pt-3 tabular-nums text-muted">
        {reading ??
          t.contribution.dailyPeak
            .replace("{n}", String(plate.ceiling))
            .replace("{m}", peak.long)}
      </p>

      {/* The whole series, for anyone not using a pointer.

          The sr-only class goes on a wrapping div rather than on the table.
          Table layout sizes itself to its content and ignores the 1px width
          the utility sets, so a bare sr-only table stays invisible but still
          widens the document and gives the whole page a horizontal scrollbar. */}
      <div className="sr-only">
        <table>
          <caption>
            {t.contribution.caption
              .replace("{start}", shortDate(rangeStart, lang))
              .replace("{end}", shortDate(rangeEnd, lang))}
          </caption>
          <thead>
            <tr>
              <th scope="col">{t.contribution.month}</th>
              <th scope="col">{t.contribution.contribution}</th>
            </tr>
          </thead>
          <tbody>
            {plate.months.map((band) => (
              <tr key={band.key}>
                <th scope="row">{band.long}</th>
                <td>{band.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
