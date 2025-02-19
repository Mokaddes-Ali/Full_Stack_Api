<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\Profile\UserController;
use App\Http\Controllers\User\RegisterController;
use App\Http\Controllers\profile\UpdatedUserController;
use App\Http\Controllers\profile\ChangePasswordController;
use App\Http\Controllers\profile\UpdatePasswordController;
use App\Http\Controllers\profile\VerifyPasswordController;
use App\Http\Controllers\profile\DeleteUserAccountController;



Route::post('/admin/login', [AdminController::class, 'authenticate']);

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::post('/forgot-password', [ChangePasswordController::class, 'forgotPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user/profile', [UpdatedUserController::class, 'updateUser']);
    Route::put('/user/password', [UpdatePasswordController::class, 'updatePassword']);
    Route::post('/verify-password', [VerifyPasswordController::class, 'verifyPassword']);
    Route::delete('/user', [DeleteUserAccountController::class, 'deleteAccount']);
});



Route::apiResource('customers', CustomerController::class);
// Route::get('/customers', [CustomerController::class, 'index']);
// Route::post('/customers', [CustomerController::class, 'store']);
// Route::put('/customers/{customer}', [CustomerController::class, 'update']);
// Route::delete('/customers/{customer}', [CustomerController::class, 'destroy']);

