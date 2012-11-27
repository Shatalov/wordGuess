package com.teamdev.students.wordguess;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class WordGuessServlet extends HttpServlet {

    public static final String TARGET_WORD = "TeamDev";
    public static final String USER_ATTEMPT_REQUEST_PARAM = "userAttempt";
    public static final String JSON_MIME_TYPE = "application/json";


    /**
     *
     * @param req sent to "words/guess?attempt=Vasya"
     * @param resp JSON object
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        final String userAttempt = req.getParameter(USER_ATTEMPT_REQUEST_PARAM);
        final WordGuessResponse guessResponse = analyzeAttempt(userAttempt);

        PrintWriter writer = resp.getWriter();
        writer.println(guessResponse.toJSON());
        resp.setContentType(JSON_MIME_TYPE);
        resp.setStatus(200);
    }

    private WordGuessResponse analyzeAttempt(final String userAttempt) {
        boolean attemptSuccessful = TARGET_WORD.equals(userAttempt);
        System.out.println("Fuck yee");
        return new WordGuessResponse(attemptSuccessful);

    }


}
