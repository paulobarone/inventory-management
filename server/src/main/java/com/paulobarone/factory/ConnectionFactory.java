package com.paulobarone.factory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
  private static final String dbUrl = System.getenv("DB_URL");
  private static final String dbUser = System.getenv("DB_USER");
  private static final String dbPass = System.getenv("DB_PASS");

  private static Connection currentConnection = null;

  public static Connection getConnection() throws SQLException {
    System.out.println("Conexão estabelecida: " + dbUrl + " " + dbUser + " " + dbPass);
    if(currentConnection == null || currentConnection.isClosed()) {
      currentConnection = DriverManager.getConnection(dbUrl, dbUser, dbPass);
    }

    return currentConnection;
  }

  public static void closeConnection() throws SQLException {
    if(currentConnection != null && !currentConnection.isClosed()) {
      currentConnection.close();
      currentConnection = null;
    }
  }
}

