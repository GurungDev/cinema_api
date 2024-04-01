export function baseTemplate(body: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CInema hub</title>
      </head>
      <body style="margin: 0; padding: 0;">
      <div>  
            ${body}
        </div>
        </body>
        </html>
    `;
}
export function cinemaRegisterEmail(password: string) {
  return `
    <div class="body">
   
      <p style=" font-size:22px; font-weight: 400;">Password for your cinema is given below.</p>
      <p style=" font-weight: 400;">${password}</p>
   
    </div>`;
}
export function customerRegisterEmail(token: string) {
  return `
    <div class="body">
   
        <p style=" font-size:22px; font-weight: 400;">Your OTP is displayed below</p>
        <p style=" font-weight: 400;">${token}</p>
  
    </div>`;
}

export function passwordChangeEmail(otp: string) {
  return `
    <div class="body">
   
    <p style=" font-weight: 400;">Your OTP is dispayed below:</p>
    <p style=" font-weight: 400;">${otp}</p>
  
     
    </div>`;
}
