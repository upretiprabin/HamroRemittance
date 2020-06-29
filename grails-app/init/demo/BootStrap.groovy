package demo

class BootStrap {

    def init = { servletContext ->
        log.info "Loading database..."

    }
    def destroy = {
    }
}
