<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Image upload logic
        $imagePath = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public/images'), $imageName);
            $imagePath = 'images/' . $imageName;
        }

        $customer = new Customer();
        $customer->name = $request->name;
        $customer->image = $imagePath;



        $customer->save();

        return response()->json($customer, 201);
    }

    public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $customer = Customer::findOrFail($id);

    // Old image delete logic
    if ($request->hasFile('image')) {
        if ($customer->image && file_exists(storage_path('app/public/' . $customer->image))) {
            unlink(storage_path('app/public/' . $customer->image));
        }

        // Image upload logic
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(storage_path('app/public/images'), $imageName);
        $customer->image = 'images/' . $imageName;
    }

    $customer->name = $request->name;
    $customer->save();

    return response()->json($customer, 200);
}

    public function show($id)
    {
        return Customer::findOrFail($id);
    }

    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    //     ]);

    //     $customer = Customer::findOrFail($id);
    //     $customer->name = $request->name;

    //     if ($request->hasFile('image')) {
    //         // Delete old image if exists
    //         if ($customer->image) {
    //             Storage::delete('public/images/' . $customer->image);
    //         }

    //         $imagePath = $request->file('image')->store('public/images');
    //         $customer->image = basename($imagePath);
    //     }

    //     $customer->save();

    //     return response()->json($customer, 200);
    // }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);

        if ($customer->image) {
            Storage::delete('public/images/' . $customer->image);
        }

        $customer->delete();

        return response()->json(null, 204);
    }
}
