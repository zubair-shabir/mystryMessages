
interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (`
        <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #e0e0e0;
        }
        .email-header {
            background-color: #0073e6;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .email-header h2 {
            margin: 0;
        }
        .email-body {
            padding: 20px;
            color: #333;
        }
        .email-body p {
            font-size: 16px;
            margin: 8px 0;
        }
        .email-body .label {
            font-weight: bold;
            color: #0073e6;
        }
        .email-footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
      .none{
      display: none;
      }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h2>Hello ,${username}</h2>
        </div>
        
        <!-- Body -->
        <div class="email-body">
            <p><span class="label">Here&apos;s your verification code: </span> ${otp}</p>
            

        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p> Thank you for registering. Please use the following verification
                        code to complete your registration:! <span class="none">[[UNSUB_LINK_EN]]</span></p>
        </div>
    </div>
</body>
</html>`
    );
}
