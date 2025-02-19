<?php

namespace App\Http\Controllers\profile;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class DeleteUserAccountController extends Controller
{
    //  // Delete User Account
    //  public function deleteUserAccount(Request $request)
    //  {
    //      $user = $request->user();

    //      if (!$user) {
    //          return response()->json([
    //              'status' => false,
    //              'message' => 'User not found'
    //          ], 404);
    //      }

    //      $user->tokens()->delete();
    //      $user->delete();

    //      return response()->json([
    //          'status' => true,
    //          'message' => 'User account deleted successfully'
    //      ], 200);
    //  }


//       // Delete account
//     public function deleteAccount(Request $request)
//     {
//         $user = $request->user();

//         if (!$user) {
//             return response()->json(['message' => 'User not found'], 404);
//         }

//         $user->tokens()->delete();
//          // Delete user image if exists
//          if ($user->image) {
//             Storage::delete($user->image);
//         }

//         $user->delete();

//         return response()->json(['message' => 'Account deleted successfully']);
//     }
// }


// Delete account
public function deleteAccount(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Delete user's tokens (if you're using API tokens)
    $user->tokens()->delete();

    // Delete user image if exists
    if ($user->image) {
        // Check and delete the image from storage/public/images folder
        $imagePath = public_path('storage/' . $user->image);

        if (file_exists($imagePath)) {
            unlink($imagePath); // Delete the file from local storage
        }
    }

    // Delete the user from the database
    $user->delete();

    return response()->json(['message' => 'Account deleted successfully']);
}

}
