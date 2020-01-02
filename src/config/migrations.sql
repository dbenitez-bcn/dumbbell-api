-- create database
CREATE DATABASE dumbbell;
-- \c dumbbell
-- creates exercises table
CREATE TABLE exercises (id SERIAL PRIMARY KEY, name VARCHAR, description TEXT);
