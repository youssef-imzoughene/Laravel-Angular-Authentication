<?php


Route::group([

    'middleware' => 'api',

], function ($router) {
    Route::post('test', function(){
        return "voila";
    });
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});
