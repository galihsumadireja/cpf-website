function generateToken(prefix) {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${random}`;
}

function generateCrewLink() {
  const token = generateToken("CREW");
  const link = `../crew/index.html?token=${token}`;
  document.getElementById("crewLink").innerHTML =
    `<a href="${link}" target="_self">${link}</a>`;
}

function generateCustomerLink() {
  const token = generateToken("CUST");
  const link = `../customer/index.html?token=${token}`;
  document.getElementById("customerLink").innerHTML =
    `<a href="${link}" target="_self">${link}</a>`;
}