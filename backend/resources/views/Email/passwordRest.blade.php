@component('mail::message')
# Change password Request

Click onthe button below to change password

@component('mail::button', ['url' => {{$token}} ])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
