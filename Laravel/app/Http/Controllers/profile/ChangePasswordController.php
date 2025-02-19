<?php

namespace App\Http\Controllers\profile;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ChangePasswordController extends Controller
{
     // Change Password
     public function changePassword(Request $request)
     {
         $user = $request->user();

         if (!$user) {
             return response()->json([
                 'status' => false,
                 'message' => 'User not found'
             ], 404);
         }

         $validator = Validator::make($request->all(), [
             'current_password' => 'required|string',
             'new_password' => 'required|string|min:6|confirmed',
         ]);

         if ($validator->fails()) {
             return response()->json([
                 'status' => false,
                 'errors' => $validator->errors()
             ], 422);
         }

         if (!Hash::check($request->current_password, $user->password)) {
             return response()->json([
                 'status' => false,
                 'message' => 'Current password is incorrect'
             ], 400);
         }

         $user->password = Hash::make($request->new_password);
         $user->save();

         return response()->json([
             'status' => true,
             'message' => 'Password changed successfully'
         ], 200);
     }
}
