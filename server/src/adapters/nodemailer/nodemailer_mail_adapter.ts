import { MailAdapter, SendMailData } from "../mail_adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "72786ff995bf5e",
      pass: "946cc9dab7388f"
    }
  });

export class NodemailerMailAdpater implements MailAdapter{
    async sendMail ({subject, body}: SendMailData){
        
        await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Murilo Bohlke <bohlke.muka@gmail.com>',
        subject,
        html: body
    })
    }
}