import type { WorkExperienceGroup, WorkExperienceRole } from "../data/portfolio";

const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function parseMonthYear(value: string): Date {
  const [monthName, yearText] = value.trim().split(/\s+/);
  const month = MONTHS[monthName.toLowerCase()];
  const year = Number.parseInt(yearText, 10);

  if (month === undefined || Number.isNaN(year)) {
    throw new Error(`Invalid month/year: "${value}"`);
  }

  return new Date(year, month, 1);
}

function parseRolePeriod(period: string): { start: Date; end: Date | null } {
  const normalized = period.replace(/\u2013/g, "-");
  const match = normalized.match(/^(.+?)\s*-\s*(.+)$/);

  if (!match) {
    throw new Error(`Invalid role period: "${period}"`);
  }

  const start = parseMonthYear(match[1]);
  const endLabel = match[2].trim();

  return {
    start,
    end: endLabel.toLowerCase() === "present" ? null : parseMonthYear(endLabel),
  };
}

function formatDuration(start: Date, end: Date): string {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  }

  if (months > 0) {
    parts.push(`${months} mo${months === 1 ? "" : "s"}`);
  }

  return parts.length > 0 ? parts.join(" ") : "1 mo";
}

function getCompanyDateRange(roles: WorkExperienceRole[]) {
  const parsed = roles.map((role) => parseRolePeriod(role.period));
  const start = parsed.reduce(
    (earliest, current) => (current.start < earliest ? current.start : earliest),
    parsed[0].start,
  );
  const isCurrent = parsed.some((role) => role.end === null);
  const end = isCurrent
    ? new Date()
    : parsed.reduce(
        (latest, current) => (current.end && current.end > latest ? current.end : latest),
        parsed[0].end ?? new Date(),
      );

  return { start, end, isCurrent };
}

export function getCompanyTenure(group: WorkExperienceGroup): string {
  const { start, end } = getCompanyDateRange(group.roles);
  return `${group.employmentType} · ${formatDuration(start, end)}`;
}
