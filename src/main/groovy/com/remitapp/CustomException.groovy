package com.remitapp

class CustomException extends RuntimeException {

    CustomException(String message) {
        super(message)
    }

    CustomException(String message, Throwable e) {
        super(message, e)
    }
}