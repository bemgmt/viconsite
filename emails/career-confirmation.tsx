import * as React from "react"

interface CareerConfirmationEmailProps {
  name: string
  role: string
}

export const CareerConfirmationEmail: React.FC<CareerConfirmationEmailProps> = ({ name, role }) => {
  const roleNames: Record<string, string> = {
    agent: "Sales Agent",
    distributor: "Distributor",
    influencer: "Influencer",
  }

  return (
    <html>
      <head>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #c94a3d 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e5e5e5;
            border-top: none;
          }
          .greeting {
            font-size: 18px;
            margin-bottom: 20px;
          }
          .message {
            margin-bottom: 20px;
            color: #555;
          }
          .role-badge {
            display: inline-block;
            background: #c94a3d;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin: 10px 0;
          }
          .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            border: 1px solid #e5e5e5;
            border-top: none;
            color: #666;
            font-size: 14px;
          }
          .contact-info {
            margin-top: 15px;
            font-size: 13px;
          }
        `}</style>
      </head>
      <body>
        <div className="header">
          <div className="logo">VICON</div>
          <div>AI-Powered Fire Protection Systems</div>
        </div>
        
        <div className="content">
          <div className="greeting">Dear {name},</div>
          
          <div className="message">
            <p>Thank you for your interest in joining the VICON team!</p>
            
            <p>We have successfully received your application for the position of:</p>
            <div className="role-badge">{roleNames[role] || role}</div>
            
            <p>
              Our team is currently reviewing all applications and will carefully consider your qualifications
              and experience. We appreciate the time you took to apply and your interest in being part of our
              mission to protect homes and save lives with cutting-edge fire protection technology.
            </p>
            
            <p>
              <strong>What happens next?</strong>
            </p>
            <ul>
              <li>Our recruitment team will review your application within 3-5 business days</li>
              <li>If your qualifications match our current needs, we'll reach out to schedule an interview</li>
              <li>You'll receive updates via email at the address you provided</li>
            </ul>
            
            <p>
              In the meantime, feel free to learn more about VICON and our innovative fire protection
              solutions at <a href="https://vicontech.group" style="color: #c94a3d;">vicontech.group</a>.
            </p>
            
            <p>
              If you have any questions about your application, please don't hesitate to contact us.
            </p>
            
            <p style="margin-top: 30px;">
              Best regards,<br />
              <strong>The VICON Recruitment Team</strong>
            </p>
          </div>
        </div>
        
        <div className="footer">
          <div>VICON Technologies</div>
          <div className="contact-info">
            22515 Aspan Street, Suite F-G<br />
            Lake Forest, CA 92630<br />
            Phone: (904) 945-3280<br />
            Email: info@vicontech.group
          </div>
        </div>
      </body>
    </html>
  )
}

export default CareerConfirmationEmail

