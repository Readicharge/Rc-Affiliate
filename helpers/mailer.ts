import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';



export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashToken,
                    verifyTokenExpiery: Date.now() + 36000000
                })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpiery: Date.now() + 36000000
                })
        }

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "yashsingh2031@gmail.com",
              pass: process.env.GOOGLE_APP_PWD!,
            },
          });

          const mailoptions = {
            from : 'Onboarding-Team@readicharge.com',
            to:email,
            subject: emailType==="VERIFY" ?'Verify your Email':"Reset your password",
            html:`<p> Click <a href="${process.env.domain}/verifyemail?token=${hashToken}"> here </a> to${ emailType==="VERIFY" ?'Verify your Email':"Reset your password"}</p>`
          }

          const mailResponse = await transporter.sendMail(mailoptions);

          return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}