<?php

namespace App\Http\Controllers\profile;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Intervention\Image\Facades\Image;

class UpdatedUserController extends Controller
{

public function updateUser(Request $request)
{
    $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $request->user()->id,
        'phone_number' => 'required|string|unique:users,phone_number,' . $request->user()->id,
    ]);

    $user = $request->user();
    $user->first_name = $request->first_name;
    $user->last_name = $request->last_name;
    $user->email = $request->email;
    $user->phone_number = $request->phone_number;


    if ($request->hasFile('image')) {
        if ($user->image) {
            Storage::delete($user->image);
        }

        $user->image = $request->file('image')->store('profile_images');
    }

    $user->save();

    return response()->json(['message' => 'Profile updated successfully!']);
}


// public function updateImage(Request $request)
// {
//     $request->validate([
//         'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
//     ]);

//     $user = $request->user();

//     if ($user->image) {
//         Storage::delete($user->image);
//     }

//     $user->image = $request->file('image')->store('profile_images');
//     $user->save();

//     return response()->json(['message' => 'Profile image updated successfully!']);
// }
// }


// Update user profile image separately
public function updateImage(Request $request)
{
    // Validation with more proper rules
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ], [
        'image.required' => 'Please upload an image!',
        'image.mimes' => 'Only jpeg, png, jpg, and gif files are allowed!',
        'image.max' => 'Image size should not exceed 2MB!',
    ]);

    // Get authenticated user using User model
    $user = auth()->user();

    if (!$user) {
        return response()->json(['error' => 'User not found!'], 404);
    }

    // Delete old image if exists
    if ($user->image) {
        Storage::disk('public')->delete($user->image);
    }

    // Create unique image name with timestamp
    $image = $request->file('image');
    $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

    // Resize image to 300x300
    $imagePath = storage_path('app/public/profile_images/' . $imageName);
    if (!file_exists(storage_path('app/public/profile_images'))) {
        mkdir(storage_path('app/public/profile_images'), 0777, true);
    }

    Image::make($image)->resize(300, 300)->save($imagePath);

    // Save image path in user model
    $user->update(['image' => 'profile_images/' . $imageName]);

    return response()->json([
        'message' => 'Profile image updated successfully!',
    ]);
}
}
