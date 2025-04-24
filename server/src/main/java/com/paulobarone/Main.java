package com.paulobarone;

import com.paulobarone.factory.ConnectionFactory;

import java.sql.SQLException;

public class Main {
  public static void main(String[] args) throws SQLException {
    ConnectionFactory.getConnection();
  }
}
