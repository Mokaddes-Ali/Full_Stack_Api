<?php

namespace App\Http\Controllers\profile;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class DeleteUserAccountController extends Controller
{
public function deleteAccount(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $user->tokens()->delete();

    if ($user->image) {
        $imagePath = public_path('storage/' . $user->image);

        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
    }

    // Delete the user from the database
    $user->delete();

    return response()->json(['message' => 'Account deleted successfully']);
}

}
