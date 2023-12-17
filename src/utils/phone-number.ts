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
