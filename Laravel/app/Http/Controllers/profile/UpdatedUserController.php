<?php

namespace App\Http\Controllers\profile;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class UpdatedUserController extends Controller
{

public function updateUser(Request $request)
{
    $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $request->user()->id,
        'phone_number' => 'required|string|unique:users,phone_number,' . $request->user()->id,
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Ensure only image files are uploaded
    ]);

    $user = $request->user();
    $user->first_name = $request->first_name;
    $user->last_name = $request->last_name;
    $user->email = $request->email;
    $user->phone_number = $request->phone_number;

    // Handle image upload
    if ($request->hasFile('image')) {
        // Delete old image if exists
        if ($user->image) {
            Storage::delete($user->image); // Delete the previous image from storage
        }

        // Store the new image in the 'profile_images' folder and get the path
        $user->image = $request->file('image')->store('profile_images');
    }

    $user->save(); // Save updated user data

    return response()->json(['message' => 'Profile updated successfully!']);
}
}
