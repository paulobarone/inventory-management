package com.paulobarone.factory;

import io.github.cdimascio.dotenv.Dotenv;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {
  private static final String dbUrl;
  private static Connection currentConnection = null;

  static {
    Dotenv dotenv = Dotenv.load();
    dbUrl = dotenv.get("DB_URL");
  }

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

