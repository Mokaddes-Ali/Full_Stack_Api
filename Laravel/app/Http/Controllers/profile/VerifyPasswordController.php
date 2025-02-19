<?php

namespace App\Http\Controllers\profile;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class VerifyPasswordController extends Controller
{
    // Verify Password for delete account
    public function verifyPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = Auth::user();

        // Check password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Incorrect password!'], 401);
        }

        return response()->json(['message' => 'Password is correct']);
    }
}
