import React from 'react'

function RECAPCHA() {
    return (
        <div>
            <head>
                <title>reCAPTCHA demo: Simple page</title>
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            </head>
            <body>
                <form action="?" method="POST">
                    <div class="g-recaptcha" data-sitekey="6Lc8m94bAAAAALgp7HAIbn8kzY1fcCkOXgyguZvc">
                    </div>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </body>
        </div>
    )
}

export default RECAPCHA
