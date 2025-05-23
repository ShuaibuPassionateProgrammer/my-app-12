<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('posts', PostController::class)->middleware(['auth']);
Route::get("/test", function () {
    return Inertia::render("test");
});

// Route required parameter

Route::get("/product/{id}", function (string $id) {
    return Inertia::render("Product ID = $id");
});

// Route optional parameter

Route::get("/product/{category?}", function (string $category = null) {
    return "Product category = $category";
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
