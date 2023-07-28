CREATE DATABASE bucket-list;
CREATE TABLE list (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

-- INSERT INTO list(id, user_email, title, progress, date) VALUES('0', 'johndoe@test.com', 'Read a book', '10', 'Thu Jul 27 2023 14:31:46 GMT-0300 (Uruguay Standard Time)');