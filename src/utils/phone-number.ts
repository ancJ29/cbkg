import logger from "../services/logger";

export function isVietnamesePhoneNumber(number: string) {
  return (
    /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/.test(number) ||
    /((^(\+84|84|0|0084){1})(2))+([0-9]{9})$/.test(number)
  );
}
export function convertToInternationalFormat(phone?: string) {
  const cleanedPhone = phone?.replace(/\s/g, "").replace(/\D/g, "");

  const match = cleanedPhone?.match(/^0(\d{9})$/);
  if (!match) {
    logger.error("Invalid phone number format");
    return phone;
  }
  const internationalFormat = `84${match[1]}`;

  return internationalFormat;
}

export function formatPhoneNumber(input: string) {
  const cleaned = ("" + input).replace(/\D/g, "");
  let formattedNumber = "";

  if (/((^(\+84|84|0|0084){1})(2))+([0-9]{9})$/.test(cleaned)) {
    formattedNumber = cleaned.replace(
      /^(\+84|84|0|0084)(2)(\d{2})(\d{4})(\d{3})$/,
      "02$3 $4 $5",
    );
  } else if (
    /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/.test(cleaned)
  ) {
    formattedNumber = cleaned.replace(
      /^(\+84|84|0|0084)(\d{2})([35789])(\d{3})(\d{3})$/,
      "0$2$3 $4 $5",
    );
  } else {
    formattedNumber = cleaned;
  }

  return formattedNumber;
}
