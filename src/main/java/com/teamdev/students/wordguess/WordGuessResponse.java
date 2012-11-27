package com.teamdev.students.wordguess;


public class WordGuessResponse {
    private final boolean success;

    public WordGuessResponse(boolean success) {
        this.success = success;
    }

    public String toJSON() {
        return "{success: " + success + "}";
    }
}
