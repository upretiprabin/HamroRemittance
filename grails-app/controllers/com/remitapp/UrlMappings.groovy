package com.remitapp

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view: '/index')
        "/app/*"(view: '/index')
        "/admin/*"(view: '/index')
        "500"(view: '/error')
        "404"(view: '/index')
    }
}
