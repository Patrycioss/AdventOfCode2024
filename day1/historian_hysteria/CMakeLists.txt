cmake_minimum_required(VERSION 3.30)
project(historian_hysteria C)

set(CMAKE_C_STANDARD 23)

file(COPY input DESTINATION ${CMAKE_CURRENT_BINARY_DIR})
add_executable(historian_hysteria main.c)
