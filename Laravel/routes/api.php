<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\admin\AdminController;



Route::post('/admin/login', [AdminController::class, 'authenticate']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'show']);
    // Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::put('/user/profile', [UserController::class, 'updateUser']);
    Route::put('/user/password', [UserController::class, 'updatePassword']);
    Route::post('/verify-password', [UserController::class, 'verifyPassword']);
    Route::delete('/user', [UserController::class, 'deleteAccount']);
});

