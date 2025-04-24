package com.paulobarone.factory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
  private static final String dbUrl = System.getenv("DB_URL");

  private static Connection currentConnection = null;

  public static Connection getConnection() throws SQLException {
    if(currentConnection == null || currentConnection.isClosed()) {
      currentConnection = DriverManager.getConnection(dbUrl);
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

