<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class UserController extends Controller
{
    // Get user details
    public function show(Request $request)
    {
        return response()->json($request->user());
    }


    // // Update profile (name, email, image)
    // public function updateProfile(Request $request)
    // {
    //     $user = $request->user();

    //     $request->validate([
    //         'first_name' => 'sometimes|string|max:255',
    //         'last_name' => 'sometimes|string|max:255',
    //         'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
    //         'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
    //     ]);

    //     if ($request->has('first_name')) {
    //         $user->first_name = $request->first_name;
    //     }
    //     if ($request->has('last_name')) {
    //         $user->last_name = $request->last_name;
    //     }
    //     if ($request->has('email')) {
    //         $user->email = $request->email;
    //     }
    //     if ($request->hasFile('image')) {
    //         // Delete old image if exists
    //         if ($user->image) {
    //             Storage::delete($user->image);
    //         }
    //         // Store new image
    //         $path = $request->file('image')->store('profile_images');
    //         $user->image = $path;
    //     }

    //     $user->save();

    //     return response()->json($user);
    // }

    public function updateUser(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $request->user()->id,
            'phone_number' => 'required|string|unique:users,phone_number,' . $request->user()->id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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

    // Update password
    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 401);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    // Delete account
    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        // Delete user image if exists
        if ($user->image) {
            Storage::delete($user->image);
        }

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}
