import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Register")
public class Register extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // JDBC database URL, username, and password of MySQL server
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/project";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "dvg@A123456";

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve form parameters
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        // JDBC variables
        Connection conn = null;
        PreparedStatement stmt = null;

        try {
            // Register JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Open a connection
            conn = DriverManager.getConnection(JDBC_URL, DB_USER, DB_PASSWORD);

            // SQL query to insert data into the database
            String sql = "INSERT INTO register (username, email, password) VALUES (?, ?, ?)";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, username);
            stmt.setString(2, email);
            stmt.setString(3, password);

            // Execute the query
            stmt.executeUpdate();

            // Redirect to a success page or handle the registration logic here
            response.sendRedirect("weather.jsp");
        } catch (ClassNotFoundException | SQLException e) {
            // Handle any errors that may have occurred
            e.printStackTrace();
            // You may want to redirect to an error page in a real-world scenario
        } finally {
            // Close the resources
            try {
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
