function formatSalary(salary) {
  if (!salary) return "";

  const number = parseInt(salary.toString().replace(/\D/g, ""));

  if (isNaN(number)) return salary;

  return `₹${number.toLocaleString("en-IN")} / month`;
}

export default formatSalary;