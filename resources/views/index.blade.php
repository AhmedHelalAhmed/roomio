<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Jargon</title>
        <script type="text/javascript">
            @if(Auth::check())
                window.user = {
                    token: "{{ Auth::user()->api_token }}",
                    name: "{{ Auth::user()->name }}",
                    email: "{{ Auth::user()->email }}"
                };
             @else
                window.user = null;
            @endif
        </script>
    </head>
    <body>
        <div id="root"></div>
        @if(env('APP_ENV') === 'dev')
            <script src="http://localhost:8080/public/bundle.js" charset="utf-8"></script>
        @else
            <script src="js/bundle.js" charset="utf-8"></script>
        @endif
    </body>
</html>
