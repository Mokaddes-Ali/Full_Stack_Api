<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;
use Carbon\Carbon;

class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'phone_number' => 'required|string|unique:users',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = auth()->user()->createToken('authToken')->plainTextToken;
        return response()->json(['token' => $token], 200);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    // Forgot Password
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $otp = rand(100000, 999999);
        $user->otp = $otp;
        $user->otp_expiry = Carbon::now()->addMinutes(3);
        $user->save();

        Mail::to($user->email)->send(new OtpMail($otp));

        return response()->json(['message' => 'OTP sent to your email'], 200);
    }


    // Reset Password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Password reset successfully'], 200);
    }




     // Send OTP
     public function sendOtp(Request $request)
     {
         $user = User::where('email', $request->email)->first();
         if (!$user) {
             return response()->json(['message' => 'User not found'], 404);
         }

         // Generate a strong 6-digit OTP
         $otp = rand(100000, 999999);
         $expiry_time = Carbon::now()->addMinutes(3);

         $user->otp = $otp;
         $user->otp_expiry = $expiry_time;
         $user->save();

         Mail::to($user->email)->send(new OtpMail($otp));

         return response()->json(['message' => 'OTP sent'], 200);
     }


     public function verifyOtp(Request $request)
     {

         $user = User::where('otp', $request->otp)->first();

         if (!$user) {
             return response()->json(['message' => 'Invalid OTP'], 400);
         }

         if (Carbon::now()->gt($user->otp_expiry)) {
             return response()->json(['message' => 'OTP has expired'], 400);
         }


         $user->otp = null;
         $user->otp_expiry = null;
         $user->email_verified_at = Carbon::now();
         $user->save();

         return response()->json(['message' => 'OTP verified successfully'], 200);
     }
 }
