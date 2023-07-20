CREATE DATABASE recipedatabase;
ALTER DATABASE recipedatabase SET timezone TO 'Asia/Jakarta';

CREATE TABLE category (
    id INT NOT NULL,
    name VARCHAR(64),
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INT NOT NULL,
    username VARCHAR(64),
    email VARCHAR(64),
    password VARCHAR(64),
    PRIMARY KEY (id)
);

CREATE TABLE recipe (
    id INT NOT NULL,
    title VARCHAR(64) NOT NULL,
    photo VARCHAR(64),
    ingredients TEXT NOT NULL,
    category INT,
    created_by INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (category) REFERENCES category(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

INSERT INTO category (id, name) VALUES (1, 'Appetizer'), (2, 'Main Course'), (3, 'Dessert');
INSERT INTO users (id, username, email, password) VALUES (1, 'Resep Mama', 'resepid@gmail.com', 'resepku123');
INSERT INTO recipe (id, title, photo, ingredients, category, created_by) VALUES (1, 'Resep sate ayam', 'imgdb.com', 'Daging ayam, kacang tumbuk, kecap, garam, bawang merah, bawang putih', 2, 1);

--filter join --
SELECT recipe.id, recipe.title, recipe.photo, recipe.ingredients, category.name AS category, users.username AS created_by FROM recipe JOIN category ON recipe.category = category.id JOIN users ON recipe.created_by = users.id;
--filter sort --
SELECT * FROM recipe ORDER BY created_at DESC
--get recipe table--
SELECT * FROM recipe;
--get category table--
SELECT * FROM category;
--get users table--
SELECT * FROM users;

--update recipe table--
UPDATE recipe SET title = 'Gethuk Goreng', photo = 'freepik.com', ingredients = 'tela, gula, kelapa', category = 1, created_by = 1 WHERE id = 5;
--update users table--
UPDATE users SET username = 'Resep Bunda', email = 'masakanbunda@gmail.com', password = 'bundamasak123' WHERE id = 3;

--delete recipe table by id--
DELETE FROM recipe WHERE id = 9;