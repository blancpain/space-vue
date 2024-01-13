export const extractDate = (
  identifier: string
): { year?: string; month?: string; day?: string } => {
  const pattern: RegExp = /^(\d{4})(\d{2})(\d{2})/;
  const match: RegExpMatchArray | null = identifier.match(pattern);

  let year: string | undefined;
  let month: string | undefined;
  let day: string | undefined;

  if (match) {
    year = match[1];
    month = match[2];
    day = match[3];
  }

  return { year, month, day };
};
