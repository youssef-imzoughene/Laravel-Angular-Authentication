<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use DB;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['sendEmail']]);
    }
    public function sendEmail(Request $request){
        //return $request->all();
        if(!$this->validateEmail($request->email)){
            return $this->failedResponse();
        }
        return $this->send($request->email);
        //return $this->successResponse();
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
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token->token));
        return $this->successResponse();
    }
    public function successResponse(){
        return response()->json(
            [
                'data'=>'Reset Email is send successfully, please check your inbox'
            ],Response::HTTP_OK
        );
    }
    public function createToken($email){
        $oldToken=DB::table('password_resets')->where('email',$email)->first();
        if($oldToken){
            return $oldToken;
        }

        $token = str_random(60);
        $this->saveToken($token,$email);
        return $token;
    }
    public function saveToken($token,$email){
        DB::table('password_resets')->insert([
            'email'=>$email,
            'token'=>$token,
            'created_at'=>Carbon::now()
        ]);
    }
}
