<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;

class ResetPasswordController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['sendEmail']]);
    }
    //
    public function sendEmail(Request $request){
        //return $request->all();
        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }
        $this->send($request->email);
        return $this->successResponse();
    }
    public function validateEmail($email){
        return !!User::where('email',$email)->first();
    }
    public function failedResponse(){
        return response()->json(
            [
                'error'=>'Email does not be found on our database'
            ],Response::HTTP_NOT_FOUND
        );
    }
    public function send($email){
        Mail::to($email)->send(new ResetPasswordMail);
    }
    public function successResponse(){
        return response()->json(
            [
                'data'=>'Reset Email is send successfully, please check your inbox'
            ],Response::HTTP_OK
        );
    }
}
