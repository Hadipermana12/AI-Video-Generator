<?php

use App\Http\Controllers\VideoController;
use App\Http\Controllers\ProfileController;

// Redirect root ke dashboard
Route::get('/', function () {
    return redirect()->route('dashboard');
});

// Auth routes (login, logout, register, password reset)
require __DIR__.'/auth.php';

// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [VideoController::class, 'index'])->name('dashboard');
    Route::post('/generate', [VideoController::class, 'generate'])->name('video.generate');
    Route::delete('/video/{id}', [VideoController::class, 'destroy'])->name('video.destroy');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});