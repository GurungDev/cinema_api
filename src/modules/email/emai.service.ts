 
 
import { baseTemplate, cinemaRegisterEmail, customerRegisterEmail, passwordChangeEmail } from "./template/template";
 
import sendGrid from "@sendgrid/mail";

export abstract class SendGridEmailServiceService {
  private readonly genericEmailSender: string;
  constructor() {
    sendGrid.setApiKey("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");
    this.genericEmailSender = "nishan.clinchtech@gmail.com";
  }
  protected async sendEmail(
    to: string[],
    subject: string,
    html: string,
    sender = this.genericEmailSender
  ) {
    try {
        await sendGrid.send({
          to,
          from: sender,
          subject,
          html,
        });
      } catch (e) {
        console.log(e)
        console.log("Error while sending email")
      }
  }
}

export class EmailService extends SendGridEmailServiceService{
    constructor(){
        super()
        this.cinemaRegisterEmailSend = this.cinemaRegisterEmailSend.bind(this)
        this.mailCustomerRegister = this.mailCustomerRegister.bind(this)
        this.mailPasswordChange = this.mailPasswordChange.bind(this)
    }

    private wrapGenericTemplate(body: string) {
        return baseTemplate(body);
      }
    
      cinemaRegisterEmailSend(email: string, otp: string) {
        this.sendEmail(
          [email],
          "Cinemaa Register",
          this.wrapGenericTemplate(cinemaRegisterEmail(otp))
        );
      }

      mailCustomerRegister(email: string, otp: string) {
        this.sendEmail(
          [email],
          "Customer Register",
          this.wrapGenericTemplate(customerRegisterEmail(otp))
        );
      }

      mailPasswordChange(email: string, otp: string) {
        this.sendEmail(
          [email],
          "Password Forgot",
          this.wrapGenericTemplate(passwordChangeEmail(otp))
        );
      }
}


const emailService = new EmailService();
export default emailService;