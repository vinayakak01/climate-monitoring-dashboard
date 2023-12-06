import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/login")
public class login extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // JDBC database URL, username, and password of MySQL server
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/project";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "dvg@A123456";

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve form parameters
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // JDBC variables
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            // Register JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Open a connection
            conn = DriverManager.getConnection(JDBC_URL, DB_USER, DB_PASSWORD);

            // SQL query to check if username and password match
            String sql = "SELECT * FROM register WHERE username = ? AND password = ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, username);
            stmt.setString(2, password);

            // Execute the query
            rs = stmt.executeQuery();

            // Check if the result set has any rows (matching user)
            if (rs.next()) {
                // Authentication successful
                // Set session attribute to mark the user as logged in
                HttpSession session = request.getSession(true);
                session.setAttribute("username", username);

                // Redirect to a dashboard or home page
                response.sendRedirect("weather.jsp");
            } else {
                // Authentication failed
                // Redirect back to the login page with an error message
                response.sendRedirect("fail.jsp?loginFailed=true");
            }
        } catch (ClassNotFoundException | SQLException e) {
            // Handle any errors that may have occurred
            e.printStackTrace();
            // You may want to redirect to an error page in a real-world scenario
        } finally {
            // Close the resources
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
