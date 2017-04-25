<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
	      <link rel="shortcut icon" href="http://i.imgur.com/X9LSYcX.png">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
        <title>Roomio</title>
        <script src="https://use.fontawesome.com/b4eac05af7.js"></script>
        <script type="text/javascript">
            @if(Auth::check())
                window.user = {
                    token: "{{ Auth::user()->api_token }}",
                    username: "{{ Auth::user()->username }}",
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
            <!--<script src="js/bundle.js" charset="utf-8"></script>-->
        @else
            <script src="http://roomio-web.us-west-2.elasticbeanstalk.com/js/bundle.js" charset="utf-8"></script>
        @endif
    </body>
</html>
