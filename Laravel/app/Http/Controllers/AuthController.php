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
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // // Register
    // public function register(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'first_name' => 'required|string',
    //         'last_name' => 'required|string',
    //         'email' => 'required|email|unique:users',
    //         'phone_number' => 'required|string|unique:users',
    //         'password' => 'required|string|confirmed',
    //         'image' => 'nullable|mimes:jpeg,png,jpg,gif,svg|max:2048',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => false,
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     $user = User::create([
    //         'first_name' => $request->first_name,
    //         'last_name' => $request->last_name,
    //         'email' => $request->email,
    //         'phone_number' => $request->phone_number,
    //         'password' => Hash::make($request->password),
    //     ]);

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'User registered successfully',
    //         'data' => $user
    //     ], 201);
    // }


//     // Register
// public function register(Request $request)
// {
//     $validator = Validator::make($request->all(), [
//         'first_name' => 'required|string',
//         'last_name' => 'required|string',
//         'email' => 'required|email|unique:users',
//         'phone_number' => 'required|string|unique:users',
//         'password' => 'required|string|confirmed',
//         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//     ]);

//     if ($validator->fails()) {
//         return response()->json([
//             'status' => false,
//             'errors' => $validator->errors()
//         ], 422);
//     }

//     $imagePath = null;

//     if ($request->hasFile('image')) {
//         $image = $request->file('image');
//         $imageName = time() . '.' . $image->getClientOriginalExtension();
//         $image->move(storage_path('app/public/images'), $imageName);
//         $imagePath = 'images/' . $imageName;
//     }

//     $user = User::create([
//         'first_name' => $request->first_name,
//         'last_name' => $request->last_name,
//         'email' => $request->email,
//         'phone_number' => $request->phone_number,
//         'password' => Hash::make($request->password),
//         'image' => $imagePath,
//     ]);

//     return response()->json([
//         'status' => true,
//         'message' => 'User registered successfully',
//         'data' => $user
//     ], 201);
// }


    // Login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = auth()->user()->createToken('authToken')->plainTextToken;
        return response()->json([
            'status' => true,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        // Check if the user is authenticated
        if (!$request->user()) {
            return response()->json([
                'status' => false,
                'message' => 'No user is logged in'
            ], 401); // Return Unauthorized status if no user is logged in
        }

        // If user is authenticated, proceed with logging out
        $request->user()->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logged out successfully'
        ], 200);
    }


    // Forgot Password
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        $otp = rand(100000, 999999);
        $user->otp = $otp;
        $user->otp_expiry = Carbon::now()->addMinutes(3);
        $user->save();

        Mail::to($user->email)->send(new OtpMail($otp));

        return response()->json([
            'status' => true,
            'message' => 'OTP sent to your email'
        ], 200);
    }

    // Reset Password
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Password reset successfully'
        ], 200);
    }

    // Send OTP
    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Generate a strong 6-digit OTP
        $otp = rand(100000, 999999);
        $expiry_time = Carbon::now()->addMinutes(3);

        $user->otp = $otp;
        $user->otp_expiry = $expiry_time;
        $user->save();

        Mail::to($user->email)->send(new OtpMail($otp));

        return response()->json([
            'status' => true,
            'message' => 'OTP sent'
        ], 200);
    }

    // Verify OTP
    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'otp' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('otp', $request->otp)->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid OTP'
            ], 400);
        }

        if (Carbon::now()->gt($user->otp_expiry)) {
            return response()->json([
                'status' => false,
                'message' => 'OTP has expired'
            ], 400);
        }

        $user->otp = null;
        $user->otp_expiry = null;
        $user->email_verified_at = Carbon::now();
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'OTP verified successfully'
        ], 200);
    }

    // Get User Profile
    public function getUserProfile(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $user
        ], 200);
    }

    // // Update User Profile
    // public function updateUserProfile(Request $request)
    // {
    //     $user = $request->user();

    //     if (!$user) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'User not found'
    //         ], 404);
    //     }

    //     $validator = Validator::make($request->all(), [
    //         'first_name' => 'sometimes|string',
    //         'last_name' => 'sometimes|string',
    //         'phone_number' => 'sometimes|string|unique:users,phone_number,' . $user->id,
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => false,
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     $user->update($request->only(['first_name', 'last_name', 'phone_number']));

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Profile updated successfully',
    //         'data' => $user
    //     ], 200);
    // }



    // // Delete User Account
    // public function deleteUserAccount(Request $request)
    // {
    //     $user = $request->user();

    //     if (!$user) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'User not found'
    //         ], 404);
    //     }

    //     $user->tokens()->delete();
    //     $user->delete();

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'User account deleted successfully'
    //     ], 200);
    // }
}
