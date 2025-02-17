<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            font-size: 24px;
            font-weight: bold;
            color: #4a90e2;
            margin-bottom: 20px;
        }
        .email-body {
            font-size: 16px;
            color: #333;
        }
        .otp-code {
            font-size: 20px;
            font-weight: bold;
            color: #d9534f;
        }
        .email-footer {
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <p>Dear Valued User,</p>
    <div class="email-container">
        <div class="email-header">OTP Verification</div>
        <div class="email-body">
            <p>Dear Customer</p>
            <p>Your OTP code is: <span class="otp-code">{{ $otp }}</span></p>
            <p>This OTP is valid for 3 minutes. Please do not share this code with anyone.</p>
            <br>
        </div>
        <div class="email-footer">
            <p>Best Regards,</p>
            <p><strong>Your Company Name</strong></p>
            <p>Email: support@yourcompany.com</p>
            <p>Phone: +1-800-123-4567</p>
        </div>
    </div>
</body>
</html>

